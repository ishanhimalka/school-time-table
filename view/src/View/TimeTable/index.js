const TimeTable = () => {
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
                            <form action="#" method="POST">
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white items-center sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="name"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={classes.name}
                                                    onChange={(e) => setClass({...classes, name: e.target.value})}
                                                    autoComplete="name"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="country"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Grade
                                                </label>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country-name"
                                                    value={classes.grade}
                                                    onChange={(v) =>
                                                        setClass({...classes, grade: v.target.value})}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option value={"grade1"}>Grade 1</option>
                                                    <option value={'grade2'}>Grade 2</option>
                                                    <option value={'grade3'}>Grade 3</option>
                                                    <option value={'grade4'}>Grade 4</option>
                                                    <option value={'grade5'}>Grade 5</option>

                                                </select>
                                            </div>
                                            <div className="col-span-6 sm:col-span-6">

                                                <label htmlFor="teacher"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Class
                                                </label>
                                                <select
                                                    id="teacher"
                                                    name="teacher"
                                                    autoComplete="teacher"
                                                    value={classes.teacher}
                                                    onChange={(e) => setClass({...classes, teacher: e.target.value})}
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    {teacher.map((v) => (
                                                        <option value={v.name}>{v.name}</option>
                                                    ))}


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
                                                            ID
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
                                                            Grade
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Teacher
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
                                                    {item.id}
                      </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="text-sm text-gray-900">
                                                                        {item.name}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 items-center  whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    {item.grade}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 items-center whitespace-nowrap">
                                                                <div
                                                                    className="text-sm text-gray-900">{item.teacher}</div>
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
                        <div className="border-t border-gray-200"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeTable;