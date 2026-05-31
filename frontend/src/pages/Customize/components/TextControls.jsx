import React, { useState } from "react";
import { fabric } from "fabric";
import "../styles/TextControls.css";

const TextControls = ({ canvasRef, updateThumbnail, saveCurrentViewState, activeIndex }) => {
  const [text, setText] = useState("");
  const [font, setFont] = useState("Arial");
  const [color, setColor] = useState("#000000");

  
  const deleteObject = (eventData, transform) => {
    const target = transform.target;
    const canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
    updateThumbnail(); 
  };


  const renderDeleteIcon = (ctx, left, top, styleOverride, fabricObject) => {
    const size = 20;
    ctx.save();
    ctx.translate(left, top);

    // Draw red circle
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2, true);
    ctx.fillStyle = "#d81212ff";
    ctx.fill();

    // Draw white X
    ctx.beginPath();
    ctx.moveTo(-6, -6);
    ctx.lineTo(6, 6);
    ctx.moveTo(6, -6);
    ctx.lineTo(-6, 6);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  };

  const addText = () => {
    if (!text.trim()) return;

    const textbox = new fabric.Textbox(text, {
      left: 150,
      top: 150,
      fontFamily: font,
      fill: color,
      fontSize: 24,
      hasControls: true,
      cornerStyle: "circle",
    });

    
    textbox.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -10,
      offsetX: 10,
      cursorStyle: "pointer",
      mouseUpHandler: deleteObject,
      render: renderDeleteIcon,
      cornerSize: 24,
    });

    canvasRef.current.add(textbox).setActiveObject(textbox);
    canvasRef.current.requestRenderAll();

    saveCurrentViewState();          
  updateThumbnail(activeIndex);    

  setText("");

    setTimeout(() => {
      updateThumbnail();
      // updateViewStates();
    }, 150);
  };

  return (
    <div className="text-controls-container">
      <input
        className="text-controls-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
        style={{ fontFamily: font }}
      />
      <select
        className="text-controls-font"
        value={font}
        onChange={(e) => setFont(e.target.value)}
        style={{ fontFamily: font }}
      >
        <option style={{ fontFamily: "Arial" }}>Arial</option>
        <option style={{ fontFamily: "Georgia" }}>Georgia</option>
        <option style={{ fontFamily: "Courier" }}>Courier</option>
        <option style={{ fontFamily: "Impact" }}>Impact</option>
        <option style={{ fontFamily: "Times New Roman" }}>Times New Roman</option>
        <option style={{ fontFamily: "Verdana" }}>Verdana</option>
        <option style={{ fontFamily: "Trebuchet MS" }}>Trebuchet MS</option>
        <option style={{ fontFamily: "Tahoma" }}>Tahoma</option>
      </select>
      <input
        className="text-controls-color"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button className="text-controls-add-btn" onClick={addText} style={{ fontFamily: font }}>
        Add Text
      </button>
    </div>
  );
};

export default TextControls;
