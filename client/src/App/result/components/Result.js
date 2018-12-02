import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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


class SimpleBarChart extends Component {
	render() {
		var data = Object.values(this.props);
		//	<Legend layout="vertical" verticalAlign="middle" align="right"/>
		return (
			<BarChart width={800} height={400} data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
			
				<Bar dataKey="votes" fill="#8884d8" >
					{
          	data.map((entry, index) => {
            	const color = entry.votes > 4000 ? COLORS[0] : COLORS[1];
            	return <Cell key={index} fill={color} />;
            })
          }
				</Bar>
			</BarChart>
		);
	}
}

class SimplePieChart extends Component {
	render() {
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
					dataKey="votes"
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

	render() {
		console.log("RESULT PROPS MAAAN", this.props); 
		var data = [];
		for (var i = 0; i < this.props.votes.answers.length; i++) {
			var fullData = this.props.votes.answers;
			var insert = { name: fullData[i].text, votes: fullData[i].value };
			data.push(insert);
		}
		for (var j = 0; j < this.props.votes.userAnswers.length; j++) {
			var fullUserData = this.props.votes.userAnswers;
			var userInsert = { name: fullUserData[j].text, votes: fullUserData[j].value };
			data.push(userInsert);
		}
		return (
			<div>
				<h1>{this.props.votes.question}</h1>
				<SimpleBarChart {...data}></SimpleBarChart>
				<SimplePieChart {...data} ></SimplePieChart>
			</div>
		)
	}

}

export default withRouter(Result);
