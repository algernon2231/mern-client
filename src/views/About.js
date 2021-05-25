import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const About = () => {
    return (
       <Row className="mt-5">
           <Col className="text-center">
               <Button variant="primary" href="https://www.youtube.com/watch?v=rgFd17fyM4A&t=12747s" size="lg">
                   YouTube Channel
               </Button>
           </Col>
       </Row>
    )
}

export default About
