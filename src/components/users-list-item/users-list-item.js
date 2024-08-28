import './users-list-item.css';

const UsersListItem = ({firstName, lastName, age, gender, phone, address, onActiveUser}) => {

    return (
        <tr className="list-group-item"
            onClick={(id) => onActiveUser(id)}>
            <td className="list-group-item__name">
                {firstName} {lastName}
            </td>
            <td className="list-group-item__age">
                {age}
            </td>
            <td className="list-group-item__gender">
                {gender}
            </td>
            <td className="list-group-item__phone">
                {phone}
            </td>
            <td className="list-group-item__address">
                {address.address}, {address.city}
            </td>
        </tr>
    );
}

export default UsersListItem;