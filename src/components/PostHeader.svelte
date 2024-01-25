<script>
  import { router } from "tinro";
  import { auth, isLogin, postsMode, posts } from "../stores";
  import { ALL, SUBSCRIBE, MY, WRITE } from "../utils/constant";
  import Icon from "@iconify/svelte";

  const goLogin = () => router.goto("/login");
  const onLogout = () => auth.logout();
  const onEditUserInfo = () => {
    postsMode.changeMode();
    router.goto("/userInfo");
  };

  const onChangeMode = (mode) => {
    // if ($postsMode !== mode) postsMode.changeMode(mode);
    if ($postsMode !== mode) router.goto(`/posts/${mode}`);
  };

  let query = "";

  const onSearch = () => {
    posts.fetchPosts(query);
    offSearch();
  };
  const offSearch = () => {
    query = "";
  };
</script>

<!-- start header -->
<header class="main-header">
  <p class="p-main-title">SELFnews</p>
  <div>
    <button title="Search" class="main-menu" on:click={onSearch}
      ><Icon icon="material-symbols:search" color="white" width="16" /></button
    >
    <input
      type="text"
      id="search-input"
      class="main-menu-search"
      placeholder=" Search by category"
      bind:value={query}
    />
  </div>

  <nav class="main-nav">
    <button
      title="Notification"
      class="main-menu mr-6"
      class:main-menu-selected={$postsMode === ALL}
      on:click={() => onChangeMode(ALL)}
      ><Icon
        icon="icon-park-twotone:volume-notice"
        color="white"
        width="24"
      /></button
    >
    {#if $isLogin}
      <button
        title="Subscribe"
        class="main-menu mr-6"
        class:main-menu-selected={$postsMode === SUBSCRIBE}
        on:click={() => onChangeMode(SUBSCRIBE)}
        ><Icon icon="solar:mailbox-bold" color="white" width="24" /></button
      >
      <button
        title="MyPost"
        class="main-menu mr-6"
        class:main-menu-selected={$postsMode === MY}
        on:click={() => onChangeMode(MY)}
        ><Icon icon="gg:list" color="white" width="24" /></button
      >
      <button
        title="Create"
        class="main-menu mr-6"
        class:main-menu-selected={$postsMode === WRITE}
        on:click={() => onChangeMode(WRITE)}
        ><Icon icon="ic:baseline-plus" color="white" width="24" /></button
      >
      <button
        title="MyInfo"
        class="main-menu mr-6"
        href="#"
        on:click={onEditUserInfo}
      >
        <Icon icon="ic:baseline-account-box" color="white" width="24" />
      </button>
    {:else}
      <button title="Subscribe" class="main-menu mr-6 main-menu-blocked"
        ><Icon icon="solar:mailbox-bold" color="white" width="24" /></button
      >
      <button title="MyPost" class="main-menu mr-6 main-menu-blocked"
        ><Icon icon="gg:list" color="white" width="24" /></button
      >
      <button title="Create" class="main-menu mr-6 main-menu-blocked"
        ><Icon icon="ic:baseline-plus" color="white" width="24" /></button
      >
    {/if}

    {#if $isLogin}
      <button title="Logout" href="#" on:click={onLogout}>
        <Icon icon="material-symbols:logout" color="white" width="24" />
      </button>
    {:else}
      <button title="Login" href="#" on:click={goLogin}>
        <Icon icon="material-symbols:login" color="white" width="24" />
      </button>
    {/if}
  </nav>
  <!--로그인 -->
</header>
<!-- end header -->
