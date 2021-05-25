import React from 'react'
import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import UpdatePostModal from '../components/posts/UpdatePostModal'
import addIcon  from '../assets/plus-circle-fill.svg'
import {OverlayTrigger,Tooltip, Spinner, Toast } from 'react-bootstrap'

const Dashboard = () => {
    const { authState:{ user: {username}}} = useContext(AuthContext);
    const { postState : {post,posts,postsLoading }, getPosts , setShowAddPostModal, showToast: {show, message, type}, setShowToast } = useContext(PostContext);

    console.log(posts);
    useEffect(() => {
        getPosts();
    },[])

    let body = null;
    if(postsLoading ){
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    }else if(posts.length === 0){
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to learn &nbsp;
                            <Button variant="primary" onClick = { setShowAddPostModal }>LearnIt</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3" >
                    {posts.map( post => (
                        <Col key = {post._id} className="my-2">
                            <SinglePost post = { post } />
                            
                        </Col>
                    ))}
                </Row>

                <OverlayTrigger placement='left' overlay = {<Tooltip>Add a new thing to learn</Tooltip>}>
                    <Button className="btn-floating" onClick = {() => setShowAddPostModal(true)} >
                        <img src={ addIcon} alt="addIcon" width="60" height="60"  />
                    </Button>
                </OverlayTrigger>
            </>
        )
    }
    return (
        <div>
           <h1>DASHBOARD</h1> 
           { body }
           <AddPostModal/>
            { post !== null && <UpdatePostModal /> }


           <Toast 
                    show={show} 
                    style={{ position:'fixed', top:'20%',right:'10px',padding:'5px' }} 
                    className={`bg-${type} text-white`}
                    onClose =  { () =>  setShowToast({  show: false, message:'',type:null })}
                    delay= {3000}
                    autohide
            >
               <Toast.Body>
                    <strong>{message}</strong>
               </Toast.Body>
           </Toast>
        </div>
    )
}

export default Dashboard
