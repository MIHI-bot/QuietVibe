"use client"
import {sidebarLinks } from '@/constants/'
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Bottombar.module.css';


function Bottombar() {
  const pathname = usePathname(); 
  const { userId, isLoaded } = useAuth();

   if (!isLoaded) {
    return (
     <div className={styles['skeleton-loader'] }></div>
         )
  }else{
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
             const route =
                link.route === "/profile" && userId
                  ? `${link.route}/${userId}`
                  : link.route;
    
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route ||
                pathname === route;
          return (
            <Link
              href={route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-primary-500"} `}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                height={25}
                width={25}
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">{link.label.split(/\s+./)[0]} </p>
            </Link>
          );
        })}
      </div>
    </section>
  )}
}

export default Bottombar;
