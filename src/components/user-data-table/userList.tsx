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
        <DataTable rows={rowsTable} headers={headers} useZebraStyles={true}  >
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
                    <>
                        <TableContainer {...getTableContainerProps()} >
                            <TableToolbar {...getToolbarProps()}>
                                <TableBatchActions {...batchActionProps}>
                                    <TableBatchAction
                                        tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                        renderIcon={TrashCan32}
                                        onClick={(e)=>(selectedRows)}>
                                        Delete
                                    </TableBatchAction>
                                    
                                    <TableBatchAction
                                        tabIndex={batchActionProps.shouldShowBatchActions ? 1 : 0}
                                        renderIcon={Save32}
                                        onClick={(e) => (selectedRows)}>
                                        Save
                                    </TableBatchAction>
                                    <TableBatchAction
                                        tabIndex={batchActionProps.shouldShowBatchActions ? 1 : 0}
                                        renderIcon={Download32}
                                        onClick={(e) => (selectedRows)}>
                                        Download
                                    </TableBatchAction>
                                </TableBatchActions>
                                <TableToolbarContent
                                    aria-hidden={batchActionProps.shouldShowBatchActions}>
                                    <TableToolbarSearch
                                        tabIndex={batchActionProps.shouldShowBatchActions ? 1 : 0}
                                        onChange={onInputChange}
                                    />
                                    <TableToolbarMenu
                                        tabIndex={batchActionProps.shouldShowBatchActions ? 1 : 0}>
                                        <TableToolbarAction onClick={() => alert('Alert ')}>
                                            Action
                                        </TableToolbarAction>
                                        <TableToolbarAction onClick={() => alert('Alert ')}>
                                            Action
                                        </TableToolbarAction>
                                        <TableToolbarAction onClick={() => alert('Alert ')}>
                                            Action
                                        </TableToolbarAction>
                                    </TableToolbarMenu>
                                    <Button
                                        tabIndex={batchActionProps.shouldShowBatchActions ? 1 : 0}
                                        onClick={(e) => alert('Alert ')}
                                        size="small"
                                        kind="primary">
                                        Add new
                                    </Button>
                                </TableToolbarContent>
                            </TableToolbar>
                            <TableContainer className={styles.table}>
                                <Table
                                    {...getTableProps()} size="md" >
                                    <TableHead className={styles.TableRowHeader} >
                                        <TableRow>
                                            <TableSelectAll {...getSelectionProps()} />
                                            {headers.map((header) => (
                                                <TableHeader key={header.key} {...getHeaderProps({ header, isSortable: true })}>
                                                    {header.header}
                                                </TableHeader>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className={styles.TableBody}>
                                        {rows.map((row, i) => (
                                            <TableRow className={styles.TableRow} key={row.id}  {...getRowProps({ row })} onClick={e => { onTableRowHandleClick(e, row) }} >
                                                <TableSelectRow {...getSelectionProps({ row })} />
                                                {row.cells.map((cell) => (
                                                    <>
                                                        <TableCell key={cell.id} children={
                                                            cell.id.split(':')[1] == 'deathDate' && (cell.value != undefined || '') ?
                                                                new Intl.DateTimeFormat(t("local", 'fr-FR'), { dateStyle: 'full' }).format(new Date(cell.value)) : cell.value
                                                        } />
                                                    </>
                                                ))}
                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TableContainer>
                        <div>
                            <div>
                                <Pagination
                                    backwardText={t("PreviousPage")}
                                    forwardText={t("NextPage")}
                                    itemsPerPageText={t("Show")}
                                    onChange={onPaginationChange}
                                    page={page}
                                    pageSize={pageSize}
                                    pageSizes={paginationPageSizes}
                                    size="sm"
                                    totalItems={totalpageSize}
                                />
                            </div>
                        </div>
                    </>
                )
            }
            }
        </DataTable>
    );
}

export default UserList;
