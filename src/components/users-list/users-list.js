import UsersListItem from '../users-list-item/users-list-item';

import './users-list.css';

const UsersList = ({users, onActiveUser}) => {

    const elements = users.map(user => {
        const {id, ...itemProps} = user;
        return (
            <UsersListItem
                key={id} 
                id={id}
                {...itemProps}
                onActiveUser={() => onActiveUser(id)}/>
        )
    })

    return (
        <table className="app-list list-group">
            <thead>
                <tr className="app-list__head">
                    <th className="list-group-item__name">Имя</th>
                    <th className="list-group-item__age">Возраст</th>
                    <th className="list-group-item__gender">Пол</th>
                    <th className="list-group-item__phone">Телефон</th>
                    <th className="list-group-item__address">Адрес</th>
                </tr>
            </thead>
            <tbody>
                {elements}
            </tbody>
        </table>
    )
}

export default UsersList;