import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import { deleteDemand } from "@/actions/demands";
import { toast } from "react-toastify";

const columns = [
  { id: "skus", label: "SKUs", minWidth: 100, align: "center" },
  {
    id: "total_plan",
    label: "Total Plan (Tons)",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "total_prod",
    label: "Total Prod (Tons)",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const DemandTable = ({ handleEditClick }) => {
  const demands = useSelector((state) => state.demands);
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id) => {
    dispatch(deleteDemand(id));
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        sx={{
          maxHeight: "60vh",
          "@media(max-width: 768px)": {
            maxHeight: "50vh",
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ minWidth: 10, bgcolor: "#DFDFDF" }}
              >
                Editar
              </TableCell>
              <TableCell
                align="center"
                sx={{ minWidth: 10, bgcolor: "#DFDFDF" }}
              >
                Remover
              </TableCell>

              <TableCell
                align="center"
                sx={{ minWidth: 160, bgcolor: "#DFDFDF" }}
              >
                Periodo
              </TableCell>

              {columns.map((column) => (
                <TableCell
                  sx={{ bgcolor: "#DFDFDF" }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}

              <TableCell
                align="center"
                sx={{ minWidth: 10, bgcolor: "#DFDFDF" }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demands?.length > 0 &&
              demands
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((demand, idx) => {
                  const formatted_initial_date = dayjs(
                    demand?.initial_date
                  ).format("DD/MM/YYYY");
                  const formatted_final_date = dayjs(demand?.final_date).format(
                    "DD/MM/YYYY"
                  );

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                      <TableCell align="center">
                        <IconButton onClick={() => handleEditClick(demand.id)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>

                      <TableCell align="center">
                        <IconButton onClick={() => handleDelete(demand.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>

                      <TableCell sx={{ minWidth: 170 }} align="center">
                        {formatted_initial_date} - {formatted_final_date}
                      </TableCell>

                      {columns.map((column) => {
                        const value = demand[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}

                      {demand.total_prod === demand.total_plan ||
                      demand.total_prod > demand.total_plan ? (
                        <TableCell
                          sx={{ minWidth: 170, bgcolor: "#E3FEDE" }}
                          align="center"
                        >
                          Concluído
                        </TableCell>
                      ) : demand.total_prod === 0 ? (
                        <TableCell
                          sx={{ minWidth: 170, bgcolor: "#DFDFDF" }}
                          align="center"
                        >
                          Planejamento
                        </TableCell>
                      ) : (
                        <TableCell
                          sx={{ minWidth: 170, bgcolor: "#CFF1FD" }}
                          align="center"
                        >
                          Em andamento
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        rowsPerPage={rowsPerPage}
        count={demands?.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DemandTable;
