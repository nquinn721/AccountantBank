import { Box, Button, styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface FormHeaderProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  href: string;
}
const RouteToPageButton = styled(Button)({
  backgroundColor: '#333',
  color: '#999',
  '&:hover': {
    backgroundColor: '#555',
    color: '#fff',
  },
});

const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  icon,
  className,
  href,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      className={`modal-header ${className}`}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {icon} &nbsp; {title}
      </Box>
      <Box>
        <RouteToPageButton
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigate(href)}
        >
          Go to page
        </RouteToPageButton>
      </Box>
    </Box>
  );
};

export default FormHeader;
