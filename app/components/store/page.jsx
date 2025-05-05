'use client'
import DashboardLayout from "../home/layout";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CardHeader from '@mui/material/CardHeader';
import { Button, Card, FormControl, IconButton,MenuItem, InputLabel, Paper, TableCell, TableRow, CardContent, styled, Divider, Stack, Chip, DialogContentText, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import MuiModal from "../customcomponent/modal";
import MuiTable from "../customcomponent/table";
import MuiSelect from "../customcomponent/Select";
import MuiTextField from "../customcomponent/formcontrol";
import {getStores, postStore, putStore, getStore, getBrands } from "@/app/data/api";
import MuiDialog from "../customcomponent/dialog";
import { VerifiedOutlined } from "@mui/icons-material";
import { useRef} from "react";
import FormHelperText from '@mui/material/FormHelperText';


import 'styles/theme/components/_card.scss';
import 'styles/theme/components/_button.scss';
import 'styles/theme/components/_modal.scss';

export default function Store() {
    useEffect(() => {
        fetchData();
    },[]);

    const [open, setOpen] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [detail, setDetail] = useState([]);
    const [storeName, setstoreName] = useState('');
    const [storeIdBrand, setstoreIdBrand] = useState(0);
    const [updatestores, setUpdatestoresname] = useState('');
    const [updateComission, setUpdateComission] = useState('');
    const [storeComission, setstoreComission] = useState('');
    const [updateRetention, setUpdateRetention] = useState('');
    const [storeRetention, setstoreRetention] = useState('');
    const [updateExceed, setUpdateExceed] = useState('');
    const [storeExceed, setstoreExceed] = useState('');
    const [updateIncentive, setUpdateIncentive] = useState('');
    const [storeIncentive, setstoreIncentive] = useState('');
    const [storeicgBrand, seticgBrand] = useState('');
    const [storeicgSerie, seticgSerie] = useState('');
    const [updateicgBrand, setUpdateicgBrand] = useState('');
    const [updateicgSerie, setUpdateicgSerie] = useState('');
    const [updateBrandId, setUpdateBrandId] = useState('');
    const [preselectedItems, setPreselectedItems] = useState('');
    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [datap, setDatap] = useState([]);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const modalRef = useRef(null);

    const combinedData = data.filter((store) =>
        store.store_name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const filteredData = data.filter((store) =>
        store.store_name.toLowerCase().includes(searchTerm.toLowerCase())
      );           

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCloseSuccessModal = () => { setSuccessModalOpen(false); closeModal(); closeModalCreate() };
    const handleClose = () => setOpen(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const openModalCreate = () => setModalCreateOpen(true);
    const closeModalCreate = () => setModalCreateOpen(false);
    const activeBrandId = preselectedItems || updateBrandId; // if you're managing a single ID
    const selectedBrand = datap.find((brand) => brand.id === activeBrandId);
    
    const columnsTable = [{ label: 'ID', field: 'id' },
    { label: 'Tiendas', field: 'stores', render: (row) => row.brands.join(', ') },
    { label: '', field: '' },
    { label: '', field: '' }];

    //Estilos
    const listStyles = {
        display: 'contents',
        margin: 1,
        flex: "auto",
        right: '10%',
        width: '75%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        // p: 4
    };     

    const modalStyles = {
        position: 'absolute',
        margin: 1,
        flex: "auto",
        right: '10%',
        width: '75%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };
    
    const Styledbuttons = styled(Button)`
        background-color: #03386a;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;  
        &:hover {
        background-color: #0457a0;
        transform: scale(1.05);
        }
        `;

    const handleChangePage = (event, newPage) => {
        event.preventDefault();
        setPage(newPage);
    };

    const timeoutModal = async (val) => {
        if (val === 1) {
          setMessage("Tienda creada exitosamente!!");
          setTimeout(() => closeModalCreate(), 2000);
        } else {
          setMessage("Tienda actualizada exitosamente!!");
          setTimeout(() => closeModal(), 2000);
        }
      
        setSuccessModalOpen(true);
        setTimeout(() => setSuccessModalOpen(false), 2000);
    }; 

    const handleChangeRowsPerPage = (event) => {
        event.preventDefault();
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCancelCreate = () => {
        setstoreName('');
        setstoreIdBrand('');
        setstoreComission('');
        setstoreExceed('');
        setstoreIncentive('');
        setstoreRetention('');
        seticgBrand('');
        seticgSerie('');
        closeModalCreate();
        setErrors({
            storeName: '',
            storeIdBrand: '',
            storeComission: '',
            storeRetention: '',
            storeExceed: '',
            storeIncentive: '',
            storeicgBrand: '',
            storeicgSerie: ''
          });
    };

    const handleRowClick = async (storeId) => {
        try {
            console.log('storeId:', storeId);
            await fetchDetail(storeId); // Obtener detalles de la empresa
            openModal(); // Abrir el modal después de obtener los detalles
        } catch (error) {
            console.error('Error fetching brand details:', error);
        }
    };

    const [errors, setErrors] = useState({
        storeName: '',
        storeIdBrand: '',
        storeComission: '',
        storeRetention: '',
        storeExceed: '',
        storeIncentive: '',
        storeicgBrand: '',
        storeicgSerie: ''
      });      

    const validateFields = () => {
        const newErrors = {
          storeName: '',
          storeIdBrand: '',
          storeComission: '',
          storeRetention: '',
          storeExceed: '',
          storeIncentive: '',
          storeicgBrand: '',
          storeicgSerie: ''
        };
      
        if (!storeName.trim()) {
          newErrors.storeName = 'Debe colocar un nombre.';
        } else if (storeName.length > 50) {
          newErrors.storeName = 'Máximo 50 caracteres.';
        }

        if (!storeIdBrand) {
            newErrors.storeIdBrand = 'Debe seleccionar una marca.';
        }
      
        if (!storeComission) {
          newErrors.storeComission = 'Debe seleccionar un tipo de comision.';
        }
      
        const isNumber = (val) => /^-?\d*\.?\d+$/.test(val); // At least one digit
      
        if (!storeRetention.trim()) {
          newErrors.storeRetention = 'Este campo es requerido.';
        } else if (!isNumber(storeRetention)) {
          newErrors.storeRetention = 'Debe ser un número.';
        }
      
        if (!storeExceed.trim()) {
          newErrors.storeExceed = 'Este campo es requerido.';
        } else if (!isNumber(storeExceed)) {
          newErrors.storeExceed = 'Debe ser un número.';
        }
      
        if (!storeIncentive.trim()) {
          newErrors.storeIncentive = 'Este campo es requerido.';
        } else if (!isNumber(storeIncentive)) {
          newErrors.storeIncentive = 'Debe ser un número.';
        }

        if (!storeicgBrand.trim()) {
            newErrors.storeicgBrand = 'Este campo es requerido.';
        }

        if (!storeicgSerie.trim()) {
            newErrors.storeicgSerie = 'Este campo es requerido.';
        }
      
        setErrors(newErrors);
        return Object.values(newErrors).every((e) => e === '');
      };        

    const fetchData = async () => {
        try {
            const storesd = await getStores();
            const brands = await getBrands();
            // Asociar tiendas a marca

            setData(storesd);
            setDatap(brands);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            modalRef.current &&
            !modalRef.current.contains(event.target) &&
            !event.target.closest('.MuiPopover-root') // Adjust this selector based on your UI library
          ) {
            // Prevent the default action and stop propagation
            event.preventDefault();
            event.stopPropagation();
            // Optionally, you can close the modal here if that's the intended behavior
            // handleCloseModal();
          }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    const handleChangeBrand = async (event) => {
        const selectedBrand = parseInt(event.target.value, 10);
        setstoreIdBrand(selectedBrand);
        console.log("esto tiene selectedBrand", selectedBrand);
    };  
      

    const fetchDetail = async (id) => {
        try {
            const storesd = await getStore(id);
                // Asociar tiendas a marca
                setDetail(storesd);
                setUpdatestoresname(storesd.store_name);
                setUpdateComission(storesd.incentive_type);
                setUpdateExceed(storesd.surplus?.toString() ?? "");
                console.log(updateExceed)
                setUpdateIncentive(storesd.incentive_sunday?.toString() ?? "");
                console.log(updateIncentive)
                setUpdateRetention(storesd.retention?.toString() ?? "");
                console.log(updateRetention)
                setUpdateicgBrand(storesd.icg_brand)
                setUpdateicgSerie(storesd.icg_serie)
                setPreselectedItems(storesd.brand_id);
            console.log("Esto tiene info", detail);
        } catch (error) {
            console.error('Error fetching data:', error);
            }
    }

    async function onSubmit() {
        //event.preventDefault();
        try {
            const storeComissionValue = storeComission === "local" ? "1" : storeComission === "global" ? "2" : null;
            // Llamar a la función en api/empresas.js para crear una nueva empresa
            let responseData = await postStore({
                store_name: storeName.toUpperCase(),
                slug: storeName.toUpperCase(),
                retention: Number(storeRetention),
                surplus: Number(storeExceed),
                incentive_sunday: Number(storeIncentive),
                icg_brand: storeicgBrand,
                icg_serie: storeicgSerie,
                brand_id: Number(preselectedItems),
                incentive_type: Number(storeComissionValue),
                store_status: 1
            });
            console.log("Esto tiene responseData ", responseData)
            // La empresa se creó exitosamente, puedes realizar acciones adicionales si es necesario
            timeoutModal(1);
            fetchData();
        } catch (error) {
            // Manejar errores en caso de que la creación falleç
            console.error('Error al crear la tienda:', error.message);
        }
    }

    async function updateZtore(id) {
        //event.preventDefault();
        try {
          console.log("Esto tiene id: ", id)
          console.log("Esto tiene responseData ", {
            store_name: updatestores.toUpperCase(),
            brand_id: Number(preselectedItems),
            retention: Number(updateRetention),
            surplus: Number(updateExceed),
            incentive_sunday: Number(updateIncentive),
            incentive_type: Number(updateComission),
            icg_brand: updateicgBrand,
            icg_serie: updateicgSerie,
          })
          // Llamar a la función en api/empresas.js para crear una nueva empresa
          let responseData = await putStore({
            store_name: updatestores.toUpperCase(),
            brand_id: Number(preselectedItems),
            retention: Number(updateRetention),
            surplus: Number(updateExceed),
            incentive_sunday: Number(updateIncentive),
            incentive_type: Number(updateComission),
            icg_brand: updateicgBrand,
            icg_serie: updateicgSerie
          }, id);
          console.log("Esto tiene responseData ", responseData)
          timeoutModal();
          fetchData();
        }catch (error) {
        // Manejar errores en caso de que la creación falleç
        console.error('Error al crear la actualizar la tienda:', error.message);
        }
    }    

    const titledialogSucces = (<>
        <h4><VerifiedOutlined /> REGISTRO EXITOSO</h4>
        <Divider className="divider" />
    </>
    );

    
    const titledialogSuccesedit = (<>
        <h4><VerifiedOutlined /> ACTUALIZACION EXITOSA</h4>
        <Divider className="divider" />
    </>
    );

    const contentDialogSucces = (
        <DialogContentText style={{ color: "black" }}>
            {message}
        </DialogContentText>);

        //MODAL CREACION TIENDA
    const modalCreate = (
        <div ref={modalRef} className="modal-content">  
            <MuiTextField title="Nombre de la Tienda:" value={storeName} onChange={(e) => setstoreName(e.target.value)} type="text" className="modal-col-6" error={!!errors.storeName} helperText={errors.storeName}/>
            <FormControl className="modal-col-6" style={{top: 25}} error={!!errors.storeIdBrand}>
                <InputLabel id="brand-label" style={{top: 5 ,left: 10 }} >Marca</InputLabel>
                    <Select
                    labelId="brand-label"
                    value={storeIdBrand ?? ''}
                    onChange={handleChangeBrand}
                    >
                {datap.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                    {brand.name}
                    </MenuItem>
                ))}
            </Select>
                {errors.storeIdBrand && (
                <FormHelperText>{errors.storeIdBrand}</FormHelperText>
                )}
            </FormControl>
            <FormControl className="modal-col-6" style={{ top: 25 }} error={!!errors.storeComission}>
                <InputLabel id="tipo-comision-label" style={{ top: 5, left: 15 }}>Tipo de Comision</InputLabel>
                    <Select
                    labelId="tipo-comision-label"
                    value={storeComission}
                    onChange={(e) => setstoreComission(e.target.value)}
                    label="Tipo de Comision"
                    >
                        <MenuItem value="local">Local</MenuItem>
                        <MenuItem value="global">Global</MenuItem>
                    </Select>
                {errors.storeComission && <FormHelperText>{errors.storeComission}</FormHelperText>}
            </FormControl>
            <MuiTextField title="%Retencion" values={storeRetention} onChange={(e) => setstoreRetention(e.target.value)} type="text" className="modal-col-6" error={!!errors.storeRetention} helperText={errors.storeRetention}/>
            <MuiTextField title="%Excedente" values={storeExceed} onChange={(e) => setstoreExceed(e.target.value)} type="text" className="modal-col-6" error={!!errors.storeExceed} helperText={errors.storeExceed}/>
            <MuiTextField title="%Incentivo de Domingos" values={storeIncentive} onChange={(e) => setstoreIncentive(e.target.value)} type="text" className="modal-col-6" error={!!errors.storeIncentive} helperText={errors.storeIncentive}/>
            <MuiTextField title="ICG Brand" values={storeicgBrand} onChange={(e) => seticgBrand(e.target.value)} type="text" className="modal-col-6" error={!!errors.storeicgBrand} helperText={errors.storeicgBrand}/>
            <MuiTextField title="ICG Serie" values={storeicgSerie} onChange={(e) => seticgSerie(e.target.value)} type="text" className="modal-col-6" error={!!errors.storeicgSerie} helperText={errors.storeicgSerie}/>
            <Row style={{ width: "100%" }}>
                <Col className="modal-col-btn">
                <Button onClick={() => {
                    if (validateFields()) {
                        onSubmit();
                    }
                    }}>
                    <SaveIcon /> GUARDAR
                </Button>
                    <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSucces} content={contentDialogSucces} className="modal-dialog-container" />
                </Col>
            </Row>
        </div>
    );
        //MODAL EDICION TIENDA
    const modalContent = (
        <div ref={modalRef} className="modal-content">
            <MuiTextField title="Nombre de la Tienda:" value={updatestores} onChange={(e) => setUpdatestoresname(e.target.value)} className="modal-col-6" />
            <MuiSelect title="Marca" items={datap} values={activeBrandId} onChange={(value) => setPreselectedItems(parseInt(value, 10))} className="modal-col-6" />
            <FormControl className="modal-col-6" style={{ top: 25 }}>
                <InputLabel id="tipo-comision-label" style={{ top: 5, left: 15 }}>Tipo de Comision</InputLabel>
                <Select
                    value={updateComission === 1 ? "local" : updateComission === 2 ? "global" : ""}
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        const numericValue = selectedValue === "local" ? 1 : selectedValue === "global" ? 2 : 0;
                    setUpdateComission(numericValue);
                    }}
                >
                <MenuItem value="local">Local</MenuItem>
                <MenuItem value="global">Global</MenuItem>
                </Select>
            </FormControl>
            <MuiTextField title="%Retencion" value={updateRetention} onChange={(event) => setUpdateRetention(parseInt(event))} className="modal-col-6" />
            <MuiTextField title="%Excedente" value={updateExceed} onChange={(event) => setUpdateExceed(parseInt(event))} className="modal-col-6" />
            <MuiTextField title="%Incentivo de Domingos" value={updateIncentive} onChange={(event) => setUpdateIncentive(parseInt(event))} className="modal-col-6" />
            <MuiTextField title="ICG Brand" value={updateicgBrand} onChange={(e) => seticgBrand(e.target.value)} type="text" className="modal-col-6" />
            <MuiTextField title="ICG Serie" value={updateicgSerie} onChange={(e) => seticgSerie(e.target.value)} type="text" className="modal-col-6" />
            <Row style={{ width: "100%" }}>
                <Col className="modal-col-btn">
                    <Button onClick={() => {updateZtore(detail.id)
                    }}>
                        <SaveIcon /> GUARDAR
                    </Button>
                    <MuiDialog open={successModalOpen} onClose={handleCloseSuccessModal} title={titledialogSuccesedit} content={contentDialogSucces} className="modal-dialog-container" />
                </Col>
            </Row>
        </div>
    );
//TABLA DE TIENDAS
const body = (
    <>
      {filteredData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((store) => (
          <TableRow key={store.id}>
            <TableCell align="left">{store.id}</TableCell>
  
            <TableCell align="left">
              <Chip
                label={store.store_name}
                className="badge"
                style={{
                  backgroundColor: 'honeydew',
                  color: 'green',
                  borderColor: 'green',
                }}
                size="small"
                variant="outlined"
              />
            </TableCell>
  
            <TableCell align="center" className="button-td">
              <Button
                className="edit-button-g"
                onClick={() => handleRowClick(store.id)}
              >
                <EditIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
  
      <MuiModal
        open={isModalOpen}
        onClose={closeModal}
        title="EDITAR TIENDA"
        content={modalContent}
        customStyles={modalStyles}
      />
    </>
  );  

    //SEARCH Y BOTON CREAR
    return (
        <>
            <DashboardLayout className="justify-content-center">
                <Card className="card-configuraciones">
                    <CardHeader className="card-header"
                        title={<h3> Configuración de Tienda </h3>}
                        subheader={
                            <Row className="card-config-header">
                                <div className="card-config-header-left">
                                    <Form className="card-config-search position-relative" style={{ width: "40%", marginLeft: "20px" }}>
                                        <Form.Control type="search" placeholder="Search" onChange={handleSearch} />
                                    </Form>
                                </div>
                                <div className="card-header-buttons-company">
                                    <Styledbuttons style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "100%", color: "HighlightText", flex: "auto" }} onClick={() => {openModalCreate() }}>
                                        <AddIcon /> CREAR
                                    </Styledbuttons>
                                    <MuiModal
                                        open={isModalCreateOpen}
                                        onClose={()=>{
                                            closeModalCreate();
                                            handleCancelCreate();
                                        }}
                                        title="CREAR TIENDA"
                                        content={modalCreate}
                                        customStyles={modalStyles}
                                    />
                                </div>
                            </Row>
                        }
                    />
                    <Divider className="divider" />
                    <CardContent className="card-content">
                        <MuiTable columns={columnsTable} body={body} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={data.length} />
                    </CardContent>
                </Card >
            </DashboardLayout >
        </>
    );
}