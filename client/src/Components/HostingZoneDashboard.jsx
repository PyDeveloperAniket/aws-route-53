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

import { UserPlusIcon } from "@heroicons/react/24/solid";
import CreateDomain from "./CreateDomainpopup";
import UpdateDNSRecord from "./updateDNSpopup";
import { ToastContainer } from "react-toastify";
import { listDomains, createDomain, deleteDomain } from "../APIs/domainAPIs";
import { useNavigate } from "react-router-dom";

// Define table headers
const TABLE_HEAD = ["Name", "ResourceRecordSetCount"];

function HostingZoneDashboard() {
  // State variables
  const [domainEntries, setdomainEntries] = useState([]);
  const [isCreateOrUpdateDNSRecordOpen, setIsCreateOrUpdateDNSRecordOpen] = useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fetch domains on component mount
  useEffect(() => {
    fetchDomains();
  }, []);

  // Fetch domains from the API
  const fetchDomains = async () => {
    try {
      const data = await listDomains();
      setdomainEntries(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to create or update a domain
  const handleCreateOrUpdateDomain = async (recordData, ttl) => {
    try {
      if (recordToUpdate) {
        await updateDomain(recordToUpdate.id, recordData, ttl);
      } else {
        await createDomain(recordData);
      }
      fetchDomains(); // Refresh domain list
      setIsCreateOrUpdateDNSRecordOpen(false); // Close the popup
      setRecordToUpdate(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to update a domain
  const handleUpdateDomain = (record) => {
    setRecordToUpdate(record);
    setIsCreateOrUpdateDNSRecordOpen(true); // Open the update DNS record popup
  };

  // Function to delete a domain
  const handleDeleteDomain = async (domainId) => {
    try {
      const hostedZoneId = domainId.split("/").pop();
      await deleteDomain(hostedZoneId);
      fetchDomains(); // Refresh domain list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  // Function to view records of a domain
  const handleviewRecords = (hostedZoneId, domainName) => {
    const domainId = hostedZoneId.split("/").pop(); // Extract the domain ID
    navigate(`/records?code=${encodeURIComponent(domainId)}`, { state: { title: domainName } });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 to-black">
        <Card className="max-w-7xl w-full bg-inherit-700">
          <CardHeader floated={false} shadow={false} className="rounded-none bg-inherit">
            <div className="flex items-center justify-between mb-4">
              <div className="w-1/3">
                {/* Button to open the create domain popup */}
                <Button
                  className="flex items-center gap-3 bg-green-900"
                  size="sm"
                  onClick={() => setIsCreateOrUpdateDNSRecordOpen(true)}
                >
                  <UserPlusIcon strokeWidth={2} className="h-5" />
                  Add Domain
                </Button>
              </div>
              <div className="w-2/3 flex my-3 text-white">
                {/* Search input */}
                <Input
                  bg-white
                  label="Search Your Domain"
                  icon={<MagnifyingGlassIcon className="h-5 w-2/3 text-white" />}
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </CardHeader>

          <CardBody className="overflow-hidden px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                {/* Table headers */}
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-y p-4">
                      <Typography
                        variant="medium"
                        color="white"
                        className="font-bold leading-none opacity-80"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                  <th className="border-y bg-inherit p-4"></th>{" "}
                </tr>
              </thead>
              <tbody>
                {/* Render domain entries */}
                {domainEntries?.length > 0 ? (
                  domainEntries.map((record, index) => (
                    <tr key={index}>
                      <td className="p-4 text-white">{record.Name}</td>
                      <td className="p-4 text-white">{record.ResourceRecordSetCount}</td>
                      <td className="flex gap-1 p-3">
                        {/* Render buttons based on record count */}
                        {record.ResourceRecordSetCount <= 2 ? (
                          <div className="mt-4 gap-2">
                            <Button
                              onClick={() => handleUpdateDomain(record)}
                              size="sm"
                              className="bg-green-900 mr-3"
                            >
                              Update
                            </Button>
                            <Button
                              onClick={() => handleDeleteDomain(record.Id)}
                              size="sm"
                              color="red"
                            >
                              Delete
                            </Button>
                          </div>
                        ) : (
                          <h2 className="mt-4 gap-2">
                            You can delete Zone only after deleting all records
                          </h2>
                        )}
                        <div className="p-4">
                          <Button
                            onClick={() => handleviewRecords(record.Id, record.Name)}
                            size="sm"
                            color="indigo"
                          >
                            View Records
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    {/* Render message when no domain records available */}
                    <td colSpan={TABLE_HEAD.length + 1} className="p-4">
                      <Typography
                        variant="small"
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

          {/* Render the CreateDomain component as a popup */}
          {isCreateOrUpdateDNSRecordOpen && (
            <CreateDomain
              onSubmit={handleCreateOrUpdateDomain}
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
              onSubmit={handleCreateOrUpdateDomain}
              onClose={() => {
                setIsCreateOrUpdateDNSRecordOpen(false);
                setRecordToUpdate(null);
              }}
            />
          )}
        </Card>
      </div>
    </>
  );
}

export default HostingZoneDashboard;
