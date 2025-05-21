import { Button } from "@mui/material";
import React from "react";

const DEFAULT_DENOMINATIONS = [1, 5, 10, 20];

interface DefaultDenominationsProps {
  onChange?: (selected: number) => void;
}

export const DefaultDenominations: React.FC<DefaultDenominationsProps> = ({
  onChange,
}) => {
  const handleToggle = (value: number) => {
    onChange?.(value);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {DEFAULT_DENOMINATIONS.map((denomination) => (
          <Button
            key={denomination}
            size="small"
            type="button"
            sx={{ width: "20%" }}
            variant={"outlined"}
            onClick={() => handleToggle(denomination)}
          >
            ${denomination}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DefaultDenominations;
