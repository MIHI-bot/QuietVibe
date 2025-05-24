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
import { Textarea } from "../ui/textarea";
import { createThread } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";

import { useOrganization } from "@clerk/nextjs";
// import { useUser } from "@clerk/nextjs";
// import { updateUser } from "@/lib/actions/user.action";
import { ThreadValidation } from "@/lib/validation/thread";
interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    time: string;
    // communityId: string;
    createdAt: string;
  };
  btnTitle: string;
}

function PostThread({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    console.log('this was the organisation', organization);
    await createThread(
      {
        text: values.thread,
        author:userId,
        communityId: organization ? organization.id : "Did not get any community",
        path: pathname,
      
      }
    );
    router.push("/")
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 text-dark-4">
                <Textarea  rows={7} {...field} />
          
              </FormControl>
              <FormMessage />

              <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500"> Post Thread</Button>
      </form>
    </Form>
  );
}

export default PostThread;
