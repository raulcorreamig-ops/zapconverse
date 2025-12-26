import React, { useEffect, useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import brLocale from 'date-fns/locale/pt-BR';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Button, Stack, TextField } from '@mui/material';
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import api from '../../services/api';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import './button.css';
import { i18n } from '../../translate/i18n';

export const ChartsDate = () => {
    const theme = useTheme();
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());
    const [ticketsData, setTicketsData] = useState({ data: [], count: 0 });

    const companyId = localStorage.getItem("companyId");

    useEffect(() => {
        handleGetTicketsInformation();
    }, []);

    // Formata os dados para o Recharts
    const chartData = ticketsData?.data?.length > 0 ? ticketsData.data.map((item) => ({
        name: item.hasOwnProperty('horario')
            ? `${item.horario}:00`
            : item.data,
        total: item.total,
        fullLabel: item.hasOwnProperty('horario')
            ? `Das ${item.horario}:00 às ${item.horario}:59`
            : item.data
    })) : [];

    // Calcula o valor máximo para o eixo Y
    const maxValue = chartData.length > 0
        ? Math.max(...chartData.map(item => item.total))
        : 10;
    const yAxisMax = Math.ceil(maxValue * 1.1); // 10% de margem superior

    const handleGetTicketsInformation = async () => {
        try {
            const { data } = await api.get(`/dashboard/ticketsDay?initialDate=${format(initialDate, 'yyyy-MM-dd')}&finalDate=${format(finalDate, 'yyyy-MM-dd')}&companyId=${companyId}`);
            setTicketsData(data);
        } catch (error) {
            toast.error(i18n.t("dashboard.toasts.dateChartError"));
        }
    }

    // Tooltip customizado
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: theme.palette.type === 'dark' ? '#2d2d2d' : '#fff',
                    padding: '12px',
                    border: '2px solid #10b981',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                    <p style={{ margin: 0, fontWeight: 600, color: theme.palette.text.primary }}>
                        {payload[0].payload.fullLabel}
                    </p>
                    <p style={{ margin: '4px 0 0 0', color: '#10b981', fontWeight: 700 }}>
                        Total: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ fontWeight: 600 }}>
                Total de Atendimentos ({ticketsData?.count})
            </Typography>

            <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{ my: 2, }} flexWrap="wrap">
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={brLocale}>
                    <DatePicker
                        value={initialDate}
                        onChange={(newValue) => { setInitialDate(newValue) }}
                        label={i18n.t("dashboard.charts.date.start")}
                        renderInput={(params) => <TextField fullWidth {...params} sx={{ width: '20ch' }} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={brLocale}>
                    <DatePicker
                        value={finalDate}
                        onChange={(newValue) => { setFinalDate(newValue) }}
                        label={i18n.t("dashboard.charts.date.end")}
                        renderInput={(params) => <TextField fullWidth {...params} sx={{ width: '20ch' }} />}
                    />
                </LocalizationProvider>

                <Button
                    className="buttonHover"
                    onClick={handleGetTicketsInformation}
                    variant='contained'
                    style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#fff',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '8px',
                        padding: '10px 24px',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                    }}
                >
                    {i18n.t("dashboard.charts.date.filter")}
                </Button>
            </Stack>

            <ResponsiveContainer width="100%" height={280}>
                <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 50, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme.palette.type === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                    />
                    <XAxis
                        dataKey="name"
                        stroke={theme.palette.text.secondary}
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={{ fontSize: '12px' }}
                        allowDecimals={false}
                        domain={[0, yAxisMax]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#10b981"
                        strokeWidth={3}
                        fill="url(#colorTotal)"
                        animationDuration={1000}
                        animationEasing="ease-in-out"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}