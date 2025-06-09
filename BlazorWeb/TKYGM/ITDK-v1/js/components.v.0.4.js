function AuditResult(props) {
  return /*#__PURE__*/React.createElement("select", {
    id: props.id,
    className: "selection-state"
  }, /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "EK SUNULDU"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "EK SUNULMADI"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "UYGULAMA G\xD6R\xDCLMED\u0130"), /*#__PURE__*/React.createElement("option", {
    value: "3"
  }, "UYGULAMA/DOK\xDCMAN YETERS\u0130Z"), /*#__PURE__*/React.createElement("option", {
    value: "4"
  }, "EVET"), /*#__PURE__*/React.createElement("option", {
    value: "5"
  }, "HAYIR"), /*#__PURE__*/React.createElement("option", {
    value: "6"
  }, "UYGULAMASI YOK"), /*#__PURE__*/React.createElement("option", {
    value: "7"
  }, "EK KONMADI"));
}
function SurveyType(props) {
  return /*#__PURE__*/React.createElement("select", {
    id: props.id,
    className: "selection-state"
  }, /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "\u0130\u015Fletme \u0130zni Belgesi Denetimi"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "K\u0131smi \u0130\u015Fletme \u0130zni Belgesi Denetimi"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "Ara Denetim"));
}
function FacilityType(props) {
  return /*#__PURE__*/React.createElement("select", {
    id: props.id,
    className: "selection-state"
  }, /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "Tersane"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Tekne \u0130mal Yeri"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "\xC7ekek Yeri"));
}
function FloatingDeckStatus(props) {
  return /*#__PURE__*/React.createElement("select", {
    id: props.id,
    className: "selection-state"
  }, /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "Y\xFCzer Havuz Mevcut"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Y\xFCzer Havuz Mevcut De\u011Fil"));
}
const clc = qID => {
  console.log(qID);
  getImage(qID);
};
function QuestionBody(props) {
  const listItems = props.items.map(item => /*#__PURE__*/React.createElement(QeestionItem, {
    key: item.id,
    id: item.id,
    head: item.head,
    input: item.input
  }));
  return /*#__PURE__*/React.createElement("article", {
    id: "q-" + props.id,
    className: "questionary-article"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => clc(props.id),
    className: "article-banner"
  }, /*#__PURE__*/React.createElement("p", null, props.id)), /*#__PURE__*/React.createElement("table", {
    className: "article-body"
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", {
    className: "questionary-item head-question"
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: "2"
  }, props.head)), listItems)));
}
function QeestionItem(props) {
  return /*#__PURE__*/React.createElement("tr", {
    className: "questionary-item"
  }, /*#__PURE__*/React.createElement("td", {
    className: "td-question"
  }, props.head, " ", props.input ? props.input : ""), /*#__PURE__*/React.createElement("td", {
    className: "td-question-result"
  }, /*#__PURE__*/React.createElement(AuditResult, {
    id: props.id
  })));
}
function TextInput(props) {
  return /*#__PURE__*/React.createElement("input", {
    id: props.name,
    className: "text-state" + (props.className ?? ""),
    type: "text",
    placeholder: props.placeHolder
  });
}