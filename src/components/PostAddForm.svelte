<script>
  import { posts } from "../stores";
  import { contentValidate, extractErrors } from "../utils/validates";
  import Tag from "./Tag.svelte";

  let errors = {};
  let isReadOnly = false;

  let values = {
    formTitle: "",
    formContent: "",
    formLink: "",
  };

  let tags = [];

  const onAddPost = async () => {
    try {
      await contentValidate.validate(values, { abortEarly: false });
      await posts.addPost(
        values.formTitle,
        values.formContent,
        values.formLink,
        tags
      );
    } catch (error) {
      errors = extractErrors(error);
      if (errors.formContent) alert(errors.formContent);
      //   alert(error);
    }
  };

  const onCancelAddPost = () => {
    values.formTitle = "";
    values.formContent = "";
    values.formLink = "";
    tags = [];
  };
</script>

<!-- do-u-understand-addForm start -->
<div class="do-u-understand-add-content-box">
  <div class="content-box-header">
    <div class="flex">
      <p>포스트를 작성해주세요.</p>
    </div>
  </div>
  <div class="content-box-main">
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
  <div class="do-u-understand-content-textarea">
    <Tag {tags} {isReadOnly} />
  </div>
  <div class="content-box-bottom">
    <div class="button-box">
      <button class="button-base" on:click={onAddPost}>입력</button>
      <button class="button-base" on:click={onCancelAddPost}>취소</button>
    </div>
  </div>
</div>
<!-- do-u-understand-addForm end -->
