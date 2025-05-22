import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { rakeStore } from '../../store/Rake.store';
import Box from '@mui/material/Box';
import RakeIcon from '../sectionIcons/RakeIcon';
import FormHeader from './FormHeader';
interface RakeFormProps {
  onSubmit: (amount: number) => void;
}

const RakeForm: React.FC<RakeFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rakeStore.addRake(amount);
    onSubmit(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <FormHeader
        title="Rake"
        icon={<RakeIcon />}
        className="rake-card"
        href="/rakes"
      />
      <Box className="modal-content">
        <br />
        <TextField
          type="number"
          label="Rake Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <br />
        <Button variant="contained" type="submit" disabled={amount <= 0}>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default RakeForm;
