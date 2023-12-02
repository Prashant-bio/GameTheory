import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Section = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-4 border border-gray-300 rounded-md"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredData.map((i) => (
          <div key={i.id} className="bg-white p-4 shadow-md rounded-md">
            <img src={i.image_url} alt={i.name} className="mb-2 w-full h-[90%] object-cover" />
            <h2 className="text-3xl font-bold ">{i.name}</h2>
          </div>
        ))
        }
      </div>
    </div>
  );
};

export default Section;