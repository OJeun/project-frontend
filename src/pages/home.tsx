import { useState, useEffect } from "react";
import Nav from "../components/nav";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";
import GptOutput from "../components/GptOutput";
import RecommendationData from "../models/Recommendation";
import { Modal, Button } from "react-bootstrap";
// import "animate.css";

const Home = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [clothTypes, setClothTypes] = useState<{ id: number; type: string }[]>(
    []
  );
  const [selectedType, setSelectedType] = useState<string>("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [recommendationData, setRecommendationData] =
    useState<RecommendationData | null>(null); // State to hold recommendation response

  useEffect(() => {
    fetchClothTypes();
  }, []); // empty dependency array ensures fetchClothTypes is only called once

  const fetchClothTypes = async () => {
    try {
      const response = await axios.get(apiUrl + "/api/types"); // Adjust the endpoint URL as per your backend route
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setClothTypes(response.data);
        setSelectedType(response.data[0].id.toString());
      }
    } catch (error) {
      console.log("Error fetching cloth types:", error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      setImageBase64(base64 as string);
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGenerate = async () => {
    setRecommendationData({
      description:
        "The light blue hoodie would match the first image's denim skirt because the casual style of the hoodie complements the casual look of the denim skirt. Additionally, the light blue color would pair well with the blue denim.",
      recommended_item_image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.threadsmagazine.com%2F2009%2F01%2F02%2Funderstand-turn-of-cloth-2&psig=AOvVaw2Ts5_c52tV3TDb77a_frc1&ust=1712777764168000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOjHo8TwtYUDFQAAAAAdAAAAABAE",
    });
    setShowModal(true);
    try {
      const JsonData = {
        type_id: selectedType,
        uploaded_image: imageBase64,
      };
      console.log(JsonData);
      if (!imageBase64) {
        console.log("Please upload an image first.");
        return;
      }

      const axiosInstance = axios.create({
        timeout: 15000, // Set timeout to 10 seconds (10000 milliseconds)
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
      });

      const response = await axiosInstance.post(
        apiUrl + "/api/recommendation",
        {
          type_id: selectedType,
          uploaded_image: imageBase64,
        }
      );

      setRecommendationData(response.data); // Store recommendation response in state

      console.log("Recommendation response:", response.data);

      // Further logic based on recommendation response
    } catch (error) {
      console.log("Error generating recommendation:", error);
    }
  };

  return (
    <section>
      <Nav />
      <div className="container p-5">
        <h1 className="text-center mb-5">
          Upload the image to find an item that suits you from our shop!
        </h1>
        <div
          className="drop-area rounded"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            backgroundImage: "url('/path/to/your/background/image.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed #ccc",
          }}
        >
          <p>Drag & Drop your file here</p>
        </div>
        {imageBase64 && (
          <div className="text-center mt-3">
            <img
              src={imageBase64}
              alt="Uploaded"
              style={{ maxWidth: "100%", maxHeight: "15rem" }}
            />
            <div className="text-success d-flex justify-content-left align-items-center mt-2">
              <BsCheckCircle size={20} />
              <p className="ml-2">File uploaded successfully!</p>
            </div>
          </div>
        )}
        <div className="container p-5">
          <div className="container">
            <div className="d-flex justify-content-between mb-5">
              <div>
                <text
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  Select your type:
                </text>
                <select
                  className="btn btn-secondary dropdown-toggle"
                  aria-label="Select cloth type"
                  value={selectedType}
                  onChange={handleTypeChange}
                >
                  {clothTypes.map(({ id, type }) => (
                    <option key={id} value={id.toString()}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <text
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  Select item number:
                </text>
                <select
                  className="btn btn-secondary dropdown-toggle"
                  aria-label="Select item number"
                >
                  <option value="1" selected>
                    One
                  </option>
                  <option value="2">Two</option>
                </select>
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary rounded-3"
            style={{
              lineHeight: "2rem",
              width: "12rem",
              marginTop: "2rem",
            }}
            onClick={handleGenerate}
          >
            Generate
          </button>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Recommendation Output</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {recommendationData && <GptOutput requestInfo={recommendationData} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Home;
