import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {
    selectDeleteReasonLoading, selectDeleteSolutionLoading,
    selectReasonsList,
    selectReasonsListLoading,
    selectSolutionsList, selectSolutionsListLoading
} from "../../features/reasonsAndSolution/reasonsAndSolutionSlice.js";
import {useEffect, useState} from "react";
import {
    deleteReason, deleteSolution,
    getReasonsList,
    getSolutionsList
} from "../../features/reasonsAndSolution/reasonsAndSolutionThunk.js";
import Grid from "@mui/material/Grid2";
import {
    Autocomplete,
    Button, CircularProgress,
    Container,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {logout} from "../../features/user/userSlice.js";

const SolutionReasonLists = ()=>{

    const dispatch = useAppDispatch();
    const [reasonsFiltered, setReasonsFiltered] = useState([]);

    const reasons = useAppSelector(selectReasonsList);
    const solution = useAppSelector(selectSolutionsList);

    const reasonDeleteLoading = useAppSelector(selectDeleteReasonLoading);
    const solutionDeleteLoading = useAppSelector(selectDeleteSolutionLoading);

    const reasonLoading = useAppSelector(selectReasonsListLoading);
    const solutionLoading = useAppSelector(selectSolutionsListLoading);

    const getReasonFromArr = (id)=>{
        const reason = reasons.filter(reason=>reason.id === id);
        if(reason[0]){
            return reason[0].title;
        }else{
            return (
                <Grid sx={{padding: "10px"}} container justifyContent={"center"}>
                    <CircularProgress />
                </Grid>
            );
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

    return (
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
                            }}
                            >
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
                                            <TableCell>
                                                <Grid>
                                                    <Grid>
                                                        Причины
                                                    </Grid>
                                                    <Grid>
                                                        {!reasonLoading && (
                                                            <Autocomplete
                                                                multiple
                                                                options={reasons}
                                                                getOptionLabel={(option) => option.title}
                                                                value={reasonsFiltered}
                                                                onChange={(_, newValue) => setReasonsFiltered(newValue)}
                                                                renderInput={(params) => <TextField {...params} label="Выберите причину" variant="outlined" />}
                                                                fullWidth
                                                            />
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
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
                                            (reasonsFiltered.length === 0 ? solution : solution.filter(item =>
                                                reasonsFiltered.some(reason => reason.id === item.reason_id)
                                            )).map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.title}</TableCell>
                                                    <TableCell>{getReasonFromArr(item.reason_id)}</TableCell>
                                                    <TableCell>
                                                        <Grid
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <Button loading={solutionDeleteLoading} onClick={() => onDeleteSolution(item.id)}>
                                                                <DeleteIcon />
                                                            </Button>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            ))
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