import * as React from "react";
import { Card1, Card2, Card3, Card4, Card5, Card6, Card7 } from "./common/card";
import { BasicSelect } from "./common/common";

export const Admin = () => {
  const data = [
    {
      title: "Total Booking",
      num: 11230,
      this_month: 1913,
      this_week: 1125,
    },
    {
      title: "Rooms Available",
      num: 312,
      this_month: 913,
      this_week: 125,
    },
    {
      title: "Expenses",
      num: 79358,
      this_month: 3540,
      this_week: 1259,
    },
  ];

  return (
    <div className="bg-gray-200/40 -mt-4 pt-4 min-h-screen">
      <div className="flex justify-between px-6 pt-6">
        <h3 className="text-3xl leading-none font-bold font-serif">
          Dashboard Overview
        </h3>
        <BasicSelect />
      </div>
      <div className="grid grid-cols-12 gap-6 p-6">
        {data.map((el) => {
          return (
            <div className="col-span-4">
              <Card1 {...el} />
            </div>
          );
        })}
        <div className="col-span-12">
          <Card2 />
        </div>
        <div className="col-span-6">
          <Card3 />
        </div>
        <div className="col-span-6">
          <Card4 />
        </div>
        <div className="col-span-12">
          <Card5 />
        </div>
        <div className="col-span-6">
          <Card6 />
        </div>
        <div className="col-span-6">
          <Card7 />
        </div>
      </div>
    </div>
  );
};
