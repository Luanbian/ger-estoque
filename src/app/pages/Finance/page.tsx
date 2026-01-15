import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InventoryIcon from "@mui/icons-material/Inventory";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  FinanceAggregate,
  FinancePerProduct,
  FinanceStock,
} from "../../../features/finance/types";

interface Props {
  data: {
    dashboard: {
      stock: FinanceStock | null;
      perProduct: FinancePerProduct[] | [];
      aggregate: FinanceAggregate | null;
    };
  };
}

const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const FinancePage = ({ data }: Props) => {
  const { dashboard } = data;
  const theme = useTheme();

  const aggregate = dashboard?.aggregate ?? null;
  const stock = dashboard?.stock ?? null;
  const perProduct = dashboard?.perProduct ?? [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 2 }}>
        Dashboard Financeiro
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
          gap: 3,
        }}
      >
        {/* Aggregate Card */}
        <Box>
          <Card elevation={2} sx={{ height: "100%" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  <MonetizationOnIcon />
                </Avatar>
              }
              title="Resumo"
              subheader="Visão geral rápida"
            />
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Margem Média de Estoque
                </Typography>
                <Typography variant="h6">
                  {aggregate
                    ? `${aggregate.averageStockMargin.toFixed(2)}%`
                    : "-"}
                </Typography>

                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Lucro Potencial Total
                </Typography>
                <Typography variant="h6">
                  {formatCurrency(aggregate?.totalPotentialProfit ?? null)}
                </Typography>

                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Capital Imobilizado
                </Typography>
                <Typography variant="h6">
                  {formatCurrency(aggregate?.immobilizedCapital ?? null)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Stock Card */}
        <Box>
          <Card elevation={2} sx={{ height: "100%" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                  <InventoryIcon />
                </Avatar>
              }
              title="Estoque"
              subheader="Resumo do estoque atual"
            />
            <CardContent>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total em estoque
                  </Typography>
                  <Typography variant="h6">
                    {formatCurrency(stock?.totalStock ?? null)}
                  </Typography>
                </Box>

                <Box sx={{ flex: "1 1 200px" }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Produtos com estoque baixo/zero
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {stock?.stockZeroOrLow ? (
                      <Chip
                        label={`${stock.stockZeroOrLow.productName} (${stock.stockZeroOrLow.status})`}
                        color="warning"
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Nenhum
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Concentração de Estoque (top itens)
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Produto</TableCell>
                        <TableCell align="right">Valor do Estoque</TableCell>
                        <TableCell align="right">% Acumulado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stock?.stockConcentration &&
                      stock.stockConcentration.length > 0 ? (
                        stock.stockConcentration.slice(0, 6).map((p) => (
                          <TableRow key={p.productId}>
                            <TableCell>{p.productName}</TableCell>
                            <TableCell align="right">
                              {formatCurrency(p.stockValue)}
                            </TableCell>
                            <TableCell align="right">
                              {(p.cumulativePercentage * 100).toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            Sem dados
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Per Product Table full width */}
        <Box sx={{ gridColumn: { md: "1 / span 2" } }}>
          <Card elevation={2}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                  <TrendingUpIcon />
                </Avatar>
              }
              title="Por Produto"
              subheader="Margens e valores por produto"
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Produto</TableCell>
                      <TableCell align="right">Margem Bruta</TableCell>
                      <TableCell align="right">Valor em Estoque</TableCell>
                      <TableCell align="right">Venda Potencial</TableCell>
                      <TableCell align="right">Lucro Potencial</TableCell>
                      <TableCell align="right">Markup</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {perProduct && perProduct.length > 0 ? (
                      perProduct.map((p: FinancePerProduct) => (
                        <TableRow key={p.productId} hover>
                          <TableCell>{p.productName}</TableCell>
                          <TableCell align="right">
                            {p.marginGross?.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            {formatCurrency(p.valueOfStock)}
                          </TableCell>
                          <TableCell align="right">
                            {formatCurrency(p.potentialSalesOfStock)}
                          </TableCell>
                          <TableCell align="right">
                            {formatCurrency(p.potentialGrossProfitOfStock)}
                          </TableCell>
                          <TableCell align="right">
                            {p.markup?.toFixed(2)}x
                          </TableCell>
                          <TableCell align="center">
                            {p.isBelowIdealMarkup ? (
                              <Chip label="Abaixo" color="error" size="small" />
                            ) : (
                              <Chip label="OK" color="success" size="small" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          Nenhum produto encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
