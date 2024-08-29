import React from "react";

import { AuthProvider } from "./Auth";
import { queryClient } from "./QueryClient";
import { QueryClientProvider } from "@tanstack/react-query";

const AppProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
