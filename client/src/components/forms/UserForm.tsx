import React, { useState } from 'react';
import FormHeader from './FormHeader';
import UserIcon from '../sectionIcons/UserIcon';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import userStore from '../../store/User.store';

interface UserFormProps {
  onSubmit: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [isPlayer, setIsPlayer] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    userStore.addUser({
      name,
      isPlayer,
      isEmployee,
    });
    onSubmit();
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
          onChange={(e) => setName(e.target.value)}
          required
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
        <Button variant="contained" type="submit" disabled={!name}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
