/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Dialog from '@mui/material/Dialog';
import Map from './Map';
import Posts from './Posts';
import Header from './Header';
import Login from './Login';
import { checkSession } from '../lib/sessions';

export default function App() {
  const [mapData, setMapData] = useState({ US: 0 });
  const [photos, setPhotos] = useState([]);
  const [openPosts, setOpenPosts] = useState(false);
  const [selectedCountry, setCountry] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['session']);
  // country code + number of pics
  const getPhotos = () => {
    const config = {
      method: 'GET',
      url: '/photos',
      params: {
        user_id: loggedIn.id,
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
      params: { user_id: loggedIn.id },
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
        user_id: loggedIn.id,
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

  const edit = (data) => {
    const config = {
      method: 'PUT',
      url: '/photos',
      data,
    };

    axios(config)
      .then(() => getPhotos())
      .catch((err) => console.log('error updating photo', err));
  };

  const signOut = () => {
    // reset cookies,
    // set loggin false
    const conf = confirm('Sign out?');
    if (conf) {
      setLoggedIn(false);
      removeCookie('session');
    }
  };

  useEffect(() => {
    if (cookies.session) {
      checkSession(cookies.session)
        .then((result) => {
          if (result.data.length) setLoggedIn(result.data[0]);
        })
        .catch((err) => console.log('error checking cookies', err));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) getCountries();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) getPhotos();
  }, [selectedCountry]);

  const handleMapClick = async (e, countryCode) => {
    e.preventDefault();
    await setCountry(countryCode);
    setOpenPosts(true);
  };

  return (
    <>
      <Header user={loggedIn} signOut={signOut} />
      <div>
        {loggedIn && (
          <>
            <Map mapData={mapData} handleClick={handleMapClick} />
            <Posts
              photos={photos}
              countryCode={selectedCountry}
              open={openPosts}
              close={() => setOpenPosts(false)}
              deletePost={deletePost}
              post={post}
              edit={edit}
            />
          </>
        )}
        {!loggedIn && (
          <Login setLoggedIn={setLoggedIn} />
        )}
      </div>
    </>
  );
}
