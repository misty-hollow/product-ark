import "server-only";

import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

export async function requireCurrentUserInDb() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("로그인이 필요합니다.");
  }

  const primaryEmail =
    clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress ??
    null;

  const displayName =
    clerkUser.fullName ??
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ??
    clerkUser.username ??
    "이름 없는 기록자";

  return prisma.user.upsert({
    where: { id: clerkUser.id },
    update: {
      name: displayName,
      email: primaryEmail,
      image: clerkUser.imageUrl ?? null
    },
    create: {
      id: clerkUser.id,
      name: displayName,
      email: primaryEmail,
      image: clerkUser.imageUrl ?? null
    }
  });
}
