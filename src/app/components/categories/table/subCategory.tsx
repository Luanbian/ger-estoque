import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { SubdirectoryArrowRight } from "@mui/icons-material";
import { Category } from "../../../../features/categories/types";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { ModalComponent } from "../../modal";
import { CreateOrUpdateSub } from "../createOrUpdateSub/sub";
import { useDispatch } from "../../../../store/hooks";
import { actions as categoryActions } from "../../../../features/categories";
import { DialogComponent } from "../../dialog";

interface Props {
  data: { category: Category; open: boolean };
  actions: {
    deleteSubCategory(fatherCategoryId: string, id: string): void;
  };
}

const SubCategoryComponent = ({ data, actions }: Props) => {
  const { category, open } = data;
  const { deleteSubCategory } = actions;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subCategoryToEdit, setSubCategoryToEdit] = useState<Category | null>(
    null
  );

  const handleOpenModal = (sub: Category) => {
    setSubCategoryToEdit(sub);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDialog = (sub: Category) => {
    setSubCategoryToEdit(sub);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, pl: 4 }}>
              <Table size="small">
                <TableBody>
                  {category.subCategories?.map((subCategory) => (
                    <TableRow key={subCategory._id}>
                      <TableCell width={50}>
                        <SubdirectoryArrowRight
                          fontSize="small"
                          color="action"
                        />
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
                      <TableCell align="center">
                        <Box>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenModal(subCategory)}
                          >
                            <IconPencil size={20} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDialog(subCategory)}
                          >
                            <IconTrash size={20} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={
          <CreateOrUpdateSub
            data={{
              category: subCategoryToEdit,
              fatherCategoryId: category._id,
            }}
            actions={{ onClose: handleCloseModal }}
          />
        }
      />

      <DialogComponent
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir esta subcategoria?"
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        confirm={() => deleteSubCategory(category._id, subCategoryToEdit!._id)}
      />
    </>
  );
};

interface SubCategoryProps {
  data: { category: Category; open: boolean };
}

export const SubCategory = ({ data }: SubCategoryProps) => {
  const dispatch = useDispatch();
  const { category, open } = data;

  const deleteSubCategory = (fatherCategoryId: string, id: string) => {
    dispatch(
      categoryActions.deleteSubCategoryRequest({ fatherCategoryId, id })
    );
  };

  return (
    <SubCategoryComponent
      data={{ category, open }}
      actions={{ deleteSubCategory }}
    />
  );
};
