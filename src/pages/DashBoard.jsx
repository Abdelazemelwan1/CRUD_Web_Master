import * as React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import 'flowbite';
import { db} from "../firebase/firebase";
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import CustomHeader from '../components/Navbar';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Lottie from 'lottie-react';
import loooding from "./../loading.json"
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";




function Dashboard() {
    const [looding, setlooding] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);
   const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

    const fetchUsers = async () =>{
      const res = await getDocs(collection(db, "users"));
      const userList = res.docs.map(doc => ({ id: doc.id , ...doc.data()}))
      // setId(doc.id)
      console.log(userList);
      setUsers(userList)
      setlooding(false)
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
      row.area?.toLowerCase().includes(searchLower) ||
      row.requestNo?.toLowerCase().includes(searchLower) ||
      row.date?.toLowerCase().includes(searchLower) ||
      row.price?.toString() .toLowerCase().includes(searchLower)
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
    {field: 'update',headerName: 'Update', width: 80 , 
       renderCell: (params) => {
      return(
        <div className='flex justify-center items-center h-[100%] cursor-pointer text-[#00A558] text-lg' onClick={()=> handleUpdateUser(params.row)}><FiEdit /></div>

    )
    }
    },
    {field: 'delete',headerName: 'Delete', width: 80 , 

       renderCell: (params) => {
      return(
        <div className='flex justify-center items-center h-[100%] cursor-pointer text-red-800 text-2xl' onClick={()=> handleDelet(params.row)}><AiTwotoneDelete className='shadow-2xl' /></div>
    )
    }
    },

];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginationModel = { 
        page: currentPage - 1, 
        pageSize: pageSize 
    };
  const totalPages = Math.ceil(filteredRows.length / pageSize);

  if(looding){
    return <div><Lottie className='h-screen' animationData={loooding} /></div>
  }

  return (
    <>
     <CustomHeader        
      onSearch={setSearchText}
      onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        handleLogout={handleLogout}
        user={user}
    />
    <div className="p-5 lg:p-20 min-h-screen overflow-auto">
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
      <Paper className='m-auto mt-42 lg:mt-25' sx={{ height: 'calc(100vh - 270px)',
            width: '100%',
            overflow: 'scroll', }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          // pageSizeOptions={[5, 10]}
          searchText={searchText}
          currentPage={currentPage}
           paginationModel={paginationModel}
          onPaginationModelChange={(model) => {
              setCurrentPage(model.page + 1); // ✅ تحويل من zero-based إلى one-based
              setPageSize(model.pageSize);
          }}
          // pageSizeOptions={[5, 10, 20]}
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
