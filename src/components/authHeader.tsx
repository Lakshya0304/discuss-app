'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { signIn } from "@/actions/signIn";
import { AvatarImage } from "@radix-ui/react-avatar";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { LogOut } from "lucide-react";
import { signOut } from "@/actions/signOut";
import { Popover, PopoverContent } from './ui/popover';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

export const AuthHeader = () => {
    const session = useSession();

    if(session.status === "loading"){
        return null;
    }
    
    if(session.data?.user){
        return (
            <Popover>
            <PopoverTrigger asChild>
                <Avatar>
                <AvatarImage src={session.data.user.image as string} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="text-center">
                <h1 className="font-medium text-lg">{session.data.user.name}</h1>
                <Separator className="my-2" />
                <form action={signOut}>
                <Button type="submit" value={"outline"}>
                    <LogOut /> SignOut
                </Button>
                </form>
            </PopoverContent>
            </Popover>
        )
    }
    else{
        return (
        <>
            <form action={signIn}>
                <Button type="submit" value={"outline"}>SignIn</Button>
            </form>
            <form action={signIn}>
                <Button type="submit">SignUp</Button>
            </form>
        </>
        )
    }
}
