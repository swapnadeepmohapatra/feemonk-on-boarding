import { API_URL } from "../utils/keys";

export const bankStatementPdfUpload = async (data: any) => {
  return fetch(
    `${API_URL}/bank-statement-analysis/finbox/upload`,
    {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error(error);
    });
};
