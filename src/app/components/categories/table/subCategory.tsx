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
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { ModalComponent } from "../../modal";
import { CreateOrUpdateSub } from "../createOrUpdateSub/sub";

interface Props {
  data: { category: Category; open: boolean };
}

const SubCategoryComponent = ({ data }: Props) => {
  const { category, open } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
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
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenModal(subCategory)}
                        >
                          <IconPencil size={20} />
                        </IconButton>
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
    </>
  );
};

interface SubCategoryProps {
  data: { category: Category; open: boolean };
}

export const SubCategory = ({ data }: SubCategoryProps) => {
  const { category, open } = data;

  return <SubCategoryComponent data={{ category, open }} />;
};
