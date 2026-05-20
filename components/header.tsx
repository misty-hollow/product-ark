import { Archive, Plus, Search } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#FAF9F5]/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-stone-300 bg-stone-100 text-stone-700">
            <Archive className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-semibold tracking-normal text-stone-800">
              지구물건보관소
            </span>
            <span className="block truncate font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
              Earth Object Archive
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-stone-500 underline-offset-4 hover:bg-transparent hover:text-stone-800 hover:underline sm:inline-flex"
          >
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" aria-hidden="true" />
              소장 기록 조회
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="border border-stone-800 bg-stone-800 text-stone-50 hover:bg-stone-700"
          >
            <Link href="/items/new">
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
              신규 기록 생성
            </Link>
          </Button>
          <SignedOut>
            <div className="hidden items-center gap-2 sm:flex">
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-stone-300 text-stone-600 hover:bg-stone-100"
                >
                  로그인
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-stone-100 text-stone-700 hover:bg-stone-200"
                >
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
