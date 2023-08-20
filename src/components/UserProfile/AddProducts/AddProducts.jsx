import { useState, useEffect } from 'react';
import axios from 'axios';

function AddProducts() {
    const [productType, setProductType] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [types, setTypes] = useState([]);
    const [genres, setGenres] = useState([]);
    const [colors, setColors] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [imageFiles, setImageFiles] = useState([]);
    const [releaseYear, setReleaseYear] = useState(null);
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [color, setColor] = useState("");

    const [errorMessages, setErrorMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateFields();
        if (validationErrors.length > 0) {
            setErrorMessages(validationErrors);
            return;
        } else{
            setErrorMessages([]);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
    
            imageFiles.forEach(file => {
                formData.append('images', file);
            });
    
            switch (productType) {
                case "CD":
                case "VINYL":
                    formData.append('releaseYear', releaseYear);
                    formData.append('author', author);
                    formData.append('genre', genre);
                    formData.append('productType', productType);
                    break;
                case "SHIRT":
                    selectedSizes.forEach(size => {
                        formData.append('sizes', size);
                    });                
                    formData.append('color', color);
                    break;
                default:
                    break;
            }
    
            try {
                const endpointMap = {
                    SHIRT: '/api/products/shirt',
                    CD: '/api/products/music-format',
                    VINYL: '/api/products/music-format'
                };
                await axios.post("http://localhost:8080"+endpointMap[productType], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                console.log("Producto añadido con éxito!");
    
                // Restablecer campos del formulario si es necesario
                // ...
    
            } catch (error) {
                console.error("Error al añadir producto:", error);
            }
        }
       
    };

    const validateFields = () => {
        const errors = [];
    
        if (!name) errors.push("El nombre es obligatorio.");
        if (!description) errors.push("La descripción es obligatoria.");
        if (!price) errors.push("El precio es obligatorio.");
        if (!productType) errors.push("El tipo de producto es obligatorio.");
    
        switch (productType) {
            case "CD":
            case "VINYL":
                if (!releaseYear) errors.push("El año de lanzamiento es obligatorio.");
                if (!author) errors.push("El autor es obligatorio.");
                if (!genre) errors.push("El género es obligatorio.");
                break;
            case "SHIRT":
                if (!selectedSizes.length) errors.push("Debe seleccionar al menos una talla.");
                if (!color) errors.push("El color es obligatorio.");
                break;
            default:
                break;
        }
    
        return errors;
    };
    

    // Manejador para el cambio de archivos
    const handleFileChange = (e) => {
        console.log(e.target.files)
        setImageFiles([...e.target.files]);
    };
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const typeResponse = await axios.get('http://localhost:8080/api/products/product-types');
                const sizeResponse = await axios.get('http://localhost:8080/api/products/product-sizes');
                const genreResponse = await axios.get('http://localhost:8080/api/products/product-genres');
                const colorResponse = await axios.get('http://localhost:8080/api/products/product-colors');
                setTypes(typeResponse.data);
                setSizes(sizeResponse.data);
                setGenres(genreResponse.data);
                setColors(colorResponse.data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchProductData();
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Añadir Producto</h3>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Tipo</label>
                            <select className="form-control" value={productType} onChange={(e) => setProductType(e.target.value)}>
                                <option value="">Selecciona un tipo</option>
                                {types.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Precio</label>
                            <input type="number" step="0.01" className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Imagenes promocionales</label>
                            <input type="file" className="form-control" multiple onChange={handleFileChange} />
                        </div>
                        {productType === "CD" || productType === "VINYL" ? (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Año de lanzamiento</label>
                                    <input type="number" className="form-control" value={releaseYear} onChange={e => setReleaseYear(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Autor</label>
                                    <input type="text" className="form-control" value={author} onChange={e => setAuthor(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Género</label>
                                    <select className="form-control" value={genre} onChange={e => setGenre(e.target.value)}>
                                        <option value="">Selecciona un género</option>
                                        {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
                                    </select>
                                </div>
                            </>
                        ) : null}
                        {productType === "SHIRT" ? (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Tallas disponibles</label>
                                    <select multiple className="form-control" value={selectedSizes} onChange={e => setSelectedSizes([...e.target.options].filter(option => option.selected).map(option => option.value))}>
                                        {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Color</label>
                                    <select className="form-control" value={color} onChange={e => setColor(e.target.value)}>
                                        <option value="">Selecciona un color</option>
                                        {colors.map(color => <option key={color} value={color}>{color}</option>)}
                                    </select>
                                </div>
                            </>
                        ) : null}
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Añadir</button>
                        </div>
                    </form>
                    {errorMessages.length > 0 && (
            <div className="alert alert-danger">
                {errorMessages.map((error, index) => (
                    <div key={index}>{error}</div>
                ))}
            </div>
        )}
                </div>
            </div>
        </div>
    );
    
}

export default AddProducts;
