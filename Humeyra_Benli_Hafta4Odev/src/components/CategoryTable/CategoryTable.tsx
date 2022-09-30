import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { CategoryItem } from "./CategoryItem";
import { ICategories } from "../../App";

interface CategoryTableProps {
  categories: ICategories[];
  deleteCategory: (category: ICategories) => void;
  editCategoryAndStatus: (newCategory: any, deletedStatus: any) => void;
}

export default function CategoryTable(props: CategoryTableProps) {
  const {categories,deleteCategory,editCategoryAndStatus}=props;
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {categories.map((row) => (
            <CategoryItem
              key={row.id}
              row={row}
              deleteCategory={deleteCategory}
              editCategoryAndStatus={editCategoryAndStatus}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
