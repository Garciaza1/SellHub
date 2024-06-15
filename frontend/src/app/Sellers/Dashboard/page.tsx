import FooterMenu from "@/app/Components/foot/footer";
import HeaderMenu from "@/app/Components/head/header";
import Dashboard from "@/app/Components/Sellers/Dashboard";
import fetchUserSession from "@/app/lib/helpers/SessionData";
import { redirect } from "next/navigation";
import { metadata } from "@/app/layout";

const safeMetadata = {
  title: typeof metadata.title === "string" ? metadata.title : "",
  description: metadata.description || "",
};

export default async function SellerDahsboard() {
  const session = await fetchUserSession()
  if (!session) {
    return redirect("http://localhost:3000/");
  }else if (session?.tipo !== "Ambos" && "Vendedor") {
    redirect("/");
  }

  return (
    <>
      <HeaderMenu metadata={safeMetadata}></HeaderMenu>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Dashboard user_id={session.id}></Dashboard>
      </main>
      <FooterMenu></FooterMenu>
    </>
  );
}
