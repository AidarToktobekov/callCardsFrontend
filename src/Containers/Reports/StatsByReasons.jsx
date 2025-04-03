import {
  Button,
  Container,
  Paper, Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import {
  selectTreatmentReport, selectTreatmentReportLoading
} from "../../features/reports/reportsSlice.js";
import { useEffect, useState } from "react";
import {
  getTreatmentReport
} from "../../features/reports/reportsThunk.js";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import {exportToExcel} from "../../excelExporter.js";

const columns = [
  {
    field: 'reason',
    headerName: 'Причина',
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


const StatsByReasons = () => {
  
  const dispatch = useAppDispatch();
  const [tableHeight, setTableHeight] = useState(0);
  
  const treatmentReport = useAppSelector(selectTreatmentReport);
  const loading = useAppSelector(selectTreatmentReportLoading);
  const [filteredList, setFilteredList] = useState(treatmentReport);

  useEffect(() => {
    setFilteredList(treatmentReport);
  }, [treatmentReport]);
  
  useEffect(() => {
    dispatch(getTreatmentReport());
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
            Отчет по причинам
          </Typography>
          <Button variant={"outlined"} onClick={()=>exportToExcel(filteredList, "Стат-ка_по_причинам")}>
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
            rows={treatmentReport}
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
              const filteredRows = treatmentReport.filter((row) => {
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

export default StatsByReasons;