import { fr as dnsFrLocale, vi as dnsViLocale } from "date-fns/locale";
import antdViLocale from "antd/locale/vi_VN";
import antdFrLocale from "antd/locale/fr_FR";
import antdEnLocale from "antd/locale/en_US";

export function getDateFnsLocale(language: string) {
  if (language === "vi") {
    return dnsViLocale;
  }
  if (language === "fr") {
    return dnsFrLocale;
  }
  return undefined;
}

export function getAntdLocale(language: string) {
  if (language === "vi") {
    return antdViLocale;
  }
  if (language === "fr") {
    return antdFrLocale;
  }
  return antdEnLocale;
}
