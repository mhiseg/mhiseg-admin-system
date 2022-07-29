import React, { useContext } from "react";
import styles from "./user-data-table.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import {
    DataTable, TableContainer, TableToolbar, TableBatchActions,
    TableToolbarMenu,
    TableToolbarAction, Table, TableHead, TableRow, TableSelectAll,
    TableHeader, TableBody, TableSelectRow, TableCell, Pagination
} from "carbon-components-react";
import { Settings32, UserAccess24, Queued32 } from '@carbon/icons-react';
import { SearchInput, Toolbar_Button } from "../toolbar_search_container/toolbar_search_container";
import { getSizeUsers, getAllUserPages, getUsers } from "../../resource/user.resource";
import MultiSelectField from "./multi-select-component";
import { UserRegistrationContext } from "../../user-context";

export interface DeathListProps {
    headers: { key: string; header: string; }[]
}
const UserDataTable: React.FC<DeathListProps> = ({ headers }) => {

    const [rowsTable, setRows] = useState([]);
    const { colSize } = useContext(UserRegistrationContext);
    const [totalpageSize, setTotalPageSize] = useState(1);
    const [[pageSize, page], setPaginationPageSize] = useState([5, 1]);
    const paginationPageSizes = [1, 5, 10, 20, 30, 40];
    const { t } = useTranslation();
    const toDeclared: NavigateOptions = { to: window.spaBase + "/death/search" };

    const profils = [
        {
            display: t("doctor"),
            value: "doctor"
        },
        {
            display: t("nurse"),
            value: "nurse"
        }
    ]

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
    function Toolbar_ButtonOnclick(e) {
        alert("Click to change the toolbar buttonName ");
    }
    function OnHandleChangeProfil(e) {

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
                    <>
                        <TableContainer
                            {...getTableContainerProps()}>
                            <div className={styles.TableContainer}>
                                <TableToolbar {...getToolbarProps()}>
                                    <div id={styles["toolbar-content"]} className={"bx--toolbar-content"}>
                                        <SearchInput
                                            className={styles['search-1']}
                                            onChange={(e) => ((e.currentTarget.value.trim().length) > 0) && onInputChange(e)} />
                                        <Toolbar_Button
                                            onClickChange={Toolbar_ButtonOnclick}
                                        />
                                    </div>

                                    <TableBatchActions className={styles.TableBatchActions} {...batchActionProps} >
                                        <TableToolbarMenu
                                            className={styles.TableToolbarMenu}
                                            renderIcon={Queued32}
                                            iconDescription={t("statut")}
                                            tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                                            <TableToolbarAction onClick={(e) => { console.log(selectedRows) }}>
                                                {t("enable")}
                                            </TableToolbarAction>
                                            <TableToolbarAction onClick={() => alert('Alert 2')}>
                                                {t("disable")}
                                            </TableToolbarAction>
                                            <TableToolbarAction onClick={() => alert('Alert 3')}>
                                                {t("reset")}
                                            </TableToolbarAction>
                                        </TableToolbarMenu>

                                        <TableToolbarMenu
                                            className={styles.TableToolbarMenu}
                                            renderIcon={UserAccess24}
                                            tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                                            {profils.map((element) => {
                                                return <TableToolbarAction onClick={OnHandleChangeProfil} >
                                                    {t(element.display)}
                                                </TableToolbarAction>
                                            })}
                                        </TableToolbarMenu>
                                        <TableToolbarMenu
                                            className={styles.TableToolbarMenu}
                                            renderIcon={Settings32}
                                            tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                                        </TableToolbarMenu>
                                    </TableBatchActions>
                                </TableToolbar>
                            </div>
                            <Table {...getTableProps()}>
                                <TableHead className={styles.TableRowHeader}>
                                    <TableRow>
                                        <TableSelectAll {...getSelectionProps()} />
                                        {headers.map((header) => (
                                            (header.key !== "uuid") &&
                                            <TableHeader key={header.uuid} {...getHeaderProps({ header, isSortable: true })}>
                                                {header.header}
                                            </TableHeader>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, i) => (
                                        <TableRow id={row.cells[6].value} key={i} {...getRowProps({ row })} onClick={() => {
                                            colSize([7, 5])
                                            
                                          }}>
                                            <TableSelectRow {...getSelectionProps({ row })} />
                                            {row.cells.map((cell) => (
                                                (cell.id.split(":")[1] !== "uuid") &&
                                                <TableCell key={cell.id}>{cell.value}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
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
                );
            }}
        </DataTable >
    );
}

export default UserDataTable;