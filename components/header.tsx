"use client";

import { Archive, Plus, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useUser
} from "@clerk/nextjs";

import { UserNav } from "@/components/user-nav";

export function Header() {
  const pathname = usePathname();
  const { user } = useUser();
  const profileHref = user?.id ? `/users/${user.id}` : "/sign-in";
  const mobileItems = [
    { href: "/", icon: Archive, label: "보관소" },
    { href: "/search", icon: Search, label: "조회" },
    { href: "/items/new", icon: Plus, label: "기록" },
    { href: profileHref, icon: UserRound, label: "프로필" }
  ];

  return (
    <>
      <header className="header-blur sticky top-0 z-50 border-b border-[var(--border-xs)]">
        <div className="ark-wrap flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
            <span
              className="grid h-8 w-8 place-items-center border"
              style={{
                borderColor: "var(--border-md)",
                background: "var(--surface-inset)"
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect
                  x="0.5"
                  y="0.5"
                  width="13"
                  height="13"
                  stroke="var(--ink-1)"
                  strokeWidth="1"
                />
                <line
                  x1="7"
                  y1="0.5"
                  x2="7"
                  y2="13.5"
                  stroke="var(--ink-1)"
                  strokeWidth="0.75"
                />
                <line
                  x1="0.5"
                  y1="7"
                  x2="13.5"
                  y2="7"
                  stroke="var(--ink-1)"
                  strokeWidth="0.75"
                />
                <circle cx="7" cy="7" r="1.5" fill="var(--accent-red)" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block truncate font-serif text-[17px] font-semibold leading-none tracking-tight text-[var(--ink-0)]">
                지구물건보관소
              </span>
              <span className="label-mono-sm mt-0.5 block truncate">
                EARTH OBJECT ARCHIVE
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/search"
              className="label-mono flex items-center gap-1.5 px-3 py-1.5 transition-colors hover:text-ark-red"
              style={{
                color: pathname === "/search" ? "var(--accent-red)" : "var(--ink-2)"
              }}
            >
              <Search size={13} aria-hidden="true" />
              소장 기록 조회
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/items/new" className="btn-ark-primary hidden gap-1.5 sm:inline-flex">
              <Plus size={14} aria-hidden="true" />
              신규 기록
            </Link>
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="btn-ark-ghost hidden sm:inline-flex"
                  style={{ minHeight: "36px", fontSize: "var(--t-11)" }}
                >
                  로그인
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="btn-ark-ghost hidden lg:inline-flex"
                  style={{ minHeight: "36px", fontSize: "var(--t-11)" }}
                >
                  시작하기
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserNav />
            </SignedIn>
          </div>
        </div>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t sm:hidden"
        style={{
          background: "var(--surface-card)",
          borderColor: "var(--border-sm)"
        }}
      >
        <div className="grid h-14 grid-cols-4">
          {mobileItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center justify-center gap-0.5 transition-colors"
                style={{ color: active ? "var(--accent-red)" : "var(--ink-3)" }}
              >
                <Icon size={20} strokeWidth={active ? 2 : 1.5} aria-hidden="true" />
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "9px",
                    fontWeight: active ? 500 : 300,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase"
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="h-14 sm:hidden" aria-hidden="true" />
    </>
  );
}
