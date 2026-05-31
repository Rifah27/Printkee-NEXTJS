import React from "react";
import "../styles/VerticalToolbar.css";
import { FaUpload, FaFont, FaPalette, FaUserEdit, FaSave, FaEye } from "react-icons/fa";

const VerticalToolbar = ({ onSelectTool, activeTool, flag, subcategory, productType }) => {
    console.log("VerticalToolbar rendered with activeTool:", activeTool, "flag:", flag, "subcategory:", subcategory, "productType:", productType);
    const allowedSaveCategories = ["Aprons", "Winter Wear", "Corporate Shirts"];
    const allowedProductTypes = ["polotshirt", "roundneck"];

    const tools = [
        { id: "upload", icon: <FaUpload className="vertical-toolbar-icon" />, label: "Upload" },
        { id: "text", icon: <FaFont className="vertical-toolbar-icon" />, label: "Text" },
        { id: "color", icon: <FaPalette className="vertical-toolbar-icon" />, label: "Color" },
        { id: "name", icon: <FaUserEdit className="vertical-toolbar-icon" />, label: "Name" },
        { id: "export", icon: <FaSave className="vertical-toolbar-icon" />, label: "Save" },
        { id: "preview", icon: <FaEye className="vertical-toolbar-icon" />, label: "Preview" },
    ];

    let visibleTools = flag
        ? tools
        : tools.filter(tool => tool.id !== "color" && tool.id !== "name" && tool.id !== "preview");

    const canSaveByCategory = allowedSaveCategories
        .some(cat => cat.toLowerCase() === (subcategory || "").toLowerCase());

    const canSaveByType = allowedProductTypes
        .some(type => type.toLowerCase() === (productType || "").toLowerCase());

    
    if (!canSaveByCategory && !canSaveByType) {
        visibleTools = visibleTools.filter(tool => tool.id !== "export");
    }
    return (
        <div className="vertical-toolbar-container">
            {visibleTools.map(({ id, icon, label }) => (
                <button
                    key={id}
                    className={`vertical-toolbar-btn ${activeTool === id ? "active-tool" : ""}`}
                    onClick={() => onSelectTool(id)}
                >
                    {icon}
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );
};

export default VerticalToolbar;
