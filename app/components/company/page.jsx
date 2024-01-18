'use client'

import DashboardLayout from "@/app/(home)/layout";
import Link from "next/link";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { Box, Button, Card, FormControl, IconButton, InputLabel, Input, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, List, ListItem, ListItemButton, Checkbox, ListItemIcon, ListItemText, CardContent, CardHeader, Grid, styled, Divider, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicModal from "./basicmodal";
import { DetailModal } from "./detailmodal";
import { getBrands, getCompanies } from "@/app/data/api";

function createData(name, calories, fat, carbs, protein) {

  return { name, calories, fat, carbs, protein };
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Company() {

  const [open, setOpen, page, setPage] = React.useState(0);
  const [checked, setChecked] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const companies = await getCompanies();
            const brands = await getBrands();

            // Asociar marcas a empresas según la lógica de tu aplicación
            const dataWithBrands = companies.map((company) => ({
                ...company,
                brands: brands.filter((brand) => brand.id_company === company.id),
            }));

            setData(dataWithBrands);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);
  console.log("Esto tiene data", data);
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
                    {data.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.id_country}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} alignItems="center">
                          {row.brands.map((brand) => (<Chip label= {brand.name } style={{ backgroundColor: 'honeydew', color: 'green', borderColor: 'green' }} size="small" variant="outlined" />))}
                          </Stack>
                        </TableCell>
                        <TableCell align="right">Panama</TableCell>
                        <TableCell align="right"><BasicModal /></TableCell>
                        <TableCell align="right">
                          <React.Fragment>
                            <Button style={{ backgroundColor: "#03386a" }} onClick={handleOpen}>
                              <DeleteOutlineIcon />
                            </Button>
                            <Dialog
                              open={open}
                              TransitionComponent={Transition}
                              keepMounted
                              onClose={handleClose}
                              aria-describedby="alert-dialog-slide-description"
                            >
                              <DialogTitle>
                                {"Desea eleminar esta empresa?"}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                  Al eliminar esta empresa se eliminaran todas las configuraciones relacionadas a ella.<br />
                                  Esta seguro de continuar?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose}>Si</Button>
                                <Button onClick={handleClose}>No</Button>
                              </DialogActions>
                            </Dialog>
                          </React.Fragment>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
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
