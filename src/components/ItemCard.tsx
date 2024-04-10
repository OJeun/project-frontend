import { BsFillHeartFill, BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import Item from "../models/Item";

const ItemCard = ({ data }: { data: Item }) => {
  const { name, brand, type, imagePath, id } = data;
  const [isLiked, setIsLiked] = useState(false);

  const heartColor = isLiked ? "red" : "grey"; // Dynamic heart color

  const handleDetailsClick = () => {
    // Navigate to the detail page with the item ID
    location.href = `/detail?id=${id}`;
  };

  return (
    <div
      className="card border-primary"
      style={{
        padding: "0",
        width: "20rem",
        position: "relative", // Ensure the parent container is relative
      }}
    >
      <div className="card-header bg-primary">
        <div className="text-right">
          <img src={imagePath} className="card-img-top" alt={name} />
        </div>
      </div>

      <div className="card-body" style={{ position: "relative" }}>
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          {brand} {type}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className="btn btn-outline-primary"
            style={{ marginLeft: "auto" }} // Align to the right
            onClick={handleDetailsClick} // Redirect to detail page on click
          >
            Details <BsInfoCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
