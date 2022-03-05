import { useContext, useState } from "react";

import { Divider, Grid, TextField, Typography } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";

import SectionTitle from "../section-title";
import { styles } from "./styles";
import { ProductionOrderFormContext } from "../form-provider/ProductionOrderFormProvider";

const ClientInformationSection = ({ classes }) => {
  const [productionOrderForm, setProductionOrderForm] = useContext(
    ProductionOrderFormContext
  );

  return (
    <>
      <SectionTitle title="Informações pessoais" />
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

        <Divider className={classes.divider} />
      </Grid>
    </>
  );
};

export default withStyles(styles)(ClientInformationSection);
