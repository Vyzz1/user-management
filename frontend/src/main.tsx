import { createRoot } from "react-dom/client";
import "./index.css";
import "@ant-design/v5-patch-for-react-19";

import "./utils/i18n.ts";
import { store } from "./store";
import { Provider } from "react-redux";
import AppWithRouter from "./providers/AppWithRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppWithRouter />
  </Provider>
);
