import React from 'react';
import Card from '@mui/material/Card';

interface ActionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactElement<any>;
  onClick?: () => void;
  disabled?: boolean;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  icon,
  onClick,
  disabled = false,
}) => {
  const renderedIcon = icon
    ? React.cloneElement(icon, {
        style: {
          position: 'absolute',
          top: 30,
          left: 30,
          fontSize: 150,
          opacity: 0.1,
          ...(icon.props?.style || {}),
        },
      })
    : null;

  return (
    <Card
      onClick={onClick}
      className={` ${title.toLowerCase().replace(' ', '-')}-card card`}
    >
      {renderedIcon}

      <div>{title}</div>
    </Card>
  );
};

export default ActionCard;
