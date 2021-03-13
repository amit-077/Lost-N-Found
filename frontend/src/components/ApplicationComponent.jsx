import React, { useState } from "react";
import axios from 'axios'

import {
  
  Button,
  Form
} from "react-bootstrap";

const questions = [
  {
    content: "How are you",
    type: "text",
    ans: " "
  },
  {
    content: "what is time ? ",
    type: "time",
    ans: ""
  },
  {
    content: "how are you doing?",
    type: "number",
    ans: ""
  },
  {
    content: "enter mail?",
    type: "email",
    ans: ""
  },
  {
    content: "enter password?",
    type: "password",
    ans: ""
  },
  {
    content: "enter ",
    type: "file",
    ans: ""
  },
  {
    content: "How",
    type: "text-area",
    ans: ""
  },
  {
    content: "enter date",
    type: "date",
    ans: ""
  }
];

//Array from server
const qArray = questions;

function ApplicationComponent() {
  const [qState, setQState] = useState(qArray);
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState('')

  //function for handling file upload button
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    console.log(qState);
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setQState((prev) => {
      prev[name].ans = value;
      return [...prev];
    });
  }

  return (
    <Form onSubmit={onSubmit}>
      {qState.map((question, index) => {
        return (
          <Form.Group controlId={index} key={index}>
            <Form.Label>{question.content}</Form.Label>
            {question.type === "text-area" ? (
              <Form.Control
                as="textarea"
                row="3"
                onChange={handleChange}
                //Index Represent QNO
                name={index}
                required
              ></Form.Control>
            ) : question.type === "file" ? 
                  (
                    <Form.File
                      id='image-file'
                      label='Choose File'
                      custom
                      onChange={uploadFileHandler}
                    ></Form.File>
                  )
                  :
                  (
                    <Form.Control
                      type={question.type}
                      onChange={handleChange}
                      //Index Represent QNO
                      name={index}
                      required
                    ></Form.Control>
                  )
                
            }
          </Form.Group>
        );
      })}

      <Button
        // disabled={onSubmit}
        type="submit"
        variant="primary"
      >
        Submit
      </Button>
    </Form>
  );
}

export default ApplicationComponent;