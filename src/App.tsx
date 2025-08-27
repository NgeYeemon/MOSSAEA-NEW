
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import StoryDetail from "./pages/StoryDetail";
import Reading from "./pages/Reading";
import Write from "./pages/Write";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AuthorProfile from "./pages/AuthorProfile";
import Search from "./pages/Search";
import StoryReader from "./components/StoryReader";
const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
          <Route path="/story/:id" element={<ProtectedRoute><StoryDetail /></ProtectedRoute>} />
          <Route path="/read/:id/:chapter?" element={<ProtectedRoute><Reading /></ProtectedRoute>} />
          <Route path="/write" element={<ProtectedRoute><Write /></ProtectedRoute>} />
          <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
          <Route path="/profile/:username?" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/author/:authorName" element={<ProtectedRoute><AuthorProfile /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/story-reader" element={<ProtectedRoute><StoryReader /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
