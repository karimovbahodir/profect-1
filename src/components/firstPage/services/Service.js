import {useMainHttp} from '../../../hooks/main.hook';

const useService=()=> {
	const {loading, request, error, clearError}=useMainHttp();

	
	const getAllCakes = async () =>{
		const res= await request("https://623c0cc58e9af587894af58c.mockapi.io/cakes");
		return res.map(_transformCakes)
	}

	const getCake = async (id) =>{
		const res= await request(`https://623c0cc58e9af587894af58c.mockapi.io/cakes/${id}` );
		return _transformCakes(res);
	}

	const _transformCakes=(char)=>{
		return {
			id: char.id,
			name: char.name,
			description: char.description,
			thumbnail: char.thumbnail
		}
	}

	return {loading, error, clearError, getAllCakes, getCake}
}

export default useService;

