import HomeSvelte from "./pages/Home.svelte";
import Login from "./pages/Login.svelte";
import Signup from "./pages/Signup.svelte";

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
        component: HomeSvelte
    }
]