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
    if (!email.trim()) nextErrors.email = "Email is required";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email";
    if (!password) nextErrors.password = "Password is required";
    else if (password.length < 8) nextErrors.password = "At least 8 characters";
    if (!confirmPassword) nextErrors.confirmPassword = "Confirm your password";
    else if (password !== confirmPassword) nextErrors.confirmPassword = "Passwords do not match";
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = validateForm();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await authenticate("/api/auth/signup", {
        email: email.trim().toLowerCase(),
        password,
      });

      if (!response.success || !response.data?.token) {
        setErrors({ form: response.error ?? "Unable to create account" });
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
        <Card variant="elevated" className="p-8">
          <h1 className="text-2xl font-semibold text-ink">Create account</h1>
          <p className="mt-1 text-sm text-ink-subtle">
            Free checks. We do not store your documents.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <AuthField
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              icon={<Mail className="h-4 w-4" strokeWidth={1.5} />}
            />
            <AuthField
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              placeholder="8+ characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              icon={<Lock className="h-4 w-4" strokeWidth={1.5} />}
            />
            <AuthField
              id="confirmPassword"
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              icon={<Lock className="h-4 w-4" strokeWidth={1.5} />}
            />
            {errors.form ? <FormError>{errors.form}</FormError> : null}
            <AuthSubmitButton isLoading={isLoading} loadingText="Creating…">
              Create account
            </AuthSubmitButton>
          </form>

          <p className="mt-6 text-center text-sm text-ink-subtle">
            Have an account?{" "}
            <Link href="/login" className="font-medium text-ink hover:underline">
              Sign in
            </Link>
          </p>
        </Card>
      </ErrorBoundary>
    </AuthLayout>
  );
}
