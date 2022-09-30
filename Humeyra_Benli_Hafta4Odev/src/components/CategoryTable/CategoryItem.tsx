import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "@mui/material";
import AddStatusForm from "../AddStatusForm/AddStatusForm";
import { v4 as uuid } from "uuid";
import StatusItem from "../StatusItem/StatusItem";
import { ICategories } from "../../App";
import { CategoryItemStyles } from "./CategoryItem.styles";

export function CategoryItem(props: {
  row: ICategories;
  deleteCategory: (category: ICategories) => void;
  editCategoryAndStatus: (newCategory: any, deletedStatus: any) => void;
}) {
  const { row, deleteCategory, editCategoryAndStatus } = props;
  const [open, setOpen] = React.useState(false);
  const [openStatusForm, setOpenStatusForm] = React.useState(false);
  const [deletedStatus, setDeletedStatus] = React.useState<any>([]);

  const [category, setCategory] = React.useState<any>({});

  const handleClose = () => {
    setOpenStatusForm(false);
  };

  const handleEditClick = () => {
    setOpen(!open);
    setCategory(row);
  };

  const handleDelete = () => {
    deleteCategory(row);
  };

  const handleCategoryNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategory({ ...category, categoryName: event.target.value });
  };

  const addStatus = (status: string) => {
    const newStatus = { id: uuid(), statusName: status, color: "" };
    setCategory({
      ...category,
      categoryStatus: [...category.categoryStatus, newStatus],
    });
  };

  const handleEdit = () => {
    editCategoryAndStatus(category, deletedStatus);
    setOpen(!open);
  };

  const handleDeleteStatus = (statusID: string) => {
    console.log("statuId", statusID);
    const statusList = category.categoryStatus.filter(
      (status: any) => status.id !== statusID
    );
    setDeletedStatus([...deletedStatus, statusID]);
    setCategory({ ...category, categoryStatus: statusList });
  };

  const handleCategoryStatusChange = (status: any) => {
    const statusList = category.categoryStatus.map((item: any) => {
      if (item.id === status.id) {
        item.status = status.status;
        item.color = status.color;
      }
      return item;
    });
    setCategory({ ...category, categoryStatus: statusList });
  };

  return (
    <React.Fragment>
      <TableRow sx={CategoryItemStyles.tableRow}>
        <TableCell component="th" scope="row">
          {row.categoryName}
        </TableCell>
        <TableCell sx={CategoryItemStyles.tableCellEdit}>
          <IconButton size="small" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell sx={CategoryItemStyles.tableCellDelete}>
          <IconButton size="small" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={CategoryItemStyles.tableCell} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={CategoryItemStyles.categoryBox}>
              <TextField
                id="outlined-name"
                label="Kategori"
                value={category.categoryName}
                onChange={handleCategoryNameChange}
                size="small"
              />
              <Button
                variant="contained"
                size="small"
                sx={CategoryItemStyles.statusButton}
                onClick={() => setOpenStatusForm(true)}
              >
                Durum Ekle
              </Button>
              <AddStatusForm
                onClose={handleClose}
                open={openStatusForm}
                onAddStatus={addStatus}
              />
            </Box>
            <Box sx={CategoryItemStyles.categoryBox}>
              {open &&
                category.categoryStatus.map((status: any) => (
                  <StatusItem
                    key={status.id}
                    status={status}
                    handleCategoryStatusChange={handleCategoryStatusChange}
                    handleDeleteStatus={handleDeleteStatus}
                  />
                ))}
            </Box>
            <Button onClick={handleEdit}>Kaydet</Button>
            <Button onClick={() => setOpen(!open)}>İptal</Button>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
