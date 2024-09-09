import React, { useState } from "react";
import data from "./drugdose 16.json";
import SwitchSelector from "./SwitchSelector";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import DrugDosageFinder from "./DrugDosageFinder";
import "./Calculator.css";

const Calculator = () => {
  const [medicine, setMedicine] = useState("");
  const [agedata, setAgedata] = useState("");
  const [regimen, setRegimen] = useState("");
  const [result, setResult] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [openMedicine, setOpenMedicine] = useState(false);
  const [openAge, setOpenAge] = useState(false);
  const [openWeight, setOpenWeight] = useState(false);
  const [ageName, setAgeName] = useState("");
  const [weightName, setWeightName] = useState("");
  const [defaultTool, setDefaultTool] = useState({
    default_tool: "tpt_finder",
  });
  const [showResult, setShowResult] = useState(false);

  const onClickReset = () => {
    setMedicine("");
    setAgedata("");
    setRegimen("");
    setResult("");
    setMedicineName("");
    setAgeName("");
    setWeightName("");
    setShowResult(false);
  };

  const selectMedicine = (selectedOption) => {
    const { value, label } = selectedOption;
    setMedicine(value);
    setMedicineName(label);
    setAgedata("");
    setAgeName("");
    setResult("");
    setRegimen(data.prevention[value] ? data.prevention[value].regimen : []);
  };

  const selectAge = (selectedOption) => {
    const { value, label } = selectedOption;
    setAgedata(value);
    setAgeName(label);
    setWeightName("");
    setResult(data.prevention[medicine]?.isWeight ? "" : value);
    setShowResult(false);
  };

  const selectWeight = (selectedOption) => {
    const { value, label } = selectedOption;
    setResult(value);
    setWeightName(label);
  };

  const medicineOptions = data?.prevention?.medicines.map((item) => ({
    value: item.value,
    label: item.name,
  }));

  const ageOptions = data?.prevention?.[medicine]?.age.map((item) => ({
    value: item.value,
    label: item.name,
  }));

  const weightOptions = data?.prevention?.[medicine]?.[agedata]?.map(
    (item) => ({
      value: item.value,
      label: item.name,
    })
  );

  const options = {
    en: [
      { label: "TB Prevention", value: "tpt_finder" },
      { label: "TB Treatment", value: "dosage_finder" },
    ],
    fr: [
      { label: "Prévention de la tuberculose", value: "tpt_finder" },
      { label: "Traitement de la tuberculose", value: "dosage_finder" },
    ],
    es: [
      { label: "Prevención de la tuberculosis", value: "tpt_finder" },
      { label: "Tratamiento de la tuberculosis", value: "dosage_finder" },
    ],
    ru: [
      { label: "Профилактика туберкулеза", value: "tpt_finder" },
      { label: "Лечение туберкулеза", value: "dosage_finder" },
    ],
  };

  return (
    <div style={styles.container1}>
      <SwitchSelector
        setDefaultTool={setDefaultTool}
        defaultTool={defaultTool}
        options={options["en"]}
      />
      {defaultTool.default_tool === "tpt_finder" ? (
        <div style={{ display: "flex" }}>
          <div style={styles.container}>
            <div style={{ padding: "20px" }}>
              <h3 style={styles.header}>TB Prevention</h3>
              <div style={styles.fieldContainer}>
                <label style={styles.label}>Medicine</label>
                <button
                  style={styles.fieldButton}
                  onClick={() => {
                    setOpenMedicine(!openMedicine);
                    setOpenAge(false);
                    setOpenWeight(false);
                  }}
                >
                  <div style={styles.fieldSubContainer}>
                    <p style={styles.fieldLabel}>
                      {medicineName
                        ? medicineName.toUpperCase()
                        : "Select Medicine..."}
                    </p>
                  </div>
                  <div>
                    <FaChevronDown
                      className="slide-in"
                      size={14}
                      style={{ marginRight: 10 }}
                      color="#000"
                    />
                  </div>
                </button>
                {openMedicine && (
                  <section style={styles.dropdownSection}>
                    {medicineOptions.map((item, index) => (
                      <>
                        <button
                          key={index}
                          onClick={() => {
                            selectMedicine(item);
                            setOpenMedicine(false);
                          }}
                          style={styles.dropdownItem}
                        >
                          {medicineName === item.label ? (
                            <FaRegCheckCircle color="#0A2C59" size={15} />
                          ) : (
                            <FaRegCircle color="#DDDDDD" size={15} />
                          )}
                          <p style={styles.dropdownLabel}>{item.label}</p>
                        </button>
                        {index < medicineOptions.length - 1 ? (
                          <div style={styles.divider}></div>
                        ) : null}
                      </>
                    ))}
                  </section>
                )}
              </div>
              {medicine && (
                <div style={styles.fieldContainer}>
                  <label style={styles.label}>Age</label>
                  <button
                    style={styles.fieldButton}
                    onClick={() => {
                      setOpenAge(!openAge);
                      setOpenWeight(false);
                      setOpenMedicine(false);
                    }}
                  >
                    <div style={styles.fieldSubContainer}>
                      <p style={styles.fieldLabel}>
                        {ageName ? ageName.toUpperCase() : "Select Age..."}
                      </p>
                    </div>
                    <div>
                      <FaChevronDown
                        className="slide-in"
                        size={14}
                        color="#000"
                        style={{ marginRight: 10 }}
                      />
                    </div>
                  </button>
                  {openAge && (
                    <section style={styles.dropdownSection}>
                      {ageOptions.map((item, index) => (
                        <>
                          <button
                            key={index}
                            onClick={() => {
                              selectAge(item);
                              setOpenAge(false);
                            }}
                            style={styles.dropdownItem}
                          >
                            {ageName === item.label ? (
                              <FaRegCheckCircle color="#0A2C59" size={15} />
                            ) : (
                              <FaRegCircle color="#DDDDDD" size={15} />
                            )}
                            <p style={styles.dropdownLabel}>{item.label}</p>
                          </button>
                          {index < ageOptions.length - 1 ? (
                            <div style={styles.divider}></div>
                          ) : null}
                        </>
                      ))}
                    </section>
                  )}
                </div>
              )}
              {data?.prevention?.[medicine]?.isWeight && agedata && (
                <div style={styles.fieldContainer}>
                  <label style={styles.label}>Weight</label>
                  <button
                    style={styles.fieldButton}
                    onClick={() => {
                      setOpenWeight(!openWeight);
                      setOpenMedicine(false);
                      setOpenAge(false);
                    }}
                  >
                    <div style={styles.fieldSubContainer}>
                      <p style={styles.fieldLabel}>
                        {weightName
                          ? weightName.toUpperCase()
                          : "Select Weight..."}
                      </p>
                    </div>
                    <div>
                      <FaChevronDown
                        className="slide-in"
                        style={{ marginRight: 10 }}
                        size={14}
                        color="#000"
                      />
                    </div>
                  </button>
                  {openWeight && (
                    <section style={styles.dropdownSection}>
                      {weightOptions.map((item, index) => (
                        <>
                          <button
                            key={index}
                            onClick={() => {
                              selectWeight(item);
                              setOpenWeight(false);
                            }}
                            style={styles.dropdownItem}
                          >
                            {weightName === item.label ? (
                              <FaRegCheckCircle color="#0A2C59" size={15} />
                            ) : (
                              <FaRegCircle color="#DDDDDD" size={15} />
                            )}
                            <p style={styles.dropdownLabel}>{item.label}</p>
                          </button>
                          {index < weightOptions.length - 1 ? (
                            <div style={StyleSheet.divider}></div>
                          ) : null}
                        </>
                      ))}
                    </section>
                  )}
                </div>
              )}
            </div>
            <div>
              <div style={styles.divider}></div>
              <div style={styles.buttonContainer}>
                <button
                  style={{
                    ...styles.resetReusltButton,
                    backgroundColor: result ? "#d9dce1" : "#e7eaed",
                  }}
                  onClick={onClickReset}
                >
                  Reset
                </button>
                <button
                  style={{
                    ...styles.resetReusltButton,
                    color: result ? "#0661c5" : "#000",
                    backgroundColor: result ? "#c4dcf6" : "#e7eaed",
                  }}
                  onClick={() => setShowResult(true)}
                >
                  Result
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "30px", width: "40%", marginTop: "20px" }}>
            <h3 style={styles.header}>Result</h3>
            {regimen && result && showResult ? (
              <div>
                <div
                  style={{
                    marginTop: 30,
                    marginRight: 10,
                    borderWidth: 1,
                    border: "1px solid #6baddf",
                    borderColor: "#6baddf",
                    borderTopWidth: 0,
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: 16,
                      backgroundColor: "#3aa5fb",
                      padding: 5,
                      //fontFamily: "AvenirNextCondensed-Bold",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    Dose by age and weight band
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderWidth: 1,
                      alignSelf: "center",
                      borderColor: "#6baddf",
                      borderTopWidth: 0,
                      paddingInline: 5,
                      paddingBottom: 10,
                    }}
                  >
                    <img
                      src={require("./assets/drug.png")}
                      style={{
                        width: 40,
                        height: 40,
                        marginRight: 5,
                        marginLeft: 5,
                        alignSelf: "center",
                      }}
                      alt="drug"
                    />
                    <p
                      style={{
                        //fontFamily: "AvenirNextCondensed-DemiBold",
                        fontSize: 18,
                        color: "#203c71",
                        lineHeight: "20px",
                        fontWeight: "700",
                        display: "flex",
                        flexWrap: "wrap",
                        textAlign: "center",
                        alignSelf: "center",
                        marginRight: 20,
                        width: "80%",
                      }}
                      numberOfLines={5}
                    >
                      {result}{" "}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      borderWidth: 1,
                      border: "1px solid #6baddf",
                      marginRight: 10,
                      borderColor: "#6baddf",
                      borderTopWidth: 0,
                    }}
                  >
                    <p
                      style={{
                        color: "white",
                        fontSize: 16,
                        padding: 5,
                        backgroundColor: "#3aa5fb",
                        //fontFamily: "AvenirNextCondensed-Bold",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      Regimen
                    </p>
                    <p
                      style={{
                        //fontFamily: "AvenirNextCondensed-DemiBold",
                        fontSize: 18,
                        lineHeight: "20px",
                        fontWeight: "700",
                        color: "#203c71",
                        padding: 10,
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      {regimen}{" "}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 150 }}>
                <p style={{ fontSize: 18, color: "#abb4c4" }}>
                  Fill the fields to see the result
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <DrugDosageFinder treatment={data.treatment} />
      )}
    </div>
  );
};

const styles = {
  container1: {
    paddingBlock: "20px",
    paddingInline: "50px",
  },
  container: {
    backgroundColor: "#F8FAFC",
    position: "relative",
    border: "1px solid #ccc",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
    height: "650px",
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "20px",
    fontWeight: "600",
    color: "#334155",
    marginBottom: "20px",
  },
  fieldContainer: {
    marginBottom: "20px",
  },
  fieldButton: {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fbfcfd",
    cursor: "pointer",
  },
  fieldSubContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fieldLabel: { fontSize: 16, color: "#595959", margin: "10px" },
  label: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "14px",
    fontWeight: "600",
    color: "#000",
    marginBottom: "8px",
  },
  dropdownSection: {
    position: "absolute",
    backgroundColor: "#fff",
    zIndex: 50,
    width: "95%",
    borderRadius: "8px",
    boxShadow: "2px 4px 8px 1px rgba(0, 0, 0, 0.1)",
  },
  dropdownItem: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    border: "none",
    backgroundColor: "#fff",
    marginInline: "10px",
    alignItems: "center",
  },
  dropdownLabel: {
    paddingInline: 10,
    color: "#000",
    margin: "10px",
    fontSize: 14,
    fontWeight: "400",
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#ccc",
  },
  buttonContainer: {
    display: "flex",
    padding: "20px",
  },
  resetReusltButton: {
    width: "50%",
    borderRadius: "8px",
    marginRight: "5px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    border: "none",
    padding: "10px",
  },
  icon: {
    position: "absolute",
    left: 700,
    top: "31%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "#94A3B8",
  },
};

export default Calculator;
