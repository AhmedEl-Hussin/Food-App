
import avatar from '../../../assets/images/avatar.png'


export default function Navbar({adminData}) {
  return (
    
    <>
      <div className=" navbar px-2 d-flex mt-4">

        <div className="search">
          <input className="form-control" type="search" placeholder="Search" />
        </div>

        <div className="caption-navbar d-flex justify-content-center align-items-center">
          <img className='avatar' src={avatar} alt="" />
          <h5 className='ms-2 mt-2'> {adminData.userName}</h5>
          <i className="fa-solid ms-3 fa-arrow-down"></i>   
          <i className="fa-solid ms-3 fa-bell"></i>
        </div>

      </div>
    </>
  )
}
