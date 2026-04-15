import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  IconCreditCard,
  IconDeviceFloppy,
  IconPackage,
  IconPercentage,
  IconX,
} from "@tabler/icons-react";
import {
  CatalogCategory,
  CatalogItemPayload,
} from "../../../../features/catalog/types";
import { useDispatch } from "../../../../store/hooks";
import { actions as catalogActions } from "../../../../features/catalog";

interface CreateCatalogItemProps {
  showcaseId: string;
  categories: CatalogCategory[];
  actions: {
    onClose?: () => void;
  };
}

interface FormData {
  title: string;
  description?: string;
  categoryId?: string;
  basePriceInReais?: number;
  hasDiscount: boolean;
  discountType: "percentage" | "fixed";
  discountValue?: number;
  hasInstallments: boolean;
  maxInstallments?: number;
  installmentPriceInReais?: number;
  interestFree: boolean;
}

export const CreateCatalogItem = ({
  showcaseId,
  categories,
  actions: { onClose },
}: CreateCatalogItemProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      discountType: "percentage",
      interestFree: false,
      hasDiscount: false,
      hasInstallments: false,
    },
  });

  const [
    basePriceInReais,
    discountType,
    discountValue,
    hasDiscount,
    hasInstallments,
  ] = watch([
    "basePriceInReais",
    "discountType",
    "discountValue",
    "hasDiscount",
    "hasInstallments",
  ]);

  const computedFinalPriceInReais = (() => {
    if (
      !basePriceInReais ||
      basePriceInReais <= 0 ||
      !hasDiscount ||
      !discountValue ||
      discountValue <= 0
    )
      return basePriceInReais || 0;
    if (discountType === "percentage")
      return basePriceInReais * (1 - discountValue / 100);
    return Math.max(0, basePriceInReais - discountValue);
  })();

  const onSubmit = (data: FormData) => {
    const payload: CatalogItemPayload = {
      showcaseId,
      title: data.title,
      ...(data.description ? { description: data.description } : {}),
      ...(data.categoryId ? { categoryId: data.categoryId } : {}),
      ...(data.basePriceInReais && data.basePriceInReais > 0
        ? {
            pricing: {
              basePriceInCents: Math.round(data.basePriceInReais * 100),
              finalPriceInCents: computedFinalPriceInReais,
              discount: {
                type: data.discountType,
                value: data?.discountValue || 0,
              },
              installments: {
                maxInstallments: data.maxInstallments ?? 0,
                installmentPriceInCents: Math.round(
                  (data.installmentPriceInReais || 0) * 100,
                ),
                interestFree: data.interestFree,
              },
            },
          }
        : {}),
    };
    dispatch(catalogActions.createCatalogItemRequest(payload));
    reset();
    onClose?.();
  };

  const handleCancel = () => {
    reset();
    onClose?.();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", maxWidth: 500, p: 3 }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "primary.light",
            color: "primary.main",
            flexShrink: 0,
          }}
        >
          <IconPackage size={20} />
        </Box>
        <Typography variant="h5" fontWeight={600}>
          Novo Item de Catálogo
        </Typography>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, pl: 7 }}>
        Adicione um item ao seu catálogo de produtos
      </Typography>

      <Stack spacing={3}>
        <TextField
          {...register("title", {
            required: "O título do item é obrigatório",
            minLength: {
              value: 2,
              message: "O título deve ter pelo menos 2 caracteres",
            },
          })}
          label="Título"
          placeholder="Ex: Camiseta Básica, Notebook Dell..."
          fullWidth
          required
          autoFocus
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          {...register("description")}
          label="Descrição"
          placeholder="Descreva o item..."
          fullWidth
          multiline
          rows={3}
        />

        <FormControl fullWidth>
          <InputLabel>Categoria</InputLabel>
          <Controller
            name="categoryId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Categoria">
                <MenuItem value="">Sem categoria</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {/* Pricing divider */}
        <Divider>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            textTransform="uppercase"
            letterSpacing={0.8}
          >
            Precificação
          </Typography>
        </Divider>

        <TextField
          {...register("basePriceInReais", {
            min: { value: 0, message: "O preço não pode ser negativo" },
            valueAsNumber: true,
          })}
          label="Preço base"
          placeholder="0,00"
          type="number"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            },
            htmlInput: { step: "0.01", min: "0" },
          }}
          error={!!errors.basePriceInReais}
          helperText={errors.basePriceInReais?.message}
        />

        {/* Discount section */}
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            borderColor: hasDiscount ? "warning.main" : "divider",
            transition: "border-color 0.2s",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2, py: 1.5 }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: 1.5,
                  bgcolor: hasDiscount ? "warning.light" : "action.hover",
                  color: hasDiscount ? "warning.dark" : "text.secondary",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
              >
                <IconPercentage size={16} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  Desconto
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Aplicar desconto sobre o preço base
                </Typography>
              </Box>
            </Stack>
            <Controller
              name="hasDiscount"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  size="small"
                  color="warning"
                />
              )}
            />
          </Stack>

          <Collapse in={hasDiscount}>
            <Divider />
            <Stack spacing={2.5} sx={{ p: 2.5 }}>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                  sx={{ mb: 1, display: "block" }}
                >
                  Tipo de desconto
                </Typography>
                <Controller
                  name="discountType"
                  control={control}
                  render={({ field }) => (
                    <ToggleButtonGroup
                      exclusive
                      value={field.value}
                      onChange={(_, val) => val && field.onChange(val)}
                      fullWidth
                      size="small"
                    >
                      <ToggleButton value="percentage">
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.75}
                        >
                          <IconPercentage size={14} />
                          <span>Porcentagem</span>
                        </Stack>
                      </ToggleButton>
                      <ToggleButton value="fixed">
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.75}
                        >
                          <Typography
                            variant="caption"
                            fontWeight={700}
                            lineHeight={1}
                          >
                            R$
                          </Typography>
                          <span>Valor fixo</span>
                        </Stack>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  )}
                />
              </Box>

              <TextField
                {...register("discountValue", {
                  min: { value: 0, message: "O valor não pode ser negativo" },
                  valueAsNumber: true,
                })}
                label="Valor do desconto"
                placeholder="0"
                type="number"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment:
                      discountType === "fixed" ? (
                        <InputAdornment position="start">R$</InputAdornment>
                      ) : undefined,
                    endAdornment:
                      discountType === "percentage" ? (
                        <InputAdornment position="end">%</InputAdornment>
                      ) : undefined,
                  },
                  htmlInput: {
                    step: discountType === "percentage" ? "1" : "0.01",
                    min: "0",
                    max: discountType === "percentage" ? "100" : undefined,
                  },
                }}
                error={!!errors.discountValue}
                helperText={errors.discountValue?.message}
              />

              <TextField
                label="Preço final (calculado)"
                value={computedFinalPriceInReais.toFixed(2)}
                disabled
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  },
                }}
                helperText="Calculado automaticamente com base no desconto aplicado"
              />
            </Stack>
          </Collapse>
        </Paper>

        {/* Installments section */}
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            borderColor: hasInstallments ? "success.main" : "divider",
            transition: "border-color 0.2s",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2, py: 1.5 }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: 1.5,
                  bgcolor: hasInstallments ? "success.light" : "action.hover",
                  color: hasInstallments ? "success.dark" : "text.secondary",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
              >
                <IconCreditCard size={16} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  Parcelamento
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Configurar opções de parcelamento
                </Typography>
              </Box>
            </Stack>
            <Controller
              name="hasInstallments"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  size="small"
                  color="success"
                />
              )}
            />
          </Stack>

          <Collapse in={hasInstallments}>
            <Divider />
            <Stack spacing={2.5} sx={{ p: 2.5 }}>
              <TextField
                {...register("maxInstallments", {
                  min: { value: 1, message: "Mínimo de 1 parcela" },
                  max: { value: 48, message: "Máximo de 48 parcelas" },
                  valueAsNumber: true,
                })}
                label="Número máximo de parcelas"
                placeholder="Ex: 12"
                type="number"
                fullWidth
                slotProps={{
                  htmlInput: { step: "1", min: "1", max: "48" },
                }}
                error={!!errors.maxInstallments}
                helperText={
                  errors.maxInstallments?.message ??
                  "Quantidade máxima de vezes que pode ser parcelado"
                }
              />

              <TextField
                {...register("installmentPriceInReais", {
                  min: { value: 0, message: "O valor não pode ser negativo" },
                  valueAsNumber: true,
                })}
                label="Valor da parcela"
                placeholder="0,00"
                type="number"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  },
                  htmlInput: { step: "0.01", min: "0" },
                }}
                error={!!errors.installmentPriceInReais}
                helperText={errors.installmentPriceInReais?.message}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                  py: 1.5,
                  borderRadius: 1.5,
                  bgcolor: "action.hover",
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    Sem juros
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    As parcelas não incluem acréscimo de juros
                  </Typography>
                </Box>
                <Controller
                  name="interestFree"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          color="success"
                        />
                      }
                      label=""
                      sx={{ m: 0 }}
                    />
                  )}
                />
              </Box>
            </Stack>
          </Collapse>
        </Paper>

        {Object.keys(errors).length > 0 && (
          <Alert severity="error">
            Por favor, corrija os erros antes de continuar
          </Alert>
        )}

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<IconX size={18} />}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<IconDeviceFloppy size={18} />}
          >
            Salvar Item
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
