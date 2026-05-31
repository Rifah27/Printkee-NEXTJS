import React from "react";
import "../styles/CanvasToolbar.css";
import { FaSearchPlus, FaSearchMinus, FaUndo, FaRedo, FaTrash } from "react-icons/fa";

const CanvasToolbar = ({ canvasRef, onUndo, onRedo }) => {
  const zoomIn = () => canvasRef.current.setZoom(canvasRef.current.getZoom() * 1.1);
  const zoomOut = () => canvasRef.current.setZoom(canvasRef.current.getZoom() / 1.1);
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    canvas.clear();
    canvas.requestRenderAll && canvas.requestRenderAll(); // Refresh the canvas after clearing
  };

  return (
    <div className="canvas-toolbar">
      <button className="canvas-toolbar__button" onClick={zoomIn}>
        <FaSearchPlus className="icon-2" />
        Zoom In
      </button>
      <button className="canvas-toolbar__button" onClick={zoomOut}>
        <FaSearchMinus className="icon=2" />
        Zoom Out
      </button>
      <button className="canvas-toolbar__button" onClick={onUndo}>
        <FaUndo className="icon-2" />
        Undo
      </button>
      <button className="canvas-toolbar__button" onClick={onRedo}>
        <FaRedo className="icon-2" />
        Redo
      </button>
      <button className="canvas-toolbar__button" onClick={clearCanvas}>
        <FaTrash className="icon-2" />
        Clear All
      </button>
    </div>
  );
};

export default CanvasToolbar;
