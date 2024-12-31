'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../context/authContext';


export function RouteChangeListener() {
    const pathname = usePathname();
    const { loadUser } = useAuth();
    useEffect(() => {
      loadUser()
    }, [pathname]);

    return <></>;
}