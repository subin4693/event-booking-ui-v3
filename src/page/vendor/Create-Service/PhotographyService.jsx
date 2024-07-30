import React from "react";
import ClientInputMenu from "@/components/ClientInputMenu";
import ClientInputMenuEdit from "@/components/ClientInputMenuEdit";

const PhotographyService = ({ ID, options, setOptions }) => {
  return (
    <div className="mt-4">
      {ID ? (
        <ClientInputMenuEdit
          value={options}
          setValue={setOptions}
          title={"Portfolio"}
          placeholder={"Type here...."}
        />
      ) : (
        <ClientInputMenu
          value={options}
          setValue={setOptions}
          title={"Portfolio"}
          placeholder={"Type here...."}
        />
      )}
    </div>
  );
};

export default PhotographyService;
