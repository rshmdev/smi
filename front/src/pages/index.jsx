import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DemandTable from "@/components/demands-table";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CreateModal from "@/components/create-demand";
import EditModal from "@/components/edit-demand";
import { useDispatch } from "react-redux";
import { fetchDemands } from "@/actions/demands";
import { ToastContainer } from "react-toastify";

import AddIcon from "@mui/icons-material/Add";

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);

  const handleEditClick = (id) => {
    setEditingItemId(id);
    setEditOpen(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDemands());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Latinhas LLC</title>
        <meta name="description" content="demandas de produção de latinhas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={`${styles.main} `}>
          <Box mt="2.5rem">
            <Typography fontWeight="600" variant="h1" fontSize="2rem">
              DEMANDAS DE PRODUÇÃO DE LATINHAS
            </Typography>

            <Button
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#D86536",
                mt: "1rem",
                padding: "0.7rem 1.2rem",
                color: "#fff",
                ":hover": {
                  bgcolor: "#f05123",
                },
              }}
              onClick={() => setOpen(true)}
            >
              Adicionar
            </Button>
          </Box>

          <Box mt="1.3rem">
            <DemandTable
              setEditOpen={setEditOpen}
              handleEditClick={handleEditClick}
            />
          </Box>

          <CreateModal open={open} setOpen={setOpen} />
          <EditModal
            open={editOpen}
            setOpen={setEditOpen}
            info={info}
            editingItemId={editingItemId}
            setInfo={setInfo}
            setEditingItemId={setEditingItemId}
          />
        </main>
        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}
