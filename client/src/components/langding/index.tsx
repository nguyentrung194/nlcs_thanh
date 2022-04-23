import { Button, Divider } from "@mui/material";
import { CarouselMulti } from "./carousel-multi";
import { Cart } from "./cart/cart";
import { Categories } from "./categoris";
import { Product } from "./product/card";
import { Search } from "./search";

export const Langiding = () => {
  return (
    <div>
      <div>
        <Cart />
      </div>
      <div
        style={{ backgroundImage: `url("/images/langding.png")` }}
        className="min-h-screen bg-cover flex justify-center items-center -my-7 h-full"
      >
        <div className="flex justify-center items-center flex-col">
          <h1 className="pb-4 text-6xl leading-none font-medium font-serif">
            Shop your designer dresses
          </h1>
          <p className="pb-4 text-gray-500 leading-normal">
            Ready to wear dresses tailored for you from online. Hurry up while
            stock lasts.
          </p>
          <Search />
        </div>
      </div>
      <div className="my-20">
        <CarouselMulti />
      </div>
      <Divider />
      <div className="flex">
        <div className="py-8 px-3 w-2/12 sticky top-20 h-full">
          <Categories />
        </div>
        <div className="py-8 px-3 w-9/12 min-h-screen">
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
              return <Product />;
            })}
          </div>
          <div className="p-16 flex justify-center items-center">
            <Button variant="contained">Load more</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
