import {useEffect, useState} from "react";
import moment from "moment";
import baseURL from "../../baseURL";


export default function TeachersDetails() {
    const [tableData, setTableData] = useState([])

    const [teacher, setTeacher] = useState({
        nic:"",
        name:"",
        birthday:"",
        contact:"",
        address:"",
        email:""
    })

    useEffect(() => {
        fetch(baseURL+'getteacher')
            .then(response => response.json())
            .then(data => setTableData(data.teacher))
            .catch(err => console.error(err));
    }, [teacher])

    const newTeacher = () => {
        fetch(baseURL +'setteacher', {
            method: 'POST',
            body: JSON.stringify({
                nic:teacher.nic,
                name:teacher.name,
                birthday:teacher.birthday,
                contact:teacher.contact,
                address:teacher.address,
                email:teacher.email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
    const updateTeacher = () => {
        console.log("as",teacher.nic)
        fetch(baseURL +'updateteacher/' + teacher.nic, {
            method: 'PUT',
            body: JSON.stringify({
                name:teacher.name,
                birthday:teacher.birthday,
                contact:teacher.contact,
                address:teacher.address,
                email:teacher.email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
    const removeTeacher = () => {
        fetch(baseURL +'delteacher/' + teacher.nic, {
            method: 'DELETE',
        });
    }

    useEffect(() => {
    }, [])
    return (
        <div>
            <div>
                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200" />
                    </div>
                </div>

                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">

                        <div className="mt-5 md:mt-0 md:col-span-1">
                            <form action="#" method="POST">
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white items-center sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="nic" className="block text-sm font-medium text-gray-700">
                                                    NIC
                                                </label>
                                                <input
                                                    type="text"
                                                    name="nic"
                                                    id="nic"
                                                    value={teacher.nic}
                                                    onChange={(e)=>setTeacher({...teacher, nic: e.target.value})}
                                                    autoComplete="nic"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-6">
                                                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                                                    Full name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="full-name"
                                                    id="full-name"
                                                    value={teacher.name}
                                                    onChange={(e)=>setTeacher({...teacher, name: e.target.value})}
                                                    autoComplete="full-name"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-1"/>

                                            <div className="col-span-6 sm:col-span-4">
                                                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                                    Birth Day
                                                </label>
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    id="birthday"
                                                    value={teacher.birthday}
                                                    onChange={(e)=>setTeacher({...teacher, birthday: e.target.value})}
                                                    autoComplete="birthday"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                                    Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    value={teacher.address}
                                                    onChange={(e)=>setTeacher({...teacher, address: e.target.value})}
                                                    autoComplete="address"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                                                    Telphone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="contact"
                                                    id="contact"
                                                    value={teacher.contact}
                                                    onChange={(e)=>setTeacher({...teacher, contact: e.target.value})}
                                                    autoComplete="contact"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={teacher.email}
                                                    onChange={(e)=>setTeacher({...teacher, email: e.target.value})}
                                                    autoComplete="email"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="grade1"
                                                        name="grade1"
                                                        type="radio"
                                                        onSelect={true}
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                    />
                                                    <label htmlFor="grade1" className="ml-3 block text-sm font-medium text-gray-700">
                                                        Grade 1
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="grade2"
                                                        name="grade2"
                                                        type="radio"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                    />
                                                    <label htmlFor="grade2" className="ml-3 block text-sm font-medium text-gray-700">
                                                        Grade 2
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="grade3"
                                                        name="grade3"
                                                        type="radio"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                    />
                                                    <label htmlFor="grade3" className="ml-3 text-sm font-medium text-gray-700">
                                                        Grade 3
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="grade4"
                                                        name="grade4"
                                                        type="radio"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                    />
                                                    <label htmlFor="grade4" className="ml-3 text-sm font-medium text-gray-700">
                                                        Grade 4
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="grade5"
                                                        name="grade5"
                                                        type="radio"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                    />
                                                    <label htmlFor="grade5" className="ml-3 text-sm font-medium text-gray-700">
                                                        Grade 5
                                                    </label>
                                                </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                Subject
                                            </label>
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option>Maths</option>
                                                <option>English</option>
                                                <option>Sinhala</option>
                                                <option>Tamil</option>
                                                <option>Buddhism</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            onClick={removeTeacher}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={updateTeacher}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={newTeacher}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="md:col-span-2">
                            <div className="px-4 sm:px-0">
                                <div className="flex flex-col">
                                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            NIC
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Name
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Age
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Contact
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Address
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                    {tableData.map((person) => (
                                                        <tr key={person.nic}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                <span
                                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {person.nic}
                      </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="text-sm text-gray-900">
                                                                        {person.name}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 items-center  whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    {moment(person.birthday).fromNow().replace('ago','')}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 items-center whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{"+94 "+ person.contact}</div>
                                                                <div className="text-sm text-gray-500">{person.email}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-500">{person.address}</div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200" />
                    </div>
                </div>
            </div>
            </div>

    )
}
