import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const CustomAccordion = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = (el: any) => {
    navigate(`/admin${props.to ? props.to : ""}${el.to ? el.to : ""}`);
    // navigate(`../${el.to}`, { replace: true });
  };

  return (
    <>
      {props.items.length ? (
        <div>
          <Accordion
            style={{ boxShadow: "none" }}
            TransitionProps={{
              timeout: 800,
            }}
            // expanded={true}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                className={`w-full ${
                  (props.to === "" && location.pathname === "/admin") ||
                  (location.pathname.match(
                    new RegExp(`\\/admin` + props.to + "*")
                  ) &&
                    props.to !== "")
                    ? " text-green-500 "
                    : ""
                }`}
              >
                {props.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props.items.map((el: any) => {
                return (
                  <div
                    className={`w-full ${
                      (props.to === "" && location.pathname === "/admin") ||
                      (location.pathname.match(
                        new RegExp(`\\/admin` + props.to + el.to + "*")
                      ) &&
                        props.to !== "")
                        ? " text-green-500 "
                        : ""
                    }`}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose(el);
                      }}
                    >
                      {el.name}
                    </MenuItem>
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
        </div>
      ) : (
        <div
          className={`w-full ${
            (props.to === "" && location.pathname === "/admin") ||
            (location.pathname.match(new RegExp(`\\/admin` + props.to + "*")) &&
              props.to !== "")
              ? " text-green-500 "
              : ""
          }`}
        >
          <MenuItem
            onClick={() => {
              navigate(`/admin${props.to ? props.to : ""}`);
              // navigate(`../${props.to}`, { replace: true });
            }}
          >
            {props.name}
          </MenuItem>
        </div>
      )}
    </>
  );
};

const navs = [
  {
    name: "Dashboard",
    to: "",
    items: [],
  },
  {
    name: "Bookings",
    to: "/bookings",
    items: [],
  },
  {
    name: "Rooms",
    to: "/rooms",
    items: [
      { name: "All Rooms", to: "/all" },
      { name: "Rooms Type", to: "/rooms-type" },
    ],
  },
  {
    name: "Reports",
    to: "/reports",
    items: [
      { name: "Stocks", to: "/stocks" },
      { name: "Expenses", to: "/expenses" },
      { name: "Booking", to: "/booking" },
    ],
  },
  {
    name: "Customers",
    to: "/customers",
    items: [],
  },
  {
    name: "Payment",
    to: "/payment",
    items: [
      { name: "Invocie List", to: "/invoices-list" },
    ],
  },
];

export const NavAdmin = () => {
  const clientHeight = document.getElementById("nav-thanh")?.clientHeight || 80;
  const height = window.innerHeight;
  const [noTab, setNoTab] = React.useState(-1);
  return (
    <div
      className="w-full space-y-4 pt-3 shadow-xl bg-white overflow-y-scroll scrollbar-custom"
      style={{
        height: height - clientHeight,
      }}
    >
      {navs.map((el: any, index: number) => {
        return (
          <CustomAccordion {...el} function={{ noTab, setNoTab, index }} />
        );
      })}
    </div>
  );
};
