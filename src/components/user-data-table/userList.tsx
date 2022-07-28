import React from "react";
import styles from "./unvalided-death.scss";
import { useTranslation } from "react-i18next";
import { SearchInput, Toolbar_Button } from "./toolbar_search_container";
import { useState, useEffect } from "react";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import {
    DataTable, TableContainer, TableToolbar, TableBatchActions,
    TableBatchAction, TableToolbarContent, TableToolbarSearch, TableToolbarMenu,
    TableToolbarAction, Button, Table, TableHead, TableRow, TableSelectAll,
    TableHeader, TableBody, TableSelectRow, TableCell, Pagination
} from "carbon-components-react";
import { TrashCan32, Save32, Download32 } from '@carbon/icons-react';
import { getAllUserPages, getSizeUsers, getUsers } from "./getUser";

export interface DeathListProps {
    headers: { key: string; header: string; }[]
}
const UserList: React.FC<DeathListProps> = ({ headers }) => {

    const [rowsTable, setRows] = useState([]);
    const [totalpageSize, setTotalPageSize] = useState(1);
    const [[pageSize, page], setPaginationPageSize] = useState([5, 1]);
    const paginationPageSizes = [1, 5, 10, 20, 30, 40];
    const [[prev, next], setLink] = useState(['', '']);
    const { t } = useTranslation();
    const toDeclared: NavigateOptions = { to: window.spaBase + "/death/search" };


    function onTableRowHandleClick(e, rowSelected) {
        rowsTable.forEach(row => {
            const toValided: NavigateOptions = { to: window.spaBase + "/death/validate/patient/" + row.uuid };
            if (row.No_dossier == rowSelected.cells[0].value) {
                navigate(toValided)
            }
        })
    }
    useEffect(function () {
        changeRows(pageSize, 1);
        getSizeUsers().then(res => setTotalPageSize(res.data.results.length))

    }, []);

    function changeRows(size, page) {
        let start = ((page - 1) * size);
        start = start <= 1 ? 1 : start;
        setPaginationPageSize([size, page]);
        getAllUserPages(size, start)
            .then(response => response.data.results)
            .then(async json => getUsers(json).then(data => setRows(data)))
    }

    function onPaginationChange(e) {
        changeRows(e.pageSize, e.page);
    }
    return (
        <DataTable rows={rowsTable} headers={headers} useZebraStyles={true} >
            {({
                rows,
                headers,
                getHeaderProps,
                getRowProps,
                getSelectionProps,
                getToolbarProps,
                getBatchActionProps,
                onInputChange,
                selectedRows,
                getTableProps,
                getTableContainerProps,
            }) => {
                const batchActionProps = getBatchActionProps();

                return (
                    <TableContainer
                        {...getTableContainerProps()}>
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...batchActionProps}>
                                <TableBatchAction
                                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                    // renderIcon={TrashCan}
                                    onClick={(e) => (selectedRows)}>
                                    Delete
                                </TableBatchAction>
                                <TableBatchAction
                                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                    // renderIcon={Save}
                                    onClick={(e) => (selectedRows)}>
                                    Save
                                </TableBatchAction>
                                <TableBatchAction
                                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                    //renderIcon={Download}
                                    onClick={(e) => (selectedRows)}>
                                    Download
                                </TableBatchAction>
                            </TableBatchActions>
                        </TableToolbar>
                        <div className={styles.TableContainer}>
                            <div className={"bx--toolbar-content"}>
                                <SearchInput
                                    className={styles['search-1']}
                                    onChange={(e) => ((e.currentTarget.value.trim().length) > 0) && onInputChange(e)} />
                            </div>
                        </div>
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow>
                                    <TableSelectAll {...getSelectionProps()} />
                                    {headers.map((header, i) => (
                                        <TableHeader key={i} {...getHeaderProps({ header })}>
                                            {header.header}
                                        </TableHeader>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, i) => (
                                    <TableRow key={i} {...getRowProps({ row })}>
                                        <TableSelectRow {...getSelectionProps({ row })} />
                                        {row.cells.map((cell) => (
                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            }}
        </DataTable>
    );
}

export default UserList;
