export var host = "https://localhost:5000";

export const loginRoute = "http://localhost:5000/login";
export const registerRoute = "http://localhost:5000/register";
export const createEmployeeRoute = "http://localhost:5000/createEmployee";
export const getEmployeesRoute = "http://localhost:5000/getEmployees";
export const deleteEmployeeRoute = (id) =>
  `http://localhost:5000/deleteEmployee/${id}`;

export const editEmployeeRoute = (id)=>`http://localhost:5000/editEmployee/${id}`;
