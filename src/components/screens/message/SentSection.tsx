import React from "react";

import MessageCard from "./components/MessageCard";
import { NoMessages } from "./NoMessages";

import { api } from "@/utils/api";
import { useSession } from "@/libs/useSession";
import { EmptyStateWrapper } from "@/components/common/EmptyStateWrapper";

const SentSection: React.FC = () => {
  const messagesQuery = api.Message.getMessages.useQuery();
  const { data: messages, isLoading } = messagesQuery;
  const session = useSession();
  const userData = session.data?.user;
  const messagesSent = messages?.filter((message) => userData?.id === message.authorId);

  if (!userData) return null;

  return (
    <EmptyStateWrapper
      EmptyComponent={<NoMessages />}
      NonEmptyComponent={messagesSent?.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
      data={messagesSent}
      isLoading={isLoading}
    />
  );
};

export default SentSection;
