"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import logOut from "../lib/helpers/LogOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LogOutPage = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const logout = await logOut();
      if (logout?.success) {
        router.push("/Login");
      } else {
        console.error("Error logging out: May not have session yet!");
      }
    } catch (err) {
      console.error("Error logging out: ", err);
    }
  };

  useEffect(() => {
    handleLogOut();
  }, );

  return (
    <div className="text-center text-3xl text-zinc-200 mt-96">Logging out... <FontAwesomeIcon icon={faSpinner} className='animate-spin text-3xl mx-2'/></div>
  );
};

export default LogOutPage;
