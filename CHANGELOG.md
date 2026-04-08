# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2026-04-08

### Added
- Range settings support in settings panel (`showRange`, `rangeMin`, `rangeMax`)

### Improved
- Settings panel is now larger and easier to use without scrolling
- Better toggle switch styling with smooth animation
- Improved button hover effects
- Better spacing and visual hierarchy in settings panel

## [1.2.0] - 2026-04-08

### Added
- **Built-in Settings Panel** - Interactive settings editor that appears on center circle hover
  - New `settingsConfig` prop to define editable fields
  - New `onSettingsChange` callback triggered on save
  - Support for field types: `number`, `text`, `select`, `toggle`
  - Responsive panel sizing based on gauge size
  - Dark/light mode support
- Settings icon appears on hover over center circle
- Backdrop overlay when settings panel is open

### Changed
- Updated JSDoc comments for better documentation
- Improved code organization with separate SettingsPanel component

## [1.0.1] - 2026-04-07

### Changed
- Package renamed to `react-canvas-gauge-3d`
- Updated README with npm badges and author info
- Added GitHub repository links

## [1.0.0] - 2026-04-06

### Added
- Initial release of react-canvas-gauge
- Canvas-based gauge component with smooth rendering
- Dark mode support via `isDarkMode` prop
- Alert zones with high/low thresholds
- Range indicator support
- Smooth needle animation with configurable duration
- Customizable tick marks (major and minor)
- Unit conversion function support
- Render props for extensibility:
  - `renderController` - Custom bottom controller
  - `renderEditor` - Custom edit overlay
  - `renderAlarmIcon` - Custom alarm icons
- Exported utilities:
  - `useElementSize` hook for responsive sizing
  - `getSpeedColor` utility for color based on value
  - Icon components (SettingsIcon, AlarmOnIcon, AlarmOffIcon)
- Full TypeScript-ready prop documentation
- Responsive sizing to fit container
