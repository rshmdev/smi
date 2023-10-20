import { toast } from "react-toastify";
import {
  GET_ALL_DEMANDS,
  CREATE_DEMAND,
  UPDATE_DEMAND,
  DELETE_DEMAND,
} from "./types";

import api from "@/services/api";

export const fetchDemands = () => async (dispatch) => {
  try {
    const res = await api.get(`demands`);
    dispatch({
      type: GET_ALL_DEMANDS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const createDemand = (data) => async (dispatch) => {
  try {
    const res = await api.post(`demands`, data);

    dispatch({
      type: CREATE_DEMAND,
      payload: res.data,
    });

    toast.success("Demanda criada com sucesso");
    return Promise.resolve(res.data);
  } catch (err) {
    toast.error("Falha ao criar demanda");
    return Promise.reject(err);
  }
};

export const updateDemand = (id, data) => async (dispatch) => {
  try {
    const res = await api.put(`demands/${id}`, data);

    dispatch({
      type: UPDATE_DEMAND,
      payload: {
        id,
        data,
      },
    });
    toast.success("Demanda Atualizada com sucesso");

    return Promise.resolve(res.data);
  } catch (err) {
    toast.error("Falha ao atualizar Demanda");
    return Promise.reject(err);
  }
};

export const deleteDemand = (id) => async (dispatch) => {
  try {
    await api.delete(`demands/${id}`);

    dispatch({
      type: DELETE_DEMAND,
      payload: { id },
    });

    toast.success("Demanada deletada com sucessso");
  } catch (err) {
    toast.error("Erro ao deletar demanda");
  }
};
