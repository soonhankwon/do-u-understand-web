import { writable, get, derived } from "svelte/store";
import { getApi, putApi, delApi, postApi } from "../service/api";
import { router } from "tinro";

function setCurrentPostsPage() {
  const { subscribe, update, set } = writable(0);

  const resetPage = () => set(0);
  const increPage = () => {
    update((data) => (data = data + 1));
    posts.fetchPosts();
  };

  return {
    subscribe,
    resetPage,
    increPage,
  };
}

function setPosts() {
  let initValues = {
    postList: [],
    totalPageCount: 0,
    menuPopup: "",
    editMode: "",
  };

  const { subscribe, update, set } = writable({ ...initValues });

  const fetchPosts = async () => {
    loadingPost.turnOnLoading();
    const currentPage = get(currentPostsPage);
    let path = `/posts?pageNumber=${currentPage}`;

    try {
      const access_token = get(auth).Authorization;

      const options = {
        path: path,
        access_token: access_token,
      };

      const getDatas = await getApi(options);

      const newData = {
        postList: getDatas.postList,
        totalPageCount: getDatas.totalPageCount,
      };

      update((datas) => {
        if (currentPage === 0) {
          datas.postList = newData.postList;
          datas.totalPageCount = newData.totalPageCount;
        } else {
          const newPosts = [...datas.postList, ...newData.postList];
          datas.postList = newPosts;
          datas.totalPageCount = newData.totalPageCount;
        }
        return datas;
      });
      loadingPost.turnOffLoading();
    } catch (error) {
      loadingPost.turnOffLoading();
      throw error;
    }
  };

  const resetPosts = () => {
    set({ ...initValues });
    currentPostsPage.resetPage();
    postPageLock.set(false);
  };

  return {
    subscribe,
    fetchPosts,
    resetPosts,
  };
}

function setLoadingPost() {
  const { subscribe, set } = writable(false);

  const turnOnLoading = () => {
    set(true);
    postPageLock.set(true);
  };

  const turnOffLoading = () => {
    set(false);
    postPageLock.set(false);
  };

  return {
    subscribe,
    turnOnLoading,
    turnOffLoading,
  };
}

function setPostContent() {}
function setComments() {}

function setAuth() {
  let initValues = {
    id: "",
    email: "",
    Authorization: "",
  };

  const { subscribe, set, update } = writable({ ...initValues });

  const refresh = async () => {
    try {
      const authenticationUser = await postApi({ path: "/auth/refresh" });
      set(authenticationUser);
      isRefresh.set(true);
    } catch (error) {
      auth.resetUserInfo();
      isRefresh.set(false);
    }
  };

  const resetUserInfo = async () => set({ ...initValues });

  const login = async (email, password) => {
    try {
      const options = {
        path: "/auth/login",
        data: {
          email: email,
          password: password,
        },
      };

      const result = await postApi(options);
      set(result);
      isRefresh.set(true);
      router.goto("/posts");
    } catch (error) {
      alert("오류가 발생했습니다. 로그인을 다시 시도해 주세요.");
    }
  };

  const logout = async () => {
    try {
      const options = {
        path: "/auth/logout",
      };
      await delApi(options);
      set({ ...initValues });
      isRefresh.set(false);
      router.goto("/");
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const register = async (email, password) => {
    try {
      const options = {
        path: "/users",
        data: {
          email: email,
          password: password,
          code: "1",
          isAllowedNotification: false,
        },
      };

      await postApi(options);
      alert("가입이 완료되었습니다.");
      router.goto("/login");
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return {
    subscribe,
    refresh,
    login,
    logout,
    resetUserInfo,
    register,
  };
}

function setPostsMode() {}

function setIsLogin() {
  const checkLogin = derived(auth, ($auth) =>
    $auth.Authorization ? true : false
  );
  return checkLogin;
}

export const currentPostsPage = setCurrentPostsPage();
export const posts = setPosts();
export const postPageLock = writable(false);
export const loadingPost = setLoadingPost();
export const postConetent = setPostContent();
export const comments = setComments();
export const auth = setAuth();
export const postsMode = setPostsMode();
export const isLogin = setIsLogin();
export const isRefresh = writable(false);
