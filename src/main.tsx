import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.scss";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { setupStore } from "./core/store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </StrictMode>
);
