import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import React, { Fragment, useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { BiLogOut } from "react-icons/bi";
import { magic } from "@/lib/magic";
import Router from "next/router";

function Header() {
  const [user, setUser] = useContext(UserContext);

  const logout = () => {
    magic.user.logout().then(() => {
      setUser({ user: null });
      Router.push("/login");
    });
  };

  return (
    <div className=" bg-white w-full py-[0.625rem] flex flex-row items-center landingDesktop:justify-between ">
      <div className=" flex flex-row items-center landingDesktop:ml-[0.625rem] ">
        <div className=" relative mobile:w-[3.125rem] mobile:h-[3.125rem] landingDesktop:w-[4rem] landingDesktop:h-[4rem] ">
          <Image
            src="/assets/SVG/logo.svg"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className=" mobile:ml-[0.625rem] landingDesktop:ml-[0.625rem] landingDesktop:mr-[2.875rem] mobile:text-[1.5rem] landingDesktop:text-[2rem] font-light  text-[#605C5C] ">
          Featured NFT Funds
        </h1>
      </div>
      <div className="  landingDesktop:flex landingDesktop:flex-row landingDesktop:justify-between ">
        <h1 className="  flex flex-row items-center mobile:ml-[0.625rem] landingDesktop:ml-[0.625rem] landingDesktop:mr-[2.875rem] mobile:text-[1.375rem] landingDesktop:text-[1.75rem] font-light  text-[#605C5C] ">
          Account value $0.00{" "}
          <FaChevronDown className=" w-[1rem] h-[1rem] ml-[0.3125rem] " />
        </h1>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="  border-l-[0.125rem] border-l-[#C0CCDA] px-[1.25rem]  landingDesktop:flex landingDesktop:flex-row hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ">
              <div className=" ">
                {user?.loading ? (
                  <></>
                ) : (
                  user?.issuer && (
                    <h1 className=" text-black text-center text-[1.125rem] font-light ">
                      {user.email}
                    </h1>
                  )
                )}
                <h1 className=" text-[#FF731C] text-[1.25rem] font-medium text-center ">
                  INVESTING - REAL MONEY
                </h1>
              </div>
              <div className="text-black flex flex-row items-center ml-[0.9375rem] ">
                <div className=" w-[3rem] h-[3rem] relative ">
                  <Image
                    src="/assets/SVG/avatar.svg"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <FaChevronDown className=" w-[1rem] h-[1rem] ml-[0.625rem] " />
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className=" font-normal w-full bg-white text-black absolute flex flex-row rounded-[0.625rem] items-center justify-start p-4 "
              as="div"
              onClick={logout}
            >
              <BiLogOut size={24} />
              <h1 className=" ml-[0.625rem] text-[1rem] ">Log out</h1>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
