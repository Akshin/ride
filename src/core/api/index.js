import axios from "./interceptor";
import { API_URL, API_URL_ZKH } from "../../../.env";
import { auth } from "@/core/services/auth";

const URL_V1 = `${API_URL}/api/v1`;
const URL_ZKH = `${API_URL_ZKH}/api/v1`;

export default {
  getToken(id) {
    const path = `${URL_V1}/login/get-token?id=${id}`;
    return axios.get(path);
  },

  get(path) {
    return axios.get(path, auth.getHeaders());
  },

  post(path, payload, multy = false) {
    // fix this shit with header multy
    return axios.post(path, payload, auth.getHeaders(multy));
  },

  put(path, payload) {
    return axios.put(path, payload, auth.getHeaders());
  },

  delete(path, payload) {
    return axios.delete(path, payload, auth.getHeaders());
  },

  ///////////////////////////////////////////////////////

  getUser() {
    const path = `${URL_V1}/users/me`;
    return this.get(path);
  },

  getAddressAutocomplete(query) {
    const path = `${URL_ZKH}/address_autocomplete/`;
    return this.post(path, { query });
  },

  // points

  getObjects(object_id = "") {
    const path = `${URL_ZKH}/objects/?object_id=${object_id}/`;
    return this.get(path);
  },

  setObjects(point) {
    const path = `${URL_ZKH}/objects/`;
    return this.post(path, point);
  },

  putObjects(id, point) {
    const path = `${URL_ZKH}/objects/${id}`;
    return this.put(path, point);
  },

  // inspections

  getInspections(object_id = "") {
    const path = `${URL_ZKH}/inspections/?object_id=${object_id}`;
    return this.get(path);
  },

  setInspections(payload) {
    const path = `${URL_ZKH}/inspections/`;
    return this.post(path, payload);
  },

  putInspections(id, payload) {
    const path = `${URL_ZKH}/inspections/${id}`;
    return this.put(path, payload);
  },

  // sensor_schemes

  getSensorSchemes(object_id = "") {
    const path = `${URL_ZKH}/sensor_schemes/?object_id=${object_id}`;
    return this.get(path);
  },

  setSensorSchemes(payload) {
    const path = `${URL_ZKH}/sensor_schemes/`;
    return this.post(path, payload);
  },

  putSensorSchemes(id, payload) {
    const path = `${URL_ZKH}/sensor_schemes/${id}`;
    return this.put(path, payload);
  },

  uploadFile(payload) {
    const path = `${URL_ZKH}/files/upload_file`;
    return this.post(path, payload, true);
  },

  getFile(filename) {
    return `${URL_ZKH}/files/get_file?filename=${filename}`;
    // return this.get(path);
  },

  // specifications

  getSpecifications(object_id = "") {
    const path = `${URL_ZKH}/specifications/?object_id=${object_id}`;
    return this.get(path);
  },

  setSpecifications(payload) {
    const path = `${URL_ZKH}/specifications/`;
    return this.post(path, payload);
  },

  putSpecifications(id, payload) {
    const path = `${URL_ZKH}/specifications/${id}`;
    return this.put(path, payload);
  },

  // configurations

  getConfigurations(object_id = "") {
    const path = `${URL_ZKH}/configurations/?object_id=${object_id}`;
    return this.get(path);
  },

  setConfigurations(payload) {
    const path = `${URL_ZKH}/configurations/`;
    return this.post(path, payload);
  },

  putConfigurations(id, payload) {
    const path = `${URL_ZKH}/configurations/${id}`;
    return this.put(path, payload);
  },

  // equipments

  getEquipments(object_id = "") {
    const path = `${URL_ZKH}/equipments/?object_id=${object_id}/`;
    return this.get(path);
  },

  setEquipments(payload) {
    const path = `${URL_ZKH}/equipments/`;
    return this.post(path, payload);
  },

  putEquipments(id, payload) {
    const path = `${URL_ZKH}/equipments/${id}/`;
    return this.put(path, payload);
  },
};
