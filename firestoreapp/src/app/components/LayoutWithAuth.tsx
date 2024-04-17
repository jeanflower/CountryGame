'use client';
import { AuthContextProvider } from "@/context/AuthContext";

export default function LayoutWithAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </>
  );
}
