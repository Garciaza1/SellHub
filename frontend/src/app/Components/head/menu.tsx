import { faDoorOpen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const MyMenu = () => {
  return (
    <Menu as="div" className="relative inline-block text-left p-0 m-0">
      <div>
        <MenuButton className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300">
          Profile
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1 flex justify-center">
          <a
            href="/#"
            className="text-gray-900 hover:animate-pulse cursor-pointer hover:text-gray-600 transition ease-in-out duration-1000 flex items-center"
          >
            <FontAwesomeIcon icon={faUser} className="me-2 h-5" />
            Account settings
          </a>
        </div>
        <hr className="my-1"/>
        <div className="py-1 flex justify-center">
          <a
            href="http://localhost:3000/Sellers/MeusProdutos/Deletados"
            className="text-gray-900 hover:animate-pulse cursor-pointer hover:text-gray-600 transition ease-in-out duration-1000 flex items-center"
          >
            <FontAwesomeIcon icon={faTrash} className="me-2 h-5" />
            Deleted Products
          </a>
        </div>
        <hr className="my-1"/>
        <div className="py-1 flex justify-center">
          <a
            href="/Logout"
            className="text-gray-900 hover:animate-pulse cursor-pointer hover:text-gray-600 transition ease-in-out duration-1000 flex items-center"
          >
            <FontAwesomeIcon icon={faDoorOpen} className="me-2 h-5" />
            Log-out
          </a>
        </div>
      </MenuItems>
    </Menu>
  );
};
export default MyMenu;
