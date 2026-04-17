import React from 'react';

class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('WebGL Error Boundary caught:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div 
          className="fixed inset-0 z-[-1] flex items-center justify-center"
          style={{ background: 'var(--bg-main)' }}
        >
          <div className="text-center p-8">
            <div 
              className="text-2xl mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Loading environment...
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              WebGL is initializing. Please wait.
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;