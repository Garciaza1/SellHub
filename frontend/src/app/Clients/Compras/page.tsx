import { metadata } from "../../layout";
import HeaderMenu from "../../Components/head/header";
import FooterMenu from "../../Components/foot/footer";

const safeMetadata = {
  title: typeof metadata.title === "string" ? metadata.title : "",
  description: metadata.description || "",
};

export default async function ComprasClient() {

return(
    <>
      <HeaderMenu metadata={safeMetadata} />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        </main>
      <FooterMenu />
    </>
)

}