import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { JSX, useState } from "react";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  FolderOutlined,
  FolderOpenOutlined,
} from "@mui/icons-material";
import { Category } from "../../../../features/categories/types";
import { SubCategory } from "./subCategory";
import { IconPencil, IconPlus } from "@tabler/icons-react";
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
  const [isEditing, setIsEditing] = useState(false);

  const hasSubCategories =
    category.subCategories && category.subCategories.length > 0;

  const handleOpenModal = ({ isEditing }: { isEditing: boolean }) => {
    setIsEditing(isEditing);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const ModalComponentContent = (): JSX.Element => {
    if (isEditing) {
      return (
        <CreateOrUpdateCategory
          data={{ category }}
          actions={{ onClose: handleCloseModal }}
        />
      );
    }
    return (
      <CreateOrUpdateCategory
        data={{ fatherCategoryId: category._id }}
        actions={{ onClose: handleCloseModal }}
      />
    );
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
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleOpenModal({ isEditing: true })}
            >
              <IconPencil size={20} />
            </IconButton>
          )}
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleOpenModal({ isEditing: false })}
          >
            <IconPlus size={20} />
          </IconButton>
        </TableCell>
      </TableRow>

      {hasSubCategories && <SubCategory category={category} open={open} />}

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={<ModalComponentContent />}
      />
    </>
  );
};
