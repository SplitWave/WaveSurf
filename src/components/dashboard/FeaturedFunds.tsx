import React from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { LineChart, Line, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Page A", pv: 8400 },
  { name: "Page B", pv: 1398 },
  { name: "Page C", pv: 4800 },
  { name: "Page D", pv: 3908 },
  { name: "Page E", pv: 9800 },
  { name: "Page F", pv: 3800 },
  { name: "Page G", pv: 1300 },
  { name: "Page H", pv: 6300 },
  { name: "Page I", pv: 7300 },
  { name: "Page J", pv: 3300 },
  { name: "Page K", pv: 5300 },
  { name: "Page L", pv: 7300 },
  { name: "Page M", pv: 2300 },
];

function FeaturedFunds() {
  return (
    <div className="flex landingDesktop:mx-[0.625rem]  ">
      <Tab.Group>
        <Tab.List className="flex flex-col ">
          <Tab className="relative" as="div">
            {({ selected }) => (
              <div
                className={` focus:outline-none landingDesktop:w-[22.5rem] p-[1.125rem] rounded-[0.125rem] landingDesktop:h-[13.75rem] bg-white ${
                  selected && "bg-[#F6F6F6]"
                } `}
              >
                <div
                  className={`h-2/4 w-2 absolute left-0 rounded-r-md top-1/2 transform -translate-y-1/2 ${
                    selected ? "bg-[#00A7E1]" : ""
                  }`}
                ></div>
                <div className=" flex flex-row items-center ">
                  <div className=" relative w-[3.4375rem] h-[3.4375rem] ">
                    <Image
                      src="/assets/PNG/crown.png"
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="  font-light ml-[0.9375rem] ">
                    <h1 className=" text-[1.125rem] text-center text-black ">
                      PhotoFinish Fund
                    </h1>
                    <h1 className=" text-[0.75rem]  ml-[1.25rem] text-[#636363] ">
                      30 days
                    </h1>
                  </div>
                  <div className="  font-light ml-[0.9375rem] ">
                    <h1 className=" text-[1.125rem] text-center text-black ">
                      $15900.00
                    </h1>
                    <h1 className=" text-[0.75rem]  text-[#DA1919] ">
                      -9.42 (3.62%)
                    </h1>
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <LineChart width={300} height={100} data={data}>
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="red"
                      isAnimationActive={false}
                      dot={false}
                    />
                  </LineChart>
                </div>
              </div>
            )}
          </Tab>
          <Tab className="relative" as="div">
            {({ selected }) => (
              <div
                className={` focus:outline-none landingDesktop:w-[22.5rem] p-[1.125rem] rounded-[0.125rem] landingDesktop:h-[13.75rem] bg-white ${
                  selected && "bg-[#F6F6F6]"
                } `}
              >
                <div
                  className={`h-2/4 w-2 absolute left-0 rounded-r-md top-1/2 transform -translate-y-1/2 ${
                    selected ? "bg-[#00A7E1]" : ""
                  }`}
                ></div>
                <div className=" flex flex-row items-center ">
                  <div className=" relative w-[3.4375rem] h-[3.4375rem] ">
                    <Image
                      src="/assets/PNG/Maskgroup.png"
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="  font-light ml-[0.9375rem] ">
                    <h1 className=" text-[1.125rem] text-center text-black ">
                      Helius attack
                    </h1>
                    <h1 className=" text-[0.75rem]  ml-[1.25rem] text-[#636363] ">
                      60 days
                    </h1>
                  </div>
                  <div className="  font-light ml-[0.9375rem] ">
                    <h1 className=" text-[1.125rem] text-center text-black ">
                      $1690.00
                    </h1>
                    <h1 className=" text-[0.75rem]  text-[#DA1919] ">
                      -9.42 (3.62%)
                    </h1>
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <LineChart width={300} height={100} data={data}>
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="red"
                      isAnimationActive={false}
                      dot={false}
                    />
                  </LineChart>
                </div>
              </div>
            )}
          </Tab>
          <Tab className="relative" as="div">
            {({ selected }) => (
              <div
                className={` focus:outline-none landingDesktop:w-[22.5rem] p-[1.125rem] rounded-[0.125rem] landingDesktop:h-[13.75rem] bg-white ${
                  selected && "bg-[#F6F6F6]"
                } `}
              >
                <div
                  className={`h-2/4 w-2 absolute left-0 rounded-r-md top-1/2 transform -translate-y-1/2 ${
                    selected ? "bg-[#00A7E1]" : ""
                  }`}
                ></div>
                <div className=" flex flex-row items-center ">
                  <div className=" relative w-[3.4375rem] h-[3.4375rem] ">
                    <Image
                      src="/assets/PNG/Maskgroup2.png"
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="  font-light ml-[0.9375rem] ">
                    <h1 className=" text-[1.125rem] text-center text-black ">
                      OKAY bears
                    </h1>
                    <h1 className=" text-[0.75rem]  ml-[1.25rem] text-[#636363] ">
                      69 days
                    </h1>
                  </div>
                  <div className="  font-light ml-[0.9375rem] ">
                    <h1 className=" text-[1.125rem] text-center text-black ">
                      $15900.00
                    </h1>
                    <h1 className=" text-[0.75rem]  text-[#DA1919] ">
                      -9.42 (3.62%)
                    </h1>
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <LineChart width={300} height={100} data={data}>
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="red"
                      isAnimationActive={false}
                      dot={false}
                    />
                  </LineChart>
                </div>
              </div>
            )}
          </Tab>
          <Tab className="relative" as="div">
            {({ selected }) => (
              <div
                className={` focus:outline-none landingDesktop:w-[22.5rem] p-[1.125rem] rounded-[0.125rem] landingDesktop:h-[13.75rem] bg-white ${
                  selected && "bg-[#F6F6F6]"
                } `}
              >
                <div
                  className={`h-2/4 w-2 absolute left-0 rounded-r-md top-1/2 transform -translate-y-1/2 ${
                    selected ? "bg-[#00A7E1]" : ""
                  }`}
                ></div>
                <div className=" flex flex-row items-center ">
                  <div className=" relative w-[3.4375rem] h-[3.4375rem] ">
                    <Image
                      src="/assets/PNG/Maskgroup3.png"
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="  font-light ml-[0.9375rem] ">
                    <h1 className=" text-[1.125rem] text-center text-black ">
                      Mad Fund
                    </h1>
                    <h1 className=" text-[0.75rem]  ml-[1.25rem] text-[#636363] ">
                      30 days
                    </h1>
                  </div>
                  <div className="  font-light ml-[0.9375rem] ">
                    <h1 className=" text-[1.125rem] text-center text-black ">
                      $15900.00
                    </h1>
                    <h1 className=" text-[0.75rem]  text-[#DA1919] ">
                      -9.42 (3.62%)
                    </h1>
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <LineChart width={300} height={100} data={data}>
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="red"
                      isAnimationActive={false}
                      dot={false}
                    />
                  </LineChart>
                </div>
              </div>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default FeaturedFunds;
