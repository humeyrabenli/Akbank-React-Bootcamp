import React, { useState } from "react";
import { ICategories, ITodoList } from "../../App";
import TodoItem from "../TodoItem/TodoItem";
import {
  Box,
  TextField,
  DialogActions,
  MenuItem,
} from "@mui/material";
import { TodoListStyles } from "./TodoList.styles";

interface TodoListProps {
  categories: ICategories[];
  todos: ITodoList[];
  changeStatus: (todoID: string, status: string) => void
  deleteTodo: (todoID: string) => void
}

const TodoList = (props: TodoListProps) => {
  const { categories, todos, changeStatus, deleteTodo } = props;

  
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  let filteredTodos : Array<ITodoList>=[];


  if (filterCategory !== "") {
    if (filterStatus !== "")
    filteredTodos = todos
        .filter((todo) => todo.categoryId === filterCategory)
        .filter((todo) => todo.status === filterStatus);
    else {
      filteredTodos = todos.filter((todo) => todo.categoryId === filterCategory);
    }
  } else {
    filteredTodos = [...todos];
  }

  const handleChangeCategory = (e: any) => {
    setFilterCategory(e.target.value);
    setFilterStatus("");
  };

  const handleChangeStatus = (e: any) => {
    setFilterStatus(e.target.value);
  };

  const filteredCategory = categories.find(
    (category) => category.id === filterCategory
  );

  console.log("filtered category", categories);

  return (
    <Box sx={TodoListStyles.todoList}>
     
      <div>
        <TextField
          select
          size="small"
          label="Kategori"
          value={filterCategory}
          onChange={handleChangeCategory}
          sx={TodoListStyles.textField}
          helperText="Kategoriye göre filtre"
        >
          <MenuItem value={""}>Kategori seç</MenuItem>

          {categories !== undefined &&
            categories.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.categoryName}
              </MenuItem>
            ))}
        </TextField>
     

        <TextField
          select
          size="small"
          label="Durum"
          value={filterStatus}
          onChange={handleChangeStatus}
          sx={TodoListStyles.textField}
          helperText="Duruma göre filtre"
        >
          <MenuItem value={""}>Durum seç</MenuItem>

          {filterCategory &&
            filteredCategory !== undefined &&
            filteredCategory.categoryStatus.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.statusName}
              </MenuItem>
            ))}
        </TextField>
      </div>

      <br />
      <Box>
        {filteredTodos.map((todo) => (
          <TodoItem
            deleteTodo={deleteTodo}
            changeStatus={changeStatus}
            key={todo.id}
            categories={categories}
            todoItem={todo}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TodoList;
