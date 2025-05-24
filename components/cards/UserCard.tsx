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
    <article className='user-card'>
        <div className="user-card_avatar">
            <img src={imgUrl}
            alt={name} 
            width={48}
            height={48}
            className='rounded-full' />
<div className="flex-n1 text-ellipsis">
<h4 className='text-base-semibold text-light-1'>{name}</h4>
<p className="text-small-medium text-light-3">
    {username}

</p>

</div>
  <Button
        className='user-card_btn'
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

export default UserCard