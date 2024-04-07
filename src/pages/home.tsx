import { useState, useEffect } from "react";
import Nav from "../components/nav";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";

const Home = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [clothTypes, setClothTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchClothTypes();
  });

  const fetchClothTypes = async () => {
    try {
      const response = await axios.get(apiUrl + "/api/types"); // Adjust the endpoint URL as per your backend route
      console.log(response.data);
      if (Array.isArray(response.data)) {
        const types = [];
        for (let i = 0; i < response.data.length; i++) {
          types.push(response.data[i].type);
        }
        setClothTypes(types);
        setSelectedType(types[0]);
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
      console.log(base64);
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

  const handleGenerate = () => {
    // Implement generation logic here
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
                  defaultValue={selectedType}
                  onChange={handleTypeChange}
                >
                  {clothTypes.map((type) => (
                    <option value={type}>{type}</option>
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
    </section>
  );
};

export default Home;
