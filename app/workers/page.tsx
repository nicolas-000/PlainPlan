"use client";

import React, { useEffect, useState } from "react";
import WorkerForm from "../components/WorkerForm";
import WorkerList from "../components/WorkerList";
import type { Worker } from "../../lib/types";

export default function WorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);

  const fetchWorkers = async () => {
    try {
      const res = await fetch("/api/workers");
      if (!res.ok) throw new Error("Error fetching workers");
      const data = await res.json();
      setWorkers(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <div className="animate-fadeIn">
      <div className="page-header">
        <h1 className="page-title">Trabajadores</h1>
        <p className="page-subtitle">Gestiona tu equipo de trabajo</p>
      </div>
      
      <div className="space-y-8">
        {/* Form section - constrained width */}
        <div className="max-w-md">
          <div className="card card-border p-6">
            <WorkerForm onCreated={fetchWorkers} />
          </div>
        </div>
        
        {/* List section - full width */}
        <div className="card card-border p-6">
          <WorkerList workers={workers} onUpdated={fetchWorkers} />
        </div>
      </div>
    </div>
  );
}
