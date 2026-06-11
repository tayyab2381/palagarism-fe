"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { AuthField } from "@/components/auth/AuthField";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Card } from "@/components/ui/Card";
import { FormError } from "@/components/ui/FormError";
import {
  authenticate,
  isValidEmail,
  persistAuthToken,
} from "@/lib/auth-client";

interface SignupFieldErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<SignupFieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  function validateForm(): SignupFieldErrors {
    const nextErrors: SignupFieldErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!password) {
      nextErrors.password = "Password is required";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fieldErrors = validateForm();
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await authenticate("/api/auth/signup", {
        email: email.trim().toLowerCase(),
        password,
      });

      if (!response.success || !response.data?.token) {
        setErrors({
          form: response.error ?? "Unable to create account",
        });
        return;
      }

      await persistAuthToken(response.data.token);
      router.push("/dashboard/check");
      router.refresh();
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <ErrorBoundary fallbackTitle="Sign up unavailable">
        <Card variant="glass" className="p-8 shadow-glow md:p-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-slate-500">
            Free plagiarism checks. No credit card required.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <AuthField
              id="email"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              icon={<Mail className="h-4 w-4" />}
            />

            <div>
              <AuthField
                id="password"
                label="Password"
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                error={errors.password}
                icon={<Lock className="h-4 w-4" />}
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Use at least 8 characters with letters and numbers.
              </p>
            </div>

            <AuthField
              id="confirmPassword"
              label="Confirm password"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              error={errors.confirmPassword}
              icon={<Lock className="h-4 w-4" />}
            />

            {errors.form ? <FormError>{errors.form}</FormError> : null}

            <AuthSubmitButton
              isLoading={isLoading}
              loadingText="Creating account..."
            >
              Create account
            </AuthSubmitButton>
          </form>

          <div className="mt-6 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              Sign in
            </Link>
          </div>
        </Card>
      </ErrorBoundary>
    </AuthLayout>
  );
}
