import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ListSubheader from '@mui/material/ListSubheader';
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import UploadButton from './subComponents/UploadButton';
import uploadPhoto from '../lib/uploadPhoto';
import { FormattedImg } from '../Styled';

export default function AddPost({ open, setOpen, post }) {
  const [formValue, setFormValue] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  const onChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // convert image file to base64 string
      setImagePreview(reader.result);
      // const url = await uploadPhoto(reader.result);
    }, false);

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleClick = (e) => {
    uploadPhoto(imagePreview)
      .then((url) => {
        post({
          url,
          description: formValue.description,
          visit_date: formValue.visit_date,
        });
        setOpen(false);
      })
      .catch((err) => console.log('error posting', err));
  };

  return (
    <Dialog open={open} fullWidth>
      <ListSubheader sx={{ fontSize: '20px', fontWeight: '300', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '0.5px solid black' }}>
        Create New Post
      </ListSubheader>
      <DialogContent>
        <Flex>
          <FormItem>
            <InputLabel sx={{ display: 'flex', flexDirection: 'column' }}>
              Upload Your Photo
              <UploadButton change={handleFileChange} name="file" style={{ width: '100vh' }} />
              {imagePreview && (
                <FormItem>
                  <FormattedImg src={imagePreview} alt="preview" />
                </FormItem>
              )}
            </InputLabel>
          </FormItem>
          <FormItem>
            <InputLabel sx={{ display: 'flex', flexDirection: 'column' }}>
              Description
              <TextField name="description" onChange={onChange} fullWidth placeholder="describe this picture..." />
            </InputLabel>
          </FormItem>
          <FormItem>
            <InputLabel sx={{ display: 'flex', flexDirection: 'column' }}>
              When did you visit this place?
              <Input type="date" name="visit_date" onChange={onChange} />
            </InputLabel>
          </FormItem>
        </Flex>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleClick}>Create</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormItem = styled.div`
  padding: 10px 0;
`;