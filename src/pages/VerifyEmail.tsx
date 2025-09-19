import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isResending, setIsResending] = useState(false);
  const { resendVerification } = useAuth();
  
  const email = searchParams.get('email') || '';
  const verified = searchParams.get('verified') === 'true';

  const handleResendVerification = async () => {
    if (!email) return;
    
    setIsResending(true);
    await resendVerification(email);
    setIsResending(false);
  };

  if (verified) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <CardTitle className="text-2xl font-bold text-green-600">Email Verified!</CardTitle>
              <CardDescription>
                Your email has been successfully verified. You can now access all features of your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full">
                <Link to="/">Continue to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Mail className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <CardDescription>
              We've sent a verification link to{' '}
              <span className="font-semibold text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>Click the link in your email to verify your account.</p>
              <p>You may need to check your spam folder.</p>
            </div>

            {email && (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResendVerification}
                disabled={isResending}
              >
                {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Resend Verification Email
              </Button>
            )}

            <div className="text-center">
              <Button variant="link" asChild>
                <Link to="/auth">Back to Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VerifyEmail;