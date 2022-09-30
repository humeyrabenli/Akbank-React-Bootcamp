import React, { useState } from "react";
import logo from "./logo.svg";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  MenuItem,
  TextField,
} from "@mui/material";
import "./App.css";
import CategoryList from "./components/CategoryList/CategoryList";
import { v4 as uuid } from "uuid";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import TodoList from "./components/TodoList/TodoList";
import { AddTodoFormStyles } from "./components/AddTodoForm/AddTodoForm.styles";
import { CategoryListStyles } from "./components/CategoryList/CategoryList.styles";

export interface IStatus {
  id: string;
  statusName: string;
  color: string;
}

export interface ICategories {
  id: string;
  categoryName: string;
  categoryStatus: IStatus[];
}

export interface ITodoList {
  id: string;
  todo: string;
  categoryId: string;
  status: string;
}

function App() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [todoList, setTodoList] = useState<ITodoList[]>([]);
  const [editCategory, setEditCategory] = useState("");

  const addCategory = (categoryName: string) => {
    setCategories((prev) => [
      ...prev,
      {
        id: uuid(),
        categoryName,
        categoryStatus: [],
      },
    ]);
  };
 console.log("hello",categories)
  const deleteCategory = (category: ICategories) => {
    if (
      window.confirm(
        `Kategoriye ait todolar silinecek.\nKategoriyi silmek istediğinizden emin misiniz?`
      )
    ) {
      setCategories(
        categories.filter((category) => category.id !== category.id)
      );
      setTodoList(todoList.filter((todo) => todo.categoryId !== category.id));
    }
  };

  const addTodo = (todo: string, category: string) => {
    setTodoList([
      ...todoList,
      { id: uuid(), todo: todo, categoryId: category, status: "0" },
    ]);
  };

  const deleteTodo = (todoID: string) => {
    setTodoList(todoList.filter((todo) => todo.id !== todoID));
  };

  const changeStatus = (todoID: string, status: string) => {
    const todo = todoList.find((todo) => todo.id === todoID);
    if (todo?.status !== undefined) {
      todo.status = status;
    }
  };

  const editCategoryAndStatus = (newCategory: any, deletedStatus: any) => {
    console.log("edit", newCategory, deletedStatus);
    console.log("kedi", editCategory);
    const oldCategory = categories.find(
      (category) => category.id === editCategory
    );
    console.log("edit", oldCategory);

    deletedStatus.forEach((deletedStatus: any) => {
      //@ts-ignore
      let indexOfDeleted = oldCategory?.categoryStatus.findIndex(
        (status: any) => status.id === deletedStatus
      );
      todoList.forEach((todo) => {
        if (
          todo.categoryId === editCategory &&
          todo.status === deletedStatus &&
          //@ts-ignore
          oldCategory?.categoryStatus[indexOfDeleted + 1]
        ) {
          //@ts-ignore
          todo.status = oldCategory.categoryStatus[indexOfDeleted + 1].id;
        }
      });
    });

    setCategories(
      categories.map((category) =>
        category.id === newCategory.id ? newCategory : category
      )
    );
  };

  return (
    <div className="App">
      <Card sx={CategoryListStyles.categoryList}>
        <CardContent>
          <CategoryList
            categories={categories}
            onAddCategory={addCategory}
            deleteCategory={deleteCategory}
            editCategoryAndStatus={editCategoryAndStatus}
          />
        </CardContent>
      </Card>
      <Card sx={AddTodoFormStyles.todoForm}>
        <CardContent>
          <AddTodoForm categories={categories} addTodo={addTodo} />
          <TodoList
            categories={categories}
            todos={todoList}
            changeStatus={changeStatus}
            deleteTodo={deleteTodo}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
