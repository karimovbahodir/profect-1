
import { useContext, useState } from 'react';
import { ModalContext } from '../context';
import './Modal.css'

const Modal =(props)=>{
	const {children, title}=props;
	const {closeModal} = useContext(ModalContext);
	const [closing, setClosing] =useState(false);

	const handleClose=()=>{
		setClosing(true);

		const closeTimeout= setTimeout(()=>{
			closeModal();
			clearTimeout(closeTimeout);
		}, 300)
	}

	

	const backdropClasses = closing ? 'backdrop backdrop-hide' : 'backdrop';

	return(
		<div className={backdropClasses} onClick={handleClose}>
			<div className='modal__all' onClick={e => e.stopPropagation()}>
				<div className='modal-header'>
					<h3>{title}</h3>
				</div>
				<div className='modal-body'>
					{children}
				</div>
			</div>
		</div>	
	)
}

export default Modal;