import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";
import AnimatedTopics from "./AnimatedTopics"; // Adjust the path if needed
import ProfileImage from "../ui/profileicon";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.action";

async function Topbar() {
  const user = await currentUser();
  if (!user) redirect("/sign-in")
    // Ensure the user is onboarded
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <nav className="topbar pl-4 pr-4">
       
<Link href="/" className="flex items-center">
  <Image src="/assets/lo.png" alt="logo" width={140} height={40} style={{ objectFit: 'contain' }} />

        
      </Link>
    <div className="max-w-xs mx-4 bg-dark-4 rounded-full " style={{minWidth:"50px", maxWidth:"300px", height:"auto"}}> 
                <AnimatedTopics  />
        </div>
       
      <div className="flex items-center gap-1 pr-2">
         {/* <div >
        <OrganizationSwitcher/>
        </div> */}
                      
          <ProfileImage image={userInfo.image} />

      </div>
    </nav>
  );
}

export default Topbar;
