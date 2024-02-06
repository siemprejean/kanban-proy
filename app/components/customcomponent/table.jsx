import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import PropTypes from 'prop-types';
const MuiTable = ({ columns, body, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, count }) => {
    return (
        <Paper sx={{ width: '100%', margin: 0, padding: '20px' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ backgroundColor: 'ghostwhite', border: 'inset' }}>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell key={index} style={{ fontWeight: 'bold' }} align={column.align || 'left'}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {body}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => handleChangePage(event, newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

MuiTable.PropTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          field: PropTypes.string.isRequired,
          align: PropTypes.oneOf(['left', 'center', 'right']),
          render: PropTypes.func,
        })
      ).isRequired,
      body: PropTypes.node.isRequired,
      rowsPerPage: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired,
      //handleChangePage: PropTypes.func.isRequired,
      //handleChangeRowsPerPage: PropTypes.func.isRequired,
}
export default MuiTable;