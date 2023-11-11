import Image from "next/image";
import { FaGoogle, FaApple } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import { magic } from "@/lib/magic";
import { MagicUserMetadata } from "magic-sdk";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useContext(UserContext);
  const initialValues = {
    email: "",
  };
  const [disabled, setDisabled] = useState<boolean>(false);

  // Redirect to /dashboard if the user is logged in
  useEffect(() => {
    user?.user?.issuer && router.push("/dashboard");
  }, [user]);

  async function handleLoginWithEmail(email: string) {
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered

      // Trigger Magic link to be sent to user
      let didToken = await magic?.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href, // optional redirect back to your app after magic link is clicked
      });

      // Validate didToken with server
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
      });

      if (res.status === 200) {
        // Set the UserContext to the now logged in user
        let userMetadata = await magic?.user.getMetadata();
        console.log("userMetadata", userMetadata);
        await setUser({ ...user, magicUserMetadata: userMetadata });
        router.push("/dashboard");
      }
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  async function handleLoginWithSocial() {
    await magic?.oauth.loginWithRedirect({
      provider: "google", // google, apple, etc
      redirectURI: new URL("/callback", window.location.origin).href, // required redirect to finish social login
    });
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const onSubmit = (values: any) => {
    //console.log("Form data:", values)
    handleLoginWithEmail(values.email);
  };

  const [enabled, setEnabled] = useState(false);

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
            Login with
          </h1>
          <div className=" w-4/5 mobile:mt-[0.9375rem] landingDesktop:mt-[2.1875rem] justify-evenly m-auto flex flex-row items-center ">
            <div className=" w-[4.6875rem] h-[4.6875rem] rounded-[0.9375rem] text-black border-[0.0625rem] border-gray-200 flex items-center justify-center ">
              <FaApple size={31} />
            </div>
            <div
              className=" w-[4.6875rem] h-[4.6875rem] rounded-[0.9375rem] text-black border-[0.0625rem] border-gray-200 flex items-center justify-center "
              onClick={handleLoginWithSocial}
            >
              <FaGoogle size={31} />
            </div>
          </div>
          <h1 className="   font-medium text-center text-[1.125rem] text-gray-400 my-[1.3125rem] ">
            or
          </h1>
          {/* <div className=" mt-[1.25rem] ">
            <EmailForm
              disabled={disabled}
              onEmailSubmit={handleLoginWithEmail}
            />
          </div> */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className=" landingDesktop:px-[3.9375rem] text-gray-400 ">
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
              <div className=" mt-[2.25rem] text-white font-bold text-[0.625rem] w-full h-[2.8125rem] px-[0.5rem] bg-[#00A7E1] flex flex-row justify-center items-center rounded-[0.75rem] ">
                <PiTelegramLogo size={18} />
                <button type="submit" className=" ml-[0.625rem] ">
                  Send Magic Link
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
