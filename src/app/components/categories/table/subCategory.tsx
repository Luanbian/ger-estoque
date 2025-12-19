import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { SubdirectoryArrowRight } from "@mui/icons-material";
import { Category } from "../../../../features/categories/types";

interface Props {
  category: Category;
  open: boolean;
}

export const SubCategory = ({ category, open }: Props) => {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1, pl: 4 }}>
            <Typography variant="subtitle2" gutterBottom component="div">
              Subcategorias
            </Typography>
            <Table size="small">
              <TableBody>
                {category.subCategories?.map((subCategory) => (
                  <TableRow key={subCategory._id}>
                    <TableCell width={50}>
                      <SubdirectoryArrowRight fontSize="small" color="action" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {subCategory.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {subCategory.slug}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {subCategory.description || "-"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {subCategory.displayOrder}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
