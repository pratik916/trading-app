import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useRef } from "react";
import { Bounce, toast } from "react-toastify";
import { toastOptions } from "../utils/constants";

function useLogin() {
  const router = useRouter();
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  let currentUser: string | null = null;
  useEffect(() => {
    currentUser = sessionStorage.getItem("currentUser");
  });

  useEffect(() => {
    if (currentUser) {
      router?.push("/dashboard");
    }
  }, [currentUser]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!(userName?.trim() || password?.trim())) {
      return toast.error("Please enter username and password!", toastOptions);
    }

    if (userName === "trader" && password === "trader") {
      sessionStorage.setItem("currentUser", "trader");
      router?.push("/dashboard");
    } else {
      toast.error("Wrong username or password!", toastOptions);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router?.push("/");
  };

  return {
    userNameRef,
    passwordRef,
    handleSubmit,
    currentUser,
    handleLogout,
  };
}

export default useLogin;
