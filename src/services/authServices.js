import { getRequest, postRequest } from "./baseRequests/baseRequests";

export async function login(email, password) {
  try {
    const response = await postRequest('/auth/login', { email, password });
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

export async function register(name, arid_no, age, email, password, role, gender) {
  try {
    const response = await postRequest('/auth/register', 
      name,
      arid_no,
      age,
      email,
      password,
      role,
      gender
    );
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}