import * as moment from "moment";

 export class DateHelper{
   static InitialDatesForChart(isForDatePicker?:boolean): string[] {
    const start = moment().startOf('month')
    return  DateHelper.GenerateMonthsSet(start,isForDatePicker);
  }

   static GenerateMonthsSet(startDate:moment.Moment,isForDatePicker?:boolean){
    const months: string[] = [];
    const today = moment().subtract(11, 'months').format('MM-DD-YYYY');
    const end = moment(today);
    while (end.isSameOrBefore(startDate, 'month')) {
      if(isForDatePicker){
        months.push(startDate.format('MMM YYYY'))
      }else{
        months.push(startDate.format('MMM YYYY'))
      }
      startDate.subtract(1, 'month')
    }
    return months;
  }
  static GetMonthsSetFromNewMonth(month:Date){
    const momentDate  = moment(month).startOf('month');
    return DateHelper.GenerateMonthsSet(momentDate);
  }
  static GetInitialDatesForPicker(){
     const arr =  DateHelper.InitialDatesForChart(true)
     return {from:arr[0], to: arr[arr.length-1]};
  }
}
