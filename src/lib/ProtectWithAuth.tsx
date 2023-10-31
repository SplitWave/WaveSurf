import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectWithAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const user = true;
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login"); // Redirect to login page if the user is not authenticated
      }
    }, [user, router]);

    // Render the wrapped component if the user is authenticated
    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default ProtectWithAuth;
