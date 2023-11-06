import React from "react";
import { Tab } from "@headlessui/react";
import Item from "./Item";
import ItemDescription from "./ItemDescription";

const data1 = [
  {
    img: "/assets/PNG/crown.png",
    name: "PhotoFinish Fund",
    price: "$15900.00",
    days: "30 days",
    percent: "-9.42 (3.62%)",
    isNegative: true,
    data: [
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
    ],
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum tellus ligula, vel dapibus erat aliquet id. Proin facilisis dui in risus interdum dictum. Pellentesque pellentesque lobortis magna, id gravida metus pulvinar ac. Mauris sed ante orci. Nulla ac commodo tellus, ac faucibus augue. Maecenas ornare leo sapien, vitae pulvinar ipsum sollicitudin at. Curabitur commodo efficitur metus, eget blandit libero tempus id.",
  },
  {
    img: "/assets/PNG/Maskgroup.png",
    name: "Helius attack",
    price: "$15900.00",
    days: "60 days",
    percent: "+3.42 (1.62%)",
    isNegative: false,
    data: [
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
    ],
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum tellus ligula, vel dapibus erat aliquet id. Proin facilisis dui in risus interdum dictum. Pellentesque pellentesque lobortis magna, id gravida metus pulvinar ac. Mauris sed ante orci. Nulla ac commodo tellus, ac faucibus augue. Maecenas ornare leo sapien, vitae pulvinar ipsum sollicitudin at. Curabitur commodo efficitur metus, eget blandit libero tempus id.",
  },
  {
    img: "/assets/PNG/Maskgroup2.png",
    name: "Mad Fund",
    price: "$15900.00",
    days: "30 days",
    percent: "-9.42 (3.62%)",
    isNegative: true,
    data: [
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
    ],
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum tellus ligula, vel dapibus erat aliquet id. Proin facilisis dui in risus interdum dictum. Pellentesque pellentesque lobortis magna, id gravida metus pulvinar ac. Mauris sed ante orci. Nulla ac commodo tellus, ac faucibus augue. Maecenas ornare leo sapien, vitae pulvinar ipsum sollicitudin at. Curabitur commodo efficitur metus, eget blandit libero tempus id.",
  },
  {
    img: "/assets/PNG/Maskgroup3.png",
    name: "Mad Fund",
    price: "$15900.00",
    days: "30 days",
    percent: "-9.42 (3.62%)",
    isNegative: true,
    data: [
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
    ],
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum tellus ligula, vel dapibus erat aliquet id. Proin facilisis dui in risus interdum dictum. Pellentesque pellentesque lobortis magna, id gravida metus pulvinar ac. Mauris sed ante orci. Nulla ac commodo tellus, ac faucibus augue. Maecenas ornare leo sapien, vitae pulvinar ipsum sollicitudin at. Curabitur commodo efficitur metus, eget blandit libero tempus id.",
  },
];

function FeaturedFunds() {
  return (
    <div className="flex landingDesktop:ml-[10px]  ">
      <Tab.Group>
        <Tab.List className="flex flex-col focus:outline-none outline-none border-0 landingDesktop:mr-[1.5625rem] ">
          {data1.map((item) => (
            <Tab className="relative" as="div" key={item.name}>
              {({ selected }) => <Item selected={selected} item={item} />}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {data1.map((item) => (
            <Tab.Panel key={item.name}>
              <ItemDescription item={item} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default FeaturedFunds;
