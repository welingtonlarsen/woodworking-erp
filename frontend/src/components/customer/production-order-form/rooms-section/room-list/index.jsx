import { useContext } from "react";
import { Grid } from "@mui/material";
import { ProductionOrderFormContext } from "../../form-provider/ProductionOrderFormProvider";

import Room from "../room";

const AmbientList = () => {
  const [productionOrderForm, setProductionOrderForm] = useContext(
    ProductionOrderFormContext
  );

  return (
    <Grid item md={12} xs={12}>
      {(productionOrderForm.rooms.length > 0 &&
        productionOrderForm.rooms.map((room) => (
          <Room room={room} />
        ))) ||
        "Insira um novo ambiente!"}
    </Grid>
  );
};

export default AmbientList;
