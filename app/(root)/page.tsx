import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";

// import Pagination from "@/components/shared/Pagination";

import ThreadCard from "@/components/cards/ThreadCard";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.action";

import Image from 'next/image';
import ProfileImage from "@/components/ui/profileicon";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();
  if (!user) redirect("/sign-in")
    // Ensure the user is onboarded
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
    
  return (
    <>
    <div className="flex flex-row justify-between">

        <span style={{ fontSize: '28px' }} className="text-left text-gray-300 display-inline ">
 Welcome {userInfo.name?.split(' ')[0] || 'User'} !
          </span>
  
          <ProfileImage image={userInfo.image} />

          </div>
      <section className="mt-9 flex flex-col gap-5">
        {result.posts.length === 0 ? (
          <p className="no-result">No Thread Found</p>
        ) : (
          <>
            {result.posts.filter(post => post.author).map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ''}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt.toLocaleString().replace(/,/, "")}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
