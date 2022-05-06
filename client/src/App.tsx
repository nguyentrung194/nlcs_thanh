import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NavLayout } from "./layouts/nav";
import { CartContext, CartContextProvider } from "./contexts/context";
import "./styles/index.css";
import { HomeRoute } from "./route/home.route";
// import { DetailsHotelRoute } from "./route/details-hotel.route";
import { AdminLayout } from "./layouts/nav-admin";
import { AdminRoute } from "./route/admin.route";
import axios from "axios";
import environment from "./config";

function App() {
  // const {} = useContext(CartContext);
  const [isLogin, setIsLogin] = React.useState(false);
  React.useEffect(() => {
    async function fetchData() {
      // You can await here
      await axios({
        url: `${environment.api}users/me`,
        method: "GET",
        // headers: {
        // Authorization: "Bearer ",
        // },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      })
        .then(({ data: { data } }: { data: { data: any } }) => {
          // Handle success
          console.log(data);
          setIsLogin(true);
        })
        .catch((err) => {
          // Handle error
          console.log(err);
        });
    }
    fetchData();
  }, []);

  if (!!isLogin) {
    return (
      <CartContextProvider>
        <Routes>
          <Route element={<NavLayout />}>
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            <Route path="/home/*" element={<HomeRoute />} />
          </Route>
        </Routes>
      </CartContextProvider>
    );
  } else {
    return (
      <CartContextProvider>
        <Routes>
          <Route element={<NavLayout />}>
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            <Route path="/home/*" element={<HomeRoute />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin/*" element={<AdminRoute />} />
            </Route>
          </Route>
        </Routes>
      </CartContextProvider>
    );
  }
}

export default App;
