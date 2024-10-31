'use client';

import { Card, CardHeader, Typography, IconButton, Divider, CardContent, Link } from '@mui/material';

export default function CardPurchase() {
  return (
    <Card sx={{ width: 325, pb: 0 }}>
      <CardHeader
        title={<Link color="inherit">Company test 1 (abcdef)</Link>}
        subheader={
          <>
            <Typography>12/05/2024</Typography>
            <Typography color="success.light" fontWeight={700}>
              Aprove
            </Typography>
          </>
        }
        action={
          <IconButton aria-label="settings" sx={{ m: 'auto' }}>
            <i className="ri-more-2-fill"></i>
          </IconButton>
        }
      />
      <Divider sx={{ mt: 2 }} />
      <CardContent>
        <Typography component="span" fontSize={24}>
          <i className="ri-money-dollar-circle-line"></i>
        </Typography>
        <Typography fontWeight={500}>200.000.000</Typography>
      </CardContent>
    </Card>
  );
}
