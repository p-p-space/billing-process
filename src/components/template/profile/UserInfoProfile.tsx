'use client';

import { Avatar, Typography } from '@mui/material';

export default function UserInfoProfile() {
  return (
    <>
      <Avatar
        sx={{
          width: 80,
          height: 80,
          fontSize: 36,
          background: 'linear-gradient(60deg, rgba(104,54,197,1) 4%, rgba(129,66,245,1) 55%, rgba(104,54,197,1) 100%)',
        }}
      >
        M
      </Avatar>
      <Typography variant="h5">Mary Gisella Adams Luciane</Typography>
      <Typography variant="body2" color="primary" fontWeight={500}>
        Compliance Officer
      </Typography>
    </>
  );
}
