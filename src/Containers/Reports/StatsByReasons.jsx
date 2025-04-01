import {
    Container,
    Paper, Typography,
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {
    selectTreatmentReport, selectTreatmentReportLoading
} from "../../features/reports/reportsSlice.js";
import {useEffect, useState} from "react";
import {
    getTreatmentReport
} from "../../features/reports/reportsThunk.js";
import {DataGrid} from "@mui/x-data-grid";

const columns = [
    {
        field: 'reason',
        headerName: 'Причина',
        width: 250,
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'count',
        headerName: 'Кол-во',
        width: 130,
        align: 'center',
        headerAlign: 'center'
    }
];


const StatsByReasons = () => {

    const dispatch = useAppDispatch();
    const [tableHeight, setTableHeight] = useState(0);

    const treatmentReport = useAppSelector(selectTreatmentReport);
    const loading = useAppSelector(selectTreatmentReportLoading);

    useEffect(() => {
        dispatch(getTreatmentReport());
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

    return(
        <>
            <Container maxWidth={"lg"}>
                <Typography variant={"h1"} sx={{
                    fontSize: "25px",
                    color: '#fff',
                    textAlign: 'center',
                    margin: "20px 0"
                }}>
                    Отчет по причинам
                </Typography>
                <Paper
                    sx={{
                        height: `${tableHeight}px`,
                        width: 'fit-content',
                        margin: '0 auto'
                    }}
                >
                    <DataGrid
                        rows={treatmentReport}
                        getRowId={() =>  Math.random()}
                        columns={columns}
                        initialState={{}}
                        pageSizeOptions={[
                            20,
                            50,
                            100
                        ]}
                        pageSize={100}
                        sx={{ border: 0,width: 'fit-content'}}
                        loading={loading}
                    />
                </Paper>
            </Container>
        </>
    );
};

export default StatsByReasons;