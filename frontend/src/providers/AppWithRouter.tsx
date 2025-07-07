import { AppWithLocale } from "./AppWithLocale";
import { BrowserRouter } from "react-router-dom";

function AppWithRouter() {
  return (
    <BrowserRouter>
      <AppWithLocale />
    </BrowserRouter>
  );
}

export default AppWithRouter;
