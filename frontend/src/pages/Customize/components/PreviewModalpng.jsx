import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import jsPDF from "jspdf";
import "../styles/PreviewModal.css";
import { toast } from "react-toastify";
import SubmitForm from "./SubmitForm";

const PreviewModalForPNG = ({ isOpen, onClose, viewStates }) => {
  const canvasRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const [showForm, setShowForm] = useState(false);
  const [companyname, setCompanyName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    canvasRefs.current.forEach((ref, index) => {
      const canvasEl = ref?.current;
      const state = viewStates[index];
      if (!canvasEl || !state) return;

      const canvas = new fabric.StaticCanvas(canvasEl, {
        width: 400,
        height: 400,
        preserveObjectStacking: true,
      });

      canvas.loadFromJSON(state, () => {
        if (state.backgroundImageUrl) {
          fabric.Image.fromURL(
            state.backgroundImageUrl,
            (img) => {
              img.set({
                originX: "left",
                originY: "top",
                left: 0,
                top: 0,
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height,
                selectable: false,
                evented: false,
              });
              canvas.setBackgroundImage(img, () => {
                canvas.renderAll();
              });
            },
            { crossOrigin: "anonymous" }
          );
        } else {
          canvas.renderAll();
        }
      });
    });
  }, [isOpen, viewStates]);

  const generatePDF = async () => {
    if (!companyname.trim() || !phone.trim() || !message.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const positions = [
      { x: 10, y: 10 },
      { x: 110, y: 10 },
      { x: 10, y: 150 },
      { x: 110, y: 150 },
    ];
    const imageWidth = 90;
    const imageHeight = 130;

    try {
      for (let i = 0; i < viewStates.length; i++) {
        const state = viewStates[i];
        if (!state) continue;

        const tempCanvasEl = document.createElement("canvas");
        tempCanvasEl.width = 900;
        tempCanvasEl.height = 900;
        const tempCanvas = new fabric.StaticCanvas(tempCanvasEl);

        await new Promise((resolve, reject) => {
          tempCanvas.loadFromJSON(state, () => {
            const finalize = () => {
              tempCanvas.renderAll();
              const dataUrl = tempCanvas.toDataURL({ format: "png", multiplier: 2 });
              const pos = positions[i] || { x: 10, y: 10 };
              pdf.addImage(dataUrl, "PNG", pos.x, pos.y, imageWidth, imageHeight);
              resolve();
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
                    scaleX: 900 / img.width,
                    scaleY: 900 / img.height,
                    selectable: false,
                    evented: false,
                  });
                  tempCanvas.setBackgroundImage(img, finalize);
                },
                { crossOrigin: "anonymous" }
              );
            } else {
              finalize();
            }
          });

          setTimeout(() => reject(new Error("Canvas render timeout")), 5000);
        });
      }

      const blob = pdf.output("blob");
      const file = new File([blob], "customized-design.pdf", {
        type: "application/pdf",
      });

      pdf.save("customized-design.pdf");

      if (phone !== "9990590321") {
        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("companyname", companyname);
        formData.append("phone", phone);
        formData.append("message", message);
        formData.append("sizes", JSON.stringify(sizes || {}));

        await fetch("/api/send-email", { method: "POST", body: formData });
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
      console.error("PDF generation failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const labels = ["Front View", "Back View", "Left View", "Right View"];

  if (!isOpen) return null;

  return (
    <div className="preview-modal-overlay">
      <div className="preview-modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3 className="head">Preview Design</h3>

        <div className="download-buttons">
          <button onClick={() => setShowForm(true)}>Download Design</button>
        </div>

        <div className="preview-gallery">
          {canvasRefs.current.map((ref, idx) => (
            <div key={`preview-${idx}`} className="preview-item">
              <canvas
                ref={ref}
                width={400}
                height={400}
                className="preview-canvas"
              />
              <p className="preview-label">{labels[idx]}</p>
            </div>
          ))}
        </div>
      </div>

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

export default PreviewModalForPNG;
