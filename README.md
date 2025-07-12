# EmporinOne_2025

Repositorio principal del proyecto EmporinOne, este proyecto es una aplicación móvil multiplataforma dividida en modulos funcionales.

### Modulos EmporinOne

- EmporinOne Modulo de Consulta de Servicios y Trámites del Área de Recursos Humanos

- EmporinOne Modulo de Quejas y Sugerencias

- EmporinOne Modulo de Publicacion de Renovacion de Contratos y Tarjetas de Salud

### Equipo

- Angel de Jesus Baños Tellez
- Michelle Castro Otero
- Jose Arturo García Gonzalez

### Tecnologías Base

| Área                | Tecnología / Herramienta             | Detalles                                                                  |
| ------------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| App móvil           | React Native con Expo                | Framework para desarrollo móvil rápido y multiplataforma (iOS + Android). |
| Backend             | Node.js + Express                    | API REST para validaciones, lógica de negocio y futuras integraciones.    |
| Base de datos       | MongoDB Atlas                        | Base de datos en la nube, ideal para estructura flexible tipo documento.  |
| Notificaciones Push | Firebase Cloud Messaging (FCM)       | Servicio que permite enviar notificaciones a los dispositivos móviles.    |
| UI / Componentes    | React Native Paper                   | Biblioteca de UI estilizada, accesible y ligera.                          |
| Autenticación       | - (Se agregará más adelante con JWT) | En esta primera fase no se incluye login ni control de sesión.            |

### Estructuras de Ramas

- main rama principal

- develop rama de integracion de nuevas funcionalidades si se requiere unir varias features

- feature/</nombre-modulo> rama individual por cada módulo asignado

### Organización por módulos

Cada desarrollador trabajará dentro de su carpeta en src/modules/tuModulo.
Esto con la finalidad de permitir trabajar en paralelo sin causar conflicto con el trabajo de los demas.

### Flujo de trabajo general

1. **Clonar el Repositorio**
   Terminal Bash Windows/ Command + J
   git clone <url-del-repo>
   cd EMPORIN2025/tuModulo

2. Realizar commits frecuentemente y recuerden mantener la rama actualizada con la main para evitar conflictos
   git fetch origin

**Evitar commits no claros**
**feat:** comentario de lo realizado ej. agregacion de formulario de quejas
**fix:** correcciones o solucion de conflictos ej.
**SOLO SI CAUSAN CONFLICTOS**

- primero resolver manualmente y posteriormente continuar con el rebase
  git rebase origin/main

3. Merges

Todos los Merges seran revisados previamente antes del deployment

4. Estructura

/EmporinOne
│
├── /mobile-app # (React Native + Expo)
│ ├── /src
│ │ ├── /common # Componentes y utilidades comunes a todos los módulos
│ │ ├── /navigation # Configuración de navegación
│ │ ├── /modules # Carpeta para los módulos, cada uno en su subcarpeta
│ │ │ ├── /consulta-servicios
│ │ │ │ ├── components
│ │ │ │ ├── screens
│ │ │ │ └── service.js
│ │ │ ├── /quejas-sugerencias
│ │ │ │ ├── components
│ │ │ │ ├── screens
│ │ │ │ └── api.js
│ │ │ └── /publicacion-contratos
│ │ │ ├── components
│ │ │ ├── screens
│ │ │ └── api.js
│ │ └── /utils # Funciones y constantes compartidas
│ └── App.js
│
├── /backend # Código servidor (Node.js + Express)
│ ├── /controllers # Lógica de controladores por módulo
│ ├── /models # Modelos MongoDB (schemas)
│ ├── /routes # Rutas API por módulo
│ ├── /middlewares # Middlewares comunes
│ └── server.js
│
├── /docs # Documentación general, diagramas, etc, deberan crear una para cada modulo es decir docs-Modulo(nombre del modulo correspondiente).
│
└── README.md
