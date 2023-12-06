import Header from "@/components/dashboard/Header";
import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { TbSmartHome, TbChartPie, TbSearch } from "react-icons/tb";
import DashboardHome from "@/components/dashboard/DashboardHome";
import Image from "next/image";
import ProtectedRoute from "@/components/Global/ProtectedRoute";
import { RiMenu3Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";

export function classNames(
  ...classes: Array<string | boolean | undefined | null>
): string {
  return classes
    .filter((value) => typeof value === "string" && Boolean(value))
    .join(" ");
}

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ProtectedRoute>
      <div className=" bg-[#ECE8E8] w-full landingDesktop:h-full font-poppins ">
        <Header />
        <div
          className=" mobile:flex landingDesktop:hidden mt-[1.25rem] ml-[1.25rem] "
          onClick={toggleSidebar}
        >
          <RiMenu3Line size={35} />
        </div>
        <div className=" flex w-full h-full landingDesktop:pl-[2.0625rem] landingDesktop:pt-[2.125rem] ">
          <Tab.Group vertical>
            {!sidebarOpen && (
              <Tab.List className=" landingDesktop:flex mobile:hidden flex-col w-[7.625rem] p-[1.75rem] items-center h-[28.125rem] rounded-[2.125rem] shadow-md bg-white text-black font-extralight ">
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
                  <IoIosNotificationsOutline
                    size={65}
                    style={{ strokeWidth: "1" }}
                  />
                </Tab>
              </Tab.List>
            )}
            {sidebarOpen && (
              <div className="mobile:flex landingDesktop:hidden bg-gray-800 text-white flex-col fixed z-10 top-0 left-0 h-full w-1/3 transform translate-x-[-1/3] transition-transform ease-in-out">
                <div
                  className=" absolute top-2 right-2 "
                  onClick={() => {
                    setSidebarOpen(false);
                  }}
                >
                  <MdOutlineCancel size={30} />
                </div>
                <Tab.List className=" flex  flex-col w-1/3 m-auto mt-8 p-[20px] items-center h-full  text-white font-extralight ">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        " focus:outline-none",
                        selected && "text-[#00A7E1]"
                      )
                    }
                  >
                    <TbSmartHome size={40} style={{ strokeWidth: "1" }} />
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        " mt-[2.125rem] focus:outline-none ",
                        selected && "text-[#00A7E1]"
                      )
                    }
                  >
                    <TbChartPie size={40} style={{ strokeWidth: "1" }} />
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "mt-[2.125rem] focus:outline-none ",
                        selected && "text-[#00A7E1]"
                      )
                    }
                  >
                    <TbSearch size={40} style={{ strokeWidth: "1" }} />
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "mt-[2.125rem] focus:outline-none ",
                        selected && "text-[#00A7E1]"
                      )
                    }
                  >
                    <IoIosNotificationsOutline
                      size={45}
                      style={{ strokeWidth: "1" }}
                    />
                  </Tab>
                </Tab.List>
              </div>
            )}
            <Tab.Panels className=" w-full z-0 relative ">
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
