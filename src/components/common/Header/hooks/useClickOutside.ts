import { useEffect } from "react";

export const useClickOutside = ({ ref, onClose }: { ref: any; onClose: () => void }) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current?.contains(e.target as Node)) return;
      onClose();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, onClose]);
};
