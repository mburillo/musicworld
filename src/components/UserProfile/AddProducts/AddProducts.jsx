import { useState, useEffect } from 'react';
import axios from 'axios';

function AddProducts() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
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
    const [promoType, setPromoType] = useState("");

    const [errorMessages, setErrorMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateFields();
        if (validationErrors.length > 0) {
            setErrorMessages(validationErrors);
            return;
        } else {
            setErrorMessages([]);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);

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
                let endpoint = "";
                if (productType === "PROMOTIONALIMAGE") {
                    endpoint = '/api/promotional-images/add';
                    formData.append('promoType', promoType);
                } else {
                    const endpointMap = {
                        SHIRT: '/api/products/shirt',
                        CD: '/api/products/music-format',
                        VINYL: '/api/products/music-format'
                    };
                    endpoint = endpointMap[productType];
                    formData.append('price', price);
                }
                for (var pair of formData.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                }
                await axios.post(`${API_BASE_URL}` + endpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log("Producto añadido con éxito!");

            } catch (error) {
                console.error("Error al añadir producto:", error);
            }
        }

    };

    const validateFields = () => {
        const errors = [];

        if (!name) errors.push("The name field is required.");
        if (!description) errors.push("The description is required");
        if (!productType) errors.push("The product's type is required.");
        if (productType !== "PROMOTIONALIMAGE") {
            if (!price) errors.push("The price is required.");
        }
        switch (productType) {
            case "CD":
            case "VINYL":
                if (!releaseYear) errors.push("The release year is required.");
                if (!author) errors.push("The author ir required.");
                if (!genre) errors.push("The genre is required.");
                break;
            case "SHIRT":
                if (!selectedSizes.length) errors.push("You must select at least one size.");
                if (!color) errors.push("The color is required.");
                break;
            default:
                break;
        }

        return errors;
    };


    const handleFileChange = (e) => {
        console.log(e.target.files)
        setImageFiles([...e.target.files]);
    };
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const typeResponse = await axios.get(`${API_BASE_URL}/api/products/product-types`);
                const sizeResponse = await axios.get(`${API_BASE_URL}/api/products/product-sizes`);
                const genreResponse = await axios.get(`${API_BASE_URL}/api/products/product-genres`);
                const colorResponse = await axios.get(`${API_BASE_URL}/api/products/product-colors`);
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
            <h3 className="text-center mb-4">Add product</h3>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Type</label>
                            <select className="form-control" value={productType} onChange={(e) => setProductType(e.target.value)}>
                                <option value="">Select a type</option>
                                {types.map(type => <option key={type} value={type}>{type}</option>)}
                                <option key="Promo" value="PROMOTIONALIMAGE">PROMOTIONAL IMAGE</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                        {productType !== "PROMOTIONALIMAGE" && (
                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input type="number" step="0.01" className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
                            </div>
                        )}
                        {productType === "PROMOTIONALIMAGE" && (
                            <div className="mb-3">
                                <label className="form-label">Promo Type</label>
                                <select className="form-control" value={promoType} onChange={(e) => setPromoType(e.target.value)}>
                                    {types.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">Promotional images</label>
                            <input type="file" className="form-control" multiple onChange={handleFileChange} />
                        </div>
                        {productType === "CD" || productType === "VINYL" ? (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Release year</label>
                                    <input type="number" className="form-control" value={releaseYear} onChange={e => setReleaseYear(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Author</label>
                                    <input type="text" className="form-control" value={author} onChange={e => setAuthor(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Genre</label>
                                    <select className="form-control" value={genre} onChange={e => setGenre(e.target.value)}>
                                        <option value="">Select a genre</option>
                                        {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
                                    </select>
                                </div>
                            </>
                        ) : null}
                        {productType === "SHIRT" ? (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Available sizes</label>
                                    <select multiple className="form-control" value={selectedSizes} onChange={e => setSelectedSizes([...e.target.options].filter(option => option.selected).map(option => option.value))}>
                                        {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Color</label>
                                    <select className="form-control" value={color} onChange={e => setColor(e.target.value)}>
                                        <option value="">Select a color</option>
                                        {colors.map(color => <option key={color} value={color}>{color}</option>)}
                                    </select>
                                </div>
                            </>
                        ) : null}
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Add</button>
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
