import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Langiding } from "../components/langding";
// import { DetailsProduct } from "../components/langding/details-products";

export const HomeRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Langiding />} />
      {/* <Route path="details/:id" element={<DetailsProduct />} /> */}
      <Route path="/*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};
