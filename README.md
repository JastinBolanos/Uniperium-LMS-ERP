# 🎓 Uniperium LMS — Enterprise Academic Management System (v1.0.0-ENT)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Deployment](https://img.shields.io/badge/deployment-production-blue)
![Compliance](https://img.shields.io/badge/compliance-FERPA%20%7C%20GDPR-success)
![Security](https://img.shields.io/badge/security-TLS_1.3-orange)

> **Core Academic Governance System.** 
> Enterprise platform deployed for the comprehensive management of universities and higher education institutions. Designed under a strict modular architecture, it unifies matrix gradebook management, predictive student performance analytics, and intelligent orchestration of physical, virtual, and hybrid infrastructure.

🌍 **[View Live Platform (Production) 🟢]** *https://uniperium.vercel.app/*

![Uniperium LMS Preview](https://github.com/user-attachments/assets/fe495f15-8a38-43d0-aba5-9542e9f64715)

---

## 🎥 Academic Platform Demonstration

**🎬 Uniperium LMS Operational Walkthrough**  
Exploration of educational management portals: from the matrix gradebook and predictive performance simulation to resource allocation and academic infrastructure governance.

https://github.com/user-attachments/assets/3e75deb8-836c-43ce-a92e-47b8b1d08e60

---

## 🏗️ System Architecture & Technology Stack

This repository contains the client application architecture (Web/Edge), optimized for high availability, reactive rendering, and complex in-browser state handling. *(Note: Due to regulatory compliance policies and student data privacy, backend microservice repositories, relational databases, and authentication APIs remain private).*

- **Core & Runtime (Edge-Optimized):**
  - `react` (`^19.0.1`) & `react-dom` for high-performance reactive interfaces.
  - `typescript` (`~5.8.2`) implementing strict typing and Decoupled Domain Pattern (DDD-like).
  - `vite` (`^6.2.3`) for next-generation compilation and bundling.
- **User Interface (UI) & Motion:**
  - `tailwindcss` (`^4.1.14`) featuring a next-gen utility-first styling engine.
  - `motion` (`^12.23.24`) for spatial transitions and fluid feedback.
  - `clsx` & `tailwind-merge` for safe conditional rendering.
- **Analytics & AI Engine:**
  - Native integration with `@google/genai` (`^2.4.0`) for inference and contextual support.
- **State Management (Client Layer):**
  - Reactive local cache persistence (`localStorageAdapter.ts`) as an *offline-first* strategy and role-based session management (`Context API`).

---

## 🚀 Operational Modules (Deployed)

### 👨‍🏫 1. Teacher Workspace (Teacher Portal)
* **Matrix Gradebook (Excel-Gradebook):** Real-time calculation engine processing cell-by-cell edits, computing weighted averages, and automatic conversions to vigesimal and qualitative scales (`A+` to `F`).
* **Dynamic Evaluation Manager:** Percentage weight orchestration (strict 100% validation) for midterms, laboratories, and continuous assessments.
* **High-Density Attendance System:** Session-by-session transactional tracking (Present, Late, Absent) with batch marking.
* **Virtual Classroom Launcher:** One-click integration with external infrastructure (Zoom Enterprise, Google Meet Pro, Jupyter Cloud Labs).

### 🎓 2. Student Analytics (Student Portal)
* **Performance Dashboard (GPA Tracking):** Visualization of approved credits, enrollment status, and itemized evaluation breakdowns.
* **Predictive Grade Simulator:** Mathematical algorithm (`gradeCalculationService.ts`) projecting the exact minimum grade required on future evaluations to achieve target passing thresholds.
* **Academic Risk Monitor (FA Alert):** Early warning system (`attendanceCalculationService.ts`) detecting and alerting on disqualification risks due to absence thresholds (>30%).

### 🏛️ 3. Administrative Command Center (Admin Console)
* **Infrastructure Governance:** Centralized allocation of virtual and physical resources (Zoom Rooms, Cloud NVIDIA A100 GPU Labs).
* **Schedule Collision Prevention:** Temporal validation engine (`resourceAllocationService.ts`) blocking overlapping assignments within the same time slot and day.
* **Program Management:** Course catalog administration, faculty oversight, and student census auditing.

---

## 💻 Deployment & Audit Guide (Local Environment)

For QA engineers, DevOps, or authorized developers requiring local client rendering audits:

### 1. Environment Preparation (Node.js v18+)
```bash
git clone https://github.com/tu-usuario/UNIPERIUM.git
cd UNIPERIUM
npm install
```
### 2. Environment Variables Configuration
To enable predictive AI modules, inject the corresponding credentials:
```bash
cp .env.example .env
```
### 3. Local Development Server
```bash
npm run dev
```
The audit environment will be available at http://localhost:3000. 
The system will start in "Sandboxed" mode (with simulated mock data preloaded in local cache for UI/UX evaluation without production database connections).

### ⚙️ 4. CI/CD & Integration Tooling

| Command | Pipeline Operation Description |
| :--- | :--- |
| `npm run build` | Compiles and optimizes the TypeScript dependency tree for CDN/Edge deployment. |
| `npm run preview` | Previews the locally generated production build artifact. |
| `npm run lint` | Runs strict type checking (`tsc --noEmit`) for pre-commit quality control. |
| `npm run clean` | Cleans up previous build directories. |

---
*Software Architecture Property - Jastin Bolaños © 2026. Technical Demonstration Project.*
