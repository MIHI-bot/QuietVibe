// function RightSidebar(){
//     return (
//     <section className="custom-scrollbar rightsidebar">
//         <div className="flex flex1 flex-col justify-start">
//             <h3 className="text-heading4-medium text-light-1">Suggested Community</h3>
//         </div>
//         <div className="flex flex1 flex-col justify-start">
//             <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
//         </div>
//     </section>
//         )
// }

// export default RightSidebar;
// export default RightSidebar;

// RightSidebar.tsx (Client Component Version)

// RightSidebar.tsx
import { currentUser } from '@clerk/nextjs/server';
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import UserCard from '@/components/cards/UserCard';
import Searchbar from '@/components/shared/Searchbar';

async function RightSidebar({
  searchParams = {}, // Default to empty object to prevent undefined
}: {
  searchParams?: { [key: string]: string | undefined }; // Make optional
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q || '', // Fallback to empty string if q is undefined
    pageNumber: searchParams.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section className="custom-scrollbar rightsidebar">
      <h1 className="head-text ">All Users So Far</h1>
      <div className="flex flex-col">
        {result.users.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
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

export default RightSidebar;