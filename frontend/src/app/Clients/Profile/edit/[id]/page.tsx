import { metadata } from "../../../../layout";
import HeaderMenu from "../../../../Components/head/header";
import FooterMenu from "../../../../Components/foot/footer";
import EditUser from "../../../../Components/Client/UserEdit";
import fetchUserSession from "@/app/lib/helpers/SessionData";
import { redirect } from "next/navigation";

const safeMetadata = {
  title: typeof metadata.title === "string" ? metadata.title : "",
  description: metadata.description || "",
};

export default async function ComprasClient() {
  const session = await fetchUserSession();
  if (!session) {
    return redirect("http://localhost:3000/Login");
  }
  // console.log(session)
  return (
    <>
      <HeaderMenu metadata={safeMetadata} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <EditUser id={session.id} />
      </main>
      <FooterMenu />
    </>
  );
}