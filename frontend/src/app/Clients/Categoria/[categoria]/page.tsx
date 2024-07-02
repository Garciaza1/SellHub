import { metadata } from "../../../layout";
import HeaderMenu from "../../../Components/head/header";
import FooterMenu from "../../../Components/foot/footer";
import Categoria from "@/app/Components/Client/Categorias";
// import fetchUserSession from "@/app/lib/helpers/SessionData";
// import { redirect } from "next/navigation";

const safeMetadata = {
  title: typeof metadata.title === "string" ? metadata.title : "",
  description: metadata.description || "",
};

export default async function Produto({ params }: { params: { categoria: string } }) {
  
  const { categoria } = params;
  console.log("params: " + categoria);

  return (
    <>
      <HeaderMenu metadata={safeMetadata} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Categoria categoria={categoria} />
      </main>
      <FooterMenu />
    </>
  );
}
