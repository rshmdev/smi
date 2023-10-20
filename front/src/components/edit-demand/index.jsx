import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DemandItems from "../demand-items";
import { useDispatch, useSelector } from "react-redux";
import { updateDemand } from "@/actions/demands";

export default function EditModal({
  open,
  setOpen,
  info,
  editingItemId,
  setInfo,
  setEditingItemId,
}) {
  const dispatch = useDispatch();

  const demands = useSelector((state) => state.demands);

  const handleClose = async () => {
    await setOpen(false);
  };

  const handleModalExited = () => {
    reset();
    remove(0);
    setEditingItemId(null);
  };

  const initial_date = info?.initial_date;
  const final_date = info?.final_date;

  const formatted_initial_date = dayjs(initial_date).format("DD/MM/YYYY");
  const formatted_final_date = dayjs(final_date).format("DD/MM/YYYY");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
    keyName: "id",
  });

  React.useEffect(() => {
    setInfo(demands?.find((item) => item.id === editingItemId));
  }, [editingItemId]);

  React.useEffect(() => {
    if (info && editingItemId) {
      const parsedItems = JSON.parse(info?.itens);
      append(parsedItems);
    }
  }, [info, editingItemId]);

  const onSubmit = async (data) => {
    try {
      dispatch(updateDemand(info.id, data));

      handleClose();
    } catch (error) {
      toast.error("Erro ao processar os dados");
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        onTransitionExited={handleModalExited}
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
              maxWidth: "1200px",
              width: "90%",

              maxHeight: "750px",
              heigth: "100%",
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
                Editar Demandas
              </Typography>

              <IconButton onClick={handleClose}>
                <CloseIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap="0.5rem"
              padding="2rem"
            >
              <Typography
                color="#f05123"
                variant="h3"
                maxWidth="40ch"
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize="1.3rem"
                fontWeight="700"
              >
                {info?.name}
              </Typography>

              <Typography
                mb="1rem"
                variant="caption"
                fontSize="1rem"
                fontWeight="500"
              >
                {formatted_initial_date} - {formatted_final_date}
              </Typography>

              <DemandItems
                register={register}
                fields={fields}
                remove={remove}
              />

              <Box mt="1rem" display="flex" gap="1.2rem" justifyContent="end">
                <Button
                  onClick={() => handleClose()}
                  sx={{
                    bgcolor: "#AE4340",
                    color: "#fff",
                    padding: "0.5rem 0.9rem",
                    ":hover": {
                      bgcolor: "#a33734", // theme.palette.primary.main
                    },
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => handleSubmit(onSubmit)()}
                  sx={{
                    bgcolor: "#4D9937",
                    color: "#fff",
                    padding: "0.5rem 0.9rem",
                    ":hover": {
                      bgcolor: "#fcbd73", // theme.palette.primary.main
                    },
                  }}
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
