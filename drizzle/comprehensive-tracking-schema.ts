import { int, mysqlTable, text, timestamp, varchar, decimal, boolean as mysqlBoolean, index, json } from "drizzle-orm/mysql-core";

/**
 * Comprehensive visitor tracking table - stores all 272 data points
 * Organized into logical sections for maintainability
 */
export const visitorTracking = mysqlTable("visitor_tracking", {
  id: int("id").autoincrement().primaryKey(),
  
  // ========== BASIC IDENTIFICATION ==========
  sessionId: varchar("session_id", { length: 64 }).notNull(),
  userId: int("user_id"), // null for anonymous visitors
  visitTimestamp: timestamp("visit_timestamp").defaultNow().notNull(),
  
  // ========== NETWORK & CONNECTION DATA (15 fields) ==========
  ipAddress: varchar("ip_address", { length: 45 }),
  ipVersion: varchar("ip_version", { length: 10 }), // IPv4/IPv6
  isp: varchar("isp", { length: 255 }),
  organization: varchar("organization", { length: 255 }),
  asn: varchar("asn", { length: 50 }),
  connectionType: varchar("connection_type", { length: 50 }), // cellular/wifi/ethernet/bluetooth
  effectiveConnectionType: varchar("effective_connection_type", { length: 20 }), // slow-2g/2g/3g/4g
  downloadSpeed: decimal("download_speed", { precision: 10, scale: 2 }), // Mbps
  uploadSpeed: decimal("upload_speed", { precision: 10, scale: 2 }), // Mbps
  rtt: int("rtt"), // Round Trip Time in ms
  isVpn: mysqlBoolean("is_vpn"),
  isProxy: mysqlBoolean("is_proxy"),
  isTor: mysqlBoolean("is_tor"),
  isDatacenter: mysqlBoolean("is_datacenter"), // bot detection
  mobileCarrier: varchar("mobile_carrier", { length: 100 }),
  networkQuality: int("network_quality"), // 1-5 score
  
  // ========== GEOLOCATION DATA (18 fields) ==========
  country: varchar("country", { length: 100 }),
  countryCode: varchar("country_code", { length: 10 }),
  region: varchar("region", { length: 100 }),
  regionCode: varchar("region_code", { length: 20 }),
  city: varchar("city", { length: 100 }),
  postalCode: varchar("postal_code", { length: 20 }),
  latitude: varchar("latitude", { length: 20 }),
  longitude: varchar("longitude", { length: 20 }),
  timezone: varchar("timezone", { length: 50 }),
  utcOffset: varchar("utc_offset", { length: 10 }),
  metroCode: varchar("metro_code", { length: 20 }),
  continent: varchar("continent", { length: 50 }),
  continentCode: varchar("continent_code", { length: 10 }),
  currency: varchar("currency", { length: 10 }),
  callingCode: varchar("calling_code", { length: 10 }),
  capitalCity: varchar("capital_city", { length: 100 }),
  distanceFromServer: int("distance_from_server"), // km
  localTime: varchar("local_time", { length: 50 }),
  
  // ========== DEVICE & HARDWARE DATA (17 fields) ==========
  deviceType: varchar("device_type", { length: 50 }), // mobile/tablet/desktop/smart-tv/console
  deviceBrand: varchar("device_brand", { length: 100 }),
  deviceModel: varchar("device_model", { length: 100 }),
  cpuArchitecture: varchar("cpu_architecture", { length: 50 }),
  cpuCores: int("cpu_cores"),
  gpuVendor: varchar("gpu_vendor", { length: 100 }),
  gpuRenderer: varchar("gpu_renderer", { length: 255 }),
  deviceMemory: int("device_memory"), // GB
  batteryLevel: int("battery_level"), // percentage
  isCharging: mysqlBoolean("is_charging"),
  hasTouchscreen: mysqlBoolean("has_touchscreen"),
  deviceOrientation: varchar("device_orientation", { length: 20 }), // portrait/landscape
  hasAccelerometer: mysqlBoolean("has_accelerometer"),
  hasGyroscope: mysqlBoolean("has_gyroscope"),
  hasVibration: mysqlBoolean("has_vibration"),
  hasBluetooth: mysqlBoolean("has_bluetooth"),
  hasNfc: mysqlBoolean("has_nfc"),
  
  // ========== SCREEN & DISPLAY DATA (15 fields) ==========
  screenWidth: int("screen_width"),
  screenHeight: int("screen_height"),
  screenResolution: varchar("screen_resolution", { length: 20 }),
  availableScreenWidth: int("available_screen_width"),
  availableScreenHeight: int("available_screen_height"),
  colorDepth: int("color_depth"), // bits per pixel
  pixelDepth: int("pixel_depth"),
  pixelRatio: decimal("pixel_ratio", { precision: 3, scale: 2 }),
  dpi: int("dpi"),
  hasHdr: mysqlBoolean("has_hdr"),
  refreshRate: int("refresh_rate"), // Hz
  viewportWidth: int("viewport_width"),
  viewportHeight: int("viewport_height"),
  zoomLevel: int("zoom_level"), // percentage
  isDarkMode: mysqlBoolean("is_dark_mode"),
  
  // ========== BROWSER INFORMATION (20 fields) ==========
  browserName: varchar("browser_name", { length: 50 }),
  browserVersion: varchar("browser_version", { length: 50 }),
  browserMajorVersion: int("browser_major_version"),
  browserEngine: varchar("browser_engine", { length: 50 }),
  browserEngineVersion: varchar("browser_engine_version", { length: 50 }),
  browserLanguage: varchar("browser_language", { length: 10 }),
  userAgent: text("user_agent"),
  cookiesEnabled: mysqlBoolean("cookies_enabled"),
  localStorageAvailable: mysqlBoolean("local_storage_available"),
  sessionStorageAvailable: mysqlBoolean("session_storage_available"),
  indexedDbAvailable: mysqlBoolean("indexed_db_available"),
  webGlSupport: mysqlBoolean("webgl_support"),
  webGlVersion: varchar("webgl_version", { length: 10 }),
  webRtcSupport: mysqlBoolean("webrtc_support"),
  serviceWorkerSupport: mysqlBoolean("service_worker_support"),
  pushNotificationSupport: mysqlBoolean("push_notification_support"),
  geolocationApiSupport: mysqlBoolean("geolocation_api_support"),
  cameraPermission: varchar("camera_permission", { length: 20 }),
  microphonePermission: varchar("microphone_permission", { length: 20 }),
  clipboardPermission: varchar("clipboard_permission", { length: 20 }),
  
  // ========== OPERATING SYSTEM (6 fields) ==========
  osName: varchar("os_name", { length: 50 }),
  osVersion: varchar("os_version", { length: 50 }),
  osArchitecture: varchar("os_architecture", { length: 20 }), // 32-bit/64-bit
  osLanguage: varchar("os_language", { length: 10 }),
  platform: varchar("platform", { length: 50 }),
  platformVersion: varchar("platform_version", { length: 50 }),
  
  // ========== PRIVACY & SECURITY (14 fields) ==========
  doNotTrack: mysqlBoolean("do_not_track"),
  adBlockerDetected: mysqlBoolean("ad_blocker_detected"),
  thirdPartyCookiesBlocked: mysqlBoolean("third_party_cookies_blocked"),
  isIncognito: mysqlBoolean("is_incognito"),
  browserFingerprint: varchar("browser_fingerprint", { length: 64 }),
  canvasFingerprint: varchar("canvas_fingerprint", { length: 64 }),
  webglFingerprint: varchar("webgl_fingerprint", { length: 64 }),
  audioFingerprint: varchar("audio_fingerprint", { length: 64 }),
  fontFingerprint: varchar("font_fingerprint", { length: 64 }),
  installedFonts: text("installed_fonts"), // JSON array
  installedPlugins: text("installed_plugins"), // JSON array
  detectedExtensions: text("detected_extensions"), // JSON array
  httpsEnabled: mysqlBoolean("https_enabled"),
  referrerPolicy: varchar("referrer_policy", { length: 50 }),
  
  // ========== BEHAVIORAL TRACKING (22 fields) ==========
  mouseMovements: int("mouse_movements"),
  totalClicks: int("total_clicks"),
  rageClicks: int("rage_clicks"),
  deadClicks: int("dead_clicks"),
  scrollDepth: int("scroll_depth"), // percentage
  maxScrollDepth: int("max_scroll_depth"),
  scrollSpeed: varchar("scroll_speed", { length: 20 }), // slow/medium/fast
  timeOnPage: int("time_on_page"), // seconds
  activeTime: int("active_time"), // seconds actively engaged
  idleTime: int("idle_time"), // seconds idle
  tabSwitches: int("tab_switches"),
  tabBlurCount: int("tab_blur_count"),
  copyEvents: int("copy_events"),
  pasteEvents: int("paste_events"),
  textSelections: int("text_selections"),
  formFieldsFocused: int("form_fields_focused"),
  formFieldsCompleted: int("form_fields_completed"),
  formCompletionTime: int("form_completion_time"), // seconds
  formErrors: int("form_errors"),
  backspaceCount: int("backspace_count"),
  autocompleteUsed: mysqlBoolean("autocomplete_used"),
  exitIntent: mysqlBoolean("exit_intent"),
  
  // ========== USER JOURNEY & SESSION (18 fields) ==========
  entryPage: varchar("entry_page", { length: 512 }),
  currentPage: varchar("current_page", { length: 512 }),
  exitPage: varchar("exit_page", { length: 512 }),
  pageSequence: text("page_sequence"), // JSON array of pages visited
  pagesViewed: int("pages_viewed"),
  sessionDuration: int("session_duration"), // seconds
  isBounce: mysqlBoolean("is_bounce"),
  isNewVisitor: mysqlBoolean("is_new_visitor"),
  isReturningVisitor: mysqlBoolean("is_returning_visitor"),
  previousSessionCount: int("previous_session_count"),
  daysSinceFirstVisit: int("days_since_first_visit"),
  daysSinceLastVisit: int("days_since_last_visit"),
  visitFrequency: varchar("visit_frequency", { length: 20 }), // daily/weekly/monthly
  lifetimePageViews: int("lifetime_page_views"),
  lifetimeSessionCount: int("lifetime_session_count"),
  averageSessionDuration: int("average_session_duration"), // seconds
  totalTimeOnSite: int("total_time_on_site"), // seconds (lifetime)
  engagementLevel: varchar("engagement_level", { length: 20 }), // low/medium/high
  
  // ========== TRAFFIC SOURCE & ATTRIBUTION (25 fields) ==========
  referrerUrl: varchar("referrer_url", { length: 512 }),
  referrerDomain: varchar("referrer_domain", { length: 255 }),
  trafficSource: varchar("traffic_source", { length: 50 }), // direct/organic/paid/social/email
  searchEngine: varchar("search_engine", { length: 50 }),
  searchKeywords: varchar("search_keywords", { length: 255 }),
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  utmTerm: varchar("utm_term", { length: 255 }),
  utmContent: varchar("utm_content", { length: 255 }),
  gclid: varchar("gclid", { length: 255 }), // Google Click ID
  fbclid: varchar("fbclid", { length: 255 }), // Facebook Click ID
  msclkid: varchar("msclkid", { length: 255 }), // Microsoft Click ID
  adNetwork: varchar("ad_network", { length: 100 }),
  adGroupId: varchar("ad_group_id", { length: 100 }),
  adCreativeId: varchar("ad_creative_id", { length: 100 }),
  adMatchType: varchar("ad_match_type", { length: 20 }), // exact/phrase/broad
  adDeviceTargeting: varchar("ad_device_targeting", { length: 20 }),
  adNetworkType: varchar("ad_network_type", { length: 50 }), // search/display/video
  adPosition: varchar("ad_position", { length: 20 }),
  keywordBid: decimal("keyword_bid", { precision: 10, scale: 2 }),
  emailCampaignId: varchar("email_campaign_id", { length: 100 }),
  affiliateId: varchar("affiliate_id", { length: 100 }),
  influencerCode: varchar("influencer_code", { length: 100 }),
  socialMediaPostId: varchar("social_media_post_id", { length: 100 }),
  
  // ========== PERFORMANCE METRICS (20 fields) ==========
  pageLoadTime: int("page_load_time"), // ms
  dnsLookupTime: int("dns_lookup_time"), // ms
  tcpConnectionTime: int("tcp_connection_time"), // ms
  tlsHandshakeTime: int("tls_handshake_time"), // ms
  timeToFirstByte: int("time_to_first_byte"), // ms
  domContentLoadedTime: int("dom_content_loaded_time"), // ms
  domInteractiveTime: int("dom_interactive_time"), // ms
  domCompleteTime: int("dom_complete_time"), // ms
  windowLoadTime: int("window_load_time"), // ms
  firstPaint: int("first_paint"), // ms
  firstContentfulPaint: int("first_contentful_paint"), // ms
  largestContentfulPaint: int("largest_contentful_paint"), // ms
  firstInputDelay: int("first_input_delay"), // ms
  cumulativeLayoutShift: decimal("cumulative_layout_shift", { precision: 5, scale: 3 }),
  timeToInteractive: int("time_to_interactive"), // ms
  totalBlockingTime: int("total_blocking_time"), // ms
  resourceLoadTime: int("resource_load_time"), // ms
  apiResponseTime: int("api_response_time"), // ms
  javascriptExecutionTime: int("javascript_execution_time"), // ms
  renderTime: int("render_time"), // ms
  
  // ========== USER IDENTITY & ACTIONS (if logged in) (15 fields) ==========
  userRegistrationDate: timestamp("user_registration_date"),
  emailVerified: mysqlBoolean("email_verified"),
  phoneVerified: mysqlBoolean("phone_verified"),
  accountStatus: varchar("account_status", { length: 20 }), // active/suspended
  userRole: varchar("user_role", { length: 20 }), // admin/user/guest
  subscriptionTier: varchar("subscription_tier", { length: 20 }), // free/premium
  lastLoginTimestamp: timestamp("last_login_timestamp"),
  totalLoginCount: int("total_login_count"),
  profileCompletionPercent: int("profile_completion_percent"),
  hasAvatar: mysqlBoolean("has_avatar"),
  preferredLanguage: varchar("preferred_language", { length: 10 }),
  teamsCreatedCount: int("teams_created_count"),
  contestsJoinedCount: int("contests_joined_count"),
  achievementsUnlockedCount: int("achievements_unlocked_count"),
  totalPointsEarned: int("total_points_earned"),
  
  // ========== CONTEXTUAL DATA (12 fields) ==========
  visitDate: varchar("visit_date", { length: 20 }), // YYYY-MM-DD
  visitHour: int("visit_hour"), // 0-23
  visitDayOfWeek: varchar("visit_day_of_week", { length: 10 }),
  visitWeekOfYear: int("visit_week_of_year"),
  visitMonth: int("visit_month"),
  visitQuarter: int("visit_quarter"),
  visitYear: int("visit_year"),
  isHoliday: mysqlBoolean("is_holiday"),
  holidayName: varchar("holiday_name", { length: 100 }),
  isCricketMatchDay: mysqlBoolean("is_cricket_match_day"),
  weatherCondition: varchar("weather_condition", { length: 50 }),
  temperature: decimal("temperature", { precision: 5, scale: 2 }), // Celsius
  
  // ========== BOT & FRAUD DETECTION (11 fields) ==========
  botDetectionScore: int("bot_detection_score"), // 0-100
  isLikelyBot: mysqlBoolean("is_likely_bot"),
  isHeadlessBrowser: mysqlBoolean("is_headless_browser"),
  automationToolDetected: varchar("automation_tool_detected", { length: 100 }),
  isKnownBotUserAgent: mysqlBoolean("is_known_bot_user_agent"),
  honeypotTriggered: mysqlBoolean("honeypot_triggered"),
  impossibleTravel: mysqlBoolean("impossible_travel"),
  isDuplicateSession: mysqlBoolean("is_duplicate_session"),
  clickFraudIndicators: int("click_fraud_indicators"),
  formSpamIndicators: int("form_spam_indicators"),
  suspiciousActivityFlags: text("suspicious_activity_flags"), // JSON array
  
  // ========== CUSTOM BUSINESS METRICS (10 fields) ==========
  engagementScore: int("engagement_score"), // 0-100
  qualityScore: int("quality_score"), // 0-100
  predictedClv: decimal("predicted_clv", { precision: 10, scale: 2 }), // Customer Lifetime Value
  churnRiskScore: int("churn_risk_score"), // 0-100
  leadScore: int("lead_score"), // 0-100
  segmentAssignment: varchar("segment_assignment", { length: 100 }),
  abTestVariant: varchar("ab_test_variant", { length: 50 }),
  personalizationRules: text("personalization_rules"), // JSON array
  recommendationAlgorithm: varchar("recommendation_algorithm", { length: 100 }),
  contentCategoryPreferences: text("content_category_preferences"), // JSON array
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  sessionIdx: index("session_idx").on(table.sessionId),
  userIdx: index("user_idx").on(table.userId),
  ipIdx: index("ip_idx").on(table.ipAddress),
  timestampIdx: index("timestamp_idx").on(table.visitTimestamp),
  countryIdx: index("country_idx").on(table.country),
  cityIdx: index("city_idx").on(table.city),
  deviceTypeIdx: index("device_type_idx").on(table.deviceType),
  browserIdx: index("browser_idx").on(table.browserName),
  trafficSourceIdx: index("traffic_source_idx").on(table.trafficSource),
  utmCampaignIdx: index("utm_campaign_idx").on(table.utmCampaign),
}));

export type VisitorTracking = typeof visitorTracking.$inferSelect;
export type InsertVisitorTracking = typeof visitorTracking.$inferInsert;
