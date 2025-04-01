import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import {
  selectList,
  selectListLoading
} from "../../features/list/listSlice.js";
import { useEffect, useState } from "react";
import { getList } from "../../features/list/listThunk.js";
import { Paper } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'full_name',
    headerName: 'ФИО',
    width: 180,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'call_from',
    headerName: 'Звонок от',
    width: 130,
    headerAlign: 'center'
  },
  {
    field: 'ls_abon',
    headerName: 'ЛС абонента',
    width: 130,
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
    field: 'created_at',
    headerName: 'Дата создания',
    width: 160,
    align: 'center',
    headerAlign: 'center'
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
    field: 'sip',
    headerName: 'СИП',
    width: 130,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'ip_address',
    headerName: 'IP адрес',
    width: 130,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'mac_address',
    headerName: 'MAC адрес',
    width: 160,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'mac_onu',
    headerName: 'MAC ONU',
    width: 130,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'ip_olt',
    headerName: 'IP OLT',
    width: 130,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'comment',
    headerName: 'Комментарий',
    width: 220,
    align: 'center',
    headerAlign: 'center'
  },
];

const CardsList = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectList);
  const loading = useAppSelector(selectListLoading);
  const [tableHeight, setTableHeight] = useState(0);
  
  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);
  
  useEffect(() => {
    setTableHeight(changeTableHeight);
    document.body.addEventListener('resize', changeTableHeight);
  }, []);
  
  const changeTableHeight = () => {
    const headerHeight = document.querySelector('header').offsetHeight;
    const windowHeight = window.innerHeight;
    setTableHeight(windowHeight - headerHeight);
  };
  
  return (
    <>
      <Paper
        sx={{
          height: `${tableHeight}px`,
          width: '100%'
        }}
      >
        <DataGrid
          rows={list}
          columns={columns}
          initialState={{}}
          pageSizeOptions={[
            20,
            50,
            100
          ]}
          pageSize={100}
          //checkboxSelection
          sx={{ border: 0 }}
          loading={loading}
        />
      </Paper>
    </>
  );
};

export default CardsList;