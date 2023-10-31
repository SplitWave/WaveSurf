import Image from "next/image";
import { FaGoogle, FaApple } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import { ReactSVG } from "react-svg";
import { magic } from "@/lib/magic";
import { useWeb3 } from "@/context/Web3Context";
import { MagicUserMetadata } from "magic-sdk";
import { useRouter } from "next/router";

interface OAuthRedirectResult {
  oauth: {
    provider: string;

    scope: string[];

    accessToken: string;

    userHandle: string;

    // `userInfo` contains the OpenID Connect profile information

    // about the user. The schema of this object should match the

    // OpenID spec, except that fields are `camelCased` instead

    // of `snake_cased`.

    // The presence of some fields may differ depending on the

    // specific OAuth provider and the user's own privacy settings.

    // See: https://openid.net/specs/openid-connect-basic-1_0.html#StandardClaims

    userInfo: string;
  };

  magic: {
    idToken: string;

    userMetadata: MagicUserMetadata;
  };
}

const LoginPage = () => {
  const router = useRouter();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  };
  const { initializeWeb3 } = useWeb3();

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values: any) => {
    console.log("Form data:", values);
  };

  const [enabled, setEnabled] = useState(false);

  // Start the OAuth 2.0 login flow
  const startOAuthLogin = async () => {
    try {
      await magic.oauth.loginWithRedirect({
        provider: "google",
        redirectURI: "http://localhost:3000/login/",
        // redirectURI:
        //   "https://auth.magic.link/v1/oauth2/CndqvnPL2HbSUSI3agyWi9ZMrEIP7EjptWSOHpPmdPE=/callback",
        //scope: ["userinfo.email"],
      });
    } catch (error) {
      // Handle error here
      console.error("OAuth login error:", error);
    }
  };

  // useEffect(() => {
  //   const handleOAuthRedirectResult = async () => {
  //     try {
  //       const urlParams = new URLSearchParams(window.location.search);
  //       const provider = urlParams.get("provider");
  //       const state = urlParams.get("state");
  //       // Extract other relevant parameters as needed

  //       console.log("OAuth provider:", provider);
  //       console.log("OAuth state:", state);
  //       // Log or handle other parameters accordingly

  //       // Clear the URL query parameters after extracting the data
  //       if (window) {
  //         window.history.replaceState(
  //           {},
  //           document.title,
  //           router.asPath.split("?")[0]
  //         );
  //       }
  //     } catch (error) {
  //       console.error("OAuth redirect result error:", error);
  //     }
  //   };

  //   handleOAuthRedirectResult();
  // }, [router]);

  const handleConnect = () => {
    startOAuthLogin();
  };

  return (
    <div className=" bg-[#00A7E1] w-full h-full ">
      {/* <div className=" absolute -top-20 left-1 ">
        <ReactSVG src="/assets/SVG/bg1.svg" />
      </div>
      <div className=" absolute top-40 ">
        <ReactSVG src="/assets/SVG/bg2.svg" />
      </div> */}
      <div className=" w-full  bg-white mobile:px-[0.9375rem] mobile:py-[0.625rem] landingDesktop:px-0 landingDesktop:py-[0.625rem] ">
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
      <div className=" w-full h-full relative py-[6.25rem]">
        <div className=" m-auto mobile:w-4/5 landingDesktop:w-[28.25rem] z-20 rounded-[0.9375rem] bg-white shadow-md py-[2rem] mobile:px-[0.9375rem] landingDesktop:px-0 ">
          <h1 className=" font-medium text-[1.125rem] text-center text-gray-700 ">
            Register with
          </h1>
          <div className=" w-4/5 mobile:mt-[0.9375rem] landingDesktop:mt-[2.1875rem] justify-evenly m-auto flex flex-row items-center ">
            <div className=" w-[4.6875rem] h-[4.6875rem] rounded-[0.9375rem] text-black border-[0.0625rem] border-gray-200 flex items-center justify-center ">
              <FaApple size={31} />
            </div>
            <div
              className=" w-[4.6875rem] h-[4.6875rem] rounded-[0.9375rem] text-black border-[0.0625rem] border-gray-200 flex items-center justify-center "
              onClick={handleConnect}
            >
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
