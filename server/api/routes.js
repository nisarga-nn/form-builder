/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
const express = require("express");
const formData = require("./formData");
const FormCreate = require("../db/models/FormCreate");

const app = express();

// Data saving

app
  .route("/formdata/")
  .get((req, res) => {
    console.log("get formdata: ", formData.data);
    res.send(formData.data.task_data);
  })
  .post(async (req, res) => {
    const formDataModel = new FormCreate(req.body);
    try {
      await formDataModel.save();
      res.status(201).send("Form Save Successfully", { formDataModel });
    } catch (e) {
      res.status(400).send(e);
    }
  });

  // Showing database data 
app.route("/getforms/").get(async (req, res) => {
  const formdataDB = await FormCreate.find().sort({ createdAt: -1 });
  res.status(201).send(formdataDB);
});

// Get form by Id 
app.get("/getform/:id", async (req, res) => {
  try {
    const form = await FormCreate.findOne({
      _id: req.params.id
    });
    if (!form) {
      return res.status(404).send();
    }

    res.send(form);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// update form by id
app.patch("/updateForm/:id", async (req, res) => {
  console.log(req.body.task_data)
  try {
    const form = await FormCreate.findOne({
      _id: req.params.id
    });
    if (!form) {
      return res.status(404).send();
    }
    form.task_data = req.body.task_data
    await form.save();

    res.send(form);
  } catch (e) {
    res.status(500).send(e.message);
  }
});



module.exports = app;
