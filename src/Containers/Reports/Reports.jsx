import Grid from "@mui/material/Grid2";
import {
    Autocomplete,
    CircularProgress,
    Container,
    List,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {
    selectCardsInactives, selectCardsInactivesLoading,
    selectCardsReport,
    selectCardsReportLoading, selectRepeatedCalls, selectRepeatedCallsLoading, selectSolutionReport,
    selectSolutionReportLoading, selectTreatmentReport,
    selectTreatmentReportLoading
} from "../../features/reports/reportsSlice.js";
import {useEffect, useState} from "react";
import {
    getCardsInactives,
    getCardsReport,
    getRepeatedCalls,
    getSolutionReport,
    getTreatmentReport
} from "../../features/reports/reportsThunk.js";
import ListItem from "../../Components/List/ListItem.jsx";
import {
    selectReasonsList,
    selectReasonsListLoading,
    selectSolutionsList,
    selectSolutionsListLoading
} from "../../features/reasonsAndSolution/reasonsAndSolutionSlice.js";
import {getReasonsList, getSolutionsList} from "../../features/reasonsAndSolution/reasonsAndSolutionThunk.js";

const Reports = ()=>{

    const dispatch = useAppDispatch();

    const cardsReport = useAppSelector(selectCardsReport);
    const treatmentReport = useAppSelector(selectTreatmentReport);
    const solutionReport = useAppSelector(selectSolutionReport);
    const repeatedCalls = useAppSelector(selectRepeatedCalls);
    const inactivesCards = useAppSelector(selectCardsInactives);

    const solutions = useAppSelector(selectSolutionsList);
    const solutionsListLoading = useAppSelector(selectSolutionsListLoading);
    const reasons = useAppSelector(selectReasonsList);
    const reasonsLoading = useAppSelector(selectReasonsListLoading);

    const cardsReportLoading = useAppSelector(selectCardsReportLoading);
    const treatmentReportLoading = useAppSelector(selectTreatmentReportLoading);
    const solutionReportLoading = useAppSelector(selectSolutionReportLoading);
    const repeatedCallsLoading = useAppSelector(selectRepeatedCallsLoading);
    const inactivesCardsLoading = useAppSelector(selectCardsInactivesLoading);

    const [solutionsFiltered, setSolutionsFiltered] = useState([]);

    useEffect(() => {
        dispatch(getCardsReport());
        dispatch(getTreatmentReport());
        dispatch(getSolutionReport());
        dispatch(getRepeatedCalls());
        dispatch(getCardsInactives());
        dispatch(getSolutionsList());
        dispatch(getReasonsList());
    }, [dispatch])

    return(
        <Grid>
            <Container maxWidth={"lg"}>
                <Grid container spacing={2} wrap={"nowrap"}>
                    <Grid
                    >
                        <TableContainer component={Paper} sx={{
                            maxHeight: '500px',
                            height: '100%',
                            overflowY: 'auto',
                        }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>СИП</TableCell>
                                        <TableCell>Сотрудник</TableCell>
                                        <TableCell>Количество звонков</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!cardsReportLoading && (
                                        cardsReport.map((item, index)=>{
                                            return(
                                                <TableRow key={index}>
                                                    <TableCell>{item.sip}</TableCell>
                                                    <TableCell>{item.spec_full_name}</TableCell>
                                                    <TableCell>{item.count}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {cardsReportLoading && (
                            <Grid sx={{padding: "10px"}} container justifyContent={"center"}>
                                <CircularProgress />
                            </Grid>
                        )}
                    </Grid>
                    <Grid
                    >
                        <TableContainer component={Paper} sx={{
                            maxHeight: '500px',
                            height: '100%',
                            overflowY: 'auto',
                        }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Причина обращения</TableCell>
                                        <TableCell>Кол-во обращений</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!treatmentReportLoading && (
                                        treatmentReport.map((item, index)=>{
                                            return(
                                                <TableRow key={index}>
                                                    <TableCell>{item.reason}</TableCell>
                                                    <TableCell>{item.count}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {treatmentReportLoading && (
                            <Grid sx={{padding: "10px"}} container justifyContent={"center"}>
                                <CircularProgress />
                            </Grid>
                        )}
                    </Grid>
                    <Grid>
                        <TableContainer component={Paper} sx={{
                            maxHeight: '500px',
                            height: '100%',
                            overflowY: 'auto',
                        }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Причина обращения</TableCell>
                                        <TableCell>Решение
                                            <Autocomplete
                                                loading={solutionsListLoading}
                                                multiple
                                                options={solutions.map(option => ({
                                                    id: option.id,
                                                    label: `${option.title} (${reasons.find(reason => reason.id === option.reason_id)?.title})`,
                                                }))}
                                                getOptionLabel={(option) => option.label}
                                                value={solutionsFiltered}
                                                onChange={(_, newValue) => setSolutionsFiltered(newValue)}
                                                renderInput={(params) => <TextField {...params} label="Выберите решение" variant="outlined" />}
                                                fullWidth
                                            />
                                        </TableCell>
                                        <TableCell>Кол-во</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!solutionReportLoading && (
                                        (solutionsFiltered.length === 0 ? solutionReport : solutionReport.filter(item =>
                                                solutionsFiltered.some(solution => solution.id === item.id)
                                        )).map((item)=>{
                                            return(
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.reason}</TableCell>
                                                    <TableCell>{item.solution}</TableCell>
                                                    <TableCell>{item.count}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {solutionReportLoading && (
                            <Grid sx={{padding: "10px"}} container justifyContent={"center"}>
                                <CircularProgress />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid>
                    <TableContainer component={Paper} sx={{
                        maxHeight: '500px',
                        height: '100%',
                        overflowY: 'auto',
                    }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ЛС Абонента</TableCell>
                                    <TableCell>Адрес</TableCell>
                                    <TableCell>Номер телефона</TableCell>
                                    <TableCell>Причина</TableCell>
                                    <TableCell>Решение</TableCell>
                                    <TableCell>Кол-во</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!repeatedCallsLoading && (
                                    repeatedCalls.map((item, index)=>{
                                        return(
                                            <TableRow key={index}>
                                                <TableCell>{item.ls_abon}</TableCell>
                                                <TableCell>{item.address}</TableCell>
                                                <TableCell>
                                                    <List>
                                                        {item.phone_number.map((phone, index)=>{
                                                            return(
                                                                <ListItemText key={index}>
                                                                    {phone}
                                                                </ListItemText>
                                                            )})
                                                        }
                                                    </List>
                                                </TableCell>
                                                <TableCell>{item.reason}</TableCell>
                                                <TableCell>{item.solution}</TableCell>
                                                <TableCell>{item.count}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {solutionReportLoading && (
                        <Grid sx={{padding: "10px"}} container justifyContent={"center"}>
                            <CircularProgress />
                        </Grid>
                    )}
                </Grid>
                <Grid>
                    <TableContainer component={Paper} sx={{
                        margin: "30px 0 0",
                        maxHeight: "500px",
                        overflowY: 'auto',
                    }}>
                        <Table stickyHeader border={"1px solid #000"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Лицевой счет</TableCell>
                                    <TableCell>Дата</TableCell>
                                    <TableCell>Сотрудник</TableCell>
                                    <TableCell>Sip</TableCell>
                                    <TableCell>ФИО Клиента</TableCell>
                                    <TableCell>Телефон с которого звонили</TableCell>
                                    <TableCell>Номер телефона</TableCell>
                                    <TableCell>Адрес</TableCell>
                                    <TableCell>Mac address</TableCell>
                                    <TableCell>Ip address</TableCell>
                                    <TableCell>Mac onu</TableCell>
                                    <TableCell>Ip olt</TableCell>
                                    <TableCell>Коментарий</TableCell>
                                    <TableCell>Причина</TableCell>
                                    <TableCell>Решение</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!inactivesCardsLoading && (
                                    inactivesCards.map((item, index)=>{
                                        return(
                                            <ListItem key={index} item={item}></ListItem>
                                        )
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {inactivesCardsLoading && (
                        <Grid sx={{padding: "10px"}} container justifyContent={"center"}>
                            <CircularProgress />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Grid>
    );
};

export default Reports;