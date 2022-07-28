// import {
//     DataTable, TableContainer, TableToolbar, TableBatchActions,
//     TableBatchAction, TableToolbarContent, TableToolbarSearch, TableToolbarMenu,
//     TableToolbarAction, Button, Table, TableHead, TableRow, TableSelectAll,
//     TableHeader, TableBody, TableSelectRow, TableCell
// } from "carbon-components-react";
// import { TrashCan32,Save32,Download32 } from '@carbon/icons-react';
// import React from "react";

// (args) => (
//     <DataTable rows={rows} headers={headers} {...args}>
//         {({
//             rows,
//             headers,
//             getHeaderProps,
//             getRowProps,
//             getSelectionProps,
//             getToolbarProps,
//             getBatchActionProps,
//             onInputChange,
//             selectedRows,
//             getTableProps,
//             getTableContainerProps,
//         }) => {
//             const batchActionProps = getBatchActionProps();

//             return (
//                 <TableContainer
//                     {...getTableContainerProps()}>
//                     <TableToolbar {...getToolbarProps()}>
//                         <TableBatchActions {...batchActionProps}>
//                             <TableBatchAction
//                                 tabIndex={batchActionProps.shouldShowBatchActions ? "": ""}
//                                 renderIcon={TrashCan32}
//                                 onClick={(e)=>(selectedRows)}>
//                                 Delete
//                             </TableBatchAction>
//                             <TableBatchAction
//                                 tabIndex={batchActionProps.shouldShowBatchActions ? : -}
//                                 renderIcon={Save32}
//                                 onClick={(e)=>(selectedRows)}>
//                                 Save
//                             </TableBatchAction>
//                             <TableBatchAction
//                                 tabIndex={batchActionProps.shouldShowBatchActions ? : -}
//                                 renderIcon={Download32}
//                                 onClick={(e)=>(selectedRows)}>
//                                 Download
//                             </TableBatchAction>
//                         </TableBatchActions>
//                         <TableToolbarContent
//                             aria-hidden={batchActionProps.shouldShowBatchActions}>
//                             <TableToolbarSearch
//                                 tabIndex={batchActionProps.shouldShowBatchActions ? - : 0}
//                                 onChange={onInputChange}
//                             />
//                             <TableToolbarMenu
//                                 tabIndex={batchActionProps.shouldShowBatchActions ? - : 0}>
//                                 <TableToolbarAction onClick={() => alert('Alert ')}>
//                                     Action
//                                 </TableToolbarAction>
//                                 <TableToolbarAction onClick={() => alert('Alert ')}>
//                                     Action
//                                 </TableToolbarAction>
//                                 <TableToolbarAction onClick={() => alert('Alert ')}>
//                                     Action
//                                 </TableToolbarAction>
//                             </TableToolbarMenu>
//                             <Button
//                                 tabIndex={batchActionProps.shouldShowBatchActions ? - : 0}
//                                 onClick={action('Add new row')}
//                                 size="small"
//                                 kind="primary">
//                                 Add new
//                             </Button>
//                         </TableToolbarContent>
//                     </TableToolbar>
//                     <Table {...getTableProps()}>
//                         <TableHead>
//                             <TableRow>
//                                 <TableSelectAll {...getSelectionProps()} />
//                                 {headers.map((header, i) => (
//                                     <TableHeader key={i} {...getHeaderProps({ header })}>
//                                         {header.header}
//                                     </TableHeader>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {rows.map((row, i) => (
//                                 <TableRow key={i} {...getRowProps({ row })}>
//                                     <TableSelectRow {...getSelectionProps({ row })} />
//                                     {row.cells.map((cell) => (
//                                         <TableCell key={cell.id}>{cell.value}</TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             );
//         }}
//     </DataTable>
// )