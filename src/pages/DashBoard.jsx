import { useState } from 'react';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import 'flowbite';
import CustomHeader from '../components/Navbar';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'requestNo', headerName: 'Request No', width: 130 },
  { field: 'area', headerName: 'Area', width: 130 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'needDate', headerName: 'Need Date', width: 130 },
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

       renderCell: () => {
      return(
      <div class="flex justify-end px-4 pt-4 z-40">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span class="sr-only">Open dropdown</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
        <div id="dropdown" class="z-30 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul class="py-2" aria-labelledby="dropdownButton">
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
      </div>




    
    </div>)
    }
    },

];




const rows = [
  { id: 1, requestNo : "Rq556671", area: 'North Shore', date: 'September 28', needDate: "September 28" , price: "$35 Us" , totalprice: "$235 Us" , materialsproducts: 35 },
  { id: 2, requestNo : "Rq556672", area: 'california', date: 'September 28', needDate: "September 28" , price: "$35 Us" , totalprice: "$235 Us" ,  materialsproducts: 42 },
  { id: 3, requestNo : "Rq556673", area: 'Nevada', date: 'September 28', needDate: "September 28" , price: "$35 Us" , totalprice: "$235 Us" ,  materialsproducts: 45 },
  { id: 4, requestNo : "Rq556674", area: 'London', date: 'September 28', needDate: "September 28" , price: "$35 Us" , totalprice: "$235 Us" ,  materialsproducts: 16 },
  { id: 5, requestNo : "Rq556675", area: 'lreland', date: 'September 28', needDate: "September 28" , price: "$35 Us" , totalprice: "$235 Us" ,  materialsproducts: 62 },
  { id: 6, requestNo : "Rq556676", area: 'Nevada', date: "September 28", needDate: "September 28" , price: "$35 Us" , totalprice: "$235 Us" ,  materialsproducts: 150 },
  { id: 7, requestNo : "Rq556677", area: 'North', date: 'September 28', needDate: "September 28" , price: "$35 Us" , totalprice: "$235 Us" ,  materialsproducts: 44 },
  { id: 8, requestNo : "Rq556678", area: 'London', date: 'September 28', needDate: "September 28" , price: "$35 Us" , totalprice: "$235 Us" , materialsproducts: 36 },
  { id: 9, requestNo : "Rq556679", area: 'Roxie', date: 'September 28', needDate: "September 28" , price: "$35 Us" , totalprice: "$235 Us" ,  materialsproducts: 65 },
];

// const paginationModel = { page: 0, pageSize: 7 };



function Dashboard() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


    const filteredRows = rows.filter((row) => {
    const searchLower = searchText.toLowerCase();
    return (
      row.area.toLowerCase().includes(searchLower) ||
      row.requestNo.toLowerCase().includes(searchLower) ||
      row.date.toLowerCase().includes(searchLower) ||
      row.price.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
    <CustomHeader        
      onSearch={setSearchText}
      onPageChange={setCurrentPage}
    />
     <Paper className='m-auto mt-11' sx={{ height: 500, width: '90vw' }}>
      <DataGrid
        rows={filteredRows }
        columns={columns}
        // initialState={{ paginationModel: {pageSize: 5} }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        searchText={searchText}
        currentPage={currentPage}
        pageSizeOptions={[5, 10]}
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
    </>
  )
}

export default Dashboard
