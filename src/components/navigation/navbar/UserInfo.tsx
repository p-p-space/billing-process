'use client';

import { Avatar, Box, Typography } from '@mui/material';

export default function UserInfo() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Avatar>M</Avatar>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Typography variant="h6" fontWeight={500} color="white">
          Mary Adams
        </Typography>
        <Typography variant="caption" color="white">
          Complicer Officer
        </Typography>
      </Box>
    </Box>
  );
}
