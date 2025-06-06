"use client";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { sidebarLinks } from "@/constants";
import styles from './LeftSidebar.module.css';


const LeftSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { isLoaded, userId } = useAuth(); 
    
    
  // Show skeleton loading while Clerk is initializing
  if (!isLoaded) {
    return (
     <div className={styles['skeleton-loader'] }></div>
         )
  }else{         

      return (
        <section className="custom-scrollbar leftsidebar">
          <div className="flex w-full flex-1 flex-col gap-6 px-6">
            {sidebarLinks.map((link) => {
              // Compute the route for the profile link
              const route =
                link.route === "/profile" && userId
                  ? `${link.route}/${userId}`
                  : link.route;
    
              const isActive =
                (pathname.includes(link.route) && link.route.length > 1) ||
                pathname === link.route ||
                pathname === route; // Also check for the dynamic profile route
    
              return (
                <Link
                  href={route}
                  key={link.label}
                  className={`leftsidebar_link ${isActive ? "bg-primary-500" : ""}`}
                >
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={24}
                    height={24}
                  />
                  <p className="text-light-1 max-lg:hidden">{link.label}</p>
                </Link>
              );
            })}
          </div>

    
          <div className="mt-10 px-6">
            <SignedIn>
              <SignOutButton>
                <div
                  onClick={() => router.push("/sign-in")}
                  className="flex cursor-pointer gap-4 p-4"
                >
                  <Image src="/assets/logout.svg" width={25} height={25} alt="Logout" />
                  <p className="text-light-2 max-ls:hidden">Log out</p>
                </div>
              </SignOutButton>
            </SignedIn>
          </div>
        </section>
      );

  }

};

export default LeftSidebar;



// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

// import { sidebarLinks } from "@/constants";

// const LeftSidebar = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const { userId } = useAuth();

//   return (
//     <section className='custom-scrollbar leftsidebar'>
//       <div className='flex w-full flex-1 flex-col gap-6 px-6'>
//         {sidebarLinks.map((link) => {
//           const isActive =
//             (pathname.includes(link.route) && link.route.length > 1) ||
//             pathname === link.route;

//           if (link.route === "/profile") link.route = `${link.route}/${userId}`;

//           return (
//             <Link
//               href={link.route}
//               key={link.label}
//               className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
//             >
//               <Image
//                 src={link.imgURL}
//                 alt={link.label}
//                 width={24}
//                 height={24}
//               />

//               <p className='text-light-1 max-lg:hidden'>{link.label}</p>
//             </Link>
//           );
//         })}
//       </div>

//       <div className='mt-10 px-6'>
//         <SignedIn>
//                  <SignOutButton >
    
//  <div onClick={()=>router.push('/sign-in')} className="flex cursor-pointer gap-4 p-4">
//                          <Image src="/assets/logout.svg" width={25} height={25} alt="Logout" />
//                          <p className="text-light-2 max-ls:hidden">Log out</p> 
//                      </div>
//                  </SignOutButton>
//              </SignedIn>
//       </div>
//     </section>
//   );
// };

// export default LeftSidebar;




// "use client"
// import Link from 'next/link';
// import Image from 'next/image';
// import {sidebarLinks } from '@/constants/'
// import { usePathname, useRouter } from 'next/navigation';
// // import { SignedIn, SignOutButton, useAuth } from "@clerk/clerk-react";
// import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

// // import Link from 'next/dist/client/link';

// function LeftSidebar(){
//  {
//    const router = useRouter();
//    const pathname = usePathname(); 
//    const {isLoaded, isSignedIn,userId} = useAuth();
//    console.info('userId as useAuth()', useAuth());
//     //    above are some next Navigations
//      if (isLoaded) {
//         return (
//     <section className="custome-scrollbar leftsidebar">
//         <div className="flex w-full flex-1 flex-col gap-6 px-6">
//             {sidebarLinks.map((link) => 
//               {  
//                 const isActive = (pathname.includes(link.route) && link.route.length > 1 ) || pathname === link.route;

//                const route =
//             link.route === "/profile" && userId
//               ? `${link.route}/${userId}`
//               : link.route;
//                 return (  
//                   <Link href={route}
//                     key={link.label}
//                     className={`leftsidebar_link ${isActive && 'bg-primary-500'} `}>
//                         <Image 
//                         src={link.imgURL} 
//                         alt= {link.label} 
//                         height={25} width={25} />

//                         <p className="text-light-1 max-lg:hidden">{link.label} </p>
//                     </Link> )}
//             )}
            
            
//         </div>
//         <div className="mt-10 px-6">
//         <SignedIn>
//                 <SignOutButton >
//                 {/* <SignOutButton signOutCallBack = {...()=>router.push('/sign-in')} > */}
//                 {/* <SignOutButton signOutOptions={()=>router.push('/sign-in')} > */}
//                 {/* <SignOutButton > */}
//                     <div onClick={()=>router.push('/sign-in')} className="flex cursor-pointer gap-4 p-4">
//                         <Image src="/assets/logout.svg" width={25} height={25} alt="Logout" />
//                         <p className="text-light-2 max-ls:hidden">Log out</p> 
//                     </div>
//                 </SignOutButton>
//             </SignedIn>
//         </div>
//     </section>)
//             }else{
//                 return (
//                     <section className="custome-scrollbar leftsidebar flex items-center justify-center h-full">
//                         <div className="flex flex-col items-center gap-4 w-full px-6">
//                             <div className="w-8 h-8 animate-spin border-4 border-primary-500 border-t-transparent rounded-full" />
//                             <p className="text-light-1">Loading...</p>
//                         </div>
//                     </section>
//                 )
//             }
//     }
// }

// export default LeftSidebar;
