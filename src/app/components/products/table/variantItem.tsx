import { useState } from "react";
import {
  Box,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Product } from "../../../../features/products/types";
import { getStatusChip } from "../../../../utils/getStockStatus";
import { Category } from "../../../../features/categories/types";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { ModalComponent } from "../../modal";
import { CreateOrUpdateVariant } from "../createOrUpdateVariant/variant";
import { useDispatch } from "../../../../store/hooks";
import { actions as productActions } from "../../../../features/products";
import { DialogComponent } from "../../dialog";

interface Props {
  data: {
    variant: Product;
    category?: Category;
  };
  actions: {
    deleteVariant(data: { productId: string; variantId: string }): void;
  };
}

const ProductVariantItemComponent = ({ data, actions }: Props) => {
  const { variant, category } = data;
  const { deleteVariant } = actions;
  const { label, color } = getStatusChip(variant.stockStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
      <TableRow key={variant._id} hover>
        <TableCell sx={{ width: "23%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "action.disabled",
              }}
            />
            <Typography variant="body2">{variant.name}</Typography>
          </Box>
        </TableCell>
        <TableCell align="left" sx={{ width: "18%" }}>
          <Typography variant="body2" color="text.secondary">
            {variant.type}
          </Typography>
        </TableCell>
        <TableCell align="left" sx={{ width: "19%" }}>
          <Typography variant="body2" fontWeight={500}>
            {category ? category.name : "Sem categoria"}
          </Typography>
        </TableCell>
        <TableCell align="left" sx={{ width: "16%" }}>
          <Typography variant="body2" color="text.secondary">
            {variant.stock}
          </Typography>
        </TableCell>
        <TableCell align="center" sx={{ width: "6%" }}>
          <Typography variant="body2" fontWeight={500}>
            {variant.minStock}
          </Typography>
        </TableCell>
        <TableCell align="center" sx={{ width: "23%" }}>
          <Chip label={label} color={color} size="small" />
        </TableCell>
        <TableCell align="center">
          <IconButton color="primary" onClick={handleOpenModal}>
            <IconPencil size={20} />
          </IconButton>
          <IconButton color="primary" onClick={handleOpenDialog}>
            <IconTrash size={20} />
          </IconButton>
        </TableCell>
      </TableRow>

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={<CreateOrUpdateVariant data={{ variant }} />}
      />

      <DialogComponent
        title="Excluir variante"
        message="Tem certeza que deseja excluir esta variante?"
        isOpen={isOpenDialog}
        onClose={handleCloseDialog}
        confirm={() => {
          deleteVariant({
            productId: variant.parentProductId!,
            variantId: variant._id,
          });
        }}
      />
    </>
  );
};

interface ProductVariantItemProps {
  data: {
    variant: Product;
    category?: Category;
  };
}

export const ProductVariantItem = ({ data }: ProductVariantItemProps) => {
  const dispatch = useDispatch();

  const deleteVariant = (data: { productId: string; variantId: string }) => {
    dispatch(
      productActions.deleteVariantRequest({
        productId: data.productId,
        variantId: data.variantId,
      })
    );
  };

  return (
    <ProductVariantItemComponent data={data} actions={{ deleteVariant }} />
  );
};
