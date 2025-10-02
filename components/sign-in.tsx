import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/chat" });
      }}
    >
      <Button variant={"outline"}>
        <FcGoogle />
        Continue with Google
      </Button>
    </form>
  );
}
