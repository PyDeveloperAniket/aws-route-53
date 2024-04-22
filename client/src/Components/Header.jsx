import React from "react";
import {
  Navbar,
  Typography,
} from "@material-tailwind/react";

function Header() {
  return (
    <Navbar
      variant="gradient"
      className="mx-auto max-w-screen-2xl bg-gradient-to-r from-gray-700 to-black px-4 py-1 flex justify-center"
    >
      {/* Title */}
      <Typography
        variant="h6"
        className="mr-4 ml-2 cursor-pointer py-1.5 text-2xl text-white"
      >
        DNS RECORDS
      </Typography>
    </Navbar>
  );
}

export default Header;
