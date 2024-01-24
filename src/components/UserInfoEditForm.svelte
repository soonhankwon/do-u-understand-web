<script>
  import { auth } from "../stores";
  import { updatePasswordValidate, extractErrors } from "../utils/validates";

  let errors = {};

  let values = {
    formPassword: "",
    formPasswordConfirm: "",
    formCode: "",
  };

  const onSendAuthEmail = async () => {
    try {
      await auth.sendAuthEmail($auth.email);
    } catch (error) {
      alert("인증코드 발송에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const onUpdatePassword = async () => {
    try {
      await updatePasswordValidate.validate(values, { abortEarly: false });
      await auth.updatePassword(values.formPassword, values.formCode);
      resetValues();
    } catch (error) {
      errors = extractErrors(error);
      if (errors.formPassword) alert(errors.formPassword);
      if (errors.formPasswordConfirm) alert(errors.formPasswordConfirm);
      if (errors.formCode) alert(errors.formCode);
    }
  };

  const onDeleteUser = async () => {
    try {
      await auth.deleteUser(values.formCode);
      resetValues();
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다. 디시 시도해주세요.");
    }
  };

  const resetValues = async () => {
    values.formPassword = "";
    values.formPasswordConfirm = "";
    values.formCode = "";
  };
</script>

<div class="auth-content-box">
  <div class="auth-box-main">
    <p>Email: {$auth.email}</p>
    <div class="auth-input-box">
      <input
        type="password"
        name="floating_password_edit"
        id="floating_password_edit"
        class="auth-input-text peer"
        placeholder=" "
        bind:value={values.formPassword}
        class:wrong={errors.formPassword}
      />
      <label for="floating_password_edit" class="auth-input-label"
        >패스워드를 입력해주세요.</label
      >
    </div>
    <div class="auth-input-box">
      <input
        type="password"
        name="floating_password_confirm_edit"
        id="floating_password_confirm_edit"
        class="auth-input-text peer"
        placeholder=" "
        bind:value={values.formPasswordConfirm}
        class:wrong={errors.formPasswordConfirm}
      />
      <label for="floating_password_confirm_edit" class="auth-input-label"
        >패스워드 확인을 입력해주세요.</label
      >
    </div>
    <div class="auth-input-box">
      <input
        type="text"
        name="floating_auth_code_edit"
        id="floating_auth_code_edit"
        class="auth-input-text peer"
        placeholder=" "
        bind:value={values.formCode}
        class:wrong={errors.formCode}
      />
      <label for="floating_auth_code_edit" class="auth-input-label"
        >패스워드 변경 또는 탈퇴시 이메일 인증 코드를 입력해주세요.</label
      >
    </div>
    <div class="button-box">
      <button class="button-base" on:click={onSendAuthEmail}
        >인증코드 발급</button
      >
      <button class="button-base" on:click={onUpdatePassword}
        >비밀번호 수정</button
      >
      <button class="button-base" on:click={onDeleteUser}>회원 탈퇴</button>
    </div>
  </div>
</div>

<style>
  .wrong {
    border-bottom: 3px solid red;
  }
  .button-box {
    margin-top: 20px;
  }

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
