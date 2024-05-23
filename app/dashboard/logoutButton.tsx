"use client";
import React from "react";
import useLogin from "../hooks/useLogin";

function LogoutButton() {
  const { handleLogout } = useLogin();
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutButton;
