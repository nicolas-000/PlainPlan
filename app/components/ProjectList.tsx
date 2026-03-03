"use client";

import React, { useState } from "react";
import type { Project, Worker } from "../../lib/types";

interface Props {
  projects?: Project[];
  workers?: Worker[];
  onUpdated?: () => void;
}

export default function ProjectList({ projects = [], workers = [], onUpdated }: Props) {
  const [assignMap, setAssignMap] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editClient, setEditClient] = useState("");
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");
  const [editWorkerIds, setEditWorkerIds] = useState<string[]>([]);

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setEditName(p.name);
    setEditClient(p.client);
    setEditStart(p.startDate);
    setEditEnd(p.endDate ?? "");
    setEditWorkerIds(p.workerIds.slice());
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditClient("");
    setEditStart("");
    setEditEnd("");
    setEditWorkerIds([]);
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, client: editClient, startDate: editStart, endDate: editEnd || undefined, workerIds: editWorkerIds }),
      });
      if (!res.ok) throw new Error(await res.text());
      cancelEdit();
      onUpdated?.();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar proyecto");
    }
  };

  const removeProject = async (id: string) => {
    if (!confirm("Eliminar proyecto?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error(await res.text());
      onUpdated?.();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar proyecto");
    }
  };

  const handleAssign = async (projectId: string) => {
    const workerId = assignMap[projectId];
    if (!workerId) return;
    try {
      const res = await fetch("/api/projects/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, workerId }),
      });
      if (!res.ok) throw new Error(await res.text());
      setAssignMap((s) => ({ ...s, [projectId]: "" }));
      onUpdated?.();
    } catch (err) {
      console.error(err);
      alert("Error al asignar trabajador");
    }
  };

  const handleRemoveWorker = async (projectId: string, workerId: string) => {
    try {
      const res = await fetch('/api/projects/assign', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, workerId }),
      });
      if (!res.ok) throw new Error(await res.text());
      onUpdated?.();
    } catch (err) {
      console.error(err);
      alert('Error al quitar trabajador del proyecto');
    }
  };

  const getSeniorityBadgeClass = (s: string) => {
    switch (s) {
      case 'senior': return 'badge badge-senior';
      case 'semi-senior': return 'badge badge-semi-senior';
      default: return 'badge badge-junior';
    }
  };

  if (!projects.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📁</div>
        <p>No hay proyectos registrados</p>
        <p className="text-sm text-muted">Crea uno usando el formulario</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="section-title" style={{marginBottom: 0, paddingBottom: '.5rem'}}>Lista de Proyectos</h3>
        <span className="text-sm text-muted">{projects.length} proyecto{projects.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.id} className="card card-border p-6">
            {editingId === p.id ? (
              <div className="space-y-4 max-w-xl">
                <div className="form-group">
                  <label className="form-label">Nombre</label>
                  <input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full" />
                </div>
                <div className="form-group">
                  <label className="form-label">Cliente</label>
                  <input value={editClient} onChange={(e) => setEditClient(e.target.value)} className="w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Fecha inicio</label>
                    <input type="date" value={editStart} onChange={(e) => setEditStart(e.target.value)} className="w-full" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fecha fin</label>
                    <input type="date" value={editEnd} onChange={(e) => setEditEnd(e.target.value)} className="w-full" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Trabajadores asignados</label>
                  <select multiple value={editWorkerIds} onChange={(e) => setEditWorkerIds(Array.from(e.target.selectedOptions).map((o) => o.value))} className="w-full h-28">
                    {workers.map((w) => (
                      <option key={w.id} value={w.id}>{w.name} — {w.role}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="btn btn-secondary" onClick={() => saveEdit(p.id)}>Guardar cambios</button>
                  <button className="btn btn-ghost" onClick={cancelEdit}>Cancelar</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xl text-[var(--foreground)] mb-1">{p.name}</div>
                    <div className="flex items-center gap-3 text-sm text-muted flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        {p.client}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {p.startDate}{p.endDate ? ` → ${p.endDate}` : ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-warning btn-sm" onClick={() => startEdit(p)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => removeProject(p.id)}>Eliminar</button>
                  </div>
                </div>
                
                <div className="divider"></div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-semibold text-[var(--foreground)]">
                      Equipo asignado ({p.workerIds.length})
                    </div>
                  </div>
                  {p.workerIds.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {p.workerIds.map((id) => {
                        const w = workers.find((x) => x.id === id);
                        return (
                          <div key={id} className="flex justify-between items-center bg-[var(--muted-bg)] rounded-lg px-4 py-3 border border-[var(--card-border)]">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                                {w?.name.charAt(0).toUpperCase() || '?'}
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium text-sm truncate">{w?.name || id}</div>
                                {w && <div className="text-xs text-muted truncate">{w.role}</div>}
                              </div>
                              {w && <span className={`${getSeniorityBadgeClass(w.seniority)} ml-auto flex-shrink-0`}>{w.seniority}</span>}
                            </div>
                            <button className="btn btn-sm btn-muted ml-2 flex-shrink-0" onClick={() => handleRemoveWorker(p.id, id)}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-sm text-muted italic bg-[var(--muted-bg)] rounded-lg px-4 py-3 text-center">
                      No hay trabajadores asignados a este proyecto
                    </div>
                  )}
                </div>
                
                {workers.filter((w) => !p.workerIds.includes(w.id)).length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
                    <div className="flex gap-2 items-center flex-wrap">
                      <select 
                        value={assignMap[p.id] || ''} 
                        onChange={(e) => setAssignMap((s) => ({ ...s, [p.id]: e.target.value }))} 
                        className="flex-1 min-w-[200px]"
                      >
                        <option value="">Agregar trabajador...</option>
                        {workers.filter((w) => !p.workerIds.includes(w.id)).map((w) => (
                          <option key={w.id} value={w.id}>{w.name} — {w.role}</option>
                        ))}
                      </select>
                      <button 
                        onClick={() => handleAssign(p.id)} 
                        disabled={!assignMap[p.id]}
                        className="btn btn-primary btn-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        Asignar
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
