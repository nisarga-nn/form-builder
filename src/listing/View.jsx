
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactFormGenerator } from '../index'


const PreviewForm = () => {
  const [formdata, setFormdata] = useState();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:5005/api/getformdata/${params.id}`,
          {
            method: "GET",
            headers: {
              "Accept": "*/*",
              "Content-Type": "application/json",
            },
          }
        );

        let data = await response.json();
        console.log("data", data);
        setFormdata(data);
      } catch (error) {
        console.log("formdata error", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
    <div className="show d-block" role="dialog">
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        {formdata && 
        <>
          <div>
            <span>{formdata.name}</span>
            <span>{formdata._id}</span>
          </div>
          <ReactFormGenerator
          form_action="/api/form"
          form_method="POST"
          action_name="Submit"
          submitButton={<button type="submit" className="btn btn-primary">Submit</button>}
          data={formdata.task_data}
          locale='en'/>
          </>
          }
      </div>
    </div>
  </div>
          </>
  );
};

export default PreviewForm;