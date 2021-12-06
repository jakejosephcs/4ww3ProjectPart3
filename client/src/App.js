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
  const [query, setQuery] = useState("");
  const [quertyRating, setQueryRating] = useState(null);
  const [searchBy, setSearchBy] = useState(null);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <Fragment>
      <Header token={token} />
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
