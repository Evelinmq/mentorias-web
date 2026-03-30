import React from 'react';

const CheckboxGroup = ({ label, options, register, name, rules }) => {

    // Estilos internos (CSS-in-JS)
    const styles = {
        container: {
            marginTop: '15px',
            marginBottom: '20px',
            textAlign: 'left',
            width: '100%'
        },
        label: {
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1a2e5a',
            marginBottom: '10px'
        },
        optionsGrid: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
        },
        item: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            color: '#495057',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'background 0.2s'
        },
        checkbox: {
            cursor: 'pointer',
            width: '16px',
            height: '16px',
            accentColor: '#1a2e5a'
        }
    };

    return (
        <div style={styles.container}>
            {label && <span style={styles.label}>{label}</span>}
            <div style={styles.optionsGrid}>
                {options.map((option) => (
                    <label key={option.value} style={styles.item} className="checkbox-hover">
                        <input
                            type="checkbox"
                            value={option.value}
                            style={styles.checkbox}
                            {...register(name, rules)}
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;