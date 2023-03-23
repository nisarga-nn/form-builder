import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import DemoBar from "../../demobar";
// eslint-disable-next-line no-unused-vars
import FormBuilder from "../../src/index";
// import * as variables from "../../variables";

const Edit = () => {
  const url = "/api/formdata";
  const saveUrl = "/api/formdata";
  const params = useParams();
  const [formdata, setFormdata] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(
          `http://localhost:5005/api/getform/${params.id}`,
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );
        let data = await response.json();
        console.log("data", data.task_data);
        setFormdata(data.task_data);
      } catch (error) {
        console.log("formdata error", error);
      }
    }
    fetchData();
    console.log("formdata", formdata);
  }, [params]);
  return (
    <div>
      {/* {formdata && formdata.map((form) => {
        return (
          <div key={form._id}>
            <h2>{form.name}</h2>
          </div>
        )
        })} */}
      <DemoBar />
      {formdata && (
        <FormBuilder.ReactFormBuilder
          key={params._id}
          // variables={variables}
          // url={url}
          // saveUrl={saveUrl}
          locale="en"
          saveAlways={false}
          data={formdata}
        />
      )}
    </div>
  );
};

export default Edit;
