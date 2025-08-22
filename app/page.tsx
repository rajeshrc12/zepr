import SignIn from "@/components/sign-in";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between border-b px-2 py-3">
        <div className="font-bold text-4xl">zepr.</div>
        <div>
          <SignIn />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="font-bold text-4xl">Your AI Data Analyst Buddy</div>
      </div>
    </div>
  );
}
