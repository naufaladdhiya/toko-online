"use client";

import { UseStoreModal } from "@/hooks/use-store-modal";
import { Button } from "../ui/button";
import Modal from "../ui/modal";

const StoreModal = () => {
  const storeModal = UseStoreModal();

  return (
    <Modal
      title="This is Title"
      description="This is Description"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="flex flex-col items-center space-y-4">
        <Button>Click Me</Button>
      </div>
    </Modal>
  );
};

export default StoreModal;
