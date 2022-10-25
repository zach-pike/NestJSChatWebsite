import jwt_decode from "jwt-decode"
import { io, Socket } from 'socket.io-client';
import { navigateTo } from "svelte-router-spa";
import { readable, type Readable } from 'svelte/store';
import type { Post } from '../../../src/chat/chat.types';
import { basicJsonPostRequest } from "./requestFunctions"

type Tokens = { accessToken:string, refreshToken:string };

type JWTValues<T> = T & { exp: number; }; 

type UserObject = {
  username: string;
  admin: boolean;
  uuid: string;
}

// Decode a JWT to a object
export function jwtDecode<T = UserObject>(token: string): JWTValues<T> {
  try {
    return jwt_decode<JWTValues<T>>(token);
  } catch(e) {
    return null;
  }
}

// Login function, returns either a Error or a `Tokens` object.
async function getTokens(username: string, password: string): Promise<[ Error, Tokens ]> {
  let [ err, tokens ] = await basicJsonPostRequest<Tokens>('auth/login', { username, password });
  return err ? [ err, null ] : [ null, tokens ];
}

async function getRefresh(refreshToken: string): Promise<[ Error, string ]> {
  let [ err, { accessToken }] = await basicJsonPostRequest<{ accessToken: string }>('auth/refresh', { refreshToken });

  return [ err, accessToken ];
}

export function deleteLocalstorageTokens() {
  localStorage.clear();
}

export let tokenReadable: Readable<string> = null;

function _init_token(accessToken: string, refreshToken: string) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  
  function calculateTokenTimeLeft(exp: number): number {
    return ((exp * 1000) - new Date().getTime()) - 60000;
  }
  
  tokenReadable = readable(null, (set) => {
    set(accessToken);

    let timeout;

    async function getNewTok() {
      let [ error, access_token ] = await getRefresh(refreshToken);
      if (error) throw error;

      let new_timeout = calculateTokenTimeLeft(jwtDecode(access_token).exp);

      console.log(`New token expires in ${new_timeout}ms`);

      set(access_token)
      localStorage.setItem('accessToken', access_token);
      timeout = setTimeout(() => getNewTok(), new_timeout);
    }

    timeout = setTimeout(() => getNewTok(), calculateTokenTimeLeft(jwtDecode(accessToken).exp));
    
    return () => {
      clearTimeout(timeout);
    }
  });
}

export function initTokenFromLocalStorage(): boolean {
  let access = localStorage.getItem('accessToken');
  let refresh = localStorage.getItem('refreshToken');

  function is_token_valid(tok: string): boolean {
    let exp = jwtDecode(tok).exp;
    return (exp * 1000) > new Date().getTime();
  }

  if (!access || !refresh) return false;
  console.log("Access token and refresh not null");

  if (!is_token_valid(access)) return false;
  console.log("Access token valid")

  _init_token(access, refresh);

  return true;
}

export async function initializeToken(username: string, password: string): 
Promise<Error | undefined> {
  let [err, { accessToken, refreshToken } ] = await getTokens(username, password);

  if (err) return err;

  _init_token(accessToken, refreshToken);

  return null;
}

export async function registerUser(username: string, real_name: string, password: string): Promise<Error | undefined> {
  let [ err, _resp ] = await basicJsonPostRequest<{}>('auth/signup', { username, real_name, password });

  return err;
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