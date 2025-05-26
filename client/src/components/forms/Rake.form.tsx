import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import rakeStore from '../../store/Rake.store';
import ConfirmBox from '../ConfirmBox';
import RakeIcon from '../sectionIcons/RakeIcon';
import FormHeader from './FormHeader';
interface RakeFormProps {
  onSubmit: (amount: number) => void;
}

const RakeForm: React.FC<RakeFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    rakeStore.addRake(amount);
    onSubmit(amount);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
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
        <ConfirmBox
          open={showConfirm}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          title="Confirm Rake"
          message={
            <Box>
              Are you sure you want to add a rake of <b>${amount}</b>?
            </Box>
          }
        />
        <Button variant="contained" type="submit" disabled={amount <= 0}>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default RakeForm;
