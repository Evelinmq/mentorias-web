import { useState } from "react";
import "./shared.css";

import VistaAgendadas  from "./VistaAgendadas";
import VistaSolicitar  from "./VistaSolicitar";
import VistaHistorial  from "./VistaHistorial";

export default function DashboardAprendiz() {
    const [tab, setTab] = useState("agendadas");

    const vistas = {
        agendadas: <VistaAgendadas />,
        solicitar: <VistaSolicitar />,
        historial: <VistaHistorial />,
    };

    return (
        <div className="dashboard-body">
            {/* SIDEBAR */}
            <aside className="sidebar">
                {[
                    { key: "agendadas", label: "Agendadas" },
                    { key: "solicitar", label: "Solicitar"  },
                    { key: "historial", label: "Historial"  },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        className={`sidebar-btn ${tab === key ? "active" : ""}`}
                        onClick={() => setTab(key)}
                    >
                        {label}
                    </button>
                ))}
            </aside>

            <main className="content">
                {vistas[tab]}
            </main>
        </div>
    );
}