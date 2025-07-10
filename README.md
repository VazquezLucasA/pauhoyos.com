Dependencias
npm install react-router-dom
npm install react-bootstrap bootstrap
npm install bootstrap-icons
npm install react-bootstrap
npm install react-calendar
npm install axios



hosteado en 10.2.70.47 servidor nginx. 
Carpeta: 
el repositorio esta clonado en ~/
dentro del repositorio se encuentra deploy.sh
/var/www/pauhoyos.com


#Flujo de trabajo.

deploy.sh:
#!/bin/bash

# --- Script para hacer deploy de una aplicación React en Nginx ---

# Detiene la ejecución del script si algún comando falla
set -e

# --- VARIABLES ---
# Cambia 'pauhoyos.com' por el nombre de la carpeta de tu proyecto
PROJECT_DIR="/home/lvazquez/pauhoyos.com" 
DEPLOY_DIR="/var/www/html"
BACKUPS_DIR="$DEPLOY_DIR/backups"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_PATH="$BACKUPS_DIR/$DATE"

echo "----------------------------------------"
echo "🚀 Iniciando deploy..."
echo "----------------------------------------"

# 1. Navegar al directorio del proyecto
echo "-> Navegando al directorio del proyecto: $PROJECT_DIR"
cd $PROJECT_DIR

# 2. Actualizar el código desde el repositorio Git
echo "-> Actualizando código desde Git..."
git pull

# 3. Instalar/actualizar dependencias de Node.js
# Se usa 'npm ci' para una instalación limpia y rápida basada en package-lock.j>
# Si prefieres 'npm install', puedes cambiarlo.
echo "-> Instalando dependencias (npm ci)..."
npm ci

# 4. Construir la aplicación de React para producción
echo "-> Construyendo la aplicación (npm run build)..."
npm run build

# 5. Crear directorio para el backup
echo "-> Creando directorio de backup: $BACKUP_PATH"# 6. Mover los archivos actuales del deploy al backup
# Usamos 'find' para evitar errores si la carpeta está vacía.
# No queremos mover la propia carpeta 'backups'.
echo "-> Realizando backup de la versión actual..."
# Cuenta cuántos archivos hay para mover
num_items=$(find $DEPLOY_DIR -mindepth 1 -maxdepth 1 ! -name "backups" | wc -l)

if [ $num_items -gt 0 ]; then
    find $DEPLOY_DIR -mindepth 1 -maxdepth 1 ! -name "backups" -exec mv -t $BAC>
    echo "-> Backup completado. $num_items elementos movidos a $BACKUP_PATH"
else
    echo "-> No había archivos en $DEPLOY_DIR para hacer backup. Se omite."
fi

# 7. Mover los nuevos archivos de la build al directorio de deploy
# Asegúrate de que tu carpeta de build se llama 'dist'. Si se llama 'build', ca>
echo "-> Moviendo nuevos archivos de la build a $DEPLOY_DIR"
cp -r $PROJECT_DIR/dist/* $DEPLOY_DIR

echo "----------------------------------------"
echo "✅ ¡Deploy finalizado con éxito!"
echo "----------------------------------------"






