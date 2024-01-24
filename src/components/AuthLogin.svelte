<script>
  import { auth } from "../stores";
  import {
    loginValidate,
    emailValidate,
    extractErrors,
  } from "../utils/validates";

  let errors = {};

  let values = {
    formEmail: "",
    formPassword: "",
  };

  const resetValues = () => {
    values.formEmail = "";
    values.formPassword = "";
  };

  const onLogin = async () => {
    try {
      await loginValidate.validate(values, { abortEarly: false });
      await auth.login(values.formEmail, values.formPassword);
      resetValues();
    } catch (error) {
      errors = extractErrors(error);
      if (errors.formEmail) alert(errors.formEmail);
      if (errors.formPassword) alert(errors.formPassword);
      //   alert("인증이 되지 않았습니다. 다시 시도해 주세요.");
    }
  };

  const onRefreshPassword = async () => {
    try {
      await emailValidate.validate(values, { abortEarly: false });
      await auth.sendPasswordRefreshMail(values.formEmail);
    } catch (error) {
      errors = extractErrors(error);
      if (errors.formEmail) alert(errors.formEmail);
    }
  };
</script>

<!-- login-box start-->
<div class="auth-content-box">
  <div class="auth-box-main">
    <div class="auth-input-box">
      <input
        type="email"
        name="floating_email"
        id="floating_email"
        class="auth-input-text peer"
        placeholder=" "
        bind:value={values.formEmail}
        class:wrong={errors.formEmail}
      />
      <label for="floating_email" class="auth-input-label">이메일</label>
    </div>
    <div class="auth-input-box">
      <input
        type="password"
        name="floating_password"
        id="floating_password"
        class="auth-input-text peer"
        placeholder=" "
        bind:value={values.formPassword}
        class:wrong={errors.formPassword}
      />
      <label for="floating_password" class="auth-input-label">비밀번호</label>
    </div>
  </div>
  <div class="content-box-bottom">
    <div class="button-box">
      <button class="button-base" on:click={onLogin}>로그인</button>
    </div>
  </div>
  <div class="content-box-bottom">
    <div>
      <p>
        비밀번호를 분실하신 경우 위 입력칸에 이메일 입력후 비밀번호 재설정
        버튼을 클릭해주세요
      </p>
    </div>
    <div class="button-box">
      <button class="button-base" on:click={onRefreshPassword}
        >비밀번호 재설정</button
      >
    </div>
  </div>
</div>

<!-- login-box end-->

<style>
  .wrong {
    border-bottom: 3px solid red;
  }
</style>
