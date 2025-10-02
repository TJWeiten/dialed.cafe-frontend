import Logo from "@/components/Logo";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex w-full flex-grow flex-col">
      {/* <Logo /> */}
      <main className="mt-6 flex flex-grow items-center justify-center">
        <SignIn appearance={{}} />
      </main>
    </div>
  );
}
