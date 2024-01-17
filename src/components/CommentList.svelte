<script>
  import Comment from "./Comment.svelte";

  import { onMount } from "svelte";
  import { router, meta } from "tinro";
  import { postContent, comments, isLogin } from "../stores";
  import { extractErrors, contentValidate } from "../utils/validates";

  let errors = {};

  const route = meta();
  const postId = Number(route.params.id);

  let values = {
    formContent: "",
  };

  onMount(() => {
    postContent.getPost(postId);
    comments.fetchComments(postId);
  });

  const goPosts = () => router.goto(`/posts`);

  const onAddComment = async () => {
    try {
      await contentValidate.validate(values, { abortEarly: false });
      await comments.addComment(postId, values.formContent);
      values.formContent = "";
    } catch (error) {
      errors = extractErrors(error);
      if (errors.formContent) alert(errors.formContent);
    }
  };
</script>

<!-- do-u-understand-comment-wrap start-->
<div class="do-u-understand-comment-wrap">
  <!-- do-u-understand-comment-box start-->
  <div class="do-u-understand-comment-box">
    <div class="comment-box-header">
      <div class="content-box-header-inner-left">
        <p class="p-user">{$postContent.userEmail}</p>
        <p class="p-date">{$postContent.createdAt}</p>
      </div>
    </div>

    <div class="comment-box-main">
      <p class="whitespace-pre-line">{$postContent.content}</p>
      <div class="inner-button-box">
        <button class="button-base" on:click={goPosts}>글 목록 보기</button>
      </div>
    </div>

    <div class="commnet-list-box">
      <h1 class="comment-title">Comments</h1>
      <ul class="my-5">
        {#each $comments as comment, index}
          <Comment {comment} {postId} />
        {/each}
      </ul>
    </div>

    <div class="comment-box-bottom">
      <textarea
        id="message"
        rows="5"
        class="do-u-understand-content-textarea"
        placeholder="내용을 입력해 주세요."
        bind:value={values.formContent}
      ></textarea>
      <div class="button-box-full">
        <button class="button-base" on:click={onAddComment}>입력</button>
      </div>
    </div>
  </div>
  <!-- do-u-understand-comment-box end -->
</div>
<!-- do-u-understand-comment-wrap end-->
