import { Component } from "react";

class ErrorBoundary extends Component {
    state = {
        hasError: false,
    };
    static getDerivedStateFromError() {
    return {
        hasError: true,
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error("Error Boundary:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
        return (
        <div className="error-page">
            <h1>Nəsə xəta baş verdi</h1>
            <p>Səhifəni yeniləyin və yenidən cəhd edin.</p>
            <button onClick={() => window.location.reload()}>
                Yenilə
            </button>
        </div>
        );
    }
    return this.props.children;
    }
}

export default ErrorBoundary;