import { signOut } from "next-auth/react";

const logOut = async () => {
  try {
    await signOut({ redirect: false });
    return { success: true };
  } catch (err) {
    console.error("Error ending session: ", err);
    return { success: false, error: err };
  }
};

export default logOut;