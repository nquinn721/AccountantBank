import { Box } from '@mui/material';
import React from 'react';

interface PageHeaderProps {
  title: string;
  className?: string;
  icon?: React.ReactElement<any>;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, className, icon }) => {
  const renderedIcon = icon
    ? React.cloneElement(icon, {
        style: {
          position: 'absolute',
          top: 5,
          left: 5,
          fontSize: 80,
          opacity: 0.1,
          ...(icon.props?.style || {}),
        },
      })
    : null;

  return (
    <Box
      className={className}
      sx={{
        p: 2,
        paddingX: 5,
        paddingTop: 5,
        marginBottom: 2,
        fontSize: '30px',
        fontWeight: 'bold',
        position: 'relative',
      }}
    >
      {renderedIcon}
      <Box>{title}</Box>
    </Box>
  );
};

export default PageHeader;
