import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { AddStatusFormStyles } from "./AddStatusForm.styles";

interface IAddStatusFormProps {
  onClose: () => void;
  onAddStatus: (status: string) => void;
  open: boolean;
}

const AddStatusForm = (props: IAddStatusFormProps) => {
  const { onClose, onAddStatus, open } = props;

  const [status, setStatus] = React.useState("");

  const handleAddStatus = () => {
    onAddStatus(status);
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle id="alert-dialog-title">Durum Ekle</DialogTitle>
        <DialogContent>
          <FormGroup sx={AddStatusFormStyles.formGroup}>
            <TextField
              label="Durum"
              value={status}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setStatus(event.target.value)
              }
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>İptal</Button>
          <Button onClick={handleAddStatus} autoFocus>
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddStatusForm;
