import Image from "next/image";
import { FaGoogle, FaApple } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import Link from "next/link";

const LoginPage = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values: any) => {
    console.log("Form data:", values);
  };

  const [enabled, setEnabled] = useState(false);

  return (
    <div className=" bg-[#00A7E1] w-full h-full ">
      <div className=" w-full  bg-white landingDesktop:py-[0.625rem] ">
        <div className=" flex flex-row items-center landingDesktop:ml-[3.5625rem] ">
          <div className=" relative mobile:w-[3.125rem] mobile:h-[3.125rem] landingDesktop:w-[4rem] landingDesktop:h-[4rem] ">
            <Image
              src="/assets/SVG/logo.svg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1 className=" mobile:ml-[0.625rem] landingDesktop:ml-[1.5625rem] landingDesktop:mr-[2.875rem] mobile:text-[1.5rem] landingDesktop:text-[2rem] font-light  text-[#605C5C] ">
            WaveSurf
          </h1>
        </div>
      </div>
      <div className=" w-full h-full relative py-[6.25rem]  ">
        <Image
          src="/assets/PNG/bg1.png"
          alt=""
          layout="fill"
          objectFit="cover"
        />
        <Image
          src="/assets/PNG/bg2.png"
          alt=""
          layout="fill"
          objectFit="cover"
        />

        <div className=" m-auto landingDesktop:w-[28.25rem]  rounded-[0.9375rem] bg-white shadow-md py-[2rem] ">
          <h1 className=" font-medium text-[1.125rem] text-center text-gray-700 ">
            Register with
          </h1>
          <div className=" w-4/5 landingDesktop:mt-[2.1875rem] justify-evenly m-auto flex flex-row items-center ">
            <div className=" w-[4.6875rem] h-[4.6875rem] rounded-[0.9375rem] text-black border-[0.0625rem] border-gray-200 flex items-center justify-center ">
              <FaApple size={31} />
            </div>
            <div className=" w-[4.6875rem] h-[4.6875rem] rounded-[0.9375rem] text-black border-[0.0625rem] border-gray-200 flex items-center justify-center ">
              <FaGoogle size={31} />
            </div>
          </div>
          <h1 className="   font-medium text-center text-[1.125rem] text-gray-400 my-[1.3125rem] ">
            or
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className=" landingDesktop:px-[3.9375rem] text-gray-400 ">
              <div>
                <label
                  htmlFor="name"
                  className=" text-black font-normal text-[0.875rem] "
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  className=" w-full h-[3.125rem] px-[1.25rem] rounded-[0.9375rem] border-[0.0625rem] border-gray-200 mt-[0.3125rem] "
                />
                <ErrorMessage name="name" component="div" />
              </div>
              <div className=" mt-[1.5rem] ">
                <label
                  htmlFor="email"
                  className=" text-black font-normal text-[0.875rem] "
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  className=" w-full h-[3.125rem] px-[1.25rem] rounded-[0.9375rem] border-[0.0625rem] border-gray-200 mt-[0.3125rem] "
                />
                <ErrorMessage name="email" component="div" />
              </div>
              <div className=" mt-[1.5rem] ">
                <label
                  htmlFor="password"
                  className=" text-black font-normal text-[0.875rem] "
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Your password"
                  className=" w-full h-[3.125rem] px-[1.25rem] rounded-[0.9375rem] border-[0.0625rem] border-gray-200 mt-[0.3125rem] "
                />
                <ErrorMessage name="password" component="div" />
              </div>
              <div className=" flex flex-row items-center mt-[1.5rem] ">
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${enabled ? "bg-[#00A7E1]" : "bg-black"}
                  relative  inline-flex h-[1.125rem] w-[2.625rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                >
                  <span
                    aria-hidden="true"
                    className={`${enabled ? "translate-x-6" : "translate-x-0"}
                      pointer-events-none inline-block h-[0.8125rem] w-[0.8125rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
                <h1 className=" text-black font-normal text-[0.75rem] ml-[0.625rem] ">
                  Remember me
                </h1>
              </div>
              <div className=" mt-[2.25rem] text-white font-bold text-[0.625rem] w-full h-[2.8125rem] px-[0.5rem] bg-[#00A7E1] flex justify-center items-center rounded-[0.75rem] ">
                <button type="submit">SIGN UP</button>
              </div>
              <h1 className=" mt-[1.5rem] text-[0.875rem] text-center font-bold text-gray-400 ">
                Already have an account?{" "}
                <Link href="/signIn">
                  <span className=" text-[#00A7E1] ">Sign in</span>
                </Link>
              </h1>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
