import FooterMenu from "@/app/Components/foot/footer";
import HeaderMenu from "@/app/Components/head/header";
import { metadata } from "@/app/layout";

const safeMetadata = {
  title: typeof metadata.title === "string" ? metadata.title : "",
  description: metadata.description || "",
};

export default function SellerDahsboard() {
  return (
    <>
      <HeaderMenu metadata={safeMetadata}></HeaderMenu>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        
      </main>
      <FooterMenu></FooterMenu>
    </>
  );
}
