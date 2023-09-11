import { useState, useEffect } from 'react';
import AddressForm from "../../ProcessPayment/AddressForm/AddressForm";
import axios from 'axios';

function UserSettings() {
    const [addressInfo, setAddressInfo] = useState({});
    const [saveAddress, setSaveAddress] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    const updateUserSettings = async () => {
        const token = localStorage.getItem("authToken");
        console.log(token)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.put('http://localhost:8080/api/user/update', addressInfo, config);
            if (response.status === 200) {
                setMessage("User settings updated successfully");
                setMessageType("success");
            }
        } catch (error) {
            console.error('Error updating user settings:', error);
            setMessage("Failed to update user settings");
            setMessageType("danger");
        }
    };

    return (
        <div>
            <h3 className='text-center'>User Settings</h3>
            <AddressForm 
                addressInfo={addressInfo} 
                setAddressInfo={setAddressInfo} 
                saveAddress={saveAddress} 
                setSaveAddress={setSaveAddress} 
            />
            <div className="text-center mt-4 mb-4">
                <button className="btn btn-primary" onClick={updateUserSettings}>
                    Update Settings
                </button>
            </div>
            {message && (
                <div className={`alert alert-${messageType} text-center mt-4`} role="alert">
                    {message}
                </div>
            )}
        </div>
    );
}

export default UserSettings;
