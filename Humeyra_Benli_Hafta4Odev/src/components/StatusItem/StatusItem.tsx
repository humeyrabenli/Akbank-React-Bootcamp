import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  MenuItem,
  TextField,
  Paper,
} from "@mui/material";
import { StatusItemStyles } from "./StatusItem.styles";
import { IStatus } from "../../App";

interface StatusItemProps {
  status: any;
  handleCategoryStatusChange: (status: IStatus) => void;
  handleDeleteStatus: (statusID: string) => void;
}

const StatusItem = (props: StatusItemProps) => {
  const {status,handleCategoryStatusChange,handleDeleteStatus}=props;

  const colors = ["blue", "yellow", "red", "green", "purple"];

  const [itemStatus, setItemStatus] = useState({ ...status });

  const handleStatusNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemStatus({ ...itemStatus, status: event.target.value });
    handleCategoryStatusChange({ ...itemStatus, status: event.target.value });
  };

  const handleStatusColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemStatus({ ...itemStatus, color: event.target.value });
    handleCategoryStatusChange({ ...itemStatus, color: event.target.value });
  };

  const handleClick = () => {
    handleDeleteStatus(itemStatus.id);
  };

  return (
    <Paper style={StatusItemStyles.paper}>
      <TextField
        id="outlined-name"
        label="Durum"
        value={itemStatus.statusName}
        onChange={handleStatusNameChange}
        size="small"
      />

      <TextField
        id="outlined-select-currency"
        select
        size="small"
        label="Kategori"
        value={itemStatus.color}
        onChange={handleStatusColorChange}
        sx={{ mx: 1 }}
      >
        {colors.map((option, index) => (
          <MenuItem key={index} value={option} sx={{ backgroundColor: option }}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={handleClick}>
        Sil
      </Button>
    </Paper>
  );
};

export default StatusItem;
