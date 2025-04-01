import Grid from "@mui/material/Grid2";
import {
    Autocomplete,
    Button,
    CircularProgress,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {selectList, selectListLoading} from "../../features/list/listSlice.js";
import ListItem from "../../Components/List/ListItem.jsx";
import {useEffect, useState} from "react";
import {getList} from "../../features/list/listThunk.js";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    selectReasonsList,
    selectReasonsListLoading,
    selectSolutionsList, selectSolutionsListLoading
} from "../../features/reasonsAndSolution/reasonsAndSolutionSlice.js";
import {getReasonsList, getSolutionsList} from "../../features/reasonsAndSolution/reasonsAndSolutionThunk.js";

const CardsList = ()=>{

    const dispatch = useAppDispatch();
    const list = useAppSelector(selectList);
    const loading = useAppSelector(selectListLoading);
    const reasons = useAppSelector(selectReasonsList);
    const solutions = useAppSelector(selectSolutionsList);
    const reasonsListLoading = useAppSelector(selectReasonsListLoading);
    const solutionsListLoadingError = useAppSelector(selectSolutionsListLoading);

    useEffect(() => {
        dispatch(getList());
        dispatch(getReasonsList());
        dispatch(getSolutionsList());
    },[dispatch]);

    const [sortMethods, setSortMethods] = useState('');
    const [reasonsFiltered, setReasonsFiltered] = useState([]);
    const [solutionsFiltered, setSolutionsFiltered] = useState([]);

    let sortedCalls = list;

    if (sortMethods === 'nearestDate'){
        sortedCalls = [...list].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }else if (sortMethods === 'farthestDate'){
        sortedCalls = [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }else if (sortMethods === 'nearestSip'){
        sortedCalls = [...list].sort((a, b) => new Date(a.sip) - new Date(b.sip));
    }else if (sortMethods === 'farthestSip'){
        sortedCalls = [...list].sort((a, b) => new Date(b.sip) - new Date(a.sip));
    }else if (sortMethods === 'nearestAlphabet'){
        sortedCalls = [...list].sort((a, b) => a.full_name.localeCompare(b.full_name));
    }else if (sortMethods === 'farthestAlphabet'){
        sortedCalls = [...list].sort((a, b) => b.full_name.localeCompare(a.full_name));
    }else if(typeof sortMethods === "object"){
        if (sortMethods.reason_id){
            sortedCalls = list.filter(item =>
                sortMethods.some(method => method.id === item.solution.id)
            );
        }else {
            sortedCalls = list.filter(item =>
                sortMethods.some(method => method.id === item.reason.id)
            );
        }
    }

    return(
        <>
            <Grid>
                <Container maxWidth={"lg"} sx={{
                    width: "100%",
                }}>
                    <TableContainer component={Paper} sx={{
                        margin: "30px 0 0",
                        maxHeight: "500px",
                        overflowY: 'auto',
                    }}>
                        <Table stickyHeader border={"1px solid #000"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Лицевой счет</TableCell>
                                    <TableCell>
                                        <Grid container spacing={1} wrap="nowrap">
                                            <Grid>
                                                Дата
                                            </Grid>
                                            <Grid container wrap="nowrap" sx={{
                                                "& > button":{
                                                    width: "20px",
                                                    height: "20px",
                                                    padding: '0',
                                                    minWidth: '0',
                                                    backgroundColor: "#000",
                                                    color: "#fff",
                                                }
                                            }}>
                                                <Button variant={"outlined"} onClick={()=>setSortMethods("nearestDate")}>
                                                    <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                                                </Button>
                                                <Button variant={"outlined"} onClick={()=>setSortMethods("farthestDate")}>
                                                    <KeyboardArrowDownIcon> </KeyboardArrowDownIcon>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>Сотрудник</TableCell>
                                    <TableCell>
                                        <Grid>
                                            Sip
                                        </Grid>
                                        <Grid container wrap="nowrap" sx={{
                                            "& > button":{
                                                width: "20px",
                                                height: "20px",
                                                padding: '0',
                                                minWidth: '0',
                                                backgroundColor: "#000",
                                                color: "#fff",
                                            }
                                        }}>
                                            <Button variant={"outlined"} onClick={()=>setSortMethods("nearestSip")}>
                                                <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                                            </Button>
                                            <Button variant={"outlined"} onClick={()=>setSortMethods("farthestSip")}>
                                                <KeyboardArrowDownIcon> </KeyboardArrowDownIcon>
                                            </Button>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        <Grid>
                                            ФИО Клиента
                                        </Grid>
                                        <Grid container wrap="nowrap" sx={{
                                            "& > button":{
                                                width: "20px",
                                                height: "20px",
                                                padding: '0',
                                                minWidth: '0',
                                                backgroundColor: "#000",
                                                color: "#fff",
                                            }
                                        }}>
                                            <Button variant={"outlined"} onClick={()=>setSortMethods("nearestAlphabet")}>
                                                <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                                            </Button>
                                            <Button variant={"outlined"} onClick={()=>setSortMethods("farthestAlphabet")}>
                                                <KeyboardArrowDownIcon> </KeyboardArrowDownIcon>
                                            </Button>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>Телефон с которого звонили</TableCell>
                                    <TableCell>Номер телефона</TableCell>
                                    <TableCell>Адрес</TableCell>
                                    <TableCell>Mac address</TableCell>
                                    <TableCell>Ip address</TableCell>
                                    <TableCell>Mac onu</TableCell>
                                    <TableCell>Ip olt</TableCell>
                                    <TableCell>Коментарий</TableCell>
                                    <TableCell>
                                        Причина
                                        <Autocomplete
                                            loading={reasonsListLoading}
                                            multiple
                                            options={reasons}
                                            getOptionLabel={(option) => option.title}
                                            value={reasonsFiltered}
                                            onChange={(_, newValue) => {
                                                setReasonsFiltered(newValue);
                                                if (newValue.length < 1) {
                                                    setSortMethods('');
                                                }else {
                                                    setSortMethods(newValue);
                                                }
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Выберите причину" variant="outlined" />}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Решение
                                        <Autocomplete
                                            loading={solutionsListLoadingError}
                                            multiple
                                            options={solutions.map(option => ({
                                                id: option.id,
                                                label: `${option.title} (${reasons.find(reason => reason.id === option.reason_id)?.title})`,
                                            }))}
                                            getOptionLabel={(option) => option.label}
                                            value={solutionsFiltered}
                                            onChange={(_, newValue) => {
                                                setSolutionsFiltered(newValue);
                                                if (newValue.length < 1) {
                                                    setSortMethods('');
                                                }else {
                                                    setSortMethods(newValue);
                                                }
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Выберите причину" variant="outlined" />}
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!loading && (
                                    sortedCalls.map((item, index)=>{
                                        return(
                                            <ListItem key={index} item={item}></ListItem>
                                        )
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {loading && (
                        <Grid sx={{padding: "10px"}} container justifyContent={"center"}>
                            <CircularProgress />
                        </Grid>
                    )}
                </Container>
            </Grid>
        </>
    );
};

export default CardsList;