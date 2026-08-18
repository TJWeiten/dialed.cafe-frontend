import Logo from "@/components/universal/Logo";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function SignInPage() {
    return (
        <div className="flex w-full flex-grow flex-col">
            {/* <Logo /> */}
              <main className="mt-6 flex flex-grow items-center justify-center">
                  <Suspense fallback={<div className="animate-pulse">Loading sign-in...</div>}>
                      <SignIn appearance={{}} />
                  </Suspense>
            </main>
        </div>
    );
}
