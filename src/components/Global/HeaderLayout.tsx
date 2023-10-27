import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

type HeaderProps = {
  isLoggedIn: boolean;
};

const HeaderLayout: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Perform logout logic here
    router.push("/login"); // Redirect to login page after logging out
  };

  return (
    <header className=" w-full h-[5.1875rem] bg-white py-[0.625rem] landingDesktop:pl-[3.875rem] flex flex-row justify-between ">
      <Image src="/assets/SVG/logo.svg" alt="" width={64} height={64} />
      {isLoggedIn ? (
        <div>
          {/* Display content for logged-in users */}
          <p>Welcome, User!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div></div>
      )}
    </header>
  );
};

export default HeaderLayout;
