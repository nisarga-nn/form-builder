import React from "react";
import ReactDOM from "react-dom";
import DemoBar from "./demobar";
// eslint-disable-next-line no-unused-vars
import FormBuilder, { Registry } from "./src/index";
import * as variables from "./variables";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom/dist";
import Show from "./src/listing/Show";
import Edit from "./src/listing/Edit";
import View from "./src/listing/View";

// Add our stylesheets for the demo.
require("./scss/application.scss");

const url = "/api/formdata";
const saveUrl = "/api/formdata";

const Home = () => (
  <>
    <DemoBar variables={variables} />
    <FormBuilder.ReactFormBuilder
      variables={variables}
      url={url}
      saveUrl={saveUrl}
      locale="en"
      saveAlways={false}
      // toolbarItems={items}
    />
  </>
);


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/listing" element={<Show />} />
          {/* <Route path="/edit/:_id" element={<Edit />} /> */}
          <Route exact path="/edit/:id" element={<Edit />} />
          <Route exact path="/view/:id" element={<View />} />
        </Routes>
      </Router>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
