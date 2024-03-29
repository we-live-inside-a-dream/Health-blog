import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "../components/Users";
import Home from "../components/Home";
import AuthLayout from "./AuthLayout";
import NavBar from "../components/NavBar";
import About from "../components/About";
import Upload from "../components/Upload";
import Posts from "../components/Posts";

const AppRoutes = ({toggleModal}) => (
  <Router>
    <NavBar toggleModal = {toggleModal}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AuthLayout />}>
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/upload" element={<Upload />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  </Router>
);

export default AppRoutes;
