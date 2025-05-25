import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";
import AnimatedTopics from "./AnimatedTopics"; // Adjust the path if needed

function Topbar() {
  return (
    <nav className="topbar">
       
      <Link href="/" className="flex items-center gap-4">
        <Image 
        src="/assets/logo.svg" 
        alt="logo" 
        width={30} 
        height={30} />
        <p className="text-heading3-bold text-light-1 max-md:hidden">
                  QuietVibes
        </p>
      </Link>
    <div className="max-w-xs mx-4 bg-dark-4 rounded-full " style={{minWidth:"50px", maxWidth:"300px", height:"auto"}}>
    
            <AnimatedTopics  />
 
      </div>
      <div className="flex items-center gap-1 w">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  width={25}
                  height={25}
                  alt="Logout"
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
                />
      </div>
    </nav>
  );
}

export default Topbar;
