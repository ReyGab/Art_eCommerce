import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

import ActionMenu from '../../../../shared-components/action-menu';

const styles = {
    table: {
        minWidth: 700,
        maxHeight: 700,
    },
    cardDescription: {
        display: '-webkit-box',
        WebkitLineClamp: '1',
        WebkitBoxOrient: 'vertical',
        'overflow': 'hidden',
        textOverflow: 'ellipsis'
    }
}

class AdminList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            rowsPerpage: 15
        }
    }

    onPageChange(event, newPage) {
        const { nextPageProducts } = this.props;
        const statePage = newPage;
        let jsonPage = newPage;
        if(jsonPage >= 1 || newPage === 0) {
            jsonPage+=1;
        }
        if(this.state.page > jsonPage) {
            jsonPage-=1;
        }

        nextPageProducts(jsonPage);
        this.setState({
            page: statePage
        })
    }

    render() {
        const StyledTableCell = withStyles((theme) => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);

        const StyledTableRow = withStyles((theme) => ({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.action.hover,
                },
            },
        }))(TableRow);
        const { tableHeader, productList, actionMenuItems, productListCount } = this.props;
        return (
            <div>
                <TableContainer style={styles.table} component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {
                                    tableHeader.map((header, index) =>
                                        <StyledTableCell key={index} align="center">{header}</StyledTableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                productList.map((product) =>
                                (
                                    <StyledTableRow key={product.id}>
                                        <StyledTableCell >{product.name}</StyledTableCell>
                                        <StyledTableCell align="right">{product.price}</StyledTableCell>
                                        <StyledTableCell align="right">{product.stock_quantity}</StyledTableCell>
                                        <StyledTableCell align="right">{product.category_id}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Typography style={styles.cardDescription} paragraph color="textSecondary" component="p">
                                                {product.description}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <ActionMenu selectedProduct={product} menuItems={actionMenuItems} />

                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={productListCount}
                    rowsPerPage={this.state.rowsPerpage}
                    page={this.state.page}
                    onPageChange={this.onPageChange.bind(this)}
                />
            </div>

        )
    }
}

export default AdminList;