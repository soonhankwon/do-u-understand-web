<script>
  import { onMount } from "svelte";
  import {
    posts,
    currentPostsPage,
    loadingPost,
    postPageLock,
  } from "../stores";
  import Post from "./Post.svelte";
  import PostLoading from "./PostLoading.svelte";

  let component;
  let element;

  onMount(() => {
    posts.resetPosts();
    posts.fetchPosts();
  });

  $: {
    if (component) {
      element = component.parentNode;
      element.addEventListener("scroll", onScroll);
      element.addEventListener("resize", onScroll);
    }
  }

  const onScroll = (e) => {
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;
    const scrollTop = e.target.scrollTop;
    const realHeight = scrollHeight - clientHeight;
    const triggerHeight = realHeight * 0.7;

    const triggerComputed = () => {
      return scrollTop > triggerHeight;
    };

    const countCheck = () => {
      const check = $posts.totalPageCount <= $currentPostsPage;
      return check;
    };

    if (countCheck()) {
      postPageLock.set(true);
    }

    const scrollTrigger = () => {
      return triggerComputed() && !countCheck() && !$postPageLock;
    };

    if (scrollTrigger()) {
      currentPostsPage.increPage();
    }
  };
</script>

<!-- do-u-understand-list-wrap start-->
<div class="do-u-understand-list-wrap" bind:this={component}>
  <ul class="do-u-understand-ul">
    {#each $posts.postList as post, index}
      <li class="mb-5">
        <Post {post} />
      </li>
    {/each}
  </ul>

  {#if $loadingPost}
    <PostLoading />
  {/if}
</div>
<!-- do-u-understand-list-wrap end-->
