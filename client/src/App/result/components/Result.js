import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PieChart, Pie, Sector, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
var renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
class SimpleBarChart extends Component {
	render () {
  	return (
    	<BarChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="pv" fill="#8884d8" />
       <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    );
  }
}

class SimplePieChart extends Component {
	render() {
		console.log("Props", this.props);
		var data = Object.values(this.props);
		return (
			<PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
				<Pie
					data={data}
					cx={300}
					cy={200}
					labelLine={true}
					label={renderCustomizedLabel}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
					isAnimationActive={false}
				>
					{
						data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
					}
				</Pie>
				<Legend layout="vertical" verticalAlign="middle" align="right" />
			</PieChart>
		);
	}
}

class Result extends Component {

	constructor(props) {
		super(props);
		this.state = { selected: "", _id: "" };
	}

	render() {
		var data = [];
		for (var i = 0; i < this.props.answers.length; i++) {
			var fullData = this.props.answers;
			var insert = { name: fullData[i].text, value: fullData[i].value };
			data.push(insert);
		}
		console.log(data);
		console.log("PROPS", this.props);
		var { selected } = this.state
		return (
			<div>
				<h1> Hi</h1>
				<SimplePieChart {...data} ></SimplePieChart>
				<SimpleBarChart></SimpleBarChart>
			</div>
		)
	}

}

export default withRouter(Result);
