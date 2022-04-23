import * as React from "react";
import { CardStock } from "./common/card";
import { Typography } from "@mui/material";
import { MenuCustomHead } from "./common/menu";

export const Stocks = () => {
  return (
    <div className="bg-gray-200/40 -mt-4 pt-4 min-h-screen">
      <div className="flex justify-between items-center px-6 pt-6">
        <div className="">
          <h3 className="text-3xl leading-none font-bold font-serif">
            Stocks List
          </h3>
          <Typography
            sx={{ fontSize: 14, margin: "8px 0 0 0" }}
            color="text.secondary"
            gutterBottom
          >
            All stocks.
          </Typography>
        </div>
        <div className="flex space-x-2">
          <MenuCustomHead
            optionsBooking={[
              {
                key: "1",
                text: "Add stock",
                path: "/admin/reports/stocks/add-stock",
              },
              {
                key: "2",
                text: "Import stocks",
                path: "/admin/reports/stocks/import-stocks",
              },
            ]}
          />
        </div>
      </div>
      <div className="p-6">
        <CardStock />
      </div>
    </div>
  );
};
