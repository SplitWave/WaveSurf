import Header from "@/components/LandingPage/Header";
import Image from "next/image";

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
        <h1 className=" text-black text-center  text-[1.25rem] font-light ">
          When investing, your capital is at risk and you may get back less than
          invested. Past performance doesn’t guarantee future results.
        </h1>
      </div>
      <Header />
      <div className=" landingDesktop:w-4/5 mt-[3.3125rem] py-[3.5rem] m-auto bg-white rounded-[3.75rem] shadow-md ">
        <div className=" w-[27.25rem] m-auto ">
          <Image
            src="/assets/PNG/builtonsolana.png"
            alt=""
            width={436}
            height={81}
          />
        </div>
        <h1 className=" landingDesktop:w-[724px] text-center m-auto text-black text-[4rem] font-medium ">
          Invest as little as £1 with{" "}
          <span className=" text-[#00A7E1] ">Fractional shares</span>
        </h1>
        <h1 className=" mt-[1.375rem] m-auto text-center landingDesktop:w-[49.8125rem] font-normal text-[2rem] text-[#605C5C] ">
          Own even the most expensive NFTs like Mad lads, SMB and Clynozarus
        </h1>
        <div className=" landingDesktop:mt-[2.5rem] flex text-black landingDesktop:flex-row items-center landingDesktop:w-1/2 m-auto ">
          {data.map((item) => (
            <div
              key={item.name}
              className=" w-[13.75rem] text-center text-[2rem] font-medium "
            >
              <h1 className=" text-[#00A7E1] ">{item.name}</h1>
              <h1>{item.value}</h1>
            </div>
          ))}
        </div>
        <div className=" relative landingDesktop:w-[16.6875rem] m-auto landingDesktop:mt-[4.125rem] ">
          <div className=" absolute top-2 -left-2 landingDesktop:w-[16.6875rem] h-[4.4375rem] bg-white rounded-[0.375rem] shadow-md "></div>
          <button className="  py-[0.6875rem]  relative  landingDesktop:w-[16.6875rem] rounded-[0.375rem] bg-[#00A7E1] border-[0.0625rem] border-black text-[2rem] text-center font-medium text-white shadow-md ">
            Open account
          </button>
        </div>
      </div>
    </div>
  );
}
