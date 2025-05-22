import { Dialog } from '@mui/material';
import React, { useState } from 'react';
import BuyInForm from '../components/forms/BuyIn.form';
import CashoutForm from '../components/forms/Cashout.form';
import DealerTipForm from '../components/forms/DealerTip.form';
import RakeForm from '../components/forms/Rake.form';
import BuyInIcon from '../components/sectionIcons/BuyInIcon';
import CashOutIcon from '../components/sectionIcons/CashOutIcon';
import DealerTipIcon from '../components/sectionIcons/DealerTipIcon';
import RakeIcon from '../components/sectionIcons/RakeIcon';
import ActionCard from '../components/ActionCard';
import UserIcon from '../components/sectionIcons/UserIcon';
import UserForm from '../components/forms/UserForm';
const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState('buyin');
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (form: string) => {
    setCurrentForm(form);
    setOpen(true);
  };
  return (
    <>
      <ActionCard
        title="Buy In"
        icon={<BuyInIcon />}
        onClick={() => handleOpen('buyin')}
      />
      <ActionCard
        title="Cash Out"
        icon={<CashOutIcon />}
        onClick={() => handleOpen('cashout')}
      />
      <ActionCard
        title="Dealer Tip"
        icon={<DealerTipIcon />}
        onClick={() => handleOpen('dealerTip')}
      />
      <ActionCard
        title="Rake"
        icon={<RakeIcon />}
        onClick={() => handleOpen('rake')}
      />
      <ActionCard
        title="User"
        icon={<UserIcon />}
        onClick={() => handleOpen('user')}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {currentForm === 'buyin' && <BuyInForm onSubmit={handleClose} />}
        {currentForm === 'cashout' && <CashoutForm onSubmit={handleClose} />}
        {currentForm === 'dealerTip' && (
          <DealerTipForm onSubmit={handleClose} />
        )}
        {currentForm === 'rake' && <RakeForm onSubmit={handleClose} />}
        {currentForm === 'user' && <UserForm onSubmit={handleClose} />}
      </Dialog>
    </>
  );
};

export default Home;
