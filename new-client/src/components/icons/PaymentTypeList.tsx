import { LocalAtm } from '@mui/icons-material';
import { MenuItem, styled, TextField } from '@mui/material';
import React from 'react';
import { CashAppIcon } from './CashAppIcon';
import { PayPalIcon } from './PayPalIcon';
import { VenmoIcon } from './VenmoIcon';
import { ZelleIcon } from './ZelleIcon';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiSelect-icon': {
    marginLeft: theme.spacing(1),
  },
}));
type PaymentTypeListProps = {
  onSelect: (id: string) => void;
};

const PaymentTypeList: React.FC<PaymentTypeListProps> = ({ onSelect }) => {
  const [paymentType, setPaymentType] = React.useState<string | null>('cash');
  return (
    <CustomTextField
      select
      sx={{ display: 'flex', width: '100%' }}
      onChange={(e) => {
        setPaymentType(e.target.value);
        onSelect(e.target.value);
      }}
      label="Payment Method"
      value={paymentType}
      required
    >
      <MenuItem value={'cash'}>
        <LocalAtm />
        Cash
      </MenuItem>
      <MenuItem value={'zelle'}>
        <ZelleIcon />
        Zelle
      </MenuItem>
      <MenuItem value={'paypal'}>
        <PayPalIcon />
        PayPal
      </MenuItem>
      <MenuItem value={'venmo'}>
        <VenmoIcon />
        Venmo
      </MenuItem>
      <MenuItem value={'cashapp'}>
        <CashAppIcon />
        Cash App
      </MenuItem>
    </CustomTextField>
  );
};

export default PaymentTypeList;
