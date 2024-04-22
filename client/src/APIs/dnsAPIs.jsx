import axios from "axios";

// Create an instance of axios with the base URL for DNS API
const DNSAPIs = axios.create({
  // baseURL: "http://localhost:8080/api/dns", // Local development base URL
  baseURL: `https://aws-dashboard.onrender.com/api/dns`, // Production base URL
  // baseURL: `https://aws-route-53.vercel.app/api/dns`, // Alternative production base URL
});

// Function to list hosted zones for a given AWS account
export async function listHostedZones(code) {
  try {
    // Extract the hosted zone ID from the provided code
    const hostedZoneId = code;
    // Send a GET request to retrieve hosted zones data based on the ID
    const response = await DNSAPIs.get(`/hostedZones/${hostedZoneId}`);
    // Return the response data
    return response.data;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error(error.message);
  }
}

// Function to create a new DNS record
export async function createDNSRecord(dnsRecordData, code) {
  try {
    // Send a POST request to create a new DNS record with provided data
    const response = await DNSAPIs.post("/dns", { dnsRecordData, code });
    // Return the response data
    return response.data;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error(error.message);
  }
}

// Function to update an existing DNS record
export async function updateDNSRecord(id, dnsRecordData, ttl, code) {
  try {
    // If TTL value is provided, update it in the DNS record data
    if (ttl) {
      dnsRecordData.TTL = ttl;
    }
    // Send a PUT request to update the DNS record with provided data
    const response = await DNSAPIs.put(`/dns/${id}`, { dnsRecordData, code });
    // Return the response data
    return response.data;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error(error.message);
  }
}

// Function to delete a DNS record
export async function deleteDNSRecord(id, record, code) {
  try {
    // Send a DELETE request to delete the DNS record with provided ID and code
    const response = await DNSAPIs.delete(`/dns/${id}?code=${code}`, {
      data: record,
    });
    // Return the response data
    return response.data;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error(error.message);
  }
}
