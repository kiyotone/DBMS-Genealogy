import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import Redux store
import App from "./App.jsx";
import "./index.css"; // Import global styles

// Render the App inside StrictMode & Redux Provider
const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
