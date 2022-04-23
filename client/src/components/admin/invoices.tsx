import * as React from "react";
import { CardInvoices } from "./common/card";
import { Typography } from "@mui/material";
import { MenuCustomHead } from "./common/menu";

export const Invoices = () => {
  return (
    <div className="bg-gray-200/40 -mt-4 pt-4 min-h-screen">
      <div className="flex justify-between items-center px-6 pt-6">
        <div className="">
          <h3 className="text-3xl leading-none font-bold font-serif">
            Invoices List
          </h3>
          <Typography
            sx={{ fontSize: 14, margin: "8px 0 0 0" }}
            color="text.secondary"
            gutterBottom
          >
            All invoices.
          </Typography>
        </div>
        <div className="flex space-x-2">
          <MenuCustomHead
            optionsBooking={[
              {
                key: "1",
                text: "Add invoices",
                path: "/admin/payment/invoices-list/add-invoices",
              },
              {
                key: "2",
                text: "Import invoices",
                path: "/admin/payment/invoices-list/import-invoices",
              },
            ]}
          />
        </div>
      </div>
      <div className="p-6">
        <CardInvoices />
      </div>
    </div>
  );
};
