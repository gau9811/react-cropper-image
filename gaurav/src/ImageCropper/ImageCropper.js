import React,{useState,useRef,useEffect} from 'react'




import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import "./ImageCropper.css";
import imageCompression from 'browser-image-compression';
import alternate from "../IMG/UPLOAD.png"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const  ImageCropper = () =>  {

   const imageElement = useRef(null)
   const [imageDestination,setImageDestination] = useState("")
   const [file,setFile] = useState("")
   const [msg,setMsg] = useState("")
   const [images,setImages] = useState([])

   const handlefileChange = () => {
    if (imageElement.current) {
    const cropper = new Cropper(imageElement.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      minContainerWidth:50,
      minContainerHeight:50,
      minCanvasWidth:50,
      minCanvasHeight:50,
      crop: () => {
          const canvas = cropper.getCroppedCanvas();
          setImageDestination(canvas.toDataURL("image/png"));
      }
    })
  } 

}

  useEffect(()=>{ 
    handlefileChange()
  })

 const handleChange =  async (e) => {

  if (file.length == 0) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    const compressedFile = await imageCompression(e.target.files[0], options);
    setFile(URL.createObjectURL(compressedFile))
   }else{
      setMsg("Please click clean btn")
   }

 }

 const fileCleaner = () => {
  setFile("")
  setImageDestination("")
 }

 
 const [modal, setModal] = useState(false);

 const toggle = () => {
    setFile("")
    setImageDestination("")
    setModal(!modal)
  };




  const saveImages = () => {
    setImages([...images,imageDestination])
  }
 

 return (
       <div className="container">
       <div className="row">
          </div>    
          <Button color="danger" onClick={toggle}>popup</Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
            <div className="row">
            <div className="col-6">
            <div className="row">
             {
               images.length > 0 && images.map((item,i)=>(
                  <div className="col" key={i}>
                     <img src={item} height="100px" width="100px" className="mt-2 p-1"/>
                  </div>
               ))
             }
             </div>
            </div>
            <div className="col-6">
            <div className="row">
            <div className="col-12">
            <div className="row">
            <div className="col-12">
            <div className="img-container text-center ml-1">
           
            {file &&  <img ref={imageElement} src={file} alt="Source" crossorigin/> }
            </div>
            
            <div className="Col-6 ">
            {
              imageDestination && <img src={imageDestination} height="200px" width="200px" className="pl-1"/>
            }
            </div>
            </div>
            </div>
            </div>
           <div className="col-12">
               {
                file.length == 0 && <button class="btn btn-outline-primary mr-5 mt-5 ml-5">
                <label for="inFile">
                   file
                </label>
                </button>
              }
              <input type="file" id="inFile" name="inFile"  accept="image/png, image/jpeg" hidden onChange={(e)=> handleChange(e)}/> 
              <button className="btn btn-outline-primary mr-5 mt-5" onClick={saveImages}>crop Image</button>
              <button className="btn btn-outline-primary mt-5" onClick={fileCleaner}>clean</button>
            </div>
            </div> 
            </div>   
            </div>  
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
        );

}

export default ImageCropper;