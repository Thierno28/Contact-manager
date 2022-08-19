import axios from "axios";

export class ContactService {
  static ServerURL = "http://localhost:9000";

  static getAllContacts() {
    let dataURL = `${this.ServerURL}/contacts`;
    return axios.get(dataURL);
  }

  static getContact(id) {
    let dataURL = `${this.ServerURL}/contacts/${id}`;
    return axios.get(dataURL);
  }

  static createContact(contact) {
    let dataURL = `${this.ServerURL}/contacts`;
    return axios.post(dataURL, contact);
  }

  static updateContact(contact, id) {
    let dataURL = `${this.ServerURL}/contacts/${id}`;
    return axios.put(dataURL, contact);
  }

  static deleteContact(id) {
    let dataURL = `${this.ServerURL}/contacts/${id}`;
    return axios.delete(dataURL);
  }
}
