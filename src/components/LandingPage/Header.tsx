import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

const data = [
  {
    name: "INVEST",
    link: "",
  },
  {
    name: "LEARN",
    link: "",
  },
  {
    name: "MORE",
    link: "",
  },
];

const Header: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here
    router.push("/login"); // Redirect to login page after logging out
  };

  const onPress = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className=" w-full landingDesktop:h-[8.125rem] bg-white py-[10px] landingDesktop:items-center flex mobile:flex-col landingDesktop:flex-row landingDesktop:justify-around ">
      <div className=" flex flex-row items-center mobile:justify-between mobile:px-[0.9375rem] landingDesktop:px-[0rem] ">
        <div className=" flex flex-row items-center  ">
          <div className=" relative mobile:w-[3.125rem] mobile:h-[3.125rem] landingDesktop:w-[6rem] landingDesktop:h-[6rem] ">
            <Image
              src="/assets/SVG/logo.svg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1 className=" mobile:ml-[0.625rem] landingDesktop:ml-[1.5625rem] landingDesktop:mr-[2.875rem] mobile:text-[1.5rem] landingDesktop:text-[2rem] font-medium  text-black ">
            WaveSurf
          </h1>
        </div>
        {data.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            className=" landingDesktop:w-[9.375rem] mobile:hidden landingDesktop:flex "
          >
            <h1 className=" text-[#00A7E1] text-[2rem]  font-normal text-center ">
              {item.name}
            </h1>
          </Link>
        ))}
        <AiOutlineMenu
          className=" landingDesktop:hidden w-[1.5625rem] h-[1.5625rem] text-black "
          onClick={onPress}
        />
      </div>
      <div className="mobile:w-full landingDesktop:w-[26.25rem] mobile:p-[1.25rem] landingDesktop:p-[0rem] mobile:hidden landingDesktop:flex mobile:flex-col landingDesktop:flex-row landingDesktop:items-center ">
        <h1 className=" landingDesktop:w-[10.875rem] text-center text-black mobile:text-[1.5rem] landingDesktop:text-[2rem] font-medium ">
          Log in
        </h1>
        <Link href="/login">
          <div className=" relative mobile:w-full landingDesktop:w-[16.6875rem] mobile:mt-[0.625rem] landingDesktop:mt-[0rem] ">
            <div className=" absolute top-2 right-2 mobile:w-full  landingDesktop:w-[16.6875rem] h-[4.4375rem] bg-white rounded-[0.375rem] shadow-md "></div>
            <button className=" py-[0.6875rem] mobile:w-full  relative  landingDesktop:w-[16.6875rem] rounded-[0.375rem] bg-[#00A7E1] border-[0.0625rem] border-black mobile:text-[1.5rem] landingDesktop:text-[2rem] text-center font-medium text-white shadow-md ">
              Open account
            </button>
          </div>
        </Link>
      </div>
      {isOpen && (
        <div className="mobile:w-full landingDesktop:w-[26.25rem] mobile:p-[1.25rem] landingDesktop:p-[0rem] mobile:flex landingDesktop:hidden mobile:flex-col landingDesktop:flex-row landingDesktop:items-center ">
          <h1 className=" landingDesktop:w-[10.875rem] text-center text-black mobile:text-[1.5rem] landingDesktop:text-[2rem] font-medium ">
            Log in
          </h1>
          <Link href="/login">
            <div className=" relative mobile:w-full landingDesktop:w-[16.6875rem] mobile:mt-[0.625rem] landingDesktop:mt-[0rem] ">
              <div className=" absolute top-2 right-2 mobile:w-full  landingDesktop:w-[16.6875rem] h-[4.4375rem] bg-white rounded-[0.375rem] shadow-md "></div>
              <button className=" py-[0.6875rem] mobile:w-full  relative  landingDesktop:w-[16.6875rem] rounded-[0.375rem] bg-[#00A7E1] border-[0.0625rem] border-black mobile:text-[1.5rem] landingDesktop:text-[2rem] text-center font-medium text-white shadow-md ">
                Open account
              </button>
            </div>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
