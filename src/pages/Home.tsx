import React, { type ReactElement } from "react";
import "./Home.css";
import Form from "../components/FormInsert";
import Layout from "../layouts/HomeLayout";

function App(): ReactElement {
  return (
    <Layout>
      <Form />
    </Layout>
  );
}

export default App;
