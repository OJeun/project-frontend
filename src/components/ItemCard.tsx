import React from "react";
import { BsHeart } from "react-icons/bs"; // Assuming you have imported the heart icon
import Item from "../models/Item";

const ItemCard = ({ data }: { data: Item }) => {
  const { name, brand, typeId, imagePath, colour } = data;

  return (
    <div className="card">
      <img src={imagePath} className="card-img-top" alt={name} />
      <div className="card-header">
        <div className="text-right">
          <div className="color-box" style={{ backgroundColor: colour }}></div>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{brand}</p>
        <p className="card-text">{typeId}</p>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-outline-danger">
            <BsHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
