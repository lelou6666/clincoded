'use strict';
var React = require('react');
var globals = require('./globals');
var mixins = require('./mixins');
var navigation = require('../libs/bootstrap/navigation');
var jsonScriptEscape = require('../libs/jsonScriptEscape');
var url = require('url');

var NavbarMixin = navigation.NavbarMixin;
var Navbar = navigation.Navbar;
var Nav = navigation.Nav;
var NavItem = navigation.NavItem;


var routes = {
    'curator': require('./curator').Curator
};


// Site information, including navigation
var portal = {
    portal_title: 'ClinGen',
    navUser: [
        {id: 'dashboard', title: 'Dashboard', icon: 'icon-home', url: '/dashboard/'},
        //{id: 'account', title: 'Account', url: '/account/'},
        {id: 'loginout', title: 'Login'}
    ]
};


// Renders HTML common to all pages.
var App = module.exports = React.createClass({
    mixins: [mixins.Persona, mixins.HistoryAndTriggers],

    triggers: {
        login: 'triggerLogin',
        logout: 'triggerLogout',
    },

    getInitialState: function() {
        return {
            errors: [],
            portal: portal
        };
    },

    currentAction: function() {
        var href_url = url.parse(this.props.href);
        var hash = href_url.hash || '';
        var name;
        if (hash.slice(0, 2) === '#!') {
            name = hash.slice(2);
        }
        return name;
    },

    render: function() {
        var content;
        var context = this.props.context;
        var href_url = url.parse(this.props.href);
        // Switching between collections may leave component in place
        var key = context && context['@id'];
        var current_action = this.currentAction();
        if (!current_action && context.default_page) {
            context = context.default_page;
        }
        if (context) {
            var ContentView = globals.content_views.lookup(context, current_action);
            content = <ContentView {...this.props} context={context}
                loadingComplete={this.state.loadingComplete} session={this.state.session}
                portal={this.state.portal} navigate={this.navigate} href_url={href_url} />;
        }
        var errors = this.state.errors.map(function (error) {
            return <div className="alert alert-error"></div>;
        });

        var appClass = 'done';
        if (this.props.slow) {
            appClass = 'communicating'; 
        }

        var title = context.title || context.name || context.accession || context['@id'];
        if (title && title != 'Home') {
            title = title + ' – ' + portal.portal_title;
        } else {
            title = portal.portal_title;
        }

        var canonical = this.props.href;
        if (context.canonical_uri) {
            if (href_url.host) {
                canonical = (href_url.protocol || '') + '//' + href_url.host + context.canonical_uri;
            } else {
                canonical = context.canonical_uri;
            }
        }

        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>ClinGen</title>
                    <link rel="canonical" href={canonical} />
                    <script async src='//www.google-analytics.com/analytics.js'></script>
                    <script data-prop-name="inline" dangerouslySetInnerHTML={{__html: this.props.inline}}></script>
                    <link rel="stylesheet" href="/static/css/style.css" />
                    <script src="/static/build/bundle.js" async defer></script>
                </head>
                <body onClick={this.handleClick} onSubmit={this.handleSubmit}>
                    <script data-prop-name="context" type="application/ld+json" dangerouslySetInnerHTML={{
                        __html: '\n\n' + jsonScriptEscape(JSON.stringify(this.props.context)) + '\n\n'
                    }}></script>
                    <div>
                        <Header session={this.state.session} />
                        <Notice noticeType='danger' noticeMessage={<span><strong>Note:</strong> This is a demo version of the site. Any data you enter will not be permanently saved.</span>} />
                        {content}
                    </div>
                </body>
            </html>
        );
    },

    statics: {
        // Get data to display from page <script> tag
        getRenderedProps: function (document) {
            var props = {};
            // Ensure the initial render is exactly the same
            props.href = document.querySelector('link[rel="canonical"]').href;
            var script_props = document.querySelectorAll('script[data-prop-name]');
            for (var i = 0; i < script_props.length; i++) {
                var elem = script_props[i];
                var value = elem.text;
                var elem_type = elem.getAttribute('type') || '';
                if (elem_type == 'application/json' || elem_type.slice(-5) == '+json') {
                    value = JSON.parse(value);
                }
                props[elem.getAttribute('data-prop-name')] = value;
            }
            return props;
        }
    }
});


// Render the common page header.
var Header = React.createClass({
    render: function() {
        return (
            <header className="site-header">
                <NavbarMain portal={portal} session={this.props.session} />
            </header>
        );
    }
});


// Render the notice bar, under header, if needed
// Usage: <Notice noticeType='[TYPE]' noticeMessage={<span>[MESSAGE]</span>} />
// Appropriate noticeTypes: success, info, warning, danger (bootstrap defaults)
var Notice = React.createClass({
    getInitialState: function () {
        return { noticeVisible: true };
    },
    onClick: function() {
        this.setState({ noticeVisible: false });
    },
    render: function() {
        var noticeClass = 'notice-bar alert alert-' + this.props.noticeType;
        if (this.state.noticeVisible) {
            return (
                <div className={noticeClass} role="alert">
                    <div className="container">
                        {this.props.noticeMessage}
                        <button type="button" className="close" onClick={this.onClick}>&times;</button>
                    </div>
                </div>
            );
        }
        else { return (null); }
    }
});


var NavbarMain = React.createClass({
    mixins: [NavbarMixin],

    propTypes: {
        portal: React.PropTypes.object.isRequired
    },

    render: function() {
        var headerUrl = '/';
        if (this.props.session['auth.userid'] !== undefined) headerUrl = '/dashboard/';
        return (
            <div>
                <div className="container">
                    <NavbarUser portal={this.props.portal} session={this.props.session} />
                    <a href={headerUrl} className='navbar-brand'>ClinGen Dashboard</a>
                </div>
            </div>
        );
    }
});


var NavbarUser = React.createClass({
    render: function() {
        var session = this.props.session;

        return (
            <Nav navbarStyles='navbar-user' styles='navbar-right nav-user'>
                {this.props.portal.navUser.map(function(menu) {
                    if (menu.url) {
                        // Normal menu item; disabled if user is not logged in
                        if (session && session['auth.userid']) {
                            return <NavItem key={menu.id} href={menu.url} icon={menu.icon} title={menu.title}>{menu.title}</NavItem>;
                        }
                    } else {
                        // Trigger menu item; set <a> data attribute to login or logout
                        var attrs = {};

                        // Item with trigger; e.g. login/logout
                        if (!(session && session['auth.userid'])) {
                            // Logged out; render signin trigger
                            attrs['data-trigger'] = 'login';
                            return <NavItem {...attrs} key={menu.id}>{menu.title}</NavItem>;
                        } else {
                            var fullname = (session.user_properties && session.user_properties.title) || 'unknown';
                            attrs['data-trigger'] = 'logout';
                            return <NavItem {...attrs} key={menu.id}>{'Logout ' + fullname}</NavItem>;
                        }
                    }
                })}
            </Nav>
        );
    }
});