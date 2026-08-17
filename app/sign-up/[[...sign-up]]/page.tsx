import Logo from "@/components/universal/Logo";
import { SignUp } from "@clerk/nextjs";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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
