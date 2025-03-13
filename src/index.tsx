import { Checkbox } from './component/checkbox/checkbox'
import { Select1, OptionsItem } from './component/select1/select1'
import { Switch } from './component/switch/switch'
import { showPopup, closePopup, Popup } from './component/popup/popup'
import { showDialog, Dialog, DialogAlignment } from './component/dialog/dialog'
import { DateTimePicker } from './component/date-time-picker/date-time-picker'
import { SelectMultiple } from './component/input-multi-select/input-multi-select'
import { ProgressBar } from './component/progress-bar/progress-bar'
import { ComponentStatus, getStatusIcon } from './component/component-status'
import { Text } from './component/text/text'
import { Pagination } from './component/pagination/pagination'
import { Table, TbCell, TbHeader, TbRow, TbBody, CellAlignItems } from './component/table/table'
import { TextField } from './component/text-field/text-field'
import { RadioButton } from './component/radio-button/radio-button'
import { TextArea } from './component/text-area/text-area'
import { ImportFile } from './component/import-file/import-file'
import { ToastMessage } from './component/toast-noti/toast-noti'
import { Calendar } from './component/calendar/calendar'
import { InfiniteScroll } from './component/infinite-scroll/infinite-scroll'
import { Rating } from './component/rating/rating'
import { ProgressCircle } from './component/progress-circle/progress-circle'
import { Carousel } from './component/carousel/carousel'
import { ToastContainer } from 'react-toastify'
import { Button } from './component/button/button'
import { Tag } from './component/tag/tag'
import { Winicon } from './component/wini-icon/winicon'
import { NumberPicker } from './component/number-picker/number-picker'
import { InputOtp } from './component/input-otp/input-otp'
import { WLoginView } from './form/login/view'
import { CustomCkEditor5 } from './component/ck-editor/ckeditor'
import { Slider } from './component/slider/slider'
import { TextFieldForm, InputPasswordForm, TextAreaForm, DateTimePickerForm, CKEditorForm, Select1Form, SelectMultipleForm, SwitchForm, RateForm, CheckboxForm, RadioButtonForm, GroupRadioButtonForm, ImportFileForm, RangeForm, GroupCheckboxForm, ColorPickerForm } from './component/component-form'
import { EmptyPage } from './component/empty-page'

export {
  Calendar,
  ComponentStatus,
  getStatusIcon,
  Checkbox,
  Select1, Switch,
  Popup, showPopup, closePopup,
  Dialog, showDialog, DialogAlignment,
  DateTimePicker,
  SelectMultiple,
  ProgressBar,
  Text,
  Pagination,
  Table, TbCell, TbHeader, TbBody, TbRow, CellAlignItems,
  TextField,
  RadioButton,
  TextArea,
  ImportFile,
  ToastMessage,
  InfiniteScroll,
  Rating,
  ProgressCircle,
  Carousel,
  ToastContainer,
  Button,
  Tag,
  Winicon,
  NumberPicker,
  InputOtp,
  WLoginView,
  CustomCkEditor5,
  Slider,
  TextFieldForm,
  InputPasswordForm,
  TextAreaForm,
  DateTimePickerForm,
  CKEditorForm,
  Select1Form,
  SelectMultipleForm,
  SwitchForm,
  RateForm,
  CheckboxForm,
  RadioButtonForm,
  GroupRadioButtonForm,
  ImportFileForm,
  RangeForm,
  GroupCheckboxForm,
  ColorPickerForm,
  EmptyPage
}
export type { OptionsItem }
export { i18n } from './language/i18n';