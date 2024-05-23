"use client";

import React from "react";
import useLogin from "../hooks/useLogin";

function LoginForm() {
  const { userNameRef, currentUser, passwordRef, handleSubmit } = useLogin();

  return (
    <form
      className="flex min-h-screen flex-col items-center p-24 gap-1"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="username"
        placeholder="username"
        required
        ref={userNameRef}
        className="text-black"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        ref={passwordRef}
        className="text-black"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
