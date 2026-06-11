"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthField } from "@/components/auth/AuthField";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { FormError } from "@/components/ui/FormError";
import { PrimaryCard } from "@/components/ui/PrimaryCard";
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
      <PrimaryCard className="p-10">
        <h1 className="text-heading font-bold text-obsidian">
          Create your account
        </h1>
        <p className="mt-2 text-body font-normal text-steel">
          Free plagiarism checks. No credit card. No document storage.
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
            />
            <p className="mt-1 text-caption font-normal text-steel">
              Use at least 8 characters with a mix of letters and numbers.
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
          />

          {errors.form ? <FormError>{errors.form}</FormError> : null}

          <AuthSubmitButton
            isLoading={isLoading}
            loadingText="Creating account..."
          >
            Create Account
          </AuthSubmitButton>
        </form>

        <div className="mt-6 border-t border-pebble pt-6">
          <p className="text-center text-body font-normal text-steel">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-ink underline hover:opacity-80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </PrimaryCard>
      </ErrorBoundary>
    </AuthLayout>
  );
}
