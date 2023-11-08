import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import React, { useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

function Header() {
  const [user] = useContext(UserContext);
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
        <div className="  border-l-[0.125rem] border-l-[#C0CCDA] px-[1.25rem]  landingDesktop:flex landingDesktop:flex-row ">
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
        </div>
      </div>
    </div>
  );
}

export default Header;
