import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useState, useEffect } from "react";

export default function CarsList({ cars, cellStateChange }) {
  const [colHeaders, setColHeaders] = useState([]);
  useEffect(() => {
    if (cars?.length > 0) {
      const columns = Object.keys(cars[0]).map((key) => ({
        headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize header name just in case
        field: key,
        editable: key !== "ID" ? true : false,
        cellEditor: "agTextCellEditor",
      }));
      setColHeaders(columns); // Update state with new column definitions
    }
  }, []); // Run when the cars data changes
  ModuleRegistry.registerModules([AllCommunityModule]);
  const defaultColDef = {
    flex: 1,
  };
  return (
    <AgGridReact
      rowData={cars}
      columnDefs={colHeaders}
      defaultColDef={defaultColDef}
      onCellEditingStopped={cellStateChange}
      domLayout="autoHeight"
    />
  );
}
