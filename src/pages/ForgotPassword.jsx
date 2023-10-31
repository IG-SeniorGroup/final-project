import { useCallback } from "react";
const ForgotPassword = () => {
  const onSignUpTextClick = useCallback(() => {
    // Please sync "create account" to the project
  }, []);

  return (
    <div className="relative bg-light-white w-full h-[982px] overflow-hidden text-left text-base text-black font-h1-bold-60-82-01px">
    
      <h1 className="m-0 absolute top-[137px] left-[509px] text-41xl tracking-[0.1px] leading-[82px] font-bold font-inherit text-neutral-black inline-block w-[494px] h-[75px]">
        Forgot Password
      </h1>
      <input
        className="[border:none] font-h1-bold-60-82-01px text-sm bg-[transparent] absolute top-[410px] left-[895px] w-[410px] h-[98px]"
        value="Email"
        placeholder="name@example.com"
        type="text"
        defaultValue="Email"
      />
      <button className="cursor-pointer [border:none] p-0 bg-cornflowerblue absolute top-[519px] left-[895px] rounded-[15px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-[410px] h-[63px]" />
      <h2 className="m-0 absolute top-[533px] left-[964px] text-[24px] tracking-[0.1px] leading-[32px] font-bold font-inherit text-light-white inline-block w-[271px] h-[34px]">
        Send Reset Instructions
      </h2>
      <div className="absolute top-[334px] left-[895px] tracking-[0.1px] leading-[30px] font-medium inline-block w-[410px] h-14">
        Enter the email address you used when you joined and we’ll send you
        instructions to reset you password.
      </div>
      <b className="absolute top-[621px] left-[936px] tracking-[0.1px] leading-[21px] inline-block w-[220px] h-[27px]">
        Dont have an account?
      </b>
      <b
        className="absolute top-[620px] left-[1141px] tracking-[0.1px] leading-[21px] inline-block text-royalblue w-[123px] h-[17px] cursor-pointer"
        onClick={onSignUpTextClick}
      >
        Sign up
      </b>
      <img
        className="absolute top-[297px] left-[155px] rounded-[20px] w-[574px] h-[382.7px] object-cover"
        alt=""
        src="../assets/image-11@2x.png"
      />
    </div>
  );
};

export default ForgotPassword;
