import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import {
  selectReasonsList,
  selectReasonsListLoading,
  selectSolutionsList,
  selectSolutionsListLoading
} from "../../features/reasonsAndSolution/reasonsAndSolutionSlice.js";
import { useEffect, useState } from "react";
import {
  deleteReason,
  deleteSolution,
  getReasonsList,
  getSolutionsList
} from "../../features/reasonsAndSolution/reasonsAndSolutionThunk.js";
import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from "@mui/lab";

const SolutionReasonLists = () => {
  const dispatch = useAppDispatch();
  const reasons = useAppSelector(selectReasonsList);
  const solutions = useAppSelector(selectSolutionsList);
  const reasonLoading = useAppSelector(selectReasonsListLoading);
  const solutionsLoading = useAppSelector(selectSolutionsListLoading);
  const [tableHeight, setTableHeight] = useState(0);
  const [reasonDeleteId, setReasonDeleteId] = useState(null);
  const [solutionDeleteId, setSolutionDeleteId] = useState(null);
  
  useEffect(() => {
    dispatch(getReasonsList());
    dispatch(getSolutionsList());
  }, [dispatch]);
  
  useEffect(() => {
    setTableHeight(changeTableHeight);
    document.body.addEventListener('resize', changeTableHeight);
  }, []);
  
  const onDeleteReason = async (id) => {
    setReasonDeleteId(id);
    await dispatch(deleteReason(id));
    setReasonDeleteId(null);
    await dispatch(getReasonsList());
    await dispatch(getSolutionsList());
  }
  
  const onDeleteSolution = async (id) => {
    setSolutionDeleteId(id);
    await dispatch(deleteSolution(id));
    setSolutionDeleteId(null);
    await dispatch(getSolutionsList());
  }
  
  const changeTableHeight = () => {
    const headerHeight = document.querySelector('header').offsetHeight;
    const windowHeight = window.innerHeight;
    setTableHeight(windowHeight - headerHeight);
  };
  
  const reasonColumns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'title',
      headerName: 'Причина',
      width: 280,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: ' ',
      headerName: 'Действия',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <LoadingButton
            variant='outlined'
            color='error'
            size='small'
            startIcon={<DeleteIcon/>}
            onClick={() => onDeleteReason(params.row?.id)}
            loading={reasonDeleteId === params.row?.id}
          >Удалить</LoadingButton>
        );
      },
      sortable: false,
    },
  ];
  
  const solutionColumns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'reason',
      headerName: 'Причина',
      width: 280,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (value, _) => value?.title || '-'
    },
    {
      field: 'title',
      headerName: 'Решение',
      width: 300,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: ' ',
      headerName: 'Действия',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <LoadingButton
            variant='outlined'
            color='error'
            size='small'
            startIcon={<DeleteIcon/>}
            onClick={() => onDeleteSolution(params.row?.id)}
            loading={solutionDeleteId === params.row?.id}
          >Удалить</LoadingButton>
        );
      },
      sortable: false,
    },
  ];
  
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          padding: '10px 0',
        }}
      >
        <Paper
          sx={{
            height: `${tableHeight - 20}px`,
            width: '40%',
          }}
        >
          <DataGrid
            rows={reasons}
            columns={reasonColumns}
            initialState={{}}
            pageSizeOptions={[
              20,
              50,
              100
            ]}
            pageSize={100}
            //checkboxSelection
            sx={{ border: 0 }}
            loading={reasonLoading}
          />
        </Paper>
        <Paper
          sx={{
            height: `${tableHeight - 20}px`,
            width: '60%',
          }}
        >
          <DataGrid
            rows={solutions}
            columns={solutionColumns}
            initialState={{}}
            pageSizeOptions={[
              20,
              50,
              100
            ]}
            pageSize={100}
            //checkboxSelection
            sx={{ border: 0 }}
            loading={solutionsLoading}
          />
        </Paper>
      </Box>
    </>
  );
};

export default SolutionReasonLists;