import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import Carousel from "react-multi-carousel";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export const Product = () => {
  const images = [
    "/images/products/product.jpg",
    "/images/products/product.jpg",
    "/images/products/product.jpg",
  ];
  const [isShown, setIsShown] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  return (
    <div
      className="flex justify-center items-start z-0"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <Card sx={{ maxWidth: 345 }}>
        {/* <CardActionArea> */}
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          customTransition="transform 300ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          arrows={isShown}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {images.map((el) => {
            return (
              <CardMedia
                component="img"
                height="140"
                image={`${el}`}
                alt="green iguana"
              />
            );
          })}
        </Carousel>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            300 pc(s)
          </Typography>
          <div className="flex justify-between items-center">
            <Typography gutterBottom variant="subtitle1" component="div">
              Roadster Women Solid Top
            </Typography>
            <div
              className={`bg-black/20 hover:bg-black/40 rounded-full h-full ${
                isFavorite ? "text-white" : "text-red-500"
              }`}
            >
              <IconButton
                onClick={() => {
                  setIsFavorite(!isFavorite);
                }}
                aria-label="add to favorites"
                color="inherit"
              >
                <FavoriteIcon />
              </IconButton>
            </div>
          </div>
          <Typography className="flex justify-between py-2" variant="body2">
            <span className="flex justify-center items-center  space-x-1">
              <strong>150.000 VND</strong>
            </span>
            <span className="flex justify-center items-center space-x-1">
              <StarIcon className="text-yellow-300" /> <strong>4.3</strong> (16)
            </span>
          </Typography>
          <div className="w-full bg-green-200/50 rounded-full py-2 px-1 m-1 flex justify-around items-center">
            <Button className="p-1 text-center" variant="text">
              +
            </Button>
            <Typography className="p-0 text-center" variant="inherit">
              1
            </Typography>
            <Button className="p-1 text-center" variant="text">
              -
            </Button>
          </div>
        </CardContent>
        {/* </CardActionArea> */}
      </Card>
    </div>
  );
};
