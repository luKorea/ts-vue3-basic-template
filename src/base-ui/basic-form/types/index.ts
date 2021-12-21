// 定义组件类型，可扩展
type IFormType =
  | "input"
  | "password"
  | "select"
  | "datepicker"
  | "switch"
  | "checkbox"
  | "radio"
  | "button";

export interface IFormItem {
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: any;
  // el-select 选项
  options?: any[];
  // 其他组件选项
  otherOptions?: any;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemStyle?: any;
}
