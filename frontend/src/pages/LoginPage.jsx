// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
    }

    setLoading(true);

    try {
      if (isSignup) {
        await signup(formData.email, formData.password, formData.name);
        navigate('/user-type');
      } else {
        const result = await login(formData.email, formData.password);
        
        // Check if user is a seller (should not login as customer)
        const sellerDoc = await getDoc(doc(db, 'sellers', result.user.uid));
        
        if (sellerDoc.exists()) {
          setError('This is a seller account. Please use seller login.');
          await auth.signOut();
          return;
        }
        
        navigate("/customer/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          (isSignup ? "Signup failed. Please try again." : "Hmm, that didn't work. Let's try that again.")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await loginWithGoogle();
      
      // Check if user is a seller
      const sellerDoc = await getDoc(doc(db, 'sellers', result.user.uid));
      
      if (sellerDoc.exists()) {
        setError('This is a seller account. Please use seller login.');
        await auth.signOut();
        return;
      }
      
      navigate("/customer/dashboard");
    } catch (error) {
      setError(error.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex font-sans">
      {/* Left side - Background Image with Overlay */}
      <div
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/src/assets/image.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundColor: "#1a1a1a",
        }}
      >
        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/40">
          <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
            <div className="max-w-lg w-full text-white">
              {/* Professional header with refined styling */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                  <img src="/src/assets/logo.png" alt="Handmade Nexus" className="h-16 w-auto" />
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-white">
                      Handmade Nexus
                    </h1>
                    <p className="text-white/70 font-light italic mt-1">
                      Where craftsmanship meets community
                    </p>
                  </div>
                </div>

                <h2 className="text-3xl font-light mb-6 leading-snug tracking-tight">
                  Welcome Back,{" "}
                  <span className="font-medium">Craft Enthusiast</span>
                </h2>
                <p className="text-white/80 mb-10 text-lg leading-relaxed font-light">
                  Your curated community continues to flourish with exceptional
                  artistry and craftsmanship.
                </p>
              </div>

              {/* Professional cards with subtle animations */}
              <div className="space-y-6 mb-12">
                <div className="group p-5 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl">
                  <div className="flex items-start gap-3 text-center">
                   
                    <div >
                      <p className="font-medium mb-2 text-white text-center">
                        Your Saved Artisans Update
                      </p>
                      <p className="text-white/70 text-sm font-light text-center">
                        3 artisans have added new collections this week
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-5 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl">
                  <div className="flex items-start gap-3 text-center">
                   
                    <div>
                      <p className="font-medium mb-2 text-white">
                        Community Spotlight
                      </p>
                      <p className="text-white/70 text-sm font-light">
                        Raj from Jaipur just completed a custom order similar to
                        your interests
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refined testimonial section */}
              <div className="relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rotate-45"></div>
                </div>
                <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
                  <div className="text-center">
                    <div className="mb-6">
                     
                      <p className="italic text-white/90 text-lg font-light leading-relaxed">
                        "I brewed some chai while awaiting your return. Even the
                        teapot is handcrafted, naturally."
                      </p>
                    </div>
                   
                  </div>
                </div>
              </div>

              {/* Subtle footer indicator */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse"></div>
                  <p className="text-xs text-white/50 font-light">
                    Live community updates •
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 md:p-8">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Back Button */}
          <div className="lg:hidden mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium group"
            >
              <span className="mr-2">←</span>
              Back to the marketplace
            </Link>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden mb-10">
            <div className="flex items-center space-x-4 mb-6">
              <img src="/src/assets/logo.png" alt="Handmade Nexus" className="h-12 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Handmade Nexus
                </h1>
                <p className="text-gray-600 text-sm">Nice to see you again</p>
              </div>
            </div>
            <p className="text-gray-700">
              Come on in, we saved your favorite spot.
            </p>
          </div>

          {/* Friendly greeting */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-normal text-gray-900 mb-3">
              {isSignup ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-gray-600">
              {isSignup ? "Join our community of craft enthusiasts" : "Ready to dive back into beautiful handmade things?"}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 text-red-500 mt-0.5">✗</div>
                <div>
                  <p className="text-red-800">{error}</p>
                  <p className="text-red-600 text-sm mt-1">
                    Check your details and try again?
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* The form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name field - only for signup */}
            {isSignup && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 group-focus-within:text-amber-500 transition-colors">
                      👤
                    </span>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-gray-400"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 group-focus-within:text-amber-500 transition-colors">
                    @
                  </span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-gray-400"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {isSignup ? "Password" : "Your secret password"}
                </label>
                {!isSignup && (
                  <Link
                    to="/forgot-password"
                    className="text-sm text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    Forgot it?
                  </Link>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 group-focus-within:text-amber-500 transition-colors">
                    🔒
                  </span>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-gray-400"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <span className="text-gray-400 hover:text-gray-600 transition-colors">
                      👁️
                    </span>
                  ) : (
                    <span className="text-gray-400 hover:text-gray-600 transition-colors">
                      👁️‍🗨️
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password field - only for signup */}
            {isSignup && (
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 group-focus-within:text-amber-500 transition-colors">
                      🔒
                    </span>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-gray-400"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    title={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <span className="text-gray-400 hover:text-gray-600 transition-colors">
                        👁️
                      </span>
                    ) : (
                      <span className="text-gray-400 hover:text-gray-600 transition-colors">
                        🗨️
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Remember me - only for login */}
            {/* {!isSignup && (
              <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm text-gray-700"
              >
                Remember me on this device
                <span className="text-gray-500 text-xs block">
                  So you don't have to type this again next time
                </span>
              </label>
              </div>
            )} */}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  {isSignup ? "Creating account..." : "Signing in..."}
                </>
              ) : (
                isSignup ? "Create account" : "Sign in"
              )}
            </button>
          </form>

          {/* Google Sign In */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-4 w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </button>
          </div>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  {isSignup ? "Already have an account?" : "New around here?"}
                </span>
              </div>
            </div>

            {/* Toggle link */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                  setFormData({ name: "", email: "", password: "", confirmPassword: "" });
                }}
                className="w-full inline-flex justify-center items-center py-3.5 px-4 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all hover:border-gray-400"
              >
                {isSignup ? "Sign in to your account" : "Sign Up to join our craft community"}
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              Every login supports an artisan somewhere in India.
              {/* <Link to="/how-we-help" className="text-amber-600 hover:text-amber-700 ml-1 transition-colors">
                See how
              </Link> */}
            </p>
          </div>

          {/* Small human touch */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center text-xs text-gray-400">
              <span className="mr-2">Handcrafted with care</span>
              <div className="flex">
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0ms" }}
                >
                  ♥
                </span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "150ms" }}
                >
                  ♥
                </span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "300ms" }}
                >
                  ♥
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
