import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/router.jsx";
import { RouterProvider } from "react-router-dom";
import AppProvider from "./context/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router}></RouterProvider>
    </AppProvider>
  </StrictMode>
);
