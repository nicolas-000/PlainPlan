import fs from 'fs';
import path from 'path';
import type { Worker, Project, Seniority } from './types';

const JSON_DB_PATH = path.join(process.cwd(), 'data', 'db.json');
fs.mkdirSync(path.dirname(JSON_DB_PATH), { recursive: true });

function generateId(prefix = '') {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

type DBData = {
  workers: Worker[];
  projects: { id: string; name: string; client: string; startDate: string; endDate?: string }[];
  project_workers: { projectId: string; workerId: string }[];
};

function ensureJson() {
  if (!fs.existsSync(JSON_DB_PATH)) {
    const init: DBData = { workers: [], projects: [], project_workers: [] };
    fs.writeFileSync(JSON_DB_PATH, JSON.stringify(init, null, 2));
  }
}

function loadJson(): DBData {
  ensureJson();
  const raw = fs.readFileSync(JSON_DB_PATH, 'utf8');
  return JSON.parse(raw) as DBData;
}

function saveJson(data: DBData) {
  fs.writeFileSync(JSON_DB_PATH, JSON.stringify(data, null, 2));
}

// Workers
export function getWorkers(): Worker[] {
  const data = loadJson();
  return data.workers.slice().sort((a, b) => a.name.localeCompare(b.name));
}

export function getWorker(id: string): Worker | undefined {
  const data = loadJson();
  return data.workers.find((w) => w.id === id);
}

export function createWorker(d: { name: string; role: string; seniority: Seniority }): Worker {
  const data = loadJson();
  const id = generateId('w_');
  const w: Worker = { id, name: d.name, role: d.role, seniority: d.seniority };
  data.workers.push(w);
  saveJson(data);
  return w;
}

export function updateWorker(id: string, d: { name: string; role: string; seniority: Seniority }): Worker {
  const data = loadJson();
  const idx = data.workers.findIndex((w) => w.id === id);
  if (idx === -1) throw new Error('Worker not found');
  data.workers[idx] = { id, name: d.name, role: d.role, seniority: d.seniority };
  saveJson(data);
  return data.workers[idx];
}

export function deleteWorker(id: string) {
  const data = loadJson();
  data.workers = data.workers.filter((w) => w.id !== id);
  data.project_workers = data.project_workers.filter((pw) => pw.workerId !== id);
  saveJson(data);
}

// Projects
export function getProjects(): Project[] {
  const data = loadJson();
  return data.projects
    .map((p) => ({
      id: p.id,
      name: p.name,
      client: p.client,
      startDate: p.startDate,
      endDate: p.endDate,
      workerIds: data.project_workers.filter((pw) => pw.projectId === p.id).map((pw) => pw.workerId),
    }))
    .sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''));
}

export function getProject(id: string): Project | undefined {
  const data = loadJson();
  const p = data.projects.find((x) => x.id === id);
  if (!p) return undefined;
  return {
    id: p.id,
    name: p.name,
    client: p.client,
    startDate: p.startDate,
    endDate: p.endDate,
    workerIds: data.project_workers.filter((pw) => pw.projectId === p.id).map((pw) => pw.workerId),
  };
}

export function createProject(d: { name: string; client: string; startDate: string; endDate?: string; workerIds?: string[] }): Project {
  const data = loadJson();
  const id = generateId('p_');
  const p = { id, name: d.name, client: d.client, startDate: d.startDate, endDate: d.endDate };
  data.projects.push(p);
  if (d.workerIds && d.workerIds.length) {
    for (const w of d.workerIds) {
      if (!data.project_workers.find((pw) => pw.projectId === id && pw.workerId === w)) data.project_workers.push({ projectId: id, workerId: w });
    }
  }
  saveJson(data);
  return getProject(id)!;
}

export function updateProject(id: string, d: { name?: string; client?: string; startDate?: string; endDate?: string; workerIds?: string[] }): Project {
  const data = loadJson();
  const idx = data.projects.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error('Project not found');
  const existing = data.projects[idx];
  data.projects[idx] = {
    id,
    name: d.name ?? existing.name,
    client: d.client ?? existing.client,
    startDate: d.startDate ?? existing.startDate,
    endDate: d.endDate ?? existing.endDate,
  };
  if (d.workerIds) {
    data.project_workers = data.project_workers.filter((pw) => pw.projectId !== id);
    for (const w of d.workerIds) data.project_workers.push({ projectId: id, workerId: w });
  }
  saveJson(data);
  return getProject(id)!;
}

export function deleteProject(id: string) {
  const data = loadJson();
  data.projects = data.projects.filter((p) => p.id !== id);
  data.project_workers = data.project_workers.filter((pw) => pw.projectId !== id);
  saveJson(data);
}

export function assignWorkerToProject(projectId: string, workerId: string) {
  const data = loadJson();
  if (!data.projects.find((p) => p.id === projectId)) throw new Error('Project not found');
  if (!data.workers.find((w) => w.id === workerId)) throw new Error('Worker not found');
  if (!data.project_workers.find((pw) => pw.projectId === projectId && pw.workerId === workerId)) data.project_workers.push({ projectId, workerId });
  saveJson(data);
  return getProject(projectId)!;
}

export function removeWorkerFromProject(projectId: string, workerId: string) {
  const data = loadJson();
  data.project_workers = data.project_workers.filter((pw) => !(pw.projectId === projectId && pw.workerId === workerId));
  saveJson(data);
  return getProject(projectId)!;
}

export function setProjectWorkers(projectId: string, workerIds: string[]) {
  const data = loadJson();
  if (!data.projects.find((p) => p.id === projectId)) throw new Error('Project not found');
  data.project_workers = data.project_workers.filter((pw) => pw.projectId !== projectId);
  for (const w of workerIds) data.project_workers.push({ projectId, workerId: w });
  saveJson(data);
  return getProject(projectId)!;
}
