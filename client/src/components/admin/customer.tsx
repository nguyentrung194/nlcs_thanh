import * as React from "react";
import { CardCustomer } from "./common/card";
import { MenuCustomHead } from "./common/menu";
import { Typography, Button } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export const Customer = () => {
  return (
    <div className="bg-gray-200/40 -mt-4 pt-4 min-h-screen">
      <div className="flex justify-between items-center px-6 pt-6">
        <div className="">
          <h3 className="text-3xl leading-none font-bold font-serif">
            Customer List
          </h3>
          <Typography
            sx={{ fontSize: 14, margin: "8px 0 0 0" }}
            color="text.secondary"
            gutterBottom
          >
            All customer.
          </Typography>
        </div>
        <div className="flex space-x-2">
        <Button variant="outlined">
            <span className="flex justify-between items-center">
              <CloudDownloadIcon fontSize="medium" color="primary" />
              <span className="pl-3">Export customers</span>
            </span>
          </Button>
          <MenuCustomHead
            optionsBooking={[
              {
                key: "1",
                text: "Add customers",
                path: "/admin/customers/add-customer",
              },
              {
                key: "2",
                text: "Import customer",
                path: "/admin/customers/import-customer",
              },
            ]}
          />
        </div>
      </div>
      <div className="p-6">
        <CardCustomer />
      </div>
    </div>
  );
};
