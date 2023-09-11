import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddressForm = ({ addressInfo, setAddressInfo}) => {
    const [countries, setCountries] = useState([]);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressInfo({
            ...addressInfo,
            [name]: value
        });
    };
    useEffect(() => {
        const fetchUserAddress = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };    
                const response = await axios.get('http://localhost:8080/api/user/get-address', config);
                const userAddress = response.data;
                setAddressInfo(userAddress);
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchUserAddress();
    }, []);
    
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const countryData = response.data.map(country => ({
                    name: country.name.common
                }));
                const sortedCountries = countryData.sort((a, b) => a.name.localeCompare(b.name));
                setCountries(sortedCountries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Shipping Information</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <select 
                        className="form-select" 
                        id="country" 
                        name="country" 
                        value={addressInfo.country || ''} 
                        onChange={handleAddressChange}
                    >
                        <option>Choose...</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="city" 
                        name="city" 
                        value={addressInfo.city || ''} 
                        onChange={handleAddressChange} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="province" className="form-label">Province</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="province" 
                        name="province" 
                        value={addressInfo.province || ''} 
                        onChange={handleAddressChange} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="street" className="form-label">Street Address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="street" 
                        name="street" 
                        value={addressInfo.street || ''} 
                        onChange={handleAddressChange} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="postalCode" className="form-label">Postal Code</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="postalCode" 
                        name="postalCode" 
                        value={addressInfo.postalCode || ''} 
                        onChange={handleAddressChange} 
                    />
                </div>
            </form>
        </div>
    );
};

export default AddressForm;
