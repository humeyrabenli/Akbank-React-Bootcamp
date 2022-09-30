import { Box, Typography, Button, Grid } from "@mui/material";
import { ICategories } from "../../App";
import React, { useState } from "react";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";
import { CategoryListStyles } from "./CategoryList.styles";
import CategoryTable from "../CategoryTable/CategoryTable";

interface ICategoryListProps {
  categories: ICategories[];
  onAddCategory: (categoryName: string) => void;
  deleteCategory: (category: ICategories) => void;
  editCategoryAndStatus: (newCategory: any, deletedStatus: any) => void;
}

const CategoryList = (props: ICategoryListProps) => {
  const { categories, onAddCategory, deleteCategory, editCategoryAndStatus } =
    props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Box sx={CategoryListStyles.box}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography variant="h6">Kategoriler</Typography>
            </Grid>
            <Grid item xs={3}>
              <Button
                sx={CategoryListStyles.addButton}
                variant="outlined"
                onClick={() => setOpen(true)}
              >
                Ekle
              </Button>
            </Grid>
          </Grid>
        </Box>

        <AddCategoryForm
          onClose={handleClose}
          open={open}
          onAddCategory={onAddCategory}
        />
        {categories.length !== 0 && (
          <CategoryTable
            categories={categories}
            deleteCategory={deleteCategory}
            editCategoryAndStatus={editCategoryAndStatus}
          />
        )}
      </Box>
    </>
  );
};

export default CategoryList;
