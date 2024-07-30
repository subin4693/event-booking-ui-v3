import React from "react";

import ClientInputMenu from "@/components/ClientInputMenu";
import ClientInputMenuEdit from "@/components/ClientInputMenuEdit";

const CatringService = ({ ID, options, setOptions }) => {
  return (
    <div className="mt-4">
      {ID ? (
        <ClientInputMenuEdit
          value={options}
          setValue={setOptions}
          title={"Menu options"}
          placeholder={"Type here...."}
        />
      ) : (
        <ClientInputMenu
          value={options}
          setValue={setOptions}
          title={"Menu options"}
          placeholder={"Type here...."}
        />
      )}
    </div>
  );
};

export default CatringService;
