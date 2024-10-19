import axios from "axios";
import { axiosApiInstance } from "../libs/axios";

export class ApiServiceFacade {
  url;

  constructor(url) {
    this.url = url;
  }

  handleResponse(response) {
    if (response) {
      return response;
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
      });
    }
  }

  async get(path, responseType = "json") {
    return await axiosApiInstance(`${this.url}${path}`, {
      method: "GET",
      responseType: responseType,
    }).then(this.handleResponse);
  }

  async post(
    path,
    body = {},
    contentType = "application/json",
    responseType = "json"
  ) {
    return await axiosApiInstance(`${this.url}${path}`, {
      method: "POST",
      data: body,
      responseType,
      headers: {
        "Content-Type": contentType,
      },
    }).then(this.handleResponse);
  }

  async put(path, body, contentType, responseType) {
    return await axiosApiInstance(`${this.url}${path}`, {
      method: "PUT",
      data: body,
      responseType,
      headers: {
        "Content-Type": contentType,
      },
    }).then(this.handleResponse);
  }

  async delete(path) {
    return await axiosApiInstance(`${this.url}${path}`, {
      method: "DELETE",
    }).then(this.handleResponse);
  }
}
