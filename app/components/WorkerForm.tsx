"use client";

import React, { useState } from "react";
import type { Seniority } from "../../lib/types";

interface Props {
  onCreated?: () => void;
}

export default function WorkerForm({ onCreated }: Props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [seniority, setSeniority] = useState<Seniority>("junior");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, seniority }),
      });
      if (!res.ok) throw new Error(await res.text());
      setName("");
      setRole("");
      setSeniority("junior");
      onCreated?.();
    } catch (err) {
      console.error(err);
      alert("Error al crear trabajador");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="section-title">Nuevo Trabajador</h3>
      <div className="form-group">
        <label className="form-label">Nombre</label>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Ingrese el nombre" 
          required 
          className="w-full" 
        />
      </div>
      <div className="form-group">
        <label className="form-label">Rol</label>
        <input 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          placeholder="ej: Frontend, Backend, DevOps" 
          required 
          className="w-full" 
        />
      </div>
      <div className="form-group">
        <label className="form-label">Seniority</label>
        <select 
          value={seniority} 
          onChange={(e) => setSeniority(e.target.value as Seniority)} 
          className="w-full"
        >
          <option value="junior">Junior</option>
          <option value="semi-senior">Semi-Senior</option>
          <option value="senior">Senior</option>
        </select>
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading ? "Creando..." : "Crear Trabajador"}
      </button>
    </form>
  );
}
