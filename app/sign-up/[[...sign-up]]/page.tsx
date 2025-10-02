import Logo from "@/components/Logo";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex w-full flex-grow flex-col">
      {/* <Logo /> */}
      <main className="mt-6 flex flex-grow items-center justify-center">
        <SignUp appearance={{}} />
      </main>
    </div>
  );
}
