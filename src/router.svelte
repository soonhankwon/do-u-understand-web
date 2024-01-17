<script>
  import { Route } from "tinro";

  import Posts from "./pages/Posts.svelte";
  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";
</script>

<Route path="/" redirect="/posts" />
<Route paht="/posts/*"><Posts /></Route>
<Route paht="/login/*"><Login /></Route>
<Route paht="/register/*"><Register /></Route>
