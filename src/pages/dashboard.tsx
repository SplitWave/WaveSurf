import Header from "@/components/dashboard/Header";
import ProtectWithAuth from "@/lib/ProtectWithAuth";
import React from "react";
import { Tab } from "@headlessui/react";
import { TbSmartHome, TbChartPie, TbSearch } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import Home from "@/components/dashboard/Home";
import DashboardHome from "@/components/dashboard/DashboardHome";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function dashboard() {
  return (
    <div className=" bg-[#ECE8E8] w-full h-[67.5rem] ">
      <Header />
      <div className=" flex w-full h-full landingDesktop:pl-[2.0625rem] landingDesktop:pt-[2.125rem] landingDesktop:pr-[0.6875rem] ">
        <Tab.Group vertical>
          <Tab.List className=" flex flex-col w-[7.625rem] p-[1.75rem] items-center h-[28.125rem] rounded-[2.125rem] shadow-md bg-white text-black ">
            <Tab
              className={({ selected }) =>
                classNames(" focus:outline-none", selected && "text-[#00A7E1]")
              }
            >
              <TbSmartHome size={64} />
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  " mt-[2.125rem] focus:outline-none ",
                  selected && "text-[#00A7E1]"
                )
              }
            >
              <TbChartPie size={64} />
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "mt-[2.125rem] focus:outline-none ",
                  selected && "text-[#00A7E1]"
                )
              }
            >
              <TbSearch size={64} />
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "mt-[2.125rem] focus:outline-none ",
                  selected && "text-[#00A7E1]"
                )
              }
            >
              <IoNotificationsOutline size={64} />
            </Tab>
          </Tab.List>
          <Tab.Panels>
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
  );
}

export default ProtectWithAuth(dashboard);
