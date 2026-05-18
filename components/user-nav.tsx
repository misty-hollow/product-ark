"use client";

import { UserRound } from "lucide-react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function UserNav() {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
          <Link href={`/users/${user.id}`}>
            <UserRound className="mr-2 h-4 w-4" aria-hidden="true" />내 보관 기록
          </Link>
        </Button>
      ) : null}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
