import React, { useState, useEffect } from 'react';


const NasaAPOD = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await fetch(
          'https://api.nasa.gov/planetary/apod?api_key=6fzMVI9rxoKtlA6zKwZhRofD0xw4atVD2xgyhOcD'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setApodData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="nasa-apod">
      <h2>{apodData.title}</h2>
      <p>Date: {apodData.date}</p>
      <p>{apodData.explanation}</p>
      <img src={apodData.url} alt={apodData.title} />
    </div>
  );
};

export default NasaAPOD;
