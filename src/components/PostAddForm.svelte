<script>
  import { router } from "tinro";
  import { posts } from "../stores";
  import { contentValidate, extractErrors } from "../utils/validates";
  import Category from "./Category.svelte";

  let errors = {};
  let isReadOnly = false;

  let values = {
    formTitle: "",
    formContent: "",
    formLink: "",
  };

  let tags = [];

  const onAddPost = async () => {
    let tag = "";
    try {
      if (tags[0] === undefined) {
        tag = "no_category";
      } else {
        tag = tags[0];
      }
      await contentValidate.validate(values, { abortEarly: false });
      await posts.addPost(
        values.formTitle,
        values.formContent,
        values.formLink,
        tag
      );
      onCancelAddPost();
    } catch (error) {
      alert(error);
      errors = extractErrors(error);
      if (errors.formContent) alert(errors.formContent);
      //   alert(error);
    }
  };

  const onCancelAddPost = () => {
    values.formTitle = "";
    values.formContent = "";
    values.formLink = "";
    router.goto("/posts/my");
  };
</script>

<!-- do-u-understand-addForm start -->
<div class="do-u-understand-add-content-box">
  <div class="content-box-header">
    <div class="flex">
      <p class="font-bold">Create a Post</p>
    </div>
  </div>
  <div class="content-box-main-title">
    <textarea
      id="title"
      rows="1"
      class="do-u-understand-content-textarea"
      placeholder="제목을 입력해주세요."
      bind:value={values.formTitle}
    ></textarea>
  </div>
  <div class="content-box-main">
    <textarea
      id="content"
      rows="5"
      class="do-u-understand-content-textarea"
      placeholder="내용을 입력해주세요."
      bind:value={values.formContent}
    ></textarea>
  </div>
  <div class="content-box-main">
    <textarea
      id="link"
      rows="1"
      class="do-u-understand-content-textarea"
      placeholder="링크를 입력해주세요."
      bind:value={values.formLink}
    ></textarea>
  </div>
  <div class="p-4 bg-white shadow-md rounded-md">
    <Category {tags} {isReadOnly} />
  </div>
  <div class="content-box-bottom">
    <div class="button-box">
      <button class="button-base" on:click={onAddPost}>입력</button>
      <button class="button-base" on:click={onCancelAddPost}>취소</button>
    </div>
  </div>
</div>

<!-- do-u-understand-addForm end -->

<style>
  .button-base {
    padding: 10px 20px;
    background-color: #2196f3;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .button-base:hover {
    background-color: #0e83cd;
  }
</style>
