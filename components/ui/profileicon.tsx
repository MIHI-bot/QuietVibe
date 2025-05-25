"use client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function ProfileImage({ image }: { image: string }) {
  const router = useRouter();
  const { userId } = useAuth();

  if (!userId) return null;
                  
  return (
    <Image
      src={image}
      alt="Profile"
      width={55}
      height={55}
      className="rounded-full right-0 bg-gray-800"
      style={{ right: 0, display: "inline",cursor:"pointer" }}
      onClick={() => router.push(`/profile/${userId}`) }
    />
  );
}