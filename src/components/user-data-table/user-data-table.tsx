import React, { useContext } from "react";
import styles from "./user-data-table.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import {
    DataTable, TableContainer, TableToolbar, TableBatchActions,
    TableToolbarMenu,
    TableToolbarAction, Table, TableHead, TableRow, TableSelectAll,
    TableHeader, TableBody, TableSelectRow, TableCell, Pagination
} from "carbon-components-react";
import { Settings32, UserAccess24, CertificateCheck32 } from '@carbon/icons-react';
import { SearchInput, Toolbar_Button } from "../toolbar_search_container/toolbar_search_container";
import MultiSelectField, { Roles } from "./role-component";
import { UserRegistrationContext } from "../../user-context";
import { getSizeUsers, getAllUserPages, changeUserStatus, changeUserProfile, updateUserRoles, getStatusUser, profiles, status, locales } from "../user-form/register-form/user-ressource";

export interface DeathListProps {
    refresh?: boolean
}

const UserDataTable: React.FC<DeathListProps> = ({ refresh }) => {
    const [rowsTable, setRows] = useState([]);
    const { colSize } = useContext(UserRegistrationContext);
    const [totalpageSize, setTotalPageSize] = useState(1);
    const [[pageSize, page], setPaginationPageSize] = useState([5, 1]);
    const paginationPageSizes = [1, 5, 10, 20, 30, 40];
    const [roles, setRoles] = useState([]);
    let { userUuid } = useContext(UserRegistrationContext);
    const abortController = new AbortController();
    const { t } = useTranslation();
    const headers = [
        {
            key: 'Username',
            header: t('Username')
        },
        {
            key: 'fullName',
            header: t('fullName')
        },

        {
            key: 'phone',
            header: t('phone')

        },
        {
            key: 'gender',
            header: t('gender')
        },
        {
            key: 'profile',
            header: t('profilLabel')
        },

        {
            key: 'roles',
            header: t('roles')
        },
        {
            key: "locale",
            header: t("locale")
        },
        {
            key: 'status',
            header: t('status')
        },
    ];

    const checkTranslation = (text: string) => {
        switch (text) {
            case "nurse":
                return t("nurse")
            case "nurseM":
                return t("nurseM")
            case "nurseF":
                return t("nurseF")
            case "doctorM":
                return t("doctor")
            case "doctorF":
                return t("doctor")
            case "doctor":
                return t("doctor")
            case "adminM":
                return t("admin")
            case "admin":
                return t("admin")
            case "M":
                return t("maleLabel")
            case "F":
                return t("femaleLabel")
            default:
                return t("unknown")
        }
    }

    const formatUser = (users) => {
        return Promise.all(
            users.map(async (user) => {
                return {
                    id: user?.uuid,
                    Username: user?.username,
                    fullName: user?.person.display,
                    gender: checkTranslation(user?.person.gender),
                    profile: checkTranslation(user.systemId.split('-')[0]),
                    roles: user?.roles?.length > 1 ? user.roles[0].display + ", " + user.roles[1].display + " (" + user?.roles?.length + ")" : user?.roles[0]?.display,
                    phone: user?.person.attributes?.find((attribute) => attribute?.display.split(" = ")[0] == "Telephone Number")?.display.split("Telephone Number = ")[1],
                    status: t(getStatusUser(user?.retired, user?.userProperties?.forcePassword)),
                    locale: t(user?.userProperties?.defaultLocale)
                }
            }))
    }

    const formatRows = (rows, status) => {

        const users = rows.map(row => {
            const locale = locales.find(locale => t(locale.display) == row.cells[6].value)?.value;
            
            return {
                uuid: row.id,
                userProperties: {
                    defaultLocale: locale
                },
                username: row.cells[0].value
            }
        })
        changeUserStatus(abortController, users, status).then(() => changeRows(pageSize, page))
    }

    useEffect(function () {
        changeRows(pageSize, page ? page : 1);
        getSizeUsers().then(res => setTotalPageSize(res.data.results.length))
    }, [refresh]);

    const changeRows = (size, page) => {
        let start = ((page - 1) * size);
        start = start <= 1 ? 1 : start;
        setPaginationPageSize([size, page]);
        getAllUserPages(size, start)
            .then(response => response.data.results)
            .then(async json => formatUser(json).then(data => setRows(data)))
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
                                            onClickChange={() => { colSize([7, 5]); userUuid(undefined); }}
                                        />
                                    </div>
                                    <TableBatchActions className={styles.TableBatchActions} {...batchActionProps} >
                                        <Roles
                                            placeholder={t("roles")}
                                            onChange={(data) => { setRoles(data)}}

                                        />
                                        <TableToolbarMenu
                                            className={styles.TableToolbarMenu}
                                            renderIcon={CertificateCheck32}
                                            tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                                            iconDescription={t("roles")}
                                            disabled={!(roles.length > 0)}
                                            onClick={e => {
                                                updateUserRoles(abortController, selectedRows, roles).then(() => changeRows(pageSize, page))
                                            }}
                                        >
                                        </TableToolbarMenu>
                                        <TableToolbarMenu
                                            className={styles.TableToolbarMenu}
                                            renderIcon={UserAccess24}
                                            iconDescription={t("profileLabel")}
                                            tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                                            {profiles.map((element) => {
                                                return (
                                                    <TableToolbarAction onClick={(e) => changeUserProfile(abortController, selectedRows, element.value).then(() => changeRows(pageSize, page))}>
                                                        {t(element.display)}
                                                    </TableToolbarAction>
                                                )
                                            })}
                                        </TableToolbarMenu>
                                        <TableToolbarMenu
                                            className={styles.TableToolbarMenu}
                                            renderIcon={Settings32}
                                            iconDescription={t("status")}
                                            tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                                            {status.map((s) => {
                                                return (
                                                    <TableToolbarAction onClick={(e) => formatRows(selectedRows, s.value)}>
                                                        {t(s.display == "waiting" ? "reset" : s.display)}
                                                    </TableToolbarAction>
                                                )
                                            })}
                                        </TableToolbarMenu>
                                    </TableBatchActions>
                                </TableToolbar>
                            </div>
                            <Table {...getTableProps()} size='lg'>
                                <TableHead className={styles.TableRowHeader}>
                                    <TableRow>
                                        <TableSelectAll
                                            onSelect={
                                                (e) => {
                                                    colSize([12, 0])
                                                }
                                            }
                                            {...getSelectionProps()}
                                        />
                                        {headers.map((header) => (
                                            (header.key !== "uuid") &&
                                            <TableHeader key={header.uuid} {...getHeaderProps({ header, isSortable: true })}>
                                                {header.header}
                                            </TableHeader>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id} onClick={(e) => {
                                            userUuid(row.id);
                                            colSize([7, 5])
                                        }} >
                                            <TableSelectRow
                                                className={styles.testRows}
                                                {...getSelectionProps({ row })}
                                                onChange={(e) => colSize([12, 0])}
                                            />
                                            {row.cells.map((cell) => <TableCell key={cell.id}>{cell.value}</TableCell>)}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Pagination
                            backwardText={t("PreviousPage")}
                            forwardText={t("NextPage")}
                            itemsPerPageText={t("Show")}
                            onChange={e => changeRows(e.pageSize, e.page)}
                            page={page}
                            pageSize={pageSize}
                            pageSizes={paginationPageSizes}
                            size="sm"
                            totalItems={totalpageSize}
                        />
                    </>
                );
            }}
        </DataTable >
    );
}

export default UserDataTable;