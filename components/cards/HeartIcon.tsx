// components/HeartIcon.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface HeartIconProps {
  initialIsLiked?: boolean;
  threadId: string;
  likeCount:number
  onLikeToggle?: (threadId: string, isLiked: boolean) => void; // Optional callback for like action
}

function HeartIcon({ initialIsLiked = false, threadId, onLikeToggle,likeCount }: HeartIconProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleClick = () => {
    setIsLiked((prev) => !prev);
    if (onLikeToggle) {
      onLikeToggle(threadId, !isLiked);
      likeCount=likeCount+1
    }
  };

  return (
    <Image
      src={isLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleClick}
    />
  );
}

export default HeartIcon;