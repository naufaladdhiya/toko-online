"use client";

import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";

import { UseStoreModal } from "@/hooks/use-store-modal";

const SetupPage = () => {
  const onOpen = UseStoreModal((state) => state.onOpen);
  const isOpen = UseStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [onOpen, isOpen]);

  return (
    <main className="p-6">
      <UserButton afterSwitchSessionUrl="/" />
      Root Layout
    </main>
  );
};

export default SetupPage;
