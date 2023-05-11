import { Dialog } from "@headlessui/react";
import React, { ReactNode } from "react";

export const Modal = ({
  children,
  isOpen,
  title,
  description,
  handleCancel,
}: {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  description: string;
  handleCancel: () => void;
}) => {
  return (
    <Dialog className="relative z-50" open={isOpen} onClose={handleCancel}>
      <div aria-hidden="true" className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto flex max-w-md flex-col gap-4 rounded-xl bg-white p-8">
          <Dialog.Title className="text-2xl font-bold">{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>

          <div className="flex flex-col gap-4">{children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export const ModalActions = ({ children }: { children: ReactNode }) => {
  return <div className="flex justify-end gap-4">{children}</div>;
};

interface ModalFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const ModalForm = ({ children, ...rest }: ModalFormProps) => {
  return (
    <form {...rest} className="flex flex-col gap-4">
      {children}
    </form>
  );
};
