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
    <div className="min-h-screen bg-mist px-6 pb-16 pt-24">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="block text-center text-lg font-semibold text-obsidian"
        >
          PlagiarCheck
        </Link>

        <PrimaryCard className="mt-8 p-10">
          <h1 className="text-[32px] font-bold text-obsidian">Welcome back</h1>
          <p className="mt-2 text-sm font-normal text-steel">
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
            />

            {errors.form ? (
              <p className="text-sm font-normal text-red-600" role="alert">
                {errors.form}
              </p>
            ) : null}

            <AuthSubmitButton isLoading={isLoading} loadingText="Signing in...">
              Sign In
            </AuthSubmitButton>
          </form>

          <p className="mt-6 text-center text-sm text-steel">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline hover:text-ink">
              Sign up
            </Link>
          </p>
        </PrimaryCard>
      </div>
    </div>
  );
}
