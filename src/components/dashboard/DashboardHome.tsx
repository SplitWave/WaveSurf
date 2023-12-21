import React from 'react';
import { Tab } from '@headlessui/react';
import { classNames } from '@/pages/dashboard';
import FeaturedFunds from './FeaturedFunds';
import NFTGallery from './NFTGallery';

function DashboardHome() {
  return (
    <div className="flex mobile:flex-col landingDesktop:flex-row landingDesktop:pl-[1.375rem] landingDesktop:mt-[1.375rem] w-full relative z-0 ">
      <Tab.Group>
        <Tab.List className=" landingDesktop:w-[16.25rem] mobile:w-3/4 mobile:m-auto landingDesktop:m-0 flex flex-col border-r border-gray-200 pt-[1.375rem] text-center text-black mobile:text-[1rem] landingDesktop:text-[1.25rem] font-light ">
          <Tab
            className={({ selected }) =>
              classNames(
                'py-2 px-1 border-b border-gray-200 focus:outline-none mobile:rounded-xl ',
                selected && 'bg-[#00A7E1]'
              )
            }>
            <h1>⭐ Featured Funds..</h1>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'py-2 px-1 border-b border-gray-200 focus:outline-none mobile:rounded-xl ',
                selected && 'bg-[#00A7E1]'
              )
            }>
            <h1>📈 Top Funds</h1>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'py-2 px-1 border-b border-gray-200 focus:outline-none mobile:rounded-xl ',
                selected && 'bg-[#00A7E1]'
              )
            }>
            <h1>📉 Top Losers</h1>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'py-2 px-1 border-b border-gray-200 focus:outline-none mobile:rounded-xl ',
                selected && 'bg-[#00A7E1]'
              )
            }>
            <h1>💖 Most Owned</h1>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'py-2 px-1 border-b border-gray-200 focus:outline-none mobile:rounded-xl ',
                selected && 'bg-[#00A7E1]'
              )
            }>
            <h1>🌊 New on WS</h1>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'py-2 px-1 border-b border-gray-200 focus:outline-none mobile:rounded-xl ',
                selected && 'bg-[#00A7E1]'
              )
            }>
            <h1>📖 Pool Open</h1>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'py-2 px-1 border-b border-gray-200 focus:outline-none mobile:rounded-xl ',
                selected && 'bg-[#00A7E1]'
              )
            }>
            <h1>📂 Create</h1>
          </Tab>
        </Tab.List>
        <Tab.Panels className="p-3 w-full ">
          <Tab.Panel
            className="relative"
            as="div">
            <FeaturedFunds />
          </Tab.Panel>
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

{
  /* {({ selected }) => (
              <div
                className={` focus:outline-none landingDesktop:w-[22.5rem] landingDesktop:h-[13.75rem] bg-white ${
                  selected && "bg-[#F6F6F6]"
                } `}
              >
                <div
                  className={`h-2/4 w-2 absolute left-0 rounded-r-md top-1/2 transform -translate-y-1/2 ${
                    selected ? "bg-[#00A7E1]" : ""
                  }`}
                ></div>
                content1
              </div>
            )} */
}
