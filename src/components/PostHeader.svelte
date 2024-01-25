<script>
  import { router } from "tinro";
  import { auth, isLogin, postsMode } from "../stores";
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
</script>

<!-- start header -->
<header class="main-header">
  <p class="p-main-title">DO-U-UNDERSTAND</p>
  <nav class="main-nav">
    <button
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
        class="main-menu mr-6"
        class:main-menu-selected={$postsMode === SUBSCRIBE}
        on:click={() => onChangeMode(SUBSCRIBE)}
        ><Icon icon="solar:mailbox-bold" color="white" width="24" /></button
      >
      <button
        class="main-menu mr-6"
        class:main-menu-selected={$postsMode === MY}
        on:click={() => onChangeMode(MY)}
        ><Icon icon="gg:list" color="white" width="24" /></button
      >
      <button
        class="main-menu"
        class:main-menu-selected={$postsMode === WRITE}
        on:click={() => onChangeMode(WRITE)}
        ><Icon icon="ic:baseline-plus" color="white" width="24" /></button
      >
    {:else}
      <button class="main-menu mr-6 main-menu-blocked"
        ><Icon icon="solar:mailbox-bold" color="white" width="24" /></button
      >
      <button class="main-menu mr-6 main-menu-blocked"
        ><Icon icon="gg:list" color="white" width="24" /></button
      >
      <button class="main-menu main-menu-blocked"
        ><Icon icon="ic:baseline-plus" color="white" width="24" /></button
      >
    {/if}
  </nav>

  <!--로그인 -->
  {#if $isLogin}
    <button href="#" class="text-white" on:click={onEditUserInfo}>
      <p>{$auth.email}</p>
    </button>
    <button href="#" on:click={onLogout}>
      <Icon icon="material-symbols:logout" color="white" width="24" />
    </button>
  {:else}
    <button href="#" on:click={goLogin}>
      <Icon icon="material-symbols:login" color="white" width="24" />
    </button>
  {/if}
</header>
<!-- end header -->
