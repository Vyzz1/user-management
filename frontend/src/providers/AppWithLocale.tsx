import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getAntdLocale } from "../utils/locate";
import App from "../App";
import { Suspense } from "react";
import Loading from "../components/Loading";

export function AppWithLocale() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

  return (
    <ConfigProvider locale={getAntdLocale(currentLanguage)}>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </ConfigProvider>
  );
}
