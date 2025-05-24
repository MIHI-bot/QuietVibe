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
async function Page({ params }: { params: Promise<{ id: string }> }) {
  const user = await currentUser();
  const resolvedParams = await params; // Await the params
  
    if (!user) return null;

  const userInfo = await fetchUser(user.id);
  
  
    // const userInfo = await fetchUser(params.id);
    // if (!userInfo?.onboarded) redirect('/onboarding');
    
    
    //Rubbish but useful code below dotn delete it !
    // console.log(resolvedParams);
    // console.log("This was above resolved Params")
    // const userInfo = await fetchUser(resolvedParams.id);
  if (!userInfo?.onboarded) redirect('/onboarding');
  // if (!user) redirect('/onboarding');


  
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
  <>
    <section>
      <h1 className="head-text mb-10">Search</h1>
            <Searchbar routeType='search' />

      <div className="mt-14 flex flex-col gap-9">
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
  </>
  );
}

export default Page;

