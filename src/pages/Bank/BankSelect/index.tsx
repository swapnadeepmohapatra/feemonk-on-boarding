import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Button from "../../../components/atoms/Button";
import InputText from "../../../components/atoms/InputText";
import { BANK_LIST } from "../../../helpers/banks_list";
import { useNavigate,useLocation } from "react-router-dom";
import { API_URL } from "../../../utils";
import { useLocalStorage } from "../../../hooks";

function BankSelect() {
  const navigate = useNavigate();
  // const [authToken] = useLocalStorage("feemonk_data", "");
  const location = useLocation();
  const stateData = location.state || {};
  console.log(stateData)

  const  data  = stateData.data1;
  
  const [selectedBank, setSelectedBank] = useState("");
  const [searchText, setSearchText] = useState("");
  const [fipList, setFipList] = useState<{ bank: String; health_up: Boolean }[]
  >([]);

  const [authToken, setAuthToken] = useLocalStorage("auth_token", "");

  useEffect(() => {
    const authenticate = (auth_token: string) => {
      var myHeaders = new Headers();

      myHeaders.append("Authorization", `Bearer ${auth_token}`);

      var requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      // `${"https://apply-backend.feemonk.com"}/account-aggregator/get-fips`
      fetch(
        `${API_URL}/account-aggregator/get-active-banks`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result?.data) {
            setFipList(result?.data?.banks);
          }
        })
        .catch((error) => console.log("error", error));
    };

    if (authToken && authToken.value) {
      authenticate(authToken.value);
    }
  }, [navigate, authToken]);

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <div className={styles.container}>
          <h3 style={{marginBottom:"0.5rem"}}>Select your bank</h3>
          <InputText
            placeholder="Search banks"
            type="text"
            value={searchText}
            changeHandler={(e) => setSearchText(e.target.value)}
          />
          <div className={styles.bankList}>
            {BANK_LIST.filter((bank) =>
              bank["Full name"].toLowerCase().includes(searchText.toLowerCase())
            )
              .sort(
                (a, b) =>
                  a["Full name"]
                    .toLowerCase()
                    .indexOf(searchText.toLowerCase()) -
                  b["Full name"].toLowerCase().indexOf(searchText.toLowerCase())
              )
              .map((bank) => (
                <div
                  className={styles.bank}
                  onClick={() => {
                    console.log();

                    setSelectedBank(bank["Name"]);
                  }}
                  style={{
                    backgroundColor:
                      selectedBank === bank["Name"] ? "#F5F5F5" : "",
                  }}
                >
                  <div
                    className={styles.bankImg}
                    style={{
                      backgroundImage: `url(${bank["Logo URL"]})`,
                    }}
                  ></div>
                  <p>{bank["Full name"]}</p>
                </div>
              ))}
          </div>
          <Button
            text={"Continue"}
            onPress={() => {
              const bank = BANK_LIST.find(
                (bank) => bank["Name"] === selectedBank
              );
              // if (bank && bank["AA Available"]) {
                if (
                  bank &&
                  fipList.find(
                    (a) =>
                      a?.bank.toLocaleUpperCase() ===
                      bank["Name"].toLocaleUpperCase()
                  )?.health_up
                ) {
                navigate(`/account-aggregator`, { state: { bank, data,stateData } });
              } else {
                navigate(`/pdf-upload-bank`,{ state: { data ,stateData} });
              }
            }}
            disabled={!selectedBank}
          />
        </div>
      </div>
    </div>
  );
}

export default BankSelect;
