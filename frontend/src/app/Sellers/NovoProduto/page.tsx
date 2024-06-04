import HeaderMenu from "../../Components/head/header";
import FooterMenu from "../../Components/foot/footer";
import fetchUserSession from "@/app/lib/helpers/SessionData";
import { redirect } from "next/navigation";
import ProdutoForm from "@/app/Components/Sellers/ProdutoForm";
import { metadata } from "@/app/layout";

const safeMetadata = {
  title: typeof metadata.title === "string" ? metadata.title : "",
  description: metadata.description || "",
};


export default async function NovoProduto() {
  const session = await fetchUserSession();

  if (!session) {
    return redirect("http://localhost:3000/");
  }

  return (
    <>
      <HeaderMenu metadata={safeMetadata} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ProdutoForm user_id={session.id}></ProdutoForm>
      </main>
      <FooterMenu></FooterMenu>
    </>
  );
}
