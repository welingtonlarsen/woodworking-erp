import React, { useState } from "react";

export const ProductionOrderFormContext = React.createContext([{}, () => {}]);

export const ProductionOrderFormProvider = ({ children }) => {
  const [productionOrderForm, setProductionOrderForm] = useState({
    client: "",
    start: new Date(),
    deadline: new Date(),
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
