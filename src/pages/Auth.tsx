import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Mail, Lock, LogIn, UserPlus, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { z } from "zod";

// Validation schemas
const emailSchema = z.string().email("Please enter a valid email address").max(255, "Email must be less than 255 characters");
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be less than 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const Auth = () => {
  const { user, signIn, signUp, signInWithGoogle, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  
  // Sign In State
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  
  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });

  // Validation errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signInEmailError, setSignInEmailError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength validation
  const validatePasswordStrength = (password: string) => {
    const requirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
    return requirements;
  };

  const passwordRequirements = validatePasswordStrength(signUpData.password);

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    try {
      emailSchema.parse(signInData.email);
      setSignInEmailError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setSignInEmailError(error.issues[0].message);
        return;
      }
    }

    setIsSubmitting(true);
    await signIn(signInData.email, signInData.password);
    setIsSubmitting(false);
  };

  const validateEmailOnBlur = (email: string, setError: (error: string) => void) => {
    try {
      emailSchema.parse(email);
      setError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.issues[0].message);
      }
    }
  };

  const validatePasswordOnBlur = (password: string) => {
    try {
      passwordSchema.parse(password);
      setPasswordError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordError(error.issues[0].message);
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    try {
      emailSchema.parse(signUpData.email);
      setEmailError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.issues[0].message);
        return;
      }
    }

    // Validate password
    try {
      passwordSchema.parse(signUpData.password);
      setPasswordError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordError(error.issues[0].message);
        return;
      }
    }
    
    setIsSubmitting(true);
    
    const { error } = await signUp(signUpData.email, signUpData.password, "");
    
    if (!error) {
      // Redirect to verify email page with email parameter
      window.location.href = `/auth/verify-email?email=${encodeURIComponent(signUpData.email)}`;
    }
    
    setIsSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    await signInWithGoogle();
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Sign In | Nawaa Learning Platform</title>
        <meta
          name="description"
          content="Sign in to your Nawaa account to access courses, spaces, and tools. Join our learning community today."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${window.location.origin}/auth`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sign In | Nawaa Learning Platform" />
        <meta property="og:description" content="Access your Nawaa learning dashboard and continue your educational journey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/auth`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sign In | Nawaa Learning Platform" />
        <meta name="twitter:description" content="Access your Nawaa learning dashboard and continue your educational journey." />
      </Helmet>

      <Layout>
        <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-glow">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome to Nawaa
              </h1>
              <p className="mt-2 text-muted-foreground">
                Your gateway to learning and growth
              </p>
            </div>

            <Card className="shadow-medium">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl text-center">
                  {activeTab === "signin" ? "Sign In" : "Create Account"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="signin" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin" className="space-y-4">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={signInData.email}
                          onChange={(e) => {
                            setSignInData(prev => ({ ...prev, email: e.target.value }));
                            setSignInEmailError("");
                          }}
                          onBlur={() => validateEmailOnBlur(signInData.email, setSignInEmailError)}
                          required
                          autoComplete="email"
                          className={`focus-ring ${signInEmailError ? 'border-destructive' : ''}`}
                          aria-invalid={!!signInEmailError}
                          aria-describedby={signInEmailError ? "signin-email-error" : undefined}
                        />
                        {signInEmailError && (
                          <p id="signin-email-error" className="text-sm text-destructive flex items-center gap-1">
                            <XCircle className="h-3 w-3" />
                            {signInEmailError}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signin-password" className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="signin-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={signInData.password}
                            onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                            required
                            autoComplete="current-password"
                            className="focus-ring pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                            Signing In...
                          </>
                        ) : (
                          <>
                            <LogIn className="h-4 w-4 mr-2" />
                            Sign In
                          </>
                        )}
                      </Button>
                    </form>

                    {/* OAuth Divider */}
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={handleGoogleSignIn}
                        disabled={isSubmitting}
                      >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        {isSubmitting ? "Signing in..." : "Continue with Google"}
                      </Button>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="mt-4 text-center">
                      <Button
                        variant="link"
                        className="text-sm text-muted-foreground hover:text-primary"
                        onClick={() => {
                          const email = prompt("Enter your email address for password reset:");
                          if (email) {
                            // This would trigger the reset password flow
                            // For now, we'll redirect to a reset password page
                            window.location.href = `/auth/reset-password`;
                          }
                        }}
                      >
                        Forgot your password?
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={signUpData.email}
                          onChange={(e) => {
                            setSignUpData(prev => ({ ...prev, email: e.target.value }));
                            setEmailError("");
                          }}
                          onBlur={() => validateEmailOnBlur(signUpData.email, setEmailError)}
                          required
                          autoComplete="email"
                          className={`focus-ring ${emailError ? 'border-destructive' : ''}`}
                          aria-invalid={!!emailError}
                          aria-describedby={emailError ? "signup-email-error" : undefined}
                        />
                        {emailError && (
                          <p id="signup-email-error" className="text-sm text-destructive flex items-center gap-1">
                            <XCircle className="h-3 w-3" />
                            {emailError}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            type={showSignUpPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={signUpData.password}
                            onChange={(e) => {
                              setSignUpData(prev => ({ ...prev, password: e.target.value }));
                              setPasswordError("");
                            }}
                            onBlur={() => validatePasswordOnBlur(signUpData.password)}
                            required
                            autoComplete="new-password"
                            className={`focus-ring pr-10 ${passwordError ? 'border-destructive' : ''}`}
                            aria-invalid={!!passwordError}
                            aria-describedby="password-requirements"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={showSignUpPassword ? "Hide password" : "Show password"}
                          >
                            {showSignUpPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        
                        {/* Password Requirements */}
                        <div id="password-requirements" className="space-y-1 text-xs mt-2">
                          <p className="text-muted-foreground font-medium mb-1">Password must contain:</p>
                          <div className="space-y-0.5">
                            <p className={`flex items-center gap-1 ${passwordRequirements.minLength ? 'text-green-600' : 'text-muted-foreground'}`}>
                              {passwordRequirements.minLength ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                              At least 8 characters
                            </p>
                            <p className={`flex items-center gap-1 ${passwordRequirements.hasUppercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                              {passwordRequirements.hasUppercase ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                              One uppercase letter
                            </p>
                            <p className={`flex items-center gap-1 ${passwordRequirements.hasLowercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                              {passwordRequirements.hasLowercase ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                              One lowercase letter
                            </p>
                            <p className={`flex items-center gap-1 ${passwordRequirements.hasNumber ? 'text-green-600' : 'text-muted-foreground'}`}>
                              {passwordRequirements.hasNumber ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                              One number
                            </p>
                          </div>
                        </div>
                        
                        {passwordError && (
                          <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                            <XCircle className="h-3 w-3" />
                            {passwordError}
                          </p>
                        )}
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full btn-primary"
                        disabled={isSubmitting || !passwordRequirements.minLength || !passwordRequirements.hasUppercase || !passwordRequirements.hasLowercase || !passwordRequirements.hasNumber}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Create Account
                          </>
                        )}
                      </Button>
                    </form>

                    {/* OAuth Divider */}
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={handleGoogleSignIn}
                        disabled={isSubmitting}
                      >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        {isSubmitting ? "Creating account..." : "Continue with Google"}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Your data is protected with enterprise-grade security. 
                      We'll never share your information with third parties.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Auth;