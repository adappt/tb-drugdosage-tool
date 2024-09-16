import React, { useEffect, useState } from "react";
import { FaChevronDown, FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import {
  compareLabel,
  titleTemplates,
  translations,
  weightJson,
  weightRange,
} from "./utils/drugtooltitle";
import { IoMdRadioButtonOff } from "react-icons/io";
import { IoMdRadioButtonOn, IoMdDownload } from "react-icons/io";
import { Modal } from "@mui/material";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import PdfComponent from "./PdfComponent";
import "../Styles/styles.css";

export default function DrugDosageFinder(props) {
  const styles = {
    container: {
      backgroundColor: "#F8FAFC",
      border: "1px solid #ccc",
      position: "relative",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "50%",
      height: "650px",
    },
    headerTitle: {
      display: "flex",
      justifyContent: "flex-start",
      fontSize: "20px",
      fontWeight: "600",
      color: "#334155",
      marginBottom: "20px",
    },
    ageContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      //marginTop: 40,
    },
    dropdown: {
      //height: 50,
      //borderWidth: 1,
      borderRadius: 5,
      border: "1px solid #C4C4C4",
      backgroundColor: "#fbfcfd",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
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
    fieldLabel: {
      fontSize: 16,
      color: "#595959",
      margin: "10px",
    },
    dropdownSection: {
      position: "absolute",
      backgroundColor: "#fff",
      zIndex: 50,
      width: "100%",
      borderRadius: "8px",
      boxShadow: "2px 4px 8px 1px rgba(0, 0, 0, 0.1)",
    },
    resultHeaderContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    downloadButton: {
      display: "flex",
      borderRadius: "8px",
      marginLeft: "5px",
      fontSize: "14px",
      justifyContent: "center",
      cursor: "pointer",
      alignItems: "center",
      color: "#fff",
      fontWeight: "500",
      backgroundColor: "#0A2C59",
      border: "none",
      padding: "10px",
    },
    textInput: {
      display: "flex",
      outline: "none",
      border: "none",
      color: "#494949",
      backgroundColor: "#fbfcfd",
      fontSize: 16,
      width: "50%",
      marginInline: 10,
    },
    modalContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "85%",
      overflowY: "auto",
      backgroundColor: "white",
      borderRadius: 10,
    },
    regimenModalContainer: {
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    regimenModalItemBtn: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      borderBlockStart: "none",
      borderInline: "none",
      backgroundColor: "#fff",
      paddingInline: 20,
      borderBottomColor: "#ccc",
      alignItems: "center",
    },
    regimenModalItemLabel: {
      marginLeft: 8,
      fontSize: 18,
      textAlignVertical: "center",
      color: "#777",
    },
    drugsModalContainer: {
      padding: 10,
      paddingInline: 20,
      borderColor: "#ccc",
    },
    modalItemBtn: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      borderBlock: "none",
      borderInline: "none",
      backgroundColor: "#fff",
      paddingInline: 20,
      marginBottom: 10,
      alignItems: "center",
    },
    drugsModalItemLabel: {
      margin: 0,
      fontSize: 18,
      paddingInline: 10,
      textAlignVertical: "center",
      color: "#777",
    },
    drugDoseContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    drugDoseModalContainer: {
      padding: 8,
      borderColor: "#ccc",
    },
    drugsDoseModalItemLabel: {
      margin: 0,
      fontSize: 18,
      textAlign: "left",
      paddingLeft: "10px",
      //fontFamily: Theme.fonts.custFontSemiBold,
      color: "#777",
    },
    resultContainer: {
      width: "100%",
      marginTop: 30,
    },
    resultTitleContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    resultTitle: {
      color: "#000",
      margin: 0,
      fontSize: 20,
      marginBottom: 20,
      textAlign: "left",
    },
    categoryContainer: {
      width: "100%",
      backgroundColor: "#006ab6",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingBlock: 10,
    },
    catergoryName: {
      margin: 0,
      paddingLeft: 10,
      color: "#fff",
    },
    emptyResultLabel: { fontSize: 18, color: "#abb4c4" },
    remarksHeaderContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    remarksLink: {
      cursor: "pointer",
      color: "blue",
      fontSize: 16,
      marginLeft: "20px",
      textDecorationLine: "underline",
    },
    remarksContent: {
      color: "#000",
      textAlign: "left",
      fontSize: 16,
      margin: "10px 0px 0px 10px",
    },
    LRGRemarksContent: {
      fontSize: 16,
      color: "#000",
      textAlign: "left",
      margin: "20px 0px 0px 20px",
    },
    regimenDropdownContainer: {
      display: "flex",
      width: "90%",
      flexDirection: "row",
      border: "none",
      backgroundColor: "#fff",
      marginInline: "10px",
      alignItems: "center",
    },
    regimenDropdownItem: {
      paddingInline: 10,
      color: "#000",
      margin: "8px",
      fontSize: 14,
      fontWeight: "400",
    },
    divider: {
      width: "100%",
      height: "1px",
      backgroundColor: "#ccc",
    },
    kgText: {
      color: "#abb4c4",
      fontSize: 16,
      margin: "0px 15px 0px",
    },
    headerText: {
      color: "#000",
      margin: 0,
      fontSize: 15,
      fontWeight: "400",
      paddingLeft: 10,
    },
    headerCell: {
      width: "100%",
      backgroundColor: "#dce3f1",
      paddingBlock: 5,
      margin: "0px 2px 2px 0px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    row: {
      display: "flex",
    },
    column: { display: "flex", flexDirection: "column" },
    label: {
      display: "flex",
      justifyContent: "flex-start",
      fontSize: "14px",
      fontWeight: "600",
      color: "#000",
      marginBottom: "8px",
    },
    dropdown_Medicinerow_text: {
      marginHorizontal: 4,
      fontSize: 18,
      fontWeight: "600",
      margin: "8px",
      textAlignVertical: "center",
      color: "#0A2C59",
    },
    modalText: {
      display: "flex",
      flexDirection: "row",
      paddingInline: 10,
      alignItems: "center",
    },
    closeButton: {
      backgroundColor: "#0A2C59",
      width: "100%",
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginBottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      textAlign: "center",
      color: "#fff",
      fontSize: 20,
    },
    resetResultButton: {
      width: "50%",
      borderRadius: "8px",
      fontSize: "14px",
      cursor: "pointer",
      fontWeight: "500",
      border: "none",
      padding: "10px",
    },
    overlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    regimenDropdownOptions: {
      display: "flex",
      width: "90%",
      flexDirection: "row",
      border: "none",
      backgroundColor: "#fff",
      marginInline: "10px",
      alignItems: "center",
    },
    regimenDropdownItemLabel: {
      paddingInline: 10,
      color: "#000",
      margin: "8px",
    },
    modal: {
      display: "flex",
      alignSelf: "center",
      justifyContent: "center",
    },
    medicationContainer: {
      width: "100%",
      backgroundColor: "#006ab6",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingBlock: 10,
    },
    medicationLRGContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  };
  const [age, setAge] = useState("");
  const [months, setMonths] = useState("");
  const [categoryName, setCategoryName] = useState([]);
  const [showDrugsModal, setShowDrugsModal] = useState(false);
  const [showDrugsDose, setShowDrugsDose] = useState(false);
  const [regimenOptions, setRegimenOptions] = useState([]);
  const [regArray, setRegArray] = useState([]);
  const [regimenLabel, setRegimenLabel] = useState("");
  const [regimenName, setRegimenName] = useState("");
  const [openRegimen, setOpenRegimen] = useState(false);
  const [openRegimenOptions, setOpenRegimenOptions] = useState(false);
  const [regimenItem, setRegimenItem] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState([]);
  const [regIdx, setRegIdx] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState({});
  const [selectedForms, setSelectedForms] = useState([]);
  const [medicineLabel, setMedicineLabel] = useState([]);
  const [groupMedicineData, setGroupMedicineData] = useState({});
  const [medicineData, setMedicineData] = useState({});
  const [group, setGroup] = useState({});
  const [showResult, setShowResult] = useState(null);
  const [isGrouped, setIsGrouped] = useState(null);
  const [groupedData, setGroupedData] = useState({});
  const [reorderedSelectedItems, setReorderedSelectedItems] = useState({});
  const [isNewSet, setIsNewSet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [isValidated, setIsValidated] = useState(false);
  const [selectedFormsArray, setSelectedFormsArray] = useState([]);
  const [downloadOptions, setDownloadOptions] = useState(false);
  const [longerRegimen, setLongerRegimen] = useState({});
  const [regselected, setRegselected] = useState(false);
  const [itemIdx, setItemIdx] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [meds, setMeds] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const dropdownOptions = Object.keys(props.treatment.data)
      .map((category) => {
        const categoryData = props.treatment.data[category];
        const option = [
          {
            label: category,
            section: true,
            selected: categoryData.selected,
            regimen: [categoryData.options],
          },
          ...categoryData.subOptions,
        ];
        return option;
      })
      .flat();

    const firstLabel = dropdownOptions[0].label;
    const lastLabel = dropdownOptions[dropdownOptions.length - 3].label;
    const filteredLabels = [firstLabel, lastLabel];
    setCategoryName(filteredLabels);
  }, []);

  const findWeightRange = (value) => {
    for (const range of weightJson) {
      if (value >= range.start && value <= range.end) {
        return range.value;
      }
    }
    return "Not found";
  };

  const findDoseVal = (weight) => {
    for (const item of weightRange) {
      const start = +item.start;
      const end = +item.end + 1;
      if (weight >= start && weight < end) {
        return item.value === "3less" ? "3to4" : item.value;
      }
    }
    return "Not found";
  };

  const dropDownRow = (rowData, index) => {
    const getValueBasedOnLabel = (data, selectedLabel) => {
      for (const item of data) {
        if (item.label === selectedLabel) {
          return item.value;
        }
      }
      return null;
    };

    const getForm = (age, months, weight) => {
      let s = props.treatment.data[categoryName[0]].form;
      if ((months < 3 && months) || weight < 3) {
        // <3months or <3kg
        return s["3less"];
      } else if ((months >= 3 && age < 12) || (age && age < 12)) {
        // 3 months to <12yrs
        return s["3to12"];
      } else if (age >= 12 && age <= 16) {
        // 12 to <16yrs
        return s["12to16"];
      } else {
        return s?.[">16"];
      }
    };

    const toggleSelection = () => {
      const updatedRowData = { ...rowData };
      updatedRowData.selected = !updatedRowData.selected;
      let s = props.treatment.data[categoryName[1]].subOptions;
      const value = getValueBasedOnLabel(s, updatedRowData.label);
      const drRes = props.treatment.data[categoryName[1]][value];

      setRegimenLabel(updatedRowData.label);

      if (value === "hr-tb" && weight < 4) {
        window.alert("No Regimen");
        setRegimenLabel(null);
        setResult(null);
        setShowResult(null);
        setIsGrouped(null);
        setLongerRegimen({});
      } else if (weight < 25 && drRes) {
        const hrTbKeys = Object.keys(drRes);
        const isInputInRange = hrTbKeys.some((key) => {
          const [start, end] = key.split("to").map(Number);
          return weight >= start && weight <= end;
        });

        if (isInputInRange) {
          const mergedData = hrTbKeys.reduce((result, key) => {
            const [start, end] = key.split("to").map(Number);
            if (weight >= start && weight <= end) {
              result.push(...drRes[key]);
            }
            return result;
          }, []);

          setResult(mergedData.reverse());
          setGroupedData(null);
          setRegselected(true);
        }
      } else if (weight >= 25 && drRes) {
        const values = props.treatment.data[categoryName[1]][value]["65"];
        const hrTbKeys = Object.keys(drRes);
        const mergedData = hrTbKeys.reduce((result, key) => {
          const [start, end] = key.split("to").map(Number);
          if (weight >= start && weight <= end) {
            result.push(...drRes[key]);
          }
          return result;
        }, []);

        setShowResult(true);
        setResult(weight >= 65 ? values : mergedData);
        setRegselected(true);
        setRegimenName(null);
        setDownloadOptions(false);
      } else if (rowData.subMenu) {
        setShowModal(true);
        setModalData(rowData.subMenu);
      }

      const regimenDSTB = getForm(age, months, weight);
      setRegimenLabel(
        updatedRowData.label === compareLabel["en"].DRTB ||
          updatedRowData.label === compareLabel["en"].MDRTB
          ? regimenItem
          : updatedRowData.label
      );

      setRegimenOptions(
        updatedRowData.label === compareLabel["en"].DRTB
          ? regimenItem
          : updatedRowData.regimen
      );

      setRegArray(regimenDSTB);
      setRegimenName(null);
      setShowResult(false);
      setIsNewSet(false);
      setMedicineLabel([]);
      setGroupedData(null);
      setItemIdx(null);
      setRegimenItem(null);
      setRegselected(updatedRowData.label !== compareLabel["en"].DSTB);
      setSelectedFormsArray([]);
      setMedicineData({});
      setSelectedMedicines({});
      setSelectedForms([]);
      setGroupMedicineData({});
      setDownloadOptions(false);
      setOpenRegimen(false);
    };

    const isSelected =
      rowData.label === regimenLabel ||
      rowData?.subMenu?.map((item) => item.label).includes(regimenLabel);
    return (
      <div>
        <button
          disabled={rowData.label === compareLabel["en"].DRTB ? true : false}
          onClick={() => {
            toggleSelection(index);
            if (index !== 1) {
              // Dropdown handling (hide) logic
            }
          }}
          style={styles.regimenDropdownOptions}
        >
          {rowData.label !== compareLabel["en"].DRTB && (
            <>
              {isSelected ? (
                <IoMdRadioButtonOn
                  size={18}
                  color={isSelected ? "#016ab6" : "#dddd"}
                />
              ) : (
                <IoMdRadioButtonOff
                  size={18}
                  color={isSelected ? "#016ab6" : "#dddd"}
                />
              )}
            </>
          )}
          <p
            style={{
              ...styles.regimenDropdownItemLabel,
              fontSize: rowData.label === compareLabel["en"].DRTB ? 12 : 14,
              fontWeight:
                rowData.label === compareLabel["en"].DRTB ? "600" : "400",
              marginRight: rowData.label === compareLabel["en"].DRTB ? 32 : 0,
            }}
          >
            {rowData.label}
          </p>
        </button>
        {index < dropdownOptions.length - 1 ? (
          <div style={styles.divider}></div>
        ) : null}
      </div>
    );
  };

  const validateInputs = (weight) => {
    if (weight < 3) {
      return alert("No Regimen");
    }
    return true;
  };

  const handleItems = (item, idx) => {
    const { data } = props.treatment;
    const { label, value, isNewSet } = item;
    const weightValue = findDoseVal(weight);
    let result, remarks;
    if (value === "9monthoral") {
      if (weight < 3) {
        setIsValid(false);
        return alert("No Regimen");
      }
      result = data[compareLabel["en"].DRTB][value][weightValue];
      remarks = data[compareLabel["en"].DRTB][value].remarks;
    } else {
      result = data[compareLabel["en"].DRTB][value];
    }
    setRegimenLabel(label);
    setRegimenItem(label);
    setShowModal(false);
    setOpenRegimen(false);
    setResult(
      value === "longerregimen"
        ? false
        : value === "9monthoral"
        ? [result]
        : result
    );
    setIsNewSet(isNewSet);
    setGroup(result);
    setRemarks(value === "9monthoral" ? remarks : result.remarks);
    setIsGrouped(false);
    setMeds(result.group);
    setRegselected(true);
    setDownloadOptions(false);
    setItemIdx(idx);
    setIsValidated(value === "longerregimen" ? validateInputs(weight) : null);
  };

  const renderModal = () => {
    if (!modalData) {
      return null;
    }
    let filteredModalData;

    if (age < 14) {
      filteredModalData = modalData.slice(1);
    } else if (age === 14) {
      filteredModalData = modalData.slice(1);
    } else {
      filteredModalData = modalData;
    }
    return (
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        style={styles.modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={styles.overlay}>
          <div style={styles.modalContainer}>
            <div
              style={{
                ...styles.regimenModalContainer,
                height: filteredModalData.length * 50 + 50,
              }}
            >
              <div style={styles.column}>
                {filteredModalData.map((submenuItem, index) => (
                  <button
                    key={index}
                    onClick={() => handleItems(submenuItem, index)}
                    style={{
                      ...styles.regimenModalItemBtn,
                      borderBottomWidth:
                        index < filteredModalData.length - 1 ? "1px" : 0,
                    }}
                  >
                    {submenuItem.label === regimenLabel ? (
                      <FaRegCheckCircle
                        size={20}
                        color={
                          submenuItem.label === regimenLabel
                            ? "#016ab6"
                            : "#DDDDDD"
                        }
                      />
                    ) : (
                      <FaRegCircle
                        size={20}
                        color={
                          submenuItem.label === regimenLabel
                            ? "#016ab6"
                            : "#DDDDDD"
                        }
                      />
                    )}
                    <p style={styles.regimenModalItemLabel}>
                      {submenuItem.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const onSelectRegimen = (row, index) => {
    const weightValue = findWeightRange(weight);
    let results =
      props.treatment.data[compareLabel["en"].DSTB][row.value][weightValue];
    setRegimenName(row.name);
    setOpenRegimen(true);
    setResult(results);
    setRegIdx(index);
    setIsGrouped(true);
    setShowResult(false);
    setGroupedData(null);
    setRegimenItem("");
    setRegselected(true);
    setDownloadOptions(false);
  };

  const dropdown_renderRegimen = (rowData, index) => {
    return (
      <>
        <button
          style={styles.regimenDropdownContainer}
          onClick={() => {
            onSelectRegimen(rowData, index);
            setOpenRegimenOptions(false);
            setOpenRegimen(false);
          }}
        >
          {regIdx === index ? (
            <IoMdRadioButtonOn
              size={18}
              color={regIdx === index ? "#016ab6" : "#dddd"}
            />
          ) : (
            <IoMdRadioButtonOff
              size={18}
              color={regIdx === index ? "#016ab6" : "#dddd"}
            />
          )}
          <p style={styles.regimenDropdownItem}>{rowData.name}</p>
        </button>
        {index < regArray.length - 1 ? (
          <div style={styles.divider}></div>
        ) : null}
      </>
    );
  };

  const onClickReset = () => {
    setAge("");
    setMonths("");
    setWeight(null);
    setSelectedMedicines({});
    setSelectedForms([]);
    setMedicineLabel([]);
    setGroupMedicineData({});
    setMedicineData({});
    setGroup({});
    setRegimenLabel("");
    setRegimenName("");
    setItemIdx(null);
    setRegimenOptions([]);
    setShowResult(null);
    setIsGrouped(null);
    setGroupedData({});
    setIsNewSet(false);
    setRegIdx(null);
    setReorderedSelectedItems({});
    setIsValidated(false);
    setSelectedFormsArray([]);
    setRegimenItem("");
    setRegselected(false);
    setDownloadOptions(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowDrugsModal(false);
    setShowDrugsDose(false);
  };

  const addItemToGroupMedicineData = (groupName, medicineName, form, group) => {
    const newGroupMedicineData = { ...groupMedicineData };
    const medicineData = meds.find((g) =>
      g.group.some((medicine) => medicine.name === medicineName)
    );
    if (medicineData) {
      if (!newGroupMedicineData[medicineData.name]) {
        newGroupMedicineData[medicineData.name] = [];
      }

      newGroupMedicineData[medicineData.name].push({
        groupName: groupName,
        name: medicineName,
        form: form,
        dosingData: medicineData.group.find(
          (medicine) => medicine.name === medicineName
        ),
      });
      setGroupMedicineData(newGroupMedicineData);

      const medicineNames = [];
      for (const group1 in reorderedSelectedItems) {
        if (reorderedSelectedItems.hasOwnProperty(group1)) {
          const medicines = reorderedSelectedItems[group1];
          medicines.forEach((medicine) => {
            medicineNames.push(medicine.name);
          });
        }
      }

      const medicineArray = [];
      for (const groupKey in newGroupMedicineData) {
        const group2 = newGroupMedicineData[groupKey];
        group2.forEach((medicine) => {
          medicineArray.push(medicine.name);
        });
      }
      setMedicineLabel(medicineArray.join(","));
    }
  };

  const removeItemFromGroupMedicineData = (groupName, medicineName) => {
    const newGroupMedicineData = { ...groupMedicineData };
    if (newGroupMedicineData[groupName]) {
      newGroupMedicineData[groupName] = newGroupMedicineData[groupName].filter(
        (item) => item.name !== medicineName
      );

      if (newGroupMedicineData[groupName].length === 0) {
        delete newGroupMedicineData[groupName];
      }
      setGroupMedicineData(newGroupMedicineData);
      setReorderedSelectedItems(newGroupMedicineData);

      const medicineArray = [];
      for (const groupKey in newGroupMedicineData) {
        const group3 = newGroupMedicineData[groupKey];
        group3.forEach((medicine) => {
          medicineArray.push(medicine.name);
        });
      }
      const filteredData = groupedData?.filter(
        (item) =>
          !(item.group === groupName && item.medicationName === medicineName)
      );
      const news = selectedFormsArray.filter(
        (item) => item.medicationName !== medicineName
      );
      setMedicineLabel(medicineArray.join(", "));
      setGroupedData(filteredData);
      setSelectedFormsArray(news);
      setDownloadOptions(false);
    }
  };

  const onSelectMeds = (groupName, medicineName, form, group1) => {
    const updatedSelectedMedicines = { ...selectedMedicines };
    const isSelected =
      updatedSelectedMedicines[groupName] &&
      updatedSelectedMedicines[groupName].some(
        (medicine) => medicine.name === medicineName
      );
    if (isSelected) {
      updatedSelectedMedicines[groupName] = updatedSelectedMedicines[
        groupName
      ].filter((medicine) => medicine.name !== medicineName);

      removeItemFromGroupMedicineData(groupName, medicineName);
      if (groupedData && groupedData.length > 0 && reorderedSelectedItems) {
        const newGroupedData = groupedData.filter(
          (item) =>
            item.group !== groupName && item.medicineName !== medicineName
        );
        const newReorderedSelectedItems = reorderedSelectedItems[
          groupName
        ].filter(
          (item) =>
            item.group !== groupName && item.medicineName !== medicineName
        );
        setGroupedData(newGroupedData);
        setReorderedSelectedItems(newReorderedSelectedItems);
      }

      const newMedicineData = {};
      for (const key in medicineData) {
        const item = medicineData[key];
        if (
          item &&
          item.group !== groupName &&
          item.medicationName !== medicineName
        ) {
          newMedicineData[key] = medicineData[key];
        }
      }

      const newSelectedForms = {};
      for (const key in selectedForms) {
        const data = key.split("_");
        if (data[0] !== groupName && data[1] !== medicineName) {
          newSelectedForms[key] = selectedForms[key];
        }
      }

      setMedicineData(newMedicineData);
      setSelectedForms(newSelectedForms);
    } else {
      if (!updatedSelectedMedicines[groupName]) {
        updatedSelectedMedicines[groupName] = [];
      }

      updatedSelectedMedicines[groupName].push({
        name: medicineName,
        form: form,
      });
      const latestMedicineLabel = [];
      Object.keys(updatedSelectedMedicines).forEach((item) => {
        updatedSelectedMedicines[item].forEach((itm) => {
          latestMedicineLabel.push(itm.name);
        });
      });
      setMedicineLabel(latestMedicineLabel);
      setSelectedMedicines(updatedSelectedMedicines);
      setDownloadOptions(false);

      addItemToGroupMedicineData(groupName, medicineName, form, group1);
    }

    setSelectedMedicines(updatedSelectedMedicines);

    const newReorderedSelectedItems = {};
    group?.group?.forEach((groupItem) => {
      const originalMedicines = groupItem.group;
      const selectedGroup = updatedSelectedMedicines[groupItem.name];
      if (selectedGroup) {
        const selectedMedicineMap = {};
        selectedGroup.forEach((medicine) => {
          selectedMedicineMap[medicine.name] = medicine;
        });
        const reorderedGroup = originalMedicines
          .filter(
            (originalMedicine) => selectedMedicineMap[originalMedicine.name]
          )
          .map(
            (originalMedicine) => selectedMedicineMap[originalMedicine.name]
          );
        newReorderedSelectedItems[groupItem.name] = reorderedGroup;
      }
    });
    setReorderedSelectedItems(newReorderedSelectedItems);
  };

  const getGroupedData = () => {
    const newgroupedData = groupDataByGroup(groupedData);
    setLongerRegimen(newgroupedData);
  };
  const groupDataByGroup = (data) => {
    const groupedData1 = {};
    Array.isArray(data) &&
      data?.forEach((item) => {
        if (!groupedData1[item.groupName]) {
          groupedData1[item.groupName] = {
            group: item.groupName,
            data: [],
          };
        }
        groupedData1[item.groupName].data.push(item);
      });
    return Object.values(groupedData1);
  };

  const sortFormArray = (originalArray, groupMedicineData) => {
    const sortedValues = [];
    for (const groupObj of originalArray) {
      const groupName = groupObj.name;
      if (groupName) {
        const groupData = groupMedicineData[groupName];
        if (groupData) {
          for (const item of groupObj.group) {
            const itemName = item.name;
            const formData = item.form;
            for (const form of formData) {
              const formName = form.name;
              const matchingData = groupData.find(
                (formItem) =>
                  formItem.medicationName === itemName &&
                  formItem.formName === formName
              );
              if (matchingData) {
                sortedValues.push(matchingData);
              }
            }
          }
        }
      }
    }
    return sortedValues;
  };

  const getDosingValue = (groupName, medicineName, selectedDose) => {
    if (groupMedicineData[groupName]) {
      const medication = groupMedicineData[groupName].find(
        (item) => item.name === medicineName
      );
      if (medication) {
        const dosingData = medication.dosingData;
        if (dosingData && dosingData[selectedDose]) {
          return dosingData[selectedDose];
        }
      }
    }
    return "Dosing information not available for the selected dose";
  };

  const selectDoseValue = (
    groupName,
    medicationName,
    formValue,
    formName,
    formDose
  ) => {
    const itemKey = `${groupName}_${medicationName}_${formValue}`;
    const newselectedForms = { ...selectedForms };
    const selectedItems = [];
    const newselectedFormsArray = [...selectedFormsArray];
    if (newselectedForms[itemKey]) {
      delete newselectedForms[itemKey];
      delete selectedItems[formValue];
      newselectedFormsArray.splice(newselectedFormsArray.indexOf(formValue), 1);
    } else {
      newselectedForms[itemKey] = true;
      selectedItems.push(formValue);
      newselectedFormsArray.push({ formValue, medicationName });
    }

    const doseData = getDosingValue(groupName, medicationName, formValue);
    const doseVal = findDoseVal(weight);
    const newMedicineData = {
      groupName,
      medicationName,
      formName,
      formDose,
      tabs: doseData[doseVal],
    };
    const updatedMedicineData = {
      ...medicineData,
    };

    if (updatedMedicineData[itemKey]) {
      delete updatedMedicineData[itemKey];
    } else {
      updatedMedicineData[itemKey] = newMedicineData;
    }
    const sortedGrp = {};
    Object.keys(updatedMedicineData).forEach((key) => {
      const group = updatedMedicineData[key].groupName;
      if (!sortedGrp[group]) {
        sortedGrp[group] = [];
      }
      sortedGrp[group].push(updatedMedicineData[key]);
    });
    const sortedData = Object.keys(sortedGrp)
      .reduce((result, group) => {
        return result.concat(sortedGrp[group]);
      }, [])
      .sort((a, b) => a.groupName.localeCompare(b.groupName));
    const groupedMedicines = {};

    sortedData.forEach((medicine) => {
      const group = medicine.groupName;
      if (!groupedMedicines[group]) {
        groupedMedicines[group] = [];
      }
      groupedMedicines[group].push(medicine);
    });
    const sortedFormData = sortFormArray(group.group, groupedMedicines);

    setSelectedForms(newselectedForms);
    //selectedItems: [...selectedItems];
    setMedicineData(updatedMedicineData);
    setGroupedData(sortedFormData);
    setIsGrouped(true);
    setSelectedFormsArray(newselectedFormsArray);
    setDownloadOptions(false);
  };

  const renderDrugsDosingModal = () => {
    if (!selectedMedicines) {
      return null;
    }
    const filteredData = {};
    for (const iterator in reorderedSelectedItems) {
      if (reorderedSelectedItems[iterator].length > 0) {
        filteredData[iterator] = reorderedSelectedItems[iterator];
      }
    }
    return (
      <Modal
        open={showDrugsDose}
        onClose={() => setShowDrugsDose(false)}
        style={{
          ...styles.modal,
          height: "90%",
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={styles.modalContainer}>
          <div style={styles.modalContent}>
            {Object.keys(filteredData).map((item, index) => (
              <div
                key={index}
                style={{
                  ...styles.drugDoseModalContainer,
                  borderBottomWidth: item.length - 1 > index ? 0.5 : 0,
                }}
              >
                {filteredData[item].map((medication, index) => {
                  return (
                    <div key={index} style={{ paddingLeft: -10 }}>
                      <p style={styles.dropdown_Medicinerow_text}>
                        {medication.name}
                      </p>
                      <div style={styles.column}>
                        {medication.form.map((form, index) => {
                          const formName =
                            form.name.lastIndexOf(",") === form.name.length - 1
                              ? form.name.slice(0, -1)
                              : form.name;
                          return (
                            <button
                              key={index}
                              style={styles.modalItemBtn}
                              onClick={() =>
                                selectDoseValue(
                                  item,
                                  medication.name,
                                  form.value,
                                  form.name,
                                  form.doseVal,
                                  months
                                )
                              }
                            >
                              <div key={index} style={styles.modalText}>
                                {selectedForms[
                                  `${item}_${medication.name}_${form.value}`
                                ] ? (
                                  <FaRegCheckCircle
                                    size={20}
                                    color={
                                      selectedForms[
                                        `${item}_${medication.name}_${form.value}`
                                      ]
                                        ? "#016ab6"
                                        : "#DDDDDD"
                                    }
                                  />
                                ) : (
                                  <FaRegCircle
                                    size={20}
                                    color={
                                      selectedForms[
                                        `${item}_${medication.name}_${form.value}`
                                      ]
                                        ? "#016ab6"
                                        : "#DDDDDD"
                                    }
                                  />
                                )}
                                <p style={styles.drugsDoseModalItemLabel}>
                                  {formName}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            <button
              onClick={() => closeModal()}
              style={{
                ...styles.closeButton,
                width: "100%",
                marginBottom: -1,
                height: 45,
              }}
            >
              <p style={styles.closeButtonText}>close</p>
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  const renderDrugsModal = () => {
    if (!group) {
      return null;
    }
    return (
      <Modal
        open={showDrugsModal}
        onClose={() => setShowDrugsModal(false)}
        style={{
          ...styles.modal,
          height: "90%",
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={styles.modalContainer}>
          <div
            style={{
              ...styles.modalContent,
              height: "80%",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            {group?.group?.map((rowData, index) => (
              <div
                key={index}
                style={{
                  ...styles.drugsModalContainer,
                  borderBottomWidth: group.group.length - 1 > index ? 0.5 : 0,
                }}
              >
                <p style={styles.dropdown_Medicinerow_text}>{rowData.name}</p>
                <div style={styles.column}>
                  {rowData.group.map((group, index) => {
                    return (
                      <button
                        key={index}
                        style={styles.modalItemBtn}
                        onClick={() =>
                          onSelectMeds(
                            rowData.name,
                            group.name,
                            group.form,
                            group
                          )
                        }
                      >
                        <div key={index} style={styles.modalText}>
                          {selectedMedicines[rowData.name] &&
                          selectedMedicines[rowData.name].some(
                            (medicine) => medicine.name === group.name
                          ) ? (
                            <FaRegCheckCircle size={20} color="#016ab6" />
                          ) : (
                            <FaRegCircle size={20} color="#DDDDDD" />
                          )}
                          <p style={styles.drugsModalItemLabel}>{group.name}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div style={{ width: "100%" }}>
              <button
                activeOpacity={0.9}
                onClick={() => closeModal()}
                style={styles.closeButton}
              >
                <p style={styles.closeButtonText}>close</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const ageHandler = (age) => {
    const numreg = /^[0-9]+$/;
    if (numreg.test(age)) {
      setAge(age);
      setMonths("");
      setWeight("");
      setSelectedMedicines({});
      setSelectedForms([]);
      setMedicineLabel([]);
      setGroupMedicineData({});
      setMedicineData({});
      setGroup({});
      setRegimenLabel("");
      setRegimenName("");
      setItemIdx(null); // Assuming you have a corresponding state for itemIdx
      setRegimenOptions([]);
      setShowResult(false);
      setIsGrouped(null);
      setGroupedData({});
      setIsNewSet(false);
      setRegIdx(null);
      setReorderedSelectedItems({});
      setIsValidated(false);
      setSelectedFormsArray([]);
      setRegimenItem(""); // Assuming you have a corresponding state for regimenItem
      setRegselected(false); // Assuming you have a corresponding state for regselected
      setDownloadOptions(false);
    } else {
      setAge("");
    }
  };

  const monthsHandler = (months) => {
    const numreg = /^[0-9]+$/;
    if (!numreg.test(months) || +months === 0 || +months > 11) {
      setMonths("");
    } else {
      setMonths(months);
      setWeight("");
      setSelectedMedicines({});
      setSelectedForms([]);
      setMedicineLabel([]);
      setGroupMedicineData({});
      setMedicineData({});
      setGroup({});
      setRegimenLabel("");
      setRegimenName("");
      setRegimenItem(""); // Assuming you have a corresponding state for regimenItem
      setItemIdx(null); // Assuming you have a corresponding state for itemIdx
      setRegimenOptions([]);
      setShowResult(false);
      setIsGrouped(null);
      setGroupedData({});
      setIsNewSet(false);
      setRegIdx(null);
      setReorderedSelectedItems({});
      setIsValidated(false);
      setSelectedFormsArray([]);
      setRegselected(false); // Assuming you have a corresponding state for regselected
      setDownloadOptions(false);
    }
  };

  const weightHandler = (weight) => {
    const numreg = /^[0-9]+$/;
    if (numreg.test(weight)) {
      setWeight(weight);
      setRegselected(false); // Assuming you have a corresponding state for regselected
      setSelectedMedicines({});
      setSelectedForms([]);
      setMedicineLabel([]);
      setGroupMedicineData({});
      setMedicineData({});
      setGroup({});
      setRegimenLabel("");
      setRegimenName("");
      setItemIdx(null); // Assuming you have a corresponding state for itemIdx
      setRegimenOptions([]);
      setShowResult(false);
      setIsGrouped(null);
      setGroupedData({});
      setIsNewSet(false);
      setRegIdx(null);
      setReorderedSelectedItems({});
      setIsValidated(false);
      setSelectedFormsArray([]);
      setRegimenItem(""); // Assuming you have a corresponding state for regimenItem
      setDownloadOptions(false);
    } else {
      setWeight("");
    }
  };

  const dropdownOptions = Object.keys(props.treatment.data)
    .map((category) => {
      const categoryData = props.treatment.data[category];
      const option = [
        {
          label: category,
          section: true,
          selected: categoryData.selected,
          regimen: [categoryData.options],
        },
        ...categoryData.subOptions,
      ];
      return option;
    })
    .flat();

  const getFinalTitle = (
    regimenLabel,
    regimenName,
    age,
    weight,
    months,
    language
  ) => {
    const template = titleTemplates[language]?.[regimenLabel];
    if (template) {
      return template(age, weight, months, regimenName);
    } else {
      return `Title not available for ${language} or ${regimenLabel}`;
    }
  };

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = remarks?.split(urlRegex);

  const renderMedication = () => {
    const newGroupedData = groupDataByGroup(groupedData);
    const renderedHeaders = new Set();
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = remarks.split(urlRegex);
    //const { languageCode } = this.props;

    return (
      <>
        {newGroupedData.map((item) => {
          const uniqueMedicationNames = [
            ...new Set(item.data?.map((item) => item.medicationName)),
          ];
          if (!renderedHeaders.has(item.group)) {
            renderedHeaders.add(item.group);
            return (
              <React.Fragment key={item.group}>
                <div style={styles.medicationContainer}>
                  <p
                    style={{
                      ...styles.headerText,
                      margin: 0,
                      color: "#fff",
                    }}
                  >
                    {item.group}
                  </p>
                </div>
                <div style={styles.row}>
                  <div style={styles.headerCell}>
                    <p style={styles.headerText}>
                      {/* {LANGUAGES[languageCode].drug} */}Drug
                    </p>
                  </div>
                  <div style={styles.headerCell}>
                    <p style={styles.headerText}>
                      {/* {LANGUAGES[languageCode].formulation} */} Formulation
                    </p>
                  </div>
                  <div
                    style={{
                      ...styles.headerCell,
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <p style={styles.headerText}>Quantity</p>
                    <p style={{ ...styles.headerText, fontSize: 12 }}>
                      (tabs, cap, mL)
                    </p>
                  </div>
                </div>
                {uniqueMedicationNames.map((medication) => (
                  <div key={medication}>
                    {item.data
                      .filter((item) => item.medicationName === medication)
                      .map((filteredItem, index) => (
                        <div style={styles.row} key={filteredItem.formName}>
                          <div
                            style={{
                              ...styles.headerCell,
                              backgroundColor: "#fff",
                              border: "2px solid #F5F5F5",
                              margin: "2px 2px 0.5px 0px",
                            }}
                          >
                            <p style={styles.headerText}>
                              {index === 0
                                ? filteredItem.medicationName ===
                                    translations["en"][
                                      "Ethionamide or prothionamide"
                                    ] &&
                                  filteredItem.formName ===
                                    translations["en"]["125 mg dt (Eto)"]
                                  ? translations["en"].Ethionamide
                                  : filteredItem.medicationName
                                : index !== 0 &&
                                  filteredItem.medicationName ===
                                    translations["en"][
                                      "Ethionamide or prothionamide"
                                    ]
                                ? filteredItem.medicationName
                                : ""}
                            </p>
                          </div>
                          <div
                            style={{
                              ...styles.headerCell,
                              backgroundColor: "#fff",
                              border: "2px solid #F5F5F5",
                              margin: "2px 2px 0.5px 0px",
                            }}
                          >
                            <p style={styles.headerText}>
                              {filteredItem.formName.concat(
                                filteredItem.formDose
                              )}
                            </p>
                          </div>
                          <div
                            style={{
                              ...styles.headerCell,
                              backgroundColor: "#fff",
                              border: "2px solid #F5F5F5",
                              margin: "2px 2px 0.5px 0px",
                            }}
                          >
                            <p style={styles.headerText}>
                              {filteredItem.tabs.split("/n").map((line, i) => (
                                <span key={i}>{line.trim()}</span>
                              ))}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </React.Fragment>
            );
          }

          return (
            <div key={item.group}>
              {uniqueMedicationNames.map((medication) => (
                <div key={medication}>
                  {item.data
                    .filter((item) => item.medicationName === medication)
                    .map((filteredItem, index) => (
                      <div style={styles.row} key={filteredItem.formName}>
                        <div
                          style={{
                            ...styles.headerCell,
                            backgroundColor: "#fff",
                            border: "2px solid #F5F5F5",
                            margin: "2px 2px 0.5px 0px",
                          }}
                        >
                          <p style={styles.headerText}>
                            {index === 0
                              ? filteredItem.medicationName ===
                                  translations["en"][
                                    "Ethionamide or prothionamide"
                                  ] &&
                                filteredItem.formName ===
                                  translations["en"]["125 mg dt (Eto)"]
                                ? translations["en"].Ethionamide
                                : filteredItem.medicationName
                              : index !== 0 &&
                                filteredItem.medicationName ===
                                  translations["en"][
                                    "Ethionamide or prothionamide"
                                  ]
                              ? filteredItem.medicationName
                              : ""}
                          </p>
                        </div>
                        <div
                          style={{
                            ...styles.headerCell,
                            backgroundColor: "#fff",
                            border: "2px solid #F5F5F5",
                            margin: "2px 2px 0.5px 0px",
                          }}
                        >
                          <p style={styles.headerText}>
                            {filteredItem.formName.concat(
                              filteredItem.formDose
                            )}
                          </p>
                        </div>
                        <div
                          style={{
                            ...styles.headerCell,
                            backgroundColor: "#fff",
                            border: "2px solid #F5F5F5",
                            margin: "2px 2px 0.5px 0px",
                          }}
                        >
                          <p style={styles.headerText}>
                            {filteredItem.tabs.split("/n").map((line, i) => (
                              <span key={i}>{line.trim()}</span>
                            ))}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          );
        })}
        {(regimenLabel || regimenItem) === compareLabel["en"].LRG ? (
          <div>
            <div style={styles.medicationLRGContainer}>
              <h3
                style={{
                  ...styles.headerTitle,
                  margin: "20px 0px 0px 0px",
                  color: "#0071c2",
                }}
              >
                Remarks
              </h3>
            </div>
            <p style={{ margin: 0, textAlign: "left" }}>
              {parts.map((remarks, index) => {
                if (remarks.match(urlRegex)) {
                  return (
                    <a key={index} href={remarks} style={styles.remarksLink}>
                      {remarks}
                    </a>
                  );
                }
                return (
                  <p key={index} style={styles.LRGRemarksContent}>
                    {remarks}
                  </p>
                );
              })}
            </p>
          </div>
        ) : null}
      </>
    );
  };

  const header = getFinalTitle(
    regimenLabel,
    regimenName,
    age,
    weight,
    months,
    "en"
  );

  const downloadFile = async (content) => {
    const date = new Date();
    const formattedDate = date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");

    const randomNum = Math.floor(Math.random() * 100);
    const fileName = "Dosage_" + formattedDate + "_" + randomNum + ".pdf";
    const blob = await pdf(<PdfComponent data={content} />).toBlob();
    saveAs(blob, fileName);
  };
  const { defaultTool } = props;
  return (
    <div style={styles.row}>
      <section div style={styles.container}>
        <div style={{ padding: "20px" }}>
          <h3 style={styles.headerTitle}>TB Treatment</h3>
          <div style={styles.ageContainer} className="fade-in">
            <div
              style={{
                flex: 1,
                width: "100%",
                marginRight: age === "0" ? 20 : null,
              }}
            >
              <label style={styles.label}>Age</label>
              <div style={styles.dropdown}>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => ageHandler(e.target.value)}
                  style={styles.textInput}
                  placeholder={"Enter the age"}
                  maxLength={2}
                />
                <p
                  className="slide-in-2"
                  style={{ margin: "10px", color: "#abb4c4" }}
                >
                  by Years
                </p>
              </div>
            </div>
            {age === "0" ? (
              <div style={{ flex: 2, width: "100%" }} className="fade-in">
                <label style={styles.label}>Months</label>
                <div style={styles.dropdown}>
                  <input
                    type="text"
                    value={months}
                    onChange={(e) => monthsHandler(e.target.value)}
                    style={{ ...styles.textInput, margin: "10px" }}
                    maxLength={2}
                    placeholder="Enter the months"
                  />
                </div>
              </div>
            ) : null}
          </div>
          {age > 0 || months ? (
            <div style={{ marginTop: 20, width: "100%" }} className="fade-in">
              <label style={styles.label}>Weight</label>
              <div style={styles.dropdown}>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => weightHandler(e.target.value)}
                  style={{ ...styles.textInput, margin: "10px" }}
                  placeholder={"Enter weight in kg"}
                  maxLength={3}
                />
                {weight > 0 && (
                  <p className="slide-in" style={styles.kgText}>
                    by kg
                  </p>
                )}
              </div>
            </div>
          ) : null}
          {weight ? (
            <div
              style={{ marginTop: 20, width: "100%", position: "relative" }}
              className="fade-in"
            >
              <label style={styles.label}>Regimen</label>
              <button
                style={styles.fieldButton}
                onClick={() => {
                  setOpenRegimen(!openRegimen);
                  setRegimenOptions(false);
                }}
              >
                <div style={styles.fieldSubContainer}>
                  <p style={styles.fieldLabel}>
                    {regimenLabel ? regimenLabel : "Select Regimen..."}
                  </p>
                </div>
                <div>
                  <FaChevronDown className="slide-in" size={14} color="#000" />
                </div>
              </button>
              {openRegimen && (
                <section style={styles.dropdownSection}>
                  {dropdownOptions.map((item, index) =>
                    dropDownRow(item, index)
                  )}
                </section>
              )}
            </div>
          ) : null}
          {Array.isArray(regimenOptions) && regimenOptions.length > 0 ? (
            <div
              style={{
                width: "100%",
                marginTop: 20,
                position: "relative",
              }}
              className={openRegimen ? null : "fade-in"}
            >
              <label style={styles.label}>Regimen</label>
              <button
                style={styles.fieldButton}
                onClick={() => setOpenRegimenOptions(!openRegimenOptions)}
              >
                <div style={styles.fieldSubContainer}>
                  <p style={styles.fieldLabel}>
                    {regimenName ? regimenName : "Please Select"}
                  </p>
                </div>
                <div>
                  <FaChevronDown className="slide-in" size={14} color="#000" />
                </div>
              </button>
              {openRegimenOptions && (
                <section style={styles.dropdownSection}>
                  {regArray.map((item, index) =>
                    dropdown_renderRegimen(item, index)
                  )}
                </section>
              )}
            </div>
          ) : null}
          {isNewSet && isValidated ? (
            <div
              style={{
                width: "100%",
                marginTop: 20,
              }}
              className={openRegimen ? null : "fade-in"}
            >
              <label style={styles.label}>Select Drug</label>
              <button
                style={styles.fieldButton}
                onClick={() => setShowDrugsModal(true)}
              >
                <p
                  style={{
                    fontSize: 16,
                    color: medicineLabel.length > 0 ? "#696969" : "#B8B8B8",
                    margin: "12px",
                  }}
                >
                  {medicineLabel.length === 0
                    ? "Select Drug"
                    : medicineLabel.length > 40
                    ? `${medicineLabel.slice(0, 39)}...`
                    : medicineLabel}
                </p>
                {/* </div>
                </div> */}
              </button>
            </div>
          ) : null}
          {medicineLabel.length > 0 ? (
            <div
              style={{
                width: "100%",
                marginTop: 20,
              }}
              className={openRegimen ? null : "fade-in"}
            >
              <label style={styles.label}>Formulation</label>
              <button
                style={styles.fieldButton}
                onClick={() => setShowDrugsDose(true)}
              >
                <div style={styles.drugDoseContainer}>
                  <p
                    style={{
                      fontSize: 16,
                      margin: "12px",
                      color:
                        selectedFormsArray.length > 0 ? "#696969" : "#B8B8B8",
                    }}
                  >
                    {selectedFormsArray.length > 0
                      ? selectedFormsArray.length === 1
                        ? `1 formulation selected`
                        : `${selectedFormsArray.length} formulations selected`
                      : "Select Formulation"}
                  </p>
                </div>
              </button>
            </div>
          ) : null}
          {renderModal()}
          {renderDrugsModal()}
          {renderDrugsDosingModal()}
        </div>
        <div>
          <div style={styles.divider}></div>
          <div style={{ ...styles.row, padding: "20px" }}>
            <button
              style={{
                ...styles.resetResultButton,
                marginRight: "5px",
                backgroundColor:
                  ((regimenLabel || regimenItem || regimenName) &&
                    (result === undefined || result) &&
                    (regselected || itemIdx)) ||
                  ((regimenLabel || regimenItem) &&
                    isGrouped &&
                    medicineLabel.length > 0 &&
                    selectedFormsArray.length > 0) ||
                  isValid
                    ? "#d9dce1"
                    : "#e7eaed",
              }}
              onClick={() => onClickReset()}
            >
              Reset
            </button>
            <button
              disabled={
                ((regimenLabel || regimenItem || regimenName) &&
                  (result === undefined || result) &&
                  (regselected || itemIdx)) ||
                ((regimenLabel || regimenItem) &&
                  isGrouped &&
                  medicineLabel.length > 0 &&
                  selectedFormsArray.length > 0) ||
                isValid
                  ? false
                  : true
              }
              style={{
                ...styles.resetResultButton,
                marginLeft: "5px",
                color:
                  ((regimenLabel || regimenItem || regimenName) &&
                    (result === undefined || result) &&
                    (regselected || itemIdx)) ||
                  ((regimenLabel || regimenItem) &&
                    isGrouped &&
                    medicineLabel.length > 0 &&
                    selectedFormsArray.length > 0) ||
                  isValid
                    ? "#0661c5"
                    : "#000",
                backgroundColor:
                  ((regimenLabel || regimenItem || regimenName) &&
                    (result === undefined || result) &&
                    (regselected || itemIdx)) ||
                  ((regimenLabel || regimenItem) &&
                    isGrouped &&
                    medicineLabel.length > 0 &&
                    selectedFormsArray.length > 0) ||
                  isValid
                    ? "#c4dcf6"
                    : "#e7eaed",
              }}
              onClick={() => {
                getGroupedData();
                setShowResult(true);
                setDownloadOptions(result === undefined ? false : true);
              }}
            >
              Result
            </button>
          </div>
        </div>
      </section>
      <section style={{ marginLeft: "30px", width: "40%", marginTop: "40px" }}>
        <div style={styles.resultHeaderContainer}>
          <h3 style={{ ...styles.headerTitle, margin: 0 }}>Result</h3>
          {downloadOptions ? (
            <button
              style={styles.downloadButton}
              onClick={() => {
                downloadFile({
                  result,
                  age,
                  months,
                  weight,
                  header,
                  longerRegimen,
                  regimenItem,
                  regimenLabel,
                  defaultTool,
                  remarks,
                });
              }}
            >
              <IoMdDownload size={20} />
              <p style={{ color: "#fff", margin: 0 }}> Download</p>
            </button>
          ) : null}
        </div>
        {(showResult && result) ||
        (showResult && typeof groupedData === "object") ? (
          <div style={styles.resultContainer} className="slide-down">
            <div style={styles.resultTitleContainer}>
              <p style={styles.resultTitle}>
                {getFinalTitle(
                  regimenLabel,
                  regimenName,
                  age,
                  weight,
                  months,
                  "en"
                )}
              </p>
            </div>
            {showResult && regimenItem === compareLabel["en"].LRG ? (
              <>{renderMedication()}</>
            ) : null}
            {result && showResult ? (
              <>
                {!isNewSet ? (
                  <div style={styles.row}>
                    <div style={styles.headerCell}>
                      <p style={styles.headerText}>Drug</p>
                    </div>
                    <div style={styles.headerCell}>
                      <p style={styles.headerText}>Formulation</p>
                    </div>
                    <div
                      style={{
                        ...styles.headerCell,
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <p style={styles.headerText}>Quantity</p>
                      <p
                        style={{
                          ...styles.headerText,
                          margin: 0,
                          fontSize: 12,
                        }}
                      >
                        (tabs, cap, mL)
                      </p>
                    </div>
                  </div>
                ) : null}
                {result &&
                  result.map((item, index) => {
                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                    const parts = item?.note?.split(urlRegex);
                    return (
                      <div>
                        {item?.category ? (
                          <div style={styles.categoryContainer}>
                            <p style={styles.catergoryName}>{item?.category}</p>
                          </div>
                        ) : null}
                        {item?.items?.map((item, index) => {
                          if (item?.isFormulated) {
                            return (
                              <div key={index}>
                                {item?.formulation?.length > 0 &&
                                  item?.formulation?.map(
                                    (medication, medIndex) => (
                                      <div style={styles.row} key={medIndex}>
                                        <div
                                          style={{
                                            ...styles.headerCell,
                                            backgroundColor: "#fff",
                                            border: "2px solid #F5F5F5",
                                            margin: "2px 2px 0.5px 0px",
                                          }}
                                        >
                                          {medIndex === 0 ? (
                                            <p style={styles.headerText}>
                                              {item?.drug}
                                            </p>
                                          ) : (
                                            <p style={styles.headerText} />
                                          )}
                                        </div>
                                        <div
                                          style={{
                                            ...styles.headerCell,
                                            backgroundColor: "#fff",
                                            border: "2px solid #F5F5F5",
                                            margin: "2px 2px 0.5px 0px",
                                          }}
                                        >
                                          <p style={styles.headerText}>
                                            {medication.dose}
                                          </p>
                                        </div>
                                        <div
                                          style={{
                                            ...styles.headerCell,
                                            backgroundColor: "#fff",
                                            border: "2px solid #F5F5F5",
                                            margin: "2px 2px 0.5px 0px",
                                          }}
                                        >
                                          <p style={styles.headerText}>
                                            {medication.tabs}
                                          </p>
                                        </div>
                                      </div>
                                    )
                                  )}
                              </div>
                            );
                          } else {
                            return (
                              <div style={styles.row} key={index}>
                                <div
                                  style={{
                                    ...styles.headerCell,
                                    backgroundColor: "#fff",
                                    border: "2px solid #F5F5F5",
                                    margin: "2px 2px 0.5px 0px",
                                  }}
                                >
                                  <p style={styles.headerText}>{item.dose}</p>
                                </div>
                                <div
                                  style={{
                                    ...styles.headerCell,
                                    backgroundColor: "#fff",
                                    border: "2px solid #F5F5F5",
                                    margin: "2px 2px 0.5px 0px",
                                  }}
                                >
                                  {item.formulation && (
                                    <p style={styles.headerText}>
                                      {item.formulation}
                                    </p>
                                  )}
                                </div>
                                <div
                                  style={{
                                    ...styles.headerCell,
                                    backgroundColor: "#fff",
                                    border: "2px solid #F5F5F5",
                                    margin: "2px 2px 0.5px 0px",
                                  }}
                                >
                                  {item.tabs && (
                                    <p style={styles.headerText}>{item.tabs}</p>
                                  )}
                                </div>
                              </div>
                            );
                          }
                        })}
                        {item.remarks && item.remarks.length > 0 ? (
                          <div style={{ padding: 10 }}>
                            <div style={styles.remarksHeaderContainer}>
                              <h3
                                style={{
                                  ...styles.headerTitle,
                                  margin: "20px 0px 0px 0px",
                                  color: "#0071c2",
                                }}
                              >
                                Remarks
                              </h3>
                            </div>
                            {item.remarks.map((rmkItm, index) => {
                              if (rmkItm.match(urlRegex)) {
                                const parts = rmkItm.split(urlRegex);
                                return (
                                  <p style={{ margin: 0, textAlign: "left" }}>
                                    {parts.map((part, index) => {
                                      if (part.match(urlRegex)) {
                                        return (
                                          <a
                                            key={index}
                                            href={remarks}
                                            style={styles.remarksLink}
                                          >
                                            {part}
                                          </a>
                                        );
                                      } else {
                                        return (
                                          <p
                                            style={styles.remarksContent}
                                            key={part}
                                          >
                                            {part}
                                          </p>
                                        );
                                      }
                                    })}
                                  </p>
                                );
                              }
                              return (
                                <>
                                  <p
                                    style={{
                                      color: "#000",
                                      fontSize: 16,
                                    }}
                                    key={rmkItm}
                                  >
                                    {rmkItm}
                                  </p>
                                  {index < item.remarks.length - 1 && <p> </p>}
                                </>
                              );
                            })}
                          </div>
                        ) : null}
                        {item?.note ? (
                          <div>
                            <div style={styles.remarksHeaderContainer}>
                              <h3
                                style={{
                                  ...styles.headerTitle,
                                  margin: "20px 0px 0px 0px",
                                  color: "#0071c2",
                                }}
                              >
                                Remarks
                              </h3>
                            </div>
                            <p style={{ margin: 0, textAlign: "left" }}>
                              {parts.map((remarks, index) => {
                                if (remarks.match(urlRegex)) {
                                  return (
                                    <a
                                      key={index}
                                      href={remarks}
                                      style={styles.remarksLink}
                                    >
                                      {remarks}
                                    </a>
                                  );
                                }
                                return (
                                  <p key={index} style={styles.remarksContent}>
                                    {remarks}
                                  </p>
                                );
                              })}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                ;
                {regimenItem === compareLabel["en"].nmonthoral && remarks ? (
                  <div style={{ padding: 10 }}>
                    <div style={styles.remarksHeaderContainer}>
                      <h3
                        style={{
                          ...styles.headerTitle,
                          margin: "20px 0px 0px 0px",
                          color: "#0071c2",
                        }}
                      >
                        Remarks
                      </h3>
                    </div>
                    <p style={{ margin: 0, textAlign: "left" }}>
                      {parts.map((remarks, index) => {
                        if (remarks.match(urlRegex)) {
                          return (
                            <a
                              key={index}
                              href={remarks}
                              style={styles.remarksLink}
                            >
                              {remarks}
                            </a>
                          );
                        }
                        return (
                          <p key={index} style={styles.remarksContent}>
                            {remarks}
                          </p>
                        );
                      })}
                    </p>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        ) : (
          <div style={{ marginTop: 150 }}>
            <p style={styles.emptyResultLabel}>
              Fill the fields to see the result
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
