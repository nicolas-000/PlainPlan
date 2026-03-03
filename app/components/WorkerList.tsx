"use client";

import React, { useState } from "react";
import type { Worker, Seniority } from "../../lib/types";

interface Props {
  workers: Worker[];
  onUpdated?: () => void;
}

export default function WorkerList({ workers = [], onUpdated }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [seniority, setSeniority] = useState<Seniority>("junior");

  const startEdit = (w: Worker) => {
    setEditingId(w.id);
    setName(w.name);
    setRole(w.role);
    setSeniority(w.seniority as Seniority);
  };

  const cancel = () => {
    setEditingId(null);
    setName("");
    setRole("");
    setSeniority("junior");
  };

  const save = async (id: string) => {
    try {
      const res = await fetch(`/api/workers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, seniority }),
      });
      if (!res.ok) throw new Error(await res.text());
      cancel();
      onUpdated?.();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar trabajador");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Eliminar trabajador?")) return;
    try {
      const res = await fetch(`/api/workers/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error(await res.text());
      onUpdated?.();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar trabajador");
    }
  };

  const getSeniorityBadgeClass = (s: string) => {
    switch (s) {
      case 'senior': return 'badge badge-senior';
      case 'semi-senior': return 'badge badge-semi-senior';
      default: return 'badge badge-junior';
    }
  };

  if (!workers.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">👥</div>
        <p>No hay trabajadores registrados</p>
        <p className="text-sm text-muted">Crea uno usando el formulario</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="section-title" style={{marginBottom: 0, paddingBottom: '.5rem'}}>Lista de Trabajadores</h3>
        <span className="text-sm text-muted">{workers.length} trabajador{workers.length !== 1 ? 'es' : ''}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workers.map((w) => (
          <div key={w.id} className="card card-border p-5 flex flex-col">
            {editingId === w.id ? (
              <div className="space-y-4 flex-1">
                <div className="form-group">
                  <label className="form-label">Nombre</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
                </div>
                <div className="form-group">
                  <label className="form-label">Rol</label>
                  <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full" />
                </div>
                <div className="form-group">
                  <label className="form-label">Seniority</label>
                  <select value={seniority} onChange={(e) => setSeniority(e.target.value as Seniority)} className="w-full">
                    <option value="junior">Junior</option>
                    <option value="semi-senior">Semi-Senior</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="btn btn-secondary btn-sm flex-1" onClick={() => save(w.id)}>
                    Guardar
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={cancel}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 mb-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-semibold text-lg text-[var(--foreground)]">{w.name}</div>
                    <span className={getSeniorityBadgeClass(w.seniority)}>{w.seniority}</span>
                  </div>
                  <div className="text-sm text-muted">{w.role}</div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-[var(--card-border)]">
                  <button className="btn btn-warning btn-sm flex-1" onClick={() => startEdit(w)}>Editar</button>
                  <button className="btn btn-danger btn-sm flex-1" onClick={() => remove(w.id)}>Eliminar</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
