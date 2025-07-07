// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { Toaster, createToaster } from "@ark-ui/react/toast";
// import { useCallback } from "react";
// import { useStreamChat } from "../../contexts/StreamChatProvider";
// import { useAuth } from '@clerk/nextjs';

// interface Props {
//   accountId: string;
//   authUserId: string;
//   name: string;
//   username: string;
//   imgUrl: string;
//   bio: string;
//   type?: "User" | "Community";
// }

// function ProfileHeader({
//   accountId,
//   authUserId,
//   name,
//   username,
//   imgUrl,
//   bio,
//   type,
// }: Props) {
//   const toaster = createToaster({
//     placement: "bottom-end",
//     overlap: true,
//     gap: 24,
//   });

//   const streamClient = useStreamChat();
//   const { userId } = useAuth();

//   const blockUser = useCallback(() => {
//     console.log("blockUser called");
//     toaster.create({
//       title: "Update required",
//       description:
//         "The Blocking feature is not available yet, it will be available in the next update.",
//       duration: 4000,
//       type: "info",
//     });
//   }, [toaster]);

//   const startChat = useCallback(async () => {
//     if (!userId || !streamClient) return;

//     try {
//       const channel = streamClient.channel('messaging', {
//         members: [userId, accountId],
//         name: `Chat with ${username}`,
//       });

//       await channel.create();
//       await channel.watch();

//       toaster.create({
//         title: "Chat Started",
//         description: `You can now message ${username}`,
//         duration: 4000,
//         type: "success",
//       });
//     } catch (error) {
//       toaster.create({
//         title: "Error",
//         description: "Failed to start chat",
//         duration: 4000,
//         type: "error",
//       });
//     }
//   }, [accountId, username, streamClient, userId, toaster]);

//   return (
//     <div className="flex w-full flex-col justify-start">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="relative h-20 w-20 object-cover">
//             <Image
//               src={imgUrl}
//               alt="Profile Image"
//               fill
//               className="rounded-full object-cover shadow-2xl"
//             />
//           </div>
//           <div className="flex-1">
//             <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
//             <p className="text-base-medium text-gray-1">@{username}</p>
//           </div>
//         </div>
//         {accountId === authUserId && type !== "Community" && (
//           <Link href="/profile/edit">
//             <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
//               <Image src="/assets/edit.svg" alt="edit" width={16} height={16} />
//               <p className="text-light-2 max-sm:hidden">Edit</p>
//             </div>
//           </Link>
//         )}
//         //   <Toaster toaster={toaster}>
//          {(toast) => (
//           <div
//             style={{
//               background: "#222",
//               color: "#fff",
//               padding: "12px 24px",
//               borderRadius: "8px",
//               marginBottom: "12px",
//               minWidth: "220px",
//               border: "#dc2626 solid 3px",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//             }}
//           >
//             <strong>{toast.title}</strong>
//             <div>{toast.description}</div>
//           </div>
//         )}
//       </Toaster>
//         {accountId !== authUserId && (
//           <div className="flex gap-2">
//             <button
//               className="flex cursor-pointer gap-3 rounded-lg bg-red-600 px-4 py-2 text-light-2"
//               onClick={blockUser}
//               type="button"
//             >
//               Block user
//             </button>
//             <button
//               className="flex cursor-pointer gap-3 rounded-lg bg-blue-600 px-4 py-2 text-light-2"
//               onClick={startChat}
//               type="button"
//             >
//               Message
//             </button>
//           </div>
//         )}
//       </div>
//       <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
//       <div className="mt-12 h-0.5 w-full bg-dark-3" />
//     </div>
//   );
// }

// export default ProfileHeader;

"use client";
import Link from "next/link";
import Image from "next/image";
import {  Toaster, createToaster } from '@ark-ui/react/toast';
import { SignedIn, SignOutButton } from "@clerk/nextjs";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
}



function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) {
  const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
})


   function blockUser() {
    toaster.create({
      title: "Update required",
      description: "The Blocking feature is not available yet, it will available in next update.",
      duration: 3500,
      type:"info"
    });

  };

  return (

    
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative h-20 w-20 object-cover'>
            <Image
              src={imgUrl}
              alt='logo'
              fill
              className='rounded-full object-cover shadow-2xl'
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>
              {name}
            </h2>
            <p className='text-base-medium text-gray-1'>@{username}</p>
          </div>
        </div>



        
        {accountId === authUserId && type !== "Community" && (
          <>
          {/* <Link href='/profile/edit' className="max-sm:block">
            <div className='flex cursor-pointer gap-3 rounded-lg bg-violet-700 px-4 py-2'>
              <Image
          src='/assets/edit.svg'
          alt='logout'
          width={16}
          height={16}
          />
              <p className='text-light-2 '>Edit Profile</p>
            </div>
          </Link> */}


            <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer ">
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
          </>
          
        )}
  <Toaster toaster={toaster}>
        {(toast) => (
          <div
            style={{
              background: "#222",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "8px",
              marginBottom: "12px",
              minWidth: "220px",
              border: "#dc2626 solid 3px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <strong>{toast.title}</strong>
            <div>{toast.description}</div>
          </div>
        )}
      </Toaster>
        {accountId !== authUserId && (
          <button
            className='flex cursor-pointer gap-3 rounded-lg bg-red-600 px-4 py-2 text-light-2'
            onClick={blockUser} // implement this handler as needed
          >
            Block user
          </button>
        )}

      </div>

       <p className='mt-6 max-w-lg text-base-regular text-light-2'>{bio}</p>

       <div className='mt-12 w-full bg-dark-3' />

{accountId === authUserId && type !== "Community" && (

   <Link href='/profile/edit' className="max-sm:block">
            <div className='flex cursor-pointer gap-3 rounded-lg bg-violet-700 px-2 py-2 place-content-center  '>
              <Image
          src='/assets/edit.svg'
          alt='logout'
          width={16}
          height={16}
          />
              <p className='text-light-2 center'>Edit Profile</p>
            </div>
          </Link>
          
          
        )}
             </div>

  );
}

export default ProfileHeader;
