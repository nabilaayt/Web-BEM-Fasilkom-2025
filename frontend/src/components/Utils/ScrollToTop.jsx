import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * When the pathname changes, scroll window to top.
 * Placed inside BrowserRouter so it reacts to route changes.
 */
export default function ScrollToTop({ behavior = "auto" }) {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      // immediate scroll to top by default; behavior can be 'smooth' if desired
      window.scrollTo({ top: 0, left: 0, behavior });
    } catch (err) {
      // fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [pathname, behavior]);

  return null;
}
