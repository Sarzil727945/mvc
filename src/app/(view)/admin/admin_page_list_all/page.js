'use client'
import '../../admin_layout/modal/fa.css'
import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { useState } from 'react';
import '../userStyle.css'
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import { getAllAdminData } from '@/api/adminPage';


const AdminPageListA = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        allAdminData()
    }, [])

    const allAdminData = () => {
        getAllAdminData().then(data => {
            setUsers(data)
            setLoading(false)
        })
    }

    const parentUsers = users.filter((users) => users.parent_id === 0);

    const itemsPerPage = 20;

    const [currentPage, setCurrentPage] = useState(0);

    const pageCount = Math.ceil(parentUsers?.length / itemsPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data?.selected);
    };

    const slicedItems = parentUsers?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );


    const editIcon = []
    const copyIcon = []
    const deleteIcon = []

    for (let index = 0; index < slicedItems.length; index++) {
        const element = slicedItems[index];
        const allChildren = users.filter(u => u?.parent_id === element?.id)
        const editAll = allChildren.filter(edit => edit?.method_sort === 3)
        const copyAll = allChildren.filter(copy => copy?.method_sort === 4)
        const deleteAll = allChildren.filter(d => (d?.method_sort) === 5)
        editIcon.push(editAll)
        copyIcon.push(copyAll)
        deleteIcon.push(deleteAll)

    }

    const handleDelete = (id) => {

        const proceed = window.confirm('Are you sure you want to delete?');
        if (proceed) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/allAdmin/${id}`, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.affectedRows > 0) {
                        Swal.fire({
                            title: 'Delete!',
                            text: 'User deleted successfully!',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                        });
                    }
                    allAdminData()
                })
        }

        // }

    };


    console.log(slicedItems);

    return (
        <div className='p-3'>
            <div className=" mx-auto">
                <section className=" border  rounded mx-auto">
                    <li className="list-group-item text-light  p-1 px-4" aria-current="true" style={{ background: '#4267b2' }}>
                        <div className='d-flex justify-content-between'>
                            <h5 > Users List</h5>
                            <button style={{ background: '#17a2b8' }} className='border-0 text-white shadow-sm rounded-1'><Link href='/Admin/admin_page_list/admin_page_list_create'>Create Admin Page List</Link></button>
                        </div>
                    </li>
                    <Table responsive="lg">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Display Name</th>
                                <th>Controller Name</th>
                                <th>Page Group</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                slicedItems?.map((adminPageAll, index) =>
                                    <tr key={adminPageAll.id} >
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <p className=" text-sm">
                                                {adminPageAll.display_name}
                                            </p>
                                        </td>

                                        <td>
                                            <p className=" text-sm">
                                                {adminPageAll.controller_name}
                                            </p>
                                        </td>

                                        <td>
                                            <p className=" text-sm">
                                                {adminPageAll.page_group}
                                            </p>
                                        </td>
                                        <td>
                                            <div className="flex items-center">
                                                {
                                                    editIcon[index]?.map((e, i) =>
                                                        <Link key={e?.id} href={`/Admin/admin_page_list/admin_page_list_edit/${adminPageAll.id}?page_group=${adminPageAll.page_group}`}>
                                                            <button
                                                                title='Edit'
                                                                style={{ width: "35px ", height: '30px', marginLeft: '2px' }}
                                                                className={e?.btn}
                                                            >
                                                                <div>
                                                                    <span
                                                                        dangerouslySetInnerHTML={{ __html: e?.icon }}
                                                                    ></span>
                                                                </div>

                                                            </button>
                                                        </Link>

                                                    )
                                                }
                                                {
                                                    copyIcon[index]?.map((c, i) =>
                                                        <Link key={c?.id} href={`/Admin/admin_page_list/admin_page_list_copy/${adminPageAll.id}?page_group=${adminPageAll.page_group}`}>
                                                            <button
                                                                title='Copy' style={{ width: "35px ", height: '30px', marginLeft: '2px' }}
                                                                className={c?.btn}
                                                            >
                                                                <div>
                                                                    <span
                                                                        dangerouslySetInnerHTML={{ __html: c?.icon }}
                                                                    ></span>
                                                                </div>

                                                            </button>
                                                        </Link>

                                                    )
                                                }
                                                {
                                                    deleteIcon[index]?.map((d, i) =>
                                                        <button
                                                            key={d?.id}
                                                            title='Delete'
                                                            onClick={() => handleDelete(adminPageAll.id)}
                                                            style={{ width: "35px ", height: '30px', marginLeft: '2px' }}
                                                            className={d?.btn}
                                                        >
                                                            <div>
                                                                <span
                                                                    dangerouslySetInnerHTML={{ __html: d?.icon }}
                                                                ></span>
                                                            </div>

                                                        </button>

                                                    )
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }


                            {
                                loading && <tr className='text-center'>
                                    <td colSpan='100%' className='my-5 py-5 border-bottom-0 '>
                                        <div className=' my-5 py-5'>
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </section>
            </div>
            <div className=" mt-5 ">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>




        </div>
    );
};

export default AdminPageListA;




