import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AddNewUser: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [paymentType, setPaymentType] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !paymentType) return;
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add New User
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Add New User
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              margin="normal"
            />

            <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Add User
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddNewUser;
