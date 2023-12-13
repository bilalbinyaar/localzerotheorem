import React, { useEffect, useRef } from 'react';
import { parse, findMain } from 'latex';
import { renderToString } from 'katex/dist/contrib/auto-render';

const Report = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const mainFile = '/overleaf-project/main.tex';
    fetch(mainFile)
      .then((response) => response.text())
      .then((data) => {
        const parsedData = parse(data);

        const mainNode = findMain(parsedData);

        const html = renderToString(mainNode.content, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false },
          ],
        });

        containerRef.current.innerHTML = html;
      });
  }, []);

  return (
    <div>
      <h1>My Report</h1>
      <div ref={containerRef} />
    </div>
  );
};

export default Report;
