import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Sidebar from '../components/sidebar/Sidebar'
import Overlay from '../components/overlay/Index'
import {fetchChannelsIfNeeded} from '../actions/channels'
import {fetchDirectChannels} from '../actions/directChannels'
import {fetchUsers} from '../actions/users'
import EventSocket from '../socket/event_socket'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      welcomeMessageIndex: 0,
      showWelcome: true
    }
  }

  componentDidMount() {
    const {dispatch, users} = this.props

    dispatch(fetchUsers((response, store)=> {
      store.dispatch(fetchDirectChannels(response.entities.users))
      EventSocket.initEventChannel(dispatch, {users: response.entities.users})
    }))
    dispatch(fetchChannelsIfNeeded())

    // Cycle through welcome messages
    this.welcomeInterval = setInterval(() => {
      this.setState(prevState => ({
        welcomeMessageIndex: (prevState.welcomeMessageIndex + 1) % this.getWelcomeMessages().length
      }))
    }, 5000)
  }

  componentWillUnmount() {
    if (this.welcomeInterval) {
      clearInterval(this.welcomeInterval)
    }
  }

  getWelcomeMessages() {
    return [
      {
        title: "🚀 Welcome to ofEds!",
        subtitle: "The chat app that's cooler than your ex's new relationship",
        description: "Built with Elixir, Phoenix & React - because we're fancy like that"
      },
      {
        title: "⚡ ofEds is Loading...",
        subtitle: "Preparing your cyberpunk chat experience",
        description: "Fun fact: Our servers run on pure caffeine and determination"
      },
      {
        title: "🎯 Ready to Chat?",
        subtitle: "Select a channel or start a conversation",
        description: "Pro tip: We have 99.9% uptime (the 0.1% is when our cat walks on the keyboard)"
      },
      {
        title: "🔥 ofEds Status: LIT",
        subtitle: "Your messages are encrypted with military-grade memes",
        description: "Warning: Side effects may include increased productivity and cooler friends"
      },
      {
        title: "💎 Premium Chat Experience",
        subtitle: "Now with 100% more neon and 0% more bugs",
        description: "Our developers are so good, they debug code in their sleep"
      }
    ]
  }

  render() {
    const {dispatch, channels, children, local, errors, directChannels, users} = this.props
    const {welcomeMessageIndex, showWelcome} = this.state

    if (children) {
      return (
        <div className="app-container" style={style.container}>
          <Overlay {...{local, channels, dispatch, errors, users}} style={style.container}></Overlay>
          <div className="navigate-sidebar" style={style.container}>
            <Sidebar dispatch={dispatch} channels={channels} directChannels={directChannels} users={users}/>
          </div>
          <div className="main-area" style={style.container}>
            {children}
          </div>
        </div>
      )
    }

    const welcomeMessage = this.getWelcomeMessages()[welcomeMessageIndex]

    return (
      <div className="app-container" style={style.container}>
        <Overlay {...{local, channels, dispatch, errors, users}} style={style.container}></Overlay>
        <div className="navigate-sidebar" style={style.container}>
          <Sidebar dispatch={dispatch} channels={channels} directChannels={directChannels} users={users}/>
        </div>
        <div className="main-area" style={style.container}>
          <div style={style.welcomeContainer}>
            <div style={style.welcomeCard}>
              <h1 style={style.welcomeTitle}>{welcomeMessage.title}</h1>
              <p style={style.welcomeSubtitle}>{welcomeMessage.subtitle}</p>
              <p style={style.welcomeDescription}>{welcomeMessage.description}</p>
              
              <div style={style.featuresList}>
                <h3 style={style.featuresTitle}>✨ Why ofEds is Awesome:</h3>
                <ul style={style.featuresUl}>
                  <li style={style.featuresLi}>🚀 Real-time messaging that's faster than your WiFi</li>
                  <li style={style.featuresLi}>🎨 Cyberpunk UI that makes you look 10x cooler</li>
                  <li style={style.featuresLi}>🔒 Security so tight, even hackers respect it</li>
                  <li style={style.featuresLi}>⚡ Built with Elixir - the language of the future</li>
                  <li style={style.featuresLi}>🎯 Zero bugs (we keep them as pets instead)</li>
                  <li style={style.featuresLi}>💎 Premium features that don't cost premium prices</li>
                </ul>
              </div>

              <div style={style.statsContainer}>
                <div style={style.statItem}>
                  <div style={style.statNumber}>99.9%</div>
                  <div style={style.statLabel}>Uptime</div>
                </div>
                <div style={style.statItem}>
                  <div style={style.statNumber}>∞</div>
                  <div style={style.statLabel}>Cool Factor</div>
                </div>
                <div style={style.statItem}>
                  <div style={style.statNumber}>0</div>
                  <div style={style.statLabel}>Bugs Found</div>
                </div>
              </div>

              <div style={style.footerNote}>
                <p style={style.footerText}>
                  💡 <strong>Pro Tip:</strong> Our servers are powered by renewable energy and pure awesomeness.
                  <br />
                  🌟 Join thousands of satisfied users who chose the cyberpunk way to chat!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const style = {
  container: {
    height: '100%'
  },
  welcomeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 'var(--space-8)',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 255, 255, 0.05) 100%)'
  },
  welcomeCard: {
    maxWidth: '600px',
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(20px)',
    borderRadius: 'var(--radius-20)',
    padding: 'var(--space-12)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    boxShadow: '0 0 50px rgba(0, 255, 255, 0.1)'
  },
  welcomeTitle: {
    fontSize: 'var(--font-size-4xl)',
    fontWeight: 'var(--font-weight-extrabold)',
    margin: '0 0 var(--space-4) 0',
    background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #00ff00 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'neonPulse 3s ease-in-out infinite'
  },
  welcomeSubtitle: {
    fontSize: 'var(--font-size-xl)',
    color: 'rgba(255, 255, 255, 0.9)',
    margin: '0 0 var(--space-4) 0',
    fontWeight: 'var(--font-weight-semibold)'
  },
  welcomeDescription: {
    fontSize: 'var(--font-size-base)',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '0 0 var(--space-8) 0',
    lineHeight: 'var(--line-height-relaxed)'
  },
  featuresList: {
    textAlign: 'left',
    marginBottom: 'var(--space-8)'
  },
  featuresTitle: {
    fontSize: 'var(--font-size-xl)',
    color: '#00ffff',
    margin: '0 0 var(--space-4) 0',
    fontWeight: 'var(--font-weight-bold)',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
  },
  featuresUl: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  featuresLi: {
    fontSize: 'var(--font-size-base)',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: 'var(--space-3) 0',
    padding: 'var(--space-2) 0',
    borderLeft: '2px solid rgba(0, 255, 255, 0.3)',
    paddingLeft: 'var(--space-4)',
    transition: 'all var(--transition-fast)'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 'var(--space-8)',
    padding: 'var(--space-6)',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 'var(--radius-12)',
    border: '1px solid rgba(0, 255, 255, 0.2)'
  },
  statItem: {
    textAlign: 'center'
  },
  statNumber: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: 'var(--font-weight-extrabold)',
    color: '#00ffff',
    textShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
    margin: '0 0 var(--space-2) 0'
  },
  statLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'var(--font-weight-medium)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  footerNote: {
    padding: 'var(--space-6)',
    background: 'rgba(0, 255, 255, 0.05)',
    borderRadius: 'var(--radius-12)',
    border: '1px solid rgba(0, 255, 255, 0.1)'
  },
  footerText: {
    fontSize: 'var(--font-size-sm)',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
    lineHeight: 'var(--line-height-relaxed)'
  }
}

App.propTypes = {
  channels: PropTypes.object,
  children: PropTypes.node,
  local: PropTypes.object
}

function mapStateToProps(state) {
  return {
    channels: state.channels,
    directChannels: state.directChannels,
    local: state.local,
    errors: state.errors,
    users: state.users
  }
}

export default connect(
  mapStateToProps
)(App)
