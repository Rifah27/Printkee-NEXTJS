import React, { useState } from "react";
import { fabric } from "fabric";
import "../styles/NameNumberInput.css"; // Updated CSS import

const fonts = [
  "Arial",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Comic Sans MS",
  "Impact",
  "Verdana",
  "Trebuchet MS",
  "Tahoma",
  "Lucida Console",
];

const NameNumberInput = ({ canvasRef, updateThumbnail, saveCurrentViewState, activeIndex }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState(fonts[0]);
  const [nameObj, setNameObj] = useState(null);
  const [numberObj, setNumberObj] = useState(null);

  const deleteObject = (eventData, transform) => {
    const target = transform.target;
    const canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
    updateThumbnail();
  };

  const renderDeleteIcon = (ctx, left, top) => {
    const size = 20;
    ctx.save();
    ctx.translate(left, top);
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2, true);
    ctx.fillStyle = "#e41d1d";
    ctx.fill();
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

  const addNameAndNumber = () => {
    const canvas = canvasRef.current;
    if (!canvas || (!name && !number)) return;

    if (nameObj) canvas.remove(nameObj);
    if (numberObj) canvas.remove(numberObj);

    if (name) {
      const nameText = new fabric.Text(name, {
        top: 400,
        left: 250,
        fontSize: 20,
        fill: color,
        fontWeight: "bold",
        fontFamily: font,
        selectable: true,
        cornerStyle: "circle",
      });

      nameText.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -10,
        offsetX: 10,
        cursorStyle: "pointer",
        mouseUpHandler: deleteObject,
        render: renderDeleteIcon,
        cornerSize: 24,
      });

      canvas.add(nameText);
      setNameObj(nameText);
    }

    if (number) {
      const numberText = new fabric.Text(number, {
        top: 430,
        left: 250,
        fontSize: 28,
        fill: color,
        fontWeight: "bold",
        fontFamily: font,
        selectable: true,
        cornerStyle: "circle",
      });

      numberText.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -10,
        offsetX: 10,
        cursorStyle: "pointer",
        mouseUpHandler: deleteObject,
        render: renderDeleteIcon,
        cornerSize: 24,
      });

      canvas.add(numberText);
      setNumberObj(numberText);
    }

    canvas.requestRenderAll();
    saveCurrentViewState();
  updateThumbnail(activeIndex);

  setName("");
  setNumber("");
    setTimeout(updateThumbnail, 150);
  };

  return (
    <div className="name-number-input-container">
      <div className="name-number-input-fields">
        <input
          className="name-number-input-field name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          className="name-number-input-field number-input"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Number"
        />
        <input
          className="name-number-color-picker"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          title="Pick text color"
        />
        <select
          className="name-number-font-selector"
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          {fonts.map((f) => (
            <option key={f} value={f} className="name-number-font-option">
              {f}
            </option>
          ))}
        </select>
      </div>
      <button className="name-number-add-button" onClick={addNameAndNumber}>
        Add to Design
      </button>
    </div>
  );
};

export default NameNumberInput;