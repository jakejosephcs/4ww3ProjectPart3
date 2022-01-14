// Entry point for the client side. This file is responsible for routing
import { useState, useEffect, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchPage from "./views/Search/SearchPage";
import SignupPage from "./views/Signup/SignupPage";
import LoginPage from "./views/Login/LoginPage";
import RestaurantPage from "./views/Restaurant/RestaurantPage";
import ResultsPage from "./views/Results/ResultsPage";
import SubmissionPage from "./views/Submission/SubmissionPage";

function App() {
  // Global state passed down to components that share it
  const [query, setQuery] = useState("");
  const [quertyRating, setQueryRating] = useState(null);
  const [searchBy, setSearchBy] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  // State for the JWT token
  const [token, setToken] = useState(null);

  // When the page loads, we check if the user is logged in by grabbing the JWT token from local storage
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // Renders the page using React Bootstrap
  return (
    <Fragment>
      {/* Header is present on every page */}
      <Header token={token} setToken={setToken} />
      {/* Routes based on URL */}
      <Routes>
        <Route
          path="/restaurant/:id"
          element={<RestaurantPage token={token} />}
        ></Route>
        <Route
          path="/results"
          element={
            <ResultsPage
              query={query}
              setQuery={setQuery}
              quertyRating={quertyRating}
              setQueryRating={setQueryRating}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
              lat={lat}
              setLat={setLat}
              long={long}
              setLong={setLong}
            />
          }
        ></Route>
        <Route
          path="/submission"
          element={<SubmissionPage token={token} />}
        ></Route>
        <Route
          path="/signin"
          element={<LoginPage setToken={setToken} />}
        ></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route
          path="/"
          element={
            <SearchPage
              query={query}
              setQuery={setQuery}
              quertyRating={quertyRating}
              setQueryRating={setQueryRating}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
              lat={lat}
              setLat={setLat}
              long={long}
              setLong={setLong}
            />
          }
        ></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
