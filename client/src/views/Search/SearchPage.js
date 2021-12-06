import React from "react";
import Search from "../../components/Search";

export default function SearchPage({
  query,
  setQuery,
  quertyRating,
  setQueryRating,
  searchBy,
  setSearchBy,
  lat,
  long,
  setLat,
  setLong,
}) {
  return (
    <div>
      <Search
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
    </div>
  );
}
