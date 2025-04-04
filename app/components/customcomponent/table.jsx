import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import PropTypes from 'prop-types';
import 'styles/theme/components/_card.scss';
import 'styles/theme/components/_button.scss';
import 'styles/theme/components/_table.scss';

const MuiTable = ({ columns, body, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, count }) => {
    return (
        <Paper className="table-custom-container">
            <TableContainer component={Paper} >
                <Table id="table">
                    <TableHead>
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

/*MuiTable.PropTypes = {
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
}*/
export default MuiTable;