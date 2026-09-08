# 🎓 Uniperium LMS — Enterprise Academic Management System (v1.0.0-ENT)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Deployment](https://img.shields.io/badge/deployment-production-blue)
![Compliance](https://img.shields.io/badge/compliance-FERPA%20%7C%20GDPR-success)
![Security](https://img.shields.io/badge/security-TLS_1.3-orange)

> **Sistema Central de Gobernanza Académica.** 
> Plataforma empresarial desplegada para la gestión integral de universidades e institutos de educación superior. Diseñada bajo una arquitectura modular estricta, unifica la gestión de calificaciones matriciales, analítica predictiva de rendimiento estudiantil y la orquestación inteligente de infraestructura física, virtual e híbrida.

🌍 **[Ver Plataforma en Vivo (Producción) 🟢]** *https://uniperium.vercel.app/*

![Vista Previa de Uniperium LMS](https://github.com/user-attachments/assets/fe495f15-8a38-43d0-aba5-9542e9f64715)

---

## 🎥 Demostración de la Plataforma Académica

**🎬 Recorrido Operativo de Uniperium LMS**  
Exploración de los portales de gestión educativa: desde el libro de calificaciones matricial y simulación predictiva de rendimiento, hasta la asignación de recursos y gobernanza de infraestructura académica.

https://github.com/user-attachments/assets/3e75deb8-836c-43ce-a92e-47b8b1d08e60

---

## 🏗️ Arquitectura de Sistema y Stack Tecnológico

Este repositorio contiene la arquitectura de la aplicación cliente (Web/Edge), optimizada para alta disponibilidad, renderizado reactivo y manejo de estados complejos en el navegador. *(Nota: Por políticas de cumplimiento normativo y privacidad de datos estudiantiles, los repositorios de los microservicios backend, bases de datos relacionales y APIs de autenticación permanecen privados).*

- **Core & Runtime (Edge-Optimized):**
  - `react` (`^19.0.1`) & `react-dom` para interfaces reactivas de alto rendimiento.
  - `typescript` (`~5.8.2`) implementando tipado estricto y Patrón de Dominio Desacoplado (DDD-like).
  - `vite` (`^6.2.3`) para compilación y empaquetado de última generación.
- **Interfaz de Usuario (UI) & Motion:**
  - `tailwindcss` (`^4.1.14`) con motor de estilos basado en utilidades de nueva generación.
  - `motion` (`^12.23.24`) para transiciones espaciales y feedback fluido.
  - `clsx` & `tailwind-merge` para renderizado condicional seguro.
- **Motor Analítico e IA:**
  - Integración nativa con `@google/genai` (`^2.4.0`) para inferencia y soporte contextual.
- **Gestión de Estado (Capa Cliente):**
  - Persistencia reactiva en caché local (`localStorageAdapter.ts`) como estrategia *offline-first* y manejo de sesión por roles (`Context API`).

---

## 🚀 Módulos Operativos (Desplegados)

### 👨‍🏫 1. Portal Docente (Teacher Workspace)
* **Libro de Calificaciones Matricial (Excel-Gradebook):** Motor de cálculo en tiempo real que procesa ediciones celda por celda, computando promedios ponderados y conversiones automáticas a escalas vigesimales y cualitativas (`A+` a `F`).
* **Gestor de Evaluaciones Dinámico:** Orquestación de pesos porcentuales (validación estricta al 100%) para parciales, laboratorios y evaluación continua.
* **Sistema de Asistencia de Alta Densidad:** Registro transaccional por sesión (Presente, Tardanza, Faltas) con marcaje masivo.
* **Lanzador de Aulas Híbridas (Virtual Classroom Launcher):** Integración en un clic con infraestructura externa (Zoom Enterprise, Google Meet Pro, Jupyter Cloud Labs).

### 🎓 2. Portal Estudiante (Student Analytics)
* **Dashboard de Rendimiento (GPA Tracking):** Visualización de créditos aprobados, estado de matrícula y desglose pormenorizado de evaluaciones.
* **Simulador Predictivo de Calificaciones:** Algoritmo matemático (`gradeCalculationService.ts`) que proyecta la nota mínima exacta requerida en evaluaciones futuras para alcanzar métricas de aprobación objetivo.
* **Monitor de Riesgo Académico (Alerta FA):** Sistema de advertencia temprana (`attendanceCalculationService.ts`) que detecta y alerta sobre riesgo de inhabilitación por umbrales de inasistencia (>30%).

### 🏛️ 3. Centro de Mando Administrativo (Admin Console)
* **Gobernanza de Infraestructura:** Asignación centralizada de recursos virtuales y físicos (Salas Zoom, Laboratorios Cloud GPU NVIDIA A100).
* **Prevención de Colisiones Horarias:** Motor de validación temporal (`resourceAllocationService.ts`) que bloquea el solapamiento de asignaciones en la misma franja y día.
* **Gestión de Programas:** Administración del catálogo de cursos, supervisión de facultades y auditoría de censo estudiantil.

---

## 💻 Guía de Despliegue y Auditoría (Entorno Local)

Para ingenieros de QA, DevOps o desarrolladores autorizados que requieran auditar el renderizado del cliente en entorno local:

### 1. Preparación del Entorno (Node.js v18+)
```bash
git clone [https://github.com/tu-usuario/UNIPERIUM.git](https://github.com/tu-usuario/UNIPERIUM.git)
cd UNIPERIUM
npm install
```
### 2. Configuración de VariablesPara habilitar los módulos de IA predictiva, inyecte las credenciales correspondientes.
```Bash
cp .env.example .env
```
### 3. Servidor de Desarrollo Local
```Bash
npm run dev
```
El entorno de auditoría estará disponible en http://localhost:3000. 
El sistema iniciará en modo "Sandboxed" (con datos simulados precargados en caché para evaluación de UI/UX sin conexión a base de datos de producción).

### ⚙️ 4. Herramientas de Integración y Despliegue (CI/CD)

| Comando | Descripción de la Operación Pipeline |
| :--- | :--- |
| `npm run build` | Compila y optimiza el árbol de dependencias TypeScript para despliegue en CDN/Edge. |
| `npm run preview` | Previsualiza el artefacto de producción generado localmente. |
| `npm run lint` | Ejecuta verificación estricta de tipos (`tsc --noEmit`) para control de calidad pre-commit. |
| `npm run clean` | Purga directorios de compilación previos. |

---
*Propiedad de Arquitectura de Software - Jastin Bolaños © 2026. Proyecto de Demostración Técnica.*
