import * as React from "react";
import { CardRoomType } from "./common/card";
import { Typography } from "@mui/material";
import { MenuCustomHead } from "./common/menu";

export const RoomsType = () => {
  return (
    <div className="bg-gray-200/40 -mt-4 pt-4 min-h-screen">
      <div className="flex justify-between items-center px-6 pt-6">
        <div className="">
          <h3 className="text-3xl leading-none font-bold font-serif">
            Room Type List
          </h3>
          <Typography
            sx={{ fontSize: 14, margin: "8px 0 0 0" }}
            color="text.secondary"
            gutterBottom
          >
            All room types.
          </Typography>
        </div>
        <div className="flex space-x-2">
          <MenuCustomHead
            optionsBooking={[
              {
                key: "1",
                text: "Add room type",
                path: "/admin/rooms/add-room-type",
              },
              {
                key: "2",
                text: "Import rooms type",
                path: "/admin/rooms/import-rooms-type",
              },
            ]}
          />
        </div>
      </div>
      <div className="p-6">
        <CardRoomType />
      </div>
    </div>
  );
};
