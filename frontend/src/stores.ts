import type { Socket } from "socket.io-client";
import { writable } from "svelte/store";

export const token = writable<string>(localStorage.getItem("token") || null);