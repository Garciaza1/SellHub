import { metadata } from "../../../layout";
import HeaderMenu from "../../../Components/head/header";
import FooterMenu from "../../../Components/foot/footer";
import Product from "@/app/Components/Client/Produto";
import GetUser from "@/app/lib/helpers/UserData";
import GetProduct from "@/app/lib/helpers/GetProduct";
import fetchUserSession from "@/app/lib/helpers/SessionData";
import { redirect } from "next/navigation";

const safeMetadata = {
  title: typeof metadata.title === "string" ? metadata.title : "",
  description: metadata.description || "",
};

export default async function Produto({ params }: { params: { id: string } }) {
  const session = await fetchUserSession();
  if (!session) {
    return redirect("http://localhost:3000/Login");
  }
  const { id } = params;
  console.log("id params: " + id)
  //chama o produto e passa o id do vendedor
  const product = await GetProduct(id);
  const vendedor_ID = product?.user_id;

  //pega o vendedor com o id do product
  const vendedor = await GetUser(vendedor_ID);

  return (
    <>
      <HeaderMenu metadata={safeMetadata} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Product vendedor={vendedor}></Product>
      </main>
      <FooterMenu />
    </>
  );
}
