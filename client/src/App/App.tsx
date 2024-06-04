import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Header from "./Header";
import { useAppDispatch } from "../store/store";
import Home from "../feature/home/Home";

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <Routes>
      <Route element={<Header />}>
      <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
