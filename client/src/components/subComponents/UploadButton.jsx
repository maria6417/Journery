/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function UploadButton({ name, change }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" type="file" onChange={change} name={name} />
      </Button>
    </Stack>
  );
}
