import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-fine)] bg-[var(--bg-base)]/88 shadow-[0_8px_28px_rgba(26,26,24,0.035)] backdrop-blur-xl">
      <div className="archive-container flex h-[72px] items-center justify-between gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center border border-[var(--ink-primary)]/30 bg-[var(--bg-surface)] text-[var(--ink-primary)]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <rect x="0.75" y="0.75" width="14.5" height="14.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 1.5V14.5M1.5 8H14.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-xl italic tracking-normal text-[var(--ink-primary)]">
              지구물건보관소
            </span>
            <span className="block truncate font-mono text-[9px] uppercase tracking-widest text-[var(--ink-muted)]">
              Earth Object Archive
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="nav-link-archive hidden rounded-none bg-transparent px-0 font-mono text-[11px] uppercase tracking-wider text-[var(--ink-secondary)] hover:bg-transparent hover:text-[var(--ink-primary)] sm:inline-flex"
          >
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" aria-hidden="true" />
              소장 기록 조회
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="btn-primary rounded-none border border-[var(--ink-primary)] bg-[var(--ink-primary)] font-mono text-[11px] uppercase tracking-wider text-[var(--bg-base)] hover:bg-[var(--ink-primary)]"
          >
            <Link href="/items/new">
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>신규 기록 생성</span>
            </Link>
          </Button>
          <SignedOut>
            <div className="hidden items-center gap-2 sm:flex">
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden rounded-none border-[var(--border-medium)] bg-transparent font-mono text-[11px] text-[var(--ink-secondary)] hover:bg-[var(--bg-surface)] sm:inline-flex"
                >
                  로그인
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  variant="secondary"
                  size="sm"
                  className="hidden rounded-none bg-[var(--bg-surface)] font-mono text-[11px] text-[var(--ink-primary)] hover:bg-[var(--bg-inset)] sm:inline-flex"
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
