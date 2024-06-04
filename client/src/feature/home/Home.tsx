import React from "react";
import "./style.css";
import Application from "./components/application/Application";

const Home: React.FC = (): JSX.Element => {
  return (
    <div className="home">
      <Application />
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  );
};

export default Home;
