import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
	CartesianGrid,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
	AreaChart,
	Area,
	Tooltip,
	Legend,
} from "recharts";
import { startOfHour, parseISO, format } from "date-fns";

import Title from "./Title";
import useTickets from "../../hooks/useTickets";

const Chart = ({ queueTicket }) => {
	const theme = useTheme();

	const { tickets, count } = useTickets({
		queueIds: queueTicket ? `[${queueTicket}]` : "[]",
	});

	const [chartData, setChartData] = useState([
		{ time: "00:00", amount: 0 },
		{ time: "01:00", amount: 0 },
		{ time: "02:00", amount: 0 },
		{ time: "03:00", amount: 0 },
		{ time: "04:00", amount: 0 },
		{ time: "05:00", amount: 0 },
		{ time: "06:00", amount: 0 },
		{ time: "07:00", amount: 0 },
		{ time: "08:00", amount: 0 },
		{ time: "09:00", amount: 0 },
		{ time: "10:00", amount: 0 },
		{ time: "11:00", amount: 0 },
		{ time: "12:00", amount: 0 },
		{ time: "13:00", amount: 0 },
		{ time: "14:00", amount: 0 },
		{ time: "15:00", amount: 0 },
		{ time: "16:00", amount: 0 },
		{ time: "17:00", amount: 0 },
		{ time: "18:00", amount: 0 },
		{ time: "19:00", amount: 0 },
		{ time: "20:00", amount: 0 },
		{ time: "21:00", amount: 0 },
		{ time: "22:00", amount: 0 },
		{ time: "23:00", amount: 0 },
	]);

	useEffect(() => {
		setChartData((prevState) => {
			let aux = [...prevState];

			aux.forEach((a) => {
				tickets.forEach((ticket) => {
					format(startOfHour(parseISO(ticket.createdAt)), "HH:mm") ===
						a.time && a.amount++;
				});
			});

			return aux;
		});
	}, [tickets]);

	return (
		<React.Fragment>
			<Title>{`${"Atendimentos Criados: "}${count}`}</Title>
			<ResponsiveContainer>
				<AreaChart
					data={chartData}
					width={730}
					height={250}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					<defs>
						<linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
							<stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" stroke={theme.palette.type === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
					<XAxis
						dataKey="time"
						stroke={theme.palette.text.secondary}
						style={{ fontSize: '12px' }}
					/>
					<YAxis
						type="number"
						allowDecimals={false}
						stroke={theme.palette.text.secondary}
						style={{ fontSize: '12px' }}
					>
						<Label
							angle={270}
							position="left"
							style={{
								textAnchor: "middle",
								fill: theme.palette.text.secondary,
								fontSize: '12px'
							}}
						>
							Tickets
						</Label>
					</YAxis>
					<Tooltip
						contentStyle={{
							backgroundColor: theme.palette.type === 'dark' ? '#2d2d2d' : '#fff',
							border: '1px solid #10b981',
							borderRadius: '8px'
						}}
					/>
					<Area
						type="monotone"
						dataKey="amount"
						stroke="#10b981"
						strokeWidth={2.5}
						fill="url(#colorAmount)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
};

export default Chart;
