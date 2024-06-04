import { metadata } from "./layout";
import HeaderMenu from "./Components/head/header";
import FooterMenu from "./Components/foot/footer";
import TodosProdutos from "./Components/Client/Produtos";

const safeMetadata = {
  title: typeof metadata.title === "string" ? metadata.title : "",
  description: metadata.description || "",
};

export default async function Home() {


  return (
    <>
      <HeaderMenu metadata={safeMetadata} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TodosProdutos></TodosProdutos>
      </main>
      <FooterMenu />
    </>
  );
}
