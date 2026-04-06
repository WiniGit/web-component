# wini-web-components

A modern, lightweight React TypeScript UI component library with 35+ ready-to-use components, responsive layout utilities, design token theming, and optional Wini backend integration for dynamic form/table/page rendering.

[![npm version](https://img.shields.io/npm/v/wini-web-components)](https://www.npmjs.com/package/wini-web-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Table of Contents

- [Installation](#installation)
- [Setup: Wrap Your App with WiniProvider](#setup-wrap-your-app-with-winiprovider)
- [Layout System](#layout-system)
- [Components](#components)
  - [Button](#button)
  - [Winicon](#winicon)
  - [TextField](#textfield)
  - [TextArea](#textarea)
  - [Select1](#select1)
  - [Checkbox](#checkbox)
  - [Switch](#switch)
  - [RadioButton](#radiobutton)
  - [DateTimePicker](#datetimepicker)
  - [NumberPicker](#numberpicker)
  - [Slider](#slider)
  - [Rating](#rating)
  - [InputOtp](#inputotp)
  - [ColorPicker](#colorpicker)
  - [SelectMultiple](#selectmultiple)
  - [Tag](#tag)
  - [Pagination](#pagination)
  - [InfiniteScroll](#infinitescroll)
  - [Dialog](#dialog)
  - [Popup](#popup)
  - [ToastMessage](#toastmessage)
  - [ProgressBar](#progressbar)
  - [ProgressCircle](#progresscircle)
  - [Calendar](#calendar)
  - [Carousel](#carousel)
  - [VideoPlayer / AudioPlayer / IframePlayer](#videoplayer--audioplayer--iframeplayer)
  - [ImportFile / UploadFiles](#importfile--uploadfiles)
  - [CustomCkEditor5](#customckeditor5)
  - [WiniEditor](#winieditor)
  - [IconPicker](#iconpicker)
- [Utility Functions (`Util` class)](#utility-functions-util-class)
  - [Date & Time](#-date--time)
  - [Number & Currency Formatting](#-number--currency-formatting)
  - [Color Utilities](#-color-utilities)
  - [String Utilities](#-string-utilities)
  - [File Utilities](#-file-utilities)
  - [Storage Utilities](#-storage-utilities)
  - [Auth & Encoding](#-auth--encoding)
  - [JSON Formatting](#-json-formatting)
  - [ID & Random Generation](#-id--random-generation)
- [Backend-Driven Modules](#backend-driven-modules)
  - [PageById](#pagebyid)
  - [PageByUrl](#pagebyurl)
  - [FormById](#formbyid)
  - [CardById](#cardbyid)
  - [ViewById](#viewbyid)
- [Responsive Grid Classes](#responsive-grid-classes)
- [Design Tokens & Theming](#design-tokens--theming)

---

## Installation

```bash
npm install wini-web-components
```

---

These provide:
- **`root.css`** — CSS design token variables (colors, borders, shadows) through https://cdn.jsdelivr.net/gh/WiniGit/web-component@latest/src/skin/root.css
- **`typography.css`** — text utility classes (`heading-1` → `heading-8`, `body-1` → `body-3`, etc.) through https://cdn.jsdelivr.net/gh/WiniGit/web-component@latest/src/skin/typography.css
- **`layout.css`** — `row`, `col`, and responsive grid classes through https://cdn.jsdelivr.net/gh/WiniGit/web-component@latest/src/skin/layout.css

---

## Setup: Wrap Your App with WiniProvider

`WiniProvider` is the root provider. It sets up routing, toasts, dialogs, auth token handling, and optionally loads design tokens and i18n from a Wini backend.

```tsx
// main.tsx
import WiniProvider from 'wini-web-components'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WiniProvider
    pid="your-project-id"
    url="https://your-wini-api.com/"
    fileUrl="https://your-file-server.com/"
    imgUrlId="https://your-cdn.com/"
    theme="light"              // "light" | "dark"
    loadResources={true}       // set false to skip backend token/i18n loading
  >
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
  </WiniProvider>
)
```

> **Note:** `WiniProvider` wraps `BrowserRouter` internally — do **not** add another `BrowserRouter` in your app.

### Access Global Context

```tsx
import { useWiniContext } from 'wini-web-components'

function MyComponent() {
  const { theme, setTheme, userData, setUserData, globalData, setGlobalData, i18n } = useWiniContext()
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle theme</button>
}
```

---

## Layout System

Use `row` and `col` classes for flex layouts. These are available globally after importing the skin CSS.

```tsx
// Horizontal layout (flex-direction: row, align-items: center)
<div className="row" style={{ gap: 12 }}>
  <span>Left</span>
  <span className="remain">This stretches to fill remaining space</span>
  <span>Right</span>
</div>

// Vertical layout (flex-direction: column)
<div className="col" style={{ gap: 8 }}>
  <span>Top</span>
  <span>Bottom</span>
</div>
```

> `remain` inside a `row` or `col` expands to fill available space (`flex: 1`).

---

## Components

### Button

A versatile button supporting sizes, color variants, icons, links, tooltips, and keyboard `Enter` on submit type.

```tsx
import { Button, Winicon } from 'wini-web-components'

// Basic
<Button label="Click me" onClick={() => alert('clicked!')} />

// Size variants (default: size32)
<Button label="Large" className="size48 button-primary" onClick={...} />

// As a link
<Button label="Go to docs" linkTo="https://example.com" target="_blank" className="size40 button-neutral" />

// With prefix icon
<Button
  label="Save"
  prefix={<Winicon src="outline/files/save-2" size={16} />}
  className="size40 button-primary"
  onClick={...}
/>

// With tooltip
<Button label="Info" tooltip={{ message: 'More details', position: 'top' }} />

// Submit type — also triggers on Enter key
<Button label="Submit" type="submit" className="size40 button-primary" onClick={...} />
```

**Size classes:** `size24` `size32`*(default)* `size40` `size48` `size56` `size64`

**Color classes:** `button-primary` `button-grey` `button-neutral` `button-black` `button-white` `button-infor` `button-warning` `button-error` `button-success` `button-infor-main` `button-warning-main` `button-error-main` `button-success-main`

> `SimpleButton` is a variant that auto-disables itself during the async `onClick` to prevent double-clicks.

---

### Winicon

SVG icon component loaded from the [WiniGit icon library CDN](https://github.com/WiniGit/icon-library). Icons are cached in the browser after first load.

```tsx
import { Winicon } from 'wini-web-components'

<Winicon src="outline/user/user" size={24} color="#287CF0" />
<Winicon src="fill/actions/trash" size={20} onClick={() => handleDelete()} className="icon-button" />

// With tooltip
<Winicon src="outline/essential/info-circle" size={20} tooltip={{ message: 'Help', position: 'bottom' }} />
```

**Size classes:** `size24` `size32` `size40` `size48` `size56` `size64`
**Style classes:** `icon-button` (adds hover/click interactivity styles), `light`

---

### TextField

Styled text input with optional prefix/suffix slots, helper text, and `react-hook-form` support.

```tsx
import { TextField } from 'wini-web-components'

// Basic
<TextField placeholder="Enter name" onChange={(e) => setName(e.target.value)} />

// With prefix icon and helper text
<TextField
  prefix={<Winicon src="outline/user/user" size={16} />}
  placeholder="Email"
  type="email"
  helperText="Invalid email"        // shown below the field in red
  className="size40 body-3"
/>

// With react-hook-form
const { register } = useForm()
<TextField placeholder="Username" register={register('username', { required: true })} />
```

**Size classes:** `size24` `size32` `size40`*(default)* `size48`

---

### TextArea

Multi-line text input.

```tsx
import { TextArea } from 'wini-web-components'

<TextArea placeholder="Write something..." onChange={(e) => setText(e.target.value)} />
```

---

### Select1

Single-value dropdown. Supports static options, async lazy-loading, hierarchical (parent/child) options, and custom render.

```tsx
import { Select1 } from 'wini-web-components'

const options = [
  { id: '1', name: 'Option A' },
  { id: '2', name: 'Option B' },
  { id: '3', name: 'Option C', disabled: true },
]

// Static options
<Select1
  value={selected}
  options={options}
  placeholder="Choose one"
  onChange={(item) => setSelected(item?.id)}
/>

// Async options (loaded on open / search)
<Select1
  options={[]}
  getOptions={async ({ length, search }) => {
    const res = await fetchItems({ page: Math.floor(length / 10) + 1, search })
    return { data: res.items, totalCount: res.total }
  }}
  onChange={(item) => setSelected(item?.id)}
/>
```

---

### Checkbox

```tsx
import { Checkbox } from 'wini-web-components'

<Checkbox value={isChecked} onChange={(val) => setIsChecked(val)} />
<Checkbox value={null} />   {/* null = indeterminate state */}
```

---

### Switch

Toggle switch with customizable colors and size.

```tsx
import { Switch } from 'wini-web-components'

<Switch value={isOn} onChange={(val) => setIsOn(val)} />
<Switch value={isOn} size="2.4rem" onBackground="#287CF0" offBackground="#D7D7DB" onChange={...} />
```

---

### RadioButton

```tsx
import { RadioButton } from 'wini-web-components'

<RadioButton value={selected === 'a'} onChange={() => setSelected('a')} label="Option A" />
<RadioButton value={selected === 'b'} onChange={() => setSelected('b')} label="Option B" />
```

---

### DateTimePicker

Date and/or time picker.

```tsx
import { DateTimePicker } from 'wini-web-components'

<DateTimePicker value={date} onChange={(val) => setDate(val)} placeholder="Pick a date" />
```

---

### NumberPicker

Numeric input with increment/decrement controls.

```tsx
import { NumberPicker } from 'wini-web-components'

<NumberPicker value={count} onChange={(val) => setCount(val)} min={0} max={100} />
```

---

### Slider

Range slider input.

```tsx
import { Slider } from 'wini-web-components'

<Slider value={volume} min={0} max={100} onChange={(val) => setVolume(val)} />
```

---

### Rating

Star rating input.

```tsx
import { Rating } from 'wini-web-components'

<Rating value={3} onChange={(val) => setRating(val)} />
```

---

### InputOtp

OTP / PIN code input with configurable digit count.

```tsx
import { InputOtp } from 'wini-web-components'

<InputOtp length={6} onComplete={(code) => verifyOtp(code)} />
```

---

### ColorPicker

Hex/RGBA color picker input.

```tsx
import { ColorPicker } from 'wini-web-components'

<ColorPicker value={color} onChange={(hex) => setColor(hex)} />
```

---

### SelectMultiple

Multi-value dropdown with tag display.

```tsx
import { SelectMultiple } from 'wini-web-components'

<SelectMultiple
  value={['1', '2']}
  options={[{ id: '1', name: 'React' }, { id: '2', name: 'TypeScript' }]}
  onChange={(items) => setSelected(items.map(i => i.id))}
/>
```

---

### Tag

Small label/badge component with color support.

```tsx
import { Tag } from 'wini-web-components'

<Tag>Active</Tag>
<Tag style={{ backgroundColor: '#B7D3FA', color: '#287CF0' }}>Info</Tag>
```

---

### Pagination

Page navigation component.

```tsx
import { Pagination } from 'wini-web-components'

<Pagination
  currentPage={page}
  total={totalItems}
  pageSize={20}
  onChange={(newPage) => setPage(newPage)}
/>
```

---

### InfiniteScroll

Trigger a callback when the user scrolls to the bottom of a container.

```tsx
import { InfiniteScroll } from 'wini-web-components'

<InfiniteScroll onLoadMore={() => fetchNextPage()} isLoading={loading} hasMore={hasMore}>
  {items.map(item => <div key={item.id}>{item.name}</div>)}
</InfiniteScroll>
```

---

### Dialog

A global imperative dialog (confirm/alert modal). Rendered by `WiniProvider` — no extra setup needed.

```tsx
import { showDialog, DialogAlignment, ComponentStatus } from 'wini-web-components'

showDialog({
  title: 'Delete item?',
  content: 'This action cannot be undone.',
  status: ComponentStatus.ERROR,
  alignment: DialogAlignment.center,
  onSubmit: () => handleDelete(),
  submitTitle: 'Delete',
  cancelTitle: 'Cancel',
})
```

**Status options:** `ComponentStatus.INFOR` `ComponentStatus.WARNING` `ComponentStatus.ERROR` `ComponentStatus.SUCCESS`

---

### Popup

A flexible fullscreen/overlay modal managed via ref.

```tsx
import { Popup, showPopup, closePopup } from 'wini-web-components'
import { useRef } from 'react'

const popupRef = useRef<Popup>()

// Trigger open
showPopup({
  ref: popupRef,
  heading: <h3>My Popup</h3>,
  body: <p>Custom content here</p>,
  footer: <Button label="Close" onClick={() => closePopup(popupRef)} />,
  clickOverlayClosePopup: true,
})

// Place once in your JSX
<Popup ref={popupRef} />
```

---

### ToastMessage

Imperative toast notifications. Rendered by `WiniProvider` — no extra setup needed.

```tsx
import { ToastMessage } from 'wini-web-components'

ToastMessage.success('Saved successfully!')
ToastMessage.errors('Something went wrong.')
ToastMessage.warn('Check your input.')
ToastMessage.infor('New update available.')
```

---

### ProgressBar

```tsx
import { ProgressBar } from 'wini-web-components'

<ProgressBar value={72} max={100} />
```

---

### ProgressCircle

```tsx
import { ProgressCircle } from 'wini-web-components'

<ProgressCircle value={72} max={100} />
```

---

### Calendar

Standalone date calendar view.

```tsx
import { Calendar } from 'wini-web-components'

<Calendar value={date} onChange={(val) => setDate(val)} />
```

---

### Carousel

Image/content slideshow powered by `react-awesome-slider`.

```tsx
import { Carousel } from 'wini-web-components'

<Carousel>
  <div data-src="/image1.jpg" />
  <div data-src="/image2.jpg" />
</Carousel>
```

---

### VideoPlayer / AudioPlayer / IframePlayer

Media player components for video, audio, and embedded iframes.

```tsx
import { VideoPlayer, AudioPlayer, IframePlayer } from 'wini-web-components'

<VideoPlayer src="https://example.com/video.mp4" />
<AudioPlayer src="https://example.com/audio.mp3" />
<IframePlayer src="https://www.youtube.com/embed/dQw4w9WgXcQ" />
```

---

### ImportFile / UploadFiles

File import input and multi-file uploader.

```tsx
import { ImportFile, UploadFiles } from 'wini-web-components'

// Single file pick (no upload)
<ImportFile onChange={(file) => setFile(file)} accept=".pdf,.docx" />

// Upload to server
<UploadFiles
  onComplete={(urls) => setAttachments(urls)}
  maxFiles={5}
/>
```

---

### CustomCkEditor5

Rich text editor wrapper for CKEditor 5. Requires `ckeditor5` and `@ckeditor/ckeditor5-react` as peer dependencies.

```tsx
import { CustomCkEditor5 } from 'wini-web-components'

<CustomCkEditor5 value={html} onChange={(html) => setHtml(html)} />
```

---

### WiniEditor

Lightweight built-in rich text editor (no peer dependency required).

```tsx
import { WiniEditor } from 'wini-web-components'

<WiniEditor value={content} onChange={(val) => setContent(val)} />
```

---

### IconPicker

Searchable icon selector from the Wini icon library.

```tsx
import { IconPicker } from 'wini-web-components'

<IconPicker value={icon} onChange={(iconName) => setIcon(iconName)} />
```

---

---

## Utility Functions (`Util` class)

The `Util` class provides a comprehensive collection of static helper methods for date/time, number formatting, color conversion, string manipulation, browser storage, cookies, and more.

```tsx
import { Util, formatNumberConvert, randomGID } from 'wini-web-components'
```

---

### 📅 Date & Time

#### `Util.dateTime_stringToDecimal(stringDate: string): number`

Converts a date string to a **Unix timestamp in seconds**.

```ts
Util.dateTime_stringToDecimal('2024-01-15T10:30:00')
// => 1705311000
```

| Param | Type | Description |
|-------|------|-------------|
| `stringDate` | `string` | Any valid JS date string |
| **Returns** | `number` | Unix timestamp in **seconds** |

---

#### `Util.dateDefault`

Static constant — the timestamp of `01/01/2021`. Useful as a fallback or baseline.

```ts
Util.dateDefault  // => 1609459200000 (milliseconds)
```

---

#### `Util.calculateAge(birthdate: string): number`

Calculates a person's current age from a `dd/MM/yyyy` birthdate string.

```ts
Util.calculateAge('15/06/1995')  // => 30 (as of 2026)
Util.calculateAge('invalid')     // => 0
```

| Param | Type | Description |
|-------|------|-------------|
| `birthdate` | `string` | Date in `dd/MM/yyyy` format |
| **Returns** | `number` | Age in full years, or `0` if invalid |

---

#### `Util.getStringDateNow(): string`

Returns today's date as a formatted string `DD -MM -YYYY`.

```ts
Util.getStringDateNow()  // => "06 -04 -2026"
```

---

#### `Util.stringToDate(_date, _format?, _delimiter?): Date`

Parses a date string into a `Date` object with flexible format and optional time support.

```ts
Util.stringToDate('15/06/2024')
// => Date: June 15, 2024

Util.stringToDate('15/06/2024 14:30:00', 'dd/mm/yyyy HH:mm:ss')
// => Date: June 15, 2024 at 14:30:00

Util.stringToDate('2024-06-15', 'yyyy-mm-dd', '-')
// => Date: June 15, 2024
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `_date` | `string` | — | The date string to parse |
| `_format` | `string` | `"dd/mm/yyyy"` | Format pattern. Date parts: `dd`, `mm`, `yyyy`. Time parts: `HH`/`hh`, `mm`, `ss` |
| `_delimiter` | `string` | `"/"` | Delimiter between date parts |
| **Returns** | `Date` | | Parsed `Date` object |

---

#### `Util.dateToString(x?, y?): string`

Converts a `Date` object (or timestamp number) to a formatted string. Supports date-only, time-only, date+time, and time+date formats.

```ts
Util.dateToString(new Date(), 'dd/mm/yyyy')
// => "06/04/2026"

Util.dateToString(new Date(), 'yyyy-mm-dd hh:mm:ss')
// => "2026-04-06 14:30:00"

Util.dateToString(new Date(), 'hh:mm dd/mm/yyyy')
// => "14:30 06/04/2026"

Util.dateToString(new Date(), 'mm/yyyy')
// => "04/2026"

Util.dateToString(new Date(), 'dd/mm')
// => "06/04"

Util.dateToString(1712419200000, 'dd/mm/yyyy')
// => "06/04/2024"
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `x` | `Date \| number` | `new Date()` | Date object or timestamp in ms |
| `y` | `string` | `"dd/mm/yyyy"` | Format: `dd/mm/yyyy`, `yyyy-mm-dd`, `hh:mm:ss`, `dd/mm/yyyy hh:mm`, etc. |
| **Returns** | `string` | | Formatted date/time string, or `""` if input is falsy |

**Supported format tokens:** `dd`, `mm`, `yyyy`, `hh`, `mm` (minute), `ss`  
**Supported separators:** `/` and `-` for dates, `:` for time

---

#### `Util.timeSince(dateCreate, translate?): string`

Returns a human-readable relative time string (e.g. "5 minutes ago"). Defaults to **Vietnamese**; pass a `translate` function for other languages.

```ts
// Vietnamese (default)
Util.timeSince(Date.now() - 3600000)       // => "1 giờ trước"
Util.timeSince(Date.now() - 120000)        // => "2 phút trước"
Util.timeSince(Date.now() - 86400000)      // => "hôm qua"
Util.timeSince(Date.now() - 500)           // => "vừa xong"

// English (with translate function)
const t = (key: string) => ({
  year: 'year', years: 'years',
  month: 'month', months: 'months',
  day: 'day', days: 'days',
  hour: 'hour', hours: 'hours',
  minute: 'minute', minutes: 'minutes',
  yesterday: 'yesterday',
  ago: 'ago', now: 'just now'
}[key] || key)

Util.timeSince(Date.now() - 7200000, t)   // => "2 hours ago"
```

| Param | Type | Description |
|-------|------|-------------|
| `dateCreate` | `number` | Timestamp in milliseconds |
| `translate` | `(key: string) => string` | Optional i18n function. Keys: `year`, `years`, `month`, `months`, `day`, `days`, `hour`, `hours`, `minute`, `minutes`, `yesterday`, `ago`, `now` |
| **Returns** | `string` | Relative time string |

---

### 💰 Number & Currency Formatting

#### `Util.formatCurrency(amount, currency?, options?): string`

Formats a number into a **currency string** with the correct symbol, position, and locale formatting. Supports 5 currencies out of the box.

```ts
// Vietnamese Dong (default)
Util.formatCurrency(1500000)                    // => "1,500,000.00 ₫"
Util.formatCurrency(1500000, 'VND')             // => "1,500,000.00 ₫"

// US Dollar
Util.formatCurrency(1999.99, 'USD')             // => "$1,999.99"

// Japanese Yen
Util.formatCurrency(150000, 'JPY')              // => "¥150,000.00"

// Chinese Yuan
Util.formatCurrency(6800, 'CNY')                // => "¥6,800.00"

// Indian Rupee
Util.formatCurrency(50000, 'INR')               // => "₹50,000.00"

// Custom decimal places
Util.formatCurrency(1500000, 'VND', { decimals: 0 })  // => "1,500,000 ₫"
Util.formatCurrency(19.9, 'USD', { decimals: 3 })     // => "$19.900"

// Invalid input
Util.formatCurrency('invalid')                  // => "0"
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `amount` | `number \| string` | — | The value to format |
| `currency` | `'VND' \| 'USD' \| 'JPY' \| 'CNY' \| 'INR'` | `'VND'` | Currency code |
| `options.decimals` | `number` | `2` | Number of decimal places |
| `options.symbol` | `boolean` | — | Reserved for future use |
| **Returns** | `string` | | Formatted currency string with symbol |

**Supported currencies:**

| Currency | Symbol | Position | Example |
|----------|--------|----------|---------|
| `VND` | `₫` | After (with space) | `1,500,000.00 ₫` |
| `USD` | `$` | Before | `$1,999.99` |
| `JPY` | `¥` | Before | `¥150,000.00` |
| `CNY` | `¥` | Before | `¥6,800.00` |
| `INR` | `₹` | Before | `₹50,000.00` |

---

#### `Util.convertCurrency(amount, fromCurrency, toCurrency, rates?): number`

Converts an amount from one currency to another using exchange rates. Uses built-in default rates (base: USD) or accepts custom rates.

```ts
// USD to VND (default rates)
Util.convertCurrency(100, 'USD', 'VND')
// => 2450000

// VND to USD
Util.convertCurrency(2450000, 'VND', 'USD')
// => 100

// JPY to VND
Util.convertCurrency(10000, 'JPY', 'VND')
// => 2227272.73

// With custom exchange rates
Util.convertCurrency(100, 'USD', 'VND', { USD: 1, VND: 25000, JPY: 115, CNY: 7.2, INR: 83 })
// => 2500000

// Unknown currency returns the original amount
Util.convertCurrency(100, 'USD', 'EUR' as any)
// => 100
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `amount` | `number` | — | Amount to convert |
| `fromCurrency` | `'VND' \| 'USD' \| 'JPY' \| 'CNY' \| 'INR'` | — | Source currency |
| `toCurrency` | `'VND' \| 'USD' \| 'JPY' \| 'CNY' \| 'INR'` | — | Target currency |
| `rates` | `{ [key: string]: number }` | See below | Custom exchange rates (base: USD = 1) |
| **Returns** | `number` | | Converted amount (2 decimal places) |

**Default exchange rates (base: USD = 1):**

| Currency | Rate |
|----------|------|
| `USD` | `1` |
| `VND` | `24,500` |
| `JPY` | `110` |
| `CNY` | `6.5` |
| `INR` | `74.5` |

> 💡 Pass your own `rates` object with live exchange rates for production use.

---

#### `Util.to_vietnamese(number): string`

Converts a number to its **Vietnamese word representation** (e.g. for invoices, contracts, checks).

```ts
Util.to_vietnamese(1500000)
// => "Một triệu năm trăm nghìn"

Util.to_vietnamese(42)
// => "Bốn mươi hai"

Util.to_vietnamese(1001)
// => "Một nghìn lẻ một"
```

| Param | Type | Description |
|-------|------|-------------|
| `number` | `number \| string` | Number to convert |
| **Returns** | `string` | Vietnamese words (first letter capitalized), or `''` if NaN |

---

#### `Util.numberToAlphabet(n?): string`

Converts a **1-based number** to alphabetical column letters (like Excel columns: A, B, ... Z, AA, AB, ...).

```ts
Util.numberToAlphabet(1)    // => "A"
Util.numberToAlphabet(3)    // => "C"
Util.numberToAlphabet(26)   // => "Z"
Util.numberToAlphabet(27)   // => "AA"
Util.numberToAlphabet(703)  // => "AAA"
Util.numberToAlphabet(0)    // => ""
```

| Param | Type | Description |
|-------|------|-------------|
| `n` | `number` | 1-based index |
| **Returns** | `string` | Alphabetical string, or `''` if n ≤ 0 or undefined |

---

#### `formatNumberConvert(num): string` *(standalone export)*

Formats large numbers into **compact notation** (K, M, B).

```ts
formatNumberConvert(999)          // => "999"
formatNumberConvert(1500)         // => "1.5K"
formatNumberConvert(2500000)      // => "2.5M"
formatNumberConvert(3000000000)   // => "3B"
formatNumberConvert(10000)        // => "10K"
```

| Param | Type | Description |
|-------|------|-------------|
| `num` | `number` | Number to format |
| **Returns** | `string` | Compact string with K/M/B suffix |

---

### 🎨 Color Utilities

#### `Util.hexToRGB(hex): string`

Converts a hex color string to `rgb()` or `rgba()` format. Supports 3-char, 6-char, and 8-char (with alpha) hex strings, with or without `#`.

```ts
Util.hexToRGB('#ff5733')     // => "rgb(255, 87, 51)"
Util.hexToRGB('#ff573380')   // => "rgba(255, 87, 51, 128)"
Util.hexToRGB('f00')         // => "rgb(255, 0, 0)"
Util.hexToRGB('00ff00')      // => "rgb(0, 255, 0)"
```

---

#### `Util.rgbToHex(rgba): string`

Converts an `rgb()` or `rgba()` string to hex format. Always returns 8-character hex (with alpha).

```ts
Util.rgbToHex('rgb(255, 87, 51)')        // => "#ff5733ff"
Util.rgbToHex('rgba(255, 87, 51, 0.5)')  // => "#ff573380"
Util.rgbToHex('rgba(0, 0, 0, 1)')        // => "#000000ff"
```

> Throws `Error` if the input string is not a valid RGB/RGBA format.

---

#### `Util.colorNameToHex(color): string`

Converts a CSS **named color** to its hex value (without `#` prefix). Supports 140+ standard CSS color names.

```ts
Util.colorNameToHex('tomato')       // => "ff6347"
Util.colorNameToHex('dodgerblue')   // => "1e90ff"
Util.colorNameToHex('coral')        // => "ff7f50"
Util.colorNameToHex('black')        // => "000000"
```

---

#### `Util.percentToHex(p): string`

Converts a percentage (0–100) to a **2-digit hex string** (00–FF). Useful for alpha channel values.

```ts
Util.percentToHex(100)  // => "FF"
Util.percentToHex(50)   // => "80"
Util.percentToHex(0)    // => "00"
Util.percentToHex(75)   // => "BF"
```

---

#### `Util.hexToPercent(h): number`

Converts a 2-digit hex string back to a **percentage** (0–100).

```ts
Util.hexToPercent('FF')  // => 100
Util.hexToPercent('80')  // => 50
Util.hexToPercent('00')  // => 0
```

---

#### `Util.generateRandomColor(): string`

Generates a random hex color string.

```ts
Util.generateRandomColor()  // => "#a3f29b" (random each call)
```

---

#### `Util.generateLightColorRgb(): string`

Generates a random **light/pastel** color in `rgb()` format (each channel between 230–255).

```ts
Util.generateLightColorRgb()  // => "rgb(240,235,245)" (random light color)
```

---

#### `Util.generateDarkColorRgb(id?): string`

Generates a **dark** color in HSL format. If an `id` is provided, the color is **deterministic** — the same id always produces the same color. Great for assigning consistent avatar/badge colors.

```ts
// Random dark color
Util.generateDarkColorRgb()
// => "hsl(142, 80%, 25%)"

// Deterministic from number
Util.generateDarkColorRgb(42)
// => "hsl(42, 80%, 25%)"

// Deterministic from string (hashed)
Util.generateDarkColorRgb('user-abc')
// => "hsl(237, 80%, 25%)"

// Same id = same color every time
Util.generateDarkColorRgb('user-abc') === Util.generateDarkColorRgb('user-abc')
// => true
```

| Param | Type | Description |
|-------|------|-------------|
| `id` | `number \| string` | Optional. Seed for deterministic color |
| **Returns** | `string` | HSL color string with 80% saturation, 25% lightness |

---

#### `Util.getRandomGradient(seed): string`

Generates a **deterministic CSS linear gradient** from a seed string. Same seed = same gradient every time. Produces light/pastel colors suitable for backgrounds.

```ts
Util.getRandomGradient('project-123')
// => "linear-gradient(90deg, rgb(230, 210, 245), rgb(240, 235, 220))"

Util.getRandomGradient('user-abc')
// => "linear-gradient(90deg, rgb(245, 232, 228), rgb(230, 240, 235))"

// Use as inline style
<div style={{ background: Util.getRandomGradient(user.id) }} />
```

| Param | Type | Description |
|-------|------|-------------|
| `seed` | `string` | Seed value for deterministic output |
| **Returns** | `string` | CSS `linear-gradient(90deg, ...)` string |

---

### 📝 String Utilities

#### `Util.toSlug(input): string`

Converts a string to a **URL-friendly slug**. Handles Vietnamese diacritics, accents, and special characters.

```ts
Util.toSlug('Xin Chào Thế Giới!')     // => "xin-chao-the-gioi"
Util.toSlug('Hello World 2024')         // => "hello-world-2024"
Util.toSlug('Đây là Tiếng Việt')       // => "day-la-tieng-viet"
Util.toSlug('  Multiple   Spaces  ')    // => "multiple-spaces"
```

---

#### `Util.convertToKebabCase(str): string`

Converts a camelCase, PascalCase, or space/underscore-separated string to **kebab-case**.

```ts
Util.convertToKebabCase('myComponentName')  // => "my-component-name"
Util.convertToKebabCase('Hello World')       // => "hello-world"
Util.convertToKebabCase('some_value')        // => "some-value"
Util.convertToKebabCase('backgroundColor')   // => "background-color"
```

---

#### `Util.kebabToCamelCase(str): string`

Converts a kebab-case string to **camelCase**.

```ts
Util.kebabToCamelCase('my-component-name')  // => "myComponentName"
Util.kebabToCamelCase('background-color')    // => "backgroundColor"
Util.kebabToCamelCase('font-size')           // => "fontSize"
```

---

#### `Util.randomString(length): string`

Generates a random **alphanumeric** string (a-z, A-Z, 0-9) of the given length.

```ts
Util.randomString(8)    // => "aB3kZ9mQ" (random)
Util.randomString(16)   // => "xR4pL2nW8vK1jM6q" (random)
Util.randomString(32)   // => 32-character random string
```

---

#### `Util.extractHashtags(content): string[]`

Extracts all **hashtags** from a string (also works with HTML content).

```ts
Util.extractHashtags('Hello #world and #react developers')
// => ["#world", "#react"]

Util.extractHashtags('<p>Check out #typescript and #vite</p>')
// => ["#typescript", "#vite"]

Util.extractHashtags('No hashtags here')
// => []
```

---

### 🗂 File Utilities

#### `Util.stringToFile(content, fileName, type?): File`

Creates a `File` object from a string. Useful for generating downloadable files or preparing upload payloads.

```ts
const jsonFile = Util.stringToFile('{"key":"value"}', 'data.json', 'application/json')
// => File { name: "data.json", type: "application/json", ... }

const csvFile = Util.stringToFile('name,age\nAlice,30', 'users.csv', 'text/csv')
// => File { name: "users.csv", type: "text/csv", ... }

const textFile = Util.stringToFile('Hello world', 'note.txt')
// => File { name: "note.txt", type: "text/plain", ... }
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `content` | `string` | — | File content as string |
| `fileName` | `string` | — | Name of the file |
| `type` | `string` | `"text/plain"` | MIME type |
| **Returns** | `File` | | A `File` object |

---

### 💾 Storage Utilities

Convenience wrappers around the browser's `localStorage`, `sessionStorage`, and `document.cookie` APIs.

#### localStorage

| Method | Signature | Description |
|--------|-----------|-------------|
| `Util.setStorage` | `(key: string, value: string) => void` | Store a value |
| `Util.getStorage` | `(key: string) => string \| null` | Retrieve a value |
| `Util.removeStorage` | `(key: string) => void` | Remove a specific key |
| `Util.clearStorage` | `() => void` | Clear all localStorage |

```ts
Util.setStorage('theme', 'dark')
Util.getStorage('theme')       // => "dark"
Util.removeStorage('theme')
Util.getStorage('theme')       // => null
Util.clearStorage()            // clears everything
```

#### sessionStorage

Data is automatically deleted when the **browser tab is closed**.

| Method | Signature | Description |
|--------|-----------|-------------|
| `Util.setSession` | `(key: string, value: string) => void` | Store a value |
| `Util.getSession` | `(key: string) => string \| null` | Retrieve a value |
| `Util.removeSession` | `(key: string) => void` | Remove a specific key |
| `Util.clearSession` | `() => void` | Clear all sessionStorage |

```ts
Util.setSession('tempData', JSON.stringify({ step: 3 }))
Util.getSession('tempData')    // => '{"step":3}'
Util.removeSession('tempData')
Util.clearSession()
```

#### Cookies

| Method | Signature | Description |
|--------|-----------|-------------|
| `Util.setCookie` | `(cname: string, cvalue: number \| string, exdays?: number) => void` | Set a cookie (default **30 days** expiry) |
| `Util.getCookie` | `(cname: string) => string` | Get a cookie value (returns `""` if not found) |
| `Util.deleteCookie` | `(cname: string) => void` | Delete a specific cookie |
| `Util.clearCookie` | `(exceptCookie?: string[]) => void` | Clear **all** cookies, optionally keeping specified ones |

```ts
Util.setCookie('token', 'abc123', 7)      // expires in 7 days
Util.setCookie('session', 'xyz', 1)       // expires in 1 day
Util.getCookie('token')                   // => "abc123"
Util.deleteCookie('token')
Util.getCookie('token')                   // => ""
Util.clearCookie(['session'])              // clears all cookies EXCEPT 'session'
Util.clearCookie()                         // clears ALL cookies
```

---

### 🔐 Auth & Encoding

#### `Util.decodeJwtResponse(token): object`

Decodes a JWT token and returns the **parsed payload** as a JavaScript object. Does **not** verify the signature — use for client-side display only.

```ts
const payload = Util.decodeJwtResponse('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ...')
// => { sub: "1234567890", name: "John Doe", iat: 1516239022 }
```

| Param | Type | Description |
|-------|------|-------------|
| `token` | `string` | A JWT token string |
| **Returns** | `object` | Parsed payload object |

> ⚠️ **Security note:** This only decodes, it does not validate. Always verify tokens server-side.

---

### 🖨 JSON Formatting

#### `Util.prettyJsonToString(data): string`

Converts a JSON object to a **pretty-printed HTML string** with `<br>` for newlines and `&nbsp;` for indentation. Useful for rendering formatted JSON inside HTML elements.

```ts
Util.prettyJsonToString({ name: "John", age: 30 })
// => '{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "John",<br>...'
```

---

#### `Util.syntaxHighlight(json): string`

Converts a JSON object to a **syntax-highlighted HTML string** with `<span>` wrappers for each value type. Useful for building JSON viewers/debuggers.

```ts
Util.syntaxHighlight({ active: true, count: 42, name: "test" })
// Returns HTML with:
//   <span className="boolean">true</span>
//   <span className="number">42</span>
//   <span className="string">"test"</span>
```

**CSS class types:** `number`, `string`, `boolean`, `null`, `key`

---

### 🆔 ID & Random Generation

#### `randomGID(): string` *(standalone export)*

Generates a random **globally-unique ID** using `crypto.randomUUID()` with dashes removed. Returns a 32-character hex string.

```ts
import { randomGID } from 'wini-web-components'

randomGID()  // => "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6"
randomGID()  // => "f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2" (different each call)
```

---

## Backend-Driven Modules

These components connect to the **Wini backend** and render entire UIs from server-side configuration (layouts, forms, cards, views). They require `WiniProvider` to be set up with a valid `pid` and `url`.

> All five components share a common customization API: `propsData`, `childrenData`, and `itemData` — which let you override specific elements by their **layer ID** (the `id` field set in the Wini editor for that element).

---

### PageById

Renders a full page (layout shell + body content) fetched from the backend by page ID. Typically used inside a `<Route>`.

```tsx
import { PageById } from 'wini-web-components'

// Basic — renders the full page with its layout
<Route path="/dashboard" element={<PageById id="PAGE_ID" />} />

// Override props of a specific layer by its element ID
<PageById
  id="PAGE_ID"
  propsData={{
    "element-gid": { style: { backgroundColor: 'red' }, className: 'my-class' }
  }}
/>

// Replace children of a layer entirely
<PageById
  id="PAGE_ID"
  childrenData={{
    "element-gid": <MyCustomComponent />
  }}
/>

// Replace a layer entirely
<PageById
  id="PAGE_ID"
  itemData={{
    "element-gid": <MyCustomComponent />
  }}
/>

// Render only the layout shell (without body content)
<PageById id="PAGE_ID" onlyLayout />

// Render only the body content (without layout shell)
<PageById id="PAGE_ID" onlyBody />
```

---

### PageByUrl

Same as `PageById` but looks up the page by its **URL path** configured in the Wini backend. Useful for dynamic routing where page IDs are not known at build time.

```tsx
import { PageByUrl } from 'wini-web-components'

// Renders the page registered under "/dashboard" in the Wini backend
<PageByUrl url="/dashboard" />

// Inject custom children into the layout body slot
<PageByUrl url="/dashboard" onlyLayout>
  <MyBodyContent />
</PageByUrl>

// Same customization API as PageById
<PageByUrl
  url="/dashboard"
  propsData={{ "element-gid": { style: { color: 'blue' } } }}
  childrenData={{ "element-gid": <CustomWidget /> }}
/>
```

---

### FormById

Renders a data-entry form from backend configuration by form ID. Manages its own `react-hook-form` state internally. Exposes an imperative ref for programmatic submit.

```tsx
import { FormById } from 'wini-web-components'
import { useRef } from 'react'

const formRef = useRef(null)

// Basic — form submits and calls onSubmit with field values
<FormById
  id="FORM_ID"
  onSubmit={(data) => console.log('submitted:', data)}
  onError={(errors) => console.error('validation failed:', errors)}
/>

// Pre-populate with existing data (e.g. edit mode)
<FormById
  id="FORM_ID"
  data={{ Name: 'Alice', Age: 30 }}
  onSubmit={(data) => updateRecord(data)}
/>

// Load data from backend by query
<FormById
  id="FORM_ID"
  controller={{ searchRaw: '@Id:{some-id}' }}
  onSubmit={(data) => updateRecord(data)}
/>

// Load data from backend by IDs
<FormById
  id="FORM_ID"
  controller={{ ids: 'id1,id2', maxLength: 1 }}
  onSubmit={(data) => updateRecord(data)}
/>

// Trigger submit programmatically via ref
<FormById ref={formRef} id="FORM_ID" onSubmit={handleSubmit} />
<Button label="Save" onClick={() => formRef.current?.onSubmit()} />

// Supply custom dropdown options for a relation field
<FormById
  id="FORM_ID"
  customOptions={{ categoryId: [{ id: '1', name: 'Tech' }, { id: '2', name: 'Art' }] }}
  onSubmit={handleSubmit}
/>

// Customize a specific field's wrapper props or replace it entirely
<FormById
  id="FORM_ID"
  propsData={{ "field-element-gid": { style: { display: 'none' } } }}
  itemData={{ "field-element-gid": <MyCustomField /> }}
  onSubmit={handleSubmit}
/>
```

**Ref handle:**
```ts
formRef.current.onSubmit()           // trigger submit programmatically
formRef.current.methods              // UseFormReturn — full react-hook-form instance
formRef.current.cols                 // resolved column definitions from backend
formRef.current.rels                 // resolved relation definitions from backend
```

---

### CardById

Renders a **repeating list** of items using a card template configured in the backend. Fetches its own data, supports pagination, filtering, sorting, and exposes a ref for imperative data refresh.

```tsx
import { CardById } from 'wini-web-components'
import { useRef } from 'react'

const cardRef = useRef(null)

// Basic — fetches and renders all items
<CardById id="CARD_ID" />

// With query controller (search + pagination)
<CardById
  id="CARD_ID"
  controller={{ page: 1, size: 10, searchRaw: '@Status:[0 1]', sortby: [{ prop: 'Name', direction: 'ASC' }] }}
  onLoaded={({ data, totalCount }) => setTotal(totalCount)}
/>

// Provide data directly (skip backend fetch)
<CardById
  id="CARD_ID"
  cardData={[{ Id: '1', Name: 'Item A' }, { Id: '2', Name: 'Item B' }]}
/>

// Fetch all records
<CardById id="CARD_ID" controller="all" />

// Custom render per item — functions receive (itemData, index, methods)
<CardById
  id="CARD_ID"
  propsData={{
    "element-gid": (item, index) => ({ style: { color: item.IsActive ? 'green' : 'red' } })
  }}
  childrenData={{
    "element-gid": (item, index) => <span>{item.Name}</span>
  }}
  itemData={{
    "element-gid": (item, index) => <MyCustomRow data={item} />
  }}
/>

// Empty state
<CardById id="CARD_ID" emptyMessage="No items found" emptyLink="/create" />

// Imperative refresh
<CardById ref={cardRef} id="CARD_ID" controller={{ page: 1, size: 10, searchRaw: '*' }} />
<Button label="Refresh" onClick={() => cardRef.current?.getData(1)} />
```

**Ref handle:**
```ts
cardRef.current.getData(page?)       // re-fetch data (optionally set page)
cardRef.current.data                 // { data: Array<{...}>, totalCount?: number }
cardRef.current.setData(newData)     // manually update rendered data
cardRef.current.controller           // current active query controller
```

---

### ViewById

Renders a **single item detail view** from backend configuration. Similar to `CardById` but for one record instead of a list.

```tsx
import { ViewById } from 'wini-web-components'

// Pass data directly (e.g. from a parent list)
<ViewById
  id="VIEW_ID"
  data={{ Id: 'abc', Name: 'Alice', Email: 'alice@example.com' }}
/>

// Or let it fetch by query
<ViewById
  id="VIEW_ID"
  controller={{ searchRaw: `@Id:{${recordId}}` }}
  onLoaded={({ data }) => setRecord(data)}
/>

// Override specific elements — same API as PageById/CardById
<ViewById
  id="VIEW_ID"
  data={record}
  propsData={{ "label-gid": { style: { fontWeight: 'bold' } } }}
  childrenData={{ "value-gid": <strong>{record.Name}</strong> }}
/>
```

---

## Responsive Grid Classes

The layout system uses a **24-column grid**. Add these classes to children inside a `row`.

| Class | Columns | Notes |
|---|---|---|
| `col1` – `col24` | 1/24 – 24/24 | Always applied |
| `remain` | fills rest | `flex: 1` |
| `col1-min` – `col24-min` | at **< 576px** | phones |
| `col1-sm` – `col24-sm` | at **≥ 576px** | small devices |
| `col1-md` – `col24-md` | at **≥ 768px** | tablets |
| `col1-lg` – `col24-lg` | at **≥ 992px** | laptops |
| `col1-xl` – `col24-xl` | at **≥ 1200px** | desktops |
| `col1-xxl` – `col24-xxl` | at **> 1200px** | wide screens |

```tsx
// 2-column on desktop, stacks on mobile
<div className="row" style={{ gap: 16 }}>
  <div className="col24 col12-lg" style={{ "--gutter": "16px" }}>Left panel</div>
  <div className="col24 col12-lg" style={{ "--gutter": "16px" }}>Right panel</div>
</div>
```

---

## Design Tokens & Theming

Colors are defined as CSS variables in `root.css` and can be overridden by WiniProvider at runtime.

```css
/* Default token examples */
--primary-main-color: #287CF0;
--primary-bolder-color: #0F62D7;
--neutral-bolder-border: 1px solid #D7D7DB;
/* semantic */
--success-main-color: ...;
--error-main-color: ...;
--warning-main-color: ...;
```

Dark mode is toggled by adding the `.dark` class to `<html>`. Use `setTheme` from `useWiniContext`:

```tsx
const { setTheme } = useWiniContext()
setTheme('dark')   // adds .dark to <html>
setTheme('light')  // removes .dark from <html>
```