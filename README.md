# wini-web-components

A modern, lightweight, and highly customizable UI component library for ReactJS projects. Built with TSX, JSX, and CSS, `wini-web-components` provides a collection of reusable components to help you create responsive, beautiful, and user-friendly interfaces with ease. Whether you're building a small app or a large-scale project, this library offers the flexibility and tools you need to speed up your development process.

## Why Choose wini-web-components?

- **Ready-to-Use Components**: A wide range of pre-built UI components for quick integration.
- **Responsive Design**: Built-in CSS classes for seamless responsiveness across devices, from mobile to extra-large screens.
- **Customizable**: Easily style and configure components to match your project's design.
- **Lightweight**: Minimal overhead to keep your app fast and efficient.
- **TypeScript Support**: Fully typed with TSX for a better developer experience.

## Installation

Install the package via npm:


npm install wini-web-components

### Using Skin:
add this cdn link into your App.css file. \
@import url(https://cdn.jsdelivr.net/gh/WiniGit/web-component@latest/src/skin/root.css); \
@import url(https://cdn.jsdelivr.net/gh/WiniGit/web-component@latest/src/skin/typography.css); \
@import url(https://cdn.jsdelivr.net/gh/WiniGit/web-component@latest/src/skin/layout.css); \
\
row: for horizontal layout. \
col: for vertical layout. \
### Responsive Design:
wini-web-components comes with built-in CSS classes to ensure your UI looks great on all devices. The library supports responsive layouts for:\
Min Devices (Small phones): < 576px. \
Small Devices (Phones): Up to 576px. \
Medium Devices (Tablets): 576px to 768px. \
Large Devices (Laptops): 768px to 992px. \
Extra Large Devices (Desktops): 992px to 1200px. \
Extra Extra Large Devices: > 1200px. \
Each component is designed to adapt seamlessly to different screen sizes, with CSS classes: \
Ex: remain, col0, col1, col2, col3, col4, col6, col8, col10, col12, col16, col18, col20, col24, col1-min, col2-min, col3-sm, col6-sm, col8-md, col10-lg, col12-lg, col16-xl, col18-xl, col20-xxl, col24-xxl

### Using code features:
Components
wini-web-components includes the following UI components, ready to drop into your React project: \
#Button: A versatile button component with multiple styles.\
support className: \
Ex: size64, size56, size48, size40, size24, default is size32. button-grey, button-primary, button-neutral, button-black, button-white, button-infor, button-warning, button-error, button-success, button-infor-main, button-warning-main, button-error-main, button-success-main \
#WiniIcon: A custom icon component for your app.\
support className: \
Ex: icon-button, light, size64, size56, size48, size40, size32, size24. \
Calendar: A date selection component for scheduling and events. \
Carousel: A slideshow component for displaying images or content. \
Checkbox: A customizable checkbox for forms. \
CK-Editor: A rich text editor integration for content creation. \
Date-Time-Picker: A component for selecting dates and times. \
Dialog: A modal dialog for alerts, forms, or custom content. \
Input-File: A file upload input with a clean UI. \
Input-Multi-Select: A multi-select dropdown for forms. \
Input-Text: A styled text input field.\
Input-Textarea: A textarea for longer text input. \
Number-Picker: A component for selecting numerical values. \
Pagination: A pagination component for navigating large datasets. \
Popup: A popup component for notifications or overlays. \
Progress-Bar: A progress bar to show task completion. \
Progress-Circle: A circular progress indicator. \
Radio-Button: A radio button for single-choice selections. \
Rating: A star rating component for reviews or feedback. \
Select: A dropdown select component for forms. \
Slider: A slider for selecting a range of values. \
Switch: A toggle switch for on/off states. \
Table: A responsive table for displaying tabular data. \
Tag: A tag component for categorization or labeling. \
Text-Area: A textarea with additional styling options. \
Text-Field: A general-purpose text input field. \
