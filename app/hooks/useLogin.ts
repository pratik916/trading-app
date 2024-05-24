import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/constants";
import { usePortfolioStore } from "../stores/portfolioStore";

function useLogin() {
  const router = useRouter();
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { resetStore } = usePortfolioStore();

  const [currentUser, setCurrentUser] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentUser(sessionStorage.getItem("currentUser") as string);
  });

  useEffect(() => {
    if (currentUser) {
      router?.push("/dashboard");
    } else {
      setLoading(false);
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
      toast.info("Try trader/trader credentials", toastOptions);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router?.replace("/");
    setCurrentUser("");
    resetStore();
  };

  return {
    userNameRef,
    passwordRef,
    handleSubmit,
    currentUser,
    handleLogout,
    loading,
  };
}

export default useLogin;
