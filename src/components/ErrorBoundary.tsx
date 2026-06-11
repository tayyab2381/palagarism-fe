"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { PrimaryCard } from "@/components/ui/PrimaryCard";
import { PrimaryCtaButton } from "@/components/ui/PrimaryCtaButton";

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
        <PrimaryCard className="text-center">
          <h2 className="text-heading-sm font-semibold text-obsidian">
            {this.props.fallbackTitle ?? "Something went wrong"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-body font-normal text-steel">
            {this.props.fallbackDescription ??
              "This section failed to load. Please try again."}
          </p>
          <PrimaryCtaButton
            type="button"
            onClick={this.handleReset}
            className="mt-6"
          >
            Try again
          </PrimaryCtaButton>
        </PrimaryCard>
      );
    }

    return this.props.children;
  }
}
