import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightToBracket, faUserTie, faFaceSadCry, faChartLine } from '@fortawesome/free-solid-svg-icons'
// import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const FooterMenu = () => {
  // Defina o conteúdo do menu header aqui
  return (
    <footer className="footer-menu flex flex-col items-center justify-between mb-3">
      <div className="container flex items-center justify-center mt-3 bg-zinc-800 rounded-t-3xl py-2">
        <p>&copy; 2024 Sell Hub. Todos os direitos reservados.</p>
      </div>

      <div className="container flex items-center justify-between bg-zinc-950 rounded-b-lg mt-1 py-2">
        <div className="container flex justify-center">
          <div className="block items-top ms-5 ps-5 ">
            <p className="text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, a
              saepe, aliquam exercitationem nisi blanditiis harum numquam minus
              nam reiciendis fuga impedit, voluptatum ducimus iure ex fugit
              sequi? Optio, nisi.
            </p>
          </div>
        </div>
        <div className="container text-center ps-2">
          Links Úteis
          <div className="flex justify-center mt-2">
            <div className="me-1">
              <a className="cursor-pointer">links</a>
            </div>
            <div className="ms-1">
              <a className="cursor-pointer">links</a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="me-1">
              <a className="cursor-pointer">links</a>
            </div>
            <div className="ms-1">
              <a className="cursor-pointer">links</a>
            </div>
          </div>
        </div>
        <div className="container text-center pe-5">
          Redes Sociais
          <div className="my-2 flex content-center w-full">
            <div className="ms-44 text-center">
              <a
                href="https://www.instagram.com/garciazaum/"
                target="_blank"
                className="transition ease-in-out delay-150 hover:text-yellow-500 duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-10 me-2" />
              </a>
            </div>

            <div className="">
              <a
                href="https://github.com/Garciaza1"
                className="transition ease-in-out delay-150 hover:text-yellow-500 duration-300"
                target="_blank"
              >
                <FontAwesomeIcon icon={faGithub} className="mx-2 h-10" />
              </a>
            </div>

            <div className="">
              <a
                href="https://www.linkedin.com/in/gustavo-garcia-287356232/"
                className="transition ease-in-out delay-150 hover:text-yellow-500 duration-300"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedin} className="mx-2 h-10" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMenu;
