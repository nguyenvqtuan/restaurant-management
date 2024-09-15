import { useCallback, useState } from "react";

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<string>("");

  const openDialog = useCallback((content: string) => {
    setContent(content);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setContent("");
  }, []);

  return {
    isOpen,
    content,
    openDialog,
    closeDialog,
  };
};

export default useDialog;
