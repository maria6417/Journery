/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { getCode, getName, getData } from 'country-list';
import IndividualPhotos from './IndividualPost';
import AddPost from './AddPost';

export default function Posts({
  photos, countryCode, open, close, deletePost, post,
}) {
  const [openForm, setOpenForm] = useState(false);
  const filtered = photos.filter((photo) => photo.country_code === countryCode);

  return (
    <div>
      <Dialog open={open} onClose={close} fullWidth>
        <ListSubheader sx={{ fontSize: '20px', fontWeight: '300', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '0.5px solid black' }}>
          {getName(countryCode)}
          <AddBoxOutlinedIcon sx={{ fontSize: '1.7rem' }} onClick={() => setOpenForm(true)} />
        </ListSubheader>
        <DialogContent>
          {filtered.length > 0
          && (
            <List>
              {filtered
                .map((photo) => (
                  <IndividualPhotos key={photo.id} photo={photo} deletePost={deletePost} />
                ))}
            </List>
          )}
          {filtered.length === 0
          && (
            <NoPosts className="no-posts">
              <CameraAltOutlinedIcon fontSize="large" />
              <Text>No Posts Yet</Text>
            </NoPosts>
          )}
        </DialogContent>
      </Dialog>
      {openForm && (
        <AddPost open={openForm} setOpen={setOpenForm} post={post} />
      )}
    </div>

  );
}

const NoPosts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 300;
`;