"use client";

import React, { useEffect, useState } from "react";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import type { Worker, Project } from "../../lib/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Error fetching projects");
      const data = await res.json();
      setProjects(data || []);
    } catch (err) {
      console.error(err);
    }
  };

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
    fetchProjects();
    fetchWorkers();
  }, []);

  return (
    <div className="animate-fadeIn">
      <div className="page-header">
        <h1 className="page-title">Proyectos</h1>
        <p className="page-subtitle">Administra proyectos y asigna trabajadores</p>
      </div>
      
      <div className="space-y-8">
        {/* Form section - constrained width */}
        <div className="max-w-lg">
          <div className="card card-border p-6">
            <ProjectForm workers={workers} onCreated={fetchProjects} />
          </div>
        </div>
        
        {/* List section - full width */}
        <div className="card card-border p-6">
          <ProjectList projects={projects} workers={workers} onUpdated={() => { fetchProjects(); fetchWorkers(); }} />
        </div>
      </div>
    </div>
  );
}
