'use client'


import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './pageStyle.css';
import { faKey, faSignOutAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';


const AdminSidebar = ({ isSidebarActive }) => {

    const [userss, setUserss] = useState([])

    useEffect(() => {
        apiFetch();
    }, [])

    const apiFetch = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/group-names-id`);
        const data = await res.json();
        setUserss(data);
    }

    const [clickedButtons, setClickedButtons] = useState(new Array(userss.length).fill(false));



    const handleClick = (index) => {
        const updatedClickedButtons = [...clickedButtons];
        updatedClickedButtons[index] = !updatedClickedButtons[index];
        setClickedButtons(updatedClickedButtons);
    };


    const formatString = (str) => {
        const words = str.split('_');

        const formattedWords = words.map((word) => {
            const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            return capitalizedWord;
        });

        return formattedWords.join(' ');
    };


    return (
        <nav id="sidebar" className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
            <div className="sidebar-header mt-2">
                <div></div>
                <div className="media d-flex">
                    <img
                        className="rounded-circle mt-2"
                        src="https://atik.urbanitsolution.com/web_content/img/user.png"
                        alt=""
                        width="50"
                        height="50"
                    />

                    <Dropdown>
                        <Dropdown.Toggle className='text-start text-white border-0' variant="none" id="dropdown-basic">
                            <div className='sideLine'>
                                <h6 className='mt-1'>
                                    <span className='admin-text'>পাঠশালা স্কুল এন্ড কলেজ</span>
                                    <p className='admin-subtext'>admin</p>
                                </h6>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className=' mt-2 ms-2'>
                            <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/users/users_edit/2">
                                <FontAwesomeIcon icon={faUserEdit} />  Edit Profile
                            </Dropdown.Item>
                            <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/users/change_password/2">
                                <FontAwesomeIcon icon={faKey} />  Change Password
                            </Dropdown.Item>
                            <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/login/logout">
                                <FontAwesomeIcon icon={faSignOutAlt} />  Log Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>




            <ul className="text-white">
                <button className='dashboard p-2 '>
                    <Link className='' href='/Admin/dashboard'>Dashboard</Link>
                </button>
                {userss?.map((group, index) => (
                    <li key={group?.page_group_id}>
                        <button
                            className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''}`}
                            onClick={() => handleClick(index)}
                        >
                            <a
                                href={`#${group?.page_group}`}
                                data-toggle="collapse"
                                aria-expanded="false"
                            >
                                <div className="d-flex justify-content-between">
                                    {formatString(group?.page_group)}
                                    <div>
                                        {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
                                    </div>
                                </div>
                            </a>
                            <ul className="collapse list-unstyled" style={{ background: '#3b5998' }} id={group?.page_group}>

                                <li>

                                    {group?.controllers?.map((d, index) => (
                                        <div key={d.controller_name}>
                                            <a href={`#${group.page_group}-${d.controller_name}`} data-toggle="collapse" aria-expanded="false" className=" borderBottom" >
                                                {/* border-bottom  */}
                                                <div className='d-flex justify-content-between'>
                                                    {formatString(d.controller_name)}
                                                    <div>
                                                        {clickedButtons ? <FaAngleDown /> : <FaAngleRight />}
                                                    </div>
                                                </div>
                                            </a>
                                            <ul className="collapse list-unstyled " style={{ background: '#314B81' }} id={`${group.page_group}-${d.controller_name}`}>

                                                <li>
                                                    {d.display_names.map((displayName, displayNameIndex) => (
                                                        // border-bottom

                                                        <Link
                                                            className='border-bottom1'
                                                            key={displayName}
                                                            href={`/Admin/${d?.controller_name}/${displayName.method_names}?page_group=${group?.page_group}`}
                                                        >

                                                            {displayName.display_name}

                                                        </Link>

                                                    ))}
                                                </li>



                                            </ul>
                                        </div>
                                    ))}
                                </li>
                            </ul>
                        </button>
                    </li>
                ))}
            </ul>





        </nav>
    );
}

export default AdminSidebar;
