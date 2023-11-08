import Image from "next/image";
import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { ItemData } from "./Item";
import { PiSealCheckFill } from "react-icons/pi";
import { BsCircleFill, BsChevronDown } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Disclosure } from "@headlessui/react";
import Modal from "@mui/material/Modal";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function ItemDescription({ item }: { item: ItemData }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<number>(50);

  const handleStyle = {
    borderColor: "#00A7E1",
    backgroundColor: "#00A7E1",
    height: 25,
    borderRadius: 15,
    width: 25,
  };
  const trackStyle = { height: 15, backgroundColor: "#00A7E1" };
  const railStyle = { height: 15 };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className=" w-full ">
      <div className=" w-full landingDesktop:h-full bg-white landingDesktop:py-[2.4375rem]  ">
        <div className=" w-full landingDesktop:pl-[1.25rem] landingDesktop:pr-[1.25rem] landingDesktop:flex landingDesktop:flex-row landingDesktop:justify-between items-center ">
          {isLoading ? (
            <ThreeDots
              height="80"
              width="180"
              radius="9"
              color="#00A7E1"
              ariaLabel="loading"
            />
          ) : (
            <div className=" landingDesktop:flex landingDesktop:flex-row items-center ">
              <div className=" relative w-[5rem] h-[5rem] ">
                <Image src={item.img} alt="" layout="fill" objectFit="cover" />
              </div>
              <div className="  font-light ml-[0.625rem] ">
                <h1 className=" text-[1.375rem] text-center text-black ">
                  {item.name}
                </h1>
                <h1 className=" flex flex-row items-center text-[1.125rem]  ml-[1.25rem] text-[#636363] ">
                  WaveSurf{" "}
                  <PiSealCheckFill
                    color="#3897F0"
                    className=" ml-[0.625rem] "
                  />
                </h1>
              </div>
            </div>
          )}
          {isLoading ? (
            <ThreeDots
              height="80"
              width="180"
              radius="9"
              color="#00A7E1"
              ariaLabel="loading"
            />
          ) : (
            <div className="  font-light ml-[0.9375rem] ">
              <h1 className=" text-[1.375rem] text-center text-black ">
                {item.price}
              </h1>
              <h1
                className={` text-[1.125rem]  ${
                  item.isNegative ? "text-[#DA1919]" : "text-[#2F982D]"
                } `}
              >
                {item.percent}{" "}
                <span className=" text-[#636363] ">LAST WEEK</span>
              </h1>
            </div>
          )}
        </div>
        <div className=" w-full landingDesktop:pl-[1.25rem] landingDesktop:pr-[1.25rem] landingDesktop:pt-[2.4375rem]  landingDesktop:flex landingDesktop:flex-row landingDesktop:justify-between items-center ">
          <button
            className=" w-[8.75rem] h-[3.8125rem] bg-[#00A7E1] rounded-[0.75rem] flex items-center justify-center "
            onClick={openModal}
          >
            <h1 className=" text-white text-center font-normal text-[1.375rem] ">
              BUY
            </h1>
          </button>
          {isLoading ? (
            <ThreeDots
              height="80"
              width="120"
              radius="9"
              color="#00A7E1"
              ariaLabel="loading"
            />
          ) : (
            <button className=" w-[11.25rem] h-[3.625rem] bg-gray-300 rounded-[2.4375rem] flex items-center justify-center ">
              <h1 className=" flex flex-row  items-center text-[#565656] text-center font-normal text-[1.125rem] ">
                <BsCircleFill color="#3FBFA0" className="mr-[0.625rem]" /> POOL
                <span className=" font-light ml-[0.3125rem] ">OPEN</span>
              </h1>
            </button>
          )}
        </div>
      </div>
      <Disclosure
        as="div"
        className=" w-full landingDesktop:h-full bg-white landingDesktop:py-[1.4375rem] landingDesktop:px-[2.0625rem] landingDesktop:mt-[0.9375rem] "
      >
        <Disclosure.Button className=" w-full landingDesktop:flex landingDesktop:flex-row items-center landingDesktop:justify-between text-black ">
          <h1 className=" font-light text-[1.5rem] ">Fund details </h1>
          <BsChevronDown />
        </Disclosure.Button>
        <Disclosure.Panel className=" text-black ">
          <h1 className=" px-[0.5rem] text=[1rem] font-light landingDesktop:mt-[1.25rem] ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            interdum tellus ligula, vel dapibus erat aliquet id. Proin facilisis
            dui in risus interdum dictum. Pellentesque pellentesque lobortis
            magna, id gravida metus pulvinar ac. Mauris sed ante orci. Nulla ac
            commodo tellus, ac faucibus augue. Maecenas ornare leo sapien, vitae
            pulvinar ipsum sollicitudin at. Curabitur commodo efficitur metus,
            eget blandit libero tempus id.
          </h1>
          <table className="border-collapse border border-[#B9B9B9] m-auto landingDesktop:mt-[4.0625rem] ">
            <thead>
              <tr>
                <th className="border border-[#B9B9B9] w-1/6 p-3">Header</th>
                <th className="border border-[#B9B9B9] w-1/6 p-3">Header</th>
                <th className="border border-[#B9B9B9] w-1/6 p-3">Header</th>
                <th className="border border-[#B9B9B9] w-1/6 p-3">Header</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((row) => (
                <tr key={row}>
                  <td className="border border-[#B9B9B9] w-1/6 p-3">Cell</td>
                  <td className="border border-[#B9B9B9] w-1/6 p-3">Cell</td>
                  <td className="border border-[#B9B9B9] w-1/6 p-3">Cell</td>
                  <td className="border border-[#B9B9B9] w-1/6 p-3">Cell</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Disclosure.Panel>
      </Disclosure>
      <Modal open={modalIsOpen} onClose={closeModal}>
        <div className=" landingDesktop:w-[36rem] bg-white rounded-[0.6875rem] shadow-md  m-auto py-[2.1875rem] px-[3rem] ">
          <div className=" flex flex-row items-center justify-center text-black w-full  ">
            <h1 className=" text-[1.5rem] font-normal text-center  ">
              Buy {item.name}
            </h1>
            <AiOutlineClose
              size={30}
              className="ml-[2.3125rem]"
              onClick={closeModal}
            />
          </div>
          <h1 className=" text-[#00A7E1] text-center text-[3.125rem] font-medium mt-[0.625rem] mr-[3.75rem] ">
            £ 100
          </h1>
          <div className=" w-full text-center text-black ">
            <Slider
              min={0}
              max={100}
              value={value}
              onChange={(newValue) => setValue(newValue)}
              styles={{
                handle: handleStyle,
                track: trackStyle,
                rail: railStyle,
              }}
            />
            <h1 className=" text-[1.5rem] font-normal mt-[2.125rem] ">
              <span className=" text-[#00A7E1] ">{value}</span>% of pool
            </h1>
          </div>
          <div className="flex items-center w-full justify-center landingDesktop:mt-[4.75rem] ">
            <input
              type="checkbox"
              className="focus:ring-blue-500 h-4 w-4 text-blue-600"
            />
            <label
              htmlFor="terms"
              className="ml-2 text-[1.25rem] font-normal text-black text-center "
            >
              I accept the <span className=" text-[#00A7E1] ">terms</span> &{" "}
              <span className=" text-[#00A7E1] ">conditions</span> of the pool
            </label>
          </div>
          <button className=" mt-[1.9375rem] w-full h-[3.75rem] shadow-md flex flex-row items-center justify-center bg-[#F4F4F4] rounded-[0.25rem] ">
            <h1 className=" text-black font-medium ">Pay with</h1>
            <div className=" relative w-[3.75rem] h-[1.125rem] ml-[0.375rem] ">
              <Image
                src="/assets/PNG/SolanaPayMark.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </button>
          <button className=" mt-[1.0625rem] w-full h-[3.75rem] shadow-md flex flex-row items-center justify-center bg-[#9036D9] rounded-[0.25rem] ">
            <h1 className=" text-white font-medium ">Pay with</h1>
            <div className=" relative w-[1.875rem] h-[1.5625rem] ml-[0.375rem] ">
              <Image
                src="/assets/PNG/phantom-ghost-white.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </button>
          <button className=" mt-[1.0625rem] w-full h-[3.75rem] shadow-md flex flex-row items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 rounded-[0.25rem] ">
            <h1 className=" text-white font-medium ">More payments options</h1>
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ItemDescription;
