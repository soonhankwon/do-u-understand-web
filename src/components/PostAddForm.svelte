<script>
  import { posts } from "../stores";
  import { contentValidate, extractErrors } from "../utils/validates";
  import Tags from "svelte-tags-input";

  let errors = {};

  let values = {
    formTitle: "",
    formContent: "",
    formLink: "",
  };

  let tags = [];
  const autoCompleteList = ["java", "spring"];

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
  <Tags
    bind:tags
    addKeys={[13]}
    maxTags={3}
    allowPaste={true}
    allowDrop={true}
    splitWith={"/"}
    onlyUnique={true}
    removeKeys={[27]}
    placeholder={"태그를 입력해주세요."}
    autoComplete={autoCompleteList}
    name={"tags-input"}
    id={"tags-input"}
    allowBlur={true}
    disable={false}
    readonly={false}
    minChars={3}
    onlyAutocomplete={false}
    labelText="Tags"
    labelShow
    onTagClick={(tag) => console.log(tag)}
  />
  <div class="content-box-bottom">
    <div class="button-box">
      <button class="button-base" on:click={onAddPost}>입력</button>
      <button class="button-base" on:click={onCancelAddPost}>취소</button>
    </div>
  </div>
</div>
<!-- do-u-understand-addForm end -->
