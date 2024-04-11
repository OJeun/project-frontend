import { BsCheckCircle } from "react-icons/bs";
import { useState, useEffect } from "react";
import RecommendationData from "../models/Recommendation";
import "animate.css";
import ItemCard from "./ItemCard";

const GptOutput = ({
  requestInfo,
  isLoading,
}: {
  requestInfo: RecommendationData;
  isLoading: boolean;
}) => {
  // const [loading, setLoading] = useState(false);
  // const [itemData, setItemData] = useState(null);
  const [isResponseGenerated, setIsResponseGenerated] = useState(false);

  useEffect(() => {
    if (requestInfo) {
      setIsResponseGenerated(true);
    } else {
      setIsResponseGenerated(false);
    }
  }, [requestInfo, isLoading]);

  return (
    <div>
      {isResponseGenerated && !isLoading && (
        <div>
          <div
            className="text-success"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BsCheckCircle size={40} className="m-4" />
            <div
              className="animate__animated animate__fadeIn"
              style={{ marginBottom: "2rem" }}
            >
              <span>AI response: {requestInfo?.description} </span>
            </div>
            <ItemCard data={requestInfo.item} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GptOutput;
