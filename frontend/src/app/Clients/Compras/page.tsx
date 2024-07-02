import { metadata } from "../../layout";
import HeaderMenu from "../../Components/head/header";
import FooterMenu from "../../Components/foot/footer";
import fetchUserSession from "@/app/lib/helpers/SessionData";
import { redirect } from "next/navigation";
import Compras from "@/app/Components/Client/Compras";
import getCompras from "@/app/lib/helpers/GetCompras";

const safeMetadata = {
  title: typeof metadata.title === "string" ? metadata.title : "",
  description: metadata.description || "",
};

export default async function ComprasClient() {
  try {
    const session = await fetchUserSession();
    if (!session) {
      return redirect("http://localhost:3000/Login");
    }
    const compras = await getCompras(session.id);
    if (compras === null || !compras) {
      return (
        <>
          <HeaderMenu metadata={safeMetadata} />
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p className="text-center">
              Algo deu errado na requisição ou não há compras disponíveis.
            </p>
          </main>
          <FooterMenu />
        </>
      );
    } else {
      return (
        <>
          <HeaderMenu metadata={safeMetadata} />
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <Compras compras={compras} />
          </main>
          <FooterMenu />
        </>
      );
    }
  } catch (error) {
    console.error("Erro ao carregar a página de compras:", error);
    return (
      <>
        <HeaderMenu metadata={safeMetadata} />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <p className="text-center">
            Ocorreu um erro ao carregar a página. Tente novamente mais tarde.
          </p>
        </main>
        <FooterMenu />
      </>
    );
  }
}
