import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Show = () => {
  const [formdata, setFormdata] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch("http://localhost:5005/api/getforms", {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        });

        let data = await response.json();
        console.log("data", data);
        setFormdata(data);
      } catch (error) {
        console.log("formdata error", error);
      }
    }
    fetchData();
    console.log("formdata", formdata);
  }, []);

  return (
    <div className="full-width">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {formdata &&
            formdata.map((form) => (
              <tr key={form._id}>
                <td>{form._id}</td>
                <td>{form.name}</td>
                <td>{form.createdAt}</td>
                <td>
                  <Link
                    //to={`/edit`}
                    to={`/edit/${form._id}`}
                    target="_blank"
                    style={{
                      border: "none",
                      margin: "0px 8px",
                      color: "#000",
                      listStyleType: "none",
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/view/${form._id}`}
                    target="_blank"
                    style={{
                      border: "none",
                      margin: "0px 8px",
                      color: "#000",
                      listStyleType: "none",
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Show;
