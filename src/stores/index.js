import { writable, get, derived } from "svelte/store";
import { getApi, putApi, delApi, postApi, patchApi } from "../service/api";
import { router } from "tinro";
import { ALL, SUBSCRIBE, MY } from "../utils/constant";

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
    // let path = `/posts?pageNumber=${currentPage}`;
    let path = "";
    const mode = get(postsMode);

    switch (mode) {
      case ALL:
        path = `/posts?pageNumber=${currentPage}&mode=${mode}`;
        break;
      case SUBSCRIBE:
        path = `/subscribe?pageNumber=${currentPage}`;
        break;
      case MY:
        path = `/posts?pageNumber=${currentPage}&mode=${mode}`;
        break;
      default:
        path = `/posts/${currentPage}`;
        break;
    }

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
          //   datas.postList = newPosts;
          const uniqueArr = newPosts.filter(
            (arr, index, callback) =>
              index === callback.findIndex((t) => t.id === arr.id)
          );
          datas.postList = uniqueArr;
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

  const addPost = async (title, content, link, tags) => {
    const access_token = get(auth).Authorization;
    try {
      const options = {
        path: "/posts",
        data: {
          title: title,
          content: content,
          link: link,
          categoryNames: tags,
        },
        access_token: access_token,
      };

      const newPost = await postApi(options);

      update((datas) => {
        datas.postList = [newPost, ...datas.postList];
        return datas;
      });
      return;
    } catch (error) {
      throw error;
    }
  };

  const openMenuPopup = (id) => {
    update((datas) => {
      datas.menuPopup = id;
      return datas;
    });
  };

  const closeMenuPopup = (id) => {
    update((datas) => {
      datas.menuPopup = "";
      return datas;
    });
  };

  const openEditModePost = (id) => {
    posts.closeMenuPopup();

    update((datas) => {
      datas.editMode = id;
      return datas;
    });
  };

  const closeEditModePost = () => {
    update((datas) => {
      datas.editMode = "";
      return datas;
    });
  };

  const updatePost = async (post) => {
    const access_token = get(auth).Authorization;
    try {
      const updateData = {
        title: post.title,
        content: post.content,
        link: post.link,
        categoryName: post.categoryName,
      };

      const options = {
        path: `/posts/${post.id}`,
        data: updateData,
        access_token: access_token,
      };

      const updatePost = await putApi(options);

      update((datas) => {
        const newPostList = datas.postList.map((post) => {
          if (post.id === updatePost.id) {
            post = updatePost;
          }
          return post;
        });
        datas.postList = newPostList;
        return datas;
      });

      posts.closeEditModePost();
      alert("수정이 완료되었습니다.");
    } catch (error) {
      alert("수정중에 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const deletePost = async (id) => {
    const access_token = get(auth).Authorization;

    try {
      const options = {
        path: `/posts/${id}`,
        access_token: access_token,
      };

      await delApi(options);

      update((datas) => {
        const newPostList = datas.postList.filter((post) => post.id !== id);
        datas.postList = newPostList;
        return datas;
      });
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const increPostCommentCount = (postId) => {
    update((datas) => {
      const newPostList = datas.postList.map((post) => {
        if (post.id === postId) {
          post.commentCount = post.commentCount + 1;
        }
        return post;
      });

      datas.postList = newPostList;
      return datas;
    });
  };

  const decrePostCommentCount = (postId) => {
    update((datas) => {
      const newPostList = datas.postList.map((post) => {
        if (post.id === postId) {
          post.commentCount = post.commentCount - 1;
        }
        return post;
      });

      datas.postList = newPostList;
      return datas;
    });
  };

  const subscribePost = async (postId) => {
    const access_token = get(auth).Authorization;

    try {
      const options = {
        path: `/subscribe/${postId}`,
        access_token: access_token,
      };

      await postApi(options);

      update((datas) => {
        const newPosts = datas.postList.map((post) => {
          if (post.id === postId) {
            // post.likeCount = post.likeCount + 1;
            post.subscribeMe = true;
          }
          return post;
        });
        datas.postList = newPosts;
        return datas;
      });
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const cancelSubscribePost = async (postId) => {
    const access_token = get(auth).Authorization;

    try {
      const options = {
        path: `/subscribe/${postId}`,
        access_token: access_token,
      };

      await delApi(options);

      update((datas) => {
        const newPosts = datas.postList.map((post) => {
          if (post.id === postId) {
            // post.likeCount = post.likeCount - 1;
            post.subscribeMe = false;
          }
          return post;
        });
        datas.postList = newPosts;
        return datas;
      });
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return {
    subscribe,
    fetchPosts,
    resetPosts,
    addPost,
    openMenuPopup,
    closeMenuPopup,
    openEditModePost,
    closeEditModePost,
    updatePost,
    deletePost,
    increPostCommentCount,
    decrePostCommentCount,
    subscribePost,
    cancelSubscribePost,
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

function setPostContent() {
  let initValues = {
    id: "",
    userId: "",
    userEmail: "",
    content: "",
    createdAt: "",
    commentCount: 0,
    likeCount: 0,
    categoryName: "",
    likeUsers: [],
  };

  const { subscribe, set } = writable({ ...initValues });

  const getPost = async (id) => {
    const access_token = get(auth).Authorization;
    try {
      const options = {
        path: `/posts/${id}`,
        access_token: access_token,
      };

      const getData = await getApi(options);
      set(getData);
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return {
    subscribe,
    getPost,
  };
}

function setComments() {
  const { subscribe, update, set } = writable([]);

  const fetchComments = async (id) => {
    const access_token = get(auth).Authorization;
    try {
      const options = {
        path: `/comments/${id}`,
        access_token: access_token,
      };

      const getDatas = await getApi(options);
      set(getDatas.comments);
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };
  const addComment = async (postId, commentContent) => {
    const access_token = get(auth).Authorization;

    try {
      const options = {
        path: "/comments",
        data: {
          postId: postId,
          content: commentContent,
        },
        access_token: access_token,
      };

      const newData = await postApi(options);
      update((datas) => [...datas, newData]);
      posts.increPostCommentCount(postId);
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const deleteComment = async (commentId, postId) => {
    const access_token = get(auth).Authorization;

    try {
      const options = {
        path: "/comments",
        data: {
          commentId: commentId,
          postId: postId,
        },
        access_token: access_token,
      };

      await delApi(options);
      update((datas) => datas.filter((comment) => comment.id !== commentId));
      posts.decrePostCommentCount(postId);
      alert("코멘트가 삭제 되었습니다.");
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return {
    subscribe,
    fetchComments,
    addComment,
    deleteComment,
  };
}

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
      router.goto("/posts/all");
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
      //   router.goto("/");
      postsMode.changeMode(ALL);
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const sendAuthEmail = async (email) => {
    try {
      const options = {
        path: "/auth/email",
        data: {
          email: email,
        },
      };
      const response = await postApi(options);
      alert(email + "로 인증메일이 발송되었습니다.");
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const register = async (email, password, notification) => {
    try {
      const options = {
        path: "/users",
        data: {
          email: email,
          password: password,
          code: "1",
          isAllowedNotification: notification,
        },
      };

      await postApi(options);
      alert("가입이 완료되었습니다.");
      router.goto("/login");
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const updatePassword = async (password, code) => {
    const access_token = get(auth).Authorization;
    try {
      const options = {
        path: "/users/update",
        data: {
          password: password,
          authCode: code,
        },
        access_token: access_token,
      };

      const result = await putApi(options);
      alert("비밀번호가 업데이트 되었습니다.");
      set(result);
      isRefresh.set(true);
      router.goto("/login");
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const deleteUser = async (code) => {
    const access_token = get(auth).Authorization;
    try {
      const options = {
        path: `/users/delete?code=${code}`,
        access_token: access_token,
      };

      await patchApi(options);
      alert("정상적으로 요청이 진행되었습니다.");
      router.goto("/");
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
    sendAuthEmail,
    updatePassword,
    deleteUser,
  };
}

function setPostsMode() {
  const { subscribe, update, set } = writable(ALL);

  const changeMode = async (mode) => {
    set(mode);
    posts.resetPosts();
    await posts.fetchPosts();
  };

  return {
    subscribe,
    changeMode,
  };
}

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
export const postContent = setPostContent();
export const comments = setComments();
export const auth = setAuth();
export const postsMode = setPostsMode();
export const isLogin = setIsLogin();
export const isRefresh = writable(false);
