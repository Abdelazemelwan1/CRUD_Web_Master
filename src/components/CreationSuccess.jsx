import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { GoCheck } from "react-icons/go";
import { Link, Navigate } from 'react-router-dom';

export default function CreationSuccess(){
    return(
        <>
        <main>
            <section className="bg-[#0c1445] p-3 w-[85%] md:w-[70%] h-[85%] md:h-[80%] absolute top-1/2 left-1/2 -translate-1/2 flex flex-col justify-between items-center">
                <Link to={"/"} className='self-end border rounded-full border-[#fff] w-fit text-[25px]'><IoCloseOutline className='text-[#fff]' /></Link>
                <div className='flex gap-[20px] md:gap-[40px] items-center' >
                    <div className=' border-3 rounded-full border-[#349367] p-[2px]' ><GoCheck className='text-[#349367] text-[50px] md:text-[70px]'/></div>
                    <div className='text-[#f7f8ff]'>
                        <h1 className='capitalize text-[25px] md:text-[30px] mb-[5px]'>creation succeded</h1>
                        <p className='text-[12px] md:text-[16px]'>Wait a few minutes while the<br/>informations is being validated</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[15px] w-full items-center mb-[30px]'>
                    <Link  className='rounded-md text-center capitalize border border-[#aa0094] w-2/3 md:w-1/3 p-[3px] text-[#fff]'>edit</Link>
                    <Link to={"/"} className='rounded-md text-center capitalize w-2/3 md:w-1/3 p-[3px] text-[#fff] bg-[#aa0094]'>close</Link>
                </div>
            </section>
        </main>
        </>
    )
}