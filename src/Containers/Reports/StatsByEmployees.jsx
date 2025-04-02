import {
  Container,
  Paper, Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import {
  selectCardsReport,
  selectCardsReportLoading
} from "../../features/reports/reportsSlice.js";
import { useEffect, useState } from "react";
import {
  getCardsReport
} from "../../features/reports/reportsThunk.js";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: 'sip',
    headerName: 'Sip',
    width: 130,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'spec_full_name',
    headerName: 'Специалист',
    width: 250,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'count',
    headerName: 'Кол-во',
    width: 130,
    align: 'center',
    headerAlign: 'center'
  }
];

const StatsByEmployees = () => {
  
  const dispatch = useAppDispatch();
  const [tableHeight, setTableHeight] = useState(0);
  
  const cardsReport = useAppSelector(selectCardsReport);
  const loading = useAppSelector(selectCardsReportLoading);
  
  
  useEffect(() => {
    dispatch(getCardsReport());
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
  }
  
  return (
    <>
      <Container
        variant={"h1"}
        maxWidth={"lg"}
      >
        <Typography
          sx={{
            fontSize: "25px",
            color: '#fff',
            textAlign: 'center',
            margin: "20px 0"
          }}
        >
          Отчет по сотрудникам
        </Typography>
        <Paper
          sx={{
            height: `${tableHeight}px`,
            width: 'fit-content',
            m: '0 auto'
          }}
        >
          <DataGrid
            rows={cardsReport}
            getRowId={() => Math.random()}
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

export default StatsByEmployees;