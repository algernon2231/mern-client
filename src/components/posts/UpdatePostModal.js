import { useState, useEffect , useContext } from 'react'
import { Modal, Button , Form } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext';


const UpdatePostModal = () => {

    
   const { postState: { post }, showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast  } = useContext(PostContext);

   
    useEffect( () => {
        setUpdatedPost(post);
    },[post])


   const [updatedPost, setUpdatedPost] = useState(post);
   
   const { title, description, url, status  } = updatedPost  ;

   const onChangeUpdatedPostForm = e => {
      setUpdatedPost({...updatedPost, [e.target.name]:e.target.value })
   }

   const closeDialog = () => {
        setUpdatedPost(post);
        setShowUpdatePostModal(false);
   }

   const handlePost = async (e) => {
        e.preventDefault();
        const { success , message } = await updatePost(updatedPost);
        setShowUpdatePostModal(false);
        setShowToast({show:true, message ,type: success ? 'success' : 'danger'});
   }

  

   return (
      <Modal show= { showUpdatePostModal } animation={true} onHide = { closeDialog } >
      <Modal.Header closeButton> 
         <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit = { handlePost }>
         <Modal.Body>
            <Form.Group>
               <Form.Control  
                     type="text" 
                     name="title" 
                     placeholder="Title"  
                     required
                     aria-aria-describedby="title-help"
                     value = { title}
                     onChange = { onChangeUpdatedPostForm }
               />
               <Form.Text id="title-help" muted>Required</Form.Text>  
            </Form.Group>
            <Form.Group>
            <Form.Control  
                     as="textarea"
                     name="description" 
                     placeholder="Description"  
                     value = { description }
                     onChange = { onChangeUpdatedPostForm }
               />
            </Form.Group>
            <Form.Group>
            <Form.Control  
                     type="text" 
                     name="url" 
                     placeholder="YouTube Tutorial Url"     
                     value = { url }
                     onChange = { onChangeUpdatedPostForm }
               />
            </Form.Group>

            <Form.Group>
                <Form.Control as='select' value={status} name="status" onChange= { onChangeUpdatedPostForm} >
                    <option value="TO LEARN">TO LEARN</option>
                    <option value="LEARNING">LEARNING</option>
                    <option value="LEARNED">LEARNED</option>
                </Form.Control> 
            </Form.Group>
         </Modal.Body>
         <Modal.Footer>
               <Button variant="secondary" onClick = { closeDialog }>Cancel</Button>
               <Button variant="primary" type="submit">Learn It</Button>
         </Modal.Footer>
      </Form>
   </Modal>
   )
}

export default UpdatePostModal
