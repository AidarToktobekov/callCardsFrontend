import { Container, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import {
  selectSolutionReport,
  selectSolutionReportLoading,
} from "../../features/reports/reportsSlice.js";

import { useEffect, useState } from "react";
import { getSolutionReport, } from "../../features/reports/reportsThunk.js";
import { DataGrid } from "@mui/x-data-grid";

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
        <Typography
          sx={{
            fontSize: "25px",
            color: '#fff',
            textAlign: 'center',
            margin: "20px 0"
          }}
        >
          Отчет по причинам и решениям
        </Typography>
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
          />
        </Paper>
      </Container>
    </>
  );
};

export default StatsByInactivesUsers;
