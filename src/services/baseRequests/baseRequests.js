import client from '../baseClient/baseClient';

export async function getRequest(endpoint, params = {}) {
  try {
    const response = await client.get(endpoint, { params: params });
    return response;
  } catch (error) {
    console.error(`Get Request: ${endpoint} failed with error`, error);
    throw error;
  }
}

export async function postRequest(endpoint, data = {}) {
  try {
    const response = await client.post(endpoint, data);
    return response;
  } catch (error) {
    console.error(`Post Request: ${endpoint} failed with error`, error);
    throw error;
  }
}

export async function deleteRequest(endpoint, data = {}) {
  try {
    const response = await client.delete(endpoint, { data: data });
    return response;
  } catch (error) {
    console.error(`Delete Request: ${endpoint} failed with error`, error);
    throw error;
  }
}

export async function putRequest(endpoint, data = {}) {
  try {
    const response = await client.put(endpoint, data);
    return response;
  } catch (error) {
    console.error(`PUT ${endpoint} failed:`, error.response || error);
    throw error;
  }
}

export async function fetchRequest(endpoint, method, body) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
      method,
      body,
    });
    console.log("Fetch response:", response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`FETCH ${endpoint} with method ${method} failed:`, error);
    throw error;
  }
}