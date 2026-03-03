import * as db from './db';

export const getWorkers = db.getWorkers;
export const getWorker = db.getWorker;
export const createWorker = db.createWorker;
export const updateWorker = db.updateWorker;
export const deleteWorker = db.deleteWorker;

export const getProjects = db.getProjects;
export const getProject = db.getProject;
export const createProject = db.createProject;
export const updateProject = db.updateProject;
export const deleteProject = db.deleteProject;

export const assignWorkerToProject = db.assignWorkerToProject;
export const removeWorkerFromProject = db.removeWorkerFromProject;
export const setProjectWorkers = db.setProjectWorkers;

