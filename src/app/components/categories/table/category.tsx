import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  FolderOutlined,
  FolderOpenOutlined,
} from "@mui/icons-material";
import { Category } from "../../../../features/categories/types";
import { SubCategory } from "./subCategory";
import { IconPencil } from "@tabler/icons-react";
import { ModalComponent } from "../../modal";
import { CreateOrUpdateCategory } from "../createOrUpdate/category";

interface Props {
  data: {
    category: Category;
  };
}

export const CategoryRow = ({ data }: Props) => {
  const { category } = data;

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasSubCategories =
    category.subCategories && category.subCategories.length > 0;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {hasSubCategories && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          )}
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {open ? (
              <FolderOpenOutlined color="action" />
            ) : (
              <FolderOutlined color="action" />
            )}
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {category.name}
              </Typography>
              {hasSubCategories && (
                <Typography variant="caption" color="text.secondary">
                  {category.subCategories?.length} subcategoria(s)
                </Typography>
              )}
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="body2" color="text.secondary">
            {category.slug}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" color="text.secondary">
            {category.description || "-"}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2" fontWeight={500}>
            {category.displayOrder}
          </Typography>
        </TableCell>
        <TableCell align="center">
          {!category.subCategories && (
            <IconButton size="small" color="primary" onClick={handleOpenModal}>
              <IconPencil size={16} />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      {hasSubCategories && <SubCategory category={category} open={open} />}

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={
          <CreateOrUpdateCategory
            actions={{ onClose: handleCloseModal }}
            data={{ category }}
          />
        }
      />
    </>
  );
};
