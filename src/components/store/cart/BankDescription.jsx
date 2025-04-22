import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar
} from '@mui/material';

export default function BankDescription({ bank }) {
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              variant="rounded"
              src={`/banks/${bank.img}`}
              alt={bank.name}
              sx={{ width: 'auto', height: 56 }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h6" fontWeight="bold">
              {bank.name}
            </Typography>
            <Typography variant="body2">{bank.type}: {bank.number}</Typography>
            <Typography variant="body2">Titular: {bank.user}</Typography>
            <Typography variant="body2">RUC: {bank.ruc}</Typography>
            <Typography variant="body2">Email: {bank.email}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
