import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PieChart, Pie, Sector, Cell } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


class SimplePieChart extends Component{
	render () {
		console.log("Props", this.props); 
		var data = Object.values(this.props);
  	return (
    	<PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data} 
          cx={300} 
          cy={200} 
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80} 
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
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
			for(var i=0; i<this.props.answers.length; i++){
				var fullData = this.props.answers;
				var insert = {text: fullData[i].text, value: fullData[i].value };
				data.push(insert);
			}
			console.log(data); 
			console.log("PROPS", this.props); 
			var { selected } = this.state
			return (
				<div>
					<h1> Hi</h1>
					<SimplePieChart {...data}></SimplePieChart>
				</div>
			)
		}

	}

	export default withRouter(Result);
