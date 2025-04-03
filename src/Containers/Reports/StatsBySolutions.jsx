import {Button, Container, Paper, Typography} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import {
  selectSolutionReport,
  selectSolutionReportLoading,
} from "../../features/reports/reportsSlice.js";

import { useEffect, useState } from "react";
import { getSolutionReport, } from "../../features/reports/reportsThunk.js";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import {exportToExcel} from "../../excelExporter.js";

const columns = [
  {
    field: 'reason',
    headerName: 'Причина',
    width: 250,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (value) => value?.title || '-'
  },
  {
    field: 'solution',
    headerName: 'Решение',
    width: 250,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (value) => value?.title || '-'
  },
  {
    field: 'count',
    headerName: 'Кол-во',
    width: 130,
    align: 'center',
    headerAlign: 'center'
  },
];

const StatsByInactivesUsers = () => {
  
  const dispatch = useAppDispatch();
  const [tableHeight, setTableHeight] = useState(0);
  
  const solutionReport = useAppSelector(selectSolutionReport);
  const loading = useAppSelector(selectSolutionReportLoading);
  const [filteredList, setFilteredList] = useState(solutionReport);
  
  useEffect(() => {
    dispatch(getSolutionReport());
  }, [dispatch]);
  
  useEffect(() => {
    if (!tableHeight) {
      setTableHeight(changeTableHeight);
      document.body.addEventListener('resize', changeTableHeight);
    }
  }, [tableHeight]);
  
  const changeTableHeight = () => {
    const headerHeight = document.querySelector('header').offsetHeight;
    const windowHeight = window.innerHeight;
    setTableHeight(windowHeight - headerHeight - 135);
  };
  
  return (
    <>
      <Container maxWidth={"lg"}>
        <Grid container justifyContent="space-between" p={"20px"}>
          <Typography
              sx={{
                fontSize: "25px",
                color: '#fff',
                textAlign: 'center',
              }}
          >
            Отчет по причинам и решениям
          </Typography>
          <Button variant={"outlined"} onClick={()=>exportToExcel(filteredList, "Стат-ка_по_решениям")}>
            Export excel
          </Button>
        </Grid>
        <Paper
          sx={{
            height: `${tableHeight}px`,
            width: 'fit-content',
            margin: '0 auto'
          }}
        >
          <DataGrid
            rows={solutionReport}
            getRowId={(row) => `${row.reason.id}-${row.solution?.id}`}
            columns={columns}
            initialState={{}}
            pageSizeOptions={[
              20,
              50,
              100
            ]}
            pageSize={100}
            sx={{
              border: 0,
              width: 'fit-content'
            }}
            loading={loading}
            onFilterModelChange={(model)=>{
              const filteredRows = solutionReport.filter((row) => {
                return model.items.every((filter) => {
                  if (!filter.value) return true; // No filter applied
                  return String(row[filter.field])
                      .toLowerCase()
                      .includes(filter.value.toLowerCase());
                });
              });
              setFilteredList(filteredRows);
            }}
          />
        </Paper>
      </Container>
    </>
  );
};

export default StatsByInactivesUsers;
