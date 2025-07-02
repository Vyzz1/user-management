import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@ant-design/v5-patch-for-react-19";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 1000 * 60 * 5,
    },
    mutations: {
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryclient}>
    <App />
  </QueryClientProvider>
);
