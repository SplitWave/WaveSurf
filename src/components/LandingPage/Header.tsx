import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

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

  const handleLogout = () => {
    // Perform logout logic here
    router.push("/login"); // Redirect to login page after logging out
  };

  return (
    <header className=" w-full landingDesktop:h-[8.125rem] bg-white py-[10px] items-center flex flex-row justify-around ">
      <div className=" flex flex-row items-center ">
        <Image src="/assets/SVG/logo.svg" alt="" width={96} height={96} />
        <h1 className=" landingDesktop:ml-[1.5625rem] landingDesktop:mr-[2.875rem] text-[2rem] font-medium  text-black ">
          WaveSurf
        </h1>
        {data.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            className=" landingDesktop:w-[11.125rem] "
          >
            <h1 className=" text-[#00A7E1] text-[2rem]  font-normal text-center ">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
      <div className=" flex flex-row items-center ">
        <h1 className=" landingDesktop:w-[10.875rem] text-center text-black text-[2rem] font-medium ">
          Log in
        </h1>
        <div className=" relative ">
          <div className=" absolute top-2 right-2  landingDesktop:w-[16.6875rem] h-[4.4375rem] bg-white rounded-[0.375rem] shadow-md "></div>
          <button className=" py-[0.6875rem]  relative  landingDesktop:w-[16.6875rem] rounded-[0.375rem] bg-[#00A7E1] border-[0.0625rem] border-black text-[2rem] text-center font-medium text-white shadow-md ">
            Open account
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
