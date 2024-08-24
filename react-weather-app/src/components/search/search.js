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
<<<<<<< HEAD
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
=======
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.data || !Array.isArray(data.data)) {
          throw new Error("Invalid response format from the API");
        }
  
        const options = data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name} ${city.countryCode}`,
        }));
  
        return { options };
>>>>>>> dad5fab5 (Initial commit)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
<<<<<<< HEAD
  };  

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
=======
  };
  

  const handleOnChange = (searchData) => {
      setSearch(searchData);
      onSearchChange(searchData);
>>>>>>> dad5fab5 (Initial commit)
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
