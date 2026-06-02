# El Loco Casaca - Seller App 👕

Aplicación web desarrollada con **Next.js** para la gestión de productos de vendedores online, especializada en camisetas.

## 🛠️Tecnologías
- **Framework:** Next.js (App Router)
- **Lenguaje:** TypeScript
- **Auth:** Clerk
- **Base de Datos:** PostgreSQL (Hosteado en Neon) + Prisma ORM
- **Estilos:** Tailwind CSS

## 📝 Puntos Clave
- **Autenticación con Clerk:** Sincronización con la Base de Datos por medio de Webhooks.
- **Utilización de Mocks:** A modo de visualizar la conexión entre las distintas aplicaciones del sistema, se hace uso de mocks que simulan conexiones posteriores con las mismas.

## 🗄️Instructivo
1. Clonar el repositorio.
2. Instalar todas las dependencias mediante **npm install**.
3. Configurar todas las variables necesarias en el archivo **.env.local** (ver el archivo **.env.example**).
4. Levantar la base de datos.
5. Iniciar el servidor mediante **npm run dev**.
6. Ingresar a **http://localhost:3000**.
7. Ingresar a la aplicación.

## ACLARACIONES IMPORTANTES:
Dentro de la carpeta **seller-app**, ver el documento **CONSIDERACIONES.md** para conocer las distintas limitaciones del proyecto.