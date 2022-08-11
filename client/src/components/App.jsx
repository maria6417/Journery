/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';
import Posts from './Posts';
import Header from './Header';
import Login from './Login';

const userId = 2;
const samplePhoto = {
  id: 1,
  url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZXxlbnwwfHwwfHw%3D&w=1000&q=80',
  description: 'My first machupichu was incredible. We did blah blah and did blah blah. I hope I can come visit soon again.',
  user_id: 1,
  country_code: 'US',
  visit_date: '2020-08-21',
};

export default function App() {
  const [mapData, setMapData] = useState({ KR: 1 });
  const [photos, setPhotos] = useState([samplePhoto, samplePhoto, samplePhoto]);
  const [openPosts, setOpenPosts] = useState(false);
  const [selectedCountry, setCountry] = useState('');
  // country code + number of pics
  const getPhotos = () => {
    const config = {
      method: 'GET',
      url: '/photos',
      params: {
        user_id: userId,
        country_code: selectedCountry,
      },
    };
    axios(config)
      .then((result) => setPhotos(result.data))
      .catch((err) => console.log('error getting photos.', err));
  };

  const getCountries = () => {
    const config = {
      method: 'GET',
      url: '/photos/countries',
      params: { user_id: userId },
    };
    axios(config)
      .then((result) => result.data ? setMapData(result.data) : setMapData({}))
      .catch((err) => console.log('error getting countries', err));
  };

  const deletePost = (photoId) => {
    const config = {
      method: 'DELETE',
      url: `/photos/${photoId}`,
    };
    axios(config)
      .then(() => getCountries())
      .then(() => getPhotos())
      .catch((err) => console.log('error deleting photo.', err));
  };

  const post = ({ url, description, visit_date }) => {
    const config = {
      method: 'POST',
      url: '/photos',
      data: {
        user_id: userId,
        country_code: selectedCountry,
        url,
        description,
        visit_date,
      },
    };
    axios(config)
      .then(() => {
        getPhotos();
        getCountries();
      })
      .catch((err) => console.log('failed posting', err));
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    getPhotos();
  }, [selectedCountry]);

  const handleMapClick = async (e, countryCode) => {
    e.preventDefault();
    await setCountry(countryCode);
    setOpenPosts(true);
  };

  return (
    <>
      <Header />
      <div>
        <Login setLoggedIn={(props) => console.log(props)} />
        {/* <Map mapData={mapData} handleClick={handleMapClick} />
        <Posts
          photos={photos}
          countryCode={selectedCountry}
          open={openPosts}
          close={() => setOpenPosts(false)}
          deletePost={deletePost}
          post={post}
        /> */}
      </div>
    </>
  );
}
