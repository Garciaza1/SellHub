import HeaderMenu from "../../../../Components/head/header";
import FooterMenu from "../../../../Components/foot/footer";
import EditProduct from "../../../../Components/Sellers/EditProduto";

import fetchUserSession from "@/app/lib/helpers/SessionData";
import { redirect } from "next/navigation";
import { metadata } from "@/app/layout";

const safeMetadata = {
  title: typeof metadata.title === "string" ? metadata.title : "",
  description: metadata.description || "",
};

export default async function Vendas({ params }: { params: { id: string } }) {
  const session = await fetchUserSession();
  const { id } = params;

  if (!session) {
    return redirect("http://localhost:3000/");
  } else if (session?.tipo !== "Ambos" && "Vendedor") {
    redirect("/");
  }

  return (
    <>
      <HeaderMenu metadata={safeMetadata} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <EditProduct id={id} />
      </main>
      <FooterMenu></FooterMenu>
    </>
  );
}
