<script>
  import { auth } from "../stores";
  import { registerValidate, extractErrors } from "../utils/validates";

  let errors = {};

  let values = {
    formEmail: "",
    formPassword: "",
    formPasswordConfirm: "",
    formEmailAuthCode: "",
    formNotification: true,
  };

  const onRegister = async () => {
    try {
      await registerValidate.validate(values, { abortEarly: false });
      await auth.register(
        values.formEmail,
        values.formPassword,
        values.formNotification
      );
    } catch (error) {
      errors = extractErrors(error);
      if (errors.formEmail) alert(errors.formEmail);
      if (errors.formPassword) alert(errors.formPassword);
      if (errors.formPasswordConfirm) alert(errors.formPasswordConfirm);
      //   alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const onSendAuthEmail = async () => {
    try {
      await auth.sendAuthEmail(values.formEmail);
    } catch (error) {
      alert("인증코드 발송에 실패했습니다. 다시 시도해 주세요.");
    }
  };
</script>

<!-- register-box start-->
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
        type="email"
        name="floating_auth_email"
        id="floating_auth_email"
        class="auth-input-text peer"
        placeholder=" "
        bind:value={values.formEmailAuthCode}
      />
      <label for="floating_email" class="auth-input-label"
        >이메일 인증 코드</label
      >
    </div>
    <div class="button-box">
      <button class="button-base" on:click={onSendAuthEmail}
        >인증코드 발급</button
      >
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
    <div class="auth-input-box">
      <input
        type="password"
        name="floating_password_confirm"
        id="floating_password_confirm"
        class="auth-input-text peer"
        placeholder=" "
        bind:value={values.formPasswordConfirm}
        class:wrong={errors.formPasswordConfirm}
      />
      <label for="floating_password_confirm" class="auth-input-label"
        >비밀번호 확인</label
      >
    </div>
    <div class="auth-input-box">
      <form>
        <label>
          <input type="checkbox" bind:checked={values.formNotification} />
          이메일 수신여부
        </label>
      </form>
    </div>
  </div>
  <div class="content-box-bottom">
    <div class="button-box">
      <button class="button-base" on:click={onRegister}>회원가입</button>
    </div>
  </div>
</div>

<!-- register-box end-->

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
