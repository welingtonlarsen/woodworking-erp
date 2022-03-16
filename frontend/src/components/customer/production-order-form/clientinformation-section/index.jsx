import { useContext, useState } from "react";

import { Divider, Grid, TextField, Typography } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";

import SectionTitle from "../section-title";
import { styles } from "./styles";
import { ProductionOrderFormContext } from "../form-provider/ProductionOrderFormProvider";

import DatePicker from "src/components/common/date-picker";

const ClientInformationSection = ({ classes }) => {
  const [productionOrderForm, setProductionOrderForm] = useContext(ProductionOrderFormContext);

  return (
    <>
      <SectionTitle title="Informações pessoais" />
      <Grid container item md={12} xs={12}>
        <Grid item md={12} xs={12}>
          <TextField
            className={classes.clientNameInput}
            fullWidth
            label="Cliente"
            name="client"
            onChange={(event) =>
              setProductionOrderForm({
                ...productionOrderForm,
                [event.target.name]: event.target.value,
              })
            }
            required
            value={productionOrderForm.client}
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid style={{ marginTop: 20 }} container item md={12} xs={12}>
          <Grid style={{ marginRight: 15 }} item md={2} xs={6}>
            <DatePicker
              label="Inicio da produção"
              dateValue={productionOrderForm.start}
              onChangeDateCallBack={(newDate) =>
                setProductionOrderForm({
                  ...productionOrderForm,
                  start: newDate,
                })
              }
            />
          </Grid>

          <Grid item md={2} xs={6}>
            <DatePicker
              label="Prazo final"
              dateValue={productionOrderForm.deadline}
              onChangeDateCallBack={(newDate) =>
                setProductionOrderForm({
                  ...productionOrderForm,
                  deadline: newDate,
                })
              }
            />
          </Grid>
        </Grid>

        <Divider className={classes.divider} />
      </Grid>
    </>
  );
};

export default withStyles(styles)(ClientInformationSection);
