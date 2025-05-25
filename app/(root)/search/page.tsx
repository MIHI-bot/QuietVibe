import { currentUser } from '@clerk/nextjs/server';
import { fetchUser,fetchUsers } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";
import Image from 'next/image';
import ThreadsTab from "@/components/shared/ThreadsTab";
import { profileTabs } from "@/constants";
import UserCard from '@/components/cards/UserCard';
import Searchbar from '@/components/shared/Searchbar';

// async function Page({ params }: { params: { id: string } }) {
// async function Page({ params }: { params: Promise<{ id: string }> }) {
//   const user = await currentUser();
//   const resolvedParams = await params; // Await the params
  
//     if (!user) return null;

//   const userInfo = await fetchUser(user.id);
  
//   if (!userInfo?.onboarded) redirect('/onboarding');

//   const result = await fetchUsers({
//     userId: user.id,
//     searchString: searchParams.q,
//     pageNumber: searchParams?.page ? +searchParams.page : 1,
//     pageSize: 25,
//   });

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (

    <section>
      <h1 className="head-text mb-10">Search</h1>
            <Searchbar routeType='search' />

      <div className="mt-14 flex flex-col gap-3">
          {result.users.length === 0 ? (
            <p className="no-result">No Result</p>
          )
          : ( <>
            {result.users.map((person) => (   
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="user"
              />
            ))}
          </>
        )}

      </div>
    </section>

  );
}

export default Page;

