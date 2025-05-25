import { currentUser } from "@clerk/nextjs/server";
import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";
import styles from './HomePageloader.module.css';
import { fetchUser } from "@/lib/actions/user.action";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { redirect } from "next/navigation";
import { Children } from "react";

export const revalidate = 0;

async function page({ params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    if (!resolvedParams.id) redirect("/sign-in");

    const user = await currentUser();
    if (!user) redirect("/sign-in");

    const userInfo = await fetchUser(user.id);
    const thread = await fetchThreadById(resolvedParams.id);

    if (!thread || !thread._id) {
      console.log("Your thread id not found, maybe it has been deleted");
      // Show loading section, then redirect after 2 seconds
      return (
        <section className="relative min-w-full h-auto" >
          <h1 className="head-text text-light-1">
        Loading feed ...
          </h1>
          <div className={styles['skeleton-loader']}></div>
          <div className={styles['skeleton-loader-1']}></div>
        </section>
      );
    }

    return (
      <section className='relative'>
        <div>
          <ThreadCard
            id={thread._id}
            currentUserId={user.id}
            parentId={thread.parentId}
            content={thread.text}
            author={thread.author}
            community={thread.community}
            createdAt={new Date(thread.createdAt).toLocaleString()}
            comments={thread.children}
            likeCount={thread.likeCount}
          />
        </div>

        <div className='mt-7'>
          <Comment
            threadId={resolvedParams.id}
            currentUserImg={user.imageUrl}
            currentUserId={JSON.stringify(userInfo._id)}
          />
        </div>

        <div className='mt-10'>
          {thread.children.map((childItem: any) => (
            <ThreadCard
              key={childItem._id}
              id={childItem._id}
              currentUserId={user.id}
              parentId={childItem.parentId}
              content={childItem.text}
              author={childItem.author}
              community={childItem.community}
              createdAt={new Date(childItem.createdAt).toLocaleString()}
              comments={childItem.children}
              isComment
              likeCount={childItem.likeCount}
            />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.log("Error loading thread page:", error);

    redirect("/sign-in")
  }
}

export default page;

