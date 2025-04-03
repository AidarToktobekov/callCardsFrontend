import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import {
  selectRepeatedCalls, selectRepeatedCallsLoading,
} from "../../features/reports/reportsSlice.js";
import { useEffect, useState } from "react";
import {
  getCardsReport,
  getRepeatedCalls,
} from "../../features/reports/reportsThunk.js";
import {
  Button,
  Container,
  Paper, Typography
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import {exportToExcel} from "../../excelExporter.js";

const columns = [
  {
    field: 'ls_abon',
    headerName: 'Личный счет',
    width: 250,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'address',
    headerName: 'Адрес',
    width: 250,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'phone_number',
    headerName: 'Номер телефона',
    width: 200,
    headerAlign: 'center',
    valueGetter: (value, _) => Array.isArray(value) ? value.join(', ') : value
  },
  {
    field: 'reason',
    headerName: 'Причина',
    width: 200,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (value, _) => value?.title || '-'
  },
  {
    field: 'solution',
    headerName: 'Решение',
    width: 200,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (value, _) => value?.title || '-'
  },
  {
    field: 'count',
    headerName: 'Кол-во',
    width: 130,
    align: 'center',
    headerAlign: 'center'
  }
];

const StatsByRepeatedCalls = () => {
  const dispatch = useAppDispatch();
  const [tableHeight, setTableHeight] = useState(0);
  
  const repeatedCalls = useAppSelector(selectRepeatedCalls);
  const loading = useAppSelector(selectRepeatedCallsLoading);
  const [filteredList, setFilteredList] = useState(repeatedCalls);

  useEffect(() => {
    setFilteredList(repeatedCalls);
  }, [repeatedCalls]);

  useEffect(() => {
    dispatch(getCardsReport());
  }, [dispatch]);
  
  useEffect(() => {
    if (!tableHeight) {
      setTableHeight(changeTableHeight);
      document.body.addEventListener('resize', changeTableHeight);
    }
  }, [tableHeight]);
  
  useEffect(() => {
    dispatch(getRepeatedCalls());
  }, [dispatch]);
  
  const changeTableHeight = () => {
    const headerHeight = document.querySelector('header').offsetHeight;
    const windowHeight = window.innerHeight;
    
    setTableHeight((windowHeight) - headerHeight - 135);
  }
  
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
            Отчет по повторным звонакам
          </Typography>
          <Button variant={"outlined"} onClick={()=>exportToExcel(filteredList, "Стат-ка_по_повторным")}>
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
            rows={repeatedCalls}
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
              const filteredRows = repeatedCalls.filter((row) => {
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

export default StatsByRepeatedCalls;
