import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import iconInfo from "../../assets/icon-info-base64";

Font.register({
  family: "Calibri",
  src: require("../../assets/pdfFonts/calibri.ttf"),
});

Font.register({
  family: "Calibri",
  src: require("../../assets/pdfFonts/calibrib.ttf"),
  fontWeight: "bold",
});

const styles = StyleSheet.create({
  page: {
    margin: 20,
    padding: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  defaultToolHeader: { backgroundColor: "#fff", margin: 20 },
  header: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Calibri",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  th: {
    border: "1px solid #ccc",
    padding: 10,
    width: "100%",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 14,
  },
  doseResult: {
    marginTop: 30,
    marginRight: 40,
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
    justifyContent: "flex-start",
    borderTopWidth: 0,
    paddingInline: 5,
  },
  drugImg: {
    width: 30,
    height: 30,
    marginRight: 5,
    marginLeft: 5,
    alignSelf: "center",
  },
  doseResultContent: {
    fontSize: 18,
    color: "#203c71",
    display: "flex",
    alignItems: "flex-start",
    paddingVertical: 40,
    fontWeight: "700",
    marginLeft: 20,
  },
  longRegimenContainer: {
    display: "flex",
    alignSelf: "center",
    borderStyle: "solid",
    borderColor: "#016ab6",
    marginRight: 30,
    borderWidth: 1,
  },
  longRegimenHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#c1e1f7",
  },
  longRegimenHeaderText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Calibri",
  },
  longRegimenSubHeader: {
    backgroundColor: "#daeaf5",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  longRegimenSubHeaderText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Calibri",
  },
  longRegimenTableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#016ab6",
    justifyContent: "space-between",
  },
  longRegimenTableHeaderCellLeft: {
    flexBasis: "40%",
    color: "#fff",
    paddingVertical: 5,
    paddingLeft: 20,
    alignItems: "center",
    display: "flex",
  },
  longRegimenTableHeaderCellRight: {
    flexBasis: "60%",
    color: "#fff",
    paddingVertical: 5,
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: "#fff",
    display: "flex",
    alignItems: "center",
  },
  longRegimenTableHeaderText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Calibri",
  },
  longRegimenTableRow: {
    backgroundColor: "#daeaf5",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  longRegimenTableRowCellLeft: {
    flexBasis: "40%",
    paddingVertical: 5,
    paddingLeft: 20,
    alignItems: "center",
    display: "flex",
  },
  longRegimenTableRowCellRight: {
    flexBasis: "60%",
    paddingVertical: 5,
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: "#fff",
    display: "flex",
    alignItems: "center",
  },
  longRegimenTableRowText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Calibri",
  },
  nonLRGContainer: {
    display: "flex",
    alignSelf: "center",
    borderStyle: "solid",
    width: "100%",
    borderColor: "#016ab6",
    marginRight: 30,
    borderWidth: 1,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderCollapse: "collapse",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#daeaf5",
  },
  headerCell: {
    paddingVertical: 10,
    display: "flex",
    justifyContent: "center",
  },
  headerCellWithBorder: {
    display: "flex",
    justifyContent: "center",
    paddingVertical: 10,
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: "#fff",
  },
  headerText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Calibri",
  },
  categoryContainer: {
    backgroundColor: "#006ab6",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Calibri",
  },
  remarksContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
  remarksHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  remarksIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  remarksHeaderText: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Calibri",
  },
  remarksText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "200",
    marginTop: 10,
    textAlign: "left",
    marginHorizontal: 30,
    fontFamily: "Calibri",
  },
});

const PdfComponent = (data) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {data?.data?.defaultTool.default_tool === "tpt_finder" ? (
            <View>
              <View style={styles.defaultToolHeader}>
                <Text style={styles.header}>TB Prevention</Text>
              </View>
              <View style={styles.doseResult}>
                <Text style={styles.doseResultHeader}>
                  Dose by age and weight band
                </Text>
                <View style={styles.doseResultContainer}>
                  <Image
                    src={require("../../assets/drug.png")}
                    style={styles.drugImg}
                    alt="drug"
                  />
                  <Text style={styles.doseResultContent}>
                    {data?.data?.result}{" "}
                  </Text>
                </View>
              </View>
              <View style={styles.doseResult}>
                <Text style={styles.doseResultHeader}>Regimen</Text>
                <Text style={styles.doseResultContent}>
                  {data?.data?.regimen}{" "}
                </Text>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.defaultToolHeader}>
                <Text style={styles.header}>{data?.data?.header}</Text>
              </View>

              {data?.data?.longerRegimen.length > 0 ? (
                <View style={styles.longRegimenContainer}>
                  {Object.values(data?.data?.longerRegimen).map(
                    (item, index) => (
                      <View key={index}>
                        <View style={styles.longRegimenHeader}>
                          <Text style={styles.longRegimenHeaderText}>
                            {item.group}
                          </Text>
                        </View>
                        {Object.values(item.data).map((itm, itmIndex) => (
                          <View key={itmIndex}>
                            <View style={styles.longRegimenSubHeader}>
                              <Text style={styles.longRegimenSubHeaderText}>
                                DRUG : {itm.medicationName}
                              </Text>
                            </View>
                            <View style={styles.longRegimenTableHeader}>
                              <View
                                style={styles.longRegimenTableHeaderCellLeft}
                              >
                                <Text style={styles.longRegimenTableHeaderText}>
                                  FORMULATION
                                </Text>
                              </View>
                              <View
                                style={styles.longRegimenTableHeaderCellRight}
                              >
                                <Text style={styles.longRegimenTableHeaderText}>
                                  DAILY DOSE
                                </Text>
                              </View>
                            </View>
                            <View style={styles.longRegimenTableRow}>
                              <View style={styles.longRegimenTableRowCellLeft}>
                                <Text style={styles.longRegimenTableRowText}>
                                  {itm.formName}
                                  {itm.formDose}
                                </Text>
                              </View>
                              <View style={styles.longRegimenTableRowCellRight}>
                                <Text style={styles.longRegimenTableRowText}>
                                  {itm.tabs}
                                </Text>
                              </View>
                            </View>
                          </View>
                        ))}
                      </View>
                    )
                  )}
                </View>
              ) : (
                <View style={styles.nonLRGContainer}>
                  <View style={styles.headerContainer}>
                    <View style={styles.headerCell}>
                      <Text style={styles.headerText}>Dose</Text>
                    </View>
                    <View style={styles.headerCellWithBorder}>
                      <Text style={styles.headerText}>Formulation</Text>
                    </View>
                    <View style={styles.headerCellWithBorder}>
                      <Text style={styles.headerText}>
                        Quantity
                        {"\n"}
                        (tabs, caps, mL)
                      </Text>
                    </View>
                  </View>
                  {Object.values(data?.data?.result).map((item, itemIndex) => (
                    <View key={itemIndex}>
                      {item.category && (
                        <View style={styles.categoryContainer}>
                          <Text style={styles.categoryText}>
                            {item.category}
                          </Text>
                        </View>
                      )}
                      {data?.data?.regimenLabel ===
                        "Rifampicin-susceptible, Isoniazid-resistant TB (Hr-TB)" ||
                      data?.data?.regimenLabel === "9-month all-oral" ? (
                        <>
                          {Object.values(item.items).map((item, itemIdx) => (
                            <View key={itemIdx}>
                              <View style={styles.table}>
                                {item.formulation.map(
                                  (formulation, formluationIdx) => (
                                    <View
                                      key={formluationIdx}
                                      style={styles.row}
                                    >
                                      <Text
                                        style={[
                                          styles.th,
                                          {
                                            border:
                                              formulation.drug === " "
                                                ? "none"
                                                : "1px solid #ccc",
                                          },
                                        ]}
                                      >
                                        {formluationIdx === 0 && item.drug
                                          ? item.drug
                                          : ""}
                                      </Text>
                                      <Text style={styles.th}>
                                        {formulation.dose}
                                      </Text>
                                      <Text style={styles.th}>
                                        <Text>{formulation.tabs}</Text>
                                      </Text>
                                    </View>
                                  )
                                )}
                              </View>
                            </View>
                          ))}
                        </>
                      ) : (
                        <>
                          {Object.values(item.items).map((itm, itmIndex) => (
                            <View key={itmIndex}>
                              <View style={styles.table}>
                                <View style={styles.container}>
                                  <Text
                                    style={[
                                      styles.th,
                                      {
                                        border:
                                          itm.dose === " "
                                            ? "none"
                                            : "1px solid #ccc",
                                      },
                                    ]}
                                  >
                                    {itm.dose || ""}
                                  </Text>
                                  {!Array.isArray(itm.formulation)
                                    ? itm.formulation && (
                                        <Text style={styles.th}>
                                          <Text>{itm.formulation}</Text>
                                        </Text>
                                      )
                                    : itm.formulation.map(
                                        (forVal, forIndex) => (
                                          <View
                                            key={forIndex}
                                            style={styles.container}
                                          >
                                            <Text style={styles.th}>
                                              {forIndex === 0 && itm.drug
                                                ? itm.drug
                                                : ""}
                                            </Text>
                                            {forVal.dose && (
                                              <Text style={styles.th}>
                                                {forVal.dose}
                                              </Text>
                                            )}
                                            {forVal.tabs && (
                                              <Text style={styles.th}>
                                                <Text>{forVal.tabs}</Text>
                                              </Text>
                                            )}
                                          </View>
                                        )
                                      )}
                                  {itm.tabs && (
                                    <Text style={styles.th}>
                                      <Text>{itm.tabs}</Text>
                                    </Text>
                                  )}
                                </View>
                              </View>
                            </View>
                          ))}
                        </>
                      )}
                      {item.remarks && (
                        <View style={styles.remarksContainer}>
                          <View style={styles.remarksHeader}>
                            <Image
                              source={iconInfo}
                              style={styles.remarksIcon}
                            />
                            <Text style={styles.remarksHeaderText}>
                              Remarks
                            </Text>
                          </View>
                          {item.remarks.map((remark, remarkIndex) => (
                            <Text key={remarkIndex} style={styles.remarksText}>
                              {remark}
                            </Text>
                          ))}
                        </View>
                      )}
                      {item.note && (
                        <View style={styles.remarksContainer}>
                          <View style={styles.remarksHeader}>
                            <Image
                              source={iconInfo}
                              style={styles.remarksIcon}
                            />
                            <Text style={styles.remarksHeaderText}>
                              Remarks
                            </Text>
                          </View>
                          <Text key={itemIndex} style={styles.remarksText}>
                            {item.note}
                          </Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {data?.data?.remarks && (
                <View style={styles.remarksContainer}>
                  <View style={styles.remarksHeader}>
                    <Image src={iconInfo} style={styles.remarksIcon} />
                    <Text style={styles.remarksHeaderText}>Remarks</Text>
                  </View>
                  <Text style={styles.remarksText}>{data?.data?.remarks}</Text>
                </View>
              )}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
};
export default PdfComponent;
