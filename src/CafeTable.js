import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DataGrid, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from '@mui/x-data-grid-generator';
import moment from 'moment';

export default function CafeTable() {
  const [rows, setRows] = useState([
    {
      id: randomId(),
      userFirstName: randomTraderName(),
      userLastName: randomTraderName(),
      InsideOutside: 'In',
      HighLowTable: 'Low',
      NoOfPeople: 5,
      Occassion: 'Occassion',
      HouseholdNo: 2,
      BizTableNo: 1,
      CheckInTime: randomCreatedDate(),
      CheckOutTime : randomUpdatedDate(),
    },
    {
      id: randomId(),
      userFirstName: randomTraderName(),
      userLastName: randomTraderName(),
      InsideOutside: 'In',
      HighLowTable: 'Low',
      NoOfPeople: 5,
      Occassion: 'Occassion',
      HouseholdNo: 2,
      BizTableNo: 1,
      CheckInTime: randomCreatedDate(),
      CheckOutTime : randomUpdatedDate(),
    },
    {
      id: randomId(),
      userFirstName: randomTraderName(),
      userLastName: randomTraderName(),
      InsideOutside: 'In',
      HighLowTable: 'Low',
      NoOfPeople: 5,
      Occassion: 'Occassion',
      HouseholdNo: 2,
      BizTableNo: 1,
      CheckInTime: randomCreatedDate(),
      CheckOutTime : randomUpdatedDate(),
    },
    {
      id: randomId(),
      userFirstName: randomTraderName(),
      userLastName: randomTraderName(),
      InsideOutside: 'In',
      HighLowTable: 'Low',
      NoOfPeople: 5,
      Occassion: 'Occassion',
      HouseholdNo: 2,
      BizTableNo: 1,
      CheckInTime: randomCreatedDate(),
      CheckOutTime : randomUpdatedDate(),
    },
    {
      id: randomId(),
      userFirstName: randomTraderName(),
      userLastName: randomTraderName(),
      InsideOutside: 'In',
      HighLowTable: 'Low',
      NoOfPeople: 5,
      Occassion: 'Occassion',
      HouseholdNo: 2,
      BizTableNo: 1,
      CheckInTime: randomCreatedDate(),
      CheckOutTime : randomUpdatedDate(),
    },
  ]);

  const renderInOutsideEditInputCell = (params) => {
    const { id, value, api, field } = params;

    const handleChange = (event) => {
      api.setEditCellValue({ id, field, value: event.target.value }, event);
      api.setCellMode(id, field, 'view');
      let updateRows = [...rows];
      let editIndex = updateRows.findIndex(row => row.id === id);
      updateRows[editIndex][field] = event.target.value;
      setRows(updateRows);
    }

    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="select-in-outside-label"
          id="select-in-outside"
          value={value}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="In">In</MenuItem>
          <MenuItem value="Out">Out</MenuItem>
        </Select>
      </FormControl>
    );
  }

  const EditToolbar = () => {  
    const handleClick = () => {
      const id = randomId();
      setRows(rows.concat({ id, isNew: true }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Booking
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    setRows(rows.filter(row => row.id !== id));
  };

  const columns = [
    { field: 'userFirstName', headerName: 'First Name', width: 130, editable: true },
    { field: 'userLastName', headerName: 'Last Name', width: 130, editable: true },
    { field: 'InsideOutside', headerName: 'Inside/Outside', renderEditCell: renderInOutsideEditInputCell, minWidth: 118, editable: true },
    { field: 'HighLowTable', headerName: 'High/Low Table', minWidth: 124, editable: true },
    { field: 'NoOfPeople', headerName: '# of ppl', width: 74, type: 'number', editable: true },
    { field: 'Occassion', headerName: 'Occassion', editable: true },
    { field: 'HouseholdNo', headerName: 'How many groups', minWidth: 142, type: 'number', editable: true },
    { field: 'BizTableNo', headerName: 'Assigned table', minWidth: 120, type: 'number', editable: true },
    {
      field: 'CheckInTime',
      headerName: 'Booking Time',
      type: 'dateTime',
      valueFormatter: ({ value }) => moment(value).format('MM/DD/YYYY, hh:mm:ss'),
      minWidth: 145,
      editable: true,
    },
    {
      field: 'CheckOutTime',
      headerName: 'Booking End-time',
      type: 'dateTime',
      valueFormatter: ({ value }) => moment(value).format('MM/DD/YYYY, hh:mm:ss'),
      minWidth: 145,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Delete',
      cellClassName: 'actions',
      width: 74,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: EditToolbar,
        }}
      />
    </Box>
  );
}