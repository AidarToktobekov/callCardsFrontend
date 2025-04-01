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

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70
  },
  {
    field: 'title',
    headerName: 'Причина',
    width: 200,
    align: 'center',
    headerAlign: 'center',
  },
];

const SolutionReasonLists = () => {
  const dispatch = useAppDispatch();
  const [reasonsFiltered, setReasonsFiltered] = useState([]);
  const reasons = useAppSelector(selectReasonsList);
  const solution = useAppSelector(selectSolutionsList);
  const reasonDeleteLoading = useAppSelector(selectDeleteReasonLoading);
  const solutionDeleteLoading = useAppSelector(selectDeleteSolutionLoading);
  const reasonLoading = useAppSelector(selectReasonsListLoading);
  const solutionLoading = useAppSelector(selectSolutionsListLoading);
  
  const onDeleteReason = async (id) => {
    await dispatch(deleteReason(id));
    await dispatch(getReasonsList());
  }
  const onDeleteSolution = async (id) => {
    await dispatch(deleteSolution(id));
    await dispatch(getSolutionsList());
  }
  
  useEffect(() => {
    dispatch(getReasonsList());
    dispatch(getSolutionsList());
  }, [dispatch]);
  
  return (
    <>
    </>
  );
};

export default SolutionReasonLists;