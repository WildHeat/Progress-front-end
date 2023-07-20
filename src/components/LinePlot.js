import React, { Component } from "react";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

class LinePlot extends Component {
  render() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={this.props.data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451b7" stopOpacity={0.4}></stop>
              <stop offset="75%" stopColor="#2451b7" stopOpacity={0.05}></stop>
            </linearGradient>
            <linearGradient id="sma-color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8351bd" stopOpacity={0.4}></stop>
              <stop offset="20%" stopColor="#8351bd" stopOpacity={0.05}></stop>
            </linearGradient>
          </defs>

          <Area
            dataKey={this.props.dataName}
            stroke="#2451B7"
            fill="url(#color)"
          />
          <Area
            dataKey={this.props.smaName}
            stroke="#8934eb"
            fill="url(#sma-color)"
          />
          <XAxis dataKey={"timeEntry"} />
          <YAxis
            dataKey={this.props.dataName}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <CartesianGrid opacity={1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default LinePlot;
