import { useEffect, useState } from "react";
import { FiX, FiCalendar } from "react-icons/fi";
import React from 'react';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
// import {auth} from "../firebase/firebase";
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import {db} from "../firebase/firebase";
import { getDoc, doc, updateDoc} from "firebase/firestore"
import toast from "react-hot-toast";

export default function UpdateItem() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState("");
  const [showCalendarneed, setShowCalendarneed] = useState(false);
  const [dateneed, setDateneed] = useState("");
  
    const [formData, setformData] = useState({
        Email: "",
        password: "",
        Request: "",
        Area : "" ,
        Date : "",
        NeedDate: "" ,
        price: "" ,
        totalprice: "" ,
        materials: "" 
    });

    const fetchUsers = async () =>{
        try {
            const res = await getDoc(doc(db, "users", id));
            if (res.exists()) {
                setformData(res.data())
            } else {
                console.log(("No such document found"));
            }
            
        } catch (error) {
            console.error(error.massage)
        }
    };
    
    useEffect(() => {
      fetchUsers()
    }, [id])

    const handelInputChange = (event) => {
        const {name , value} = event.target;
        setformData({
            ...formData,
            [name]:value
        })
    };

     const handleSubmit = async (e) => {
        e.preventDefault()
        const isEmptyField = Object.values(formData).some(value => value.trim() === "");
        if (isEmptyField) {
          toast.error("All fields are required",{
            icon: "⚠️"
          });
          return;
        }
        console.log(formData);
        try{
          // const response =  await createUserWithEmailAndPassword(auth, formData.Email ,formData.password , formData.Request , formData.Area , formData.Date , formData.NeedDate , formData.price , formData.totalprice , formData.materials);
          const response =  await updateDoc(doc(db, "users" , id) , formData);
          console.log("data" , response);
          toast.success("Edited successfully!");
          navigate("/")
        }catch(error){
          console.log(error.massage);
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-[#0D0D5E] text-white w-full max-w-5xl p-6 md:p-10 rounded-md grid grid-cols-1 md:grid-cols-3 gap-8 relative min-h-[600px]">
        <Link to={"/"} className="absolute text-xl text-white top-4 right-4">
          <FiX />
        </Link>

        <div className="flex flex-col justify-between col-span-1">
          <h2 className="mb-4 text-3xl font-light">
            Update a Item
          </h2>

          <div className="flex flex-col gap-3 mt-auto">
            <Link to={"/"} className="w-full text-center px-6 py-2 text-white bg-transparent border rounded-md border-fuchsia-600">
              Cancel
            </Link>
            <Link onClick={handleSubmit} className= "text-center w-full px-6 py-2 text-white rounded-md bg-fuchsia-700">
              Update
            </Link>
          </div>
        </div>

        <div className="grid col-span-1 gap-3 md:col-span-2">
          <div>
            <label htmlFor="Area" className="text-sm">Area</label>
             <input  list="list"
                type="text"
                name="Area" 
                id="Area"
                onChange={handelInputChange} value={formData.Area}
                placeholder="Area"
                className="w-full p-2 mt-1 bg-transparent border border-white rounded-md"
              />
              <datalist id="list" className="w-full">
                <option value="Egypt">Egypt</option>
                <option value="italia">italia</option>
                <option value="Reyab">Reyab</option>
                
            </datalist>
            {/* <select id="list" className="w-full p-2 mt-1 bg-transparent border border-white rounded-md">
              <option className="bg-[#0D0D5E]">Area</option>
              <option className="bg-[#0D0D5E]">Egypt</option>
            </select> */}
          </div>

          <div className="flex w-full gap-3.5">

            <div className="w-full">
              <label htmlFor="Request" className="text-sm">Item Name</label>
              <input
                type="text"
                name="Request" 
                id="Request"
                onChange={handelInputChange} value={formData.Request}
                placeholder="Item Name"
                className="w-full p-2 mt-1 bg-transparent border border-white rounded-md"
              />
            </div>

            <div className="w-full">
              <label htmlFor="Email" className="text-sm">Email</label>
              <input
                type="email"
                name="Email" 
                id="Email"
                onChange={handelInputChange} value={formData.Email}
                placeholder="Email Address"
                className="w-full p-2 mt-1 bg-transparent border border-white rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-sm">Password</label>
            <input
              type="password"
              name="password" 
              id="password"
               onChange={handelInputChange} value={formData.password}
              placeholder="Password"
              className="w-full p-2 mt-1 bg-transparent border border-white rounded-md"
            />
          </div>

          <div className="flex w-full gap-3.5">

                    <div className="w-full">
                      <label htmlFor="Date" className="text-sm">Date</label>
                      <div className="relative mt-1">
                        <input
                        type="text"
                          value={date}
                          name="Date" 
                          id="Date"
                          onChange={handelInputChange}
                          //  value={formData.Date}
                          onClick={() => setShowCalendar(!showCalendar)}
                          readOnly
                          placeholder="Date"
                          className="w-full p-2 pr-10 bg-transparent border border-white rounded-md cursor-pointer"
                        />
                        <FiCalendar className="absolute text-white -translate-y-1/2 right-3 top-1/2" />
                        {showCalendar && (
                          <div className="absolute z-10 top-full mt-2 bg-[#0D0D5E] border border-white rounded-md p-4 w-64">
                            <div className="flex justify-between mb-2 text-sm">
                              <span className="font-bold">SEPTEMBER</span>
                              <span>2017</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-sm">
                              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                                <div key={i} className="font-bold text-center">{d}</div>
                              ))}
                              {Array.from({ length: 30 }).map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => {
                                    const selectedDate = `September ${i + 1}`;
                                    setDate(selectedDate);
                                    setformData(prev => ({ ...prev, Date: selectedDate }));
                                    setShowCalendar(false);
                                    // setDate(`September ${i + 1}`);
                                    // setShowCalendar(false);
                                    // handelInputChange({value : `September ${i + 1}`})
                                    
                                  }}
                                  className="py-1 text-center rounded-md hover:bg-green-500"
                                >
                                  {i + 1}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full">
                      <label htmlFor="NeedDate" className="text-sm">Date Need</label>
                      <div className="relative mt-1">
                        <input
                          value={dateneed}
                          name="NeedDate" 
                          id="NeedDate"
                          onChange={handelInputChange} 
                          // value={formData.NeedDate}
                          onClick={() => setShowCalendarneed(!showCalendar)}
                          readOnly
                          placeholder="Date Need"
                          className="w-full p-2 pr-10 bg-transparent border border-white rounded-md cursor-pointer"
                        />
                        <FiCalendar className="absolute text-white -translate-y-1/2 right-3 top-1/2" />
                        {showCalendarneed && (
                          <div className="absolute z-10 top-full mt-2 bg-[#0D0D5E] border border-white rounded-md p-4 w-64">
                            <div className="flex justify-between mb-2 text-sm">
                              <span className="font-bold">SEPTEMBER</span>
                              <span>2017</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-sm">
                              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                                <div key={i} className="font-bold text-center">{d}</div>
                              ))}
                              {Array.from({ length: 30 }).map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => {
                                    // setDateneed(`September ${i + 1}`);
                                    // setShowCalendarneed(false);
                                    const selectedNeedDate = `September ${i + 1}`;
                                    setDateneed(selectedNeedDate);
                                    setformData(prev => ({ ...prev, NeedDate: selectedNeedDate }));
                                    setShowCalendarneed(false);
                                  }}
                                  className="py-1 text-center rounded-md hover:bg-green-500"
                                >
                                  {i + 1}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>


          </div>

          <div className="flex w-full gap-3.5">
            <div>
            <label htmlFor="price" className="text-sm">Price</label>
            <input
              type="number"
              name="price" 
              id="price"
              onChange={handelInputChange} value={formData.price}
              className="w-full p-2 mt-1 text-3xl bg-transparent border border-white rounded-md"
              defaultValue={0}
            />
          </div>
            <div>
            <label htmlFor="totalprice" className="text-sm">TotalPrice</label>
            <input
              type="number"
              name="totalprice" 
              id="totalprice"
              onChange={handelInputChange} value={formData.totalprice}
              className="w-full p-2 mt-1 text-3xl  bg-transparent border border-white rounded-md"
              defaultValue={0}
            />
          </div>
          </div>

          <div>
            <label htmlFor="materials" className="text-sm">Number of Units</label>
            <input
              type="number"
              name="materials" 
              id="materials"
              onChange={handelInputChange} value={formData.materials}
              className="w-full p-2 mt-1 text-3xl text-right bg-transparent border border-white rounded-md"
              defaultValue={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
