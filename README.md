# wini-web-components

A modern, lightweight React TypeScript UI component library with 35+ ready-to-use components, responsive layout utilities, design token theming, and optional Wini backend integration for dynamic form/table/page rendering.

[![npm version](https://img.shields.io/npm/v/wini-web-components)](https://www.npmjs.com/package/wini-web-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Table of Contents

- [Installation](#installation)
- [Setup: Add Global Styles](#setup-add-global-styles)
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

> **Peer dependencies** — install these in your project if not already present:
> ```bash
> npm install react react-dom react-router-dom
> ```
> For CKEditor support: `npm install ckeditor5 @ckeditor/ckeditor5-react`

---

## Setup: Add Global Styles

Add these imports at the top of your root CSS file (e.g. `App.css` or `index.css`):

```css
@import url(https://cdn.jsdelivr.net/gh/WiniGit/web-component@latest/src/skin/root.css);
@import url(https://cdn.jsdelivr.net/gh/WiniGit/web-component@latest/src/skin/typography.css);
@import url(https://cdn.jsdelivr.net/gh/WiniGit/web-component@latest/src/skin/layout.css);
```

These provide:
- **`root.css`** — CSS design token variables (colors, borders, shadows)
- **`typography.css`** — text utility classes (`heading-1` → `heading-8`, `body-1` → `body-3`, etc.)
- **`layout.css`** — `row`, `col`, and responsive grid classes

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
  const { theme, setTheme, userData, setUserData } = useWiniContext()
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
  controller={{ page: 1, size: 10, searchRaw: '@Status:{active}', sortby: [{ prop: 'Name', direction: 'ASC' }] }}
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
  <div className="col24 col12-lg">Left panel</div>
  <div className="col24 col12-lg">Right panel</div>
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