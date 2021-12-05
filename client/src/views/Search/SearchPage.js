import React from "react";
import Search from "../../components/Search";

export default function SearchPage({
  query,
  setQuery,
  quertyRating,
  setQueryRating,
  searchBy,
  setSearchBy,
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
      />
    </div>
  );
}
