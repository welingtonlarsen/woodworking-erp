import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  LinearProgress,
} from "@mui/material";
import { getAll } from "../../services/production-order-service";
import { useRouter } from "next/router";

export const CustomerListResults = ({ customers, ...rest }) => {
  const router = useRouter();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [productionOrders, setProductionOrders] = useState([]);

  useEffect(async () => {
    const response = await getAll();
    setProductionOrders(response.data);
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = productionOrders.map((productionOrder) => productionOrder.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const pushToProductionOrderDetails = () => router.push("/production-order-form");

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === productionOrders.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < productionOrders.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Ambientes</TableCell>
                <TableCell>Móveis</TableCell>
                <TableCell>Inicio</TableCell>
                <TableCell>Prazo final</TableCell>
                <TableCell>Ordem de compra</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productionOrders.slice(0, limit).map((productionOrder) => (
                <TableRow
                  style={{ cursor: "pointer" }}
                  //onClick={(event) => console.log(productionOrder)}
                  hover
                  key={productionOrder.id}
                  selected={selectedCustomerIds.indexOf(productionOrder.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(productionOrder.id) !== -1}
                      onChange={(event) => handleSelectOne(event, productionOrder.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell onClick={pushToProductionOrderDetails}>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {productionOrder.clientName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell onClick={pushToProductionOrderDetails}>
                    {productionOrder.ambientsQuantity}
                  </TableCell>
                  <TableCell onClick={pushToProductionOrderDetails}>
                    {productionOrder.fornituresQuantity}
                  </TableCell>
                  <TableCell onClick={pushToProductionOrderDetails}>
                    {format(productionOrder.productionStartDate, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell onClick={pushToProductionOrderDetails}>
                    {format(productionOrder.deadlineDate, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell onClick={pushToProductionOrderDetails}>
                    <LinearProgress
                      sx={{ width: 100 }}
                      variant="determinate"
                      value={productionOrder.purchaseOrderProgress}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={productionOrders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  productionOrders: PropTypes.array.isRequired,
};
