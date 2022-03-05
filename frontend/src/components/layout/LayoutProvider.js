import React, { useState } from "react";

export const LayoutContext = React.createContext([{}, () => {}]);

export const LayoutProvider = ({ children }) => {
  const [apiCommunicationError, setApiCommunicationError] = useState(false);

  return (
    <LayoutContext.Provider value={[apiCommunicationError, setApiCommunicationError]}>
      {children}
    </LayoutContext.Provider>
  );
};
