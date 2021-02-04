import ProFormDatePicker from './DatePicker';
import ProFormDatePickerWeek from './WeekPicker';
import ProFormDatePickerMonth from './MonthPicker';
import ProFormDatePickerQuarter from './QuarterPicker';
import ProFormDatePickerYear from './YearPicker';

const ExportComponent = ProFormDatePicker as typeof ProFormDatePicker & {
  Week: typeof ProFormDatePickerWeek;
  Month: typeof ProFormDatePickerMonth;
  Quarter: typeof ProFormDatePickerQuarter;
  Year: typeof ProFormDatePickerYear;
};

ExportComponent.Year = ProFormDatePickerYear;
ExportComponent.Quarter = ProFormDatePickerQuarter;
ExportComponent.Month = ProFormDatePickerMonth;
ExportComponent.Week = ProFormDatePickerWeek;

export default ExportComponent;
