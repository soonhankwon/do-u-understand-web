<script>
  import PostHeader from "../components/PostHeader.svelte";
  import PostList from "../components/PostList.svelte";
  import PostAddForm from "../components/PostAddForm.svelte";
  import { isLogin } from "../stores";
</script>

<PostHeader />
<main class="do-u-understand-main">
  {#if $isLogin}
    <PostAddForm />
  {/if}
  <PostList />
</main>
