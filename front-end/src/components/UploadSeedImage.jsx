import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { getTokenInfo } from '../../helpers/getjwt';

const API = import.meta.env.VITE_REACT_APP_API;

export const UploadImage = ({ isOpen, onClose, selectedSemilla }) => {
    
    const [token, setToken] = useState(null);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            const Token = await getTokenInfo();
            setToken(Token);
        };
        fetchData();
    }, []);
    
    if (!isOpen) return null;
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!image) {
            setUploadStatus("Please select an image first");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch(`${API}/semillas/upload-image/${selectedSemilla}`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": token
                },
                body: formData
            });

            if (response.ok) {
                console.log(response)
                setUploadStatus("Image uploaded successfully!");
                setTimeout(() => {
                    onClose();
                    window.location.reload();
                }, 1500);
        }
            else {
                setUploadStatus("Failed to upload image");
                console.log(response);
            }
        } catch (error) {
            setUploadStatus("Failed to upload image");
            console.error(error);
        }
    };

    return (
        <div className="modalEditarProductosAdmin" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>X</button>
                <h2>Upload Seed Image</h2>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="form-control"
                />
                {preview && (
                    <div className="preview-container">
                        <img src={preview} alt="Preview" width="200" />
                    </div>
                )}
                <button 
                    onClick={handleUpload}
                    className="btn-upload"
                    disabled={!image}
                >
                    Upload
                </button>
                <p className="upload-status">{uploadStatus}</p>
            </div>
        </div>
    );
};

UploadImage.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedSemilla: PropTypes.number
};

export default UploadImage;
