import React, { useState } from "react";

export const ProductionOrderFormContext = React.createContext([{}, () => {}]);

export const ProductionOrderFormProvider = ({ children }) => {
  const [productionOrderForm, setProductionOrderForm] = useState({
    client: "",
    rooms: [],
  });

  return (
    <ProductionOrderFormContext.Provider
      value={[productionOrderForm, setProductionOrderForm]}
    >
      {children}
    </ProductionOrderFormContext.Provider>
  );
};
