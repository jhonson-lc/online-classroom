import React, { useState } from "react";

import { MyStudents } from "./MyStudentsSection";
import { CreateMessageModal } from "./CreateMessageModal";
import { MyTeachers } from "./MyTeachersSection";
import { TabName, useMessageStore } from "./store";
import { SideNavigation } from "./SideNavigation";
import InboxSection from "./InboxSection";
import SentSection from "./SentSection";

interface Props {
  role: string;
}

const MessageScreen: React.FC<Props> = ({ role }) => {
  const [showCreateMessageModal, setShowCreateMessageModal] = useState(false);
  const selectedTab = useMessageStore((state) => state.selectedTab);

  const closeMessageModal = () => {
    setShowCreateMessageModal(false);
  };

  const openMessageModal = () => {
    setShowCreateMessageModal(true);
  };

  const handleMessageModalComplete = () => {
    // refetchMessages();
    closeMessageModal();
  };
  return (
    <div>
      <div className="mb-12 flex flex-col">
        <SideNavigation />
        <section className="mt-8">
          {selectedTab === TabName.INBOX && <InboxSection />}
          {selectedTab === TabName.SENT && <SentSection />}
          {selectedTab === TabName.CONTACTS && (
            <section className="grow">
              {role === "teacher" ? (
                <MyStudents sendMessage={openMessageModal} />
              ) : (
                <MyTeachers sendMessage={openMessageModal} />
              )}
            </section>
          )}
        </section>
      </div>
      <CreateMessageModal
        isOpen={showCreateMessageModal}
        onCancel={closeMessageModal}
        onComplete={handleMessageModalComplete}
      />
    </div>
  );
};

export default MessageScreen;
