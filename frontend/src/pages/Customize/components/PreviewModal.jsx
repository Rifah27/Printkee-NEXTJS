import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import jsPDF from "jspdf";
import "../styles/PreviewModal.css";
import { toast } from "react-toastify";
import SubmitForm from "./SubmitForm";

const PreviewModal = ({ isOpen, onClose, viewStates, globalPartColors = {} }) => {
  const canvasRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
  const fabricCanvasRefs = useRef([null, null, null, null]);
  const [showForm, setShowForm] = useState(false);
  const [companyname, setCompanyName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState({});

  const applyGlobalColorsToCanvas = (canvas, colors) => {
    if (!canvas) return;
    const applyColor = (obj) => {
      if (obj.customPart && colors[obj.customPart] && obj.isPartOfGroup) {
        obj.set("fill", colors[obj.customPart]);
        obj.dirty = true;
        obj.setCoords();
      }
      if (obj._objects) obj._objects.forEach(applyColor);
    };
    canvas.getObjects().forEach(applyColor);
    canvas.requestRenderAll();
  };

  useEffect(() => {
    if (!isOpen) return;

    canvasRefs.current.forEach((ref, index) => {
      const canvasEl = ref?.current;
      const state = viewStates[index];
      if (!canvasEl || !state) return;

      if (fabricCanvasRefs.current[index]) fabricCanvasRefs.current[index].dispose();

      const canvas = new fabric.StaticCanvas(canvasEl, { width: 300, height: 300 });
      fabricCanvasRefs.current[index] = canvas;

      canvas.loadFromJSON(state, () => {
        // Apply global colors
        applyGlobalColorsToCanvas(canvas, globalPartColors);
        
        if (state.backgroundImageUrl) {
          fabric.Image.fromURL(state.backgroundImageUrl, (img) => {
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
              scaleObjects(canvas);
            });
          });
        } else {
          canvas.renderAll();
          scaleObjects(canvas);
        }
      });
    });

    return () => {
      fabricCanvasRefs.current.forEach((canvas) => canvas?.dispose());
      fabricCanvasRefs.current = [null, null, null, null];
    };
  }, [isOpen, viewStates, globalPartColors]);

  const scaleObjects = (canvas) => {
    const objects = canvas.getObjects();
    if (!objects.length) return;

    const bounds = objects.reduce((acc, obj) => {
      const { left, top, width, height } = obj.getBoundingRect(true);
      acc.minX = Math.min(acc.minX, left);
      acc.minY = Math.min(acc.minY, top);
      acc.maxX = Math.max(acc.maxX, left + width);
      acc.maxY = Math.max(acc.maxY, top + height);
      return acc;
    }, { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });

    const contentWidth = bounds.maxX - bounds.minX;
    const contentHeight = bounds.maxY - bounds.minY;
    const scale = Math.min(canvas.width / contentWidth, canvas.height / contentHeight);

    objects.forEach((obj) => {
      obj.scaleX *= scale;
      obj.scaleY *= scale;
      obj.left = (obj.left - bounds.minX) * scale;
      obj.top = (obj.top - bounds.minY) * scale;
      obj.setCoords();
    });

    canvas.renderAll();
  };

  const generatePDF = async () => {
    if (!companyname.trim() || !phone.trim() || !message.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const imageWidth = 90;
    const imageHeight = 130;

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

        const tempCanvasEl = document.createElement("canvas");
        tempCanvasEl.width = 900;
        tempCanvasEl.height = 900;
        const tempCanvas = new fabric.StaticCanvas(tempCanvasEl);

        await new Promise((resolve, reject) => {
          tempCanvas.loadFromJSON(state, () => {
            // Apply global colors to temp canvas
            applyGlobalColorsToCanvas(tempCanvas, globalPartColors);
            
            const render = () => {
              tempCanvas.renderAll();
              const dataUrl = tempCanvas.toDataURL({ format: "png", multiplier: 2 });
              const pos = positions[i] || { x: 10, y: 10 };
              pdf.addImage(dataUrl, "PNG", pos.x, pos.y, imageWidth, imageHeight);
              resolve();
            };

            if (state.backgroundImageUrl) {
              fabric.Image.fromURL(state.backgroundImageUrl, (img) => {
                img.set({
                  originX: "left",
                  originY: "top",
                  left: 0,
                  top: 0,
                  scaleX: tempCanvas.width / img.width,
                  scaleY: tempCanvas.height / img.height,
                  selectable: false,
                  evented: false,
                });
                tempCanvas.setBackgroundImage(img, render);
              });
            } else {
              render();
            }
          });
          setTimeout(() => reject(new Error("Timeout rendering canvas")), 5000);
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

  if (!isOpen) return null;

  const labels = ["Front View", "Back View", "Left View", "Right View"];

  return (
    <div className="preview-modal-overlay">
      <div className="preview-modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h3 className="head">Preview Design</h3>
        <div className="download-buttons">
          <button onClick={() => setShowForm(true)}>Download Design</button>
        </div>
        <div className="preview-gallery">
          {canvasRefs.current.map((ref, idx) => (
            <div key={`preview-${idx}`} className="preview-item">
              <canvas ref={ref} width={300} height={300} className="preview-canvas" />
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

export default PreviewModal;