import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ModalSuccessError.css';

const ModalSuccessError = ({
    message,
    isOpen,
    type,
    onClose,
    onConfirm
}) => {
    useEffect(() => {
        if ((type === 'success' || type === 'error') && isOpen) {
            const timeout = setTimeout(() => {
                window.location.reload();
            }, 3000); // Recarga después de 3 segundos
            return () => clearTimeout(timeout);
        }
    }, [isOpen, type]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className={`modal-content ${type}`}>
                <div className={`modal-icon ${type}`}>
                    {type === 'success' && '✔'}
                    {type === 'error' &&  '✖'}
                    {type === 'confirm' &&  '⚠'}
                </div>
                <h2 className="modal-title">
                    {type === 'success' && 'Éxito!'}
                    {type === 'error' && 'Error!'}
                    {type === 'confirm' && '¿Estás seguro?'}
                </h2>

                <p className="modal-message">{message}</p>

                {type === 'confirm' && (
                    <>
                        <div className="modal-buttons">
                            <button className="btn btn-cancel" onClick={onClose}>Cancelar</button>
                            <button className="btn-confirm" onClick={onConfirm}>Continuar</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

ModalSuccessError.propTypes = {
    message: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'confirm']).isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
};

export default ModalSuccessError;
