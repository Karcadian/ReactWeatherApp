import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=50000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then(async (response) => {
        if (!response.ok) {
          console.error(`Failed to fetch data. Status: ${response.status}`);
          return { options: [] };
        }
  
        try {
          const jsonData = await response.json();
  
          console.log("Raw API Response:", jsonData);
  
          if (!jsonData || !jsonData.data || !Array.isArray(jsonData.data)) {
            console.error("Invalid response format from the API");
            return { options: [] };
          }
  
          const options = jsonData.data.map((city) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name} ${city.countryCode}`,
          }));
  
          console.log("Options:", options);
  
          return { options };
        } catch (jsonError) {
          console.error("Error parsing JSON response:", jsonError);
          return { options: [] };
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  };  

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
