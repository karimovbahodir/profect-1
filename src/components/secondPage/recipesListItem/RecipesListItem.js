
const RecipesListItem = ({ name, description, element, deleteRecipe }) => {

    let elementClassName;

    switch (element) {
        case 'торт':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'чизкейк':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'капкейк':
            elementClassName = 'bg-success bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    return (
        <li
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src="https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/rainbow-cake760x580.jpg?ext=.jpg"
                className="img-fluid w-25 d-inline"
                alt="cake"
                style={{ 'objectFit': 'cover' }} />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light"
                onClick={deleteRecipe}>
                <button type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )
}

export default RecipesListItem;