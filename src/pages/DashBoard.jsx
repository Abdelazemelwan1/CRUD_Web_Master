import * as React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import 'flowbite';
import { db} from "../firebase/firebase";
import { useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import CustomHeader from '../components/Navbar';


function Dashboard() {
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // <-- ✅ hook
  
   
    

    const fetchUsers = async () =>{
      const res = await getDocs(collection(db, "users"));
      const userList = res.docs.map(doc => ({ id: doc.id , ...doc.data()}))
      console.log(userList);
      setUsers(userList)
    };

    useEffect(() => {
      fetchUsers()
    }, [])

    const handleUpdateUser = async(row)=> {
      navigate(`/user/${row.id}/edit`)
      console.log("تعديل" , row);
    }
  const handleDelet = async(row)=> {
    try{
      await deleteDoc(doc(db , "users" , row.id))
      fetchUsers()
      console.log("حذف" , row);
      
    }catch(error){
      console.log(error);
    }
  
}

const rows = users?.length ?  users.map((user) => (
  { 
    id: user.id , 
    requestNo : user.Request ,
    area: user.Area ,
    date: user.Date,
    needDate: user.NeedDate,
    price: `${user.price || 0} $` ,
    totalprice:  `${user.totalprice || 0} $` ,
    materialsproducts: user.materials
  }
)) : [];
  const filteredRows = rows.filter((row) => {
    const searchLower = searchText.toLowerCase();
    return (
      row.area.toLowerCase().includes(searchLower) ||
      row.requestNo.toLowerCase().includes(searchLower) ||
      row.date.toLowerCase().includes(searchLower) ||
      row.price.toString() .toLowerCase().includes(searchLower)
    );
  });

  const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'requestNo', headerName: 'Request No', width: 130 },
  { field: 'area', headerName: 'Area', width: 110 },
  { field: 'date', headerName: 'Date', width: 110 },
  { field: 'needDate', headerName: 'Need Date', width: 110 },
  {field: 'price',headerName: 'Price',type: 'number', width: 90},
  {field: 'totalprice',headerName: 'Total Price',type: 'number', width: 110},
  {
    field: 'materialsproducts',headerName: 'Materials / Products',
    width: 160,
    renderCell: (params) => {
      const materialsproducts = params.row.materialsproducts
      return(<div className='flex gap-2 text-center w-full justify-center items-center' >
        <p className='font-bold text-xl'>
          {materialsproducts}

        </p>
        <div className='flex  '>
          <p>material</p>
          <p>material</p>
        </div>
    
    </div>)
    }
      
  },
    {field: 'action',headerName: 'Action', width: 110 , 

       renderCell: (params) => {
      return(
        // <h1 className='cursor-pointer' onClick={()=> handleUpdateUser(params)}  >updit</h1>

      <div className="flex justify-end px-4 pt-4 z-40">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span className="sr-only">Open dropdown</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
        <div id="dropdown" className="z-30 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
                <a onClick={()=> handleUpdateUser(params.row)} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
            <li>
                <a onClick={()=> handleDelet(params.row)} href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
      </div>
    </div>
    )
    }
    },

];


const paginationModel = { page: 0, pageSize: 7 };


  return (
    <>
     <CustomHeader        
      onSearch={setSearchText}
      onPageChange={setCurrentPage}
    />
    <div className="p-20 min-h-screen">
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Requests</h2>
        <button
          onClick={handleAddItemClick} // <-- ✅ attach handler
          className="flex items-center gap-2 px-4 py-2 text-white bg-fuchsia-700 hover:bg-fuchsia-800 rounded-md transition"
        >
          <span className="text-xl font-bold">+</span>
          Add Item
        </button>
      </div> */}

      <Paper className='m-auto mt-4' sx={{ height: 'calc(100vh - 200px)',
            width: '100%',
            overflow: 'hidden', }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          searchText={searchText}
          currentPage={currentPage}
          checkboxSelection
          sx={{
          border: 0,
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell.Mui-selected': {
          outline: 'none !important'
          },
          '& .MuiDataGrid-row.Mui-selected': {
          outline: 'none !important',
          border: 'none !important'
          }
          }}
        />
      </Paper>
    </div>
    </>
  )
}

export default Dashboard
