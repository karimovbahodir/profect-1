import {useHttp} from '../../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {activeFilterChanged,  fetchFilters, selectAll} from './filtersSlice';
import classNames from 'classnames';




const RecipesFilters = () => {

    const {  filterLoadingStatus, activeFilter } = useSelector(state => state.filters);
    const filters = useSelector(store => selectAll(store));
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));
    }, []);

    if (filterLoadingStatus === "loading") {
        return <h3>Идет загрузка</h3>;
    } else if (filterLoadingStatus === "error") {
        return <h3 className="text-center mt-5">Ошибка загрузки</h3>
    }

    const filterRendering = (arr) => {
        if (arr.length === 0) {
            return <h4 className="text-center mt-5">Фильтры не найдены</h4>
        }

        return arr.map(({ name, className, label }) => {

            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            return <button
                key={name}
                id={name}
                className={btnClass}
                onClick={() => dispatch(activeFilterChanged(name))}
            >{label}</button>
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">фильтрация по составной</p>
                <div className="btn-group">
                    {filterRendering(filters)}
                </div>
            </div>
        </div>
    )
}

export default RecipesFilters;