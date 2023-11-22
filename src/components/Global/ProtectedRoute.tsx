import { useWeb3Auth } from "@/context/Web3AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loggedIn } = useWeb3Auth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not logged in
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn, router]);

  // Render the component only if logged in
  return loggedIn ? <>{children}</> : null;
};

export default ProtectedRoute;
