import React from "react";
import { Grid, Container } from "@mui/material";
import CardItem from "../components/CardItem";

const items = [
  { id: 1, title: "Laptop", price: "$999", img: "https://via.placeholder.com/150" },
  { id: 2, title: "Headphones", price: "$199", img: "https://via.placeholder.com/150" },
  { id: 3, title: "Smartphone", price: "$799", img: "https://via.placeholder.com/150" }
];

const Home = () => {
  return (
    <Container sx={{ marginTop: "20px" }}>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <CardItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
