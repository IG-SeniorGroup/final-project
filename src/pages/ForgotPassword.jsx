import { useCallback } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const onSignUpTextClick = useCallback(() => {
    // Please sync "create account" to the project
  }, []);

  return (
    <div className={styles.forgotPassword}>
      <header className={styles.lightLogoLeft5LinksCe}>
        <div className={styles.headerBg} />
        <a className={styles.login}>Login</a>
        <div className={styles.home}>HOme</div>
        <div className={styles.logo}>Logo</div>
        <div className={styles.explore}>Explore</div>
      </header>
      <h1 className={styles.forgotPassword1}>Forgot Password</h1>
      <input
        className={styles.textfieldContainedInput}
        value="Email"
        placeholder="name@example.com"
        type="text"
        defaultValue="Email"
      />
      <button className={styles.forgotPasswordChild} />
      <img
        className={styles.bookCheckFillIcon}
        alt=""
        src="/book-check-fill.svg"
      />
      <h2 className={styles.sendResetInstructions}>Send Reset Instructions</h2>
      <div className={styles.enterTheEmail}>
        Enter the email address you used when you joined and we’ll send you
        instructions to reset you password.
      </div>
      <b className={styles.dontHaveAn}>Dont have an account?</b>
      <b className={styles.signUp} onClick={onSignUpTextClick}>
        Sign up
      </b>
      <img className={styles.image11Icon} alt="" src="/image-11@2x.png" />
    </div>
  );
};

export default ForgotPassword;
