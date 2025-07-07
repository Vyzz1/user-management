import "./App.css";
import UserTable from "./components/UserTable";
import { Flex } from "antd";
import UserForm from "./components/UserForm";
import Header from "./components/styles/Header.style";
import Container from "./components/styles/Container.style";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import { setLanguage } from "./features/language/languageSlice";
import { useCallback, useEffect } from "react";
import SwitchLanguage from "./components/SwitchLanguage";
import { useGetUsersQuery } from "./features/user/userApiSlice";
import { setInputSearch } from "./features/user/userTableSlice";
import SearchInput from "./components/SearchInput";
import { searchInputToSearchParams } from "./utils/userTableParams";
import useSetDefaultParams from "./hooks/useSetDefaultParams";
import useGetApiParams from "./hooks/useGetApiParams";
import ResetFilter from "./components/ResetFilter";
import { useSearchParams } from "react-router-dom";

function App() {
  const params = useSelector((state: RootState) => state.userTable);

  const [urlParams, setUrlParams] = useSearchParams();

  const dispatch = useDispatch();

  useSetDefaultParams(urlParams.toString());

  const apiParams = useGetApiParams(params);

  const handleOnSearchInputChange = useCallback(
    (value: string | undefined) => {
      dispatch(setInputSearch(value));
      const searchParams = searchInputToSearchParams(
        urlParams.toString(),
        value
      );
      setUrlParams(searchParams);
    },
    [dispatch, setUrlParams, urlParams]
  );
  const {
    data: responseData,
    isLoading,
    isError,
    isFetching,
  } = useGetUsersQuery(apiParams, {
    refetchOnReconnect: true,
  });

  const { language } = useSelector((state: RootState) => state.language);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  if (isError) {
    return <p>Error loading users</p>;
  }

  const handleSwitchLanguage = (lng: LanguageKey) => {
    i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
  };

  const isShowResetFilter =
    Array.from(urlParams).length > 0 &&
    Array.from(urlParams).some(
      ([key]) => key !== "currentPage" && key !== "pageSize"
    );
  return (
    <Container>
      <SwitchLanguage
        defaultValue={language}
        style={{ width: "120px" }}
        onChange={handleSwitchLanguage}
      />
      <Flex
        justify="space-between"
        align="center"
        style={{ paddingInline: "20px", marginBlock: "20px" }}
      >
        <Header>{t("appTitle")}</Header>
        <UserForm />
      </Flex>

      <Flex
        style={{ paddingInline: "20px", marginBlock: "20px" }}
        justify="space-between"
      >
        <SearchInput
          searchValue={params.inputSearch}
          onSearchValueChange={handleOnSearchInputChange}
        />
        {isShowResetFilter && <ResetFilter />}
      </Flex>
      <UserTable
        total={responseData?.pagination.total || 0}
        users={responseData?.data || []}
        loading={isLoading || isFetching}
      />
    </Container>
  );
}

export default App;
