import * as moment from "moment";
import {ChartConfiguration} from "chart.js";

const monthlyConsumptionConfig: ChartConfiguration<'bar'>['data'] = {
  labels: [],
  datasets: [],
};
const dailyConsumptionConfig: ChartConfiguration<'bar'>['data'] = {
  labels: [],
  datasets: []
};

const compareToPreviousConfig: ChartConfiguration<'bar'>['data'] = {
  labels: [],
  datasets: []
};


export {monthlyConsumptionConfig,dailyConsumptionConfig,compareToPreviousConfig}
