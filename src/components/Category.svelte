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
    maxTags={1}
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
    labelText="Category:"
    labelShow
  />
{:else}
  <Tags
    bind:tags
    addKeys={[13]}
    maxTags={1}
    allowPaste={true}
    allowDrop={true}
    splitWith={"/"}
    onlyUnique={true}
    removeKeys={[8]}
    placeholder={"카테고리를 입력해주세요."}
    autoComplete={autoCompleteList}
    name={"tags-input"}
    id={"tags-input"}
    allowBlur={true}
    disable={false}
    readonly={false}
    minChars={3}
    onlyAutocomplete={false}
  />
{/if}
