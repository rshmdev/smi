import {
  CREATE_DEMAND,
  UPDATE_DEMAND,
  DELETE_DEMAND,
  GET_ALL_DEMANDS,
} from "../actions/types";

const initialState = [];

function demandsReducer(demands = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_DEMANDS:
      return [...payload];

    case CREATE_DEMAND:
      return [payload, ...demands];

    case UPDATE_DEMAND:
      return demands.map((demand) => {
        if (demand.id === payload.id) {
          const updatedItem = payload.data.items;

          const somaTotalProd = updatedItem.reduce(
            (acc, item) => acc + parseInt(item.total_prod, 10),
            0
          );
          const somaTons = updatedItem.reduce(
            (acc, item) => acc + parseInt(item.tons, 10),
            0
          );
          const uniqueSkus = new Set(
            JSON.parse(demand.itens).map((item) => item.sku)
          );
          const totalUniqueSkus = uniqueSkus.size;

          return {
            ...demand,
            skus: totalUniqueSkus,
            total_prod: somaTotalProd,
            total_plan: somaTons,
            itens: JSON.stringify(updatedItem),
          };
        } else {
          return demand;
        }
      });

    case DELETE_DEMAND:
      return demands.filter(({ id }) => id !== payload.id);

    default:
      return demands;
  }
}

export default demandsReducer;
