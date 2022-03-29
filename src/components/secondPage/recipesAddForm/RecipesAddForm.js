import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHttp } from '../../../hooks/http.hook';
import { recipeCreated } from '../recipesList/recipesSlice';
import uuid from 'react-uuid';
import store from '../../../store';
import { selectAll } from "../recipesFilters/filtersSlice";

const RecipesAddForm = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [element, setElement] = useState('');

    const { filterLoadingStatus } = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const { request } = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newRecipe = {
            id: uuid(),
            name,
            description: desc,
            element
        }
        request('https://623440b96d5465eaa516b024.mockapi.io/recepts', "POST", JSON.stringify(newRecipe))
            .then(dispatch(recipeCreated(newRecipe)))
            .catch(error => {
                throw Error(`Something went wrong, like ${error}`)
            })

        setName('');
        setDesc('');
        setElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({ name, label }) => {
                if (name === 'all') return;
                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Название рецепта...</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Название торта?"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Описание?"
                    style={{ "height": '130px' }}
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать вид выпечки</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)}>
                    <option >...</option>
                    {renderFilters(filters, filterLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default RecipesAddForm;