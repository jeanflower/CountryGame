'use client'
import React from "react";

import { useRouter } from 'next/navigation'
import signIn from "../firebase/auth/signIn";
import sendReset from "../firebase/auth/forgotPassword";
import { useAuthContext } from "@/context/AuthContext";

function Page() {
  const { user } = useAuthContext();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user, router]);

  const handleForm = async (event: any) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      console.log(error);
      alert('invalid credentials');
      return;
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  }
  return (<div className="wrapper">
    <div className="form-wrapper">
      <h1 className="mt-60 mb-30">Sign in</h1>
      <form onSubmit={handleForm} className="form">
        <label htmlFor="email">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            size={40}
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            size={40}
          />
        </label>
        <label htmlFor="submit">
          <button type="submit">Sign in</button>
        </label>
      </form>
      <h1 className="mt-60 mb-30"></h1>
      <button onClick={async () => {
        if (email === '') {
          alert('please enter your email address');
          return;
        }
        await sendReset(email);
        alert('if you have an account, we have sent a reset email');
      }}>Forgot password</button>
    </div>

  </div>);
}

export default Page;