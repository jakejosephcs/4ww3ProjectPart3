import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchOption from "./SearchOption";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  query,
  setQuery,
  quertyRating,
  setQueryRating,
  lat,
  long,
  setLat,
  setLong,
  handleSearchByQuery,
  handleSearchByRating,
  handleGetLocation,
  handleSearchByLocation,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Name" {...a11yProps(0)} />
            <Tab label="Rating" {...a11yProps(1)} />
            <Tab label="Location" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <SearchOption
            type="query"
            query={query}
            setQuery={setQuery}
            handleSearchByQuery={handleSearchByQuery}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SearchOption
            type="rating"
            quertyRating={quertyRating}
            setQueryRating={setQueryRating}
            handleSearchByRating={handleSearchByRating}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SearchOption
            type="location"
            lat={lat}
            long={long}
            setLat={setLat}
            setLong={setLong}
            handleGetLocation={handleGetLocation}
            handleSearchByLocation={handleSearchByLocation}
          />
        </TabPanel>
      </Box>
    </>
  );
}
