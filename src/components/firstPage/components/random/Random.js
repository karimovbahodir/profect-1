import './Random.css';
import ErrorMessage from '../errorMessage/ErrorMessage';
import capckec from '../../resources/img/капкейк.jpg';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import useService from '../../services/Service';

const Random = () => {
	const [char, setChar] = useState(null);
	
	const {loading, error, getCake, clearError}=useService();

	useEffect(() => {
		upDate();
		const timerId = setInterval(upDate, 60000);

		return () => {
			clearInterval(timerId)
		}
	}, [])


	const onCharLoaded = (char) => {
		setChar(char);
	}


	const upDate = () => {
		clearError();
		const id = Math.floor(Math.random() * (17 - 1) + 1);
		getCake(id)
			.then(onCharLoaded );
	}




	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="randomchar">
			{errorMessage}
			{spinner}
			{content}
			<div className="randomchar__static">
				<p className="randomchar__title">
					Случайный десерт на сегодня!<br />
					Вы хотите узнать рецепт?
				</p>
				<p className="randomchar__title">
					Или выберите другой
				</p>
				<button onClick={upDate} className="btn btn-primary">
					<div>Случайный десерт</div>
				</button>
				<img src={capckec} alt="capckec" className="randomchar__decoration" />
			</div>
		</div>
	)

}
const View = ({ char }) => {
	const { name, description, thumbnail } = char;

	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img" />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{description.length > 200 ? description.slice(0, 200) + '...' : description}
				</p>
			</div>
		</div>
	)
}

export default Random;