<script>
  import PostHeader from "../components/PostHeader.svelte";
  import PostList from "../components/PostList.svelte";
  import PostAddForm from "../components/PostAddForm.svelte";
  import { isLogin, postsMode } from "../stores";
  import Comments from "./Comments.svelte";
  import { Route } from "tinro";
  import { WRITE } from "../utils/constant";
</script>

<PostHeader />
<main class="do-u-understand-main">
  {#if $isLogin && $postsMode === WRITE}
    <PostAddForm />
  {/if}
  <PostList />

  <Route path="/comments/:id">
    <Comments />
  </Route>
</main>
