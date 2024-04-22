import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";
import {
  listHostedZones,
  createDNSRecord,
  updateDNSRecord,
  deleteDNSRecord,
} from "../APIs/dnsAPIs"; // Import API functions
import { UserPlusIcon } from "@heroicons/react/24/solid";
import CreateDNSRecord from "./createDNSpopup";
import UpdateDNSRecord from "./updateDNSpopup";
import { ToastContainer } from "react-toastify";
import { useNavigate ,useLocation} from "react-router-dom";

// Define table header columns
const TABLE_HEAD = ["Domain Name", "Type", "Value", ""];

function Dashboard() {
  // State variables
  const [dnsRecords, setDNSRecords] = useState([]);
  const [isCreateOrUpdateDNSRecordOpen, setIsCreateOrUpdateDNSRecordOpen] =
    useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log(code)
  const navigate = useNavigate();
  const location = useLocation();
  const { title } = location.state || {};

  // Handle search input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fetch DNS records on component mount
  useEffect(() => {
    fetchDNSRecords();
  }, []);

  // Fetch DNS records from the API
  const fetchDNSRecords = async () => {
    try {
      console.log('code in fetch',code)
      const data = await listHostedZones(code);
      setDNSRecords(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Create or update DNS record
  const handleCreateOrUpdateDNSRecord = async (recordData, ttl) => {
    try {
      if (recordToUpdate) {
        await updateDNSRecord(recordToUpdate.id, recordData, ttl, code);
      } else {
        await createDNSRecord(recordData, code);
      }
      fetchDNSRecords();
      setIsCreateOrUpdateDNSRecordOpen(false); // Close the popup after successful creation or update
      setRecordToUpdate(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle update DNS record action
  const handleUpdateDNSRecord = (record) => {
    setRecordToUpdate(record);
    setIsCreateOrUpdateDNSRecordOpen(true);
  };

  // Handle delete DNS record action
  const handleDeleteDNSRecord = async (record) => {
    try {
      console.log('code in delete - ', code)
      await deleteDNSRecord(record.id, record, code);
      fetchDNSRecords(); // Refresh DNS records after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Main card container */}
      <Card className="h-full w-full bg-gradient-to-r from-gray-700 to-black">
        {/* Card header */}
        <CardHeader floated={false} shadow={false} className="rounded-none bg-gradient-to-r from-gray-700 to-black">
          <div className="flex items-center justify-between mb-4 ">
            {/* Buttons for adding record and navigating back */}
            <div className="w-1/3 ">
              <div className="flex flex-row justify-center p-4 mr-4 ">
                <Button
                  className="flex items-center gap-3 mr-4 bg-green-900"
                  size="sm"
                  onClick={() => setIsCreateOrUpdateDNSRecordOpen(true)}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4" />
                  Add Record
                </Button>
                <Button
                  className="flex items-center gap-3 bg-indigo-500"
                  size="sm"
                  onClick={() => navigate("/")}
                >
                  Back to Zone
                </Button>
              </div>
            </div>
            {/* Search input */}
            <div className="w-2/3">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-2/3" />}
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          {/* Title */}
          <div className="flex items-center justify-center text-4xl text-slate-500 p-4 text-white">
            <h1><b>{title}</b></h1>
          </div>
        </CardHeader>

        {/* Card body */}
        <CardBody className="overflow-scroll px-0 ">
          <table className="mt-4 w-full min-w-max table-auto text-left text-white">
            <thead>
              <tr>
                {/* Render table headers */}
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y p-4"
                  >
                    <Typography
                      variant="medium"
                      color="white"
                      className="font-medium leading-none opacity-90"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
                <th className="border-y p-4"></th>{" "}
              </tr>
            </thead>
            <tbody>
              {/* Render DNS records */}
              {dnsRecords?.length > 0 ? (
                (console.log(dnsRecords),
                dnsRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="p-4">{record.Name}</td>
                    <td className="p-4">{record.Type}</td>
                    <td className="p-4">{record.ResourceRecords[0].Value}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {/* Buttons for updating and deleting records */}
                        <Button
                          onClick={() => handleUpdateDNSRecord(record)}
                          size="sm"
                          className="bg-green-900"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => handleDeleteDNSRecord(record)}
                          size="sm"
                          color="red"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                )))
              ) : (
                <tr>
                  <td colSpan={TABLE_HEAD.length + 1} className="p-4">
                    {/* Render message if no DNS records found */}
                    <Typography
                      variant="normal"
                      color="white"
                      className="font-bold"
                    >
                      No DNS records available.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>

        {/* Render the CreateDNSRecord component as a popup */}
        {isCreateOrUpdateDNSRecordOpen && (
          <CreateDNSRecord
            onSubmit={handleCreateOrUpdateDNSRecord}
            onClose={() => setIsCreateOrUpdateDNSRecordOpen(false)}
          />
        )}

        {/* Render the UpdateDNSRecord component as a popup */}
        {recordToUpdate && (
          <UpdateDNSRecord
            initialDomainName={recordToUpdate.Name}
            initialRecordType={recordToUpdate.Type}
            initialRecordValue={recordToUpdate.ResourceRecords[0].Value}
            initialTTL={recordToUpdate.TTL}
            onSubmit={handleCreateOrUpdateDNSRecord}
            onClose={() => {
              setIsCreateOrUpdateDNSRecordOpen(false);
              setRecordToUpdate(null);
            }}
          />
        )}
      </Card>
    </>
  );
}

export default Dashboard;
