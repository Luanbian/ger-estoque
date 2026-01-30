import {
  Grid,
  InputAdornment,
  OutlinedInput,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { CustomerFilters } from "../../../../features/filters/types";
import { IconPhone, IconSearch } from "@tabler/icons-react";
import { SliderComponent } from "../../slider";
import { useDispatch, useSelector } from "../../../../store/hooks";
import { actions } from "../../../../features/filters";
import { actions as customerActions } from "../../../../features/customers";

interface Props {
  data: {
    customer: CustomerFilters;
  };
  actions: {
    onChangeName: (name: string) => void;
    onChangePhone: (phone: string) => void;
    onChangeInvoicing: (min: number, max: number) => void;
    onChangeStatus: (status: CustomerStatusEnum) => void;
  };
}

import { Box, Typography, Stack, Divider } from "@mui/material";
import { customerMapper } from "../../../../utils/customerMapper";
import { CustomerStatusEnum } from "../../../../features/common/customerStatusEnum";

const CustomerFiltersComponent = ({ data, actions }: Props) => {
  const { customer } = data;
  const { onChangeName, onChangePhone, onChangeInvoicing, onChangeStatus } =
    actions;

  const handleCustomerStatusChange = (_: any, newValue: string | null) => {
    onChangeStatus((newValue || "") as CustomerStatusEnum);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Divider sx={{ mb: 2 }} />
        <OutlinedInput
          placeholder="Pesquisar cliente por nome"
          size="medium"
          type="search"
          notched
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <IconSearch size={22} color="#1976d2" />
            </InputAdornment>
          }
          value={customer.name || ""}
          onChange={(e) => {
            onChangeName(e.target.value || "");
          }}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
            mb: 2,
            fontSize: 16,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.light",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          }}
        />
        <OutlinedInput
          placeholder="Pesquisar cliente por telefone"
          size="medium"
          type="search"
          notched
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <IconPhone size={22} color="#1976d2" />
            </InputAdornment>
          }
          value={customer.phone || ""}
          onChange={(e) => {
            onChangePhone(e.target.value || "");
          }}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
            fontSize: 16,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.light",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          }}
        />
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={500}
          color="text.secondary"
          mb={1}
        >
          Faturamento (R$)
        </Typography>
        <SliderComponent
          data={{
            min: customer.invoicingMin || 0,
            max: customer.invoicingMax || 0,
          }}
          actions={{ afterChange: onChangeInvoicing }}
        />
      </Box>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
          Status do Cliente
        </Typography>
        <ToggleButtonGroup
          value={customer.status || ""}
          exclusive
          onChange={handleCustomerStatusChange}
          sx={{ flexWrap: "wrap", gap: 1 }}
          size="small"
        >
          {Object.entries(customerMapper).map(([key, value]) => (
            <ToggleButton key={key} value={key}>
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
    </Stack>
  );
};

export const CustomerFilter = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.filter);
  const { maxSpent } = useSelector((state) => state.customer);

  const onChangeName = (name: string) => {
    dispatch(actions.setCustomerName(name));
    dispatch(customerActions.customersRequest());
  };
  const onChangePhone = (phone: string) => {
    dispatch(actions.setCustomerPhone(phone));
    dispatch(customerActions.customersRequest());
  };
  const onChangeInvoicing = (min: number, max: number) => {
    dispatch(actions.setCustomerInvoicing({ min, max }));
    dispatch(customerActions.customersRequest());
  };
  const onChangeStatus = (status: CustomerStatusEnum) => {
    dispatch(actions.setCustomerStatus(status));
    dispatch(customerActions.customersRequest());
  };

  return (
    <CustomerFiltersComponent
      data={{
        customer: {
          name: customer.name,
          phone: customer.phone,
          invoicingMin: 0,
          invoicingMax: maxSpent || 0,
        },
      }}
      actions={{
        onChangeName,
        onChangePhone,
        onChangeInvoicing,
        onChangeStatus,
      }}
    />
  );
};
