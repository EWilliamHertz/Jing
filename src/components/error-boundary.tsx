"use client"

import React from "react"

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null; info: any }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ info: errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-900 text-white min-h-screen">
          <h1 className="text-2xl font-bold">Client Error</h1>
          <pre className="mt-4 bg-black/50 p-4 rounded overflow-auto text-sm">
            {this.state.error?.message}
            {"\n"}
            {this.state.error?.stack}
            {"\n"}
            {this.state.info?.componentStack}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}
