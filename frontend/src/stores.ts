import type { Socket } from "socket.io-client";
import { readable, writable } from "svelte/store";
import jwt_decode from "jwt-decode"

export const token = writable<string>(localStorage.getItem("token") || null);
export const user_object = readable<{ username: string, uuid: string, admin: boolean }>(null, (set) => {
    let unsub = token.subscribe((s) => set(jwt_decode(s)));

    return () => {
        unsub();
    }
})