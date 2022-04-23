import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Admin } from "../components/admin";
import { AddBooking } from "../components/admin/add-booking";
import { AddBookingReport } from "../components/admin/add-booking-report";
import { AddCustomer } from "../components/admin/add-customer";
import { AddExpenses } from "../components/admin/add-expenses";
import { AddInvoices } from "../components/admin/add-invoices";
import { AddRoom } from "../components/admin/add-room";
import { AddRoomType } from "../components/admin/add-room-type";
import { AddStocks } from "../components/admin/add-stocks";
import { BookingReport } from "../components/admin/booking-report";
import { Bookings } from "../components/admin/bookings";
import { Customer } from "../components/admin/customer";
import { EditBooking } from "../components/admin/edit-booking";
import { EditBookingReport } from "../components/admin/edit-booking-report";
import { EditCustomer } from "../components/admin/edit-customer";
import { EditExpenses } from "../components/admin/edit-expenses";
import { EditInvoices } from "../components/admin/edit-invoices";
import { EditRoom } from "../components/admin/edit-room";
import { EditRoomType } from "../components/admin/edit-room-type";
import { EditStocks } from "../components/admin/edit-stocks";
import { Expenses } from "../components/admin/expenses";
import { Invoices } from "../components/admin/invoices";
import { Rooms } from "../components/admin/rooms";
import { RoomsType } from "../components/admin/rooms-type";
import { Stocks } from "../components/admin/stocks";

export const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />

      {/* bookings */}
      <Route path="bookings" element={<Bookings />} />
      <Route path="bookings/add-booking" element={<AddBooking />} />
      <Route path="bookings/edit-booking/:id" element={<EditBooking />} />

      {/* rooms/all */}
      <Route path="rooms/all" element={<Rooms />} />
      <Route path="rooms/add-room" element={<AddRoom />} />
      <Route path="rooms/edit-room/:id" element={<EditRoom />} />

      {/* rooms/rooms-type */}
      <Route path="rooms/rooms-type" element={<RoomsType />} />
      <Route path="rooms/add-room-type" element={<AddRoomType />} />
      <Route path="rooms/edit-room-type/:id" element={<EditRoomType />} />

      {/* reports/stocks */}
      <Route path="reports/stocks" element={<Stocks />} />
      <Route path="reports/stocks/add-stock" element={<AddStocks />} />
      <Route path="reports/stocks/edit-stock/:id" element={<EditStocks />} />

      {/* reports/expenses */}
      <Route path="reports/expenses" element={<Expenses />} />
      <Route path="reports/expenses/add-expenses" element={<AddExpenses />} />
      <Route
        path="reports/expenses/edit-expenses/:id"
        element={<EditExpenses />}
      />

      {/* reports/booking */}
      <Route path="reports/booking" element={<BookingReport />} />
      <Route
        path="reports/booking/add-booking"
        element={<AddBookingReport />}
      />
      <Route
        path="reports/booking/edit-booking/:id"
        element={<EditBookingReport />}
      />

      {/* customers */}
      <Route path="customers" element={<Customer />} />
      <Route path="customers/add-customer" element={<AddCustomer />} />
      <Route path="customers/edit-customer/:id" element={<EditCustomer />} />

      {/* invoice */}
      <Route path="payment/invoices-list" element={<Invoices />} />
      <Route
        path="payment/invoices-list/add-invoices"
        element={<AddInvoices />}
      />
      <Route
        path="payment/invoices-list/edit-invoices/:id"
        element={<EditInvoices />}
      />
      {/* <Route path="/*" element={<Navigate to="/admin" replace={true} />} /> */}
    </Routes>
  );
};
