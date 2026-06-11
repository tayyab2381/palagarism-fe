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
    console.error("ErrorBoundary:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Card variant="outline" className="text-center">
          <h2 className="font-semibold text-ink">
            {this.props.fallbackTitle ?? "Something went wrong"}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-subtle">
            {this.props.fallbackDescription ?? "Try again."}
          </p>
          <Button type="button" onClick={this.handleReset} className="mt-4">
            Retry
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}
