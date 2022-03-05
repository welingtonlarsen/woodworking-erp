import { useContext } from "react";
import { Box, Button } from "@mui/material";

import { ProductionOrderFormContext } from "../form-provider/ProductionOrderFormProvider";
import { create } from "../../../services/production-order-service";

const ProductionOrderFooter = () => {
  const [productionOrderForm, setProductionOrderForm] = useContext(
    ProductionOrderFormContext
  );

  const save = async () => {
    try {
      await create(productionOrderForm);
      setProductionOrderForm({
        client: "",
        rooms: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button onClick={save} color="primary" variant="contained">
        Salvar
      </Button>
    </Box>
  );
};

export default ProductionOrderFooter;
