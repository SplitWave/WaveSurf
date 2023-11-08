import { useEffect, useContext, useState, use } from "react";
import Router, { useRouter } from "next/router";
import { magic } from "../lib/magic";
import { UserContext } from "../context/UserContext";
import { ThreeDots } from "react-loader-spinner";

const Callback = () => {
  const router = useRouter();
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    router.query.provider ? finishSocialLogin() : finishEmailRedirectLogin();
  }, [router.query]);

  // `getRedirectResult()` returns an object with user data from Magic and the social provider
  const finishSocialLogin = async () => {
    let result = await magic.oauth.getRedirectResult();
    authenticateWithServer(result.magic.idToken);
  };

  // `loginWithCredential()` returns a didToken for the user logging in
  const finishEmailRedirectLogin = () => {
    if (router.query.magic_credential)
      magic.auth
        .loginWithCredential()
        .then((didToken) => authenticateWithServer(didToken));
  };

  // Send token to server to validate
  const authenticateWithServer = async (didToken) => {
    let res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
    });

    if (res.status === 200) {
      // Set the UserContext to the now logged in user
      let userMetadata = await magic.user.getMetadata();
      console.log("userMetadata", userMetadata);
      await setUser(userMetadata);
      Router.push("/dashboard");
    }
  };

  return loading ? (
    <div>
      <ThreeDots
        height="80"
        width="120"
        radius="9"
        color="#00A7E1"
        ariaLabel="loading"
      />
    </div>
  ) : null;
};

export default Callback;
