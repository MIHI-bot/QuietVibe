import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchUser } from "@/lib/actions/user.action";
import Link from "next/link";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const user = await currentUser();
  if (!user) redirect("/sign-in"); 
  const userInfo = await fetchUser(resolvedParams.id);

  return (
    <section>
       <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        />
    
      <div className='mt-3'>
             {/* <Link href='/profile/edit' className="bg-violet-700 max-2xl:hidden max-xl:hidden max-lg:hidden max-sm:block">
                      <div className='flex cursor-pointer justify-center gap-3 rounded-lg bg-violet-700 px-4 py-4'>
                        <Image
                    src='/assets/edit.svg'
                    alt='logout'
                    width={16}
                    height={16}
                    />
                        <p className='text-light-2  text-center'>Edit Profile</p>
                      </div>
                    </Link> */}
                    {/* <Link href='/profile/edit' className="max-2xl:hidden max-xl:hidden max-lg:hidden max-sm:block"> */}
                    <Link href='/profile/edit' >
  <div className='flex cursor-pointer justify-center gap-3 rounded-lg bg-violet-700 px-4 py-4'>
    <Image src='/assets/edit.svg' alt='edit' width={16} height={16} />
    <p className='text-light-2 text-center'>Edit Profile</p>
  </div>
</Link>
        <Tabs defaultValue='threads' className='w-full mt-4'>
    
          <TabsList className='tab'>
         
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                  />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}

          </TabsList>

          {profileTabs.map((tab) => (
            <TabsContent
            key={`content-${tab.label}`}
            value={tab.value}
            className='w-full text-light-1'
            >
              <ThreadsTab
              currentUserId={user.id}
              accountId={userInfo.id}
              accountType='User'
              /> 
              </TabsContent>
          ))}
        </Tabs>
      </div> 
    </section>
  );
}
export default Page;