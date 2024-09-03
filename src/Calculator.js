import React, { useState } from "react";
import data from "./drugdose 16.json";
import SwitchSelector from "./SwitchSelector";
import {FaRegCircle} from "react-icons/fa";
import {FaRegCheckCircle} from "react-icons/fa";
import {FaChevronDown} from "react-icons/fa";
import DrugDosageFinder from "./DrugDosageFinder";

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

  const options= {
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
                  style={{
                    width: "100%",
                    //height: 55,
                    border: "1px solid #ccc",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    //alignSelf: "flex-start",
                    //marginInline: 20,
                    backgroundColor: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setOpenMedicine(!openMedicine);
                    setOpenAge(false);
                    setOpenWeight(false);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{ fontSize: 16, color: "#595959", margin: "10px" }}
                    >
                      {medicineName ? medicineName : "Select Medicine..."}
                    </p>
                  </div>
                  <div>
                    <FaChevronDown size={14} color="#000" />
                  </div>
                </button>
                {openMedicine && (
                  <section
                    style={{
                      //border: "2px solid #ccc",
                      position: "absolute",
                      backgroundColor: "#fff",
                      //marginTop: 15,
                      zIndex: 50,
                      width: "45%",
                      //border: '1px solid #ccc',
                      borderRadius: "8px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {medicineOptions.map((item, index) => (
                      <>
                        <button
                          key={index}
                          onClick={() => {
                            selectMedicine(item);
                            setOpenMedicine(false);
                          }}
                          style={{
                            display: "flex",
                            width: "90%",
                            flexDirection: "row",
                            // borderBlockStart: "none",
                            // borderInline: "none",
                            border: "none",
                            backgroundColor: "#fff",
                            marginInline: "10px",
                            // paddingInline: 20,
                            // borderBottomWidth: "1px",
                            // borderBottomColor: "#ccc",
                            alignItems: "center",
                          }}
                        >
                          {medicineName === item.label ? (
                            <FaRegCheckCircle color="#0A2C59" size={15} />
                          ) : (
                            <FaRegCircle color="#DDDDDD" size={15} />
                          )}
                          <p
                            style={{
                              paddingInline: 10,
                              color: "#808080",
                              margin: "10px",
                              fontSize: 16,
                            }}
                          >
                            {item.label}
                          </p>
                        </button>
                        {index < medicineOptions.length - 1 ? (
                          <div
                            style={{
                              width: "100%",
                              height: "1px",
                              backgroundColor: "#ccc",
                            }}
                          ></div>
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
                    style={{
                      width: "100%",
                      //height: 55,
                      border: "1px solid #ccc",
                      borderRadius: 5,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      //alignSelf: "flex-start",
                      //marginInline: 20,
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setOpenAge(!openAge);
                      setOpenWeight(false);
                      setOpenMedicine(false);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 16,
                          color: "#595959",
                          margin: "10px",
                        }}
                      >
                        {ageName ? ageName : "Select Age..."}
                      </p>
                    </div>
                    <div>
                      <FaChevronDown size={14} color="#000" />
                    </div>
                  </button>
                  {openAge && (
                    <section
                      style={{
                        //border: "2px solid #ccc",
                        position: "absolute",
                        backgroundColor: "#fff",
                        //marginTop: 15,
                        zIndex: 50,
                        width: "45%",
                        //border: '1px solid #ccc',
                        borderRadius: "8px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {ageOptions.map((item, index) => (
                        <>
                          <button
                            key={index}
                            onClick={() => {
                              selectAge(item);
                              setOpenAge(false);
                            }}
                            style={{
                              display: "flex",
                              width: "90%",
                              flexDirection: "row",
                              // borderBlockStart: "none",
                              // borderInline: "none",
                              border: "none",
                              backgroundColor: "#fff",
                              marginInline: "10px",
                              // paddingInline: 20,
                              // borderBottomWidth: "1px",
                              // borderBottomColor: "#ccc",
                              alignItems: "center",
                            }}
                          >
                            {ageName === item.label ? (
                              <FaRegCheckCircle color="#0A2C59" size={15} />
                            ) : (
                              <FaRegCircle color="#DDDDDD" size={15} />
                            )}
                            <p
                              style={{
                                paddingInline: 10,
                                color: "#808080",
                                margin: "10px",
                                fontSize: 16,
                              }}
                            >
                              {item.label}
                            </p>
                          </button>
                          {index < ageOptions.length - 1 ? (
                            <div
                              style={{
                                width: "100%",
                                height: "1px",
                                backgroundColor: "#ccc",
                              }}
                            ></div>
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
                    style={{
                      width: "100%",
                      //height: 55,
                      border: "1px solid #ccc",
                      borderRadius: 5,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      //alignSelf: "flex-start",
                      //marginInline: 20,
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setOpenWeight(!openWeight);
                      setOpenMedicine(false);
                      setOpenAge(false);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 16,
                          color: "#595959",
                          margin: "10px",
                        }}
                      >
                        {weightName ? weightName : "Select Weight..."}
                      </p>
                    </div>
                    <div>
                      <FaChevronDown size={14} color="#000" />
                    </div>
                  </button>
                  {openWeight && (
                    <section
                      style={{
                        //border: "2px solid #ccc",
                        position: "absolute",
                        backgroundColor: "#fff",
                        //marginTop: 15,
                        zIndex: 50,
                        width: "44%",
                        //border: '1px solid #ccc',
                        borderRadius: "8px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {weightOptions.map((item, index) => (
                        <>
                          <button
                            key={index}
                            onClick={() => {
                              selectWeight(item);
                              setOpenWeight(false);
                            }}
                            style={{
                              display: "flex",
                              width: "90%",
                              flexDirection: "row",
                              // borderBlockStart: "none",
                              // borderInline: "none",
                              border: "none",
                              backgroundColor: "#fff",
                              marginInline: "10px",
                              // paddingInline: 20,
                              // borderBottomWidth: "1px",
                              // borderBottomColor: "#ccc",
                              alignItems: "center",
                            }}
                          >
                            {weightName === item.label ? (
                              <FaRegCheckCircle color="#0A2C59" size={15} />
                            ) : (
                              <FaRegCircle color="#DDDDDD" size={15} />
                            )}
                            <p
                              style={{
                                paddingInline: 10,
                                color: "#808080",
                                margin: "10px",
                                fontSize: 16,
                              }}
                            >
                              {item.label}
                            </p>
                          </button>
                          {index < weightOptions.length - 1 ? (
                            <div
                              style={{
                                width: "100%",
                                height: "1px",
                                backgroundColor: "#ccc",
                              }}
                            ></div>
                          ) : null}
                        </>
                      ))}
                    </section>
                  )}
                </div>
              )}
            </div>
            <div>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#ccc",
                }}
              ></div>
              <div style={{ display: "flex", padding: "20px" }}>
                <button
                  style={{
                    width: "50%",
                    borderRadius: "8px",
                    marginRight: "5px",
                    fontSize: "14px",
                    fontWeight: "500",
                    backgroundColor: result ? "#d9dce1" : "#e7eaed",
                    border: "none",
                    padding: "10px",
                  }}
                  onClick={onClickReset}
                >
                  Reset
                </button>
                <button
                  style={{
                    width: "50%",
                    borderRadius: "8px",
                    marginLeft: "5px",
                    fontSize: "14px",
                    color: result ? "#0661c5" : "#000",
                    fontWeight: "500",
                    backgroundColor: result ? "#c4dcf6" : "#e7eaed",
                    border: "none",
                    padding: "10px",
                  }}
                  onClick={() => setShowResult(true)}
                >
                  Result
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "30px", width: "40%", marginTop: "20px"}}>
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
                      backgroundColor: "#006ab6",
                      paddingBlock: 6,
                      fontFamily: "AvenirNextCondensed-Bold",
                      alignSelf: "center",
                    }}
                  >
                    DOSE BY AGE AND WEIGHT BAND
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
                      paddingBlock: 10,
                    }}
                  >
                    <img
                      src={require("./assets/drug.png")}
                      style={{
                        width: 50,
                        height: 50,
                        marginRight: 5,
                        marginLeft: 5,
                        alignSelf: "center",
                      }}
                      alt="drug"
                    />
                    <p
                      style={{
                        fontFamily: "AvenirNextCondensed-DemiBold",
                        fontSize: 16,
                        color: "#696969",
                        padding: 5,
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
                        paddingBlock: 6,
                        backgroundColor: "#006ab6",
                        fontFamily: "AvenirNextCondensed-Bold",
                        alignSelf: "center",
                      }}
                    >
                      REGIMEN
                    </p>
                    <p
                      style={{
                        fontFamily: "AvenirNextCondensed-DemiBold",
                        fontSize: 16,
                        color: "#696969",
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
              <div style={{marginTop: 150}}>
                <p style={{fontSize: 18,  color: "#abb4c4",}}>Fill the fields to see the result</p>
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
     paddingInline: "50px"
  },
  container: {
    backgroundColor: "#F8FAFC",
    //padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
    height: "700px",
    //boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
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
  label: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "14px",
    fontWeight: "500",
    color: "#475569",
    marginBottom: "8px",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    backgroundColor: "white",
    fontSize: "14px",
    color: "#0F172A",
    outline: "none",
    background:
      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAANpJREFUOE/F0rFKglEYxvGfg4OLTo1dQheQd6CIUy72tQfugktDFxAErTbVYqAu0t4FtNTe2CgOLuKgB44gH599loEHznTe53+e93nfggNP4UC9fwEkePqjkyQ4uMcMN7+E3KISAOH28Ym7PSEdVHG1yaCIIUZ4zIFcBiGaWGyHWMIEDxGWxWmgixrmoSA9hTJe0cNbinAeW6xjunnLGuNJdHK9tvkeC89ia8H29zZ41x6cYow2lhisQ77AV7qvnxYp/PocBSG4j6xQ8jaxFUUvuyaTB8hdi+MDVgONHgCTs9PAAAAAAElFTkSuQmCC) no-repeat right #fff",
    backgroundPositionX: "calc(100% - 10px)",
    cursor: "pointer",
    appearance: "none", // Hide default arrow
    WebkitAppearance: "none",
    MozAppearance: "none",
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
