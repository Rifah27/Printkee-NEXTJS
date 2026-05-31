import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useLocation } from "react-router-dom";

import CanvasToolbar from "./components/CanvasToolbar";
import ThumbnailGallery from "./components/ThumbnailGallery";
import VerticalToolbar from "./components/VerticalToolbar";
import UploadControls from "./components/UploadControls";
import TextControls from "./components/TextControls";
import ExportButtons from "./components/ExportButtons";
import ProductCustomizer from "./components/ProductCustomizer";
import PreviewModalpng from "./components/PreviewModalpng";

const CustomizeAll = () => {
  const canvasRef = useRef(null);

  const thumbnailCanvasRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const location = useLocation();
  const {
    productImages = [],
    productName = "",
    subcategory = "",
  } = location.state || {};

  // Prevent crash if fewer than 4 images
  const safeImages = [...productImages];
  while (safeImages.length < 4) safeImages.push(productImages[0] || "");

  const [viewStates, setViewStates] = useState([null, null, null, null]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTool, setActiveTool] = useState("upload");

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  // ---------- AUTO SELECT EXPORT TOOL ----------
  useEffect(() => {
    const allowed = ["aprons", "corporate shirts", "winter wear"];
    if (allowed.includes(subcategory.toLowerCase())) {
      setActiveTool("export");
    }
  }, [subcategory]);

  // ---------- SAVE VIEW ----------
  const saveCurrentViewState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const json = canvas.toJSON(["id", "customPart"]);
    json.canvasWidth = canvas.getWidth();
    json.canvasHeight = canvas.getHeight();
    if (canvas.backgroundImage?.getSrc) {
      json.backgroundImageUrl = canvas.backgroundImage.getSrc();
    }

    setViewStates((prev) => {
      const updated = [...prev];
      updated[activeIndex] = json;
      return updated;
    });
  };

  // ---------- UPDATE THUMBNAIL ----------
  const updateThumbnail = (index) => {
    const srcCanvas = canvasRef.current;
    const dstCanvas = thumbnailCanvasRefs.current[index]?.current;
    if (!srcCanvas || !dstCanvas) return;

    const temp = new fabric.StaticCanvas(null);
    temp.setWidth(srcCanvas.getWidth());
    temp.setHeight(srcCanvas.getHeight());

    const dataUrl = srcCanvas.toDataURL({ format: "png" });

    const thumbCanvas = new fabric.StaticCanvas(dstCanvas);

    fabric.Image.fromURL(dataUrl, (img) => {
      const scale = Math.min(
        dstCanvas.width / img.width,
        dstCanvas.height / img.height
      );

      img.scale(scale);
      img.set({
        left: (dstCanvas.width - img.width * scale) / 2,
        top: (dstCanvas.height - img.height * scale) / 2,
      });

      thumbCanvas.clear();
      thumbCanvas.add(img);
      thumbCanvas.renderAll();
    });
  };

  // ---------- UNDO ----------
  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.length === 0) return;

    const lastState = undoStack.pop();
    const current = canvas.toJSON(["id", "customPart"]);

    setRedoStack((prev) => [...prev, current]);
    setUndoStack([...undoStack]);

    canvas.loadFromJSON(lastState, () => {
      canvas.renderAll();
      updateThumbnail(activeIndex);
    });
  };

  // ---------- REDO ----------
  const handleRedo = () => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.length === 0) return;

    const nextState = redoStack.pop();
    const current = canvas.toJSON(["id", "customPart"]);

    setUndoStack((prev) => [...prev, current]);

    canvas.loadFromJSON(nextState, () => {
      canvas.renderAll();
      updateThumbnail(activeIndex);
    });
  };

  // ---------- SWITCH VIEW ----------
  const handleThumbnailClick = (index) => {
    if (index === activeIndex) return;

    saveCurrentViewState();
    setActiveIndex(index);

    const canvas = canvasRef.current;
    const newState = viewStates[index];

    if (canvas && newState) {
      canvas.loadFromJSON(newState, () => {
        canvas.mainGroup = canvas.getObjects().find(
          (obj) => obj.type === "group"
        );
        canvas.renderAll();
      });
    }
  };

  // ---------- CHANGE TOOL ----------
  const handleToolChange = (tool) => {
    saveCurrentViewState();
    setActiveTool(tool);
  };

  // ---------- PREVIEW ----------
  useEffect(() => {
    if (activeTool === "preview") {
      saveCurrentViewState();
      setIsPreviewOpen(true);
    } else {
      setIsPreviewOpen(false);
    }
  }, [activeTool]);

  // Render thumbnails in preview mode
  useEffect(() => {
    if (!isPreviewOpen) return;
    setTimeout(() => {
      viewStates.forEach((_, i) => updateThumbnail(i));
    }, 250);
  }, [isPreviewOpen]);

  return (
    <div className="customizer-page">
      <h2 className="customizer-title">Customize your product</h2>

      <div className="customizer-container">
        {/* ---------------- TOP TOOLBAR ---------------- */}
        <div className="top-tools-bar">
          <CanvasToolbar
            canvasRef={canvasRef}
            onUndo={handleUndo}
            onRedo={handleRedo}
          />

          <ThumbnailGallery
            activeIndex={activeIndex}
            onThumbnailClick={handleThumbnailClick}
            thumbnailCanvasRefs={thumbnailCanvasRefs}
          />
        </div>

        {/* ---------------- MAIN BODY ---------------- */}
        <div className="customizer-main">
          <div className="vertical-toolbar">
            <VerticalToolbar
              onSelectTool={handleToolChange}
              activeTool={activeTool}
              flag={flag}
              subcategory={subcategory}
            />
          </div>

          <div className="customizer-controls">
            {activeTool === "upload" && (
              <UploadControls
                canvasRef={canvasRef}
                updateThumbnail={() => updateThumbnail(activeIndex)}
              />
            )}

            {activeTool === "text" && (
              <TextControls
                canvasRef={canvasRef}
                updateThumbnail={() => updateThumbnail(activeIndex)}
              />
            )}

            {activeTool === "export" && (
              <ExportButtons canvasRef={canvasRef} viewStates={viewStates} />
            )}
          </div>

          <div className="canvas-wrapper">
            <ProductCustomizer
              canvasRef={canvasRef}
              mainImageUrl={safeImages[activeIndex]}
              savedState={viewStates[activeIndex]}
            />
          </div>
        </div>

        {/* ---------------- PREVIEW MODAL ---------------- */}
        <PreviewModalpng
          isOpen={isPreviewOpen}
          onClose={() => setActiveTool("export")}
          viewStates={viewStates}
        />
      </div>
    </div>
  );
};

export default CustomizeAll;
