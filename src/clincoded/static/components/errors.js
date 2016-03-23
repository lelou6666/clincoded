'use strict';
var React = require('react');
var globals = require('./globals');
var home = require('./home');

var Error = module.exports.Error = React.createClass({
    render: function() {
        var context = this.props.context;
        var itemClass = globals.itemClass(context, 'panel-gray');
        return (
            <div className="container">
                <div className={itemClass}>
                    <h1>{context.title}</h1>
                    <p>{context.description}</p>
                </div>
            </div>
        );
    }
});

globals.content_views.register(Error, 'error');


var HTTPNotFound = module.exports.HTTPNotFound = React.createClass({
    render: function() {
        var context = this.props.context;
        var itemClass = globals.itemClass(context, 'panel-gray');
        return (
            <div className="container">
                <div className={itemClass}>
                    <div className="row">
                        <div className="col-sm-12">
                            <h1>Not found</h1>
                            <p>The requested page could not be found.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

globals.content_views.register(HTTPNotFound, 'HTTPNotFound');


var HTTPForbidden = module.exports.HTTPForbidden = React.createClass({
    contextTypes: {
        session: React.PropTypes.object
    },

    render: function() {
        var context = this.props.context;
        var itemClass = globals.itemClass(context, 'panel-gray');
        var logged_in = this.context.session && this.context.session['auth.userid'];
        return (
<<<<<<< HEAD:src/encoded/static/components/errors.js
            <div className={itemClass}>
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Not available</h1>
                        {logged_in ? <p>Your account is not allowed to view this page.</p> : <p>Please sign in to view this page.</p>}
                        {logged_in ? null : <p>Or <a href='mailto:encode-help@lists.stanford.edu'>Request an account.</a></p>}
=======
            <div className="container">
                <div className={itemClass}>
                    <div className="row">
                        <div className="col-sm-12">
                            <h1>Not available</h1>
                            <p>Access to this interface is currently restricted to ClinGen curators. To access publicly available information, please visit the <a href="http://clinicalgenome.org">ClinGen portal</a>.</p>
                            <p>If you are a ClinGen curator, you may <a href='mailto:clingen-helpdesk@lists.stanford.edu'>request an account</a>.</p>
                        </div>
>>>>>>> refs/remotes/ClinGen/dev:src/clincoded/static/components/errors.js
                    </div>
                </div>
            </div>
        );
    }
});

globals.content_views.register(HTTPForbidden, 'HTTPForbidden');


<<<<<<< HEAD:src/encoded/static/components/errors.js
=======
var BlankWhileLoading = module.exports.BlankWhileLoading = function (props) {
    if (!props.loadingComplete) return "";
    return props.context.title;
};

globals.listing_titles.register(BlankWhileLoading, 'HTTPForbidden');


>>>>>>> refs/remotes/ClinGen/dev:src/clincoded/static/components/errors.js
var LoginDenied = module.exports.LoginDenied = React.createClass({
    render: function() {
        var context = this.props.context;
        var itemClass = globals.itemClass(context, 'panel-gray');
        return (
            <div className="container">
                <div className={itemClass}>
                    <div className="row">
                        <div className="col-sm-12">
                            <h1>Login failure</h1>
                            <p>Access is restricted to ClinGen curators.</p>
                            <p>If you are a ClinGen curator, you may <a href='mailto:clingen-helpdesk@lists.stanford.edu'>request an account</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

globals.content_views.register(LoginDenied, 'LoginDenied');


var RenderingError = module.exports.RenderingError = React.createClass({
    render: function() {
        var context = this.props.context;
        var itemClass = globals.itemClass(context, 'panel-gray');
        return (
            <div className="container">
                <div className={itemClass}>
                    <h1>{context.title}</h1>
                    <p>{context.description}</p>
                    <pre>{context.detail}</pre>
                </div>
            </div>
        );
    }
});

globals.content_views.register(RenderingError, 'RenderingError');
