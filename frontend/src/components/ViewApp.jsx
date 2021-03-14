import React, { useState } from "react"
import { Accordion, Container, Card, Button } from "react-bootstrap";
import { MdExpandMore } from 'react-icons/md';

const question = [
    {
      user : "A",
      questions : [
        {content : "Where did you lost your item" , type : "text" , ans : "I guess at station while returning from office"} ,
        {content : "Around what time do u think u lost?" , type : "time" , ans : "7:34 pm"} , 
        {content : "Describe your item?" , type : "text-area" , ans : "It is 2 year old. Its white in colour. It has some sratches on the back.It has little crack on the bottom."}
      ]
    },
    {
      user : "B",
      questions : [
        {content : "Where did you lost your item" , type : "text" , ans : "At Siddhivinayak temple entrance"} ,
        {content : "Around what time do u think u lost?" , type : "time" , ans : "8:00pm"} , 
        {content : "Describe your item?" , type : "text-area" , ans : "It is 2 year old. Its white in colour. It has some sratches on the back.It has little crack on the bottom." }
      ]
    }
  ]

  //Array Coming From Server
  const qArray = question

function ViewApp(){


    const [qState , setQState] = useState(qArray)

    function createCard(userCard,index){
        
        return (
                <Card>
                <Accordion.Toggle as={Card.Header} eventKey= { index == 0 ? "0" : "1"} >
                    <h2><MdExpandMore />{userCard.user}</h2>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey= { index == 0 ? "0" : "1"}>
                    <Card.Body style={{textDecoration: 'none'}}>
                        {userCard.questions.map( (ques) => {
                            return <div>
                                <h5 style={{textTransform: 'capitalize'}}>
                                    <strong>Q. {ques.content}</strong> 
                                </h5>
                                <h5 style={{textTransform: 'capitalize'}}>
                                    Ans:- {ques.ans}
                                </h5>
                                <hr/>
                            </div>
                        })}
                        <Button
                            // onClick={}
                            className='btn-block'
                            type='button'
                            variant='success'
                        >Accept</Button>
                        <Button
                            // onClick={}
                            className='btn-block'
                            type='button'
                            variant='danger'
                        >Reject</Button>
                        
                    </Card.Body>
                </Accordion.Collapse>
            </Card>)
    }

    return <div>
    
    <Accordion defaultActiveKey="0">
        {qState.map(createCard)}
  </Accordion>
    
  </div>
}

export default ViewApp
