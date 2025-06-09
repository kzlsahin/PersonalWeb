/* This file is a core library for global definitions.
* This file shall not depend on any other while other files may depend on this.
*/

const SurveyTypeEnum = Object.freeze({
    Business_Permit: 0,
    Partial_Business_Permit: 1,
    Interim_Audit: 2,
  });
  const FacilityTypeEnum = Object.freeze({
    Shipyard: 0,
    Small_Shipyard: 1,
    Boatyard: 2,
  });
  const LoatingDockStatusEnum = Object.freeze({
    Present: 0,
    Absent: 1,
  });

  const Audit_Result = Object.freeze({
    "EK SUNULDU": 0,
    "EK SUNULMADI": 1,
    "UYGULAMA GÖRÜLMEDİ": 2,
    "UYGULAMA/DOKÜMAN YETERSİZ": 3,
    EVET: 4,
    HAYIR: 5,
    "UYGULAMASI YOK": 6,
    "EK KONMADI": 7,
  });