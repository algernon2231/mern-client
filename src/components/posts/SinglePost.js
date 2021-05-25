import React from 'react'
import { Card,Row,Col,Button, Badge } from 'react-bootstrap'
import ActionButtons from './ActionButtons';

const SinglePost = ({ post: { _id, status, title ,description, url }}) => {
    const check_status =  status === 'LEARNED'? 'success': status ==='LEARNING' ? 'warning': 'danger' ;
    return (    
       <Card className="shadow" border = {check_status}>
           <Card.Body>
               <Card.Title>
                   <Row>
                       <Col>
                        <p className="post-title">{title}</p>
                        <Badge pill variant={ check_status }>{status}</Badge>
                       </Col>
                       <Col className="text-right">
                           <ActionButtons url={url} _id = {_id} />
                       </Col>
                   </Row>
               </Card.Title>
               <Card.Text>{description}</Card.Text>
           </Card.Body>
       </Card>
    )
}

export default SinglePost
