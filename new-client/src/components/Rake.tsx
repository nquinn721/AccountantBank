import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Grid,
  List,
  ListItemText,
  TextField,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import { rakeStore } from '../store/Rake.store';
import ConfirmBox from './ConfirmBox';

const Rake: React.FC = () => {
  const [amount, setAmount] = React.useState<number>(0);
  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      sx={{
        background: '#222',
        p: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box mb={2}>
        <ListItemText
          primary="Rake"
          primaryTypographyProps={{ variant: 'h5', sx: { color: '#fff' } }}
        />
        <ListItemText
          secondary={`Total Rakes: $${rakeStore.totalAmount}`}
          secondaryTypographyProps={{ sx: { color: '#fff' } }}
        />
      </Box>
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 2,
          paddingY: 2,
          paddingX: 2,
          height: '100%',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgb(24, 24, 24)',
            gap: 2,
            padding: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <TextField
              label="Rake Amount"
              value={amount || ''}
              size="small"
              sx={{ flexGrow: 1, mr: 1 }}
              onChange={(e) =>
                setAmount(e.target.value === '' ? 0 : Number(e.target.value))
              }
            />
            <Button
              variant="contained"
              disabled={amount === null || amount <= 0}
              onClick={() => {
                if (amount) setShowConfirm(true);
              }}
            >
              <AddIcon />
            </Button>
          </Box>
        </Box>
        <List>
          {rakeStore.rakes.map((rake) => (
            <Box
              key={rake.id}
              sx={{
                backgroundColor: '#333',
                color: '#aaa',
                padding: 1,
                display: 'flex',
                justifyContent: 'space-between',
                borderRadius: 1,
                marginBottom: 1,
              }}
            >
              <ListItemText secondary={`$${rake.amount}`} />
              <ListItemText
                primary={moment(rake.date).fromNow()}
                secondary={moment(rake.date).format('h:mm MM/DD/YYYY')}
              />
            </Box>
          ))}
        </List>
        <ConfirmBox
          open={showConfirm}
          title="Add Rake?"
          message={`Add rake $${amount} '}?`}
          onConfirm={() => {
            rakeStore.addRake(amount);
            setShowConfirm(false);
            setAmount(0);
          }}
          onCancel={() => {
            setAmount(0);
            setShowConfirm(false);
          }}
        />
      </Box>
    </Grid>
  );
};

export default Rake;
