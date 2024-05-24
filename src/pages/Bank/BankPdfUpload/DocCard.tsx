import React from "react";

function DocumentCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        // backgroundColor: "red",
        padding: 10,
        borderColor: "#707070AA",
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: 10,
        margin: "16px 0",
        width: "80%",
      }}
    >
      {children}
    </div>
  );
}

export default DocumentCard;
