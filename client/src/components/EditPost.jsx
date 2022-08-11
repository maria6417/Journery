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
import { FormattedImg } from '../Styled';

export default function EditPost({ open, setOpen, edit, data }) {
  const [formValue, setFormValue] = useState(data);

  const onChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    edit(formValue);
    setOpen(false);
  };

  return (
    <Dialog open={open} fullWidth>
      <ListSubheader sx={{ fontSize: '20px', fontWeight: '300', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '0.5px solid black' }}>
        Edit
      </ListSubheader>
      <DialogContent>
        <Flex>
          <FormItem>
            <InputLabel sx={{ display: 'flex', flexDirection: 'column' }}>
              Your Photo
              <FormItem>
                <FormattedImg src={data.url} alt="preview" />
              </FormItem>
            </InputLabel>
          </FormItem>
          <FormItem>
            <InputLabel sx={{ display: 'flex', flexDirection: 'column' }}>
              Description
              <TextField name="description" onChange={onChange} fullWidth placeholder="describe this picture..." value={formValue.description} />
            </InputLabel>
          </FormItem>
          <FormItem>
            <InputLabel sx={{ display: 'flex', flexDirection: 'column' }}>
              When did you visit this place?
              <Input type="date" name="visit_date" onChange={onChange} value={formValue.visit_date} />
            </InputLabel>
          </FormItem>
        </Flex>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleClick}>Edit</Button>
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