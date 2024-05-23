import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AllBooks from "./pages/AllBooks";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/viewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Store/auth";
import Favroutes from "./components/Profile/Favroutes"
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
const App = () => {
  const dispatch=useDispatch();
  const role = useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if (localStorage.getItem("id")&&
    localStorage.getItem("id")&&
    localStorage.getItem("id")) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-Books" element={<AllBooks />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/profile" element={<Profile />}> <Route index element={<Favroutes />
          
        }></Route> 
        <Route path="/profile/orderhistory" element={<UserOrderHistory />
          
        }></Route>
        <Route path="/profile/settings" element={<Settings />
          
        }></Route></Route>
        <Route
          exact
          path="/view-book-details/:id"
          element={<ViewBookDetails />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
