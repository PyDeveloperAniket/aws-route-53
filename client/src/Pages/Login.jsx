import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "@material-tailwind/react";

function Login() {
  const navigate = useNavigate();

  const loginHandle = () => {
    // Redirect to the Cognito hosted UI login page
    window.location.href = "https://demo-user-pool-007.auth.us-west-2.amazoncognito.com/login?client_id=12g5eh2kvpmg95ne5vc1luoi74&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fawsroute53dashboard.netlify.app%2Fhome";
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      {/* Card component for login */}
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login to your Account
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Login through your AWS account credentials
        </Typography>
        <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          {/* Button for login */}
          <Button
            className="mt-6"
            fullWidth
            onClick={loginHandle}
          >
            Log In with AWS Cognito
          </Button>
          {/* Link to sign up page */}
          {/* <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <a
              onClick={() => {
                navigate("/signup");
              }}
              className="font-medium text-gray-900"
            >
              Sign Up
            </a>
          </Typography> */}
        </div>
      </Card>
    </div>
  );
}

export default Login;
