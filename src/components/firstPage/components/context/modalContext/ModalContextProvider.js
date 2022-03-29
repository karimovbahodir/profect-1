import React, { useState } from 'react';
import {ModalContext} from './ModalContext';
import Modal from '../../modal/Modal';

export const ModalProvider=({children})=>{
	const [modalOpaned, setModalOpaned]= useState(false);
	const [modalContent, setModalContent]=useState(null);


	const openModal=(modalConfig)=>{
		
		setModalContent(modalConfig);

		setModalOpaned(true);
	}

	const closeModal=()=>{
		setModalOpaned(false);
	}

	const ValueModalProvider={
		openModal,
		closeModal,
	}
	
	return (
		<ModalContext.Provider value={ValueModalProvider}>
			{modalOpaned && <Modal {...modalContent}/> }
			{children}
		</ModalContext.Provider>
	)
}