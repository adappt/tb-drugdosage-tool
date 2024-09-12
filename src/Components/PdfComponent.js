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
import iconInfo from "../assets/icon-info-base64";

Font.register({
  family: "Calibri",
  src: require("../assets/Fonts/calibri.ttf"),
});

Font.register({
  family: "Calibri",
  src: require("../assets/Fonts/calibrib.ttf"),
  fontWeight: "bold",
});

const styles = StyleSheet.create({
  page: {
    margin: 20,
    padding: 10,
    //fontFamily: 'Calibri',
  },
  container: {
    padding: 20,
    minHeight: "10%",
  },
  header: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Calibri",
  },
  borderBox: {
    borderStyle: "solid",
    borderColor: "#016ab6",
    borderWidth: 2,
  },
  groupContainer: {
    backgroundColor: "#c1e1f7",
    display: "flex",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  groupText: {
    padding: 20,
    margin: 0,
    fontSize: 12,
    fontWeight: 600,
  },
  drugContainer: {
    backgroundColor: "#daeaf5",
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  drugText: {
    padding: 20,
    flexBasis: "50%",
    margin: 0,
    fontSize: 12,
    fontWeight: 600,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#016ab6",
    justifyContent: "space-between",
  },
  headerTextLeft: {
    flexBasis: "40%",
    color: "#fff",
    paddingVertical: 5,
    paddingLeft: 20,
    alignItems: "center",
    display: "flex",
  },
  headerTextRight: {
    flexBasis: "60%",
    color: "#fff",
    paddingVertical: 5,
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: "#fff",
    alignItems: "center",
    display: "flex",
  },
  infoContainer: {
    display: "flex",
    marginTop: 20,
  },
  remarksText: {
    margin: 0,
    //marginLeft: 10,
    fontSize: 12,
    lineHeight: 28,
    color: "#666",
  },
  image: {
    height: 40,
    width: 40,
  },
  table: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
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
});

const PdfComponent = (data) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {data?.data?.defaultTool.default_tool === "tpt_finder" ? (
            <View>
              <View style={{ backgroundColor: "#fff", margin: 20 }}>
                <Text style={styles.header}>TB Prevention</Text>
              </View>
              <View style={styles.doseResult}>
                <Text style={styles.doseResultHeader}>
                  Dose by age and weight band
                </Text>
                <View style={styles.doseResultContainer}>
                  <Image
                    src={require("../assets/drug.png")}
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
              <View style={{ backgroundColor: "#fff", margin: 20 }}>
                <Text style={styles.header}>{data?.data?.header}</Text>
              </View>

              {data?.data?.longerRegimen.length > 0 ? (
                <View
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    borderStyle: "solid",
                    borderColor: "#016ab6",
                    marginRight: 30,
                    borderWidth: 1,
                  }}
                >
                  {Object.values(data?.data?.longerRegimen).map(
                    (item, index) => (
                      <View key={index}>
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 10,
                            backgroundColor: "#c1e1f7",
                          }}
                        >
                          <Text
                            style={{
                              color: "#000",
                              fontSize: 16,
                              fontWeight: 600,
                              fontFamily: "Calibri",
                            }}
                          >
                            {item.group}
                          </Text>
                        </View>
                        {Object.values(item.data).map((itm, itmIndex) => (
                          <View key={itmIndex}>
                            <View
                              style={{
                                backgroundColor: "#daeaf5",
                                display: "flex",
                                flexDirection: "row",
                                paddingLeft: 10,
                                paddingVertical: 10,
                                justifyContent: "flex-start",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#000",
                                  fontSize: 14,
                                  fontWeight: 600,
                                  fontFamily: "Calibri",
                                }}
                              >
                                DRUG : {itm.medicationName}
                              </Text>
                            </View>
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                backgroundColor: "#016ab6",
                                justifyContent: "space-between",
                              }}
                            >
                              <View
                                style={{
                                  flexBasis: "40%",
                                  color: "#fff",
                                  paddingVertical: 5,
                                  paddingLeft: 20,
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#fff",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Calibri",
                                  }}
                                >
                                  FORMULATION
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexBasis: "60%",
                                  color: "#fff",
                                  paddingVertical: 5,
                                  paddingLeft: 20,
                                  borderLeftWidth: 1,
                                  borderLeftStyle: "solid",
                                  display: "flex",
                                  borderLeftColor: "#fff",
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#fff",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Calibri",
                                  }}
                                >
                                  DAILY DOSE
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                backgroundColor: "#daeaf5",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <View
                                style={{
                                  flexBasis: "40%",
                                  paddingVertical: 5,
                                  paddingLeft: 20,
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#000",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Calibri",
                                  }}
                                >
                                  {itm.formName}
                                  {itm.formDose}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexBasis: "60%",
                                  paddingVertical: 5,
                                  paddingLeft: 20,
                                  borderLeftWidth: 1,
                                  borderLeftStyle: "solid",
                                  display: "flex",
                                  borderLeftColor: "#fff",
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#000",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Calibri",
                                  }}
                                >
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
                <View
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    borderStyle: "solid",
                    width: "100%",
                    borderColor: "#016ab6",
                    marginRight: 30,
                    borderWidth: 1,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "1px solid #ddd",
                      backgroundColor: "#daeaf5",
                    }}
                  >
                    <View
                      style={{
                        paddingVertical: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "Calibri",
                        }}
                      >
                        Dose
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingVertical: 10,
                        paddingLeft: 20,
                        borderLeftWidth: 1,
                        borderLeftStyle: "solid",
                        borderLeftColor: "#fff",
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "Calibri",
                        }}
                      >
                        Formulation
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingVertical: 10,
                        paddingLeft: 20,
                        borderLeftWidth: 1,
                        borderLeftStyle: "solid",
                        borderLeftColor: "#fff",
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "Calibri",
                        }}
                      >
                        Quantity
                        <br />
                        (tabs, caps, mL)
                      </Text>
                    </View>
                  </View>
                  {Object.values(data?.data?.result).map((item, itemIndex) => (
                    <View key={itemIndex}>
                      {item.category && (
                        <View
                          style={{
                            backgroundColor: "#006ab6",
                            display: "flex",
                            flexDirection: "row",
                            paddingLeft: 10,
                            paddingVertical: 10,
                            justifyContent: "flex-start",
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 14,
                              fontWeight: 600,
                              fontFamily: "Calibri",
                            }}
                          >
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
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                      }}
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
                                <View
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  {itm.dose && (
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
                                  )}
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
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                            }}
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
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 20,
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              src={iconInfo}
                              style={{ width: 20, height: 20, marginRight: 5 }}
                            />
                            <Text
                              style={{
                                color: "#000",
                                fontSize: 14,
                                fontFamily: "Calibri",
                              }}
                            >
                              Remarks
                            </Text>
                          </View>
                          {item.remarks.map((remark, remarkIndex) => (
                            <Text
                              key={remarkIndex}
                              style={{
                                color: "#000",
                                fontSize: 14,
                                fontWeight: 200,
                                marginTop: 10,
                                textAlign: "left",
                                marginHorizontal: 30,
                                fontFamily: "Calibri",
                              }}
                            >
                              {remark}
                            </Text>
                          ))}
                        </View>
                      )}
                      {item.note && (
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 20,
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              src={iconInfo}
                              style={{ width: 20, height: 20, marginRight: 5 }}
                            />
                            <Text
                              style={{
                                color: "#000",
                                fontSize: 14,
                                fontFamily: "Calibri",
                              }}
                            >
                              Remarks
                            </Text>
                          </View>
                          <Text
                            key={itemIndex}
                            style={{
                              color: "#000",
                              fontSize: 14,
                              fontWeight: 200,
                              marginTop: 10,
                              textAlign: "left",
                              marginHorizontal: 30,
                              fontFamily: "Calibri",
                            }}
                          >
                            {item.note}
                          </Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {data?.data?.remarks && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={iconInfo}
                      style={{ width: 20, height: 20, marginRight: 5 }}
                    />
                    <Text style={{ fontFamily: "Calibri" }}>Remarks</Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 200,
                      marginTop: 10,
                      textAlign: "left",
                      marginHorizontal: 30,
                      fontFamily: "Calibri",
                    }}
                  >
                    {data?.data?.remarks}
                  </Text>
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
