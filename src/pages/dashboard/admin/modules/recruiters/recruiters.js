import { useState } from "react";
import { Search, Filter, MoreVertical } from "lucide-react";
import Navbar from "../../components/Navbar";
import RecruitersTable from "../../components/recruiterstable";


export default function Recruiters() {
    const [searchTerm, setSearchTerm] = useState("");

const recruiters = [
    { id: 1, name: "Rahul Sharma", company: "TCS", email: "Rahul.sharma@tcs.com", phone: "9876543210", status: "Active", completion: 85 },
    { id: 2, name: "Priya Patel", company: "Infosys", email: "priya.patel@infosys.com", phone: "9867543210", status: "Pending", completion: 60 },
    { id: 3, name: "Rahul Verma", company: "Wipro", email: "rahul.verma@wipro.com", phone: "9845543210", status: "Inactive", completion: 40 },
    { id: 4, name: "Sneha Nair", company: "HCL", email: "sneha.nair@hcl.com", phone: "9836543210", status: "Active", completion: 90 },
    { id: 5, name: "Aniket Joshi", company: "Capgemini", email: "aniket.joshi@capgemini.com", phone: "9823543210", status: "Pending", completion: 50 },
    { id: 6, name: "Meera Iyer", company: "Tech Mahindra", email: "meera.iyer@techm.com", phone: "9817543210", status: "Inactive", completion: 35 },
    { id: 7, name: "Vikram Singh", company: "Accenture", email: "vikram.singh@accenture.com", phone: "9806543210", status: "Active", completion: 88 },
    { id: 8, name: "Pooja Mishra", company: "Deloitte", email: "pooja.mishra@deloitte.com", phone: "9796543210", status: "Active", completion: 92 },
    { id: 9, name: "Rohan Das", company: "IBM India", email: "rohan.das@ibm.com", phone: "9786543210", status: "Pending", completion: 45 },
    { id: 10, name: "Kavita Saxena", company: "L&T Infotech", email: "kavita.saxena@lntinfotech.com", phone: "9776543210", status: "Inactive", completion: 30 },
    { id: 11, name: "Manoj Kumar", company: "Cognizant", email: "manoj.kumar@cognizant.com", phone: "9766543210", status: "Active", completion: 85 },
    { id: 12, name: "Swati Reddy", company: "Mindtree", email: "swati.reddy@mindtree.com", phone: "9756543210", status: "Active", completion: 87 },
    { id: 13, name: "Gaurav Pandey", company: "Oracle India", email: "gaurav.pandey@oracle.com", phone: "9746543210", status: "Pending", completion: 55 },
    { id: 14, name: "Neha Kapoor", company: "Adobe India", email: "neha.kapoor@adobe.com", phone: "9736543210", status: "Inactive", completion: 25 },
    { id: 15, name: "Suresh Raina", company: "Google India", email: "suresh.raina@google.com", phone: "9726543210", status: "Active", completion: 98 },
    { id: 16, name: "Deepika Chauhan", company: "Microsoft India", email: "deepika.chauhan@microsoft.com", phone: "9716543210", status: "Pending", completion: 65 },
    { id: 17, name: "Arun Kumar", company: "Amazon India", email: "arun.kumar@amazon.com", phone: "9706543210", status: "Active", completion: 80 },
    { id: 18, name: "Shweta Mehta", company: "Flipkart", email: "shweta.mehta@flipkart.com", phone: "9696543210", status: "Active", completion: 75 },
    { id: 19, name: "Rajesh Yadav", company: "Paytm", email: "rajesh.yadav@paytm.com", phone: "9686543210", status: "Inactive", completion: 35 },
    { id: 20, name: "Tanvi Desai", company: "Zomato", email: "tanvi.desai@zomato.com", phone: "9676543210", status: "Active", completion: 82 }
];


    return (

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Navbar */}
            <Navbar />


            <div className="pt-24 p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
               

                {/* Grid Layout - 3 Columns (Filters) | 9 Columns (Table) */}
                <div className="grid grid-cols-12 gap-6 ">
                    {/* Filter Section (3 Columns) */}
                    <div className="col-span-12 md:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-3xl ">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Filters</h3>

                        {/* Search Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Search Recruiters</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full p-2.5 pr-10 pl-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full border border-gray-300 dark:border-gray-600"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-500 dark:text-gray-300" />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Status</label>
                            <select className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600">
                                <option>All</option>
                                <option>Active</option>
                                <option>Pending</option>
                                <option>Inactive</option>
                            </select>
                        </div>

                        {/* Company Filter */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Company</label>
                            <select className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600">
                                <option>All</option>
                                <option>ABC Corp</option>
                                <option>XYZ Ltd</option>
                                <option>Global Recruiters</option>
                            </select>
                        </div>
                    </div>

                    {/* Data Table Section (9 Columns) */}
                    <div className="col-span-12 md:col-span-9 bg-white dark:bg-gray-800 p-6 rounded-3xl ">

                       
                            {/* <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Recruiters List</h3> */}
                           
                    {/* Bulk Actions */}

            {/* <div className="flex justify-between items-center mb-4">
                <div className=" flex space-x-2 ">
                    <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Enable All</button>
                    <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Disable All</button>

                </div>
                <div className="flex items-center gap-1">

                    <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Import</button>
                    <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-900 dark:border-gray-700">Export</button>

                </div>
            </div> */}



                         <RecruitersTable recruiters={recruiters} />


                    </div>
                </div>
            </div>

        </div>



    );
}
