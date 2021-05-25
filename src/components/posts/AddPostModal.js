import { useState, useContext } from 'react'
import { Modal, Button , Form } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext';


const AddPostModal = () => {

   const { addPost, showAddPostModal, setShowAddPostModal, setShowToast  } = useContext(PostContext);

   const [newPost, setNewPost] = useState({
      title:'',
      description:'',
      url:'',
      status: 'TO LEARN'
   })

   const { title, description, url, status  } = newPost ;

   const onChangeNewPostForm = e => {
      setNewPost({...newPost, [e.target.name]:e.target.value })
   }

   const closeDialog = () => {
     resetAddPostData();
   }

   const handlePost = async (e) => {
      e.preventDefault();
      const { success , message } = await addPost(newPost);
      resetAddPostData();
      setShowToast({show:true, message ,type: success ? 'success' : 'danger'});

   }

   const resetAddPostData = () => {
      setNewPost({
         title: '',
         description:'',
         url:'',
         status:'TO LEARN'
      });
      setShowAddPostModal(false);
   }

   return (
      <Modal show= {showAddPostModal} animation={true}  onHide = { closeDialog }>
      <Modal.Header closeButton> 
         <Modal.Title>What do you want to learn?</Modal.Title>
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
                     onChange = { onChangeNewPostForm }
               />
               <Form.Text id="title-help" muted>Required</Form.Text>  
            </Form.Group>
            <Form.Group>
            <Form.Control  
                     as="textarea"
                     name="description" 
                     placeholder="Description"  
                     value = { description }
                     onChange = { onChangeNewPostForm }
               />
            </Form.Group>
            <Form.Group>
            <Form.Control  
                     type="text" 
                     name="url" 
                     placeholder="YouTube Tutorial Url"     
                     value = { url }
                     onChange = { onChangeNewPostForm }
               />
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

export default AddPostModal
