import { useCallback, useState } from "react";

export const useDialogToggle = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const onOpenDialog = useCallback(() => {
    setIsOpenDialog(true);
  }, []);

  const onCloseDialog = useCallback(() => {
    setIsOpenDialog(false);
  }, []);

  return { isOpenDialog, onOpenDialog, onCloseDialog };
};
