import baseURL from "../../baseURL";
import {useEffect, useState} from "react";

const TimeTable = () => {

    const [tableData, setTableData] = useState([])
    const [teacher, setTeacher] = useState([])
    const [timeTable, setTimeTable] = useState({
        id: "",
        name: "",
        grade: 'grade1',
        teacher: "",
    })
    const [classes, setClass] = useState([])


    useEffect(() => {
        fetch(baseURL + 'gettimetable')
            .then(response => response.json())
            .then(data => {
                setTableData(data.timetable)
            })
            .catch(err => console.error(err));
        fetch(baseURL + 'getteacher')
            .then(response => response.json())
            .then(data => {
                setTeacher(data.teacher)
            })
            .catch(err => console.error(err));
        fetch(baseURL + 'getclass')
            .then(response => response.json())
            .then(data => {
                setClass(data.classes)
            })
            .catch(err => console.error(err));
    }, [])

    const newClass = () => {
        fetch(baseURL + 'setclass', {
            method: 'POST',
            body: JSON.stringify({
                id: timeTable.grade + timeTable.name,
                name: timeTable.name,
                grade: timeTable.grade,
                teacher: timeTable.teacher,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
    const updateClass = () => {
        fetch(baseURL + 'updateclass/' + timeTable.grade + timeTable.name, {
            method: 'PUT',
            body: JSON.stringify({
                name: timeTable.name,
                grade: timeTable.grade,
                teacher: timeTable.teacher
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
    const removeClass = () => {
        fetch(baseURL + 'delclass/' + timeTable.grade + timeTable.name, {
            method: 'DELETE',
        });
    }

    useEffect(() => {
    }, [tableData])
    return (
        <div>
            <div>
                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200"/>
                    </div>
                </div>

                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">

                        <div className="mt-5 md:mt-0 md:col-span-1">
                            <form action="" method="">
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white items-center sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="country"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Class
                                                </label>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country-name"
                                                    value={timeTable.grade}
                                                    onChange={(v) =>
                                                        setTimeTable({...timeTable, grade: v.target.value})}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    {classes.map((v) => (
                                                        <option value={v.id}>{v.id}</option>
                                                    ))}

                                                </select>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">

                                                <label htmlFor="teacher"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Day
                                                </label>
                                                <select
                                                    id="teacher"
                                                    name="teacher"
                                                    autoComplete="teacher"
                                                    value={timeTable.teacher}
                                                    onChange={(e) => setTimeTable({
                                                        ...timeTable,
                                                        teacher: e.target.value
                                                    })}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option>{"Monday"}</option>
                                                    <option>{"Tuesday"}</option>
                                                    <option>{"Wednesday"}</option>
                                                    <option>{"Thursday"}</option>
                                                    <option>{"Friday"}</option>
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            onClick={removeClass}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={updateClass}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={newClass}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Save
                                        </button>

                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="md:col-span-2">

                        </div>
                    </div>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200"/>
                    </div>
                </div>
            </div>
            <div className="px-4 sm:px-0">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div
                                className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Class Room
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            7.50-8.30
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            8.30 - 9.10
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            9.10 - 9.50
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            9.50 - 10.30
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            11.00 - 11.40
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            11.40 - 12.20
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            12.20 - 12.50
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            12.50 - 1.30
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {tableData.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                <span
                                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {item.class_room}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-sm text-gray-900">
                                                        {item.first_period}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 items-center  whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {item.second_period}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 items-center whitespace-nowrap">
                                                <div
                                                    className="text-sm text-gray-900">{item.third_period}</div>
                                            </td>
                                            <td className="px-6 py-4 items-center whitespace-nowrap">
                                                <div
                                                    className="text-sm text-gray-900">{item.fourth_period}</div>
                                            </td>
                                            <td className="px-6 py-4 items-center whitespace-nowrap">
                                                <div
                                                    className="text-sm text-gray-900">{item.fifth_period}</div>
                                            </td>
                                            <td className="px-6 py-4 items-center whitespace-nowrap">
                                                <div
                                                    className="text-sm text-gray-900">{item.six_period}</div>
                                            </td>
                                            <td className="px-6 py-4 items-center whitespace-nowrap">
                                                <div
                                                    className="text-sm text-gray-900">{item.seventh_period}</div>
                                            </td>
                                            <td className="px-6 py-4 items-center whitespace-nowrap">
                                                <div
                                                    className="text-sm text-gray-900">{item.eighth_period}</div>
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
    )
}

export default TimeTable;