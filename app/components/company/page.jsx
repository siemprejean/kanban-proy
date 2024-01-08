'use client'

import DashboardLayout from "@/app/(home)/layout";
import Link from "next/link";
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { Box, Button, Card, FormControl, IconButton, InputLabel, Input, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, List, ListItem, ListItemButton, Checkbox, ListItemIcon, ListItemText, CardContent, CardHeader, Grid, styled, Divider, Stack, Chip } from "@mui/material";
import React from "react";
import BasicModal from "./basicmodal";
import { DetailModal } from "./detailmodal";
import { Col, Row } from "react-bootstrap";
//import { DetailModal } from "./detailmodal";
//import DetailModal from "./detailmodal";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 'Frozen yoghurt', 4.0),
  createData('Ice cream sandwich', 237, 9.0, 'Frozen yoghurt', 4.3),
  createData('Eclair', 262, 16.0, 'Frozen yoghurt', 6.0),
  createData('Cupcake', 305, 3.7,'Frozen yoghurt', 4.3),
  createData('Gingerbread', 356, 16.0, 'Frozen yoghurt', 3.9),
];

export default function Company() {

  const [open, setOpen, page, setPage] = React.useState(0);
  const [checked, setChecked] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleOpen = () => setOpen(true);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [name, setName] = React.useState('Cat in the Hat');

  return (
    <>
      <DashboardLayout className="justify-content-center">
        <Card className="align-items-center justify-content-center g-0 min-vh-100 ">
          <div className='d-flex justify-content-between w-100 m-2'>
            <div className="d-flex align-items-center">
              <Link href="/">
                <ArrowBackIcon size="18px" />
              </Link>
              <div className="ms-lg-3 d-none d-md-none d-lg-block">
                {/* Search Form */}
                <h3 style={{ fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                  Configuración de Empresas
                </h3>
              </div>
            </div>
          </div>
          <Divider style={{ border: 'double' }} />
          <CardContent className="p-6" style={{ justifyContent: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Item>
                    <FormControl variant="outlined" style={{ width: "100%" }}>
                      <Input style={{ backgroundColor: 'ghostwhite', borderRadius: "10px" }} placeholder="Search" />
                      <SearchIcon style={{ width: "15%", right: 0, position: "absolute", margin: "5px", padding: "1px" }} />
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={2}>
                  <Item >
                    <DetailModal />
                  </Item>
                </Grid>
                <Grid item xs={2}>
                  <Item>
                    <Button style={{ borderRadius: "10px", backgroundColor: "gray", width: "100%", color: "HighlightText", flex: "auto" }}>
                      <DownloadIcon /> IMPORTAR
                    </Button>
                  </Item>
                </Grid>
              </Grid>
            </Box>

          </CardContent>
          <div style={{ height: 400, width: '100%', align: 'center' }}>
            <Paper sx={{ width: '100%', margin: 0, padding: '20px' }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead style={{ backgroundColor: 'ghostwhite', border: 'inset' }}>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>Fiscal Id</TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="right">Nombre</TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="right">No. Empleados</TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="right">Marcas</TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="right">Pais</TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="right"></TableCell>
                      <TableCell style={{ fontWeight: "bold" }} align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip label={row.carbs} style={{backgroundColor: 'honeydew', color: 'green', borderColor: 'green'}} size="small" variant="outlined" />
                          </Stack>
                        </TableCell>
                        <TableCell align="right">{row.protein} </TableCell>
                        <TableCell align="right"><BasicModal /></TableCell>
                        <TableCell align="right"><Button style={{ backgroundColor: "#03386a" }}><DeleteOutlineIcon /> </Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </Card>
      </DashboardLayout >
    </>
  );
}
