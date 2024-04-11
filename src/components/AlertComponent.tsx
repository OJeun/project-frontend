import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AlertComponent = () => {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Function to get message from URL parameters
    const getMessageFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      return params.get("message") || ""; // Get message parameter from URL, or empty string if not found
    };

    // Set message state using the message from URL parameters
    setMessage(getMessageFromURL());
  }, []); // useEffect will only run once when the component mounts

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (message) {
      const params = new URLSearchParams(window.location.search);
      const isError = params.get("error") === "true";
      const type = isError ? "error" : "success";

      if (isVisible) {
        if (message.trim() !== "") {
          toast[type](message, {
            onClose: handleClose,
          });
        }
      }
    }
  }, [message, isVisible]);

  return null; // This component doesn't render any UI directly, it utilizes toast notifications
};

export default AlertComponent;
