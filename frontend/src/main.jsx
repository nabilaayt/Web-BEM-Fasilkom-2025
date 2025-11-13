import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ScrollToTop from "./components/Utils/ScrollToTop";
import { BrowserRouter } from "react-router-dom";

// Set favicon via import so Vite/bundler resolves the correct path
import logoFavicon from "./Assets/Logo/Logo-tengah.png";

function setFavicon(href) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = href;
  link.type = 'image/png';
}

setFavicon(logoFavicon);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>
);
