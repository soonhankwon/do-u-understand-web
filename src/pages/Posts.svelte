<script>
  import PostHeader from "../components/PostHeader.svelte";
  import PostList from "../components/PostList.svelte";
  import PostAddForm from "../components/PostAddForm.svelte";
  import { isLogin, postsMode } from "../stores";
  import Comments from "./Comments.svelte";
  import { Route } from "tinro";
  import { ALL, WRITE } from "../utils/constant";
  import Notification from "../components/Notification.svelte";
</script>

<PostHeader />
<main class="do-u-understand-main">
  {#if $isLogin && $postsMode === ALL}
    <Notification />
  {/if}
  {#if $isLogin && $postsMode === WRITE}
    <PostAddForm />
  {/if}
  <PostList />

  <Route path="/comments/:id">
    <Comments />
  </Route>
</main>
