import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from "../components/dashboard-layout";
import { getAll } from "src/services/production-order-service";

const ProductionOrderDetails = (props) => {
  const [productionOrderId, setProductionOrderId] = useState();
  const router = useRouter();

  useEffect(async () => {
    const {
      query: { id },
    } = router;
    setProductionOrderId(id);
    console.log("---");
    if (id) {
      try {
        const productionOrder = await getAll();
        console.log(productionOrder);
      } catch (error) {
        console.log(error);
      }
    }
    console.log("----");
  }, [router]);

  return <div>{productionOrderId}</div>;
};
ProductionOrderDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductionOrderDetails;
