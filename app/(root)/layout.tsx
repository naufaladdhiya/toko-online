import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { db } from "@/lib/db";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await db.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) redirect(`/${store.id}`);

  return (
    <>
      <div>{children}</div>
    </>
  );
}
