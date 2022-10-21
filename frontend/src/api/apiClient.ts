import { io, Socket } from 'socket.io-client';
import { readable } from 'svelte/store';
import type { Post } from '../../../src/chat/chat.types';

export async function getToken(username: string, password: string): Promise<string | undefined> {
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

  if (!req.ok) return null;

  return await req.text();
}

// Get a authenticated socket.io client instance
export function getSIOClient(token: string): Socket {
  return io(window.location.origin, {
    extraHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function getMessageReadable(client: Socket) {
  return readable<Post[]>([], (set) => {
    let values: Post[] = [];

    fetch(`${window.location.origin}/chat/getsent`)
      .then(v => v.json())
      .then(json => {
        values = json;
        set(values.reverse());
      });
    
    let recv_func = (msg: Post) => {
      values.push(msg);
      set(values.reverse());
    }

    client.on('message', recv_func);

    return () => {
      client.off('message', recv_func);
    }
  })
}

export function sendMessage(io: Socket, msg: string) {
  io.emit('message', msg);
}