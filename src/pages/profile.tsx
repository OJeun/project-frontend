import { useEffect, useState } from "react";
import Nav from "../components/nav";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import ItemCard from "../components/ItemCard";
import Item from "../models/Item";

const UserProfile = () => {
  const [savedItems, setSavedItems] = useState<Item[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch user data
    fetchSavedItems();
  }, []); // Call the effect whenever the id changes

  // Fetch saved items
  const fetchSavedItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        apiUrl + "/api/users/" + localStorage.getItem("userId") + "/favorites",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      setSavedItems(
        response.data.map(
          (item: any) =>
            new Item(
              item.id,
              item.name,
              item.brand,
              item.colour,
              item.type_id, // Assuming you have a method to get type based on type_id
              item.description,
              item.image_path
            )
        )
      );
    } catch (error) {
      console.error("Error fetching saved items:", error);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        apiUrl + `/users/${localStorage.getItem("userId")}/favorites/${itemId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // Remove the deleted item from the userItems state
      setSavedItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <section>
      <Nav />
      <div className="container">
        <p style={{ fontSize: "28px" }}>name: {localStorage.getItem("name")}</p>
        <p style={{ fontSize: "28px" }}>
          email: {localStorage.getItem("email")}
        </p>
        <div className="row" style={{ marginTop: "40px" }}>
          <h2>Saved Items</h2>
          {savedItems.length === 0 ? (
            <p className="text-center mt-3">You have no saved items yet!</p>
          ) : (
            savedItems.map((item) => (
              <div key={item.id} className="col-md-4 mb-3">
                <ItemCard data={item} />
                <div className="text-right mt-2">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
