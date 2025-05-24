import { SignUp } from "@clerk/nextjs";
import Image from 'next/image';

export default function Page() {
 return <div className="flex items-center justify-center h-screen">
     <SignUp />
       <div className="max-sm:hidden max-md:hidden ml-10" >    
       
      <Image
       src="/login-image.png"
       alt="Login Image"
       width={500} // Set the desired width
       height={300} // Set the desired height
     />
 
     </div>
       </div>
}