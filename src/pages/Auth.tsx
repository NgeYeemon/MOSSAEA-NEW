
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, Mail, Lock, User, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      // Store new user flag in localStorage
      localStorage.setItem('isNewUser', 'true');
    }
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userCoins', isSignUp ? '200' : '50');
    navigate('/discover');
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password reset link sent to your email!');
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy-900 via-slate-900 to-teal-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sage-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gold-400/20 rounded-full blur-2xl animate-float" />
      </div>
      
      <Card className="w-full max-w-md relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-sage-500 rounded-2xl flex items-center justify-center shadow-lg animate-glow">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-300 to-sage-300 bg-clip-text text-transparent mb-2">
              {showForgotPassword ? 'Reset Password' : isSignUp ? 'Join MOSSAE\'A' : 'Welcome Back'}
            </CardTitle>
            <p className="text-white/70 text-sm">
              {showForgotPassword ? 'Enter your email to reset password' : 
               isSignUp ? 'Create your storytelling journey' : 'Continue your adventure'}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {showForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-teal-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-teal-400 focus:bg-white/20 transition-all"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-sage-500 hover:from-teal-600 hover:to-sage-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105">
                Send Reset Link
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-teal-400" />
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-teal-400 focus:bg-white/20 transition-all"
                    required
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-teal-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-teal-400 focus:bg-white/20 transition-all"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-teal-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-teal-400 focus:bg-white/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-teal-400 hover:text-teal-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-teal-300 hover:text-teal-200 transition-colors"
                >
                  Forgot your password?
                </button>
              )}

              <Button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-sage-500 hover:from-teal-600 hover:to-sage-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>
          )}

          {!showForgotPassword && (
            <div className="text-center">
              <p className="text-white/70">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              </p>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-teal-300 font-semibold hover:text-teal-200 transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          )}

          {isSignUp && (
            <div className="bg-gradient-to-r from-gold-500/20 to-yellow-500/20 p-4 rounded-lg border border-gold-400/30 backdrop-blur-sm">
              <div className="flex items-center space-x-3 text-gold-300">
                <div className="relative">
                  <Coins className="w-6 h-6 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold-400 rounded-full animate-ping" />
                </div>
                <div>
                  <span className="text-sm font-semibold block">Welcome Bonus!</span>
                  <span className="text-xs text-gold-200">Get 200 coins as your first reward</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
