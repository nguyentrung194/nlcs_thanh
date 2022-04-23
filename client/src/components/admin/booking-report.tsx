import * as React from "react";
import { CardBookingReport } from "./common/card";
import { Typography } from "@mui/material";
import { MenuCustomHead } from "./common/menu";

export const BookingReport = () => {
  return (
    <div className="bg-gray-200/40 -mt-4 pt-4 min-h-screen">
      <div className="flex justify-between items-center px-6 pt-6">
        <div className="">
          <h3 className="text-3xl leading-none font-bold font-serif">
            Booking Report List
          </h3>
          <Typography
            sx={{ fontSize: 14, margin: "8px 0 0 0" }}
            color="text.secondary"
            gutterBottom
          >
            All booking.
          </Typography>
        </div>
        <div className="flex space-x-2">
          <MenuCustomHead
            optionsBooking={[
              {
                key: "1",
                text: "Add bookings",
                path: "/admin/reports/booking/add-booking",
              },
              {
                key: "2",
                text: "Import booking",
                path: "/admin/reports/booking/import-booking",
              },
            ]}
          />
        </div>
      </div>
      <div className="p-6">
        <CardBookingReport />
      </div>
    </div>
  );
};
