import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const CardItem = ({ item }) => {
  return (
    <Card>
      <CardMedia component="img" height="140" image={item.img} alt={item.title} />
      <CardContent>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="body1">{item.price}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardItem;
