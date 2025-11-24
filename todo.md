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
