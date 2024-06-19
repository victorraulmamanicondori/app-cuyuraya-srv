import { DETECTOR_API_URL } from "../config/urlExterno.js";

class DetectorApi {

  async peticionPOST(data) {
    try {
      const respuesta = await fetch(`${DETECTOR_API_URL}/detectar-anomalias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const json = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(json.message);
      }

      return json;
    } catch (error) {
      throw error;
    }
  }

}

export default DetectorApi;

