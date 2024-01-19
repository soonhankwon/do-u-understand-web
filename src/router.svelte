<script>
  import { Route } from "tinro";
  import { isLogin } from "./stores";

  import Posts from "./pages/Posts.svelte";
  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";
  import NotFound from "./pages/notFound.svelte";
</script>

<Route path="/" redirect="/posts/all" />

<Route path="/posts/*">
  <Route path="/all/*"><Posts /></Route>
  {#if $isLogin}
    <Route path="/my/*"><Posts /></Route>
    <Route path="/subscribe/*"><Posts /></Route>
  {:else}
    <Route path="/my/*" redirect="/posts/all" />
    <Route path="/subscribe/*" redirect="/posts/all"><Posts /></Route>
  {/if}
</Route>
<Route path="/login"><Login /></Route>
<Route path="/register"><Register /></Route>
<Route fallback><NotFound /></Route>
