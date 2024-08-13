"use client";

import * as z from "zod";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStoreModal } from "@/hooks/use-store-modal";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "../ui/button";
import Modal from "../ui/modal";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Name must be at least 4 characters long",
    })
    .max(255),
});

const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values);

      toast.success("Store created successfully");

      window.location.assign(`/${response.data.id}`);

      console.log(response.data);
    } catch (error) {
      toast.error("Failed to create store");
      console.log(["STORE MODAL", error]);
    } finally {
      setLoading(false);
      // storeModal.onClose();
    }
  };

  return (
    <Modal
      title="Create your store"
      description="Enter the name of your store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      name="name"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center space-x-2 pt-6">
              <Button
                type="button"
                variant={"outline"}
                onClick={storeModal.onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Create Store
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default StoreModal;
