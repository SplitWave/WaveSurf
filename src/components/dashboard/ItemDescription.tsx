import Image from 'next/image';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { ItemData } from './Item';
import { PiSealCheckFill } from 'react-icons/pi';
import { BsCircleFill, BsChevronDown } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { Disclosure } from '@headlessui/react';
import Modal from '@mui/material/Modal';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  getProvider,
  signTransaction,
  createTransferTransaction,
} from '@/utils';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import {
  createQR,
  encodeURL,
  findReference,
  FindReferenceError,
  TransferRequestURLFields,
  validateTransfer,
  ValidateTransferError,
} from '@solana/pay';
import { TLog } from '../../../types';

import BigNumber from 'bignumber.js';
import NFTGallery from './NFTGallery';

export const ADMIN_WALLET_ADDRESS =
  '7xoh3GNCVEZgT7VeKB35bTBZuzm86XNfPVzr537zBzWt';
const recipient = new PublicKey(ADMIN_WALLET_ADDRESS);
//const USDC_TOKEN_ADDRESS = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";
const USDC_TOKEN_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const usdcAddress = new PublicKey(USDC_TOKEN_ADDRESS);
//export const NETWORK = 'https://far-didi-fast-mainnet.helius-rpc.com/';
export const MAINNET = 'https://api.mainnet-beta.solana.com/';
const connection = new Connection(MAINNET);

export type ConnectedMethods =
  | {
      name: string;
      onClick: () => Promise<string>;
    }
  | {
      name: string;
      onClick: () => Promise<void>;
    };

interface Props {
  publicKey: PublicKey | null;
  connectedMethods: ConnectedMethods[];
  handleConnect: () => Promise<void>;
  logs: TLog[];
  clearLogs: () => void;
}

const handleStyle = {
  borderColor: '#00A7E1',
  backgroundColor: '#00A7E1',
  height: 25,
  borderRadius: 15,
  width: 25,
};
const trackStyle = { height: 15, backgroundColor: '#00A7E1' };
const railStyle = { height: 15 };

function ItemDescription({ item }: { item: ItemData }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState<number>(50);
  const [logs, setLogs] = useState<TLog[]>([]);
  const [qrCode, setQrCode] = useState<string | undefined>(undefined);
  const [ref, setRef] = useState<PublicKey>();
  const [paymentStatus, setPaymentStatus] = useState<boolean>(false);
  const reference = useMemo(() => Keypair.generate().publicKey, []);
  const provider = getProvider();

  const amount = BigNumber(value);

  // Solana Pay transfer params
  const urlParams: TransferRequestURLFields = {
    recipient: recipient,
    splToken: usdcAddress,
    amount,
    reference,
    label: 'WaveSurf Store',
    message: 'Thank you for using WaveSurf',
  };

  // Encode the params into the format shown
  const url = encodeURL(urlParams);
  //console.log({ url });

  const createLog = useCallback(
    (log: TLog) => {
      return setLogs((logs) => [...logs, log]);
    },
    [setLogs]
  );

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, [setLogs]);

  const handleGenerateClick = async () => {
    const qr = createQR(url, 512, 'transparent');
    const qrBlob = await qr.getRawData('png');
    if (!qrBlob) return;
    // 3 - Convert the blob to a base64 string (using FileReader) and set the QR code state
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setQrCode(event.target.result);
      }
    };
    reader.readAsDataURL(qrBlob);
    // 4 - Set the reference state
    console.log('ref is', reference.toBase58());
    setRef(reference);
    CheckPayment();
  };

  const CheckPayment = () => {
    // update payment status
    //Check every 4s if the transaction is completed
    const interval = setInterval(async () => {
      try {
        // Check if there is any transaction for the reference
        console.log('checking for ref', reference.toBase58());
        const refToValidate = reference;
        const signatureInfo = await findReference(connection, refToValidate, {
          finality: 'confirmed',
        });
        // Validate that the transaction has the expected recipient, amount and SPL token
        await validateTransfer(
          connection,
          signatureInfo.signature,
          {
            recipient: recipient,
            amount,
            splToken: usdcAddress,
            reference: refToValidate,
          },
          { commitment: 'confirmed' }
        );
        //router.push('/shop/confirmed')
        alert('Transaction verified');
        setQrCode(undefined);
        setRef(undefined);
        setPaymentStatus(true);
        //setIsModalOpen(false);
      } catch (e) {
        if (e instanceof FindReferenceError) {
          // No transaction found yet, ignore this error
          // alert("Transaction not verified");
          // setQrCode(undefined);
          // setRef(undefined);
          // setIsModalOpen(false);
          return;
        }
        if (e instanceof ValidateTransferError) {
          // Transaction is invalid
          // console.error("Transaction is invalid", e);
          // alert("Transaction not verified");
          // setQrCode(undefined);
          // setRef(undefined);
          // setIsModalOpen(false);
          return;
        }
        console.error('Unknown error', e);
        // alert("Transaction not verified");
        // setQrCode(undefined);
        // setRef(undefined);
        // setIsModalOpen(false);
      }
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  };

  useEffect(() => {
    if (!provider) return;

    // attempt to eagerly connect
    provider.connect({ onlyIfTrusted: true }).catch(() => {
      // fail silently
    });

    provider.on('connect', (publicKey: PublicKey) => {
      createLog({
        status: 'success',
        method: 'connect',
        message: `Connected to account ${publicKey.toBase58()}`,
      });
    });

    provider.on('disconnect', () => {
      createLog({
        status: 'warning',
        method: 'disconnect',
        message: '👋',
      });
    });

    provider.on('accountChanged', (publicKey: PublicKey | null) => {
      if (publicKey) {
        createLog({
          status: 'info',
          method: 'accountChanged',
          message: `Switched to account ${publicKey.toBase58()}`,
        });
      } else {
        /**
         * In this case dApps could...
         *
         * 1. Not do anything
         * 2. Only re-connect to the new account if it is trusted
         *
         * ```
         * provider.connect({ onlyIfTrusted: true }).catch((err) => {
         *  // fail silently
         * });
         * ```
         *
         * 3. Always attempt to reconnect
         */

        createLog({
          status: 'info',
          method: 'accountChanged',
          message: 'Attempting to switch accounts.',
        });

        provider.connect().catch((error: any) => {
          createLog({
            status: 'error',
            method: 'accountChanged',
            message: `Failed to re-connect: ${error.message}`,
          });
        });
      }
    });

    return () => {
      provider.disconnect();
    };
  }, [createLog]);

  const handleSignTransaction = useCallback(async () => {
    if (!provider) return;

    try {
      const transaction = await createTransferTransaction(
        provider.publicKey as PublicKey,
        new PublicKey(ADMIN_WALLET_ADDRESS),
        value,
        connection
      );
      createLog({
        status: 'info',
        method: 'signTransaction',
        message: `Requesting signature for: ${JSON.stringify(transaction)}`,
      });
      const signedTransaction = await signTransaction(provider, transaction);
      createLog({
        status: 'success',
        method: 'signTransaction',
        message: `Transaction signed: ${JSON.stringify(signedTransaction)}`,
      });
      console.log('signed transaction', `${JSON.stringify(signedTransaction)}`);
      setIsModalOpen(false);
    } catch (error: any) {
      createLog({
        status: 'error',
        method: 'signTransaction',
        message: error.message as string,
      });
    }
  }, [createLog]);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className=" w-full  ">
      <div className=" w-full landingDesktop:h-full bg-white mobile:py-4 landingDesktop:py-[2.4375rem] mobile:mt-5 landingDesktop:mt-0 mobile:rounded-md landingDesktop:rounded-none ">
        <div className=" w-full mobile:px-2  landingDesktop:pl-[1.25rem] landingDesktop:pr-[1.25rem] flex landingDesktop:flex-row landingDesktop:justify-between items-center ">
          {isLoading ? (
            <ThreeDots
              height="80"
              width="180"
              radius="9"
              color="#00A7E1"
              ariaLabel="loading"
            />
          ) : (
            <div className=" flex landingDesktop:flex-row items-center ">
              <div className=" relative landingDesktop:w-[5rem] landingDesktop:h-[5rem] mobile:w-[3.125rem] mobile:h-[3.125rem] ">
                <Image
                  src={item.img}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="  font-light mobile:ml-1 landingDesktop:ml-[10px] ">
                <h1 className=" mobile:text-[0.875rem] landingDesktop:text-[1.375rem] text-center text-black ">
                  {item.name}
                </h1>
                <h1 className=" flex flex-row items-center landingDesktop:text-[1.125rem] mobile:text-[0.875rem] ml-[1.25rem] text-[#636363] ">
                  WaveSurf{' '}
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
              <h1 className=" mobile:text-[0.75rem] landingDesktop:text-[1.375rem] text-center text-black ">
                {item.price}
              </h1>
              <h1
                className={` mobile:text-[0.75rem] landingDesktop:text-[1.125rem]  ${
                  item.isNegative ? 'text-[#DA1919]' : 'text-[#2F982D]'
                } `}>
                {item.percent}{' '}
                <span className=" text-[#636363] ">LAST WEEK</span>
              </h1>
            </div>
          )}
        </div>
        <div className=" w-full px-5 mobile:pt-3 landingDesktop:pt-[2.4375rem] flex flex-row justify-between items-center ">
          <button
            className=" mobile:w-[7.5rem] landingDesktop:w-[8.75rem] h-[3.8125rem] bg-[#00A7E1] rounded-[0.75rem] flex items-center justify-center "
            onClick={openModal}>
            <h1 className=" text-white text-center font-normal mobile:text-[1rem] landingDesktop:text-[1.375rem] ">
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
            <button className=" mobile:w-[10rem] landingDesktop:w-[11.25rem] h-[3.625rem] bg-gray-300 rounded-[2.4375rem] flex items-center justify-center ">
              <h1 className=" flex flex-row  items-center text-[#565656] text-center font-normal mobile:text-[1rem] landingDesktop:text-[18px] ">
                <BsCircleFill
                  color="#3FBFA0"
                  className="mr-[0.625rem]"
                />{' '}
                POOL
                <span className=" font-light ml-[0.3125rem] ">OPEN</span>
              </h1>
            </button>
          )}
        </div>
      </div>
      <Disclosure
        as="div"
        className=" w-full landingDesktop:h-full bg-white mobile:px-3 mobile:py-3 landingDesktop:py-[1.4375rem] landingDesktop:px-[2.0625rem] landingDesktop:mt-[0.9375rem] mobile:mt-5  mobile:rounded-md landingDesktop:rounded-none ">
        <Disclosure.Button className=" w-full flex flex-row items-center justify-between text-black ">
          <h1 className=" font-light mobile:text-[1.25rem] landingDesktop:text-[1.5rem] ">
            Fund details{' '}
          </h1>
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
      <Disclosure
        as="div"
        className=" w-full landingDesktop:h-full bg-white mobile:px-3 mobile:py-3 landingDesktop:py-[1.4375rem] landingDesktop:px-[2.0625rem] landingDesktop:mt-[0.9375rem] mobile:mt-5  mobile:rounded-md landingDesktop:rounded-none ">
        <Disclosure.Button className=" w-full flex flex-row items-center justify-between text-black ">
          <h1 className=" font-light mobile:text-[1.25rem] landingDesktop:text-[1.5rem] ">
            NFT Gallery
          </h1>
          <BsChevronDown />
        </Disclosure.Button>
        <Disclosure.Panel className=" text-black ">
          <NFTGallery />
        </Disclosure.Panel>
      </Disclosure>
      <Modal
        open={IsModalOpen}
        onClose={closeModal}>
        <div className=" landingDesktop:w-[36rem] bg-white rounded-[0.6875rem] shadow-md mobile:mx-3   landingDesktop:m-auto py-[2.1875rem] px-[3rem] ">
          <div className=" flex flex-row items-center justify-center text-black w-full  ">
            <h1 className=" mobile:text-[1.25rem] landingDesktop:text-[1.5rem] font-normal text-center  ">
              Buy {item.name}
            </h1>
            <AiOutlineClose
              size={30}
              className="ml-[2.3125rem]"
              onClick={closeModal}
            />
          </div>
          <h1 className=" text-[#00A7E1] text-center mobile:text-[2.5rem] landingDesktop:text-[3.125rem] font-medium mt-[0.625rem]  ">
            £ {value}
          </h1>
          {!qrCode && (
            <div className=" w-full text-center text-black ">
              <Slider
                min={0}
                max={100}
                value={value}
                onChange={(newValue) => setValue(newValue as number)}
                styles={{
                  handle: handleStyle,
                  track: trackStyle,
                  rail: railStyle,
                }}
              />
              <h1 className=" mobile:text-[1.25rem] landingDesktop:text-[1.5rem] font-normal mt-[2.125rem] ">
                <span className=" text-[#00A7E1] ">{value}</span>% of pool
              </h1>
            </div>
          )}
          {!qrCode && (
            <div className="flex items-center w-full justify-center landingDesktop:mt-[4.75rem] ">
              <input
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600"
              />
              <label
                htmlFor="terms"
                className="ml-2 mobile:text-[1rem] landingDesktop:text-[1.25rem] font-normal text-black text-center ">
                I accept the <span className=" text-[#00A7E1] ">terms</span> &{' '}
                <span className=" text-[#00A7E1] ">conditions</span> of the pool
              </label>
            </div>
          )}
          {qrCode && !paymentStatus && (
            <div className=" w-[12.5rem] h-[12.5rem] m-auto ">
              <Image
                src={qrCode}
                style={{ position: 'relative', background: 'white' }}
                alt="QR Code"
                width={200}
                height={200}
                priority
              />
            </div>
          )}
          {paymentStatus && (
            <div className=" w-[12.5rem] h-[12.5rem] m-auto ">
              <p className="mt-4 text-green-500 text-center">
                Payment Validated
              </p>
            </div>
          )}
          {/* {qrCode && <QRCode value={qrCode} />} */}
          {!qrCode && (
            <button
              className=" mt-[1.9375rem] w-full h-[3.75rem] shadow-md flex flex-row items-center justify-center bg-[#F4F4F4] rounded-[0.25rem] "
              onClick={handleGenerateClick}>
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
          )}

          {!qrCode && (
            <button
              style={{
                marginTop: '1.0625rem',
                width: '100%',
                height: '3.75rem',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#9036D9',
                borderRadius: '0.25rem',
                transition: 'background-color 0.3s',
              }}
              className=" hover:bg-purple-200 focus:bg-purple-300 "
              onClick={handleSignTransaction}>
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
          )}
          {!qrCode && (
            <button className=" mt-[1.0625rem] w-full h-[3.75rem] shadow-md flex flex-row items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 rounded-[0.25rem] ">
              <h1 className=" text-white font-medium ">
                More payments options
              </h1>
            </button>
          )}
          {/* {qrCode && <QRCode value={qrCode} />} */}
        </div>
      </Modal>
    </div>
  );
}

export default ItemDescription;
