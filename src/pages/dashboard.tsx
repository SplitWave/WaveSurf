import Header from "@/components/dashboard/Header";
import React from "react";
import { Tab } from "@headlessui/react";
import { TbSmartHome, TbChartPie, TbSearch } from "react-icons/tb";
import DashboardHome from "@/components/dashboard/DashboardHome";
import Image from "next/image";
import ProtectedRoute from "@/components/Global/ProtectedRoute";

export function classNames(
  ...classes: Array<string | boolean | undefined | null>
): string {
  return classes
    .filter((value) => typeof value === "string" && Boolean(value))
    .join(" ");
}

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className=" bg-[#ECE8E8] w-full h-[67.5rem] font-poppins ">
        <Header />
        <div className=" flex w-full h-full landingDesktop:pl-[2.0625rem] landingDesktop:pt-[2.125rem]  ">
          <Tab.Group vertical>
            <Tab.List className=" flex flex-col w-[7.625rem] p-[1.75rem] items-center h-[28.125rem] rounded-[2.125rem] shadow-md bg-white text-black font-extralight ">
              <Tab
                className={({ selected }) =>
                  classNames(
                    " focus:outline-none",
                    selected && "text-[#00A7E1]"
                  )
                }
              >
                <TbSmartHome size={64} style={{ strokeWidth: "1" }} />
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    " mt-[2.125rem] focus:outline-none ",
                    selected && "text-[#00A7E1]"
                  )
                }
              >
                <TbChartPie size={64} style={{ strokeWidth: "1" }} />
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "mt-[2.125rem] focus:outline-none ",
                    selected && "text-[#00A7E1]"
                  )
                }
              >
                <TbSearch size={64} style={{ strokeWidth: "1" }} />
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "mt-[2.125rem] focus:outline-none ",
                    selected && "text-[#00A7E1]"
                  )
                }
              >
                <div className=" relative w-[4rem] h-[4rem] ">
                  <Image
                    src="/assets/PNG/notifications.png"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </Tab>
            </Tab.List>
            <Tab.Panels className=" w-full ">
              <Tab.Panel>
                <DashboardHome />
              </Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
              <Tab.Panel>Content 3</Tab.Panel>
              <Tab.Panel>Content 4</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
