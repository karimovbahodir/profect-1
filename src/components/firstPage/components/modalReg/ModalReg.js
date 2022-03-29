import { useState, useEffect } from 'react';
import './ModalReg.css'

const ModalPass = ({ checkOut, conditionMail}) => {
	const [name, setName]=useState('');
	const [surname, setSurname]=useState('');
	const [pass, setPass]=useState('');
	const [emailDirty, setEmailDirty] = useState(false);
	const [passDirty, setPassDirty] = useState(false);
	const [passError, setPassError] = useState('Пароль не может быть пустым');
	const [formValid, setFormValid]=useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('Email не может быть пустым');


	const onChangeName=(e)=>{
		setName(e.target.value)
	}

	const onChangeSurname=(e)=>{
		setSurname(e.target.value)
	}

	useEffect (()=>{
		if( emailError || passError){
			setFormValid(false)
		}else{
			setFormValid(true)
		}
	}, [emailError, passError])

	const blurHandler = (e) => {
		switch (e.target.name) {
			case "email":
				setEmailDirty(true)
				break
			case "pass":
				setPassDirty(true)
				break
		}
	}

	const onChangeEmail = (e) => {
		setEmail(e.target.value)
		if (!conditionMail.test(String(e.target.value).toLowerCase())) {
			setEmailError('Некорректный email');
		} else {
			setEmailError("")
		}
	}

	const onChangePass = (e) => {
		setPass(e.target.value)
		if(e.target.value.length<3 || e.target.value.length > 8){
			setPassError("Пароль должен быть длиннее 3 и меньше 8")
			if(!e.target.value){
				setPassError("Пароль не может быть пустым")
			}
		}else{
			setPassError('')
		}
	}

	return (
		<div className="modalPass">
			<div className="modalPass__container">
				<div className="form">	
					<div className="input-form">
						<input name='name' type="text" value={name} placeholder='Имя' onChange={onChangeName}/>
					</div>
					<div className="input-form">
						<input name='surname' type="text" value={surname} placeholder='Фамилия' onChange={onChangeSurname}/>
					</div>
					<div className="input-form">
						{(emailDirty && emailError) && <div style={{ color: "red" }}>{passError}</div>}
						<input name='email' type="text" value={email} placeholder='Email' onChange={e=>onChangeEmail(e)} onBlur={e => blurHandler(e)}/>
					</div>
					<div className="input-form">
						{(passDirty && passError) && <div style={{ color: "red" }}>{passError}</div>}	
						<input name='pass' type="text" value={pass} placeholder='Пароль' onChange={e=>onChangePass(e)} onBlur={e => blurHandler(e)}/>
					</div>
					<button className="btn btn-primary" disabled={!formValid} onClick={checkOut}><div className='inner reg'>Создать</div></button>
				</div>
			</div>
		</div>
	)
}

export default ModalPass;