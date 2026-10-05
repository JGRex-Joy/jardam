import { Component } from "react";
import StateCard from "./StateCard";

/** Catches render errors in a page; resets automatically when `resetKey` (the route) changes. */
export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("UI crash:", error, info.componentStack); }
  componentDidUpdate(prev) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) this.setState({ error: null });
  }
  render() {
    const { error } = this.state;
    return error ? <StateCard detail={error.message} onRetry={() => this.setState({ error: null })} /> : this.props.children;
  }
}
