"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from "@/lib/validation/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
interface Props {
  threadId: string;
  currentUserId: string;
  currentUserImg: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    try {
      // Validate currentUserId before making the request
      if (!currentUserId) {
        console.error("User ID is missing. Redirecting to sign-in.");
        router.push("/sign-in");
        return;
      }

      // Make the request to add a comment
      await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);

      // Reset the form after successful submission
      form.reset();
    } catch (error: any) {
      console.error("Failed to add comment:", error);

      // Handle specific errors (e.g., redirect if user is not onboarded)
      if (error?.response?.status === 401) {
        router.push("/sign-in");
      } else if (error?.response?.status === 403) {
        router.push("/sign-up");
      } else {
        alert("An error occurred while adding the comment. Please try again.");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-1 w-full">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover mr-4"
                />
              </FormLabel>
              <FormControl className="bg-transparent bg-none1">
                <Input
                  type="text"
                  placeholder="Write a reply..."
                  className="no-focus outline-none border-none bg-dark-4 text-light-1"
                  {...field}
                />
              </FormControl>

              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;











// "use client";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Input } from "../ui/input";
// import { usePathname, useRouter } from "next/navigation";
// import { CommentValidation } from "@/lib/validation/thread"; 
// import Image from "next/image";
// import { addCommentToThread } from "@/lib/actions/thread.actions";

// import { createThread } from "@/lib/actions/thread.actions";
// import { updateUser } from "@/lib/actions/user.action";

// interface Props{
//     threadId: string;
//     currentUserId: string;
//     currentUserImg: string;
// }

// const Comment = ({threadId,currentUserImg,currentUserId}:Props) =>{
//     const router = useRouter();
//     const pathname = usePathname();
  
//     const form = useForm({
//       resolver: zodResolver(CommentValidation),
//       defaultValues: {
//         thread: "",
    
//       },
//     });
  
//     const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
      
//       await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);
//       form.reset();
//     };

//  return(
//     <Form {...form}>
  
//     <form onSubmit={form.handleSubmit(onSubmit)}
//       className="comment-form"
//     >
//       <FormField
//         control={form.control}
//         name="thread"
//         render={({ field }) => (
//           <FormItem className="flex items-center gap-1 w-full">
//             <FormLabel>
//               <Image 
//               src={currentUserImg}
//               alt="User Profile" 
//               width={40}
//               height ={40}
//               className="rounded-full object-cover"
//               />
//             </FormLabel>
//             <FormControl className="bg-transparent bg-none text-light-1">
//               <Input type="text" placeholder="Write a Thread..." className="no-focus text-light-1 outline-none border-none " {...field} />
//             </FormControl>

//           <FormDescription>
//             This is your public display name.
//           </FormDescription>
//           <FormMessage /> 
//           </FormItem>
//         )}
//       />
//       <Button type="submit" className="comment-form_btn"> Reply</Button>
//     </form>
//   </Form>
//     )
// }

// export default Comment;
