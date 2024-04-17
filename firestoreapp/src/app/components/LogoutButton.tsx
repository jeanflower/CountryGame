"use client"
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton({
  auth
}: any) {
  const router = useRouter();

  return (
    <>
    <h1 className="mt-60 mb-30">
      Sign out
    </h1>
    <button
      onClick={async (event) => {
        event.preventDefault()

        await signOut(auth);

        return router.push("/")
      }}
    >
      Logout
    </button>
  </>
  );
}
