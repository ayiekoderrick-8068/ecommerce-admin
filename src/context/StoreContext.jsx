import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext(null);

function StoreProvider({ children }) {
  const [storeInfo, setStoreInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/store_info")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setStoreInfo(data[0]);
      });
  }, []);

  return (
    <StoreContext.Provider value={storeInfo}>
      {children}
    </StoreContext.Provider>
  );
}

function useStore() {
  return useContext(StoreContext);
}

export { StoreProvider, useStore };
