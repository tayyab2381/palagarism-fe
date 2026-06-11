"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthField } from "@/components/auth/AuthField";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";
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
    <div className="min-h-screen bg-mist px-6 pb-16 pt-24">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="block text-center text-lg font-semibold text-obsidian"
        >
          PlagiarCheck
        </Link>

        <PrimaryCard className="mt-8 p-10">
          <h1 className="text-[32px] font-bold text-obsidian">
            Create your account
          </h1>
          <p className="mt-2 text-sm font-normal text-steel">
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

            {errors.form ? (
              <p className="text-sm font-normal text-red-600" role="alert">
                {errors.form}
              </p>
            ) : null}

            <AuthSubmitButton
              isLoading={isLoading}
              loadingText="Creating account..."
            >
              Create Account
            </AuthSubmitButton>
          </form>

          <p className="mt-6 text-center text-sm text-steel">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-ink">
              Sign in
            </Link>
          </p>
        </PrimaryCard>
      </div>
    </div>
  );
}
