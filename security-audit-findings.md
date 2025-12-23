# Security Audit Findings - Google Ads Appeal Failed Investigation

## NPM Dependency Vulnerabilities

### Summary
- **Total Vulnerabilities**: 9
- **Severity**: 6 moderate, 3 high
- **Status**: None are critical or actively exploitable for "Compromised Site" flags

### Detailed Findings

#### 1. High Severity - esbuild (CVE-2024-56370)
- **Package**: esbuild
- **Vulnerable Versions**: >=0.24.0 <0.24.2
- **Issue**: Arbitrary file write via path traversal
- **Impact**: Build tool only, not runtime
- **Risk to Google Ads**: **LOW** - Not exposed to end users

#### 2. High Severity - Vite (GHSA-93m4-6634-74q7, GHSA-64vr-g452-qvp3)
- **Package**: vite
- **Vulnerable Versions**: Various
- **Issue**: Dev server vulnerabilities
- **Impact**: Development only, not production
- **Risk to Google Ads**: **LOW** - Not present in published site

#### 3. Moderate - jws (Signature Verification Bypass)
- **Package**: jws (used by jsonwebtoken, web-push)
- **Vulnerable Versions**: <4.0.1
- **Issue**: HMAC signature verification bypass
- **Impact**: JWT token validation
- **Risk to Google Ads**: **MEDIUM** - Could affect authentication security

#### 4. Moderate - tar (Memory Exposure)
- **Package**: tar
- **Vulnerable Versions**: =7.5.1
- **Issue**: Race condition leading to uninitialized memory exposure
- **Impact**: Build process only
- **Risk to Google Ads**: **LOW** - Not runtime

#### 5. Moderate - mdast-util-to-hast (XSS)
- **Package**: mdast-util-to-hast (used by streamdown/react-markdown)
- **Vulnerable Versions**: >=13.0.0 <13.2.1
- **Issue**: Unsanitized class attribute (XSS potential)
- **Impact**: Markdown rendering
- **Risk to Google Ads**: **MEDIUM** - Could be exploited if user-generated markdown

## Analysis

### Why These Don't Explain "Compromised Site" Flag

1. **Most are dev dependencies** - Not shipped to production
2. **None involve malware or trojans** - All are legitimate packages with patches available
3. **XSS vulnerabilities are contained** - Markdown rendering is controlled, not user-generated
4. **JWT issue is server-side** - Not visible to Google's crawler

### Next Investigation Steps

Need to check:
1. **External scripts** - Manus platform injected scripts (Plausible, Amplitude, Umami)
2. **Domain reputation** - Check if tdsartfantasy.com is on any blacklists
3. **SSL/HTTPS** - Verify certificate validity
4. **Security headers** - Check CSP, X-Frame-Options, etc.
5. **Hidden redirects** - Check for any suspicious redirects


## External Scripts Analysis

### Scripts Loaded on tdsartfantasy.com

1. **Main Application Bundle**
   - URL: `https://tdsartfantasy.com/assets/index-C0YeUD3F.js`
   - Type: ES Module
   - Source: Own domain
   - Risk: **NONE**

2. **Umami Analytics** (Manus Platform)
   - URL: `https://manus-analytics.com/umami`
   - Purpose: Privacy-focused analytics
   - Source: Manus hosting platform (auto-injected)
   - Risk: **LOW** - Legitimate analytics, now with cookie consent

3. **Manus Space Editor**
   - URL: `https://files.manuscdn.com/manus-space-dispatcher/spaceEditor-s2_xi-L0.js`
   - Purpose: Visual editor for Manus platform
   - Source: Manus CDN (auto-injected)
   - Risk: **LOW** - Platform feature, not malicious

4. **Plausible Analytics**
   - URL: `https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js`
   - Purpose: Lightweight analytics with extensive tracking
   - Features: File downloads, outbound links, revenue tracking, tagged events
   - Source: Manus platform (auto-injected)
   - Risk: **MEDIUM** - Aggressive tracking features

### External Domains Contacted

1. `tdsartfantasy.com` - Own domain ✅
2. `manus-analytics.com` - Manus analytics ✅
3. `files.manuscdn.com` - Manus CDN ✅
4. `plausible.io` - Analytics service ⚠️
5. `fonts.googleapis.com` - Google Fonts ✅
6. `api.manus.im` - Manus API ✅
7. `sr-client-cfg.amplitude.com` - Amplitude config ⚠️
8. `g.cricapi.com` - Cricket API (images/flags) ✅
9. `h.cricapi.com` - Cricket API (data) ✅
10. `api2.amplitude.com` - Amplitude analytics ⚠️

### Security Status

- ✅ **HTTPS**: Fully enabled, no mixed content
- ✅ **No HTTP resources**: All resources loaded over HTTPS
- ⚠️ **Multiple analytics platforms**: 3 different services (Umami, Plausible, Amplitude)
- ⚠️ **Aggressive tracking**: Plausible configured with extensive tracking features

### Potential Google Ads Issues

**CRITICAL FINDING**: The Plausible script includes **revenue tracking** features:
- `script.file-downloads` - Tracks file downloads
- `hash` - Tracks URL hash changes
- `outbound-links` - Tracks external link clicks
- `pageview-props` - Custom page properties
- **`revenue`** - Revenue/transaction tracking
- `tagged-events` - Custom event tracking

**This could trigger Google's "Compromised Site" flag because:**
1. Revenue tracking on a "100% Free" platform looks suspicious
2. Extensive tracking without clear user benefit
3. File download tracking could be seen as data exfiltration monitoring


## Domain Reputation Check Results

### MXToolbox Blacklist Check - tdsartfantasy.com

**Result**: ✅ **CLEAN - NOT BLACKLISTED**

- **IP Address**: 104.19.168.112 (Cloudflare)
- **Blacklists Checked**: 70
- **Listed**: 0 times
- **Timeouts**: 1 (IBM DNS Blacklist - not significant)
- **Date Checked**: December 22, 2025

### Blacklists Tested (All Passed)

The domain was checked against 70 major blacklists including:
- Spamhaus DBL & ZEN
- SURBL multi
- Barracuda
- SpamCop
- UCEPROTECT
- Abusix Mail Intelligence
- Nordspam
- And 60+ others

**Conclusion**: Domain has **excellent reputation** with no blacklist flags. This is NOT the cause of Google Ads disapproval.


## Security Headers Analysis

### Current HTTP Headers (tdsartfantasy.com)

```
HTTP/2 200
date: Mon, 22 Dec 2025 14:31:50 GMT
content-type: text/html; charset=utf-8
cf-ray: 9b20533a79039d17-SIN
cache-control: no-cache, no-store, must-revalidate
expires: 0
strict-transport-security: max-age=31536000; includeSubDomains
pragma: no-cache
server: cloudflare
```

### Security Headers Assessment

| Header | Status | Impact |
|--------|--------|--------|
| **Content-Security-Policy** | ❌ MISSING | **HIGH** - No protection against XSS/injection |
| **X-Frame-Options** | ❌ MISSING | **MEDIUM** - Vulnerable to clickjacking |
| **X-Content-Type-Options** | ❌ MISSING | **MEDIUM** - MIME-sniffing attacks possible |
| **Referrer-Policy** | ❌ MISSING | **LOW** - Leaks referrer information |
| **Permissions-Policy** | ❌ MISSING | **LOW** - No feature policy restrictions |
| **X-XSS-Protection** | ❌ MISSING | **LOW** - Legacy protection absent |
| **Strict-Transport-Security** | ✅ PRESENT | **GOOD** - HTTPS enforced for 1 year |

### Critical Findings

**MAJOR SECURITY ISSUE**: Missing **Content-Security-Policy (CSP)** header

This is likely a **key factor** in Google's "Compromised Site" flag because:

1. **No CSP = Vulnerable to injection attacks**
   - Any malicious script can be injected and executed
   - No restrictions on external script sources
   - Google sees this as a security risk

2. **Multiple analytics platforms loading without CSP**
   - Plausible, Amplitude, Umami all load without restrictions
   - Revenue tracking scripts can be injected by attackers
   - No whitelist of allowed script sources

3. **Missing X-Frame-Options**
   - Site can be embedded in iframes
   - Clickjacking attacks possible
   - Phishing sites could frame your content

### Why This Matters for Google Ads

Google's automated security scanners likely flagged:
- ❌ No CSP header = Easy to compromise
- ❌ Multiple tracking scripts without CSP protection
- ❌ Revenue tracking on "free" platform (suspicious)
- ❌ No clickjacking protection

**This combination makes the site appear "compromised" or "compromisable" to Google's security algorithms.**
