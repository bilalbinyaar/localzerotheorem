import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class SplineAreaChart extends Component {
  render() {
    const options = {
      backgroundColor: 'transparent',
      theme: 'light2',
      animationEnabled: true,
      axisY: {
        suffix: ' kWh',
        gridColor: '#43577533',
      },

      data: [
        {
          type: 'splineArea',
          color: '#16C784',
          markerType: 'none',
          fillOpacity: 0.4,
          dataPoints: [
            { x: 10, y: 71 },
            { x: 20, y: 55 },
            { x: 30, y: 50 },
            { x: 40, y: 10 },
            { x: 50, y: 0, markerSize: 0, highlightEnabled: false },
          ],
        },
        {
          type: 'splineArea',
          color: '#FF2E2E',
          markerType: 'none',
          fillOpacity: 0.4,
          dataPoints: [
            { x: 50, y: 0, markerSize: 0, highlightEnabled: false },
            { x: 60, y: -10 },
            { x: 70, y: -50 },
            { x: 75, y: 0, markerSize: 0, highlightEnabled: false },
          ],
        },
        {
          type: 'splineArea',
          color: '#16C784',
          markerType: 'none',
          fillOpacity: 0.4,
          dataPoints: [
            { x: 75, y: 0, markerSize: 0, highlightEnabled: false },
            { x: 80, y: 20 },
            { x: 90, y: 14 },
          ],
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}
export default SplineAreaChart;
