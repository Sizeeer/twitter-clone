import { useState } from "react";

export const useModal = ({ initialOpen = false } = {}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return { onOpen, onClose, isOpen, onToggle };
};
