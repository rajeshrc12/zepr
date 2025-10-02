import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { CiLogout } from "react-icons/ci";
export default async function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant={"ghost"} className="w-full">
        <CiLogout />
        Log out
      </Button>
    </form>
  );
}
