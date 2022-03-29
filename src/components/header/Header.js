import './Header.css';

import { ModalContext } from '../firstPage/components/context/modalContext/ModalContext';
import { useState, useContext } from 'react';
import ModalSigin from '../firstPage/components/modalSigin/ModalSigin';
import ModalPass from '../firstPage/components/modalPass/ModalPass';
import ModalReg from '../firstPage/components/modalReg/ModalReg';
import {Link} from 'react-router-dom';



const Header = () => {
	const [avatar, setAvatar] = useState(false);
	
	const { openModal, closeModal } = useContext(ModalContext);

	const conditionMail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	const checkOut=()=> {
		closeModal();
		setAvatar(true);
		handlerWillDone()
	}
	
	const handlerReg = () => {
		openModal({
			title: "регистрация",
			children: <ModalReg checkOut={checkOut} 
			handlerWillDone={handlerWillDone}
			conditionMail={conditionMail}
			/>
		})
	}

	const handlerPass = () => {
		openModal({
			title: "ВОССТАНОВЛЕНИЕ ПАРОЛЯ",
			children: <ModalPass closeModal={closeModal} 
			conditionMail={conditionMail} />
		})
	}


	const handlerClick = () => {
		openModal({
			title: "вход",
			children: <ModalSigin  handlerReg={ handlerReg} 
			handlerPass={handlerPass} 
			checkOut={checkOut}
			conditionMail={conditionMail}
			/>
		});
	}

	const handlerWillDone = () => {
		openModal({
			title: "добро пожаловать!",
			children: <img src="https://cdn.dribbble.com/users/1291846/screenshots/3720238/media/f275d62e0db2b53f7e732c6496db6523.png?compress=1&resize=400x300&vertical=top"/>
		});
	}


   return (
      <div className="header__block ">
         <div className="logo">
            <Link className='links' to="/">Книга кулинарных рецептов</Link>
         </div>
         <div className="pages">
				<div className="pages__flex">
            	<div className="favorites text-center">
               	<Link className='links' to="firstPage">Популярные выпечки</Link>
            </div>
            <div className="commit__recipes active text-center">
               <Link className='links' to="secondPage">Поделиться рецептом</Link>
            </div>
				
				</div>
				<div className="avatar">
						{avatar ? <img className='avatarimg' src="https://statrielt.ru/images/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efde29670.9426602115508108779281.png" /> : <button className="btn btn-primary"><div className="inner" onClick={handlerClick}>Войти</div></button>}
					</div>
         </div>
      </div>
   )

}

export default Header;