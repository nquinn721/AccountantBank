import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import userStore from '../../store/User.store';
import ConfirmBox from '../ConfirmBox';
import UserIcon from '../sectionIcons/UserIcon';
import FormHeader from './FormHeader';

interface UserFormProps {
  onSubmit: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [isPlayer, setIsPlayer] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [error, setError] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setError(!userStore.hasUser(value));

    setName(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    userStore.addUser({
      name,
      isPlayer,
      isEmployee,
    });
    setShowConfirm(false);
    onSubmit();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <FormHeader
        title="User"
        className="user-card"
        icon={<UserIcon />}
        href="users"
      />
      <div className="modal-content">
        <TextField
          placeholder="Name"
          value={name}
          variant="outlined"
          onChange={updateName}
          required
          error={!error}
          helperText={!error ? 'User already exists' : ''}
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={isPlayer}
              onChange={(e) => setIsPlayer(e.target.checked)}
            />
          }
          label="Is Player"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isEmployee}
              onChange={(e) => setIsEmployee(e.target.checked)}
            />
          }
          label="Is Employee"
        />
        <br />
        <ConfirmBox
          open={showConfirm}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          title="Confirm User"
          message={
            <Box>
              Are you sure you want to add {name} as a user?
              <Box>Is Player: {isPlayer ? 'Yes' : 'No'}</Box>
              <Box>Is Employee: {isEmployee ? 'Yes' : 'No'}</Box>
            </Box>
          }
        />
        <Button variant="contained" type="submit" disabled={!name || !error}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
