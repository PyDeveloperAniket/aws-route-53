// Importing AWS SDK and environment variables
import AWS from 'aws-sdk';
import 'dotenv/config';

// Function to configure AWS SDK
const configureAWS = () => {
    try {
        // Updating AWS configuration with provided credentials and region
        AWS.config.update({
            accessKeyId: process.env.AccessID, // Access key ID
            secretAccessKey: process.env.AccessKey, // Secret access key
            region: process.env.region, // AWS region
        });
        console.log('AWS configured successfully!'); // Logging success message
    } catch (error) {
        console.log('AWS auth failed connecting - ', error.message); // Logging error message if authentication fails
    }
};

export default configureAWS; // Exporting configureAWS function
