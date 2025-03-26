import Grid from "@mui/material/Grid2";
import {Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {selectList} from "../../features/list/listSlice.js";
import ListItem from "../../Components/List/ListItem.jsx";
import {useEffect} from "react";
import {getList} from "../../features/list/listThunk.js";

const CardsList = ()=>{

    const dispatch = useAppDispatch();
    const list = useAppSelector(selectList);

    useEffect(() => {
        // dispatch(getList());
    }, []);

    return(
        <>
            <Grid>
                <Container maxWidth={"lg"} sx={{
                    width: "100%",
                }}>
                    <TableContainer component={Paper} sx={{
                        margin: "30px 0 0"
                    }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                    {list.map((item, index)=>{
                                        return(
                                            <ListItem key={index} item={item}></ListItem>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Grid>
        </>
    );
};

export default CardsList;