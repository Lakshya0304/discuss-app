'use client'
import React from 'react'
import { Input } from './ui/input';
import { useSearchParams } from 'next/navigation';
import { search } from '@/actions/search';

const SearchHeader = () => {
    const searchParams = useSearchParams();
  return (
    <div className='w-2/3'>
        <form action={search}>
            <Input defaultValue={searchParams.get("term") || ""} type="text" name='term' placeholder="Search Post..."></Input>
        </form>
    </div>
  );
}

export default SearchHeader
