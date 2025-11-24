import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import MobileNav from "@/components/MobileNav";
import { PageViewTracker } from "@/components/PageViewTracker";
import { ComprehensiveTracker } from "@/components/ComprehensiveTracker";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Contests from "./pages/Contests";
import ContestDetail from "./pages/ContestDetail";
import CreateTeam from "./pages/CreateTeam";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotificationSettings from "./pages/NotificationSettings";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import TrafficAnalytics from "./pages/TrafficAnalytics";
import AdminVisitors from "./pages/AdminVisitors";
import AdminConversions from "./pages/AdminConversions";
import HowItWorks from "./pages/HowItWorks";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ResponsibleGaming from "./pages/ResponsibleGaming";
import FAQ from "./pages/FAQ";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/contests"} component={Contests} />
      <Route path={"/contests/:id"} component={ContestDetail} />
      <Route path={"/register"} component={Register} />
      <Route path={"/login"} component={Login} />
      <Route path={"/verify"} component={Verify} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create-team" component={CreateTeam} />
      <Route path="/profile" component={Profile} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/notifications" component={NotificationSettings} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/admin" component={Admin} />
      <Route path="/traffic" component={TrafficAnalytics} />
      <Route path="/admin/visitors" component={AdminVisitors} />
      <Route path="/admin/conversions" component={AdminConversions} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/terms" component={TermsAndConditions} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/responsible-gaming" component={ResponsibleGaming} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={ContactUs} />
      <Route path="/about" component={AboutUs} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <PageViewTracker />
          <ComprehensiveTracker />
          <MobileNav />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;