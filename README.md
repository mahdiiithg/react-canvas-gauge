# react-canvas-gauge-3d

[![npm version](https://img.shields.io/npm/v/react-canvas-gauge-3d.svg)](https://www.npmjs.com/package/react-canvas-gauge-3d)
[![npm downloads](https://img.shields.io/npm/dm/react-canvas-gauge-3d.svg)](https://www.npmjs.com/package/react-canvas-gauge-3d)
[![license](https://img.shields.io/npm/l/react-canvas-gauge-3d.svg)](https://github.com/mahdiiithg/react-canvas-gauge/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/mahdiiithg/react-canvas-gauge.svg)](https://github.com/mahdiiithg/react-canvas-gauge)

A customizable, canvas-based gauge component for React. Features include dark mode support, alert zones, range indicators, smooth animations, and render prop extensibility. Perfect for dashboards, monitoring panels, and data visualization applications.

<p align="center">
  <img src="https://raw.githubusercontent.com/mahdiiithg/react-canvas-gauge/main/docs/assets/demo.gif" alt="react-canvas-gauge demo" width="400" />
</p>

## Features

- **High Performance** - Canvas-based rendering for smooth, efficient visualization
- **Dark Mode** - Built-in light/dark theme switching
- **Alert Zones** - Visual high/low alert indicators with gradient zones
- **Range Indicators** - Show target ranges on the gauge
- **Smooth Animations** - Animated needle movement with configurable duration
- **Fully Customizable** - Colors, ticks, labels, and more
- **Render Props** - Extensible via render props for controller, editor, and alarm icons
- **Responsive** - Automatically sizes to fit container
- **Unit Conversion** - Optional value conversion function support

## Installation

```bash
# npm
npm install react-canvas-gauge-3d

# yarn
yarn add react-canvas-gauge-3d

# pnpm
pnpm add react-canvas-gauge-3d
```

### Peer Dependencies

Ensure you have React installed:

```bash
npm install react react-dom
```

## Quick Start

```jsx
import { Gauge } from 'react-canvas-gauge-3d';

function App() {
  return (
    <div style={{ width: 300, height: 300 }}>
      <Gauge
        value={75}
        minValue={0}
        maxValue={100}
        label="Speed"
        unit="km/h"
      />
    </div>
  );
}
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value displayed on the gauge |
| `minValue` | `number` | `0` | Minimum scale value |
| `maxValue` | `number` | `100` | Maximum scale value |
| `label` | `string` | `''` | Label text displayed on the gauge |
| `unit` | `string` | `''` | Unit symbol displayed next to value |

### Appearance Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `200` | Base size of the gauge in pixels |
| `isDarkMode` | `boolean` | `false` | Enable dark mode styling |
| `majorTicksCount` | `number` | `6` | Number of major tick marks |
| `minorTicksCount` | `number` | `4` | Number of minor ticks between major ticks |

### Alert Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alertEnabled` | `boolean` | `false` | Enable alert zone visualization |
| `alertHigh` | `number` | - | High alert threshold value |
| `alertLow` | `number` | - | Low alert threshold value |
| `alertSnoozed` | `boolean` | `false` | Whether alert is currently snoozed |

### Range Indicator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showRange` | `boolean` | `false` | Show range indicator arc |
| `rangeMin` | `number` | - | Range indicator minimum value |
| `rangeMax` | `number` | - | Range indicator maximum value |

### Animation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animated` | `boolean` | `true` | Enable smooth value animation |
| `animationDuration` | `number` | `300` | Animation duration in milliseconds |

### Arc Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showArc` | `boolean` | `false` | Show colored arc around gauge edge |

### Value Conversion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `convertValue` | `function` | - | Function to convert display value `(value) => convertedValue` |
| `decimalPlaces` | `number` | `2` | Decimal places for displayed value |

### Edit Mode Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `canEdit` | `boolean` | `false` | Show edit/settings button |
| `disableEditButton` | `boolean` | `false` | Hide the edit button |
| `onEditClick` | `function` | - | Callback when edit button is clicked |

### Built-in Settings Panel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `settingsConfig` | `object` | - | Configuration for editable fields (see below) |
| `onSettingsChange` | `function` | - | Callback when settings are saved `(settings) => void` |

#### settingsConfig Format

```javascript
{
  fieldName: {
    type: 'number' | 'text' | 'select' | 'toggle',
    label: 'Display Label',
    min: 0,           // for number type
    max: 100,         // for number type
    step: 1,          // for number type
    options: [        // for select type
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
    ]
  }
}
```

### Render Props (Extensibility)

| Prop | Type | Description |
|------|------|-------------|
| `renderController` | `function` | Render custom controller at bottom of gauge |
| `renderEditor` | `function` | Render custom editor overlay `({ onClose, size }) => ReactNode` |
| `renderAlarmIcon` | `function` | Render custom alarm icon `({ isOn, isSnoozed, size }) => ReactNode` |

### Secondary Display Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `digitalValue` | `number` | - | Secondary digital value to display |
| `digitalUnit` | `string` | - | Unit for digital value |
| `secondaryLabel` | `string` | - | Secondary label (e.g., pump size) |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS class for container |
| `style` | `object` | `{}` | Additional inline styles |

## Examples

### Basic Gauge

```jsx
<Gauge
  value={50}
  minValue={0}
  maxValue={100}
  label="Temperature"
  unit="°C"
/>
```

### Dark Mode with Alerts

```jsx
<Gauge
  value={85}
  minValue={0}
  maxValue={100}
  label="CPU Usage"
  unit="%"
  isDarkMode={true}
  alertEnabled={true}
  alertHigh={80}
  alertLow={20}
/>
```

### With Range Indicator

```jsx
<Gauge
  value={65}
  minValue={0}
  maxValue={100}
  label="Target Zone"
  showRange={true}
  rangeMin={40}
  rangeMax={70}
/>
```

### With Custom Controller

```jsx
<Gauge
  value={42}
  minValue={0}
  maxValue={100}
  label="Speed"
  renderController={() => (
    <button onClick={() => console.log('Reset clicked')}>
      Reset
    </button>
  )}
/>
```

### With Custom Editor

```jsx
<Gauge
  value={50}
  canEdit={true}
  renderEditor={({ onClose, size }) => (
    <div style={{ background: 'white', padding: 20, borderRadius: 8 }}>
      <h3>Edit Gauge Settings</h3>
      <button onClick={onClose}>Close</button>
    </div>
  )}
/>
```

### With Built-in Settings Panel

Hover over the center circle and click the settings icon to open the panel:

```jsx
<Gauge
  value={75}
  minValue={0}
  maxValue={100}
  label="Temperature"
  unit="°C"
  alertEnabled={true}
  alertHigh={80}
  alertLow={20}
  
  // Configure which fields are editable
  settingsConfig={{
    minValue: { type: 'number', label: 'Min Value', min: 0, max: 1000 },
    maxValue: { type: 'number', label: 'Max Value', min: 0, max: 1000 },
    alertHigh: { type: 'number', label: 'High Alert', min: 0, max: 1000 },
    alertLow: { type: 'number', label: 'Low Alert', min: 0, max: 1000 },
    rangeMin: { type: 'number', label: 'Range Min', min: 0, max: 1000 },
    rangeMax: { type: 'number', label: 'Range Max', min: 0, max: 1000 },
    unit: { 
      type: 'select', 
      label: 'Unit',
      options: [
        { value: '°C', label: 'Celsius' },
        { value: '°F', label: 'Fahrenheit' },
        { value: 'K', label: 'Kelvin' },
      ]
    },
    alertEnabled: { type: 'toggle', label: 'Enable Alerts' },
    showRange: { type: 'toggle', label: 'Show Range' },
  }}
  
  // Callback when user saves settings
  onSettingsChange={(settings) => {
    console.log('New settings:', settings);
    // Update your state or call API
    updateGaugeSettings(gaugeId, settings);
  }}
/>
```

### Unit Conversion

```jsx
// Convert Celsius to Fahrenheit
<Gauge
  value={25}
  minValue={0}
  maxValue={100}
  label="Temperature"
  unit="°F"
  convertValue={(celsius) => (celsius * 9/5) + 32}
/>
```

## Exported Utilities

The package also exports some utilities you can use:

```jsx
import { 
  Gauge,
  useElementSize,  // Hook for measuring element dimensions
  getSpeedColor,   // Utility to get color based on value position
  SettingsIcon,    // Settings gear SVG icon
  AlarmOnIcon,     // Alarm on SVG icon
  AlarmOffIcon,    // Alarm off SVG icon
} from 'react-canvas-gauge-3d';

// useElementSize example
const { elementRef, elementSize } = useElementSize();
console.log(elementSize.width, elementSize.height);

// getSpeedColor example
const color = getSpeedColor(75, 0, 100); // Returns color based on position
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE) © [Mahdi Tahavorgar](https://github.com/mahdiiithg)

## Links

- [GitHub Repository](https://github.com/mahdiiithg/react-canvas-gauge)
- [npm Package](https://www.npmjs.com/package/react-canvas-gauge-3d)
- [Issue Tracker](https://github.com/mahdiiithg/react-canvas-gauge/issues)
- [Changelog](CHANGELOG.md)

## Author

**Mahdi Tahavorgar**

- GitHub: [@mahdiiithg](https://github.com/mahdiiithg)
- LinkedIn: [Mahdi Tahavorgar](https://www.linkedin.com/in/mahdi-thg/)

---

If you find this package useful, please consider giving it a ⭐ on [GitHub](https://github.com/mahdiiithg/react-canvas-gauge)!
