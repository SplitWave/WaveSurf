import Header from "@/components/LandingPage/Header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const data = [
    {
      name: "TVL",
      value: "1.1M SOL",
    },
    {
      name: "APY",
      value: "3.39 %",
    },
    {
      name: "Holders",
      value: "3,061",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F4] font-poppins ">
      <div className=" landingDesktop:py-[1.375rem] ">
        <h1 className="mobile:p-[0.375rem] landingDesktop:p-[0rem] text-black text-center mobile:text-[1rem] landingDesktop:text-[1.25rem] font-light ">
          When investing, your capital is at risk and you may get back less than
          invested. Past performance doesn’t guarantee future results.
        </h1>
      </div>
      <Header />
      <div className=" landingDesktop:w-4/5 mt-[3.3125rem] mobile:py-[1.25rem] landingDesktop:py-[3.5rem] m-auto bg-white rounded-[3.75rem] shadow-md ">
        <div className=" relative mobile:w-[18.75rem] m-auto mobile:h-[2.5rem] landingDesktop:w-[27.25rem] landingDesktop:h-[5.0625rem] ">
          <Image
            src="/assets/PNG/builtonsolana.png"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>

        <h1 className=" landingDesktop:w-[724px] mobile:mt-[0.9375rem] landingDesktop:mt-0 text-center m-auto text-black mobile:text-[2.5rem] landingDesktop:text-[4rem] font-medium ">
          Invest as little as £1 with{" "}
          <span className=" text-[#00A7E1] ">Fractional shares</span>
        </h1>
        <h1 className=" mt-[1.375rem] m-auto text-center landingDesktop:w-[49.8125rem] font-normal mobile:text-[1.25rem] landingDesktop:text-[2rem] text-[#605C5C] ">
          Own even the most expensive NFTs like Mad lads, SMB and Clynozarus
        </h1>
        <div className=" landingDesktop:mt-[2.5rem] flex text-black landingDesktop:flex-row items-center mobile:w-full landingDesktop:w-1/2 m-auto ">
          {data.map((item) => (
            <div
              key={item.name}
              className=" w-[13.75rem]  text-center mobile:text-[1rem] landingDesktop:text-[2rem] font-medium "
            >
              <h1 className=" text-[#00A7E1] ">{item.name}</h1>
              <h1>{item.value}</h1>
            </div>
          ))}
        </div>
        <Link href="/login">
          <div className=" relative landingDesktop:w-[267px] mobile:w-[12.5rem] m-auto landingDesktop:mt-[4.125rem] landingDesktop:mb-[0rem] mobile:mt-[0.9375rem] mobile:mb-[0.9375rem] ">
            <div className=" absolute top-2 -left-2 landingDesktop:w-[16.6875rem] mobile:w-full landingDesktop:h-[4.4375rem] mobile:h-[3.75rem] bg-white rounded-[0.375rem] shadow-md "></div>
            <button className="  py-[0.6875rem]  relative  landingDesktop:w-[16.6875rem] mobile:w-full rounded-[0.375rem] bg-[#00A7E1] border-[0.0625rem] border-black mobile:text-[1.25rem] landingDesktop:text-[2rem] text-center font-medium text-white shadow-md ">
              Open account
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
