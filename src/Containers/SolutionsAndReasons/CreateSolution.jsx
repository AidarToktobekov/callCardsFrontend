import Grid from "@mui/material/Grid2";
import {Alert, Button, CircularProgress, Container, MenuItem, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {
    createSolution,
    getReasonsList
} from "../../features/reasonsAndSolution/reasonsAndSolutionThunk.js";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {
    selectCreateSolutionError,
    selectCreateSolutionLoading,
    selectReasonsList,
    selectReasonsListLoading
} from "../../features/reasonsAndSolution/reasonsAndSolutionSlice.js";
import {useNavigate} from "react-router-dom";

const CreateSolution = ()=>{

    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCreateSolutionLoading);
    const error = useAppSelector(selectCreateSolutionError);
    const navigate = useNavigate();
    const reasons = useAppSelector(selectReasonsList);
    const reasonLoading = useAppSelector(selectReasonsListLoading);

    const [state, setState] = useState({
        title: '',
        reason_id: '',
    });

    useEffect(()=>{
        dispatch(getReasonsList());
    }, [dispatch])

    const inputChangeHandler = (e)=>{
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const submitFormHandler = async (e)=>{
        e.preventDefault();
        try {
            const solution = {
                title: state.title.trim(),
                reason_id: state.reason_id,
            };

            await dispatch(createSolution(solution)).unwrap();
            navigate('/solution-and-reason');
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
            <Grid>
                <Container maxWidth={"lg"}>
                    <Typography variant="h3" sx={{
                        fontSize: "25px",
                        textAlign: "center",
                        margin: "30px 0 0",
                    }}>
                        Создание решения
                    </Typography>
                    <Grid component={"form"} container flexDirection={"column"} spacing={2} justifyContent={"center"} onSubmit={submitFormHandler} sx={{
                        maxWidth: '500px',
                        margin: "30px auto",
                    }}>
                        {error && (
                            <Alert severity="error" sx={{ my: 1}}>
                                {error.error}
                            </Alert>
                        )}
                        <Grid>
                            <TextField
                                type="text"
                                label="Причина"
                                name="title"
                                autoComplete="new-reason-title"
                                value={state.title}
                                sx={{
                                    width: "100%",
                                }}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                select
                                type="text"
                                label="Причина"
                                name="reason_id"
                                autoComplete="new-reason-title"
                                value={state.reason_id}
                                sx={{
                                    width: "100%",
                                }}
                                onChange={inputChangeHandler}
                            >
                                {reasonLoading ? (
                                    <Grid sx={{padding: "10px"}} container justifyContent={"center"}>
                                        <CircularProgress />
                                    </Grid>
                                ) : (reasons.map(item=>{
                                    return(
                                        <MenuItem value={item.id} key={item.id}>
                                            {item.title}
                                        </MenuItem>
                                    )
                                }))}
                            </TextField>
                        </Grid>
                        <Button loading={loading} type={"submit"} variant="contained">
                            Сохранить
                        </Button>
                    </Grid>
                </Container>
            </Grid>
        </>
    );
};

export default CreateSolution;