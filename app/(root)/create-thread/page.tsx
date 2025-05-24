import { currentUser } from '@clerk/nextjs/server';
import { fetchUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import PostThread from '@/components/forms/PostThreads';

async function Page() {
    const user = await currentUser();
    if (!user) redirect("/sign-in");

    const userInfo = await fetchUser(user.id);
    // Ensure the user is onboarded
    if (!userInfo?.onboarded) redirect('/onboarding');
    
    // Convert userInfo._id to a string if it's not already
    const userId = userInfo._id.toString();
    return (
        <>
            <h1 className="head-text">Create Thread</h1>
            <PostThread userId={userId} />
        </>
    );
}

export default Page;
