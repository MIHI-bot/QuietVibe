import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";
import AnimatedTopics from "./AnimatedTopics"; // Adjust the path if needed

function Topbar() {
  return (
    <nav className="topbar">
       
<Link href="/" className="flex items-center gap-4">
  <Image src="/assets/lo.png" alt="logo" width={180} height={70} style={{ objectFit: 'contain' }} />

        
      </Link>
    <div className="max-w-xs mx-4 bg-dark-4 rounded-full " style={{minWidth:"50px", maxWidth:"300px", height:"auto"}}>
    
            {/* <AnimatedTopics  /> */}
 
      </div>
      <div className="flex items-center gap-1 w">
         <div >
        <OrganizationSwitcher/>
        </div>
                
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer ">
                <Image
                  src="/assets/logout.svg"
                  width={35}
                  height={35}
                  alt="Logout"
                />
              </div>
            </SignOutButton>
          </SignedIn>

        </div>
       

      </div>
    </nav>
  );
}

export default Topbar;
