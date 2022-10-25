import HomeLayout from "./Layouts/HomeLayout.svelte";
import HomePage from "./pages/HomePage.svelte";
import Login from "./pages/Login.svelte";
import Signup from "./pages/Signup.svelte";
import PrivateMessages from "./pages/PrivateMessages.svelte";
import VideoStreamer from "./pages/VideoStreamer.svelte";
import PublicChat from "./pages/PublicChat.svelte";
import AdminPanel from "./pages/AdminPanel.svelte";
import BasicLayoutRoute from "./Layouts/BasicLayoutRouter.svelte";

export const routes = [
    {
        name: "/",
        component: Login
    },
    {
        name: "/signup",
        component: Signup
    },
    {
        name: "/home",
        component: HomePage,
        layout: HomeLayout
    },
    {
        name: "/pc",
        component: PublicChat
    },
    {
        name: "/pm",
        component: PrivateMessages
    },
    {
        name: "/streamer",
        component: VideoStreamer
    },
    {
        name: "/admin",
        component: AdminPanel,
        layout: BasicLayoutRoute
    }
]