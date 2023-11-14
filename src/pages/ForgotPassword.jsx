import { useCallback, useState } from "react";
import "./ForgotPassword.css"; 
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  
  });

  const { email } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Check your email for password reset instructions");

      // Clear the email input field after successful submission
      setFormData((prevState) => ({
        ...prevState,
        email: '',
      }));
    } catch (err) {
      alert(err.code);
    }
  };

  const onSignUpTextClick = useCallback(() => {
    // Please sync "create account" to the project
  }, []);

  return (
    <div>
      <section>
        <h1 className="text-center p-4 text-4xl font-bold">Forgot Password</h1>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
          <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
            <img src='/image-11@2x.png' alt="key" className='w-full rounded-2xl'/>
          </div>
          <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
            <form onSubmit={handleSubmit}>
              <p className="mb-4">
                Enter the email address you used when you joined and we’ll send you
                instructions to reset your password.
              </p>
              <div>
                <p>Email</p>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  placeholder="name@gmail.com"
                  className="w-full px-4 py-2 text-xl border border-gray-300 rounded"
                />
              </div>


              <button
                className="mt-4 mb-4 w-full bg-[#7ca0fb] text-white px-7 py-3 font-semibold uppercase rounded-xl hover:bg-blue-500 transition duration-150 ease-in-out hover:shadow-lg active-bg-blue-600"
                type="submit"
>
                Send Reset Instructions
              </button>

              <div className="flex space-x-4">
                <p className='font-semibold '>Don't have an account?</p>
                <p className='text-center text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out'>
                  <Link to="/create-account" className=''>Sign up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;


{/* <div className={styles.forgotPassword}>
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
    </div> */}