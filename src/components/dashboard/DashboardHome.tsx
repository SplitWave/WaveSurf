import React from "react";
import { Tab } from "@headlessui/react";
import { classNames } from "@/pages/dashboard";

function DashboardHome() {
  return (
    <div className="flex landingDesktop:mx-[1.375rem] mt-[1.375rem] ">
      <Tab.Group>
        <Tab.List className="flex flex-col border-r border-gray-200 pt-[1.375rem] text-center text-black text-[1.5rem] font-light ">
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2 px-1 border-b border-gray-200 focus:outline-none ",
                selected && "bg-[#00A7E1]"
              )
            }
          >
            <h1>⭐ Featured Funds..</h1>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2 px-1 border-b border-gray-200 focus:outline-none ",
                selected && "bg-[#00A7E1]"
              )
            }
          >
            <h1>📈 Top Funds</h1>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2 px-1 border-b border-gray-200 focus:outline-none ",
                selected && "bg-[#00A7E1]"
              )
            }
          >
            <h1>📉 Top Losers</h1>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2 px-1 border-b border-gray-200 focus:outline-none ",
                selected && "bg-[#00A7E1]"
              )
            }
          >
            <h1>💖 Most Owned</h1>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2 px-1 border-b border-gray-200 focus:outline-none ",
                selected && "bg-[#00A7E1]"
              )
            }
          >
            <h1>🌊 New on WS</h1>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2 px-1 border-b border-gray-200 focus:outline-none ",
                selected && "bg-[#00A7E1]"
              )
            }
          >
            <h1>📖 Pool Open</h1>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2 px-1 border-b border-gray-200 focus:outline-none ",
                selected && "bg-[#00A7E1]"
              )
            }
          >
            <h1>📂 Create</h1>
          </Tab>
        </Tab.List>
        <Tab.Panels className="p-6">
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
          <Tab.Panel>Content 4</Tab.Panel>
          <Tab.Panel>Content 5</Tab.Panel>
          <Tab.Panel>Content 6</Tab.Panel>
          <Tab.Panel>Content 7</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default DashboardHome;
