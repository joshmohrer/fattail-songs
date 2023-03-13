import React from "react";
import Select from "react-select";

const BandmateSelect = ({ userName, setUserName }) => {
  const userOptions = [
    { value: "Josh", label: "Josh" },
    { value: "Al", label: "Al" },
    { value: "Robby", label: "Robby" },
    { value: "Damo", label: "Damo" },
    { value: "Rajiv", label: "Rajiv" },
  ];

  return (
    <div className="flex flex-row items-center space-x-4 p-4">
      <div className="flex-2 text-gray-700  text-lg">Set User:</div>
      {/* <div className="inline-block w-full"> */}
      <Select
        defaultValue={userName}
        onChange={(selectedOption) => setUserName(selectedOption.value)}
        options={userOptions}
        className="w-80"
      />
      {/* </div> */}
    </div>
  );
};

export default BandmateSelect;
