import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/atoms/Button";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
// import { UserInitialState } from "../../redux/slice/userData";
import { API_URL } from "../../../utils";
import DocumentCard from "./DocCard";
import styles from "./styles.module.css";
import Dropzone from "react-dropzone";
import InputText from "../../../components/atoms/InputText";

const BankPdfUpload: React.FC = () => {
  const [pdf, setPdf] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [authToken] = useLocalStorage("feemonk_data", "");
  const navigate = useNavigate();

  const uploadPdf = async () => {
    const response = await fetch(`${API_URL}/login/auth`, {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const result = await response.json();

    const data = new FormData();
    if (pdf !== null) {
      data.append("file", pdf);
    }
    data.append("type", "pdf");
    data.append("userId", result.data.userId);
    data.append("password", password);

    const pdfResponse = await fetch(
      `${API_URL}/bank-statement-analysis/finbox/upload`,
      {
        body: data,
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
        method: "POST",
      }
    );

    const pdfResult = await pdfResponse.json();

    // console.log(pdfResult);

    navigate("/thank-you");
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>

        <div className= {styles.box}>
        <h1>Upload Bank Statement PDF</h1>
        <Dropzone onDrop={(acceptedFiles) => setPdf(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <DocumentCard>
              <div
                onClick={() => {
                  // selfieClickHandler();
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <p
                  style={{
                    textAlign: "center",
                    color: "#D32028",
                    fontWeight: "bold",
                    fontSize: 18,
                    marginBottom: 5,
                  }}
                >
                  {pdf ? "Uploaded PDF" : "Upload PDF"}
                </p>
                <p
                  style={{
                    textAlign: "center",
                    color: "#868FA3",
                    marginBottom: 5,
                  }}
                >
                  {pdf
                    ? JSON.stringify(pdf.name)
                    : "Please upload the pdf of your bank statement."}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: 16,
                    flexDirection: "column",
                  }}
                >
                  {/* <SelfieImage /> */}
                  <img
                    src="bank-statement.svg"
                    alt=""
                    style={{
                      width: "50%",
                    }}
                  />
                </div>
              </div>

              {pdf && (
                <InputText
                  placeholder="PDF Password"
                  value={password}
                  changeHandler={(e) => setPassword(e.target.value)}
                />
              )}
            </DocumentCard>
          )}
        </Dropzone>
        <Button
          onPress={() => {
            uploadPdf();
          }}
          disabled={!pdf || !password}
          text="Proceed"
        />
        </div>
      </div>
    </div>
  );
};

export default BankPdfUpload;
