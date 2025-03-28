import Grid from "@mui/material/Grid2";
import {
    CircularProgress,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {selectList, selectListLoading} from "../../features/list/listSlice.js";
import ListItem from "../../Components/List/ListItem.jsx";
import {useEffect} from "react";
import {getList} from "../../features/list/listThunk.js";

const CardsList = ()=>{

    const dispatch = useAppDispatch();
    const list = useAppSelector(selectList);
    const loading = useAppSelector(selectListLoading);

    useEffect(() => {
        dispatch(getList());
    },[dispatch]);

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
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Лицевой счет</TableCell>
                                    <TableCell>Дата</TableCell>
                                    <TableCell>Сотрудник</TableCell>
                                    <TableCell>ФИО Клиента</TableCell>
                                    <TableCell>Номер телефона</TableCell>
                                    <TableCell>Адрес</TableCell>
                                    <TableCell>Коментарий</TableCell>
                                    <TableCell>Причина</TableCell>
                                    <TableCell>Решение</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!loading && (
                                    list.map((item, index)=>{
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