import { Card, CardContent, CardHeader, Divider, Grid, Alert, Modal } from "@mui/material";
import RoomsSection from "./rooms-section";
import ClientInformationSection from "./clientinformation-section";
import ProductionOrderFooter from "./footer";
import { ProductionOrderFormProvider } from "./form-provider/ProductionOrderFormProvider";

const ProductionOrderForm = () => {
  return (
    <>
      <form autoComplete="off" noValidate>
        <Card>
          <CardHeader
            subheader="Uma nova ordem de produção será criada após salvar o formulário"
            title="Ordem de produção"
          />

          <Divider />

          <ProductionOrderFormProvider>
            <CardContent>
              <Grid container spacing={3}>
                <ClientInformationSection />
                <RoomsSection />
              </Grid>
            </CardContent>

            <Divider />

            <ProductionOrderFooter />
          </ProductionOrderFormProvider>
        </Card>
      </form>
    </>
  );
};

export default ProductionOrderForm;
