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

interface LoginFieldErrors {
  email?: string;
  password?: string;
  form?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginFieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  function validateForm(): LoginFieldErrors {
    const nextErrors: LoginFieldErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!password) {
      nextErrors.password = "Password is required";
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
      const response = await authenticate("/api/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      if (!response.success || !response.data?.token) {
        setErrors({
          form: response.error ?? "Invalid email or password",
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
      <ErrorBoundary fallbackTitle="Sign in unavailable">
        <Card variant="glass" className="p-8 shadow-glow md:p-10">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-500">
            Sign in to run plagiarism checks on your documents.
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

            <AuthField
              id="password"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={errors.password}
              icon={<Lock className="h-4 w-4" />}
            />

            {errors.form ? <FormError>{errors.form}</FormError> : null}

            <AuthSubmitButton isLoading={isLoading} loadingText="Signing in...">
              Sign in
            </AuthSubmitButton>
          </form>

          <div className="mt-6 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              Create one free
            </Link>
          </div>
        </Card>
      </ErrorBoundary>
    </AuthLayout>
  );
}
