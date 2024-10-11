// import { PAYLATER_BACKEND } from "../utils/keys";

export const createApplication = async (data: any) => {
  return fetch(`${process.env.REACT_APP_PAYLATER_BACKEND}/application/create`, {
    method: "POST",
    headers: {
      Accept: "application/JSON",
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error(error);
    });
};

export const updateAddress = async (data: any) => {
  return fetch(`${process.env.REACT_APP_PAYLATER_BACKEND}/application/address/create`, {
    method: "POST",
    headers: {
      Accept: "application/JSON",
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error(error);
    });
};

export const updateEmployment = async (data: any) => {
  return fetch(`${process.env.REACT_APP_PAYLATER_BACKEND}/application/employment/create`, {
    method: "POST",
    headers: {
      Accept: "application/JSON",
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error(error);
    });
};

export const getApproval = async (data: any) => {
  return fetch(
    `${process.env.REACT_APP_PAYLATER_BACKEND}/application/get-approval?userId=${data.userId}&applicationId=${data.applicationId}`
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error(error);
    });
};

export const getProducts = async (data: any) => {
  return fetch(
    `${process.env.REACT_APP_PAYLATER_BACKEND}/application/get-products?userId=${data.userId}&applicationId=${data.applicationId}`
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error(error);
    });
};

export const approve = async (data: any) => {
  return fetch(`${process.env.REACT_APP_PAYLATER_BACKEND}/application/approve`, {
    method: "POST",
    headers: {
      Accept: "application/JSON",
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error(error);
    });
};
