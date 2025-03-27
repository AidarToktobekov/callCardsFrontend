import Grid from "@mui/material/Grid2";
import {
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
    TableRow
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {
    selectCardsReport,
    selectCardsReportLoading, selectRepeatedCalls, selectRepeatedCallsLoading, selectSolutionReport,
    selectSolutionReportLoading, selectTreatmentReport,
    selectTreatmentReportLoading
} from "../../features/reports/reportsSlice.js";
import {useEffect} from "react";
import {
    getCardsReport,
    getRepeatedCalls,
    getSolutionReport,
    getTreatmentReport
} from "../../features/reports/reportsThunk.js";

const Reports = ()=>{

    const dispatch = useAppDispatch();

    const cardsReport = useAppSelector(selectCardsReport);
    const treatmentReport = useAppSelector(selectTreatmentReport);
    const solutionReport = useAppSelector(selectSolutionReport);
    const repeatedCalls = useAppSelector(selectRepeatedCalls);

    const cardsReportLoading = useAppSelector(selectCardsReportLoading);
    const treatmentReportLoading = useAppSelector(selectTreatmentReportLoading);
    const solutionReportLoading = useAppSelector(selectSolutionReportLoading);
    const repeatedCallsLoading = useAppSelector(selectRepeatedCallsLoading);

    useEffect(() => {
        dispatch(getCardsReport());
        dispatch(getTreatmentReport());
        dispatch(getSolutionReport());
        dispatch(getRepeatedCalls());
    }, [dispatch])

    return(
        <Grid>
            <Container maxWidth={"lg"}>
                <Grid container spacing={2} wrap={"nowrap"}>
                    <Grid>
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
                    <Grid>
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
                                        <TableCell>Решение</TableCell>
                                        <TableCell>Кол-во</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!solutionReportLoading && (
                                        solutionReport.map((item, index)=>{
                                            return(
                                                <TableRow key={index}>
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
            </Container>
        </Grid>
    );
};

export default Reports;