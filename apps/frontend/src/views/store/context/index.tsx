import React, { PropsWithChildren, useState } from "react";
import { IProductCategory } from "../../admin/views/products/context/types";
import { IStore } from "../../admin/views/store/context/types";
import {
  IProductCategoryWithProducts,
  StoreContext,
  StoreState,
} from "../types";

const StoreContext = React.createContext({} as StoreContext);

interface Props {
  categories: Array<IProductCategory>;
  categoriesWithProducts: Array<IProductCategoryWithProducts>;
  store: IStore;
}

export const StoreContextProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  categories,
  store,
  categoriesWithProducts,
}) => {
  const [state, setState] = useState<StoreState>({
    categories,
    store,
    categoriesWithProducts,
  });

  const actions = {};

  return (
    <StoreContext.Provider value={{ actions, state }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => React.useContext(StoreContext);
