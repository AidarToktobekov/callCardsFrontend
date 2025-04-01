import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {
    selectRepeatedCalls, selectRepeatedCallsLoading,
} from "../../features/reports/reportsSlice.js";
import {useEffect, useState} from "react";
import {
    getCardsReport,
    getRepeatedCalls,
} from "../../features/reports/reportsThunk.js";
import {
    Container,
    Paper, Typography
} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const columns = [
    {
        field: 'ls_abon',
        headerName: 'Личный счет',
        width: 250,
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'address',
        headerName: 'Адрес',
        width: 250,
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'phone_number',
        headerName: 'Номер телефона',
        width: 200,
        headerAlign: 'center',
        valueGetter: (value, _) => Array.isArray(value) ? value.join(', ') : value
    },
    {
        field: 'reason',
        headerName: 'Причина',
        width: 200,
        align: 'center',
        headerAlign: 'center',
        valueGetter: (value, _) => value?.title || '-'
    },
    {
        field: 'solution',
        headerName: 'Решение',
        width: 200,
        align: 'center',
        headerAlign: 'center',
        valueGetter: (value, _) => value?.title || '-'
    },
    {
        field: 'count',
        headerName: 'Кол-во',
        width: 130,
        align: 'center',
        headerAlign: 'center'
    }
];

const StatsByRepeatedCalls = () => {

    const dispatch = useAppDispatch();
    const [tableHeight, setTableHeight] = useState(0);

    const repeatedCalls = useAppSelector(selectRepeatedCalls);
    const loading = useAppSelector(selectRepeatedCallsLoading);


    useEffect(() => {
        dispatch(getCardsReport());
    }, [dispatch]);

    useEffect(() => {
        setTableHeight(changeTableHeight);
        document.body.addEventListener('resize', changeTableHeight);
    }, []);

    const changeTableHeight = () => {
        const headerHeight = document.querySelector('header').offsetHeight;
        const windowHeight = window.innerHeight;
        setTableHeight(windowHeight - headerHeight);
    }

    useEffect(() => {
        dispatch(getRepeatedCalls());
    }, [dispatch]);

    return(
        <>
            <Container maxWidth={"lg"}>
                <Typography variant={"h1"} sx={{
                    fontSize: "25px",
                    color: '#fff',
                    textAlign: 'center',
                    margin: "20px 0"
                }}>
                    Отчет по повторным звонакам
                </Typography>
                <Paper
                    sx={{
                        height: `${tableHeight}px`,
                        width: 'fit-content',
                        margin: '0 auto'
                    }}
                >
                    <DataGrid
                        rows={repeatedCalls}
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

export default StatsByRepeatedCalls;
