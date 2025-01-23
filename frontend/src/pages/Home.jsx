import React, { useEffect, useState } from "react";
import { Grid, Container, CircularProgress } from "@mui/material";
import CardItem from "../components/CardItem";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setItems(response.data.items);
      } else {
        toast.error("Failed to fetch items.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Container sx={{ marginTop: "20px" }}>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <CardItem item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
