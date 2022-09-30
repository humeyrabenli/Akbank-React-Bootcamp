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
import { AddCategoryFormStyles } from "./AddCategoryForm.styles";

interface IAddCategoryFormProps {
  onClose: () => void;
  onAddCategory: (categoryName: string) => void
  open: boolean;
}

const AddCategoryForm = (props: IAddCategoryFormProps) => {
  const { onClose, onAddCategory, open } = props;
  const [name, setName] = React.useState("");

  const handleAddCategory = () => {
    onAddCategory(name);
    onClose();
    setName("");
  };

  const handleClose=()=>{
    onClose();
    setName("");
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Kategori Ekle</DialogTitle>
        <DialogContent>
          <FormGroup sx={AddCategoryFormStyles.formGroup}>
            <TextField
              id="outlined-name"
              label="Kategori Adı"
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleAddCategory} autoFocus>
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCategoryForm;
