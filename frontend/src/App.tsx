import "./App.css";
import UserTable from "./components/UserTable";
import useFetchData from "./hooks/useFetchData";
import Loading from "./components/Loading";
import { Flex } from "antd";
import UserForm from "./components/UserForm";
import Header from "./components/styles/Header.style";
import Container from "./components/styles/Container.style";

function App() {
  const { data, isLoading, isError } = useFetchData("/users");

  if (isError) {
    return <p>Error loading users</p>;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Flex
        justify="space-between"
        align="center"
        style={{ paddingInline: "20px", marginBlock: "20px" }}
      >
        <Header>User Management</Header>
        <UserForm />
      </Flex>
      <UserTable users={data} />
    </Container>
  );
}

export default App;
