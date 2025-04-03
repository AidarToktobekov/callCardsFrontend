import {
  Button,
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
import Grid from "@mui/material/Grid2";
import {exportToExcel} from "../../excelExporter.js";

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
  const [filteredList, setFilteredList] = useState(cardsReport);

  useEffect(() => {
    setFilteredList(cardsReport);
  }, [cardsReport]);

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
        <Grid container justifyContent="space-between" p={"20px"}>
          <Typography
              sx={{
                fontSize: "25px",
                color: '#fff',
                textAlign: 'center',
              }}
          >
            Отчет по сотрудникам
          </Typography>
          <Button variant={"outlined"} onClick={()=>exportToExcel(filteredList, "Стат-ка_по_сотрудникам")}>
            Export excel
          </Button>
        </Grid>
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
            onFilterModelChange={(model)=>{
              const filteredRows = cardsReport.filter((row) => {
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

export default StatsByEmployees;