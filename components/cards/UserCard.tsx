"use client"
import React from 'react'
import { Button } from '../ui/button';
import {useRouter} from 'next/navigation';

interface Props {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    // personType: 'user' | 'community';
      personType: string;


}

const UserCard = ({id,name,username,imgUrl,personType}:Props) => {
    const router = useRouter();

      const isCommunity = personType === "Community";

  return (

    <article className="user-card w-[100%] max-w-3xl mx-auto bg-dark-2 rounded-lg p-4">
  <div className="user-card_avatar flex items-center justify-between gap-12 w-full">
    <div className="flex items-center gap-4">
      <img
        src={imgUrl}
        alt={name}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="flex-1 text-ellipsis">
        <h4 className="text-base-semibold text-light-1">{name}</h4>
        <p className="text-small-medium text-light-3">{username}</p>
      </div>
    </div>
    <Button
      className="user-card_btn bg-primary-500 hover:bg-primary-600 text-light-1 text-small-medium px-4 rounded-lg"
      onClick={() => {
        if (isCommunity) {
          router.push(`/communities/${id}`);
        } else {
          router.push(`/profile/${id}`);
        }
      }}
    >
      View
    </Button>
  </div>
</article>

 )
}

    

{/* <article className="user-card w-64 bg-dark-2 rounded-lg p-4">
  <div className="user-card_avatar flex items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <img
        src={imgUrl}
        alt={name}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="flex-1 text-ellipsis">
        <h4 className="text-base-semibold text-light-1">{name}</h4>
        <p className="text-small-medium text-light-3">{username}</p>
      </div>
    </div>
    <Button
      className="user-card_btn bg-primary-500 hover:bg-primary-600 text-light-1 text-small-medium px-4 py-2 rounded-lg"
      onClick={() => {
        if (isCommunity) {
          router.push(`/communities/${id}`);
        } else {
          router.push(`/profile/${id}`);
        }
      }}
    >
      View
    </Button>
  </div>
</article> */}

//     <article className='user-card '>
//         <div className="user-card_avatar">
//             <img src={imgUrl}
//             alt={name} 
//             width={48}
//             height={48}
//             className='rounded-full' />
// <div className="flex-n1 text-ellipsis">
// <h4 className='text-base-semibold text-light-1'>{name}</h4>
// <p className="text-small-medium text-light-3">
//     {username}

// </p>

// </div>
//   <Button
//         className='user-card_btn'
//         onClick={() => {
//           if (isCommunity) {
//             router.push(`/communities/${id}`);
//           } else {
//             router.push(`/profile/${id}`);
//           }
//         }}
//       >
//         View
//       </Button>


//         </div>

//     </article> 
 
export default UserCard