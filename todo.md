# TDSART Fantasy - Project TODO

## Database & Core Setup
- [x] Design database schema (users, sports, players, teams, contests, leaderboards)
- [x] Implement database models and migrations
- [x] Create seed data for sports and sample players

## Visual Assets
- [x] Generate TDSART Fantasy logo
- [x] Create hero section images
- [x] Design achievement badges and icons

## Homepage & Landing
- [x] Build gamified homepage with hero section
- [x] Add legal compliance disclaimers (state restrictions, 18+ age)
- [x] Create features showcase section
- [x] Add call-to-action buttons
- [x] Implement responsive design

## Authentication & Compliance
- [x] Implement user registration with age verification (18+)
- [x] Add state/location verification (block restricted states)
- [x] Create login/logout functionality
- [x] Build user profile setup flow

## User Dashboard
- [x] Create dashboard layout with navigation
- [x] Display user stats and achievements
- [x] Show active teams and contests
- [x] Add quick action buttons

## Team Management
- [ ] Build team creation interface
- [ ] Implement player selection system
- [ ] Add team editing and deletion
- [ ] Show team statistics and performance
- [ ] Display player cards with stats

## Contests System
- [ ] Create contest listing page
- [ ] Build contest details view
- [ ] Implement contest joining functionality
- [ ] Add contest filters (sport, status, date)
- [ ] Show contest rules and scoring

## Leaderboards
- [ ] Build global leaderboard
- [ ] Create contest-specific leaderboards
- [ ] Add leaderboard filters and sorting
- [ ] Implement real-time updates
- [ ] Show user rankings and positions

## User Profile & Achievements
- [ ] Create user profile page
- [ ] Display user statistics
- [ ] Show achievement badges
- [ ] Add team history
- [ ] Implement profile editing

## Legal & Informational Pages
- [ ] Create About Us page
- [ ] Write Terms & Conditions
- [ ] Write Privacy Policy
- [ ] Create Responsible Gaming page
- [ ] Add Contact Us page
- [ ] Include company information in footer

## Testing & Polish
- [x] Write vitest tests for core procedures
- [x] Test authentication flow
- [ ] Test team creation and management
- [ ] Test contest joining
- [ ] Verify legal compliance features
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing

## Deployment
- [ ] Final testing
- [ ] Create checkpoint
- [ ] Prepare deployment documentation

## Platform Updates
- [x] Update all content to focus exclusively on Cricket (remove other sports references)
- [x] Update homepage hero section with cricket-only messaging
- [x] Update database seed data to include only cricket players and matches

## Independent Authentication System
- [x] Replace Manus OAuth with custom email/password authentication
- [x] Implement user registration with email verification
- [x] Add password hashing with bcrypt
- [x] Create login/logout with JWT tokens
- [x] Add forgot password functionality
- [x] Implement email verification system
- [ ] Add social login options (Google, Facebook)
- [x] Create session management

## Platform Enhancements (50 Suggestions Implementation)
- [ ] Real-time live scoring system
- [ ] Push notifications for match updates
- [ ] Player performance analytics
- [ ] Team comparison tool
- [ ] Contest filters and search
- [ ] Private leagues for friends
- [ ] Team auto-suggest based on AI
- [ ] Player injury updates
- [ ] Weather conditions for matches
- [ ] Pitch report integration
- [ ] Head-to-head statistics
- [ ] Player form indicators
- [ ] Match predictions
- [ ] Expert tips section
- [ ] Video highlights integration

## UI Fixes
- [x] Regenerate logo with transparent background

## Critical Bugs
- [ ] Fix authentication state - users remain logged in even after browser restart
- [ ] Add visible Sign Up / Register button for non-authenticated users
- [ ] Fix useAuth hook to properly detect logged-out state
- [x] Fix logo CSS to remove any background color styling
- [ ] Fix registration page to display error messages (409 conflict for duplicate email)
- [ ] Add toast notifications for registration success/failure
- [x] Replace logo with new TDSART Fantasy logo with text
- [ ] Add date of birth field to registration form
- [ ] Add state dropdown to registration form
- [ ] Validate age is 18+ during registration
- [ ] Validate state is not in restricted list
- [x] Clear all users from database
- [ ] Fix verification page - 409 error when submitting
- [ ] Debug verification tRPC procedure
- [x] Redesign homepage with more content sections
- [x] Add How It Works section with step-by-step guide
- [x] Add Features section with detailed benefits
- [x] Add Why Choose Us section
- [x] Add FAQ section
- [x] Generate more cricket-themed images for homepage
- [ ] Add testimonials/social proof section
- [x] Add statistics section (users, contests, prizes)
- [x] Fix nested anchor tag error in homepage

## Priority Features (In Order)
- [x] Create Contest Listing Page - show all available contests
- [x] Create Contest Detail Page - show contest info, participants, rules
- [x] Implement Join Contest flow - select team and join
- [x] Research and find free cricket API (Cricbuzz/CricAPI)
- [x] Integrate cricket API for match data
- [x] Add Live Score Updates section to homepage
- [x] Display upcoming matches on homepage
- [x] Display live match scores on homepage
- [x] Build Team Creation Page - player selection interface
- [x] Add player filters (position, team, price)
- [x] Implement captain/vice-captain selection
- [x] Add team validation (11 players, budget, positions)
- [x] Create mock cricket API for testing
- [x] Add live scores widget to homepage
- [x] Build team creation page
- [x] Add player selection interface
- [x] Implement captain/vice-captain selection

## Team Creation Page
- [x] Create team creation page UI with player list
- [x] Add player filters (position, team, search)
- [x] Implement player selection (11 players max)
- [x] Add budget constraint validation (100 credits)
- [x] Implement captain/vice-captain selection
- [x] Add team save functionality
- [x] Show selected players summary

## User Profile & Stats
- [x] Create profile page layout
- [x] Display user stats (points, level, rank)
- [x] Show earned achievements with badges
- [x] Display team history
- [x] Show contest participation record
- [x] Add performance graphs

## Points Calculation System
- [x] Create scoring engine for cricket actions
- [x] Implement automatic points calculation from match data
- [ ] Update user points and leaderboards
- [ ] Award achievements based on milestones
- [ ] Add real-time leaderboard updates

## Scoring Engine
- [x] Create points calculation rules for cricket actions (runs, wickets, catches, etc.)
- [x] Build scoring engine that processes match data from Cricket API
- [x] Implement automatic points updates for players
- [x] Update user and team total points
- [x] Award achievements when milestones are reached
- [ ] Add background job for periodic score updates

## Real-Time Leaderboards
- [x] Create leaderboard page for each contest
- [x] Display live rankings with real-time updates
- [x] Add user comparison features
- [x] Implement filters (daily/weekly/all-time)
- [x] Add pagination for large participant lists
- [x] Show point breakdowns and player contributions

## Dashboard Analytics
- [x] Add performance charts (points trends over time)
- [x] Display win/loss ratios
- [x] Show favorite player statistics
- [x] Add contest performance breakdown by match type
- [x] Implement personalized recommendations
- [x] Add visual graphs and charts

## Mobile Responsiveness
- [x] Create hamburger menu component for mobile navigation
- [x] Add mobile-responsive header with menu toggle
- [x] Optimize team creation page for touch screens
- [x] Make tables horizontally scrollable on mobile
- [x] Optimize charts for mobile viewing
- [x] Add touch-friendly buttons and controls
- [x] Test on various mobile screen sizes
- [x] Update logo to match favicon
- [x] Ensure logo consistency across all pages

## Push Notifications
- [x] Create service worker for push notifications
- [x] Add notification permission request UI
- [x] Implement notification subscription system
- [x] Store notification subscriptions in database
- [x] Create notification triggers for contest start
- [x] Add notifications for match beginning
- [x] Implement rank change notifications
- [x] Add achievement unlock notifications
- [x] Create notification for new contest availability
- [x] Add notification settings page
- [x] Test push notifications

## Google Ads Tracking & Analytics
- [x] Create database schema for user acquisition tracking
- [x] Add UTM parameter capture on landing page
- [x] Store campaign data (source, medium, campaign, term, content) with user registration
- [x] Capture device, network, ad position, match type from Google Ads
- [x] Store GCLID for Google Ads conversion tracking
- [x] Build analytics dashboard for campaign performance
- [x] Add conversion tracking (registrations, team creations, contest joins)
- [x] Implement ROI calculation by campaign
- [x] Add charts for user acquisition by source
- [x] Create campaign comparison reports
- [x] Add date range filters for analytics
- [x] Test UTM parameter tracking end-to-end

## Admin Dashboard
- [x] Create admin-only tRPC procedures with role verification
- [x] Build traffic overview section (visitors, page views, bounce rate)
- [x] Add real-time user activity feed
- [x] Create user management table with filters
- [x] Display user acquisition sources and campaign data
- [x] Add user verification controls (approve/reject)
- [x] Show conversion funnel visualization
- [x] Add geographic traffic breakdown
- [x] Create campaign performance deep dive
- [x] Add admin route with role-based access control
- [x] Build admin navigation menu
- [x] Test admin-only access restrictions

## Admin User Creation
- [x] Create admin user with username "ashwin" and password "ashwin@123"

## Login Flow Fix
- [x] Fix login page to use custom authentication instead of Manus OAuth redirect
- [x] Modify server context to accept JWT tokens from Authorization header
- [x] Update tRPC client to send JWT token in requests
- [x] Fix test mocks to support cookie method
- [x] Test admin login with email/password credentials

## Disable Manus OAuth
- [x] Remove Manus OAuth login option from login page
- [x] Keep only custom email/password authentication
- [x] Fix custom login to set session cookie for server authentication

## Complete Manus OAuth Removal
- [x] Identify all files containing Manus OAuth code
- [x] Remove server/_core/oauth.ts (OAuth callback handler)
- [x] Remove server/_core/sdk.ts (Manus SDK)
- [x] Clean up server/_core/context.ts (remove SDK authentication)
- [x] Remove OAuth environment variables from code references
- [x] Clean up client/src/const.ts (remove OAuth URL generation)
- [x] Update server/_core/index.ts (remove OAuth routes)
- [x] Remove OAuth-related imports and dependencies
- [x] Test custom authentication works without Manus OAuth
- [x] Verify no Manus OAuth redirects occur

## Comprehensive Traffic Analysis
- [x] Create database schema for page views and sessions
- [x] Add traffic tracking middleware to capture all page visits
- [x] Store visitor IP, user agent, referrer, and page path
- [x] Implement session tracking with unique session IDs
- [x] Calculate bounce rate and session duration
- [x] Build analytics dashboard with tabbed interface
- [x] Add "Organic Traffic" tab with direct/referral/search sources
- [x] Add "Google Ads Traffic" tab with campaign breakdown
- [x] Display traffic metrics (page views, unique visitors, avg session duration)
- [x] Add traffic trend charts (daily/weekly/monthly)
- [ ] Implement conversion funnel visualization
- [x] Add top pages report
- [x] Show traffic by device type (mobile/desktop/tablet)
- [ ] Add traffic by browser breakdown
- [ ] Create real-time visitor counter
- [ ] Test traffic tracking end-to-end

## Login Bug Fix
- [x] Investigate why users are logged out immediately after login
- [x] Check JWT token storage in localStorage
- [x] Verify authentication check in useAuth hook
- [x] Fix redirect loop issue (localStorage key mismatch: authToken vs auth_token)
- [x] Test login flow end-to-end
- [x] Fixed localStorage key consistency (Login.tsx now uses auth_token)
- [x] Updated logout to clear auth_token from localStorage

## Automatic Page View Tracking
- [x] Create global tracking component that runs on every page load
- [x] Capture visitor IP, user agent, referrer, page path automatically
- [x] Track UTM parameters from URL query string
- [x] Generate unique session IDs for visitors
- [x] Store page views in traffic database
- [x] Test tracking with real page visits
- [x] Verify data appears in traffic analytics dashboard (after publish)

## Comprehensive 272-Feature Visitor Tracking System

### Phase 1: Database Schema (Network, Geo, Device, Browser, OS, Screen)
- [x] Create page_views_extended table with 272 columns
- [x] Add network data fields (IP, ISP, ASN, connection type, speed, VPN/proxy detection)
- [x] Add geolocation fields (country, region, city, postal, lat/lon, timezone, weather)
- [x] Add device fields (type, brand, model, CPU, GPU, RAM, battery, sensors)
- [x] Add screen fields (resolution, DPI, color depth, HDR, refresh rate, zoom)
- [x] Add browser fields (name, version, engine, language, capabilities)
- [x] Add OS fields (name, version, architecture, platform)

### Phase 2: Server-Side Data Collection
- [x] Implement IP geolocation API integration (ip-api.com or ipinfo.io)
- [x] Extract ISP, organization, ASN from IP
- [x] Detect VPN/proxy/Tor usage
- [x] Detect datacenter IPs (bot detection)
- [x] Get weather data for visitor location
- [x] Calculate distance from server
- [x] Detect mobile carrier name

### Phase 3: Client-Side Tracking Utilities
- [x] Create device detection utility (brand, model, type)
- [x] Create browser detection utility (name, version, engine)
- [x] Create OS detection utility (name, version, architecture)
- [x] Create screen tracking utility (resolution, DPI, orientation, zoom)
- [x] Create network tracking utility (connection type, speed, RTT)
- [x] Create performance tracking utility (load times, FCP, LCP, FID, CLS)
- [x] Create browser capabilities detection (storage, WebGL, WebRTC, etc.)
- [x] Create privacy detection (DNT, ad blocker, incognito)
- [x] Create fingerprinting utilities (canvas, WebGL, browser)

### Phase 4: Behavioral Tracking
- [ ] Track mouse movements and clicks
- [ ] Track scroll depth and speed
- [ ] Detect rage clicks and dead clicks
- [ ] Track time spent on page and per section
- [ ] Track idle time and tab visibility
- [ ] Track copy/paste events
- [ ] Track form interactions (focus, completion time, errors)
- [ ] Track exit intent

### Phase 5: Session & Journey Tracking
- [ ] Generate unique session IDs
- [ ] Track entry and exit pages
- [ ] Store full page visit sequence
- [ ] Calculate session duration
- [ ] Detect bounce vs engaged sessions
- [ ] Track new vs returning visitors
- [ ] Calculate days since first/last visit
- [ ] Track visitor frequency (daily/weekly/monthly)

### Phase 6: Traffic Source & Attribution
- [ ] Parse all UTM parameters
- [ ] Extract GCLID, FBCLID, MSCLKID
- [ ] Detect traffic source type (direct/organic/paid/social/email)
- [ ] Extract search engine and keywords
- [ ] Track ad network, group, creative IDs
- [ ] Store match type, device targeting, ad position
- [ ] Track email campaign and affiliate IDs

### Phase 7: Privacy & Security
- [ ] Detect Do Not Track (DNT) header
- [ ] Detect ad blockers
- [ ] Detect incognito/private mode
- [ ] Generate browser fingerprints (canvas, WebGL, audio, font)
- [ ] Detect installed plugins and extensions
- [ ] Check third-party cookie blocking

### Phase 8: Bot & Fraud Detection
- [ ] Calculate bot detection score
- [ ] Detect headless browsers
- [ ] Detect automation tools (Selenium, Puppeteer)
- [ ] Flag datacenter IPs
- [ ] Detect known bot user agents
- [ ] Implement honeypot traps
- [ ] Detect impossible travel patterns
- [ ] Flag duplicate sessions
- [ ] Detect click fraud indicators

### Phase 9: User Identity & Actions (if logged in)
- [ ] Link tracking data to user ID
- [ ] Track user registration date and verification status
- [ ] Track user role and subscription tier
- [ ] Track login count and last login
- [ ] Track profile completion percentage
- [ ] Track user actions (teams created, contests joined, achievements)

### Phase 10: Contextual Data
- [ ] Store visit date/time with hour, day, week, month, quarter
- [ ] Detect holidays and special events
- [ ] Check if cricket matches are happening
- [ ] Get local weather and temperature
- [ ] Calculate sunrise/sunset times
- [ ] Detect business hours visits

### Phase 11: Custom Business Metrics
- [ ] Calculate engagement score
- [ ] Calculate quality score
- [ ] Predict customer lifetime value (CLV)
- [ ] Calculate churn risk score
- [ ] Assign lead score
- [ ] Track A/B test variants
- [ ] Track personalization rules applied

### Phase 12: Backend Integration
- [x] Create tRPC procedure to receive all tracking data from frontend
- [x] Merge client-side data with server-side IP enrichment
- [x] Implement data validation and sanitization
- [x] Store all 272 data points in visitor_tracking table
- [ ] Create database queries for visitor log and analytics
- [ ] Implement data aggregation for dashboards
- [ ] Add visitor search and filtering
- [ ] Add data export functionality (CSV/JSON)

### Phase 13: Admin Visitor Dashboard
- [ ] Create visitor log page with table of all visitors
- [ ] Add tabs for data categories (Network, Geo, Device, Browser, etc.)
- [ ] Display IP, ISP, location with map visualization
- [ ] Show device specs, browser fingerprints
- [ ] Display visitor journey (all pages visited)
- [ ] Show bot detection scores and flags
- [ ] Add search by IP, location, device, browser
- [ ] Add date range filtering
- [ ] Implement pagination for large datasets
- [ ] Add export to CSV functionality

### Phase 14: Behavioral Tracking Implementation
- [ ] Track mouse movements and generate heatmaps
- [ ] Track scroll depth percentage
- [ ] Detect rage clicks (multiple rapid clicks)
- [ ] Detect dead clicks (clicks with no effect)
- [ ] Track time spent per page section
- [ ] Track form field interactions
- [ ] Detect exit intent (mouse leaving viewport)
- [ ] Store behavioral data in database
- [ ] Create behavioral analytics dashboard

### Phase 15: Testing & Optimization
- [ ] Test all 272 data points collection end-to-end
- [ ] Verify data accuracy across all categories
- [ ] Test performance with simulated high traffic
- [ ] Verify database storage and indexing
- [ ] Test API integrations (IP geolocation, weather)
- [ ] Test admin dashboard with real data
- [ ] Verify behavioral tracking accuracy
- [ ] Optimize database queries for performance

## Frontend Comprehensive Tracking Component
- [x] Create ComprehensiveTracker.tsx component
- [x] Collect all client-side data using tracking utilities
- [x] Send tracking data to backend via trpc.tracking.trackVisit
- [x] Handle tracking errors gracefully
- [x] Add tracking component to App.tsx
- [ ] Test tracking data collection end-to-end (requires publish)
- [ ] Verify all 272 data points are captured (requires publish)

## Admin Visitor Dashboard
- [x] Create database queries for visitor list and analytics
- [x] Build tRPC procedures for visitor data retrieval
- [x] Create AdminVisitors.tsx page component
- [x] Add Overview tab with visitor statistics
- [x] Add Visitor List tab with search and filters
- [x] Add Detailed Visitor View with all 272 data points
- [x] Add Location tab with geographic visualization
- [x] Add Devices tab with browser/device breakdown
- [x] Add Security tab with bot detection and VPN/proxy data
- [x] Add Journey Tracking tab placeholder
- [x] Add route to App.tsx
- [x] Add navigation link to admin menu
- [ ] Test with real visitor data (requires publish)
- [ ] Implement advanced journey visualization
- [ ] Add export to CSV functionality
- [ ] Add date range filters

## Bug Fixes
- [x] Fix tracking error: handle Infinity values in zoomLevel and other numeric fields
- [x] Fix View Details button - not switching to Details tab
- [x] Fix IP enrichment - location showing as Unknown
- [x] Fix IP enrichment - ISP showing as Unknown

## Clear Visitor Data Feature
- [x] Create database function to delete all visitor tracking data
- [x] Create tRPC procedure for clearing visitor data (admin-only)
- [x] Add Clear All button with confirmation dialog to Visitor Analytics page
- [ ] Test clear functionality (requires publish)
