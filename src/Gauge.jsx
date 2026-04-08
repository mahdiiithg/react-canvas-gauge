import React, { useEffect, useRef, useState } from 'react';
import { useElementSize } from './hooks/useElementSize';
import { getSpeedColor } from './utils/getSpeedColor';
import { SettingsIcon, AlarmOnIcon, AlarmOffIcon } from './icons';

/**
 * Settings Panel Component - Built-in settings editor
 */
const SettingsPanel = ({
  settings,
  settingsConfig,
  onSave,
  onCancel,
  isDarkMode,
  size,
}) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key, value) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(localSettings);
  };

  const panelSize = Math.max(180, size * 0.85);
  const fontSize = Math.max(11, size * 0.045);
  const inputHeight = Math.max(24, size * 0.1);

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
        borderRadius: '12px',
        padding: `${size * 0.06}px`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        width: panelSize,
        maxHeight: panelSize,
        overflowY: 'auto',
        color: isDarkMode ? '#fff' : '#333',
        fontSize: `${fontSize}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: `${size * 0.04}px`,
        borderBottom: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
        paddingBottom: `${size * 0.03}px`,
      }}>
        <span style={{ fontWeight: 'bold', fontSize: `${fontSize * 1.1}px` }}>Settings</span>
        <button
          onClick={onCancel}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: `${fontSize * 1.2}px`,
            color: isDarkMode ? '#aaa' : '#666',
            padding: '2px 6px',
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: `${size * 0.035}px` }}>
        {Object.entries(settingsConfig).map(([key, config]) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontSize: `${fontSize * 0.9}px`, color: isDarkMode ? '#ccc' : '#666' }}>
              {config.label || key}
            </label>
            {config.type === 'select' ? (
              <select
                value={localSettings[key] ?? ''}
                onChange={(e) => handleChange(key, e.target.value)}
                style={{
                  height: inputHeight,
                  padding: '0 8px',
                  borderRadius: '6px',
                  border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
                  backgroundColor: isDarkMode ? '#3a3a3a' : '#fff',
                  color: isDarkMode ? '#fff' : '#333',
                  fontSize: `${fontSize}px`,
                }}
              >
                {config.options?.map((opt) => (
                  <option key={typeof opt === 'object' ? opt.value : opt} value={typeof opt === 'object' ? opt.value : opt}>
                    {typeof opt === 'object' ? opt.label : opt}
                  </option>
                ))}
              </select>
            ) : config.type === 'toggle' ? (
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={localSettings[key] ?? false}
                  onChange={(e) => handleChange(key, e.target.checked)}
                  style={{ width: '16px', height: '16px' }}
                />
                <span style={{ fontSize: `${fontSize * 0.9}px` }}>{localSettings[key] ? 'On' : 'Off'}</span>
              </label>
            ) : (
              <input
                type={config.type === 'number' ? 'number' : 'text'}
                value={localSettings[key] ?? ''}
                onChange={(e) => handleChange(key, config.type === 'number' ? Number(e.target.value) : e.target.value)}
                min={config.min}
                max={config.max}
                step={config.step}
                style={{
                  height: inputHeight,
                  padding: '0 8px',
                  borderRadius: '6px',
                  border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
                  backgroundColor: isDarkMode ? '#3a3a3a' : '#fff',
                  color: isDarkMode ? '#fff' : '#333',
                  fontSize: `${fontSize}px`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginTop: `${size * 0.05}px`,
        paddingTop: `${size * 0.03}px`,
        borderTop: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
      }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: `${size * 0.03}px`,
            borderRadius: '6px',
            border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
            backgroundColor: isDarkMode ? '#3a3a3a' : '#f5f5f5',
            color: isDarkMode ? '#fff' : '#333',
            cursor: 'pointer',
            fontSize: `${fontSize}px`,
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          style={{
            flex: 1,
            padding: `${size * 0.03}px`,
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#1890ff',
            color: '#fff',
            cursor: 'pointer',
            fontSize: `${fontSize}px`,
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

/**
 * A customizable canvas-based gauge component
 * 
 * @param {Object} props
 * @param {number} props.value - Current value to display on the gauge
 * @param {number} [props.minValue=0] - Minimum scale value
 * @param {number} [props.maxValue=100] - Maximum scale value
 * @param {string} [props.label=''] - Label text displayed on the gauge
 * @param {string} [props.unit=''] - Unit symbol displayed next to value
 * @param {number} [props.size=200] - Base size of the gauge in pixels
 * @param {boolean} [props.isDarkMode=false] - Enable dark mode styling
 * @param {number} [props.majorTicksCount=6] - Number of major ticks
 * @param {number} [props.minorTicksCount=4] - Number of minor ticks between major ticks
 * @param {boolean} [props.alertEnabled=false] - Enable alert zones
 * @param {number} [props.alertHigh] - High alert threshold
 * @param {number} [props.alertLow] - Low alert threshold  
 * @param {boolean} [props.alertSnoozed=false] - Whether alert is snoozed
 * @param {boolean} [props.showRange=false] - Show range indicator
 * @param {number} [props.rangeMin] - Range indicator minimum value
 * @param {number} [props.rangeMax] - Range indicator maximum value
 * @param {boolean} [props.showArc=false] - Show colored arc around gauge
 * @param {boolean} [props.animated=true] - Enable value animation
 * @param {number} [props.animationDuration=300] - Animation duration in ms
 * @param {Function} [props.convertValue] - Optional function to convert display value
 * @param {number} [props.decimalPlaces=2] - Decimal places for displayed value
 * @param {boolean} [props.canEdit=false] - Show edit button
 * @param {boolean} [props.disableEditButton=false] - Disable the edit button visibility
 * @param {Function} [props.onEditClick] - Callback when edit button is clicked
 * @param {Function} [props.renderController] - Render prop for custom controller at bottom
 * @param {Function} [props.renderEditor] - Render prop for custom editor overlay
 * @param {Function} [props.renderAlarmIcon] - Render prop for custom alarm icon
 * @param {string} [props.className] - Additional CSS class for container
 * @param {Object} [props.style] - Additional inline styles for container
 * @param {string} [props.digitalValue] - Secondary digital value to display
 * @param {string} [props.digitalUnit] - Unit for digital value
 * @param {string} [props.secondaryLabel] - Secondary label text
 * @param {Object} [props.settingsConfig] - Configuration for built-in settings panel fields
 * @param {Function} [props.onSettingsChange] - Callback when settings are saved (settings) => void
 */
const Gauge = ({
  // Core data
  value = 0,
  minValue = 0,
  maxValue = 100,
  label = '',
  unit = '',
  
  // Appearance
  size = 200,
  isDarkMode = false,
  majorTicksCount = 6,
  minorTicksCount = 4,
  
  // Alert configuration
  alertEnabled = false,
  alertHigh,
  alertLow,
  alertSnoozed = false,
  
  // Range indicator
  showRange = false,
  rangeMin,
  rangeMax,
  
  // Arc
  showArc = false,
  
  // Animation
  animated = true,
  animationDuration = 300,
  
  // Value conversion
  convertValue,
  decimalPlaces = 2,
  
  // Edit mode
  canEdit = false,
  disableEditButton = false,
  onEditClick,
  
  // Render props for extensibility
  renderController,
  renderEditor,
  renderAlarmIcon,
  
  // Styling
  className = '',
  style = {},
  
  // Secondary display
  digitalValue,
  digitalUnit,
  secondaryLabel,
  
  // Settings panel
  settingsConfig,
  onSettingsChange,
}) => {
  const canvasRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isHoveringCenter, setIsHoveringCenter] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);

  // Measure available parent space and clamp gauge size
  const { elementRef: containerRef, elementSize: containerSize } = useElementSize();
  const desiredSize = size || 200;
  const availableWidth = containerSize?.width || Number.POSITIVE_INFINITY;
  const availableHeight = containerSize?.height || Number.POSITIVE_INFINITY;
  const effectiveSize = Math.max(0, Math.min(desiredSize, availableWidth, availableHeight));

  // Compute alarm icon size based on gauge size
  const alarmIconSize = Math.max(14, Math.min(48, Math.round(effectiveSize * 0.06)));

  // Helper to convert values (uses provided function or identity)
  const convert = (val) => {
    if (typeof convertValue === 'function') {
      return convertValue(val);
    }
    return val;
  };

  // Format value for display
  const formatValue = (val) => {
    if (typeof val !== 'number' || isNaN(val)) return '0';
    return val.toFixed(decimalPlaces);
  };

  useEffect(() => {
    const getFontSize = (baseSize) => {
      const scaleFactor = (effectiveSize || 1) / 245;
      return Math.max(baseSize * scaleFactor, 8);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startRendering();
      }
    };

    const handleFocus = () => startRendering();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    const startRendering = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = effectiveSize / 2 - 10;
      const startAngle = Math.PI * 0.75;
      const endAngle = Math.PI * 2.25;
      const numMajorTicks = majorTicksCount;
      const numMinorTicks = minorTicksCount;

      const clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };

      function drawTicksAndLabels() {
        const totalAngleRange = endAngle - startAngle;
        const scaleFactor = effectiveSize / 300;
        
        for (let i = 0; i < numMajorTicks; i++) {
          const majorSpeed = minValue + (i / (numMajorTicks - 1)) * (maxValue - minValue);
          const majorAngle = startAngle + (i / (numMajorTicks - 1)) * totalAngleRange;
          const majorTickX = centerX + (radius - 15 * scaleFactor) * Math.cos(majorAngle);
          const majorTickY = centerY + (radius - 15 * scaleFactor) * Math.sin(majorAngle);
          const majorLabelX = centerX + (radius - 30 * scaleFactor) * Math.cos(majorAngle);
          const majorLabelY = centerY + (radius - 30 * scaleFactor) * Math.sin(majorAngle);

          let majorSpeedText = typeof majorSpeed === 'number' ? majorSpeed : '0';

          ctx.beginPath();
          ctx.moveTo(majorTickX, majorTickY);
          ctx.lineTo(centerX + radius * Math.cos(majorAngle), centerY + radius * Math.sin(majorAngle));
          ctx.strokeStyle = isDarkMode ? 'white' : 'black';
          ctx.lineWidth = 2 * scaleFactor;
          ctx.stroke();

          ctx.fillStyle = isDarkMode ? 'white' : 'black';
          ctx.font = `${getFontSize(14)}px Arial`;
          const maxWidth = 65 * scaleFactor;
          const ellipsis = '...';
          
          if (
            majorSpeedText !== 0 &&
            majorSpeedText.toString().length > 2 &&
            ctx.measureText(majorSpeedText.toString()).width > maxWidth
          ) {
            majorSpeedText = majorSpeedText.toString();
            while (ctx.measureText(majorSpeedText + ellipsis).width > maxWidth) {
              majorSpeedText = majorSpeedText.slice(0, -1);
            }
            majorSpeedText += ellipsis;
          }

          const dynamicMarginX =
            ctx.measureText(majorSpeedText).width < 40 * scaleFactor ? 10 * scaleFactor : 20 * scaleFactor;
          ctx.fillText(`${majorSpeedText}`, majorLabelX - dynamicMarginX, majorLabelY + 5 * scaleFactor);

          if (i < numMajorTicks - 1) {
            const nextMajorAngle = startAngle + ((i + 1) / (numMajorTicks - 1)) * totalAngleRange;
            const minorTickTotalAngleRange = nextMajorAngle - majorAngle;
            
            for (let j = 1; j <= numMinorTicks; j++) {
              const minorAngle = majorAngle + (j / (numMinorTicks + 1)) * minorTickTotalAngleRange;
              const minorTickX = centerX + radius * Math.cos(minorAngle);
              const minorTickY = centerY + radius * Math.sin(minorAngle);

              ctx.beginPath();
              ctx.moveTo(minorTickX, minorTickY);
              ctx.lineTo(
                centerX + (radius - 5 * scaleFactor) * Math.cos(minorAngle),
                centerY + (radius - 5 * scaleFactor) * Math.sin(minorAngle)
              );
              ctx.strokeStyle = isDarkMode ? 'white' : 'black';
              ctx.lineWidth = 1 * scaleFactor;
              ctx.stroke();
            }
          }
        }
      }

      const drawSpeedArc = (speedAngle) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 7, startAngle, speedAngle);
        ctx.strokeStyle = getSpeedColor(Number(value), Number(minValue), Number(maxValue)) || '#3C8CA3';
        ctx.lineWidth = 5;
        ctx.stroke();
      };

      const drawIndicator = (speedAngle) => {
        const triangleHeight = radius;
        const triangleBase = 20 * (effectiveSize / 300);

        const indicatorX = centerX + (radius - triangleHeight) * Math.cos(speedAngle);
        const indicatorY = centerY + (radius - triangleHeight) * Math.sin(speedAngle);
        const tipX = centerX + radius * Math.cos(speedAngle);
        const tipY = centerY + radius * Math.sin(speedAngle);
        const leftBaseX = indicatorX + (triangleBase / 2) * Math.cos(speedAngle - Math.PI / 2);
        const leftBaseY = indicatorY + (triangleBase / 2) * Math.sin(speedAngle - Math.PI / 2);
        const rightBaseX = indicatorX + (triangleBase / 2) * Math.cos(speedAngle + Math.PI / 2);
        const rightBaseY = indicatorY + (triangleBase / 2) * Math.sin(speedAngle + Math.PI / 2);

        ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(leftBaseX, leftBaseY);
        ctx.lineTo(rightBaseX, rightBaseY);
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();

        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      };

      const drawSpeedLabel = () => {
        const hasDigitalValue = digitalValue !== undefined;
        const displayValue = hasDigitalValue ? digitalValue : value;
        
        if (typeof displayValue !== 'number') return;

        const convertedValue = convert(displayValue);
        const formattedValue = formatValue(convertedValue);

        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.shadowBlur = 50;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.font = `${getFontSize(14)}px Arial`;
        ctx.fillStyle = isDarkMode ? 'white' : 'black';
        
        let speedText = ` ${formattedValue}`;
        const maxWidth = (effectiveSize <= 300 ? 59 : 76) * (effectiveSize / 300);
        const ellipsis = '...';
        
        if (ctx.measureText(speedText).width > maxWidth) {
          while (ctx.measureText(speedText + ellipsis).width > maxWidth) {
            speedText = speedText.slice(0, -1);
          }
          speedText += ellipsis;
        }

        // Draw unit if not a special gauge type
        if (!digitalValue && unit) {
          ctx.fillText(unit, centerX + (effectiveSize <= 300 ? 30 : 45) * (effectiveSize / 300), centerY + 4);
        }

        ctx.fillText(speedText, centerX - ctx.measureText(speedText).width / 2 - 2, centerY + 5);
        ctx.fillStyle = isDarkMode ? '#323030' : '#D9D9D9';
      };

      const drawDigitalUnitAndSecondaryLabel = () => {
        if (!digitalUnit && !secondaryLabel) return;
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.shadowBlur = 50;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.font = `${getFontSize(14)}px Arial`;
        ctx.fillStyle = isDarkMode ? 'white' : 'black';

        const maxWidth = 50 * (effectiveSize / 300);
        const ellipsis = '...';
        
        let unitText = digitalUnit || '';
        let labelText = secondaryLabel || '';

        if (ctx.measureText(unitText).width > maxWidth) {
          while (ctx.measureText(unitText + ellipsis).width > maxWidth && unitText.length > 0) {
            unitText = unitText.slice(0, -1);
          }
          unitText += ellipsis;
        }

        if (ctx.measureText(labelText).width > maxWidth) {
          while (ctx.measureText(labelText + ellipsis).width > maxWidth && labelText.length > 0) {
            labelText = labelText.slice(0, -1);
          }
          labelText += ellipsis;
        }

        const labelWidth = ctx.measureText(labelText).width;
        const baseOffset = effectiveSize <= 350 ? 57 : 70;
        const dynamicOffset = baseOffset + (labelWidth / 2) * (300 / effectiveSize);

        if (unitText) {
          ctx.fillText(unitText, centerX + (effectiveSize <= 350 ? 32 : 45) * (effectiveSize / 300), centerY + 5);
        }
        if (labelText) {
          ctx.fillText(labelText, centerX - dynamicOffset * (effectiveSize / 300), centerY + 6);
        }

        ctx.fillStyle = isDarkMode ? '#323030' : '#D9D9D9';
      };

      const drawLabelAndUnit = () => {
        const labelText = label;
        const unitText = unit || '';

        ctx.font = `${getFontSize(13)}px Arial`;
        ctx.fillStyle = isDarkMode ? 'white' : 'black';

        const labelWidth = ctx.measureText(labelText).width || 0;
        const unitWidth = ctx.measureText(unitText).width || 0;

        const labelX = centerX - labelWidth / 2;
        const unitX = centerX - unitWidth / 2;

        const labelY = digitalValue !== undefined
          ? centerY + (effectiveSize <= 300 ? 55 : 60) * (effectiveSize / 300)
          : centerY - (effectiveSize <= 300 ? 40 : 60) * (effectiveSize / 300);

        const unitY = centerY - (effectiveSize <= 300 ? 40 : 60) * (effectiveSize / 300);

        if (labelText) {
          ctx.fillText(labelText, labelX, labelY);
        }

        if (digitalValue !== undefined && unitText) {
          ctx.fillText(unitText, unitX, unitY);
        }

        ctx.fillStyle = !isDarkMode ? 'white' : 'black';
      };

      const drawCoreCircle = () => {
        ctx.shadowColor = 'rgba(62, 62, 62, 1)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 1;
        ctx.fillStyle = !isDarkMode ? 'white' : '#323030';
        ctx.beginPath();
        ctx.arc(centerX, centerY, (effectiveSize <= 300 ? 27 : 35) * (effectiveSize / 300), 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.font = `${getFontSize(13)}px Arial`;
        ctx.fillStyle = isDarkMode ? 'white' : 'black';
      };

      const drawRangeIndicator = (minRangeValue, maxRangeValue) => {
        const minAngle = startAngle + ((minRangeValue - minValue) / (maxValue - minValue)) * (endAngle - startAngle);
        const maxAngle = startAngle + ((maxRangeValue - minValue) / (maxValue - minValue)) * (endAngle - startAngle);
        ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.17)';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, minAngle, maxAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
      };

      const drawHighAlertZone = (high) => {
        if (high > maxValue) return;
        const dangerZoneStartAngle = high
          ? startAngle + ((high - minValue) / (maxValue - minValue)) * (endAngle - startAngle)
          : endAngle;
        const dangerZoneEndAngle = endAngle;
        const gradient = ctx.createRadialGradient(centerX, centerY, radius - 10, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, dangerZoneStartAngle, dangerZoneEndAngle, false);
        ctx.lineWidth = 15;
        ctx.strokeStyle = gradient;
        ctx.stroke();
      };

      const drawLowAlertZone = (low) => {
        if (low < minValue) return;
        const dangerZoneEndAngle = low
          ? startAngle + ((low - minValue) / (maxValue - minValue)) * (endAngle - startAngle)
          : startAngle;
        const dangerZoneStartAngle = startAngle;
        const gradient = ctx.createRadialGradient(centerX, centerY, radius - 10, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, dangerZoneStartAngle, dangerZoneEndAngle, false);
        ctx.lineWidth = 15;
        ctx.strokeStyle = gradient;
        ctx.stroke();
      };

      const drawBackground = () => {
        const outerRadius = radius + 5;
        const innerRadius = 20 * (effectiveSize / 300);

        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 1)';
        ctx.fill();
      };

      const animateSpeed = (targetValue) => {
        if (!animated) {
          // Skip animation, draw directly
          const clampedValue = Math.max(minValue, Math.min(maxValue, targetValue));
          const speedAngle = startAngle + ((clampedValue - minValue) / (maxValue - minValue)) * (endAngle - startAngle);
          
          clearCanvas();
          drawBackground();
          if (alertEnabled && alertHigh !== undefined) drawHighAlertZone(alertHigh);
          if (alertEnabled && alertLow !== undefined) drawLowAlertZone(alertLow);
          if (showRange && rangeMin !== undefined && rangeMax !== undefined) {
            const clampedMin = Math.max(minValue, Math.min(maxValue, convert(rangeMin)));
            const clampedMax = Math.max(minValue, Math.min(maxValue, convert(rangeMax)));
            drawRangeIndicator(clampedMin, clampedMax);
          }
          drawTicksAndLabels();
          drawLabelAndUnit();
          drawIndicator(speedAngle);
          drawCoreCircle();
          drawDigitalUnitAndSecondaryLabel();
          if (showArc) drawSpeedArc(speedAngle);
          drawSpeedLabel();
          setCurrentValue(targetValue);
          return;
        }

        const start = Date.now();
        const fromSpeed = Math.max(minValue, Math.min(maxValue, currentValue));
        const toSpeed = Math.max(minValue, Math.min(maxValue, targetValue));

        const toMinRangeValue = showRange && rangeMin !== undefined
          ? Math.max(minValue, Math.min(maxValue, convert(rangeMin)))
          : minValue;
        const toMaxRangeValue = showRange && rangeMax !== undefined
          ? Math.max(minValue, Math.min(maxValue, convert(rangeMax)))
          : maxValue;

        const animate = () => {
          const now = Date.now();
          const progress = (now - start) / animationDuration;

          if (progress < 1) {
            const speedAngle =
              startAngle +
              (((toSpeed - fromSpeed) * progress + fromSpeed - minValue) / (maxValue - minValue)) *
                (endAngle - startAngle);

            clearCanvas();
            drawBackground();
            if (alertEnabled && alertHigh !== undefined) drawHighAlertZone(alertHigh);
            if (alertEnabled && alertLow !== undefined) drawLowAlertZone(alertLow);
            if (showRange) drawRangeIndicator(toMinRangeValue, toMaxRangeValue);
            drawTicksAndLabels();
            drawLabelAndUnit();
            drawIndicator(speedAngle);
            drawCoreCircle();
            drawDigitalUnitAndSecondaryLabel();
            if (showArc) drawSpeedArc(speedAngle);
            drawSpeedLabel();
            requestAnimationFrame(animate);
          } else {
            setCurrentValue(targetValue);
          }
        };

        requestAnimationFrame(animate);
      };

      const newValue = typeof value === 'number' ? value : 0;
      animateSpeed(convert(newValue));
    };

    if (document.visibilityState === 'visible') {
      startRendering();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [
    value,
    minValue,
    maxValue,
    majorTicksCount,
    minorTicksCount,
    isDarkMode,
    alertEnabled,
    alertHigh,
    alertLow,
    showRange,
    rangeMin,
    rangeMax,
    showArc,
    animated,
    animationDuration,
    currentValue,
    effectiveSize,
    label,
    unit,
    digitalValue,
    digitalUnit,
    secondaryLabel,
    convertValue,
    decimalPlaces,
  ]);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
    if (onEditClick) {
      onEditClick();
    }
  };

  const handleCloseEditor = () => {
    setIsEditMode(false);
  };

  const handleSettingsIconClick = () => {
    setShowSettingsPanel(true);
  };

  const handleSettingsSave = (newSettings) => {
    setShowSettingsPanel(false);
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  };

  const handleSettingsCancel = () => {
    setShowSettingsPanel(false);
  };

  // Get current settings for the panel
  const currentSettings = {
    minValue,
    maxValue,
    label,
    unit,
    alertEnabled,
    alertHigh,
    alertLow,
  };

  // Calculate center circle size for hover zone
  const centerCircleRadius = (effectiveSize <= 300 ? 27 : 35) * (effectiveSize / 300);
  const settingsIconSize = Math.max(16, centerCircleRadius * 0.7);

  return (
    <div
      className={`react-gauge-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        border: isEditMode ? '4px solid #faad14' : 'none',
        ...style,
      }}
    >
      {/* Edit Button */}
      {canEdit && !disableEditButton && (
        <button
          style={{
            zIndex: 5,
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            opacity: 0,
            borderRadius: '50%',
            transition: 'all 0.075s ease-in',
            height: size * 0.18,
            width: size * 0.18,
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
          onClick={handleEditClick}
          type="button"
        >
          <SettingsIcon size={size * 0.18} color="#000" />
        </button>
      )}

      {/* Gauge Container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: effectiveSize,
            height: effectiveSize,
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={effectiveSize}
            height={effectiveSize}
            style={{ width: '100%', height: '100%' }}
          />

          {/* Alarm Icon */}
          <div
            style={{
              position: 'absolute',
              top: '47%',
              left: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              marginTop: -(alarmIconSize / 2),
            }}
          >
            {renderAlarmIcon ? (
              renderAlarmIcon({ isOn: alertEnabled && !alertSnoozed, isSnoozed: alertSnoozed, size: alarmIconSize })
            ) : (
              <>
                {alertEnabled && !alertSnoozed && (
                  <AlarmOnIcon color={isDarkMode ? '#fff' : '#A11117'} size={alarmIconSize} />
                )}
                {alertEnabled && alertSnoozed && (
                  <AlarmOffIcon color={isDarkMode ? '#fff' : '#A11117'} size={alarmIconSize} />
                )}
              </>
            )}
          </div>

          {/* Center Hover Zone for Settings */}
          {settingsConfig && onSettingsChange && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: centerCircleRadius * 2,
                height: centerCircleRadius * 2,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
              onMouseEnter={() => setIsHoveringCenter(true)}
              onMouseLeave={() => setIsHoveringCenter(false)}
              onClick={handleSettingsIconClick}
            >
              {isHoveringCenter && !showSettingsPanel && (
                <div
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
                    borderRadius: '50%',
                    width: centerCircleRadius * 1.5,
                    height: centerCircleRadius * 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <SettingsIcon size={settingsIconSize} color={isDarkMode ? '#333' : '#fff'} />
                </div>
              )}
            </div>
          )}

          {/* Settings Panel */}
          {showSettingsPanel && settingsConfig && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 100,
              }}
            >
              <SettingsPanel
                settings={currentSettings}
                settingsConfig={settingsConfig}
                onSave={handleSettingsSave}
                onCancel={handleSettingsCancel}
                isDarkMode={isDarkMode}
                size={effectiveSize}
              />
            </div>
          )}

          {/* Settings Panel Backdrop */}
          {showSettingsPanel && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 99,
                borderRadius: '50%',
              }}
              onClick={handleSettingsCancel}
            />
          )}

          {/* Controller Slot */}
          {renderController && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: isDarkMode ? '4px' : '-3px',
                padding: '12px',
                width: '60%',
                textAlign: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              {renderController()}
            </div>
          )}
        </div>
      </div>

      {/* Editor Overlay */}
      {isEditMode && renderEditor && (
        <div
          style={{
            position: 'absolute',
            zIndex: 20,
            left: '50%',
            top: '50%',
            transform: 'translateX(-50%) translateY(-80%)',
            height: effectiveSize,
            width: effectiveSize,
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderEditor({ onClose: handleCloseEditor, size: effectiveSize })}
        </div>
      )}
    </div>
  );
};

export default Gauge;
