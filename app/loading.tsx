import React from 'react';

function LoadingSkeleton() {
    return <div className="flex h-screen w-full items-center justify-center">
        <div className="h-10 w-10 m-0 p-0 animate-spin rounded-full border-4 border-solid border-primary-500 border-t-transparent"></div>
       
    </div>;
}

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <LoadingSkeleton />;
}

