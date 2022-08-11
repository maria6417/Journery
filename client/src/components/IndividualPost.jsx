/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FormattedImg } from '../Styled';
import EditPost from './EditPost';

export default function IndividualPost({ photo, deletePost, edit }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openOptions, setOpenOptions] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenOptions(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenOptions(false);
  };

  const handleDelete = () => {
    const conf = confirm('Do you want to delete the post?');
    if (conf) {
      deletePost(photo.id);
    }
    handleClose();
  };

  const handleEdit = () => {
    setEditOpen(true);
    handleClose();
  };

  return (
    <>
      <ListItem sx={{ flexDirection: 'column', margin: '2% 0' }}>
        <MoreHorizIcon sx={{ float: 'right', paddingRight: '1%' }} onClick={handleClick} />
        <Menu open={openOptions} anchorEl={anchorEl} onClose={handleClose}>
          <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
          <MenuItem onClick={handleEdit}>Edit Post</MenuItem>
        </Menu>
        <FormattedImg src={photo.url} alt={photo.description} />
        <Text className="photo-description" fontSize="medium">{photo.description}</Text>
        {photo.visit_date && (
          <Text fontSize="x-small">
            {photo.visit_date}
          </Text>
        )}
      </ListItem>
      <EditPost open={editOpen} setOpen={setEditOpen} edit={edit} data={photo} />
    </>
  );
}

const Text = styled.div`
  margin: 1% 2%;
  font-size: ${(props) => props.fontSize? props.fontSize : '15px'};
`;

const ListItem = styled.li`
  flex-direction: column;
  margin-bottom: 2%;
`;