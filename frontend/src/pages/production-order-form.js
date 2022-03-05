import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout";
import ProductionOrderForm from "../components/customer/production-order-form";

const ProductionOrderFormPage = () => {
  return (
    <>
      <Head>
        <title>Ordem de Produção | Formulario</title>
      </Head>
      <ProductionOrderForm />
    </>
  );
};

ProductionOrderFormPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductionOrderFormPage;
