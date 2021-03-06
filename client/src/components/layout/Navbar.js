import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault()
        this.props.logoutUser()
    }

    render() {
        const { isAuthenticated, user } = this.props.auth

        // Auth Links
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link"
                    >
                        <img
                            src={user.avatar}
                            alt="you must have gravatar account"
                            className="rounded-circle"
                            style={{ width: '25px', marginRight: '5px' }}
                        />
                        Logout
                    </a>
                </li>
            </ul>
        )

        const guessLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        DevConnector
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles">
                                    {' '}
                                    Developers
                                </Link>
                            </li>
                        </ul>

                        {isAuthenticated ? authLinks : guessLinks}
                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar)
