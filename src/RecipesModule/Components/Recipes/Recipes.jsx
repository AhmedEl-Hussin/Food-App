import { useContext, useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header.jsx'
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import imgNoData from '../../../assets/images/noData.png'
import { useForm } from 'react-hook-form'
import NoData from '../../../SharedModule/Components/NoData/NoData.jsx';
import { AuthContext } from '../../../Context/AuthContext.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Recipes() {

  const {
    register,
    handleSubmit,
    setValue,
    formState : { errors },
  } = useForm();

  const {requstHeaders , requstHeadersImg , baseUrl} = useContext(AuthContext);
  const [isLoding , setIsLoding] =useState(false);
  const [recipesList , setRecipesList] = useState([]);
  const [modelState , setModelState] = useState("close");
  const [itemId , setItemId] = useState(0);
  const [categoryIds , setCategoryIds] = useState([]);
  const [tagIds , setTagIds] = useState([]);
  const [pagesArray , setPagesArray] = useState([]);
  const [searchString , setSearchString] = useState("");
  const [selectedTagId , setSelectedTagId] = useState(0);
  const [selectedCategoryId , setSelectedCategoryId] = useState(0);

  const handleClose = () => setModelState("colse");

  // *************** to show add model ***************
  const showAddModel = ()=> {
    setModelState("add-model")
  }

  // *************** to show delete model ***************
  const showDeleteModel = (id)=> {
    setItemId(id)
    setModelState("delete-model")
  }

  // *************** to show delete model ***************
  const showUpdateModels = (recipe)=> {
    setItemId(recipe.id)
    setValue("name" , recipe.name);
    setValue("description" , recipe.description);
    setValue("price" , recipe.price);
    setValue("tagId" , recipe.tagId);
    setValue("categoriesIds" , recipe.categoriesIds);
    setModelState("update-model")
  }

  // *************** to get all category ids ***************
  const getCategoryIds = ()=>{
    axios.get(`${baseUrl}/Category/?pageSize=100&pageNumber=1` , 
    {
      headers: requstHeaders,
    })
    .then((response)=>{
      // console.log(response);
      setCategoryIds(response.data.data);
      
    }).catch((error)=>{
      // console.log(error?.response?.data?.message);
      error(error?.response?.data?.message || "Not Found category Ids")
    })
  }

  // *************** to get all tag ids *****************
  const getTagIds = ()=>{
    axios.get( `${baseUrl}/tag/` , 
    {
      headers: requstHeaders,
    })
    .then((response)=>{
      setTagIds(response.data);
    
    }).catch((error)=>{
      // console.log(error.response.data.message);
      error(error?.response?.data?.message || "Not Found Tag Ids")
    })
  }

  // *************** to add new recipe *****************
  const onSubmit = (data)=>{
    // console.log(data);
    setIsLoding(true);
    axios.post(`${baseUrl}/Recipe/`, {...data , recipeImage : data.recipeImage[0]},
    {
      headers : requstHeadersImg,
    })
    .then((response)=> {
      // console.log(response);
      handleClose();
      getAllRecipes();
      setIsLoding(false);
      toast.success("Recipe Added Successfuly")
    })
    .catch((error)=> {
      // console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Recipe Not Added")
      setIsLoding(false);
    })
  }

  // *************** to delete recipe *****************
  const deleteRecipe = ()=>{
    setIsLoding(true);
    axios.delete(`${baseUrl}/Recipe/${itemId}` , 
    {
      headers : requstHeaders,
    })
    .then((response)=>{
      handleClose()
      getAllRecipes()
      setIsLoding(false);
      toast.success("Recipe Deleted Successfuly")
    
    }).catch((error)=>{
      // console.log(error.response.data.message);
      toast.error(error?.response?.data?.message || "Recipe Not Deleted")
      setIsLoding(false);
    })
    
  }

  // *************** to get update recipes *****************
  const updateRecipe = (data)=>{

      // console.log(data);
      setIsLoding(true);
      
      axios.put(`${baseUrl}/Recipe/${itemId}`  , {...data , recipeImage : data.recipeImage[0]},
      {
        headers : requstHeadersImg
      })
      .then((response)=> {
        // console.log(response);
        handleClose();
        getAllRecipes();
        setIsLoding(false);
        toast.success("Recipe Updated Successfuly")
      })
      .catch((error)=> {
        // console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "Recipe Not Added")
        setIsLoding(false);
      })

  }

  // *************** to get all recipes *****************
  const getAllRecipes = (pageNo , name , tagId , categortId)=>{
    setIsLoding(true)
    axios.get(`${baseUrl}/Recipe/` , 
    {
      headers: requstHeaders,
      params : {
        pageSize : 5,
        pageNumber : pageNo,
        name : name,
        tagId : tagId ,
        categoryId : categortId
      }
    })
    .then((response)=>{
      // console.log(response);
      setPagesArray( Array(response.data.totalNumberOfPages).fill().map((_ , i)=> i+1));
      setRecipesList(response?.data.data);
      setIsLoding(false)
    
    }).catch((error)=>{
      // console.log(error);
      error(error.response.data.message);
      setIsLoding(false)
    })
  }

  // *************** to search by name *****************
  const getRecipeValue = (input)=> {
    setSearchString(input.target.value)
    getAllRecipes( 1 , input.target.value);
  }

  // *************** to search by tagId *****************
  const getTagValue = (select)=> {
    // console.log(select.target.value);
    setSelectedTagId(select.target.value)
    getAllRecipes( 1 , null , select.target.value , selectedCategoryId);
  }

  // *************** to search by categoryId *****************
  const getcategoryValue = (select)=> {
    setSelectedCategoryId(select.target.value)
    getAllRecipes( 1 , null , selectedTagId , select.target.value);
  }

  useEffect( ()=> {
    getCategoryIds();
    getTagIds();
    getAllRecipes();
  } , [])

  return (
    
    <>
    <Header 
      Title={"Recipes Items"} 
      Paragraph= {`You can now add your items that any user can order it from the Application and you can edit`} 
      />

      {/* ************* this model to add recipe *********** */}
      <Modal show={modelState == "add-model"} onHide={handleClose}>
        
        <Modal.Body>
          <h3 className='ms-3 mt-3 text-center fw-bold'>Add New Recipe</h3>

          <form className='form w-100 m-auto mt-4' onSubmit={handleSubmit(onSubmit)}>
                
                {/* ************** for name input ************ */}
                <div className='form-group mt-4 position-relative'>
                  <input className='form-control' 
                          placeholder='Recipe Name' 
                          type="string" 
                          {...register("name" , {
                            required : true
                          })}
                  />

                  {errors.name && errors.name.type === "required" && (
                  <span className='text-danger '>Name is required</span>
                  )}

                </div>

                {/* ************** for price input ************ */}
                <div className='form-group mt-4 position-relative'>
                  <input className='form-control' 
                          placeholder='Price' 
                          type="number" 
                          {...register("price" , {
                            required : true
                          })}
                  />

                  {errors.price && errors.price.type === "required" && (
                  <span className='text-danger '>Price is required</span>
                  )}

                </div>

                {/* ************** for select tagId ************ */}
                <div className='form-group mt-4 position-relative'>

                  <select 
                  {...register("tagId" , {required : true , valueAsNumber : true })} className='form-select'>
                    <option value="" className='text-muted'>Select tag</option>
                    
                    {tagIds.map((getId , index)=> (
                      <option key={index} value={getId.id}>
                        {getId.name}
                      </option>
                    ))} 

                  </select>

                  {errors.tagId && errors.tagId.type === "required" && (
                    <span className='text-danger '>Noodels is required</span>
                    )}

                </div>

                {/* ************** for select categoryId ************ */}
                <div className='form-group mt-4 position-relative'>

                <select 
                  {...register("categoriesIds" , {required : true , valueAsNumber : true })} className='form-select'>
                    <option value="" className='text-muted'>Select category</option>
                    
                    {categoryIds.map((getId , index)=> (
                      <option key={index} value={getId.id}>
                        {getId.name}
                      </option>
                    ))} 

                  </select>

                  {errors.categoriesIds && errors.categoriesIds.type === "required" && (
                    <span className='text-danger '>Category id is required</span>
                    )}

                </div>

                {/* ************** for description input ************ */}
                <div className='form-group mt-4 position-relative'>
                  <textarea placeholder='Description' className='form-control' type="string"  
                          {...register("description" , {
                            required : true
                          })}
                  />

                  {errors.description && errors.description.type === "required" && (
                  <span className='text-danger '>Description is required</span>
                  )}
                </div>

                {/* ************** for image input ************ */}
                <div className='form-group mt-4 position-relative'>
                  <input className='form-control' 
                          placeholder='Drop or Choose a Item Image to Upload' 
                          type="file" 
                          {...register("recipeImage" , {required : true} )}
                  />

                  {errors.recipeImage && errors.recipeImage.type === "required" && (
                  <span className='text-danger '>image is required</span>
                  )}

                </div>

                <div className='form-group mt-4 mb-2'>
                  <button  className='btn w-100 text-white'> 
                    {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Save"}
                  </button>
                </div>

              </form>
        </Modal.Body>
      </Modal>

      {/* ************* this model to delete recipe *********** */}
      <Modal show={modelState == "delete-model"} onHide={handleClose}>
        <Modal.Body>
            <div className="text-center noData mt-3">
              <img className='w-50' src= {imgNoData} alt="" />
              <h5 className='mt-3'>Delete This Category ?</h5>
              <p>are you sure you want to delete this item ? if you are sure just <br/> click on delete it</p>

              <div className='text-end mt-5'>
                <button onClick={deleteRecipe} className='btn text-end border border-danger text-danger'>
                  {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete this item"}
                </button>
              </div>
            </div>
        </Modal.Body>
      </Modal>

      {/* ************* this model to update recipe *********** */}
      <Modal show={modelState == "update-model"} onHide={handleClose}>
        
        <Modal.Body>
          <h3 className='ms-3 mt-3 text-center fw-bold'>Add New Recipe</h3>

          <form className='form w-100 m-auto mt-4' onSubmit={handleSubmit(updateRecipe)}>
                
                {/* ************** for name input ************ */}
                <div className='form-group mt-4 position-relative'>
                  <input className='form-control' 
                          placeholder='Recipe Name' 
                          type="string" 
                          {...register("name" , {
                            required : true
                          })}
                  />

                  {errors.name && errors.name.type === "required" && (
                  <span className='text-danger '>Name is required</span>
                  )}

                </div>

                {/* ************** for price input ************ */}
                <div className='form-group mt-4 position-relative'>
                  <input className='form-control' 
                          placeholder='Price' 
                          type="number" 
                          {...register("price" , {
                            required : true
                          })}
                  />

                  {errors.price && errors.price.type === "required" && (
                  <span className='text-danger '>Price is required</span>
                  )}

                </div>

                {/* ************** for select tagId ************ */}
                <div className='form-group mt-4 position-relative'>

                <select 
                {...register("tagId" , {required : true , valueAsNumber : true })} className='form-select'>
                  
                  <option value="" className='text-muted'>Select tag</option>
                  {tagIds.map((getId , index)=> (
                    <option key={index} value={getId.id}>
                      {getId.name}
                    </option>
                  ))} 
                
                </select>
                  
                {errors.tagId && errors.tagId.type === "required" && (
                  <span className='text-danger '>Noodels is required</span>
                  )}
                
                </div>
                
                {/* ************** for select categoryId ************ */}
                <div className='form-group mt-4 position-relative'>
                
                <select 
                {...register("categoriesIds" , {required : true , valueAsNumber : true })} className='form-select'>
                  
                  <option value="" className='text-muted'>Select category</option>
                  {categoryIds.map((getId , index)=> (
                    <option key={index} value={getId.id}>
                      {getId.name}
                    </option>
                  ))} 
                
                </select>
                  
                {errors.categoriesIds && errors.categoriesIds.type === "required" && (
                  <span className='text-danger '>Category id is required</span>
                  )}
                
                </div>

                {/* ************** for description input ************ */}
                <div className='form-group mt-4 position-relative'>
                  <textarea placeholder='Description' className='form-control' type="string"  
                          {...register("description" , {
                            required : true
                          })}
                  />

                  {errors.description && errors.description.type === "required" && (
                  <span className='text-danger '>Description is required</span>
                  )}
                </div>

                {/* ************** for image input ************ */}
                <div className='form-group mt-4 position-relative'>
                  <input className='form-control' 
                          placeholder='Drop or Choose a Item Image to Upload' 
                          type="file" 
                          {...register("recipeImage" , {
                            required : true
                          })}
                  />

                  {errors.recipeImage && errors.recipeImage.type === "required" && (
                  <span className='text-danger '>Image is required</span>
                  )}

                </div>

                <div className='form-group mt-4 mb-2'>
                  <button  className='btn w-100 text-white'> 
                    {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Update"}
                  </button>
                </div>

              </form>
        </Modal.Body>
      </Modal>

      {/* **************** to content above table ****************** */}
      <div className='caption-category  mt-3 mb-5 d-flex justify-content-between align-items-center'>

        <div className=''>
          <h5>Recipes Table Details</h5>
          <span>You can check all details</span>
        </div>

        <div>
          <button onClick={showAddModel} className='btn btn-success px-4'>Add New Recipe</button>
        </div>

      </div>

      {/* **************** to view search inputs ****************** */}
      <div className='d-flex'>

        <input onChange={getRecipeValue} className='form-control w-50' placeholder='Search By Name.....' type="text" />
        
        <select onChange={getTagValue} className='form-select w-25 ms-2'>
          <option value="" className='text-muted'>Select tag</option>
            {tagIds.map((getId , index)=> (
              <option key={index} value={getId.id}>
                {getId.name}
              </option>
            ))} 
        </select>

        <select onChange={getcategoryValue} className='form-select w-25 ms-2'>
          <option value="" className='text-muted'>Select category</option>
            {categoryIds.map((getId , index)=> (
              <option key={index} value={getId.id}>
                {getId.name}
              </option>
            ))} 
        </select>

      </div>

      {/* **************** to display the table ****************** */}
      
      {!isLoding ? <div>

        {recipesList.length > 0 ? 
        <div className='table-responsive'>
        <table className="table table table-striped mt-4">
        
          <thead className='table-secondary'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Tag</th>
              <th className='text-center ' scope="col text-end">Actions</th>
            </tr>
          </thead>
        
          <tbody>
            {recipesList.map((recipe , index )=> (
                <tr key={recipe.id}>
                  <td scope="row"> {index + 1} </td>
                  <td> {recipe.name} </td>
                  <td>
                    <div className='img-container'>
                      <img className='w-100' src={`https://upskilling-egypt.com:443/`+recipe.imagePath} alt="" />
                    </div>
                  </td>
                  <td> {recipe.price} </td>
                  <td> {recipe.description} </td>
                  <td>{recipe?.category[0]?.name}</td>
                  <td> {recipe.tag.name} </td>
            
                  <td className='text-center'>
                    <i onClick={()=> showUpdateModels(recipe)} className='fa fs-5 text-success fa-edit'></i>
                    <i onClick={()=> showDeleteModel(recipe.id)} className='fa ms-3 fs-5 text-danger fa-trash'></i>
                  </td>
                </tr>
            ))} 
          </tbody>
        </table> </div> : <NoData/> }
            
      </div> : <div className='text-center loading mb-5 fs-1'> <i className="fa-solid text-success fa-spin fa-spinner"></i> </div>}

  {/* ************************* to pagination and filteration **************************** */}
        <nav className='pagination-btn d-flex justify-content-center' aria-label="...">
            <ul className="pagination pagination-sm">
              {pagesArray.map((pageNo)=> (
                <>
                  <li key={pageNo} onClick={()=> getAllRecipes(pageNo , searchString )} className="page-item ">
                    <a className="page-link bg-success text-white" > {pageNo} </a>
                  </li>
                </>
              ))}
            </ul>
          </nav>
      
    </>
  )
}
