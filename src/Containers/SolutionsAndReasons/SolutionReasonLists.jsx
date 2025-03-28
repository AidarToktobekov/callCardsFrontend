import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {
    selectDeleteReasonLoading, selectDeleteSolutionLoading,
    selectReasonsList,
    selectReasonsListLoading,
    selectSolutionsList, selectSolutionsListLoading
} from "../../features/reasonsAndSolution/reasonsAndSolutionSlice.js";
import {useEffect} from "react";
import {
    deleteReason, deleteSolution,
    getReasonsList,
    getSolutionsList
} from "../../features/reasonsAndSolution/reasonsAndSolutionThunk.js";
import Grid from "@mui/material/Grid2";
import {
    Button, CircularProgress,
    Container,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const SolutionReasonLists = ()=>{

    const dispatch = useAppDispatch();

    const reasons = useAppSelector(selectReasonsList);
    const solution = useAppSelector(selectSolutionsList);

    const reasonDeleteLoading = useAppSelector(selectDeleteReasonLoading);
    const solutionDeleteLoading = useAppSelector(selectDeleteSolutionLoading);

    const reasonLoading = useAppSelector(selectReasonsListLoading);
    const solutionLoading = useAppSelector(selectSolutionsListLoading);

    const getReasonFromArr = (id)=>{
        const reason = reasons.filter(reason=>reason.id === id);
        if(reason){
            return reason[0].title;
        }
    }

    const onDeleteReason = async (id)=>{
        await dispatch(deleteReason(id));
        await dispatch(getReasonsList());
    }
    const onDeleteSolution = async (id)=>{
        await dispatch(deleteSolution(id));
        await dispatch(getSolutionsList());
    }

    useEffect(() => {
        dispatch(getReasonsList());
        dispatch(getSolutionsList());
    }, [dispatch]);

    return(
        <>
            <Grid>
                <Container>
                    <Grid container spacing={2}>
                        <Grid sx={{
                            width: "40%",
                        }}>
                            <TableContainer component={Paper} sx={{
                                maxHeight: '500px',
                                height: '100%',
                                overflowY: 'auto',
                            }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Причины</TableCell>
                                            <TableCell>
                                                <Grid sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                }}>
                                                    <Link href={"create-reason"} sx={{
                                                        background: '#000',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '50px',
                                                        borderRadius: '5px',
                                                        color: 'white',
                                                    }}>
                                                        <AddIcon></AddIcon>
                                                    </Link>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {!reasonLoading && (
                                            reasons.map((item)=>{
                                                return(
                                                    <TableRow key={item.id}>
                                                        <TableCell>{item.title}</TableCell>
                                                        <TableCell sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                        }}>
                                                            <Button loading={reasonDeleteLoading} onClick={()=>onDeleteReason(item.id)}>
                                                                <DeleteIcon/>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {reasonLoading && (
                                <Grid sx={{padding: "10px"}} container justifyContent={"center"}>
                                    <CircularProgress />
                                </Grid>
                            )}
                        </Grid>
                        <Grid sx={{
                            width: "40%",
                        }}>
                            <TableContainer component={Paper} sx={{
                                maxHeight: '500px',
                                height: '100%',
                                overflowY: 'auto',
                            }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Решения</TableCell>
                                            <TableCell>Причины</TableCell>
                                            <TableCell>
                                                <Grid sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                }}>
                                                    <Link href={"create-solution"} sx={{
                                                        background: '#000',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '50px',
                                                        borderRadius: '5px',
                                                        color: 'white',
                                                    }}>
                                                        <AddIcon></AddIcon>
                                                    </Link>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {!solutionLoading && (
                                            solution.map((item)=>{
                                                return(
                                                    <TableRow key={item.id}>
                                                        <TableCell>{item.title}</TableCell>
                                                        <TableCell>{getReasonFromArr(item.reason_id)}</TableCell>
                                                        <TableCell>
                                                            <Grid sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                width: '100%',
                                                            }}>
                                                                <Button loading={solutionDeleteLoading} onClick={()=>onDeleteSolution(item.id)}>
                                                                    <DeleteIcon/>
                                                                </Button>
                                                            </Grid>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {solutionLoading && (
                                <Grid sx={{padding: "10px"}} container justifyContent={"center"}>
                                    <CircularProgress />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </>
    );
};

export default SolutionReasonLists;