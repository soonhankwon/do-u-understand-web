import { writable, get, derived } from "svelte/store";
import { getApi, putApi, delApi, postApi } from "../service/api";
import { router } from "tinro";

function setCurrentPostsPage() {}
function setPosts() {}
function setLoadingPost() {}
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
export const loadingPost = setLoadingPost();
export const postConetent = setPostContent();
export const comments = setComments();
export const auth = setAuth();
export const postsMode = setPostsMode();
export const isLogin = setIsLogin();
export const isRefresh = writable(false);
