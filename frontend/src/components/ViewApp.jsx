import React, { useState } from "react"
import { Accordion, Container, Card, Button } from "react-bootstrap";
import { MdExpandMore } from 'react-icons/md';

const question = [
    {
      user : "A",
      questions : [
        {content : "how are u" , type : "text" , ans : "i am fine"} ,
        {content : "what are u doing" , type : "text" , ans : "nothing"} , 
        {content : "how old" , type : "number" , ans : 12}
      ]
    },
    {
      user : "B",
      questions : [
        {content : "how are u" , type : "text" , ans : "i am fine"} ,
        {content : "what are u doing" , type : "text" , ans : "nothing"} , 
        {content : "how old" , type : "number" , ans : 12}
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