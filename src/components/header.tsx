import React, { Suspense } from 'react'
import { Input } from './ui/input'
import { AuthHeader } from './authHeader';
import SearchHeader from './searchHeader';
import Link from 'next/link';


export default async function HeaderPage() {
  return (
    <div className="grid grid-cols-3 h-16 items-center">
        <div className="flex justify-start">
            <Link href={`/`}>
                <h1 className="font-bold text-xl">Discuss App</h1>
            </Link>
        </div>
        <div className='flex justify-center'>
            <Suspense>
                <SearchHeader />
            </Suspense>
        </div>
        <div className="flex justify-end gap-2">
            <AuthHeader />
        </div>
    </div>
  );
}
