import React, { useState } from "react";
import data from "../drugdoseData.json";
import SwitchSelector from "./components/SwitchSelector";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import DrugDosageFinder from "./DrugDosageFinder";
import "./styles/styles.css";
import { useForm, Controller } from "react-hook-form";
import Select, { components } from "react-select";

const Calculator = () => {
  const [medicine, setMedicine] = useState("");
  const [weightData, setWeightData] = useState("");
  const [regimen, setRegimen] = useState("");
  const [result, setResult] = useState("");
  const [defaultTool, setDefaultTool] = useState({
    default_tool: "tpt_finder",
  });
  const [showResult, setShowResult] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selections, setSelections] = useState({
    medicine: null,
    age: null,
    weight: null,
  });

  const { control, handleSubmit, reset, getValues, resetField } = useForm({
    defaultValues: {
      select: {},
      medicine: { value: "", label: "Select a medicine..." },
      age: { value: "", label: "Select a age..." },
      weight: { value: "", label: "Select a weight..." },
    },
  });
  const Option = ({ children, ...props }) => {
    const style = { cursor: "pointer", marginRight: 10 };
    return (
      <components.Option {...props}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {props.isSelected ? (
            <FaRegCheckCircle color="#0A2C59" size={15} style={style} />
          ) : (
            <FaRegCircle color="#DDDDDD" size={15} style={style} />
          )}
          {children}
        </div>
      </components.Option>
    );
  };

  const onSubmit = (data) => {
    setShowResult(true);
  };

  const onClickReset = () => {
    setMedicine("");
    setWeightData("");
    setRegimen("");
    setResult("");
    setSelections({});
    reset({
      medicine: { value: "", label: "Select a medicine..." },
      age: { value: "", label: "Select a age..." },
      weight: { value: "", label: "Select a weight..." },
    });
    setShowResult(false);
  };

  const selectMedicine = (selectedOption) => {
    const { value } = selectedOption;
    setMedicine(value);
    setWeightData("");
    setResult("");
    setRegimen(data.prevention[value] ? data.prevention[value].regimen : []);
  };

  const selectAge = (selectedOption) => {
    const { value } = selectedOption;
    setResult(value);
    setShowResult(false);
  };

  const selectWeight = (selectedOption) => {
    const { value } = selectedOption;
    setWeightData(value);
    setResult(
      data.prevention[medicine]?.isAge && data.prevention[medicine]?.[value]
        ? ""
        : value
    );
    setShowResult(false);
  };

  const medicineOptions = data?.prevention?.medicines.map((item) => ({
    value: item.value,
    label: item.name,
  }));

  const ageOptions = data?.prevention?.[medicine]?.[weightData]?.map(
    (item) => ({
      value: item.value,
      label: item.name,
    })
  );

  const weightOptions = data?.prevention?.[medicine]?.weight?.map((item) => ({
    value: item.value,
    label: item.name,
  }));

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

  const dropdownList = [
    {
      label: "Medicine",
      options: medicineOptions,
      placeholder: "Select Medicine...",
      key: "medicine",
      onSelect: selectMedicine,
    },
    {
      label: "Weight",
      options: weightOptions,
      placeholder: "Select Weight...",
      key: "weight",
      onSelect: selectWeight,
    },
    {
      label: "Age",
      options: ageOptions,
      placeholder: "Select Age...",
      key: "age",
      onSelect: selectAge,
    },
  ];
  const handleSelectChange = (selectedOption, item) => {
    const currentSelections = getValues();
    setSelections((prevState) => ({
      ...prevState,
      [item.key]: selectedOption,
    }));
    if (selectedOption.value !== currentSelections[item.key]?.value) {
      if (item.key === "medicine") {
        resetField("age");
        resetField("weight");
      } else if (item.key === "weight") {
        resetField("age");
      }
    }
    if (item.onSelect) {
      item.onSelect(selectedOption);
    }
  };

  return (
    <div style={styles.container}>
      <SwitchSelector
        setDefaultTool={setDefaultTool}
        defaultTool={defaultTool}
        onReset={onClickReset}
        options={options["en"]}
      />
      {defaultTool.default_tool === "tpt_finder" ? (
        <div style={{ display: "flex" }}>
          <div style={styles.subContainer}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={styles.formContainer}
            >
              <div style={{ padding: "20px" }}>
                <h3 style={styles.header}>TB Prevention</h3>
                {dropdownList.map((item, index) => (
                  <React.Fragment key={item.key}>
                    {index === 0 ||
                    (index === 1 && selections[dropdownList[index - 1].key]) ||
                    (item.key === "age" &&
                      data?.prevention?.[medicine]?.isAge &&
                      data?.prevention?.[medicine]?.[weightData]) ? (
                      <>
                        <label style={styles.label}>
                          {item.label.toUpperCase()}
                        </label>
                        <Controller
                          name={item.key}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={false}
                              className={!isMenuOpen ? "fade-in" : ""}
                              styles={{
                                option: (baseStyles, state) => ({
                                  ...baseStyles,
                                  ...styles.selectOption,
                                  borderBottom:
                                    state.data.label !==
                                    item.options[item.options.length - 1].label
                                      ? "1px solid #ccc"
                                      : "none",
                                }),
                                container: (baseStyles, state) => ({
                                  ...baseStyles,
                                  marginBottom: 20,
                                }),
                                dropdownIndicator: (baseStyles, state) => ({
                                  ...baseStyles,
                                  color: "#000",
                                }),
                                singleValue: (baseStyles, state) => ({
                                  ...baseStyles,
                                  display: "flex",
                                  alignItems: "flex-start",
                                }),
                              }}
                              components={{
                                Option,
                                IndicatorSeparator: () => null,
                              }}
                              isOptionSelected={(option, selectValues) =>
                                selectValues.some(
                                  (selected) => selected.label === option.label
                                )
                              }
                              onMenuOpen={() => setIsMenuOpen(true)}
                              onMenuClose={() => setIsMenuOpen(false)}
                              onChange={(selectedOption) =>
                                field.onChange((e) =>
                                  handleSelectChange(selectedOption, item)
                                )
                              }
                              options={item.options}
                            />
                          )}
                        />
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
              <div>
                <div style={styles.divider}></div>
                <div style={styles.buttonContainer}>
                  <input
                    type="reset"
                    style={{
                      ...styles.resetReusltButton,
                      backgroundColor: "#D3D3D3",
                      marginRight: "5px",
                    }}
                    onClick={() => onClickReset()}
                  />
                  <input
                    type="submit"
                    value="Result"
                    disabled={result && regimen ? false : true}
                    style={{
                      ...styles.resetReusltButton,
                      marginLeft: "5px",
                      backgroundColor:
                        result && regimen ? "#0A2C59" : "#D3D3D3",
                      color: result && regimen ? "#fff" : "",
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
          <div style={styles.result}>
            <div style={styles.resultHeaderContainer}>
              <h3 style={styles.header}>Result</h3>
            </div>
            {regimen && result && showResult ? (
              <div className="slide-down">
                <div style={styles.doseResult}>
                  <p style={styles.doseResultHeader}>
                    Dose by age and weight band
                  </p>
                  <div style={styles.doseResultContainer}>
                    <img
                      src={require("../assets/drug.png")}
                      style={styles.drugImg}
                      alt="drug"
                    />
                    <p style={styles.doseResultContent}>
                      {result.split("\n").map((line, index) => (
                        <span
                          key={index}
                          style={{ display: "block", margin: 5 }}
                        >
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  <div style={styles.regimenResultContainer}>
                    <p style={styles.regimenResultHeader}>Regimen</p>
                    <p style={styles.regimenResultContent}>{regimen} </p>
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
  container: {
    paddingBlock: "20px",
    paddingInline: "50px",
  },
  subContainer: {
    backgroundColor: "#F8FAFC",
    border: "1px solid #ccc",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
    height: "650px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "650px",
  },
  selectOption: {
    backgroundColor: "#fff",
    color: "black",
    cursor: "pointer",
    textAlign: "center",
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "20px",
    fontWeight: "600",
    color: "#334155",
    marginBottom: "20px",
  },
  label: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "16px",
    fontWeight: "600",
    color: "#000",
    marginBottom: "8px",
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
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    border: "none",
    padding: "10px",
  },
  result: { marginLeft: "30px", width: "50%", marginTop: "20px" },
  doseResult: {
    marginTop: 30,
    //marginRight: 10,
    borderWidth: 1,
    border: "1px solid #6baddf",
    borderColor: "#6baddf",
    borderTopWidth: 0,
  },
  doseResultHeader: {
    color: "white",
    fontSize: 16,
    backgroundColor: "#3aa5fb",
    padding: 5,
    display: "flex",
    justifyContent: "flex-start",
  },
  doseResultContainer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    alignSelf: "center",
    borderColor: "#6baddf",
    borderTopWidth: 0,
    paddingInline: 5,
    paddingBottom: 10,
  },
  drugImg: {
    width: 40,
    height: 40,
    marginRight: 5,
    marginLeft: 5,
    alignSelf: "center",
  },
  doseResultContent: {
    fontSize: 18,
    color: "#203c71",
    lineHeight: "20px",
    fontWeight: "700",
    display: "block",
    textAlign: "start",
    marginLeft: 20,
    width: "80%",
  },
  regimenResultContainer: {
    borderWidth: 1,
    border: "1px solid #6baddf",
    //marginRight: 10,
    borderColor: "#6baddf",
    borderTopWidth: 0,
  },
  regimenResultHeader: {
    color: "white",
    fontSize: 16,
    padding: 5,
    backgroundColor: "#3aa5fb",
    //fontFamily: "AvenirNextCondensed-Bold",
    display: "flex",
    justifyContent: "flex-start",
  },
  regimenResultContent: {
    //fontFamily: "AvenirNextCondensed-DemiBold",
    fontSize: 18,
    lineHeight: "20px",
    fontWeight: "700",
    color: "#203c71",
    padding: 10,
    display: "flex",
    justifyContent: "flex-start",
  },
  resultHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default Calculator;
