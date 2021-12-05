import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

import { useState, useEffect } from "react";

function App() {
  const [resto, setResto] = useState([]);

  useEffect(() => {
    axios
      .get("https://jake-4ww3-project.herokuapp.com/api/restaurants")
      .then((res) => console.log(res));
  }, []);

  return <div className="App"></div>;
}

export default App;
