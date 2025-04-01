import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import {
  selectDeleteReasonLoading,
  selectDeleteSolutionLoading,
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
];

const SolutionReasonLists = () => {
  const dispatch = useAppDispatch();
  const reasons = useAppSelector(selectReasonsList);
  const solutions = useAppSelector(selectSolutionsList);
  const reasonDeleteLoading = useAppSelector(selectDeleteReasonLoading);
  const solutionDeleteLoading = useAppSelector(selectDeleteSolutionLoading);
  const reasonLoading = useAppSelector(selectReasonsListLoading);
  const solutionsLoading = useAppSelector(selectSolutionsListLoading);
  const [tableHeight, setTableHeight] = useState(0);
  
  useEffect(() => {
    dispatch(getReasonsList());
    dispatch(getSolutionsList());
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
  
  const onDeleteReason = async (id) => {
    await dispatch(deleteReason(id));
    await dispatch(getReasonsList());
  }
  
  const onDeleteSolution = async (id) => {
    await dispatch(deleteSolution(id));
    await dispatch(getSolutionsList());
  }
  
  console.log(reasons);
  
  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'center', gap: '20px', padding: '10px 0'}}>
        <Paper
          sx={{
            height: `${tableHeight - 20}px`,
            width: '100%',
            maxWidth: '700px'
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
            width: '100%',
            maxWidth: '1000px'
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