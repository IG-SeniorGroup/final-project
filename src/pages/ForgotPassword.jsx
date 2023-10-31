import { useCallback } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const onSignUpTextClick = useCallback(() => {
    // Please sync "create account" to the project
  }, []);

  return (
    <div className="forgot-password">
      <h1 className="forgot-password1">Forgot Password</h1>
      <input
        className="textfield-contained-input"
        value="Email"
        placeholder="name@example.com"
        type="text"
        defaultValue="Email"
      />
      <button className="forgot-password-child" />
      <h2 className="send-reset-instructions">Send Reset Instructions</h2>
      <div className="enter-the-email">
        Enter the email address you used when you joined and we’ll send you
        instructions to reset you password.
      </div>
      <b className="dont-have-an">Dont have an account?</b>
      <b className="sign-up" onClick={onSignUpTextClick}>
        Sign up
      </b>
      <img className="image-11-icon" alt="" src="/image-11@2x.png" />
    </div>
  );
};

export default ForgotPassword;