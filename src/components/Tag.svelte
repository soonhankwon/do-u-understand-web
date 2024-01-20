<script>
  import Tags from "svelte-tags-input";

  export let tags;
  export let isReadOnly;

  const autoCompleteList = ["java", "spring"];
</script>

{#if isReadOnly}
  <Tags
    bind:tags
    addKeys={[13]}
    maxTags={3}
    allowPaste={true}
    allowDrop={true}
    splitWith={"/"}
    onlyUnique={true}
    removeKeys={[27]}
    placeholder={""}
    autoComplete={autoCompleteList}
    name={"tags-input"}
    id={"tags-input"}
    allowBlur={true}
    disable={false}
    readonly={true}
    minChars={3}
    onlyAutocomplete={false}
    labelText="Tags"
    labelShow
  />
{:else}
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
    onTagClick={(tag) => console.log(tag)}
  />
{/if}
