import { useState, useEffect } from "react";
import Nav from "../components/nav";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";
import GptOutput from "../components/GptOutput";
import RecommendationData from "../models/Recommendation";
import { Modal, Button } from "react-bootstrap";
import Item from "../models/Item";
// import "animate.css";

const Home = () => {
  console.log(localStorage.getItem("token"));
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clothTypes, setClothTypes] = useState<{ id: number; type: string }[]>(
    []
  );
  // const [item, setItem] = useState<Item>(new Item(0, "", "", "", "", "", "")); // State to hold item data
  const [selectedType, setSelectedType] = useState<string>("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [recommendationData, setRecommendationData] =
    useState<RecommendationData | null>(null); // State to hold recommendation response

  useEffect(() => {
    fetchClothTypes();
    // test();
  }, []); // empty dependency array ensures fetchClothTypes is only called once

  const fetchClothTypes = async () => {
    try {
      const response = await axios.get(apiUrl + "/api/types");
      if (Array.isArray(response.data)) {
        setClothTypes(response.data);
        setSelectedType(response.data[0].id.toString());
      }
    } catch (error) {
      location.href =
        "/?message= Error fetching cloth types: " + error + "&error=true";
    }
  };

  // const test = () => {
  //   setRecommendationData({
  //     description: "text text",
  //     id: 1,
  //     item: new Item(
  //       1,
  //       "Light Blue Hoodie",
  //       "Jordan",
  //       "Light Blue",
  //       "Top",
  //       "Light blue hoodie with front pocket and drawstrings, featuring the Jordan logo on the chest.",
  //       "clothing_images/tops/light_blue_hoodie.png"
  //     ), // 修复这里的分号为逗号
  //   });
  //   setIsLoading(false); // Set loading state to false (response received)
  // };

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

  // const getTypeStringById = (id: number) => {
  //   if (clothTypes) {
  //     const type = clothTypes.find(
  //       (type: { id: number; type: string }) => type.id === id
  //     );
  //     return type ? type.type : "";
  //   }
  // };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRecommendationData(null);
  };

  const handleGenerate = async () => {
    setShowModal(true);
    // do not delete!!!
    try {
      if (!imageBase64) {
        console.log("Please upload an image first.");
        return;
      }

      const axiosInstance = axios.create({
        timeout: 20000, // Set timeout to 10 seconds (10000 milliseconds)
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const response = await axiosInstance.post(
        apiUrl + "/api/recommendation",
        {
          type_id: selectedType,
          uploaded_image: imageBase64,
        }
      );

      try {
        const itemData = await axios.get(
          apiUrl + `/api/clothing/${response.data.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ); // Add closing parenthesis here

        console.log("Item data:", itemData.data);

        if (itemData.status !== 200) {
          console.log("Error fetching clothing detail:", itemData);
          return;
        }

        setRecommendationData({
          description: response.data.description,
          id: response.data.id,
          item: new Item(
            itemData.data.id,
            itemData.data.name,
            itemData.data.brand,
            itemData.data.colour,
            itemData.data.type,
            itemData.data.description,
            itemData.data.image_path
          ), // 修复这里的分号为逗号
        });
        setIsLoading(false); // Set loading state to false (response received)

        console.log("Recommendation response:", response.data);
      } catch (error) {
        console.error("Error fetching clothing detail:", error);
      }

      // Further logic based on recommendation response
    } catch (error) {
      console.log(error);
      // location.href =
      //   "/?message= Error generating recommendation: " + error + "&error=true";
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
              <div></div>
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
              {recommendationData && (
                <GptOutput
                  requestInfo={recommendationData}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
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
