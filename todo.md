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
- [ ] Create scoring engine for cricket actions
- [ ] Implement automatic points calculation from match data
- [ ] Update user points and leaderboards
- [ ] Award achievements based on milestones
- [ ] Add real-time leaderboard updates
