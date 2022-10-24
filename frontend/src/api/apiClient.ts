import jwt_decode from "jwt-decode"
import { io, Socket } from 'socket.io-client';
import { writable, readable, type Readable } from 'svelte/store';
import type { Post } from '../../../src/chat/chat.types';

type Tokens = { accessToken:string, refreshToken:string };

export function get_user(token: string): { username: string, admin: boolean } {
  return jwt_decode(token);
}

async function get_tokens(username: string, password: string): Promise<[ Error, Tokens ]> {
  let req = await fetch(`${window.location.origin}/auth/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  if (!req.ok) {
    return [ new Error(await req.text()), null ];
  }

  return [ null, await req.json() ];
}

async function get_refresh(refreshToken: string): Promise<string> {
  let req = await fetch(`${window.location.origin}/auth/refresh`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refreshToken
    })
  })

  let json = await req.json();

  return json.accessToken;
}

export let tokenReadable: Readable<string> = null;

function _init_token(accessToken: string, refreshToken: string) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  
  function calculate_timeout_time(exp: number): number {
    return ((exp * 1000) - new Date().getTime()) - 60000;
  }
  
  tokenReadable = readable(null, (set) => {
    set(accessToken);

    let timeout;

    async function get_new_tok() {
      let access_token = await get_refresh(refreshToken);
      let new_timeout = calculate_timeout_time(jwt_decode(access_token).exp);

      console.log(`New token expires in ${new_timeout}ms`);

      set(access_token)
      localStorage.setItem('accessToken', access_token);
      timeout = setTimeout(() => get_new_tok(), new_timeout);
    }

    timeout = setTimeout(() => get_new_tok(), calculate_timeout_time(jwt_decode(accessToken).exp));
    
    return () => {
      clearTimeout(timeout);
    }
  });
}

export function initialize_token_from_localstorage(): boolean {
  let access = localStorage.getItem('accessToken');
  let refresh = localStorage.getItem('refreshToken');

  function is_token_valid(tok: string): boolean {
    let exp = jwt_decode(tok).exp;
    return exp * 1000 < new Date().getTime();
  }

  if (!access || !refresh) return false;
  if (!is_token_valid(access)) return false;

  _init_token(access, refresh);

  return true;
}

export async function initialize_token(username: string, password: string): 
Promise<Error | undefined> {
  let [err, { accessToken, refreshToken } ] = await get_tokens(username, password);

  if (err) return err;

  _init_token(accessToken, refreshToken);

  return null;
}

export async function register_user(username: string, real_name: string, password: string) {
  let req = await fetch(`${window.location.origin}/auth/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
      real_name
    })
  });
}

// Get a authenticated socket.io client instance
export function getSIOClient(token: string): Socket {
  console.log("new client created")
  return io(window.location.origin, {
    extraHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function getMessageReadable(client: Socket, token: string): Readable<Post[]> {
  return readable<Post[]>([], (set) => {
    let values: Post[] = [];

    function fetch_posts() {
      fetch(`${window.location.origin}/chat/getsent`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(v => v.json())
      .then(json => {
        values = json;
        set(values.reverse());
      });
    }

    fetch_posts();
    
    let recv_func = (msg: Post) => {
      values.push(msg);
      set(values.reverse());
    }

    client.on('message', recv_func);
    client.on('message_refetch', fetch_posts);

    return () => {
      client.off('message', recv_func);
      client.off('message_refetch', fetch_posts)
    }
  })
}

export function sendMessage(io: Socket, msg: string) {
  io.emit('message', msg);
}

export async function delete_public_post(token: string, postId: string) {
  let req = await fetch(`${window.location.origin}/admin/delPubMessage`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      postId
    })
  })
}