import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/atoms/Button";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
// import { UserInitialState } from "../../redux/slice/userData";
// import { process.env.REACT_APP_DASHBOARD_URL } from "../../../utils";
import DocumentCard from "./DocCard";
import styles from "./styles.module.css";
import Dropzone from "react-dropzone";
import InputText from "../../../components/atoms/InputText";
import { Label } from "reactstrap";

const BankPdfUpload: React.FC = () => {
  const [pdf, setPdf] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [authToken] = useLocalStorage("feemonk_data", "");
  const navigate = useNavigate();
  const user = sessionStorage.getItem("auth_token") || "";
  const decode = JSON.parse(user).value as any;
  console.log(decode);

  const uploadPdf = async () => {
    const response = await fetch(`${process.env.REACT_APP_DASHBOARD_URL}/login/auth`, {
      headers: {
        Authorization: `Bearer ${decode}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const result = await response.json();
    // console.log(result)

    const data = new FormData();
    if (pdf !== null) {
      data.append("file", pdf);
    }
    data.append("type", "pdf");
    data.append("userId", result.data.userId);

    data.append("password", password);

    const pdfResponse = await fetch(
      `${process.env.REACT_APP_DASHBOARD_URL}/bank-statement-analysis/finbox/upload`,
      {
        body: data,
        headers: {
          Authorization: `Bearer ${decode}`,
        },
        method: "POST",
      }
    );

    const pdfResult = await pdfResponse.json();

    // console.log(pdfResult);

    navigate("/view-offer");
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.box}>
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
                <p style={{ marginBottom: "1rem" }}>password is optional</p>
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
            disabled={!pdf}
            text="Proceed"
          />
        </div>
      </div>
    </div>
  );
};

export default BankPdfUpload;
