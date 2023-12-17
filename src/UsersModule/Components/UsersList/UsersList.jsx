import { Modal } from "react-bootstrap";
import Header from "../../../SharedModule/Components/Header/Header.jsx";
import { useContext, useEffect, useState } from "react";
import imgNoData from '../../../assets/images/noData.png'
import avatar from "../../../assets/images/imgAvatar.png"
import axios from "axios";
import NoData from "../../../SharedModule/Components/NoData/NoData.jsx";
import { AuthContext } from "../../../Context/AuthContext.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UsersList() {

  const [isLoding , setIsLoding] =useState(false);
  const [usersList , setUsersList] = useState([]);
  const [modelState, setModelState] = useState("colse");
  const [itemId , setItemId] = useState(0);
  const [pagesArray , setPagesArray]= useState([]);
  const [searchString , setSearchString] = useState("");
  const [userDetails , setUserDetails] = useState({});
  const {requstHeaders , baseUrl} = useContext(AuthContext);
  const handleClose = () => setModelState("colse");


  const showViewModel = (id)=>{
    setItemId(id)
    setModelState("view-model")
    getUserDetails(id)
  }

    // *************** to view detail of recipe *****************
    const getUserDetails = (id)=>{
      console.log(id);

    axios.get( `${baseUrl}/Users/${id}` , 
    {
      headers: requstHeaders,
    })
    .then((response)=>{
      console.log(response?.data);
      setUserDetails(response?.data);
    
    }).catch((error)=>{
      // console.log(error.response.data.message);
      error(error?.response?.data?.message || "Not Found Tag Ids")
    })
  }

  // *************** to show add model ***************
  const showDeleteModel = (id)=>{
    setItemId(id)
    setModelState("delete-model");
  }

  // *************** to delete Category *****************
  const deleteUser = ()=>{
    setIsLoding(true);
    axios.delete(`${baseUrl}/Users/${itemId}` , 
    {
      headers : requstHeaders,
    })
    .then((response)=>{
      handleClose()
      getAllUsers();
      setIsLoding(false)
      toast.success("User Deleted Successfuly")
    
    }).catch((error)=>{
      
      toast.error(error?.response?.data?.message || "Category Not Deleted");
      setIsLoding(false)
    })
    
  }

  // *************** to get name value *****************
  const getNameValue = (input)=> {
    // console.log(input?.target?.value);
    setSearchString(input.target.value);
    getAllUsers(1 , input.target.value);

  }

  // *************** to get all Users *****************
  const getAllUsers = (pageNo , name )=>{
    setIsLoding(true)

    axios.get(`${baseUrl}/Users/` , 
    {
      headers: requstHeaders,
      params : {
        pageSize : 7,
        pageNumber : pageNo,
        userName : name,
      }
    })
    .then((response)=>{
      // console.log(response?.data?.totalNumberOfPages);
      setPagesArray( Array(response?.data?.totalNumberOfPages).fill().map((_ , i)=> i+1));
      setUsersList(response?.data?.data)
      setIsLoding(false)
    
    }).catch((error)=>{
      error(error?.response?.data?.message || "Not Found Categorys")
      setIsLoding(false)
    })
  }


  useEffect(()=> {
    getAllUsers(1);
  } , [])

  return (

    <>

      <Header 
        Title={"Users List"} 
        Paragraph= {"You can now add your items that any user can order it from the Application and you can edit"} 
      />

      {/* ************* this model to delete User *********** */}
      <Modal show={modelState == "delete-model"} onHide={handleClose}>
        <Modal.Body>
            <div className="text-center noData mt-3">

              <img className='w-50' src= {imgNoData} alt="" />
              <h5 className='mt-3'>Delete This User ?</h5>
              <p>are you sure you want to delete this item ? if you are sure just <br/> click on delete it</p>

              <div className='text-end mt-5'>
                <button onClick={deleteUser} className='btn text-end border border-danger text-danger'>
                  {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete this item"}
                </button>
              </div>

            </div>
        </Modal.Body>
      </Modal>

      {/* ************* this model to update recipe *********** */}
      <Modal show={modelState == "view-model"} onHide={handleClose}>
        <Modal.Body>
            <h3 className='ms- mt-3 text-success fw-bold'>Usser Details</h3>

          <div className='mt-4 userDetails'>
            <div className='w-25 m-auto mt-4'>
              {
                userDetails?.imagePath ? <img className='w-100' src={`https://upskilling-egypt.com:443/`+userDetails.imagePath} alt="" /> 
                : <img className='w-100 rounded-4' src={avatar} alt="" />
              }
            </div>
            <h6 className="mt-4 fs-5"> <span className='text-success fs-'>User Name : </span> {userDetails?.userName}  </h6>
            <h6 className="fs-5"> <span className='fs-6 text-success'>Role : </span> {userDetails?.group?.name} </h6>
            <h6 className="fs-5"> <span className='fs-6 text-success'>Email : </span> {userDetails?.email}  </h6>
            <h6 className="fs-5"> <span className='fs-6 text-success'>Phone Number : </span> {userDetails?.phoneNumber} </h6>
            </div>
          </Modal.Body>
        </Modal>

      {/* **************** to content above table ****************** */}
      <div className='caption-category  mt-4 '>

      <div className=''>
        <h5>Users Table Details</h5>
        <span>You can check all details</span>
      </div>

      </div>

      {/* **************** to display table ****************** */}

        <input onChange={getNameValue} className='form-control border-2 border-success w-100 my-4' placeholder='Search By Name....' type="text" />
        
      {/* **************** to display the table ****************** */}
      {!isLoding ? <div>

        {usersList?.length > 0 ? 
          <div className='table-responsive'>
          
          <table className="table table-striped mt-3">
        
          <thead className='table-secondary'>
            <tr className='test3'>
              <th scope="col">#</th>
              <th scope="col"> User Name</th>
              <th scope="col">Image</th>
              <th scope="col">PhoneNumber</th>
              <th scope="col">Role</th>
              <th className='text-center ' scope="col text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {usersList?.map((user , index)=> (
                <tr key={user.id}>
                  <th scope="row"> {index + 1} </th>
                  <td>{user.userName}</td>
                  <td>
                    <div className='img-container'>
                      {
                        user.imagePath ? <img className='w-75' src={`https://upskilling-egypt.com:443/`+user.imagePath} alt="" /> 
                        : <div className="userAvatar"> <img className="w-100" src={avatar} alt="" />  </div> 
                      }
                    </div>
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.group.name}</td>
                  <td className='text-center'>
                    <i onClick={()=> showViewModel(user.id)} className='fa fs-6 text-success fa-eye'></i>
                    {user.group.name == "SystemUser" ? <i onClick={()=> showDeleteModel(user.id)} className='fa ms-3 fs-6 text-danger fa-trash'></i> 
                    : <i className='fa fs-6 iconHamsh fa-eye'></i> }
                  </td>
                </tr>

            ))}
          </tbody>
        </table> </div> : <NoData/>}
          
      </div> : <div className='text-center loading mb-5 fs-1'> <i className="fa-solid text-success fa-spin fa-spinner"></i> </div>}

      {/* ************************* to pagination and filteration **************************** */}
        <nav className='pagination-btn d-flex justify-content-center' aria-label="...">
          <ul className="pagination pagination-sm">
            {pagesArray.map((pageNo)=> (
              <>
                <li key={pageNo} onClick={()=> getAllUsers(pageNo , searchString)} className="page-item ">
                  <a className="page-link bg-success text-white" > {pageNo} </a>
                </li> 
              </>
            ))}
          </ul>
        </nav>

    </>
  )
}
