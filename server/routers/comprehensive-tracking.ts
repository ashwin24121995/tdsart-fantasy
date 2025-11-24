/**
 * tRPC router for comprehensive visitor tracking
 * Receives client-side data, merges with server-side IP enrichment, stores all 272 data points
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { enrichIPAddress } from "../services/ipEnrichment";
import { getDb } from "../db";
import * as db from "../db";
import { visitorTracking, type InsertVisitorTracking } from "../../drizzle/comprehensive-tracking-schema";
import { desc, eq, and, gte, lte, like, or, sql } from "drizzle-orm";

// Zod schema for client-side tracking data
const ClientTrackingDataSchema = z.object({
  sessionId: z.string(),
  pagePath: z.string(),
  referrerUrl: z.string().optional().nullable(),
  userAgent: z.string(),
  
  // Device & Hardware
  deviceType: z.string().optional().nullable(),
  deviceBrand: z.string().optional().nullable(),
  deviceModel: z.string().optional().nullable(),
  cpuArchitecture: z.string().optional().nullable(),
  cpuCores: z.number().optional().nullable(),
  gpuVendor: z.string().optional().nullable(),
  gpuRenderer: z.string().optional().nullable(),
  deviceMemory: z.number().optional().nullable(),
  batteryLevel: z.number().optional().nullable(),
  isCharging: z.boolean().optional().nullable(),
  hasTouchscreen: z.boolean().optional().nullable(),
  deviceOrientation: z.string().optional().nullable(),
  
  // Screen & Display
  screenWidth: z.number().optional().nullable(),
  screenHeight: z.number().optional().nullable(),
  screenResolution: z.string().optional().nullable(),
  colorDepth: z.number().optional().nullable(),
  pixelRatio: z.number().optional().nullable(),
  dpi: z.number().optional().nullable(),
  viewportWidth: z.number().optional().nullable(),
  viewportHeight: z.number().optional().nullable(),
  zoomLevel: z.number().optional().nullable(),
  isDarkMode: z.boolean().optional().nullable(),
  
  // Browser
  browserName: z.string().optional().nullable(),
  browserVersion: z.string().optional().nullable(),
  browserMajorVersion: z.number().optional().nullable(),
  browserEngine: z.string().optional().nullable(),
  browserLanguage: z.string().optional().nullable(),
  cookiesEnabled: z.boolean().optional().nullable(),
  localStorageAvailable: z.boolean().optional().nullable(),
  webGlSupport: z.boolean().optional().nullable(),
  
  // Operating System
  osName: z.string().optional().nullable(),
  osVersion: z.string().optional().nullable(),
  platform: z.string().optional().nullable(),
  
  // Privacy & Security
  doNotTrack: z.boolean().optional().nullable(),
  adBlockerDetected: z.boolean().optional().nullable(),
  isIncognito: z.boolean().optional().nullable(),
  browserFingerprint: z.string().optional().nullable(),
  canvasFingerprint: z.string().optional().nullable(),
  
  // Performance
  pageLoadTime: z.number().optional().nullable(),
  timeToFirstByte: z.number().optional().nullable(),
  firstContentfulPaint: z.number().optional().nullable(),
  
  // Traffic Source & UTM
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  utmTerm: z.string().optional().nullable(),
  utmContent: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  matchType: z.string().optional().nullable(),
  adDevice: z.string().optional().nullable(),
  adNetwork: z.string().optional().nullable(),
  adPosition: z.string().optional().nullable(),
  
  // Network (from client)
  connectionType: z.string().optional().nullable(),
  effectiveConnectionType: z.string().optional().nullable(),
  downloadSpeed: z.number().optional().nullable(),
  rtt: z.number().optional().nullable(),
  
  // Behavioral
  scrollDepth: z.number().optional().nullable(),
  timeOnPage: z.number().optional().nullable(),
});

export const comprehensiveTrackingRouter = router({
  /**
   * Get visitor statistics overview
   */
  getStats: publicProcedure.query(async () => {
    return await db.getVisitorStats();
  }),

  /**
   * Get all visitors with pagination
   */
  getAllVisitors: publicProcedure
    .input(z.object({
      limit: z.number().optional().default(100),
      offset: z.number().optional().default(0),
    }))
    .query(async ({ input }) => {
      return await db.getAllVisitors(input.limit, input.offset);
    }),

  /**
   * Get visitor by ID
   */
  getVisitorById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await db.getVisitorById(input.id);
    }),

  /**
   * Search visitors
   */
  searchVisitors: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(async ({ input }) => {
      return await db.searchVisitors(input.searchTerm);
    }),

  /**
   * Get visitors by date range
   */
  getVisitorsByDateRange: publicProcedure
    .input(z.object({
      startDate: z.date(),
      endDate: z.date(),
    }))
    .query(async ({ input }) => {
      return await db.getVisitorsByDateRange(input.startDate, input.endDate);
    }),

  /**
   * Get visitors by country
   */
  getVisitorsByCountry: publicProcedure.query(async () => {
    return await db.getVisitorsByCountry();
  }),

  /**
   * Get visitors by device type
   */
  getVisitorsByDevice: publicProcedure.query(async () => {
    return await db.getVisitorsByDevice();
  }),

  /**
   * Get visitors by browser
   */
  getVisitorsByBrowser: publicProcedure.query(async () => {
    return await db.getVisitorsByBrowser();
  }),

  /**
   * Get visitor journey (all pages visited in a session)
   */
  getVisitorJourney: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      return await db.getVisitorJourney(input.sessionId);
    }),

  /**
   * Track comprehensive visitor data
   * Merges client-side data with server-side IP enrichment
   */
  trackVisit: publicProcedure
    .input(ClientTrackingDataSchema)
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        return { success: false, error: 'Database not available' };
      }
      
      try {
        // Get IP address from request (updated for better tracking)
        // x-forwarded-for can contain multiple IPs (client, proxy1, proxy2, ...)
        // We want the first one (the client's real IP)
        let ipAddress = ctx.req.headers['x-forwarded-for'] as string || 
                       ctx.req.headers['x-real-ip'] as string ||
                       ctx.req.socket.remoteAddress || 
                       'unknown';
        
        // Extract first IP if comma-separated list
        if (ipAddress.includes(',')) {
          ipAddress = ipAddress.split(',')[0].trim();
        }
        
        // Remove IPv6 prefix if present (::ffff:xxx.xxx.xxx.xxx)
        if (ipAddress.startsWith('::ffff:')) {
          ipAddress = ipAddress.substring(7);
        }
        
        // Enrich IP data with geolocation, ISP, weather, etc.
        const ipData = await enrichIPAddress(ipAddress) || {
          ipAddress,
          ipVersion: 'IPv4',
          isp: 'Unknown',
          organization: 'Unknown',
          asn: 'Unknown',
          isVpn: false,
          isProxy: false,
          isTor: false,
          isDatacenter: false,
          mobileCarrier: null,
          networkQuality: null,
          country: 'Unknown',
          countryCode: 'UN',
          region: 'Unknown',
          regionCode: 'UN',
          city: 'Unknown',
          postalCode: 'Unknown',
          latitude: '0',
          longitude: '0',
          timezone: 'UTC',
          utcOffset: '+00:00',
          continent: 'Unknown',
          continentCode: 'UN',
          currency: 'USD',
          callingCode: '+00',
          capitalCity: 'Unknown',
          distanceFromServer: null,
          localTime: new Date().toISOString(),
          weatherCondition: null,
          temperature: null,
        };
        
        // Prepare date/time contextual data
        const now = new Date();
        const visitDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const visitHour = now.getHours();
        const visitDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
        const visitMonth = now.getMonth() + 1;
        const visitYear = now.getFullYear();
        
        // Get user ID if logged in
        const userId = ctx.user?.id || null;
        
        // Store comprehensive tracking data
        const trackingData: InsertVisitorTracking = {
          // Basic identification
          sessionId: input.sessionId,
          userId,
          currentPage: input.pagePath,
          referrerUrl: input.referrerUrl || null,
          userAgent: input.userAgent,
          
          // Network & Connection (from IP enrichment)
          ipAddress,
          ipVersion: ipData.ipVersion || null,
          isp: ipData.isp || null,
          organization: ipData.organization || null,
          asn: ipData.asn || null,
          isVpn: ipData.isVpn || false,
          isProxy: ipData.isProxy || false,
          isTor: ipData.isTor || false,
          isDatacenter: ipData.isDatacenter || false,
          mobileCarrier: ipData.mobileCarrier || null,
          connectionType: input.connectionType || null,
          effectiveConnectionType: input.effectiveConnectionType || null,
          downloadSpeed: input.downloadSpeed ? String(input.downloadSpeed) : null,
          rtt: input.rtt || null,
          networkQuality: ipData.networkQuality || null,
          
          // Geolocation (from IP enrichment)
          country: ipData.country || null,
          countryCode: ipData.countryCode || null,
          region: ipData.region || null,
          regionCode: ipData.regionCode || null,
          city: ipData.city || null,
          postalCode: ipData.postalCode || null,
          latitude: ipData.latitude || null,
          longitude: ipData.longitude || null,
          timezone: ipData.timezone || null,
          utcOffset: ipData.utcOffset || null,
          continent: ipData.continent || null,
          continentCode: ipData.continentCode || null,
          currency: ipData.currency || null,
          callingCode: ipData.callingCode || null,
          capitalCity: ipData.capitalCity || null,
          distanceFromServer: ipData.distanceFromServer || null,
          localTime: ipData.localTime || null,
          weatherCondition: ipData.weatherCondition || null,
          temperature: ipData.temperature ? String(ipData.temperature) : null,
          
          // Device & Hardware (from client)
          deviceType: input.deviceType || null,
          deviceBrand: input.deviceBrand || null,
          deviceModel: input.deviceModel || null,
          cpuArchitecture: input.cpuArchitecture || null,
          cpuCores: input.cpuCores || null,
          gpuVendor: input.gpuVendor || null,
          gpuRenderer: input.gpuRenderer || null,
          deviceMemory: input.deviceMemory || null,
          batteryLevel: input.batteryLevel || null,
          isCharging: input.isCharging || null,
          hasTouchscreen: input.hasTouchscreen || null,
          deviceOrientation: input.deviceOrientation || null,
          
          // Screen & Display (from client)
          screenWidth: input.screenWidth || null,
          screenHeight: input.screenHeight || null,
          screenResolution: input.screenResolution || null,
          colorDepth: input.colorDepth || null,
          pixelRatio: input.pixelRatio ? String(input.pixelRatio) : null,
          dpi: input.dpi || null,
          viewportWidth: input.viewportWidth || null,
          viewportHeight: input.viewportHeight || null,
          zoomLevel: input.zoomLevel || null,
          isDarkMode: input.isDarkMode || null,
          
          // Browser (from client)
          browserName: input.browserName || null,
          browserVersion: input.browserVersion || null,
          browserMajorVersion: input.browserMajorVersion || null,
          browserEngine: input.browserEngine || null,
          browserLanguage: input.browserLanguage || null,
          cookiesEnabled: input.cookiesEnabled || null,
          localStorageAvailable: input.localStorageAvailable || null,
          webGlSupport: input.webGlSupport || null,
          
          // Operating System (from client)
          osName: input.osName || null,
          osVersion: input.osVersion || null,
          platform: input.platform || null,
          
          // Privacy & Security (from client)
          doNotTrack: input.doNotTrack || null,
          adBlockerDetected: input.adBlockerDetected || null,
          isIncognito: input.isIncognito || null,
          browserFingerprint: input.browserFingerprint || null,
          canvasFingerprint: input.canvasFingerprint || null,
          
          // Performance (from client)
          pageLoadTime: input.pageLoadTime || null,
          timeToFirstByte: input.timeToFirstByte || null,
          firstContentfulPaint: input.firstContentfulPaint || null,
          
          // Traffic Source & UTM
          utmSource: input.utmSource || null,
          utmMedium: input.utmMedium || null,
          utmCampaign: input.utmCampaign || null,
          utmTerm: input.utmTerm || null,
          utmContent: input.utmContent || null,
          gclid: input.gclid || null,
          adMatchType: input.matchType || null,
          adDeviceTargeting: input.adDevice || null,
          adNetworkType: input.adNetwork || null,
          adPosition: input.adPosition || null,
          
          // Behavioral
          scrollDepth: input.scrollDepth || null,
          timeOnPage: input.timeOnPage || null,
          
          // Contextual
          visitDate,
          visitHour,
          visitDayOfWeek,
          visitMonth,
          visitYear,
        };
        
        await db.insert(visitorTracking).values(trackingData);
        
        return { success: true };
      } catch (error) {
        console.error('[Comprehensive Tracking] Error storing visit:', error);
        return { success: false, error: 'Failed to store tracking data' };
      }
    }),
  
  /**
   * Get all visitors with pagination and filtering
   */
  getVisitors: publicProcedure
    .input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      startDate: z.string().optional(), // YYYY-MM-DD
      endDate: z.string().optional(), // YYYY-MM-DD
      searchTerm: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { visitors: [], total: 0 };
      
      const { limit = 50, offset = 0, startDate, endDate, searchTerm } = input;
      
      const conditions = [];
      
      if (startDate) {
        conditions.push(gte(visitorTracking.visitDate, startDate));
      }
      
      if (endDate) {
        conditions.push(lte(visitorTracking.visitDate, endDate));
      }
      
      if (searchTerm) {
        conditions.push(
          or(
            like(visitorTracking.ipAddress, `%${searchTerm}%`),
            like(visitorTracking.city, `%${searchTerm}%`),
            like(visitorTracking.country, `%${searchTerm}%`),
            like(visitorTracking.browserName, `%${searchTerm}%`),
            like(visitorTracking.deviceType, `%${searchTerm}%`)
          )
        );
      }
      
      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
      
      // Get visitors
      const visitors = await db
        .select()
        .from(visitorTracking)
        .where(whereClause)
        .orderBy(desc(visitorTracking.visitTimestamp))
        .limit(limit)
        .offset(offset);
      
      // Get total count
      const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(visitorTracking)
        .where(whereClause);
      
      const total = countResult[0]?.count || 0;
      
      return { visitors, total };
    }),

  /**
   * Get current visitor's tracking data based on session ID
   */
  getCurrentVisitor: publicProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return null;
      
      // Get session ID from cookie or generate one
      const sessionId = ctx.req.cookies?.['visitor_session'] || null;
      if (!sessionId) return null;
      
      // Get the most recent visitor record with this session ID
      const visitors = await db
        .select()
        .from(visitorTracking)
        .where(eq(visitorTracking.sessionId, sessionId))
        .orderBy(desc(visitorTracking.visitTimestamp))
        .limit(1);
      
      return visitors[0] || null;
    }),

  /**
   * Clear all visitor tracking data (admin only)
   */
  clearAllVisitors: protectedProcedure
    .mutation(async ({ ctx }) => {
      // Check if user is admin
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }
      
      return await db.clearAllVisitorTracking();
    }),

});
