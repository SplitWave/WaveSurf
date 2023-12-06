import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import React, { Fragment, useContext, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import { BiLogOut } from "react-icons/bi";
import { useWeb3Auth } from "@/context/Web3AuthContext";

function Header() {
  const { user, web3auth, setProvider, setLoggedIn, address } = useWeb3Auth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  return (
    <div className=" bg-white w-full py-[0.625rem] flex mobile:flex-col landingDesktop:flex-row landingDesktop:items-center landingDesktop:justify-between ">
      <div className=" flex flex-row items-center mobile:pr-[0.9375rem] landingDesktop:pr-[0rem] mobile:justify-between ">
        <div className=" flex flex-row items-center ml-[10px] ">
          <div className=" relative mobile:w-[2.5rem] mobile:h-[2.5rem] landingDesktop:w-[4rem] landingDesktop:h-[4rem] ">
            <Image
              src="/assets/SVG/logo.svg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1 className=" mobile:ml-[0.625rem] landingDesktop:ml-[0.625rem] landingDesktop:mr-[2.875rem] mobile:text-[1.25rem] landingDesktop:text-[2rem] font-light  text-[#605C5C] ">
            Featured NFT Funds
          </h1>
        </div>
        <AiOutlineMenu
          className=" mobile:flex landingDesktop:hidden text-blue-500 w-[1.5625rem] h-[1.5625rem] "
          onClick={handleClick}
        />
      </div>
      <div className=" mobile:hidden landingDesktop:flex landingDesktop:flex-row landingDesktop:justify-between mobile:mt-[0.9375rem] landingDesktop:mt-[0rem] mobile:ml-[1.25rem] landingDesktop:ml-[0rem] ">
        <h1 className="  flex flex-row items-center  landingDesktop:ml-[0.625rem] landingDesktop:mr-[2.875rem] mobile:text-[1.375rem] landingDesktop:text-[1.75rem] font-light  text-[#605C5C] ">
          Account value $0.00{" "}
          <FaChevronDown className=" w-[1rem] h-[1rem] ml-[0.3125rem] " />
        </h1>
        <Menu
          as="div"
          className="relative inline-block landingDesktop:text-left"
        >
          <div>
            <Menu.Button className="  landingDesktop:border-l-[0.125rem] landingDesktop:border-l-[#C0CCDA] landingDesktop:px-[1.25rem]  flex flex-row hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ">
              <div className="">
                {user?.email && (
                  <h1 className=" mobile:justify-start mobile:flex text-black landingDesktop:text-center text-[1.125rem] font-light mobile:mt-[0.3125rem] landingDesktop:mt-[0rem] ">
                    {user?.email}
                  </h1>
                )}
                <h1 className=" text-[#FF731C] text-[1.25rem] font-medium landingDesktop:text-center mobile:mt-[0.3125rem] landingDesktop:mt-[0rem] ">
                  INVESTING - REAL MONEY
                </h1>
              </div>
              <div className="text-black flex flex-row items-center ml-[0.9375rem] ">
                <div className=" landingDesktop:w-[3rem] landingDesktop:h-[3rem] mobile:w-[2.1875rem] mobile:h-[2.1875rem] relative ">
                  {user?.profileImage ? (
                    <Image
                      src={user?.profileImage}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      className=" rounded-[2.5rem] "
                    />
                  ) : (
                    <Image
                      src="/assets/SVG/avatar.svg"
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
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
              className=" absolute w-full p-4 rounded-[0.625rem] bg-gray-100 "
              as="div"
            >
              <Menu.Item className="w-full" as="div">
                {address && (
                  <h1 className=" text-black w-full landingDesktop:flex-start landingDesktop:text-[0.75rem]  font-light landingDesktop:ml-[0.3125rem] mb-[0.625rem] ">
                    {address?.[0]}
                  </h1>
                )}
              </Menu.Item>
              <Menu.Item
                className=" font-normal  text-black  flex flex-row  items-center justify-start "
                as="div"
                onClick={logout}
              >
                <BiLogOut className=" landingDesktop:w-[1.5rem] landingDesktop:h-[1.5rem] mobile:w-[1.125rem] mobile:h-[1.125rem] " />
                <h1 className=" ml-[0.625rem] text-[1rem] ">Log out</h1>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {/*** Same Content but for the mobile view */}
      {isOpen && (
        <div className="  mobile:flex landingDesktop:hidden flex-col landingDesktop:justify-between mobile:mt-[0.9375rem] landingDesktop:mt-[0rem] mobile:ml-[1.25rem] landingDesktop:ml-[0rem] ">
          <h1 className="  flex flex-row items-center  landingDesktop:ml-[0.625rem] landingDesktop:mr-[2.875rem] mobile:text-[1rem] landingDesktop:text-[1.75rem] font-light  text-[#605C5C] ">
            Account value $0.00{" "}
            <FaChevronDown className=" w-[1rem] h-[1rem] ml-[0.3125rem] " />
          </h1>
          <Menu
            as="div"
            className="relative inline-block landingDesktop:text-left"
          >
            <div>
              <Menu.Button className="  landingDesktop:border-l-[0.125rem] landingDesktop:border-l-[#C0CCDA] landingDesktop:px-[1.25rem]  flex flex-row hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ">
                <div className="">
                  {user?.email && (
                    <h1 className=" mobile:justify-start mobile:flex text-black landingDesktop:text-center text-[0.75rem] font-light mobile:mt-[0.3125rem] landingDesktop:mt-[0rem] ">
                      {user?.email}
                    </h1>
                  )}
                  <div className=" flex flex-row ">
                    <h1 className=" text-[#FF731C] text-[1rem] font-medium landingDesktop:text-center mobile:mt-[0.3125rem] landingDesktop:mt-[0rem] ">
                      INVESTING - REAL MONEY
                    </h1>
                    <div className="text-black flex flex-row items-center ml-[0.9375rem] ">
                      <div className="  mobile:w-[1.875rem] mobile:h-[1.875rem] relative ">
                        {user?.profileImage ? (
                          <Image
                            src={user?.profileImage}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            className=" rounded-[2.5rem] "
                          />
                        ) : (
                          <Image
                            src="/assets/SVG/avatar.svg"
                            alt=""
                            layout="fill"
                            objectFit="cover"
                          />
                        )}
                      </div>
                      <FaChevronDown className=" w-[1rem] h-[1rem] ml-[0.625rem] " />
                    </div>
                  </div>
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
                className=" absolute w-5/6 p-4 rounded-[0.625rem] bg-gray-100 "
                as="div"
              >
                <Menu.Item className="w-full" as="div">
                  {address && (
                    <h1 className=" text-black w-full flex-start  text-[0.625rem] font-light landingDesktop:ml-[0.625rem] mb-[0.625rem] ">
                      {address?.[0]}
                    </h1>
                  )}
                </Menu.Item>
                <Menu.Item
                  className=" font-normal  text-black  flex flex-row  items-center justify-start "
                  as="div"
                  onClick={logout}
                >
                  <BiLogOut className=" landingDesktop:w-[1.5rem] landingDesktop:h-[1.5rem] mobile:w-[1.125rem] mobile:h-[1.125rem] " />
                  <h1 className=" ml-[0.625rem] text-[1rem] ">Log out</h1>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </div>
  );
}

export default Header;
