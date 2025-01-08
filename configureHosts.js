import fs from 'fs';
import os from 'os';
import ip from 'ip';

const HOSTS_FILE_PATH = os.platform() === 'win32'
  ? 'C:\\Windows\\System32\\drivers\\etc\\hosts'
  : '/etc/hosts';

const DOMAIN_NAME = 'app-servicio-backend.local';

// Función para actualizar el archivo hosts
const updateHostsFile = () => {
  const localIP = ip.address();
  
  try {
    const hostsContent = fs.readFileSync(HOSTS_FILE_PATH, 'utf8');
    
    // Elimina líneas existentes para el dominio
    const filteredContent = hostsContent
      .split('\n')
      .filter(line => !line.includes(DOMAIN_NAME))
      .join('\n');
    
    // Agrega la nueva línea con la IP actual
    const updatedContent = `${filteredContent}\n${localIP} ${DOMAIN_NAME}\n`;
    fs.writeFileSync(HOSTS_FILE_PATH, updatedContent, 'utf8');
    
    console.log(`Archivo hosts actualizado: ${localIP} ${DOMAIN_NAME}`);
  } catch (error) {
    console.error('Error actualizando el archivo hosts:', error.message);
  }
};

// Ejecuta la función
updateHostsFile();
