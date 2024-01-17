import { writable, get } from "svelte/store";
import { getApi, putApi, delApi, postApi } from "../service/api";
import { router } from "tinro";

function setCurrentPostsPage() {}
function setPosts() {}
function setLoadingPost() {}
function setPostContent() {}
function setComments() {}

function setAuth() {}

function setPostsMode() {}
function setIsLogin() {}

export const currentPostsPage = setCurrentPostsPage();
export const posts = setPosts();
export const loadingPost = setLoadingPost();
export const postConetent = setPostContent();
export const comments = setComments();
export const auth = setAuth();
export const postsMode = setPostsMode();
export const isLogin = setIsLogin();
