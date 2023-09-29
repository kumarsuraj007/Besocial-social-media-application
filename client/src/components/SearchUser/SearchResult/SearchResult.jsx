import React from 'react';
import {Link} from 'react-router-dom'

const SearchResults = ({ results }) => {
  return (
    <div className='bg-gray-100 h-screen'>
      <ul>
        {results?.map((user) => (
            <Link to={'/profile/'+user._id}>
          <li className='bg-gray-200 px-5 py-3 text-2xl hover:bg-gray-300 transition-all cursor-pointer' key={user.id}>{user.username}</li>
            </Link>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
