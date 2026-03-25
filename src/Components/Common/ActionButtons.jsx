import React from "react";
import iconEdit from "../../assets/EditIcon.png";
import iconBlock from "../../assets/DesactivateIcon.png";
import iconDelete from "../../assets/TrashIcon.png";

const ActionButtons = ({
                           onEdit,
                           onDelete,
                           onBlock,
                           showEdit = true,
                           showDelete = true,
                           showBlock = true
                       }) => {

    return (
        <div className="acciones-celda">

            {showEdit && (
                <button className="btn-accion" onClick={onEdit}>
                    <img src={iconEdit} alt="Editar" />
                </button>
            )}

            {showBlock && (
                <button className="btn-accion btn-block" onClick={onBlock}>
                    <img src={iconBlock} alt="Bloquear" />
                </button>
            )}

            {showDelete && (
                <button className="btn-accion btn-delete" onClick={onDelete}>
                    <img src={iconDelete} alt="Eliminar" />
                </button>
            )}

        </div>
    );
};

export default ActionButtons;