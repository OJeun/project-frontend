import { BsCheckCircle } from "react-icons/bs";
import { useState, useEffect } from "react";
import RecommendationData from "../models/Recommendation";

const GptOutput = ({ requestInfo }: { requestInfo: RecommendationData }) => {
  console.log(requestInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [isResponseGenerated, setIsResponseGenerated] = useState(false);

  useEffect(() => {
    // Set isLoading to true when requestInfo changes
    setIsLoading(true);
    // Reset isResponseGenerated when requestInfo changes
    setIsResponseGenerated(false);
  }, [requestInfo]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && (
          <div
            className="spinner-border text-primary text-center"
            role="status"
            style={{
              width: "8rem",
              height: "8rem",
            }}
          ></div>
        )}
        {isResponseGenerated && !isLoading && (
          <div>
            <div className="text-success">
              <BsCheckCircle size={20} />
              <span className="ml-2">Response Generated</span>
            </div>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default GptOutput;
