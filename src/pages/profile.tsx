import { useEffect, useState } from "react";
import Nav from "../components/nav";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import Item from "../models/Item";
import { toast } from "react-toastify";

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
      if (!token) {
        toast.error('Login needed. Redirecting to login page...');

        setTimeout(() => {
          location.href = '/loginAndRegister';
        }, 3000); 
        return;
      }
      const response = await axios.get(
        apiUrl + "/api/users/" + localStorage.getItem("userId") + "/favorites",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status !== 200) {
        toast.error(response.data.message);
        return;
      }

      setSavedItems(
        response.data.map(
          (item: any) =>
            new Item(
              item.id,
              item.name,
              item.brand,
              item.colour,
              item.type,
              item.description,
              item.image_path
            )
        )
      );
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section>
      <Nav />
      <div className="container">
        <br></br>
        <p style={{ fontSize: '20px'}}>
          Name: {localStorage.getItem('name')}<br></br>
          Email: {localStorage.getItem('email')}
        </p>
        <div className="row" style={{ marginTop: '40px' }}>
          <h2>Saved Items</h2>
          {savedItems.length === 0 ? (
            <p className=" mt-3">You have no saved items yet!</p>
          ) : (
            savedItems.map((item) => (
              <div key={item.id} className="col-md-4 mb-3">
                <ItemCard data={item} />
                <div className="text-right mt-2"></div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
