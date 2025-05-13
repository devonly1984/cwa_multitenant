import { SignUpForm } from "@/components";

const SignUpView = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <SignUpForm />
      </div>
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url(/bg-auth.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
export default SignUpView;
