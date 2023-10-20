import * as React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  FormControl,
  Button,
  Typography,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers";

import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { createDemand } from "@/actions/demands";

const CreateModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const [fields, setFields] = useState([
    { id: uuidv4(), sku: "", descricao: "", tons: "" },
  ]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      dispatch(createDemand(data));

      handleClose();

      setFields([{ id: uuidv4(), sku: "", descricao: "", tons: "" }]);
      reset();
    } catch {
      toast.error("Falha ao criar demanda");
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    setFields([{ id: uuidv4(), sku: "", descricao: "", tons: "" }]);
  };

  const addField = () => {
    setFields([...fields, { id: uuidv4(), sku: "", descricao: "", tons: "" }]);
  };

  const removeField = (index) => {
    if (fields.length > 1) {
      const updatedFields = [...fields];
      updatedFields.splice(index, 1);
      setFields(updatedFields);
    }
  };

  const handleDateChange = (date, fieldName) => {
    setValue(fieldName, date?.$d);
  };

  const validDate = (value) => {
    if (dayjs(value).isValid()) return true;

    return false;
  };

  React.useEffect(() => {
    setValue("final_date", dayjs(new Date()));
    setValue("initial_date", dayjs(new Date()));
  }, []);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: 1100,
              width: "95%",
              maxHeight: 700,
              bgcolor: "background.paper",
              boxShadow: 24,

              "@media (min-width: 1200px)": {
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "2rem",
                bgcolor: "#232120",
                height: "2.5rem",
                width: "100%",
              }}
            >
              <Typography
                color="#f05123"
                variant="h2"
                fontSize="1.3rem"
                fontWeight="700"
              >
                Criar Demanda
              </Typography>

              <IconButton onClick={handleClose}>
                <CloseIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>

            <form
              style={{ height: "100%", padding: "2rem" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
                fullWidth
              >
                <Box display="flex" flexDirection="column">
                  <TextField
                    sx={{ mb: "0.4rem" }}
                    label="Nome"
                    {...register("name", {
                      required: "Digite um nome",
                    })}
                    onChange={(e) => setValue("name", e.target.value)}
                    id="my-input"
                    aria-describedby="my-helper-text"
                  />
                  <ErrorMessage errors={errors} name={`name`} />
                </Box>

                <Grid container spacing={10}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={6}>
                      <Controller
                        name="initial_date"
                        control={control}
                        rules={{
                          required: "Insira uma data valida",
                          validate: () =>
                            validDate(getValues("initial_date")) == true,
                        }}
                        render={({ field }) => (
                          <DatePicker
                            sx={{ width: "100%" }}
                            {...field}
                            format="DD-MM-YYYY"
                            label="Data inicial"
                            onChange={(date) =>
                              handleDateChange(date, "initial_date")
                            }
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name={`initial_date`}
                        message="Data invalida"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name="final_date"
                        rules={{
                          required: "Insira uma data valida",
                          validate: () =>
                            validDate(getValues("final_date")) == true,
                        }}
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            sx={{ width: "100%" }}
                            {...field}
                            format="DD-MM-YYYY"
                            label="Data Final"
                            onChange={(date) =>
                              handleDateChange(date, "final_date")
                            }
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name={`final_date`}
                        message="Data invalida"
                      />
                    </Grid>
                  </LocalizationProvider>
                </Grid>

                <Box
                  sx={{
                    maxHeight: 170,
                    overflow: "auto",
                    height: "100%",
                  }}
                  display="flex"
                  flexDirection="column"
                  gap="0.8rem"
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      mt={0}
                      color="#f05123"
                      variant="h3"
                      fontSize="1.3rem"
                      fontWeight="700"
                    >
                      Lista de produtos
                    </Typography>
                    <Button
                      sx={{
                        padding: "0.4rem 0",
                        bgcolor: "#2D2D2C",
                        color: "#fff",
                        transition: "all ease 0.3s",
                        fontWeight: "800",
                        mr: "1rem",
                      }}
                      onClick={addField}
                    >
                      +
                    </Button>
                  </Box>

                  {fields.map((field, index) => (
                    <Grid
                      pt="0.5rem"
                      container
                      display="flex"
                      justifyContent="space-between"
                      key={index}
                    >
                      <Grid item xs={3.5}>
                        <FormControl fullWidth variant="standard">
                          <TextField
                            label="SKU"
                            {...register(`fields.${index}.sku`, {
                              required: "O Item deve ter um SKU valido",
                            })}
                            sx={{ mr: 1, mb: "0.4rem" }}
                            id={`sku-${index}`}
                            value={field.sku}
                            onChange={(e) => {
                              const updatedFields = [...fields];
                              updatedFields[index].sku = e.target.value;
                              setFields(updatedFields);
                            }}
                          />
                        </FormControl>
                        <ErrorMessage
                          errors={errors}
                          name={`fields.${index}.sku`}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl fullWidth variant="standard">
                          <TextField
                            label="Descrição"
                            sx={{ mr: 1, mb: "0.4rem" }}
                            id={`descricao-${index}`}
                            {...register(`fields.${index}.descricao`, {
                              required:
                                "O item deve ter uma descrição com no maximo 40 caracteres",
                              maxLength: 40,
                            })}
                            value={field.descricao}
                            onChange={(e) => {
                              const updatedFields = [...fields];
                              updatedFields[index].descricao = e.target.value;
                              setFields(updatedFields);
                            }}
                          />
                        </FormControl>
                        <ErrorMessage
                          errors={errors}
                          name={`fields.${index}.descricao`}
                        />
                      </Grid>

                      <Grid item xs={3.5}>
                        <FormControl fullWidth variant="standard">
                          <TextField
                            label="Total Plan (Tons)"
                            {...register(`fields.${index}.tons`, {
                              required: "O item deve ter um valor valido",
                            })}
                            type="number"
                            sx={{ mr: 1, mb: "0.4rem" }}
                            id={`tons-${index}`}
                            value={field.tons}
                            onChange={(e) => {
                              const updatedFields = [...fields];
                              updatedFields[index].tons = e.target.value;
                              setFields(updatedFields);
                            }}
                          />
                        </FormControl>
                        <ErrorMessage
                          errors={errors}
                          name={`fields.${index}.tons`}
                        />
                      </Grid>

                      <Grid
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        item
                        xs={1}
                      >
                        <IconButton onClick={() => removeField(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>

                      <input
                        {...register(`fields.${index}.id`)}
                        defaultValue={field.id}
                        type="hidden"
                      />
                    </Grid>
                  ))}
                </Box>

                <Box
                  mt="1rem"
                  display="flex"
                  justifyContent="end"
                  alignItems="center"
                >
                  <Button
                    sx={{
                      bgcolor: "#4D9937",
                      padding: "0.7rem 1.5rem",
                      color: "#fff",
                      transition: "all ease 0.3s",
                    }}
                    type="submit"
                  >
                    Salvar
                  </Button>
                </Box>
              </FormControl>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateModal;
