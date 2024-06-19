import { DETECTOR_API_URL } from "../config/urlExterno.js";

class DetectorApi {

  async peticionPOST(data) {
    try {
      console.log('data para detector:', data);
      console.log('url detector:', `${DETECTOR_API_URL}/detectar-anomalias`);

      const respuesta = await fetch(`${DETECTOR_API_URL}/detectar-anomalias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const json = await respuesta.json();

      /*if (!respuesta.ok) {
        throw new Error(json.message);
      }*/

      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}

export default DetectorApi;

