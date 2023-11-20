import {EChartsOption} from "echarts";

const  monthlyConsumptionConfig: EChartsOption = {
  responsive: true,
  maintainAspectRatio: false,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  color: ['#4074f8', '#ff541e'],
  legend: {
    data: ['Consumption at low rate', 'Consumption at high rate'],
    textStyle: { color: '#8791af' },
    bottom:'right',

  },
  xAxis: [
    {
      type: 'category',
      axisPointer: {
        type: 'shadow'
      },
      axisLine: {
        lineStyle: {
          color: '#8791af'
        },
      },
    }
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: []
};
export  {monthlyConsumptionConfig}
