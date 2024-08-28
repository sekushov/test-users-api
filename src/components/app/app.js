import { Component } from 'react';

import SearchPanel from '../search-panel/search-panel';
import UsersList from '../users-list/users-list';
import Modal from '../modal/modal';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],       // данные с api
            term: '',       // поисковый запрос
            activeUser: ''  // пользователь для модалки
        } 
    }
   
    componentDidMount = () => {
        fetch("https://dummyjson.com/users")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    users: json.users
                });
            }).catch(() => console.log('Сбой загрузки данных'));
    }

    onChangeSearch = (term) => {
        this.setState({term})
    }
    searchUsers = (users, term) => {
        if (term === '') {
            return users
        }
        const termValid = term.toLowerCase().trim();
        return users.filter(user => {
            for (let key in user) {
                if (key === 'firstName' || key === 'lastName' || key === 'age' || key === 'gender' || key === 'phone' || key === 'address') {
                    // проходим по вложенным в user объектам
                    if (typeof(user[key]) === 'object') {
                        for (let key2 in user[key]) {
                            if (key2 === 'address' || key2 === 'city') {
                                let userValue2Valid = String(user[key][key2]).toLowerCase().trim();
                                // если в строке найдено выражение
                                if (userValue2Valid.indexOf(termValid) > -1) {
                                    // проверяем предыдущий символ в строке перед найденным выражением. Чтобы поиск был с начала слов, а не с середины
                                    if (userValue2Valid[userValue2Valid.indexOf(termValid) - 1] === undefined || userValue2Valid[userValue2Valid.indexOf(termValid) - 1] === ' ') {
                                        // console.log(key + ' - ' + user[key][key2]);
                                        return true
                                    }
                                }
                            }
                        }
                    }
                    const userValueValid = String(user[key]).toLowerCase().trim();
                    // если в строке найдено выражение
                    if (userValueValid.indexOf(termValid) > -1) {
                        //проверяем предыдущий символ в строке перед найденным выражением. Чтобы поиск был с начала слов, а не с середины
                        if (userValueValid[userValueValid.indexOf(termValid) - 1] === undefined || userValueValid[userValueValid.indexOf(termValid) - 1] === ' ') {
                            // console.log(key + ' - ' + user[key]);
                            return true
                        }
                    }
                }
               
            }
        });
    }

    onActiveUser = (id) => {
        fetch(`https://dummyjson.com/users/${id}`)
            .then(res => res.json())
            .then(user => {
                this.setState(() => ({
                    activeUser: user
                }));
            }).catch(() => console.log('Сбой загрузки данных'))
    }
    removeActiveUser = () => {
        this.setState(() => ({
            activeUser: ''
        }))
    }


    render() {
        const {users, term} = this.state;
        const filteredUsers = this.searchUsers(users, term);

        return (
            <div className="app">
                <div className="search-panel">
                    <SearchPanel 
                        onChangeSearch={this.onChangeSearch}/>
                </div>
    
                <UsersList 
                    users={filteredUsers}
                    onActiveUser={this.onActiveUser}/>

                <Modal 
                    user={this.state.activeUser}
                    removeActiveUser={this.removeActiveUser}/>
            </div>
        )
    }
}

export default App;