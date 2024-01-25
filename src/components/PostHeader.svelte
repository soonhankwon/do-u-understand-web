<script>
  import { router } from "tinro";
  import { auth, isLogin, postsMode } from "../stores";
  import { ALL, SUBSCRIBE, MY, WRITE } from "../utils/constant";

  const goLogin = () => router.goto("/login");
  const onLogout = () => auth.logout();
  const onEditUserInfo = () => router.goto("/userInfo");

  const onChangeMode = (mode) => {
    // if ($postsMode !== mode) postsMode.changeMode(mode);
    if ($postsMode !== mode) router.goto(`/posts/${mode}`);
  };
</script>

<!-- start header -->
<header class="main-header">
  <p class="p-main-title">DO-U-UNDERSTAND</p>
  <nav class="main-nav">
    <button
      class="main-menu mr-6"
      class:main-menu-selected={$postsMode === ALL}
      on:click={() => onChangeMode(ALL)}>NOTICE</button
    >
    {#if $isLogin}
      <button
        class="main-menu mr-6"
        class:main-menu-selected={$postsMode === SUBSCRIBE}
        on:click={() => onChangeMode(SUBSCRIBE)}>SUBSCRIBE</button
      >
      <button
        class="main-menu mr-6"
        class:main-menu-selected={$postsMode === MY}
        on:click={() => onChangeMode(MY)}>MY POST</button
      >
      <button
        class="main-menu"
        class:main-menu-selected={$postsMode === WRITE}
        on:click={() => onChangeMode(WRITE)}>WRITE</button
      >
    {:else}
      <button class="main-menu mr-6 main-menu-blocked">SUBSCRIBE</button>
      <button class="main-menu mr-6 main-menu-blocked">MY POST</button>
      <button class="main-menu main-menu-blocked">WRITE</button>
    {/if}
  </nav>

  <!--로그인 -->
  {#if $isLogin}
    <button href="#" class="text-white" on:click={onEditUserInfo}>
      <p>{$auth.email}</p>
    </button>
    <button href="#" class="text-white" on:click={onLogout}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="h-7 w-7 fill-white"
        ><path d="m13 16 5-4-5-4v3H4v2h9z"></path><path
          d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"
        ></path></svg
      >
    </button>
  {:else}
    <button href="#" class="text-white" on:click={goLogin}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="h-7 w-7 fill-white"
        ><path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path><path
          d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"
        ></path></svg
      >
    </button>
  {/if}
</header>
<!-- end header -->
