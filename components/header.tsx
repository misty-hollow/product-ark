import { Archive, Plus, Search } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/92 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Archive className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate text-base font-bold tracking-normal">
            지구물건보관소
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" aria-hidden="true" />
              찾아보기
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/items/new">
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
              기록 남기기
            </Link>
          </Button>
          <SignedOut>
            <div className="hidden items-center gap-2 sm:flex">
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  로그인
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="secondary" size="sm">
                  시작하기
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserNav />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
