import type { async } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { readable, type Readable } from 'svelte/store';
import type { Post } from '../../../src/chat/chat.types';

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

export async function getToken(username: string, password: string): Promise<[ Error, string ]> {
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

  return [ null, await req.text() ]
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