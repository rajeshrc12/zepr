import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/chat" });
      }}
    >
      <Button className="font-semibold text-md rounded-xl">Sign In</Button>
    </form>
  );
}
