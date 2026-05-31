import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fabric } from "fabric";

import CanvasToolbar from "./components/CanvasToolbar";
import ThumbnailGallery from "./components/ThumbnailGallery";
import ProductCustomizer from "./components/ProductCustomizer";
import UploadControls from "./components/UploadControls";
import TextControls from "./components/TextControls";
import ColorPalette from "./components/ColorPalette";
import NameNumberInput from "./components/NameNumberInput";
import ExportButtons from "./components/ExportButtons";
import VerticalToolbar from "./components/VerticalToolbar";
import PreviewModal from "./components/PreviewModal";

import "./styles/CustomizerSVG.css";

// ---------------- SVG MAP ----------------
const svgMap = {
  polotshirt: ["/polo/front.svg", "/polo/back.svg", "/polo/left.svg", "/polo/right.svg"],
  roundneck: ["/round/front.svg", "/round/back.svg", "/round/left.svg", "/round/right.svg"],
  cap: ["/cap/front.svg", "/cap/back.svg", "/cap/left.svg", "/cap/right.svg"]
};

const labelMap = {
  polotshirt: { fullTshirt: "Body", collar: "Collar", sleeves: "Sleeves" },
  roundneck: { fullTshirt: "Body", collar: "Neck Rib", sleeves: "Sleeves" },
  cap: { fullTshirt: "Crown", collar: "Top Button", sleeves: "Peak", border: "Sandwich" }
};

const partMapSet = {
  polotshirt: {
    collar: [
      "front-part-7", "front-part-12", "front-part-23", "front-part-50", "front-part-51",
      "front-part-36", "front-part-14", "front-part-15", "back-part-7", "back-part-12",
      "back-part-11", "left-part-7", "left-part-13", "left-part-69", "left-part-10",
      "left-part-11", "right-part-12", "right-part-5", "right-part-50", "right-part-7",
      "right-part-11"
    ],
    sleeves: [
      "front-part-5", "front-part-6", "back-part-5", "back-part-4",
      "right-part-4", "left-part-4"
    ],
    fullTshirt: [
      "front-part-2", "front-part-8", "front-part-10", "back-part-2",
      "back-part-6", "left-part-2", "left-part-9", "left-part-12",
      "left-part-8", "right-part-2", "right-part-9", "right-part-8",
      "right-part-6"
    ]
  },
  roundneck: {
    fullTshirt: [
      "front_path_2", "front_path_6", "front_path_8", "back_path_2",
      "back_path_6", "left_path_6", "left_path_2", "right_path_1",
      "right_path_6"
    ],
    sleeves: [
      "front_path_4", "front_path_5", "back_path_4", "back_path_5",
      "left_path_3", "right_path_3"
    ],
    collar: [
      "front_path_7", "front_path_10", "front_path_11", "front_path_9",
      "back_path_8", "back_path_11", "back_path_12", "left_path_8",
      "left_path_7", "left_path_9", "right_path_8", "right_path_9",
      "right_path_7"
    ]
  },
  cap: {
    fullTshirt: [
      "path_2", "path_29", "path_28", "path_33", "path_34", "path_43",
      "path_51", "path_42", "path_35", "path_36", "path_46", "path_47",
      "path_41", "path_86", "path_87", "path_90", "path_91", "path_32",
      "path_38", "path_37", "path_40", "path_52", "path_53", "path_55"
    ],
    sleeves: [
      "path_4", "path_5", "path_88", "path_92", "path_48", "path_50"
    ],
    collar: [
      "path_97", "path_56", "path_39", "path_8"
    ],
    border: [
      "path_6", "path_96", "path_54"
    ]
  }
};
const applyGlobalColors = (canvas, colors) => {
  if (!canvas) return;

  const applyColorToObj = (obj) => {
    if (obj.customPart && colors[obj.customPart]) {
      obj.set("fill", colors[obj.customPart]);
      obj.set("dirty", true);
    }
    if (obj._objects?.length) {
      obj._objects.forEach(applyColorToObj);
    }
  };

  canvas.getObjects().forEach(applyColorToObj);
  canvas.renderAll();
};

// ---------------- COMPONENT ----------------
const CustomizerSVG = () => {
  const canvasRef = useRef(null);
  const thumbnailCanvasRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef()
  ]);

  const { productType } = useParams();

  const selectedSVGs = svgMap[productType] || svgMap.polotshirt;
  const colorLabels = labelMap[productType] || labelMap.polotshirt;
  const partMap = partMapSet[productType] || partMapSet.polotshirt;

  const [viewStates, setViewStates] = useState([null, null, null, null]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTool, setActiveTool] = useState("color");
  const [globalPartColors, setGlobalPartColors] = useState({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);


  useEffect(() => {
    if (["polotshirt", "roundneck"].includes(productType.toLowerCase())) {
      setActiveTool("export");
    }
  }, [productType]);

  const extractUserObjects = (canvas) =>
    canvas.getObjects().filter((o) => o.isUserObject);


  const saveCurrentViewState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const userObjects = extractUserObjects(canvas).map((o) =>
      o.toObject([
        "type", "left", "top", "scaleX", "scaleY", "angle", "flipX", "flipY",
        "fontFamily", "fill", "text", "src", "width", "height",
        "fontSize", "fontWeight", "textAlign", "customPart"
      ])
    );

    const json = canvas.toJSON(["id", "customPart"]);

    setViewStates((prev) => {
      const updated = [...prev];
      updated[activeIndex] = {
        ...json,
        userObjects,
        globalPartColors: { ...globalPartColors }
      };
      return updated;
    });
  };

  // ---------- SWITCH VIEW ----------
  const handleThumbnailClick = (index) => {
    if (index === activeIndex) return;
    saveCurrentViewState();
    setActiveIndex(index);
  };

  // ---------- UPDATE THUMBNAIL ----------
  const updateThumbnail = (index) => {
    const mainCanvas = canvasRef.current;
    const thumbCanvasEl = thumbnailCanvasRefs.current[index]?.current;
    if (!mainCanvas || !thumbCanvasEl) return;

    const state = viewStates[index];
    if (!state) return;

    const tempCanvas = new fabric.Canvas(document.createElement("canvas"), {
      width: thumbCanvasEl.width,
      height: thumbCanvasEl.height
    });

    tempCanvas.loadFromJSON(state, () => {
      applyGlobalColors(tempCanvas, state.globalPartColors || {});

      setTimeout(() => {
        const imgURL = tempCanvas.toDataURL();
        const staticThumb = new fabric.StaticCanvas(thumbCanvasEl);

        fabric.Image.fromURL(imgURL, (img) => {
          const scale = Math.min(
            thumbCanvasEl.width / img.width,
            thumbCanvasEl.height / img.height
          );

          img.scale(scale);
          img.set({
            left: (thumbCanvasEl.width - img.width * scale) / 2,
            top: (thumbCanvasEl.height - img.height * scale) / 2
          });

          staticThumb.clear();
          staticThumb.add(img);
          staticThumb.renderAll();
        });

        tempCanvas.dispose();
      }, 50);
    });
  };

  const updateAllThumbnails = () =>
    thumbnailCanvasRefs.current.forEach((_, i) => updateThumbnail(i));

  // ---------- GLOBAL COLOR UPDATE ----------
  const handleGlobalColorChange = (newColors) => {
    setGlobalPartColors(newColors);

    const canvas = canvasRef.current;
    if (canvas) applyGlobalColors(canvas, newColors);

    setViewStates((prev) =>
      prev.map((state, i) =>
        state
          ? {
              ...state,
              globalPartColors: newColors,
              userObjects:
                i === activeIndex
                  ? extractUserObjects(canvas).map((o) =>
                      o.toObject(["type", "left", "top", "scaleX", "scaleY", "angle"])
                    )
                  : state.userObjects
            }
          : state
      )
    );

    updateAllThumbnails();
  };

  // ---------- LOAD VIEW ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = viewStates[activeIndex];
    if (!state) return;

    setGlobalPartColors(state.globalPartColors || {});

    canvas.loadFromJSON(state, () => {
      fabric.util.enlivenObjects(state.userObjects || [], (objs) => {
        objs.forEach((obj) => {
          obj.isUserObject = true;
          obj.set({ selectable: true, evented: true });
          canvas.add(obj);
        });
        applyGlobalColors(canvas, globalPartColors);
        canvas.renderAll();
      });
    });
  }, [activeIndex]);

  useEffect(() => updateAllThumbnails(), [globalPartColors]);

  // ---------- PREVIEW ----------
  useEffect(() => {
    if (activeTool === "preview") {
      saveCurrentViewState();
      setIsPreviewOpen(true);
    } else {
      setIsPreviewOpen(false);
    }
  }, [activeTool]);

  return (
    <div className="customizer-page">
      <h2 className="customizer-title">Create your design</h2>

      <div className="customizer-container">
        <div className="top-tools-bar">
          <CanvasToolbar canvasRef={canvasRef} onUndo={() => {}} onRedo={() => {}} />

          <ThumbnailGallery
            thumbnailCanvasRefs={thumbnailCanvasRefs}
            activeIndex={activeIndex}
            initialSVGs={selectedSVGs}
            onThumbnailClick={handleThumbnailClick}
          />
        </div>

        <div className="customizer-main">
          <div className="vertical-toolbar">
            <VerticalToolbar
              onSelectTool={setActiveTool}
              flag={true}
              productType={productType}
            />
          </div>

          <div className="customizer-controls">
            {activeTool === "upload" && (
              <UploadControls
                canvasRef={canvasRef}
                updateThumbnail={() => updateThumbnail(activeIndex)}
                saveCurrentViewState={saveCurrentViewState}
              />
            )}

            {activeTool === "text" && (
              <TextControls
                canvasRef={canvasRef}
                updateThumbnail={() => updateThumbnail(activeIndex)}
                saveCurrentViewState={saveCurrentViewState}
              />
            )}

            {activeTool === "color" && (
              <ColorPalette
                labels={colorLabels}
                globalPartColors={globalPartColors}
                setGlobalPartColors={handleGlobalColorChange}
              />
            )}

            {activeTool === "name" && (
              <NameNumberInput
                canvasRef={canvasRef}
                updateThumbnail={() => updateThumbnail(activeIndex)}
                saveCurrentViewState={saveCurrentViewState}
              />
            )}

            {activeTool === "export" && (
              <ExportButtons
                canvasRef={canvasRef}
                thumbnailCanvasRefs={thumbnailCanvasRefs}
                viewStates={viewStates}
                onOpenPreview={() => setIsPreviewOpen(true)}
              />
            )}
          </div>

          <div className="canvas-wrapper">
            <ProductCustomizer
              canvasRef={canvasRef}
              partMap={partMap}
              savedState={viewStates[activeIndex]}
              globalPartColors={globalPartColors}
              mainImageUrl={selectedSVGs[activeIndex]}
            />
          </div>
        </div>

        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setActiveTool("color");
          }}
          viewStates={viewStates}
          originalSVGs={selectedSVGs}
          globalPartColors={globalPartColors}
        />
      </div>
    </div>
  );
};

export default CustomizerSVG;
