import { Checkbox } from './component/checkbox/checkbox'
import { Select1, OptionsItem } from './component/select1/select1'
import { Switch } from './component/switch/switch'
import { showPopup, closePopup, Popup } from './component/popup/popup'
import { showDialog, DialogAlignment } from './component/dialog/dialog'
import { DateTimePicker } from './component/date-time-picker/date-time-picker'
import { SelectMultiple } from './component/input-multi-select/input-multi-select'
import { ProgressBar } from './component/progress-bar/progress-bar'
import { ComponentStatus, getStatusIcon } from './component/component-status'
import { Text } from './component/text/text'
import { Pagination } from './component/pagination/pagination'
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
import { Button, SimpleButton } from './component/button/button'
import { Tag } from './component/tag/tag'
import { Winicon, showTooltipElement } from './component/wini-icon/winicon'
import { NumberPicker } from './component/number-picker/number-picker'
import { InputOtp } from './component/input-otp/input-otp'
import { WLoginView } from './form/login/view'
import { CustomCkEditor5 } from './component/ck-editor/ckeditor'
import { Slider } from './component/slider/slider'
import { ColorPicker } from './component/color-picker/color-picker'
import { IconPicker } from './component/icon-picker/icon-picker'
import { WiniEditor } from './component/wini-editor/wini-editor'
import { TextFieldForm, InputPasswordForm, TextAreaForm, DateTimePickerForm, CKEditorForm, Select1Form, SelectMultipleForm, SwitchForm, RateForm, CheckboxForm, RadioButtonForm, GroupRadioButtonForm, ImportFileForm, RangeForm, GroupCheckboxForm, ColorPickerForm, IconPickerForm, WiniEditorForm } from './component/component-form'
import { EmptyPage } from './component/empty-page'
import { BaseDA, CkEditorUploadAdapter, imgFileTypes } from './controller/config'
import { Util, formatNumberConvert, randomGID, inputMoneyPattern } from './controller/utils'
import { DataController, SettingDataController, AccountController } from './controller/data'
import { TableController, WiniController } from './controller/setting'
import { CardById } from './module/card/cardById'
import { ChartById } from './module/chart/chartById'
import { FormById } from './module/form/formById'
import { ViewById } from './module/view/viewById'
import { PageById, PageByUrl } from './module/page/pageById'
import { WiniProvider } from './module/WiniProvider'
import { TableById, DataTable } from './module/table/tableById'

export {
  Calendar,
  ComponentStatus,
  getStatusIcon,
  Checkbox,
  Select1,
  Switch,
  Popup, showPopup, closePopup,
  showDialog, DialogAlignment,
  DateTimePicker,
  SelectMultiple,
  ProgressBar,
  Text,
  Pagination,
  TextField,
  RadioButton,
  TextArea,
  ImportFile,
  ToastMessage,
  InfiniteScroll,
  Rating,
  ProgressCircle,
  Carousel,
  ColorPicker,
  WiniEditor,
  IconPicker,
  ToastContainer,
  Button, SimpleButton,
  Tag,
  Winicon, showTooltipElement,
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
  IconPickerForm,
  WiniEditorForm,
  EmptyPage,
  // module
  BaseDA,
  CkEditorUploadAdapter,
  imgFileTypes,
  Util,
  formatNumberConvert,
  randomGID,
  inputMoneyPattern,
  AccountController,
  DataController,
  SettingDataController,
  TableController, WiniController,
  CardById,
  ChartById,
  FormById,
  ViewById,
  PageById,
  PageByUrl,
  TableById, DataTable
}
export type { OptionsItem }
export { i18n, useTranslation } from './language/i18n';
export { Routes, Route, useNavigate, useParams, useLocation, useSearchParams, Navigate, NavLink, Outlet } from 'react-router-dom'
export default WiniProvider