import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Auth from '../../auth'
import { signIn } from '../../actions/auth'
import { signUp } from '../../actions/auth'
import { SIGN_IN, SIGN_UP } from '../../constants/ActionTypes'
import ErrorMessage from '../shared/ErrorMessage'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignUp: false,
      isLoading: false,
      currentTip: 0
    }
  }

  componentDidMount() {
    // Cycle through funny tips
    this.tipInterval = setInterval(() => {
      this.setState(prevState => ({
        currentTip: (prevState.currentTip + 1) % this.getTips().length
      }))
    }, 4000)
  }

  componentWillUnmount() {
    if (this.tipInterval) {
      clearInterval(this.tipInterval)
    }
  }

  getTips() {
    return [
      "💡 Pro tip: Your password should be longer than your attention span",
      "🚀 Fun fact: Our servers are powered by renewable energy and pure determination",
      "⚡ Did you know? We have 99.9% uptime (the 0.1% is coffee breaks)",
      "🎯 Insider secret: Our developers debug code in their sleep",
      "🔥 Hot take: We're so secure, even our bugs are encrypted",
      "💎 Premium fact: Our UI is so cool, it makes you 10x more attractive"
    ]
  }

  _signIn(e) {
    e.preventDefault()
    let {email, password} = this.refs
    const {dispatch} = this.props
    this.setState({ isLoading: true })
    dispatch(signIn(email.value, password.value))
  }

  _signUp(e) {
    e.preventDefault()
    let {email, password} = this.refs
    const {dispatch} = this.props
    this.setState({ isLoading: true })
    dispatch(signUp(email.value, password.value))
  }

  toggleMode() {
    this.setState({ isSignUp: !this.state.isSignUp })
  }

  render() {
    const { isSignUp, isLoading, currentTip } = this.state
    
    return (
      <div style={style.container}>
        {/* Ultra-cool animated background */}
        <div style={style.background}>
          <div style={style.gradientOverlay}></div>
          <div style={style.pattern}></div>
          <div style={style.particles}></div>
        </div>
        
        {/* Main card with cyberpunk styling */}
        <div style={style.card}>
          {/* Header with neon logo */}
          <div style={style.header}>
            <div style={style.logo}>
              <div style={style.logoIcon}>⚡</div>
              <h1 style={style.title}>ofEds</h1>
            </div>
            <p style={style.subtitle}>
              {isSignUp ? 'Join the cyber revolution' : 'Welcome to the future of chat'}
            </p>
            <p style={style.tagline}>
              {isSignUp ? 'Where memes meet messages' : 'Chat like the future is now'}
            </p>
          </div>
          
          <ErrorMessage error={this.props.error}></ErrorMessage>
          
          <form style={style.form}>
            <div style={style.inputGroup}>
              <label style={style.label}>Email Address</label>
              <div style={style.inputWrapper}>
                <input 
                  type="email" 
                  style={style.input} 
                  placeholder={isSignUp ? "your.email@example.com" : "Enter your email"} 
                  ref="email"
                  disabled={isLoading}
                />
                <div style={style.inputIcon}>📧</div>
              </div>
            </div>
            
            <div style={style.inputGroup}>
              <label style={style.label}>Password</label>
              <div style={style.inputWrapper}>
                <input 
                  type="password" 
                  style={style.input} 
                  placeholder={isSignUp ? "Make it strong like coffee" : "Enter your password"} 
                  ref="password"
                  disabled={isLoading}
                />
                <div style={style.inputIcon}>🔒</div>
              </div>
            </div>
            
            <button 
              type="submit" 
              style={{
                ...style.primaryButton,
                ...(isLoading ? style.loadingButton : {})
              }}
              onClick={isSignUp ? ::this._signUp : ::this._signIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div style={style.spinner}></div>
                  {isSignUp ? 'Creating your cyber identity...' : 'Hacking into the matrix...'}
                </>
              ) : (
                isSignUp ? '🚀 Launch Account' : '⚡ Enter the Matrix'
              )}
            </button>
            
            <div style={style.divider}>
              <span style={style.dividerText}>or</span>
            </div>
            
            <button 
              type="button"
              style={style.secondaryButton}
              onClick={::this.toggleMode}
              disabled={isLoading}
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Join the Revolution'}
            </button>
          </form>

          {/* Funny tip section */}
          <div style={style.tipContainer}>
            <div style={style.tipIcon}>💡</div>
            <p style={style.tipText}>{this.getTips()[currentTip]}</p>
          </div>
          
          <div style={style.footer}>
            <p style={style.footerText}>
              By continuing, you agree to our Terms of Service and Privacy Policy.
              <br />
              <span style={style.disclaimer}>
                ⚠️ Side effects may include increased coolness and better memes
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const style = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-4)',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -3
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 50%, rgba(0, 255, 0, 0.1) 100%)',
    zIndex: -2,
    animation: 'shimmer 8s ease-in-out infinite'
  },
  pattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(0, 255, 0, 0.05) 0%, transparent 50%)
    `,
    zIndex: -1,
    animation: 'backgroundShift 20s ease-in-out infinite'
  },
  particles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(2px 2px at 20px 30px, rgba(0, 255, 255, 0.3), transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255, 0, 255, 0.3), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(0, 255, 0, 0.3), transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(0, 255, 255, 0.3), transparent),
      radial-gradient(2px 2px at 160px 30px, rgba(255, 0, 255, 0.3), transparent)
    `,
    backgroundRepeat: 'repeat',
    backgroundSize: '200px 100px',
    animation: 'particleMove 20s linear infinite',
    zIndex: -1
  },
  card: {
    width: '100%',
    maxWidth: '480px',
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(20px) saturate(180%)',
    borderRadius: 'var(--radius-20)',
    padding: 'var(--space-12)',
    boxShadow: `
      var(--shadow-2xl),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 50px rgba(0, 255, 255, 0.2)
    `,
    border: '1px solid rgba(0, 255, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden'
  },
  header: {
    textAlign: 'center',
    marginBottom: 'var(--space-10)'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-4)',
    marginBottom: 'var(--space-6)'
  },
  logoIcon: {
    fontSize: 'var(--font-size-5xl)',
    background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'neonPulse 3s ease-in-out infinite',
    filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))'
  },
  title: {
    fontSize: 'var(--font-size-4xl)',
    fontWeight: 'var(--font-weight-extrabold)',
    margin: '0',
    background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #00ff00 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'neonPulse 3s ease-in-out infinite',
    textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 'var(--font-size-lg)',
    margin: '0 0 var(--space-2) 0',
    fontWeight: 'var(--font-weight-semibold)'
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 'var(--font-size-sm)',
    margin: '0',
    fontStyle: 'italic'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-8)'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)'
  },
  label: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-semibold)',
    color: '#00ffff',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    padding: 'var(--space-4) var(--space-5)',
    border: '2px solid rgba(0, 255, 255, 0.3)',
    borderRadius: 'var(--radius-12)',
    fontSize: 'var(--font-size-base)',
    transition: 'all var(--transition-normal)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    backdropFilter: 'blur(10px)',
    ':focus': {
      outline: 'none',
      borderColor: '#00ffff',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
    },
    '::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)'
    }
  },
  inputIcon: {
    position: 'absolute',
    right: 'var(--space-4)',
    fontSize: 'var(--font-size-lg)',
    color: '#ff00ff',
    pointerEvents: 'none'
  },
  buttonGroup: {
    display: 'flex',
    gap: 'var(--space-4)',
    marginTop: 'var(--space-6)'
  },
  primaryButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
    color: 'black',
    border: 'none',
    borderRadius: 'var(--radius-12)',
    padding: 'var(--space-5) var(--space-6)',
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-bold)',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    boxShadow: '0 5px 20px rgba(0, 255, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-3)',
    ':hover': {
      background: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 8px 25px rgba(255, 0, 255, 0.4)'
    },
    ':active': {
      transform: 'translateY(0) scale(1)'
    }
  },
  loadingButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(0, 0, 0, 0.3)',
    borderTop: '2px solid black',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: 'var(--space-6) 0'
  },
  dividerText: {
    padding: 'var(--space-2) var(--space-4)',
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-semibold)',
    borderRadius: 'var(--radius-full)',
    border: '1px solid rgba(0, 255, 255, 0.2)'
  },
  secondaryButton: {
    width: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    color: '#00ffff',
    border: '2px solid rgba(0, 255, 255, 0.3)',
    borderRadius: 'var(--radius-12)',
    padding: 'var(--space-4) var(--space-6)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-semibold)',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    backdropFilter: 'blur(10px)',
    ':hover': {
      background: 'rgba(0, 255, 255, 0.1)',
      borderColor: '#00ffff',
      color: 'white',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
      transform: 'translateY(-1px)'
    }
  },
  tipContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    padding: 'var(--space-4)',
    background: 'rgba(0, 255, 255, 0.05)',
    borderRadius: 'var(--radius-8)',
    border: '1px solid rgba(0, 255, 255, 0.1)',
    marginBottom: 'var(--space-6)',
    animation: 'fadeIn 0.5s ease-in-out'
  },
  tipIcon: {
    fontSize: 'var(--font-size-lg)',
    flexShrink: 0
  },
  tipText: {
    fontSize: 'var(--font-size-sm)',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
    lineHeight: 'var(--line-height-normal)'
  },
  footer: {
    marginTop: 'var(--space-8)',
    textAlign: 'center'
  },
  footerText: {
    fontSize: 'var(--font-size-sm)',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: '0',
    lineHeight: 'var(--line-height-relaxed)'
  },
  disclaimer: {
    fontSize: 'var(--font-size-xs)',
    color: 'rgba(255, 255, 255, 0.5)',
    fontStyle: 'italic'
  }
}

function mapStateToProps(state) {
  return {
    error: state.errors[SIGN_IN] || state.errors[SIGN_UP]
  }
}

export default connect(
  mapStateToProps
)(SignIn)
