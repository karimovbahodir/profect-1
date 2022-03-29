import { useState, useEffect } from 'react';
import './ModalPass.css'

const ModalPass = ({ closeModal, conditionMail}) => {

	const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
	const [formValid, setFormValid] = useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('Email не может быть пустым');

	useEffect(() => {
		if (emailError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [emailError])

	const onChangeEmail = (e) => {
		setEmail(e.target.value)
		if (!conditionMail.test(String(e.target.value).toLowerCase())) {
			setEmailError('Некорректный email');
		} else {
			setEmailError("")
		}
	}


	const blurHandler = (e) => {
		if (e.target.name==="email") {
				setConfirmPasswordDirty(true)
		}
	}

		return (
			<div className="modalPass">
				<div className="modalPass__container">
					<div className="form">
						<p>Пожалуйста, введите ваш адрес электронной почты, на который мы отправим ссылку для восстановления пароля</p>
						<div className="input-form">
							{(confirmPasswordDirty && emailError) && <div style={{ color: "red" }}>{emailError}</div>}
							<input type="text" name='confirmPassword' placeholder='Введите свой email'
								value={email}
								onChange={e => onChangeEmail(e)}
								onBlur={e => blurHandler(e)}
							/>
						</div>

						<button className="btn btn-primary" disabled={!formValid} onClick={closeModal}><div className='inner pass'>Отправить</div></button>
					</div>
				</div>
			</div>
		)
	} 

	export default ModalPass;