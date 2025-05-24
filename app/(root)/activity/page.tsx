import Image from 'next/image';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import { fetchUser, getActivity } from "@/lib/actions/user.action";


async function Page() {
  const user = await currentUser();
  if (!user) redirect("/sign-in")

  const userInfo = await fetchUser(user.id);
//   console.log("this is Info: ", userInfo) //this exist has no error no problem
//   console.log("and this is userInfo._id", userInfo.objectId)//this also exist has no error no problem
  // if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo);
  
//   console.log("this need to be checked: getActivity(UserInfo._id)--: ", getActivity(userInfo._id)) This was also working very well

  return (
    <>
      <h1 className='head-text'>Activity</h1>

      <section className='mt-10 flex flex-col gap-5'>
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className='activity-card'>
                  <Image
                    src={activity.author.image}
                    alt='user_logo'
                    width={20}
                    height={20}
                    className='rounded-full object-cover'
                  />
                  <p className='!text-small-regular text-light-1'>
                    <span className='mr-1 text-primary-500'>
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className='!text-base-regular text-light-3'>No activity yet</p>
        )}
      </section>
    </>
  );
}

export default Page;

