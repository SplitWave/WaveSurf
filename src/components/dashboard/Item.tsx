import React from "react";
import Image from "next/image";
import { LineChart, Line } from "recharts";

export type ItemData = {
  img: string;
  name: string;
  price: string;
  days: string;
  percent: string;
  isNegative: boolean;
  data: { name: string; pv: number }[];
  details: string;
};

function Item({ selected, item }: { selected: boolean; item: ItemData }) {
  return (
    <div
      className={` outline-none focus:outline-none landingDesktop:w-[21.875rem] p-[1.125rem] rounded-[0.125rem] landingDesktop:h-[13.75rem] bg-white ${
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
          <Image src={item.img} alt="" layout="fill" objectFit="cover" />
        </div>
        <div className="  font-light ml-[0.9375rem] ">
          <h1 className=" text-[1.125rem] text-center text-black ">
            {item.name}
          </h1>
          <h1 className=" text-[0.75rem]  ml-[1.25rem] text-[#636363] ">
            {item.days}
          </h1>
        </div>
        <div className="  font-light ml-[0.9375rem] ">
          <h1 className=" text-[1.125rem] text-center text-black ">
            {item.price}
          </h1>
          <h1
            className={` text-[0.75rem]  ${
              item.isNegative ? "text-[#DA1919]" : "text-[#2F982D]"
            } `}
          >
            {item.percent}
          </h1>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <LineChart width={300} height={100} data={item.data}>
          <Line
            type="monotone"
            dataKey="pv"
            stroke={item.isNegative ? "red" : "#2F982D"}
            isAnimationActive={false}
            dot={false}
          />
        </LineChart>
      </div>
    </div>
  );
}

export default Item;
