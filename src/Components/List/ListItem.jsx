import dayjs from "dayjs";
import {TableCell, TableRow} from "@mui/material";

const ListItem = ({item}) => {
    return(
        <TableRow>
            <TableCell>{item.ls_abon}</TableCell>
            <TableCell>{dayjs().format(item.created_at)}</TableCell>
            <TableCell>{item.spec_full_name}</TableCell>
            <TableCell>{item.full_name}</TableCell>
            <TableCell>{item.phone_number}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.comment ? (
                    <>
                        {item.comment}
                    </>
                ): (
                    <>
                        Нет коментария
                    </>
                )}</TableCell>
            <TableCell>{item.reason}</TableCell>
            <TableCell>{item.reason ? (
                    <>
                        {item.reason}
                    </>
                ) : (
                    <>
                        Нет решения
                    </>
                )}</TableCell>
        </TableRow>
    );
};

export default ListItem;