import { API_URL } from "../utils/keys";

export const createDigilocker = async (
  applicationId: string,
  userId: string
) => {
  return fetch(
    `${API_URL}/pay-later-flow/digilocker/create?applicationId=${applicationId}&userId=${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON",
      },
    }
  )
    .then((response) => {
      console.log("response",response)
      return response.json();
    })
    .catch((error) => {
      return console.error(error);
    });
};

export const createSelfie = async (applicationId: string, userId: string) => {
  return fetch(
    `${API_URL}/pay-later-flow/selfie/create?applicationId=${applicationId}&userId=${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error(error);
    });
};

export const createAgreement = async (
  applicationId: string,
  userId: string
) => {
  return fetch(
    `${API_URL}/pay-later-flow/agreement/generate?applicationId=${applicationId}&userId=${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error(error);
    });
};

export const createNach = async (data: any) => {
  return fetch(`${API_URL}/pay-later-flow/nach/register`, {
    method: "POST",
    headers: {
      Accept: "application/JSON",
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log("res",response)
      return response.json();
    })
    .catch((error) => {
      return console.error(error);
    });
};
