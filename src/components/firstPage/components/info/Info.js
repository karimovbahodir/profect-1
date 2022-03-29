import './Info.css';
import PropTypes from 'prop-types';
import { useEffect, useState,  } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useService from '../../services/Service';


const Info = (props) => {

	const [char, setChar] = useState(null);

	const { loading, error, getCake, clearError } = useService();

	useEffect(() => {
		upData()
	}, [props.charId])


	const upData = () => {
		const { charId } = props;
		if (!charId) {
			return;
		}

		clearError();
		getCake(charId)
			.then(onCharLoaded)
	}

	const onCharLoaded = (char) => {
		setChar(char);
	}



		const skeleton = char || loading || error ? null : <Skeleton />;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error || !char) ? <View char={char} /> : null;


		return (
			<div className="char__info">
				{skeleton}
				{errorMessage}
				{spinner}
				{content}
			</div>
		)
	
}

const View = ({ char }) => {

	const { name, description, thumbnail } = char;


	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} />
				<div>
					<div className="char__info-name">{name}</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
		</>
	)
}

Info.propTypes = {
	charId: PropTypes.string
}

export default Info;
