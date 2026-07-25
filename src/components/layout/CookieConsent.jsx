import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadGA, getStoredConsent, setStoredConsent, trackDeclineAnonymously } from "../../utils/analytics";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show the banner if the visitor hasn't already made a choice.
    if (getStoredConsent() === null) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setStoredConsent("granted");
    loadGA();
    setVisible(false);
  };

  const handleDecline = () => {
    setStoredConsent("denied");
    trackDeclineAnonymously();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-[60] rounded-2xl border border-accent-secondary/20 bg-background/95 backdrop-blur-md shadow-lg px-5 py-4"
        >
          <p className="text-sm text-text/80 leading-relaxed">
            This site uses cookies for basic visit analytics (page views and
            resume downloads). No personal data is sold or shared.
          </p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAccept}
              className="flex-1 bg-accent text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-accent/90 transition-colors duration-300"
            >
              Accept
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 border border-accent-secondary/30 text-text/80 text-sm font-medium px-4 py-2 rounded-full hover:bg-accent-secondary/10 transition-colors duration-300"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}