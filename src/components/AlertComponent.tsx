import { useEffect, useState } from "react";

const AlertComponent = () => {
  const [message, setMessage] = useState("");
  const [classN, setclassN] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Function to get message from URL parameters
    const getMessageFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const warning = params.get("error");
      if (warning == "true") {
        setclassN("alert alert-danger alert-dismissible fade");
      } else {
        setclassN("alert alert-success alert-dismissible fade");
      }

      return params.get("message") || ""; // Get message parameter from URL, or empty string if not found
    };

    // Set message state using the message from URL parameters
    setMessage(getMessageFromURL());
  }, []); // useEffect will only run once when the component mounts

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        {isVisible && message && (
          <div
            className={classN}
            role="alert"
            style={{
              position: "absolute",
              minWidth: "30rem",
              top: "12rem",
              zIndex: "9999",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 2s ease-in-out",
            }}
          >
            <strong>{message}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
        )}
      </div>
    </>
  );
};

export default AlertComponent;
