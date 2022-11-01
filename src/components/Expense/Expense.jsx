import { IoTrashBinOutline } from 'react-icons/io5';



export default function Expens(props) {
    return (
        <tr>
            <td>{props.expens.name}</td>
            <td>{props.expens.cost}</td>
            <td>{props.expens.category}</td>
            <td>{props.expens.date}</td>
            <td><button onClick={props.remove}>{<IoTrashBinOutline />}</button></td>
        </tr>
    )
}