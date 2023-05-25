import React from "react";

import MessageCard from "./components/MessageCard";
import { NoMessages } from "./NoMessages";

import { api } from "@/utils/api";
import { useSession } from "@/libs/useSession";
import { EmptyStateWrapper } from "@/components/common/EmptyStateWrapper";

const InboxSection: React.FC = () => {
  const messagesQuery = api.Message.getMessages.useQuery();
  const { data: messages, isLoading } = messagesQuery;
  const session = useSession();
  const userData = session.data?.user;
  const messagesReceived = messages?.filter((message) => userData?.id === message.receiverId);

  if (!userData) return null;

  return (
    <EmptyStateWrapper
      EmptyComponent={<NoMessages />}
      NonEmptyComponent={messagesReceived?.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
      data={messagesReceived}
      isLoading={isLoading}
    />
  );
};

export default InboxSection;
