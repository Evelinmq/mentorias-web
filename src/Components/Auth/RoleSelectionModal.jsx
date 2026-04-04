import React from "react";
import Button from "../Common/Button";
import logo from "../../assets/logo.png";

const RoleSelectionModal = ({ isOpen, onSelectRole }) => {
    if (!isOpen) return null;

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        },
        content: {
            background: 'white',
                padding: '30px',
                borderRadius: '15px',
                textAlign: 'center',
                width: '90%',
                maxWidth: '400px',
                boxShadow: '0px 10px 25px rgba(0,0,0,0.2)'
        },
        title: {
            marginBottom: '20px',
                color: '#333',
                fontSize: '1.5rem'
        },
        buttonContainer: {
            display: 'flex',
                flexDirection: 'column',
                gap: '12px'
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.content}>
                <img src={logo} alt="Logo" style={{ width: "80px", marginBottom: "15px" }} />
                <h3 style={styles.title}>¿Qué rol deseas usar?</h3>
                <div style={styles.buttonContainer}>
                    <Button
                        text="Mentor"
                        className="login-btn"
                        onClick={() => onSelectRole("mentor")}
                    />
                    <Button
                        text="Aprendiz"
                        className="login-btn"
                        onClick={() => onSelectRole("aprendiz")}
                    />
                </div>
            </div>
        </div>
    );
};

export default RoleSelectionModal;