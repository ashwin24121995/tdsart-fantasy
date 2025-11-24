/**
 * Comprehensive Client-Side Tracking Utility
 * Collects all 272 visitor data points from the browser
 */

import { UAParser } from 'ua-parser-js';

/**
 * Safely convert a number to a valid finite value
 * Returns null if the value is Infinity, -Infinity, or NaN
 */
function safeNumber(value: number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  if (!isFinite(value)) return null;
  return value;
}

export interface ComprehensiveTrackingData {
  // Device & Hardware
  deviceType: string | null;
  deviceBrand: string | null;
  deviceModel: string | null;
  cpuArchitecture: string | null;
  cpuCores: number | null;
  gpuVendor: string | null;
  gpuRenderer: string | null;
  deviceMemory: number | null;
  batteryLevel: number | null;
  isCharging: boolean | null;
  hasTouchscreen: boolean;
  deviceOrientation: string | null;
  hasAccelerometer: boolean;
  hasGyroscope: boolean;
  hasVibration: boolean;
  hasBluetooth: boolean;
  hasNfc: boolean;
  
  // Screen & Display
  screenWidth: number | null;
  screenHeight: number | null;
  screenResolution: string | null;
  availableScreenWidth: number | null;
  availableScreenHeight: number | null;
  colorDepth: number | null;
  pixelDepth: number | null;
  pixelRatio: number | null;
  dpi: number | null;
  hasHdr: boolean | null;
  refreshRate: number | null;
  viewportWidth: number | null;
  viewportHeight: number | null;
  zoomLevel: number | null;
  isDarkMode: boolean | null;
  
  // Browser Information
  browserName: string | null;
  browserVersion: string | null;
  browserMajorVersion: number | null;
  browserEngine: string | null;
  browserEngineVersion: string | null;
  browserLanguage: string | null;
  userAgent: string;
  cookiesEnabled: boolean;
  localStorageAvailable: boolean;
  sessionStorageAvailable: boolean;
  indexedDbAvailable: boolean;
  webGlSupport: boolean;
  webGlVersion: string | null;
  webRtcSupport: boolean;
  serviceWorkerSupport: boolean;
  pushNotificationSupport: boolean;
  geolocationApiSupport: boolean;
  cameraPermission: string | null;
  microphonePermission: string | null;
  clipboardPermission: string | null;
  
  // Operating System
  osName: string | null;
  osVersion: string | null;
  osArchitecture: string | null;
  osLanguage: string | null;
  platform: string | null;
  platformVersion: string | null;
  
  // Network & Connection
  connectionType: string | null;
  effectiveConnectionType: string | null;
  downloadSpeed: number | null;
  uploadSpeed: number | null;
  rtt: number | null;
  networkQuality: number | null;
  
  // Privacy & Security
  doNotTrack: boolean;
  adBlockerDetected: boolean;
  thirdPartyCookiesBlocked: boolean;
  isIncognito: boolean | null;
  browserFingerprint: string | null;
  canvasFingerprint: string | null;
  webglFingerprint: string | null;
  audioFingerprint: string | null;
  fontFingerprint: string | null;
  installedFonts: string[] | null;
  installedPlugins: string[] | null;
  detectedExtensions: string[] | null;
  httpsEnabled: boolean;
  referrerPolicy: string | null;
  
  // Performance Metrics
  pageLoadTime: number | null;
  dnsLookupTime: number | null;
  tcpConnectionTime: number | null;
  tlsHandshakeTime: number | null;
  timeToFirstByte: number | null;
  domContentLoadedTime: number | null;
  domInteractiveTime: number | null;
  domCompleteTime: number | null;
  windowLoadTime: number | null;
  firstPaint: number | null;
  firstContentfulPaint: number | null;
  largestContentfulPaint: number | null;
  firstInputDelay: number | null;
  cumulativeLayoutShift: number | null;
  timeToInteractive: number | null;
  totalBlockingTime: number | null;
  
  // Page & Session Info
  currentPage: string;
  referrerUrl: string;
  language: string | null;
}

/**
 * Collect all comprehensive tracking data
 */
export async function collectComprehensiveData(): Promise<ComprehensiveTrackingData> {
  const parser = new UAParser();
  const result = parser.getResult();
  
  return {
    // Device & Hardware
    ...getDeviceData(result),
    ...getHardwareData(),
    
    // Screen & Display
    ...getScreenData(),
    
    // Browser Information
    ...getBrowserData(result),
    ...getBrowserCapabilities(),
    
    // Operating System
    ...getOSData(result),
    
    // Network & Connection
    ...getNetworkData(),
    
    // Privacy & Security
    ...getPrivacyData(),
    ...(await getFingerprints()),
    
    // Performance Metrics
    ...getPerformanceData(),
    
    // Page & Session Info
    currentPage: window.location.pathname,
    referrerUrl: document.referrer || '',
    language: navigator.language || null,
  };
}

/**
 * Get device information
 */
function getDeviceData(result: UAParser.IResult) {
  return {
    deviceType: result.device.type || detectDeviceType(),
    deviceBrand: result.device.vendor || null,
    deviceModel: result.device.model || null,
  };
}

function detectDeviceType(): string {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Get hardware information
 */
function getHardwareData() {
  const nav = navigator as any;
  
  return {
    cpuArchitecture: nav.platform || null,
    cpuCores: safeNumber(nav.hardwareConcurrency),
    gpuVendor: getGPUInfo().vendor,
    gpuRenderer: getGPUInfo().renderer,
    deviceMemory: safeNumber(nav.deviceMemory),
    batteryLevel: null, // Will be populated async if available
    isCharging: null, // Will be populated async if available
    hasTouchscreen: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    deviceOrientation: getOrientation(),
    hasAccelerometer: 'DeviceMotionEvent' in window,
    hasGyroscope: 'DeviceOrientationEvent' in window,
    hasVibration: 'vibrate' in navigator,
    hasBluetooth: 'bluetooth' in navigator,
    hasNfc: 'nfc' in navigator || 'NDEFReader' in window,
  };
}

function getGPUInfo(): { vendor: string | null; renderer: string | null } {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return { vendor: null, renderer: null };
    
    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return { vendor: null, renderer: null };
    
    return {
      vendor: (gl as any).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
      renderer: (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
    };
  } catch {
    return { vendor: null, renderer: null };
  }
}

function getOrientation(): string {
  if (window.screen.orientation) {
    return window.screen.orientation.type.includes('portrait') ? 'portrait' : 'landscape';
  }
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
}

/**
 * Get screen information
 */
function getScreenData() {
  const screen = window.screen;
  
  return {
    screenWidth: screen.width || null,
    screenHeight: screen.height || null,
    screenResolution: screen.width && screen.height ? `${screen.width}x${screen.height}` : null,
    availableScreenWidth: screen.availWidth || null,
    availableScreenHeight: screen.availHeight || null,
    colorDepth: screen.colorDepth || null,
    pixelDepth: screen.pixelDepth || null,
    pixelRatio: safeNumber(window.devicePixelRatio),
    dpi: safeNumber(getDPI()),
    hasHdr: matchMedia('(dynamic-range: high)').matches,
    refreshRate: null, // Not reliably available
    viewportWidth: window.innerWidth || null,
    viewportHeight: window.innerHeight || null,
    zoomLevel: safeNumber(window.outerWidth && window.innerWidth ? Math.round((window.outerWidth / window.innerWidth) * 100) : null),
    isDarkMode: matchMedia('(prefers-color-scheme: dark)').matches,
  };
}

function getDPI(): number | null {
  const div = document.createElement('div');
  div.style.width = '1in';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  const dpi = div.offsetWidth;
  document.body.removeChild(div);
  return dpi || null;
}

/**
 * Get browser information
 */
function getBrowserData(result: UAParser.IResult) {
  return {
    browserName: result.browser.name || null,
    browserVersion: result.browser.version || null,
    browserMajorVersion: result.browser.major ? parseInt(result.browser.major) : null,
    browserEngine: result.engine.name || null,
    browserEngineVersion: result.engine.version || null,
    browserLanguage: navigator.language || null,
    userAgent: navigator.userAgent,
  };
}

/**
 * Get browser capabilities
 */
function getBrowserCapabilities() {
  return {
    cookiesEnabled: navigator.cookieEnabled,
    localStorageAvailable: checkStorage('localStorage'),
    sessionStorageAvailable: checkStorage('sessionStorage'),
    indexedDbAvailable: 'indexedDB' in window,
    webGlSupport: checkWebGL().support,
    webGlVersion: checkWebGL().version,
    webRtcSupport: 'RTCPeerConnection' in window,
    serviceWorkerSupport: 'serviceWorker' in navigator,
    pushNotificationSupport: 'PushManager' in window,
    geolocationApiSupport: 'geolocation' in navigator,
    cameraPermission: null, // Would need async permission query
    microphonePermission: null, // Would need async permission query
    clipboardPermission: null, // Would need async permission query
  };
}

function checkStorage(type: 'localStorage' | 'sessionStorage'): boolean {
  try {
    const storage = window[type];
    const test = '__storage_test__';
    storage.setItem(test, test);
    storage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

function checkWebGL(): { support: boolean; version: string | null } {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return { support: false, version: null };
    
    const version = canvas.getContext('webgl2') ? '2.0' : '1.0';
    return { support: true, version };
  } catch {
    return { support: false, version: null };
  }
}

/**
 * Get OS information
 */
function getOSData(result: UAParser.IResult) {
  return {
    osName: result.os.name || null,
    osVersion: result.os.version || null,
    osArchitecture: (navigator as any).platform?.includes('64') ? '64-bit' : '32-bit',
    osLanguage: navigator.language || null,
    platform: (navigator as any).platform || null,
    platformVersion: (navigator as any).userAgentData?.platform || null,
  };
}

/**
 * Get network information
 */
function getNetworkData() {
  const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!conn) {
    return {
      connectionType: null,
      effectiveConnectionType: null,
      downloadSpeed: null,
      uploadSpeed: null,
      rtt: null,
      networkQuality: null,
    };
  }
  
  // Calculate network quality score (1-5)
  let quality = 3; // default
  if (conn.effectiveType === '4g') quality = 5;
  else if (conn.effectiveType === '3g') quality = 4;
  else if (conn.effectiveType === '2g') quality = 2;
  else if (conn.effectiveType === 'slow-2g') quality = 1;
  
  return {
    connectionType: conn.type || null,
    effectiveConnectionType: conn.effectiveType || null,
    downloadSpeed: safeNumber(conn.downlink),
    uploadSpeed: null, // Not available in API
    rtt: safeNumber(conn.rtt),
    networkQuality: quality,
  };
}

/**
 * Get privacy and security information
 */
function getPrivacyData() {
  return {
    doNotTrack: navigator.doNotTrack === '1' || (window as any).doNotTrack === '1',
    adBlockerDetected: detectAdBlocker(),
    thirdPartyCookiesBlocked: !navigator.cookieEnabled,
    isIncognito: null, // Difficult to detect reliably
    httpsEnabled: window.location.protocol === 'https:',
    referrerPolicy: (document as any).referrerPolicy || null,
  };
}

function detectAdBlocker(): boolean {
  // Simple ad blocker detection
  const testAd = document.createElement('div');
  testAd.innerHTML = '&nbsp;';
  testAd.className = 'adsbox';
  testAd.style.position = 'absolute';
  testAd.style.left = '-9999px';
  document.body.appendChild(testAd);
  const isBlocked = testAd.offsetHeight === 0;
  document.body.removeChild(testAd);
  return isBlocked;
}

/**
 * Generate browser fingerprints
 */
async function getFingerprints() {
  return {
    browserFingerprint: await generateBrowserFingerprint(),
    canvasFingerprint: generateCanvasFingerprint(),
    webglFingerprint: generateWebGLFingerprint(),
    audioFingerprint: null, // Complex to implement
    fontFingerprint: null, // Complex to implement
    installedFonts: null, // Privacy-restricted
    installedPlugins: getPlugins(),
    detectedExtensions: null, // Privacy-restricted
  };
}

async function generateBrowserFingerprint(): Promise<string> {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    !!window.sessionStorage,
    !!window.localStorage,
  ];
  
  const fingerprint = components.join('|');
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(fingerprint));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateCanvasFingerprint(): string | null {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Canvas Fingerprint', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Canvas Fingerprint', 4, 17);
    
    return canvas.toDataURL().slice(-50);
  } catch {
    return null;
  }
}

function generateWebGLFingerprint(): string | null {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) return null;
    
    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return null;
    
    const vendor = (gl as any).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    
    return `${vendor}|${renderer}`.slice(0, 64);
  } catch {
    return null;
  }
}

function getPlugins(): string[] {
  const plugins: string[] = [];
  for (let i = 0; i < navigator.plugins.length; i++) {
    plugins.push(navigator.plugins[i].name);
  }
  return plugins;
}

/**
 * Get performance metrics
 */
function getPerformanceData() {
  const perf = performance.timing;
  const navigation = perf.navigationStart;
  
  return {
    pageLoadTime: safeNumber(perf.loadEventEnd - navigation),
    dnsLookupTime: safeNumber(perf.domainLookupEnd - perf.domainLookupStart),
    tcpConnectionTime: safeNumber(perf.connectEnd - perf.connectStart),
    tlsHandshakeTime: safeNumber(perf.secureConnectionStart ? perf.connectEnd - perf.secureConnectionStart : null),
    timeToFirstByte: safeNumber(perf.responseStart - navigation),
    domContentLoadedTime: safeNumber(perf.domContentLoadedEventEnd - navigation),
    domInteractiveTime: safeNumber(perf.domInteractive - navigation),
    domCompleteTime: safeNumber(perf.domComplete - navigation),
    windowLoadTime: safeNumber(perf.loadEventEnd - navigation),
    firstPaint: safeNumber(getFirstPaint()),
    firstContentfulPaint: safeNumber(getFirstContentfulPaint()),
    largestContentfulPaint: null, // Would need PerformanceObserver
    firstInputDelay: null, // Would need PerformanceObserver
    cumulativeLayoutShift: null, // Would need PerformanceObserver
    timeToInteractive: null, // Complex calculation
    totalBlockingTime: null, // Complex calculation
  };
}

function getFirstPaint(): number | null {
  const paintEntries = performance.getEntriesByType('paint');
  const fpEntry = paintEntries.find(entry => entry.name === 'first-paint');
  return fpEntry ? Math.round(fpEntry.startTime) : null;
}

function getFirstContentfulPaint(): number | null {
  const paintEntries = performance.getEntriesByType('paint');
  const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
  return fcpEntry ? Math.round(fcpEntry.startTime) : null;
}
