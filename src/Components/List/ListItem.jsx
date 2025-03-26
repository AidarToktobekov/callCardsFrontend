import dayjs from "dayjs";
import {List, ListItemText, TableCell, TableRow} from "@mui/material";

const ListItem = ({item}) => {
    return(
        <TableRow>
            <TableCell>{item.ls_abon}</TableCell>
            <TableCell>{dayjs().format(item.created_at)}</TableCell>
            <TableCell>{item.spec_full_name}</TableCell>
            <TableCell>{item.full_name}</TableCell>
            <TableCell>
                <List>
                    {typeof (item.phone_number) === "object" &&
                        <>
                            {item.phone_number.map((phone, index)=>{
                                return(
                                    <ListItemText key={index}>
                                        {phone}
                                    </ListItemText>
                                )
                            })}
                        </>
                    }
                </List>
            </TableCell>
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