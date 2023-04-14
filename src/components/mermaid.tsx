import React, { FC, useEffect } from "react";
import mermaid from "mermaid";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  themeCSS: `
  
  .
  `,
  fontFamily: "Fira Code",
});

interface IMermaid {
  chart: string;
  name: string;
}

export const Mermaid: FC<IMermaid> = ({ chart, name }) => {
  useEffect(() => {
    if (chart) mermaid.contentLoaded();
  }, [chart]);

  const exportSvg = async () => {
    const svgData = await mermaid.render("text1", chart);

    const svgBlob = new Blob([svgData.svg], {
      type: "image/svg+xml;charset=utf-8",
    });

    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `${name}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const copyMermaidCode = async () => {
    await navigator.clipboard.writeText(chart);
    alert("Mermaid Code" + chart);
  };

  return (
    <div className="relative w-full flex justify-center">
      <div className="absolute right-1 bottom-1 m-2 z-50 dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-success m-1">
          Export
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-gray-700 rounded-box w-52"
        >
          <li>
            <button onClick={copyMermaidCode}>Copy Mermaid Code</button>
          </li>
          <li>
            <button onClick={exportSvg}>SVG</button>
          </li>
        </ul>
      </div>

      <TransformWrapper>
        <TransformComponent contentClass="w-full" wrapperClass="w-full h-full">
          <div className="mermaid w-full mb-100">{chart}</div>
        </TransformComponent>{" "}
      </TransformWrapper>
    </div>
  );
};
