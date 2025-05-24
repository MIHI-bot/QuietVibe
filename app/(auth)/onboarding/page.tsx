import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";

async function page() {

    const user = await currentUser();
    if (!user) redirect("/sign-in")

    // previously userInfo was UserInfo
    type userInfo = {
        id?: string;
        username?: string;
        name?: string;
        bio?: string;
        image?: string;
    };

    const userInfo =  await fetchUser(user.id);
    
  const userData = {
  id: user?.id || "",
  objectId: userInfo?._id ? userInfo._id.toString() : "",
  username: userInfo?.username || user?.username || "",
  name: userInfo?.name || user?.firstName || "",
  bio: userInfo?.bio || "",
  image: userInfo?.image || user?.imageUrl || ""
}


    return(
      <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
        <h1 className="head-text">Onboarding</h1>
        <p className="mt-3 text-base-regular text-light-2">Complete your profile to continue to Thread</p>
        <section className="mt-9 bg-dark-2 pt-10 p-10">
            <AccountProfile user={userData} btnTitle="Continue"/>
        </section>
      </main>)}
export default page;
