import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, Fab, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ProductionOrderFormContext } from "../../form-provider/ProductionOrderFormProvider";
import DatePicker from "../../../common/date-picker";
import BooleanPicker from "../../../common/boolean-picker";
import TextInput from "../../../common/text-input";
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";

const Room = ({ room, classes }) => {
  const [accordionExpanded, setAccordionExpanded] = React.useState(false);
  const [productionOrderForm, setProductionOrderForm] = React.useContext(
    ProductionOrderFormContext
  );

  const handleExpandAccordion = (panel) => (event, isExpanded) => {
    setAccordionExpanded(isExpanded ? panel : false);
  };

  const setContextProperty = (newValue, propertyName, fornitureId) => {
    const productionOrderFormCopy = { ...productionOrderForm };

    const roomFound = productionOrderFormCopy["rooms"].find(
      (roomFound) => roomFound.roomId == room.roomId
    );
    const forniture = roomFound.fornitures.find(
      (forniture) => forniture.fornitureId === fornitureId
    );

    forniture[propertyName] = newValue;
    setProductionOrderForm(productionOrderFormCopy);
  };

  const handleAddNewForniture = () => {
    const productionOrderFormCopy = { ...productionOrderForm };

    const roomFound = productionOrderFormCopy["rooms"].find(
      (roomFound) => roomFound.roomId == room.roomId
    );
    roomFound.fornitures.push({
      fornitureId: uuidv4(),
      name: "",
      productionStart: new Date(),
      containsPurchaseOrder: false,
      forecast: new Date(),
      woodWorker: "",
      deadline: new Date(),
    });

    setProductionOrderForm(productionOrderFormCopy);
  };

  return (
    <Accordion
      expanded={accordionExpanded === "panel1"}
      onChange={handleExpandAccordion("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          {room.name}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid style={{ marginBottom: "15px" }} item md={12} xs={12}>
            <Typography variant="body2" component="body2">
              Os móveis do ambiente poderão ser inseridos futuramente.
            </Typography>
          </Grid>

          {/*--------------- Ambient details----------------- */}
          {room.fornitures.map((forniture) => {
            return (
              <>
                <Grid md={12} xs={12}>
                  <Divider style={{ marginLeft: "17px", marginTop: "20px" }} />
                </Grid>
                <Grid item md={5} xs={12}>
                  <TextInput
                    label="Móvel"
                    name="name"
                    value={forniture.name}
                    onChangeCallBack={(event) =>
                      setContextProperty(
                        event.target.value,
                        event.target.name,
                        forniture.fornitureId
                      )
                    }
                  />
                </Grid>
                <Grid item md={5} xs={12}>
                  <TextInput
                    label="Marceneiro"
                    name="woodWorker"
                    value={forniture.woodWorker}
                    onChangeCallBack={(event) =>
                      setContextProperty(
                        event.target.value,
                        event.target.name,
                        forniture.fornitureId
                      )
                    }
                  />
                </Grid>
                <Grid item md={2} xs={6}>
                  <BooleanPicker
                    label="Contem pedido"
                    name="containsPurchaseOrder"
                    value={forniture.containsPurchaseOrder}
                    onChangeCallBack={(event) =>
                      setContextProperty(
                        event.target.value,
                        event.target.name,
                        forniture.fornitureId
                      )
                    }
                  />
                </Grid>

                <Grid item md={4} xs={6}>
                  <DatePicker
                    label="Inicio da produção"
                    dateValue={forniture.productionStart}
                    onChangeDateCallBack={(newDate) =>
                      setContextProperty(
                        newDate,
                        "productionStart",
                        forniture.fornitureId
                      )
                    }
                  />
                </Grid>

                <Grid item md={4} xs={6}>
                  <DatePicker
                    label="Previsão de entrega"
                    dateValue={forniture.forecast}
                    onChangeDateCallBack={(newDate) =>
                      setContextProperty(
                        newDate,
                        "forecast",
                        forniture.fornitureId
                      )
                    }
                  />
                </Grid>

                <Grid item md={4} xs={6}>
                  <DatePicker
                    label="Prazo final"
                    dateValue={forniture.deadline}
                    onChangeDateCallBack={(newDate) =>
                      setContextProperty(
                        newDate,
                        "deadline",
                        forniture.fornitureId
                      )
                    }
                  />
                </Grid>
              </>
            );
          })}
        </Grid>
        <div className={classes.addButtonContainer}>
          <Fab
            className={classes.addButton}
            size="small"
            color="primary"
            aria-label="add"
          >
            <AddIcon onClick={() => handleAddNewForniture()} />
          </Fab>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default withStyles(styles)(Room);
