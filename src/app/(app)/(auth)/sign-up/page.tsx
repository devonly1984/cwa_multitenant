import SignUpView from "@/components/auth/views/SignUpView"
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
const SignUpPage = async () => {
  const session = await caller.auth.session();
  if (session.user) {
    redirect('/')
  }
  return <SignUpView />;
};
export default SignUpPage;
