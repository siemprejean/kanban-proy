// import node module libraries
import Link from 'next/link';
import { ProgressBar, Col, Row, Card, Table, Image } from 'react-bootstrap';

// import required data files
import ActiveProjectsData from "@/app/data/ActiveProjectsData";

const ActiveProjects = () => {
    return (
        <Row className="mt-6">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">Top Selling Products</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Nombre</th>
                                <th>Ventas</th>
                                <th>Estatus</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ActiveProjectsData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`} style={{ borderRadius: '50% !important', overflow: 'hidden' }}>
                                                        <Image src={item.brandLogo} alt="" width={49} height={49} />
                                                    </div>
                                                </div>
                                                <div className="ms-3 lh-1">
                                                    <h5 className=" mb-1">
                                                        <Link href="#" className="text-inherit">{item.projectName}</Link></h5>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">{item.hours}</td>
                                        <td className="align-middle"><span className={`badge bg-${item.priorityBadgeBg}`}>{item.priority}</span></td>
                                        <td className="align-middle text-dark">
                                            <div className="float-start me-3">{item.progress}%</div>
                                            <div className="mt-2">
                                                <ProgressBar now={item.progress} style={{ height: '5px' }} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card>
            </Col>
        </Row>
    )
}

export default ActiveProjects