import React, { useState } from "react";
import jsPDF from "jspdf";
import "../styles/ExportButtons.css";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import SubmitForm from "./SubmitForm";

const ExportButtons = ({ thumbnailCanvasRefs, viewStates }) => {
  const [showForm, setShowForm] = useState(false);
  const [companyname, setCompanyName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState({
    M: 0, L: 0, XL: 0, XXL: 0, "3XL": 0, "4XL": 0, "5XL": 0, "6XL": 0, "7XL": 0
  });
  const [showChart, setShowChart] = useState(false);

  const handleSizeChange = (e, size) => {
    setSizes({ ...sizes, [size]: parseInt(e.target.value) || 0 });
  };

  const totalQuantity = Object.values(sizes).reduce((sum, val) => sum + val, 0);

  const generatePDF = async () => {
    if (!companyname.trim() || !phone.trim() || !message.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const imageWidth = 90;

    const positions = [
      { x: 10, y: 10 },
      { x: 110, y: 10 },
      { x: 10, y: 150 },
      { x: 110, y: 150 }
    ];

    try {
      for (let i = 0; i < viewStates.length; i++) {
        const state = viewStates[i];
        if (!state) continue;

        const originalWidth = state.canvasWidth || 500;
        const originalHeight = state.canvasHeight || 630;

        const tempCanvasEl = document.createElement("canvas");
        tempCanvasEl.width = originalWidth;
        tempCanvasEl.height = originalHeight;

        const tempCanvas = new fabric.StaticCanvas(tempCanvasEl);
        tempCanvas.setWidth(originalWidth);
        tempCanvas.setHeight(originalHeight);

        await new Promise((resolve, reject) => {
          tempCanvas.loadFromJSON(state, () => {
            const renderCanvas = () => {
              tempCanvas.renderAll();
              setTimeout(() => {
                try {
                  const dataUrl = tempCanvas.toDataURL({ format: "png", multiplier: 2 });
                  const scale = imageWidth / originalWidth;
                  const imageHeight = originalHeight * scale;
                  const pos = positions[i] || { x: 10, y: 10 };
                  pdf.addImage(dataUrl, "PNG", pos.x, pos.y, imageWidth, imageHeight);
                  resolve();
                } catch (err) {
                  reject(err);
                }
              }, 300);
            };

            if (state.backgroundImageUrl) {
              fabric.Image.fromURL(
                state.backgroundImageUrl,
                (img) => {
                  img.set({
                    originX: "left",
                    originY: "top",
                    left: 0,
                    top: 0,
                    scaleX: originalWidth / img.width,
                    scaleY: originalHeight / img.height,
                    selectable: false,
                    evented: false,
                  });
                  tempCanvas.setBackgroundImage(img, renderCanvas);
                },
                { crossOrigin: "anonymous" }
              );
            } else {
              renderCanvas();
            }
          });
        });
      }

      const blob = pdf.output("blob");
      const file = new File([blob], "customized-design.pdf", { type: "application/pdf" });

      pdf.save("customized-design.pdf");

      if (phone !== "9990590321") {
        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("companyname", companyname);
        formData.append("phone", phone);
        formData.append("message", message);
        formData.append("sizes", JSON.stringify(sizes || {}));

        await fetch(`${import.meta.env.VITE_API_URL}/send-email`, { method: "POST", body: formData });

        await fetch(import.meta.env.VITE_CRM_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_CRM_API_KEY,
          },
          body: JSON.stringify({ companyname, phone, message }),
        });
      }

      toast.success("PDF downloaded successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="export-buttons-container">
      <div className="size-inputs">
        {["M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL", "7XL"].map((size) => (
          <div key={size}>
            <label className="size-label" htmlFor={`size-${size}`}>{size}:</label>
            <input
              id={`size-${size}`}
              className="size-input"
              type="number"
              min="0"
              value={sizes[size]}
              onChange={(e) => handleSizeChange(e, size)}
              aria-label={`Quantity for size ${size}`}
            />
          </div>
        ))}
        <div className="total-quantity">
          <label className="size-label">Total:</label>
          <input
            className="size-input"
            type="number"
            value={totalQuantity}
            readOnly
            tabIndex={-1}
          />
        </div>
      </div>
      <div className="type-selection">
        <select className="type-dropdown" defaultValue="">
          <option value="" disabled>
            Select Material Type
          </option>
          <option value="cotton">Cotton</option>
          <option value="polycotton">Polycotton</option>
          <option value="dryfit">Dry Fit</option>
        </select>
        <select className="type-dropdown" defaultValue="">
          <option value="" disabled>
            Select Print Type
          </option>
          <option value="Screen Print">Screen Print</option>
          <option value="Digital Print">Digital Print</option>
          <option value="gEmbroidary">Embroidary</option>
        </select>
      </div>
      <div className="btns-container">
        <button className="view-schart-btn" onClick={() => setShowChart(true)}>
          View Size Chart
        </button>
        <button className="export-pdf-btn" onClick={() => setShowForm(true)}>
          Download Design
        </button>
      </div>

      {showChart && (
        <div className="size-chart-overlay">
          <div className="size-chart-bg">
            <div className="size-chart-header">
              <h2 className="size-chart-title">Size Chart</h2>
              <button className="close-chart-btn" onClick={() => setShowChart(false)}>
                <FaTimes />
              </button>
            </div>
            <img src="/size-chart.jpeg" alt="Size Chart" className="size-chart-image" />
          </div>
        </div>
      )}

      {showForm && (
        <SubmitForm
          onSubmit={generatePDF}
          onCancel={() => setShowForm(false)}
          loading={loading}
          companyname={companyname}
          setCompanyName={setCompanyName}
          phone={phone}
          setPhoneNumber={setPhoneNumber}
          message={message}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default ExportButtons;
