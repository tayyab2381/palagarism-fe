"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/** Client error boundary for major page sections. */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Card variant="elevated" className="text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            {this.props.fallbackTitle ?? "Something went wrong"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            {this.props.fallbackDescription ??
              "This section failed to load. Please try again."}
          </p>
          <Button type="button" onClick={this.handleReset} className="mt-6">
            Try again
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}
