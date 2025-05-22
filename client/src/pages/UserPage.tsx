import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Box, Paper, TableContainer, TextField } from '@mui/material';
import BackButton from './components/BackButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import userStore, { IUser } from '../store/User.store';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmBox from '../components/ConfirmBox';
import UserIcon from '../components/sectionIcons/UserIcon';
import PageHeader from './components/PageHeader';

const UserPage: React.FC = () => {
  const [confirmNeeded, setConfirmNeeded] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Username', width: 200, editable: true },
    {
      field: 'isPlayer',
      headerName: 'Player',
      width: 120,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={() => {
            params.row.isPlayer = !params.row.isPlayer;
            userStore.updateUser(params.row.id, params.row as IUser);
          }}
        />
      ),
    },
    {
      field: 'isEmployee',
      headerName: 'Employee',
      width: 120,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={() => {
            params.row.isEmployee = !params.row.isEmployee;
            userStore.updateUser(params.row.id, params.row as IUser);
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => {
            setSelectedUserId(params.row.id);
            setConfirmNeeded(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  const rows = userStore.users;
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <BackButton />
      <PageHeader title="Users" className="user-card" icon={<UserIcon />} />
      <TableContainer component={Paper}>
        <DataGrid rows={rows} columns={columns} />
      </TableContainer>

      <ConfirmBox
        open={confirmNeeded}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onConfirm={() => {
          if (selectedUserId !== null) {
            userStore.deleteUser(selectedUserId);
          }
          setConfirmNeeded(false);
          setSelectedUserId(null);
        }}
        onCancel={() => {
          setConfirmNeeded(false);
          setSelectedUserId(null);
        }}
      />
    </Box>
  );
};

export default observer(UserPage);
