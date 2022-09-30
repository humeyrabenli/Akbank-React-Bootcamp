import {
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { ICategories } from "../../App";
import { AddTodoFormStyles } from "./AddTodoForm.styles";

type AddTodoFormProps = {
  categories: ICategories[];
  addTodo: (todo: string, category: string) => void;
};

const AddTodoForm = (props: AddTodoFormProps) => {
  const { categories, addTodo } = props;

  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleClick = () => {
    if (!todo || !category) {
      let warning = "";
      if (!todo) warning += "Todo giriniz.";
      if (!category)
        warning += "\nKategori seçiniz ya da kategori ekleyiniz.";
      alert(warning);
    } else {
      addTodo(todo, category);
      setTodo("");
      setCategory("");
    }
  };
  return (
    <>
      <TextField
        id="outlined-name"
        label="Todo"
        value={todo}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTodo(event.target.value)
        }
        size="small"
      />

      <TextField
        select
        size="small"
        label="Kategori"
        value={category}
        onChange={handleCategoryChange}
        helperText="Kategori Seçiniz"
        sx={{ ml: 1 }}
      >
        {categories !== undefined &&
          categories.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.categoryName}
            </MenuItem>
          ))}
      </TextField>
      <Button className="AddTodoButton" onClick={handleClick}>
        Ekle
      </Button>
    </>
  );
};

export default AddTodoForm;
