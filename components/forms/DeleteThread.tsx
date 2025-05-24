"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { deleteThread } from "@/lib/actions/thread.actions";
import { Toaster, createToaster } from '@ark-ui/react/toast';

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
})

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === "/") return null;

  const handleDelete = async () => {
    await deleteThread(JSON.parse(threadId), pathname);
    toaster.create({
      title: "Comment deleted",
      description: "Comment has been deleted successfully.",
      duration: 4000,
      type: "success",
    });
    setTimeout(() => {
      if (!parentId || !isComment) {
        router.push("/");
      }
    }, 2000);
  };

  return (
    <>
      <Image
        src='/assets/delete.svg'
        alt='delete'
        width={18}
        height={18}
        className='cursor-pointer object-contain'
        onClick={handleDelete}
      />
      <Toaster toaster={toaster}>
        {(toast) => (
          <div
            style={{
              background: "#222",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "8px",
              marginBottom: "12px",
              minWidth: "220px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <strong>{toast.title}</strong>
            <div>{toast.description}</div>
          </div>
        )}
      </Toaster>
    </>
  );
}

export default DeleteThread;

//==============================================================================================
// "use client";

// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";
// import { deleteThread } from "@/lib/actions/thread.actions";
// import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
// import { XIcon } from 'lucide-react'


// interface Props {
//   threadId: string;
//   currentUserId: string;
//   authorId: string;
//   parentId: string | null;
//   isComment?: boolean;
// }

// function DeleteThread({
//   threadId,
//   currentUserId,
//   authorId,
//   parentId,
//   isComment,
// }: Props) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [showDialog, setShowDialog] = useState(false);

//   if (currentUserId !== authorId || pathname === "/") return null;

//   const handleDelete = async () => {
//     await deleteThread(JSON.parse(threadId), pathname);
//     setShowDialog(true);
//     setTimeout(() => {
//       setShowDialog(false);
//       if (!parentId || !isComment) {
//         router.push("/");
//       }
//     }, 2000);
//   };

//   return (
//     <>
//       <Image
//         src='/assets/delete.svg'
//         alt='delete'
//         width={18}
//         height={18}
//         className='cursor-pointer object-contain'
//         onClick={handleDelete}
//       />
//       {showDialog && (
//         <div
//           style={{
//             position: "fixed",
//             top: "20px",
//             right: "20px",
//             background: "#222",
//             color: "#fff",
//             padding: "12px 24px",
//             borderRadius: "8px",
//             zIndex: 1000,
//             boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//           }}
//         >
//           Comment has been deleted.
//         </div>
//       )}
//     </>
//   );
// }

// export default DeleteThread;
//
// 
// ============================================================================================================
// "use client";

// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";

// import { deleteThread } from "@/lib/actions/thread.actions";

// interface Props {
//   threadId: string;
//   currentUserId: string;
//   authorId: string;
//   parentId: string | null;
//   isComment?: boolean;
// }

// function DeleteThread({
//   threadId,
//   currentUserId,
//   authorId,
//   parentId,
//   isComment,
// }: Props) {
//   const pathname = usePathname();
//   const router = useRouter();

//   if (currentUserId !== authorId || pathname === "/") return null;

//   return (
//     <Image
//       src='/assets/delete.svg'
//       alt='delte'
//       width={18}
//       height={18}
//       className='cursor-pointer object-contain'
//       onClick={async () => {
//         await deleteThread(JSON.parse(threadId), pathname);
//         if (!parentId || !isComment) {
//           router.push("/");
//         }
//       }}
//     />
//   );
// }

// export default DeleteThread;
