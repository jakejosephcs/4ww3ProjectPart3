import "./App.css";
import axios from "axios";

import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios
      .get("https://jake-4ww3-project.herokuapp.com/api/restaurants")
      .then((res) => console.log(res));
  }, []);

  return <div className="App"></div>;
}

export default App;
