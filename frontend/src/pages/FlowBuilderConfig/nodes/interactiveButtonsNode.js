import {
  ArrowForwardIos,
  ContentCopy,
  Delete,
  TouchApp
} from "@mui/icons-material";
import React, { memo } from "react";

import { Handle } from "react-flow-renderer";
import { useNodeStorage } from "../../../stores/useNodeStorage";

export default memo(({ data, isConnectable, id }) => {
  const storageItems = useNodeStorage();

  return (
    <div
      style={{
        backgroundColor: "#E8F5E9",
        padding: "8px",
        borderRadius: "8px",
        maxWidth: "200px",
        boxShadow: "0px 3px 5px rgba(0,0,0,.05)",
        border: "1px solid rgba(76, 175, 80, 0.5)",
        width: 200
      }}
    >
      <Handle
        type="target"
        position="left"
        style={{
          background: "#4CAF50",
          width: "18px",
          height: "18px",
          top: "20px",
          left: "-12px",
          cursor: 'pointer'
        }}
        onConnect={params => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      >
        <ArrowForwardIos
          sx={{
            color: "#ffff",
            width: "10px",
            height: "10px",
            marginLeft: "3.5px",
            marginBottom: "1px",
            pointerEvents: "none"
          }}
        />
      </Handle>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 5,
          top: 5,
          cursor: "pointer",
          gap: 6
        }}
      >
        <ContentCopy
          onClick={() => {
            storageItems.setNodesStorage(id);
            storageItems.setAct("duplicate");
          }}
          sx={{ width: "12px", height: "12px", color: "#4CAF50" }}
        />

        <Delete
          onClick={() => {
            storageItems.setNodesStorage(id);
            storageItems.setAct("delete");
          }}
          sx={{ width: "12px", height: "12px", color: "#4CAF50" }}
        />
      </div>
      <div
        style={{
          color: "#ededed",
          fontSize: "16px",
          flexDirection: "row",
          display: "flex"
        }}
      >
        <TouchApp
          sx={{
            width: "16px",
            height: "16px",
            marginRight: "4px",
            marginTop: "4px",
            color: "#4CAF50"
          }}
        />
        <div style={{ color: "#232323", fontSize: "16px", fontWeight: "500" }}>Botões</div>
      </div>

      {data.title && (
        <div style={{ color: "#1B5E20", fontSize: "11px", fontWeight: "bold", marginTop: "4px" }}>
          {data.title}
        </div>
      )}

      <div>
        <div
          style={{
            color: "#232323",
            fontSize: "12px",
            maxHeight: "50px",
            overflow: "hidden",
            marginTop: "4px",
            marginBottom: "8px"
          }}
        >
          {data.message}
        </div>
      </div>

      {data.footer && (
        <div style={{ color: "#666", fontSize: "9px", marginBottom: "6px", fontStyle: "italic" }}>
          {data.footer}
        </div>
      )}

      {data.buttons && data.buttons.map((button, index) => (
        <div
          key={index}
          style={{
            marginBottom: "6px",
            justifyContent: "end",
            display: "flex"
          }}
        >
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "10px",
              position: "relative",
              display: "flex",
              color: "#232323",
              justifyContent: "center",
              flexDirection: "column",
              alignSelf: "end",
              backgroundColor: "#fff",
              padding: "4px 8px",
              borderRadius: "12px",
              border: "1px solid #4CAF50",
              maxWidth: "140px"
            }}
          >
            {button.displayText}
          </div>
          <Handle
            type="source"
            position="right"
            id={"btn" + index}
            style={{
              top: 95 + 30 * index,
              background: "#4CAF50",
              width: "18px",
              height: "18px",
              right: "-11px",
              cursor: 'pointer'
            }}
            isConnectable={isConnectable}
          >
            <ArrowForwardIos
              sx={{
                color: "#ffff",
                width: "10px",
                height: "10px",
                marginLeft: "2.9px",
                marginBottom: "1px",
                pointerEvents: "none"
              }}
            />
          </Handle>
        </div>
      ))}
    </div>
  );
});
