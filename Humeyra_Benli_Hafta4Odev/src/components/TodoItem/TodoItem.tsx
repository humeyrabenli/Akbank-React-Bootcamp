import React, { useEffect, useState } from "react";
import { ICategories, ITodoList } from "../../App";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { MenuItem, TextField, Button } from "@mui/material";

interface TodoItemProps {
  categories: ICategories[];
  changeStatus: (todoID: string, status: string) => void;
  deleteTodo: (todoID: string) => void;
  todoItem: ITodoList;
}

function TodoItem(props: TodoItemProps) {
  const { categories, changeStatus, deleteTodo, todoItem } = props;

  const category = categories.find(
    (category) => category.id === todoItem.categoryId
  );

  useEffect(() => {
    if (category !== undefined) {
      setStatus(
        category.categoryStatus.find((item) => todoItem.status === item.id)
      );
    }
  }, [categories]);

  const [status, setStatus] = useState(
    category !== undefined &&
      category.categoryStatus.find((item) => todoItem.status === item.id)
  );
  const background = status ? status.color : "white";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(
      category !== undefined &&
        category.categoryStatus.find(
          (item: any) => event.target.value === item.id
        )
    );
    changeStatus(todoItem.id, event.target.value);
  };

  const handleClick = () => {
    if (
      window.confirm(
        `Todo: ${todoItem.todo}\nSilmek istediğinizden emin misiniz?`
      )
    )
      deleteTodo(todoItem.id);
  };

  return (
    <>
      <ListItem style={{ backgroundColor: background, alignItems: "center" }}>
        <ListItemText primary={todoItem.todo} />
        <span>
          {category !== undefined && category.categoryStatus.length > 0 && (
            <TextField
              select
              size="small"
              label="Durum"
              value={todoItem.status}
              onChange={handleChange}
              sx={{ mr: 2 }}
              helperText="Durum"
            >
              <MenuItem value={""}>Durum seç</MenuItem>

              {category.categoryStatus.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.statusName}
                </MenuItem>
              ))}
            </TextField>
          )}
          <Button onClick={handleClick} variant="contained">
            Sil
          </Button>
        </span>
      </ListItem>
    </>
  );
}

export default TodoItem;
