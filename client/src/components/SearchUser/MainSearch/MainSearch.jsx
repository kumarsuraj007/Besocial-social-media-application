import React, { useState } from 'react';
import SearchResults from '../SearchResult/SearchResult.jsx';

const MainSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchUsers = () => {
    fetch("http://localhost:5000/api/auth/search-users", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        query: searchTerm // Pass the searchTerm as the query parameter
      })
    })
      .then((res) => res.json())
      .then((result) => {
        setSearchResults(result.user); // Update searchResults state with the fetched data
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className="bg-gray-100 p-4 flex justify-center">
        <input
          className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-2"
          onClick={fetchUsers}
        >
          Search
        </button>
      </div>
      <SearchResults results={searchResults} />
    </div>
  );
};

export default MainSearch;
