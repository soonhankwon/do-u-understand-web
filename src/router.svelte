<script>
  import { Route } from "tinro";

  import Posts from "./pages/Posts.svelte";
  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";
  import NotFound from "./pages/notFound.svelte";
</script>

<Route path="/" redirect="/posts" />
<Route path="/posts/*"><Posts /></Route>
<Route path="/login"><Login /></Route>
<Route path="/register"><Register /></Route>
<Route fallback><NotFound /></Route>
