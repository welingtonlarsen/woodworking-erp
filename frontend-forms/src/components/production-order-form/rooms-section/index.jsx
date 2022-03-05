import { useState, useContext } from "react";
import { Grid, Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import SectionTitle from "../section-title";
import AmbientList from "./room-list";

import { ProductionOrderFormContext } from "../form-provider/ProductionOrderFormProvider";

const RoomsSection = () => {
  const [productionOrderForm, setProductionOrderForm] = useContext(
    ProductionOrderFormContext
  );
  const [newRoomName, setNewRoomName] = useState("");

  function addNewRoom() {
    const productionOrderFormCopy = { ...productionOrderForm };
    productionOrderFormCopy.rooms.push({
      roomId: uuidv4(),
      name: newRoomName,
      fornitures: [
        {
          fornitureId: uuidv4(),
          name: "",
          productionStart: new Date(),
          containsPurchaseOrder: false,
          forecast: new Date(),
          woodWorker: "",
          deadline: new Date(),
        },
      ],
    });
    setProductionOrderForm(productionOrderFormCopy);
    setNewRoomName("");
  }

  return (
    <>
      <SectionTitle title="Ambientes" />

      <Grid style={{ display: "flex" }} item md={12} xs={12}>
        <TextField
          label="Nome do ambiente"
          name="room"
          onChange={(event) => setNewRoomName(event.target.value)}
          required
          value={newRoomName}
          variant="outlined"
          size="small"
        />
        <Button variant="outlined" size="small" onClick={() => addNewRoom()}>
          Adicionar
        </Button>
      </Grid>

      <AmbientList />
    </>
  );
};

export default RoomsSection;
