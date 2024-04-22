import axios from "axios";

// Create an instance of axios with the base URL for Domain API
const DOMAINAPIs = axios.create({
  // baseURL: "http://localhost:8080/api/domain", // Local development base URL
  baseURL: `https://aws-dashboard.onrender.com/api/domain`, // Production base URL
});

// Function to list all domains
export async function listDomains() {
  try {
    // Send a GET request to retrieve all domains
    const response = await DOMAINAPIs.get("/domains");
    // Extract and return the hosted zones from the response data
    return response.data.hostedZones;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error('error in receiving msgs - ', error.message);
  }
}

// Function to create a new domain
export async function createDomain(domainData) {
  try {
    // Send a POST request to create a new domain with provided data
    const response = await DOMAINAPIs.post("/createdomain", domainData);
    // Log success message and return the response data
    console.log("create success - ", response.data);
    return response.data;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error(error.message);
  }
}

/*
// Function to update an existing DNS record
export async function updateDNSRecord(id, dnsRecordData, ttl) {
  try {
    if (ttl) {
      dnsRecordData.TTL = ttl;
    }
    console.log('DNS - ', dnsRecordData, ttl);
    const response = await DNSAPIs.put(`/dns/${id}`, dnsRecordData);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}
*/

// Function to delete a domain
export async function deleteDomain(hostedZoneId) {
  try {
    // Send a DELETE request to delete the domain with provided hosted zone ID
    console.log('zoneid -', hostedZoneId);
    const response = await DOMAINAPIs.delete(`/deletedomain/${hostedZoneId}`);
    // Return the response data
    return response.data;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error(error.message);
  }
}
