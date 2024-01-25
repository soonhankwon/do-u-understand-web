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

  let refreshPwdValues = {
    formRefreshPwdEmail: "",
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
      await emailValidate.validate(refreshPwdValues, {
        abortEarly: false,
      });
      await auth.sendPasswordRefreshMail(refreshPwdValues.formRefreshPwdEmail);
    } catch (error) {
      errors = extractErrors(error);
      if (errors.formRefreshPwdEmail) alert(errors.formRefreshPwdEmail);
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
    <div class="auth-input-box">
      <input
        type="email"
        name="floating_refresh_pwd_email"
        id="floating_refresh_pwd_email"
        class="auth-input-text peer"
        placeholder=" "
        bind:value={refreshPwdValues.formRefreshPwdEmail}
        class:wrong={errors.formRefreshPwdEmail}
      />
      <label for="floating_refresh_pwd_email" class="auth-input-label"
        >임시 비밀번호를 받을 이메일을 입력해주세요.</label
      >
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
  .content-box-bottom {
    display: flex;
    flex-direction: column;
    align-items: center; /* 중앙 정렬 */
  }
  .button-box {
    margin-top: 10px; /* 버튼과 상단 텍스트 간의 간격 조절 */
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
</style>
