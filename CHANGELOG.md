# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
