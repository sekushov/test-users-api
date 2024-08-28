import './modal.css';

const Modal = ({user, removeActiveUser}) => {
    let styleDisplay;
    if (!user) {
        styleDisplay = "none";
        return
    }
    const {firstName, lastName, age, address, height, weight, phone, email} = user;
    styleDisplay = "flex";
    return (
        <div className="modal modal" style={{display: styleDisplay}}>
            <div className="modal__content">
                <div className="modal__close" onClick={() => removeActiveUser()}>&times;</div>
                <div className="modal__title">{firstName} {lastName}</div>
                <ul className="modal__list">
                    <li className="modal__list-item"><span className="modal__item-title">Возраст: </span> <span>{age}</span></li>
                    <li className="modal__list-item"><span className="modal__item-title">Адрес: </span> <span>{address.address}, {address.city}</span></li>
                    <li className="modal__list-item"><span className="modal__item-title">Рост: </span> <span>{height}</span></li>
                    <li className="modal__list-item"><span className="modal__item-title">Вес: </span> <span>{weight}</span></li>
                    <li className="modal__list-item"><span className="modal__item-title">Телефон: </span> <span>{phone}</span></li>
                    <li className="modal__list-item"><span className="modal__item-title">Email: </span> <span>{email}</span></li>
                </ul>
            </div>
            
        </div>
    );
}

export default Modal;