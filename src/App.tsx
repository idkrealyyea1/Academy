import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PrivateRoute from "@/components/PrivateRoute";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import DashboardHome from "@/pages/DashboardHome";
import LecturesPage from "@/pages/LecturesPage";
import GradesPage from "@/pages/GradesPage";
import AssignmentsPage from "@/pages/AssignmentsPage";
import AnnouncementsPage from "@/pages/AnnouncementsPage";
import FilesPage from "@/pages/FilesPage";
import TelegramPage from "@/pages/TelegramPage";
import SettingsPage from "@/pages/SettingsPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard">
        {() => <PrivateRoute><DashboardHome /></PrivateRoute>}
      </Route>
      <Route path="/dashboard/lectures">
        {() => <PrivateRoute><LecturesPage /></PrivateRoute>}
      </Route>
      <Route path="/dashboard/grades">
        {() => <PrivateRoute><GradesPage /></PrivateRoute>}
      </Route>
      <Route path="/dashboard/assignments">
        {() => <PrivateRoute><AssignmentsPage /></PrivateRoute>}
      </Route>
      <Route path="/dashboard/announcements">
        {() => <PrivateRoute><AnnouncementsPage /></PrivateRoute>}
      </Route>
      <Route path="/dashboard/files">
        {() => <PrivateRoute><FilesPage /></PrivateRoute>}
      </Route>
      <Route path="/dashboard/telegram">
        {() => <PrivateRoute><TelegramPage /></PrivateRoute>}
      </Route>
      <Route path="/dashboard/settings">
        {() => <PrivateRoute><SettingsPage /></PrivateRoute>}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <WouterRouter base="">
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
