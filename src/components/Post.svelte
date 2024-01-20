<script>
  export let post;
  import { posts, auth, isLogin } from "../stores";
  import PostEditForm from "./PostEditForm.svelte";
  import { router } from "tinro";
  import dateView from "../utils/date";
  import Tag from "./Tag.svelte";

  let tags = post.tags;
  let isReadOnly = true;

  let isViewMenu = false;

  const currentMode = $router.path.split("/")[2];

  $: {
    if ($posts.menuPopup === post.id) {
      isViewMenu = true;
    } else {
      isViewMenu = false;
    }
  }

  const onToggleMenuPopup = (id) => {
    if (isViewMenu === true) {
      posts.closeMenuPopup();
      return;
    }
    posts.openMenuPopup(id);
  };

  const onEditModePost = (id) => {
    posts.openEditModePost(id);
  };

  const onDeletePost = (id) => {
    if (confirm("삭제 하시겠습니까?")) {
      posts.deletePost(id);
    }
  };

  const goComment = (id) => {
    // router.goto(`/posts/comments/${id}`);
    router.goto(`/posts/${currentMode}/comments/${id}`);
  };

  const onSubscribe = (id) => {
    if ($isLogin) {
      posts.subscribePost(id);
    }
  };

  const onCancelSubscribe = (id) => {
    if ($isLogin) {
      posts.cancelSubscribePost(id);
    }
  };
</script>

{#if $posts.editMode === post.id}
  <PostEditForm {post} />
{:else}
  <!-- do-u-understand-content-box start-->
  <div class="do-u-understand-content-box">
    <div class="content-box-header">
      <div class="content-box-header-inner-left">
        <p class="p-user">{post.userEmail}</p>
        <p class="p-date">{dateView(post.createdAt)}</p>
      </div>
      <div class="content-box-header-inner-right">
        {#if post.userId === $auth.id}
          <button
            class="button-base-circle"
            on:click={() => onToggleMenuPopup(post.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              ><path
                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              ></path></svg
            >
          </button>
          <div class="drop-menu-box" class:block={isViewMenu}>
            <ul>
              <li>
                <button
                  href="#"
                  class="drop-menu-button"
                  on:click={() => onEditModePost(post.id)}>수정</button
                >
              </li>
              <li>
                <button
                  href="#"
                  class="drop-menu-button"
                  on:click={() => onDeletePost(post.id)}>삭제</button
                >
              </li>
            </ul>
          </div>
        {/if}
      </div>
    </div>

    <div class="content-box-main">
      <p class="whitespace-pre-line">{post.title}</p>
    </div>
    <div class="content-box-main">
      <p class="whitespace-pre-line">{post.content}</p>
    </div>
    <div class="content-box-main-link">
      <p class="whitespace-pre-line">
        <a href={post.link}>{post.link}</a>
      </p>
    </div>
    <div class="content-box-main">
      <Tag {tags} {isReadOnly} />
      <!-- {#each post.tags as tag}
        <p class="content-tag">{tag}</p>
      {/each} -->
    </div>

    <div class="content-box-bottom">
      <div class="button-box-inner-left">
        {#if post.subscribeMe}
          <button class="flex" on:click={() => onCancelSubscribe(post.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6 h-6 mr-1 cursor-pointer"
            >
              <path
                d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"
              ></path>
            </svg>
            <!-- <p class="text-base">{post.likeCount}</p> -->
            <p class="text-base">Subscribe</p>
          </button>
        {:else}
          <button class="flex" on:click={() => onSubscribe(post.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6 h-6 mr-1 cursor-pointer"
            >
              <path
                d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"
              ></path>
            </svg>
            <!-- <p class="text-base">{post.likeCount}</p> -->
            <p class="text-base">Subscribe</p>
          </button>
        {/if}
      </div>
      <div class="button-box-inner-right">
        <button class="flex" on:click={() => goComment(post.id)}>
          <p class="text-base">{post.commentCount}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-6 w-6 ml-1"
          >
            <path
              d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <!-- do-u-understand-content-box end -->
{/if}
