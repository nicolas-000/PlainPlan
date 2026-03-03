"use client";

import React, { useState } from "react";
import type { Worker } from "../../lib/types";

interface Props {
  workers?: Worker[];
  onCreated?: () => void;
}

export default function ProjectForm({ workers = [], onCreated }: Props) {
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedWorkerIds, setSelectedWorkerIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, client, startDate, endDate, workerIds: selectedWorkerIds }),
      });
      if (!res.ok) throw new Error(await res.text());
      setName("");
      setClient("");
      setStartDate("");
      setEndDate("");
      setSelectedWorkerIds([]);
      onCreated?.();
    } catch (err) {
      console.error(err);
      alert("Error al crear proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="section-title">Nuevo Proyecto</h3>
      <div className="form-group">
        <label className="form-label">Nombre del proyecto</label>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Ingrese el nombre" 
          required 
          className="w-full" 
        />
      </div>
      <div className="form-group">
        <label className="form-label">Cliente</label>
        <input 
          value={client} 
          onChange={(e) => setClient(e.target.value)} 
          placeholder="Nombre del cliente" 
          required 
          className="w-full" 
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group">
          <label className="form-label">Fecha inicio</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required 
            className="w-full" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Fecha fin (opcional)</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            className="w-full" 
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Asignar trabajadores</label>
        <select 
          multiple 
          value={selectedWorkerIds} 
          onChange={(e) => setSelectedWorkerIds(Array.from(e.target.selectedOptions).map((o) => o.value))} 
          className="w-full h-32"
        >
          {workers.length > 0 ? (
            workers.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name} — {w.role} ({w.seniority})
              </option>
            ))
          ) : (
            <option disabled>No hay trabajadores disponibles</option>
          )}
        </select>
        <p className="text-xs text-muted mt-1">Mantén Ctrl/Cmd para seleccionar múltiples</p>
      </div>
      <button type="submit" disabled={loading} className="btn btn-secondary w-full">
        {loading ? "Creando..." : "Crear Proyecto"}
      </button>
    </form>
  );
}
