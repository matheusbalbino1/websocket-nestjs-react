declare module "react-simple-snackbar" {
  import React from "react";

  interface SnackbarProviderProps {
    children: React.ReactNode;
  }

  export function useSnackbar(): [(message: string) => void, () => void];
  const SnackbarProvider: React.FC<SnackbarProviderProps>;
  export default SnackbarProvider;
}
