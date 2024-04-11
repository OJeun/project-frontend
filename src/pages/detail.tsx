import { useState, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import Item from "../models/Item";
import Nav from "../components/nav";
import axiosInstance from "../components/axiosInstance";
import { toast } from "react-toastify";

console.log(localStorage.getItem("token"));

const ItemDetail = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  console.log(id);

  const [item, setItem] = useState<Item | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch item details when the component mounts

    fetchItemDetails(); // Call the fetchItemDetails function
  }, [id]); // Call the effect whenever the id changes

  const fetchItemDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Login needed. Redirecting to login page...");

      setTimeout(() => {
        location.href = "/loginAndRegister";
      }, 3000);
      return;
    }
    const response = await axiosInstance.get(apiUrl + `/api/clothing/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status !== 200) {
      toast.error(response.data.message);
      return;
    }

    setItem(
      new Item(
        response.data.id,
        response.data.name,
        response.data.brand,
        response.data.colour,
        response.data.type,
        response.data.description,
        response.data.image_path,
        response.data.isFavorite
      )
    );
    setIsLiked(response.data.isFavorite);
  };

  const toggleLike = async () => {
    try {
      if (isLiked) {
        const response = await axiosInstance.delete(
          apiUrl +
            `/api/users/${localStorage.getItem("userId")}/favorites/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status !== 200) {
          toast.error(response.data.message);
          return;
        } else {
          toast.success("Item removed from favorites.");
        }
      } else {
        const response = await axiosInstance.post(
          apiUrl +
            `/api/users/${localStorage.getItem("userId")}/favorites/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status !== 200) {
          toast.error(response.data.message);
          return;
        } else {
          toast.success("Item added to favorites.");
        }
      }
      setIsLiked(!isLiked);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  if (!item) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          className="spinner-border text-primary text-center"
          role="status"
          style={{
            width: "8rem",
            height: "8rem",
          }}
        ></div>
      </div>
    ); // Placeholder while item details are being fetched
  }

  return (
    <section>
      <Nav />
      <div className="container mt-4 position-relative">
        <div className="row">
          <div className="col-md-6">
            <img src={item.imagePath} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2>{item.name}</h2>
            <p>Brand: {item.brand}</p>
            <p>Type: {item.type}</p>
            <p>Colour: {item.colour}</p>
            <p>Description: {item.description}</p>
          </div>
        </div>
        <div // Heart icon container
          onClick={toggleLike}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            color: isLiked ? "red" : "grey",
            fontSize: 30,
            cursor: "pointer",
            marginRight: 10,
            marginBottom: 10,
          }}
        >
          <BsFillHeartFill />
        </div>
      </div>
    </section>
  );
};

export default ItemDetail;
