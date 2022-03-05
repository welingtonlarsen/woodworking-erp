import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { ProductionOrderFormContext } from "../form-provider/ProductionOrderFormProvider";
import { create } from "../../../../services/production-order-service";
import { LayoutContext } from "src/components/layout/LayoutProvider";

const ProductionOrderFooter = () => {
  const router = useRouter();
  const [productionOrderForm, setProductionOrderForm] = useContext(ProductionOrderFormContext);
  const [apiCommunicationError, setApiCommunicationError] = useContext(LayoutContext);
  const [showProgress, setShowProgress] = useState(false);

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const save = async () => {
    try {
      setShowProgress(true);
      await timeout(1000);
      await create(productionOrderForm);
      setProductionOrderForm({
        client: "",
        rooms: [],
      });
      setShowProgress(false);
      router.push("/production-orders");
    } catch (error) {
      console.log(error);
      setShowProgress(false);
      setApiCommunicationError(true);
    }
  };

  return (
    <>
      <Modal open={showProgress} onClose={() => console.log("oaisoidja")}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%" }}>
          <CircularProgress />
        </Box>
      </Modal>
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
    </>
  );
};

export default ProductionOrderFooter;
