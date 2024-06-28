import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faHouse,
  faDoorOpen,
  faBox,
  faBoxOpen,
  faDollarSign,
  faRightFromBracket,
  faRightToBracket,
  faTachometerAlt,
  faHeadset,
  faCouch,
  faGlasses,
  faPersonHiking,
  faHighlighter,
  faMicrochip,
} from "@fortawesome/free-solid-svg-icons";
import fetchUserSession from "@/app/lib/helpers/SessionData";
import Link from "next/link";
import Menu from "./menu";

interface HeaderProps {
  metadata: {
    title: string;
    description: string;
  };
}

const HeaderMenu: React.FC<HeaderProps> = async ({ metadata }) => {
  // configura o usuario usndo helper mas puxa mta memoria
  let tipo = "";
  let nome = "";
  let id = "";

  const session = await fetchUserSession();

  if (session) {
    nome = session.nome;
    tipo = session.tipo;
    id = session.id;
    // email = session.email;
  }

  const renderVendedorLinks = () => (
    <>
      <div className="flex items-center ms-4 ">
        <a
          href="/"
          className="hover:animate-bounce cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon icon={faHouse} className="mx-2 h-5" />
          Home
        </a>
      </div>
      <div className="flex items-center ms-5">
        <a
          href="http://localhost:3000/Sellers/NovoProduto"
          className="hover:animate-pulse cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon icon={faBoxOpen} className="mx-2 h-5" />
          Cadastrar Produto
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="http://localhost:3000/Sellers/MeusProdutos"
          className="hover:animate-pulse cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon icon={faBox} className="mx-2 h-5" />
          Meus Produtos
        </a>
      </div>
      <div className="flex items-center me-5">
        <a
          href="#"
          className="hover:animate-pulse cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          {" "}
          <FontAwesomeIcon
            icon={faDollarSign}
            className="mx-2 h-5 ext-yellow-500"
          />
          Vendas
        </a>
      </div>

      <div className="flex items-center me-5">
        <Link
          href="/Logout"
          className="hover:animate-pulse cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon icon={faDoorOpen} className="mx-2 h-5" />
          Log-out
        </Link>
      </div>
    </>
  );

  const renderAmbosLinks = () => (
    <div className="w-full">
      <div className="container flex items-center justify-between">
        {/* links do vendedor */}
        <div className="bg-zinc-800 container flex items-center justify-between py-2 mt-1">
          <div className="flex items-center ms-5">
            <a
              href="/"
              className="hover:animate-bounce cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
            >
              <FontAwesomeIcon icon={faHouse} className="mx-2 h-5" />
              Home
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="http://localhost:3000/Sellers/NovoProduto"
              className="hover:animate-pulse cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
            >
              <FontAwesomeIcon icon={faBoxOpen} className="mx-2 h-5" />
              Cadastrar Produto
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="http://localhost:3000/Sellers/MeusProdutos"
              className="hover:animate-pulse cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
            >
              <FontAwesomeIcon icon={faBox} className="mx-2 h-5" />
              Meus Produtos
            </a>
          </div>

          <div className="flex items-center">
            <a
              href="http://localhost:3000/Sellers/Vendas"
              className="hover:animate-pulse cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
            >
              {" "}
              <FontAwesomeIcon
                icon={faDollarSign}
                className="mx-2 h-5 ext-yellow-500"
              />
              Vendas
            </a>
          </div>

          <div className="flex items-center">
            <a
              href="http://localhost:3000/Sellers/Dashboard"
              className="hover:animate-pulse cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
            >
              {" "}
              <FontAwesomeIcon
                icon={faTachometerAlt}
                className="mx-2 h-5 ext-yellow-500"
              />
              Dashboard
            </a>
          </div>

          <div className="flex items-center me-6">
            <Menu />
          </div>
        </div>
      </div>

      {/* links do cliente */}
      <div className="bg-zinc-800 rounded-b-xl container flex items-center justify-between py-2 mt-1">
        <div className="flex items-center ms-5">
          <a
            href={`http://localhost:3000/Clients/Categoria/Casa`}
            className="hover:animate-pulse cursor-pointer hover:text-red-600 transition ease-in-out duration-1000 flex items-center"
          >
            <FontAwesomeIcon icon={faCouch} className="mx-2 h-5 text-red-600" />
            Casa
          </a>
        </div>
        <div className="flex items-center">
          <a
            href={`http://localhost:3000/Clients/Categoria/Roupa`}
            className="hover:animate-pulse cursor-pointer hover:text-indigo-500 transition ease-in-out duration-1000 flex items-center"
          >
            <FontAwesomeIcon
              icon={faGlasses}
              className="mx-2 h-5 text-indigo-500"
            />
            Roupa
          </a>
        </div>
        <div className="flex items-center">
          <a
            href={`http://localhost:3000/Clients/Categoria/Esporte`}
            className="hover:animate-pulse cursor-pointer hover:text-orange-500 transition ease-in-out duration-1000 flex items-center"
          >
            <FontAwesomeIcon
              icon={faPersonHiking}
              className="mx-2 h-5 text-orange-500"
            />
            Esporte
          </a>
        </div>

        <div className="flex items-center me-5">
          <a
            href={`http://localhost:3000/Clients/Categoria/Games`}
            className="hover:animate-pulse cursor-pointer hover:text-red-400 transition ease-in-out duration-1000 flex items-center"
          >
            <FontAwesomeIcon
              icon={faHeadset}
              className="mx-2 h-5 text-red-400"
            />
            Games
          </a>
        </div>

        <div className="flex items-center me-5">
          <a
            href={`http://localhost:3000/Clients/Categoria/Maquiagem`}
            className="hover:animate-pulse cursor-pointer hover:text-fuchsia-600 transition ease-in-out duration-1000 flex items-center"
          >
            <FontAwesomeIcon
              icon={faHighlighter}
              className="mx-2 h-5 text-fuchsia-600"
            />
            Maquiagem
          </a>
        </div>

        <div className="flex items-center me-5">
          <a
            href={`http://localhost:3000/Clients/Categoria/Tecnologia`}
            className="hover:animate-pulse cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
          >
            <FontAwesomeIcon
              icon={faMicrochip}
              className="mx-2 h-5 text-yellow-500"
            />
            Tecnologia
          </a>
        </div>
      </div>
    </div>
  );

  const renderClienteLinks = () => (
    <div className="bg-zinc-800 rounded-b-xl container flex items-center justify-between py-2 mt-1">
      {/* links do cliente */}
      <div className="flex items-center ms-4 ">
        <a
          href="/"
          className="hover:animate-bounce cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon icon={faHouse} className="mx-2 h-5" />
          Home
        </a>
      </div>
      <div className="flex items-center ms-5">
        <a
          href={`http://localhost:3000/Clients/Categoria/Casa`}
          className="hover:animate-pulse cursor-pointer hover:text-red-600 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon icon={faCouch} className="mx-2 h-5 text-red-600" />
          Casa
        </a>
      </div>
      <div className="flex items-center">
        <a
          href={`http://localhost:3000/Clients/Categoria/Roupa`}
          className="hover:animate-pulse cursor-pointer hover:text-indigo-500 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon
            icon={faGlasses}
            className="mx-2 h-5 text-indigo-500"
          />
          Roupa
        </a>
      </div>
      <div className="flex items-center">
        <a
          href={`http://localhost:3000/Clients/Categoria/Esporte`}
          className="hover:animate-pulse cursor-pointer hover:text-orange-500 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon
            icon={faPersonHiking}
            className="mx-2 h-5 text-orange-500"
          />
          Esporte
        </a>
      </div>

      <div className="flex items-center me-5">
        <a
          href={`http://localhost:3000/Clients/Categoria/Games`}
          className="hover:animate-pulse cursor-pointer hover:text-red-400 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon icon={faHeadset} className="mx-2 h-5 text-red-400" />
          Games
        </a>
      </div>

      <div className="flex items-center me-5">
        <a
          href={`http://localhost:3000/Clients/Categoria/Maquiagem`}
          className="hover:animate-pulse cursor-pointer hover:text-fuchsia-600 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon
            icon={faHighlighter}
            className="mx-2 h-5 text-fuchsia-600"
          />
          Maquiagem
        </a>
      </div>

      <div className="flex items-center me-5">
        <a
          href={`http://localhost:3000/Clients/Categoria/Tecnologia`}
          className="hover:animate-pulse cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon
            icon={faMicrochip}
            className="mx-2 h-5 text-yellow-500"
          />
          Tecnologia
        </a>
      </div>
      <div className="flex items-center me-4">
        {/* trocar pra icone de perfil com logout e usersettins fazer outro menu. */}
        <Link
          href="/Logout"
          className="hover:animate-bounce cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon icon={faDoorOpen} className="mx-2 h-5" />
          Log-out
        </Link>
      </div>
    </div>
  );

  const renderNonLoggedLinks = () => (
    <div className="bg-zinc-800 rounded-b-xl container flex items-center justify-between py-2 mt-1">
      <div className="flex items-center ms-5">
        <a
          href="http://localhost:3000/Login"
          className="hover:animate-pulse cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon icon={faRightToBracket} className="mx-2 h-5" />
          Log-in
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="#"
          className="hover:animate-bounce cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          categoria-1
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="#"
          className="hover:animate-bounce cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          categoria-2
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="#"
          className="hover:animate-bounce cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          categoria-3
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="#"
          className="hover:animate-bounce cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          categoria-4
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="#"
          className="hover:animate-bounce cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          categoria-5
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="#"
          className="hover:animate-bounce cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          categoria-6
        </a>
      </div>
      <div className="flex items-center me-5">
        <a
          href="http://localhost:3000/Cadastro"
          className="hover:animate-bounce cursor-pointer hover:text-yellow-500 transition ease-in-out duration-1000 flex items-center"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="mx-2 h-5" />
          Sign-In
        </a>
      </div>
    </div>
  );

  const renderLinks = () => {
    if (tipo === "Vendedor") {
      return renderVendedorLinks();
    } else if (tipo === "Cliente") {
      return renderClienteLinks();
    } else if (tipo === "Ambos") {
      return renderAmbosLinks();
    } else {
      return renderNonLoggedLinks();
    }
  };

  return (
    <header className="header-menu flex flex-col items-center justify-between">
      <div className="container bg-zinc-950 rounded-t-3xl mt-3">
        <div className=" flex items-center justify-center py-2">
          <a
            href="/"
            className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 my-1"
          >
            <FontAwesomeIcon
              icon={faChartLine}
              className="pe-5 h-20"
            ></FontAwesomeIcon>
            <h1 className="text-2xl">Sell Hub</h1>
            <br></br>
          </a>
        </div>
        <div className="flex justify-center mb-1">
          <h1 className="text-xl">
            {tipo === "Vendedor" || "Cliente" || "ambos"
              ? `Bem Vindo(a): ${nome}`
              : metadata.description}
          </h1>
        </div>
      </div>
      <div className="container flex items-center justify-between">
        {renderLinks()}
      </div>
    </header>
  );
};

export default HeaderMenu;
