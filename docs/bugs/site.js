var d = React.DOM;
var repo = "w3c/web-platform-tests";

var sections = [
    {name: "cleanup",
     filters: ["+label:difficulty:easy+label:type:cleanup"],
     heading: "Test Cleanup",
     description: "Tests that have small style issues or require other cleanup work",
     feelingAdventurous: true},
    {name: "goodFirstBugs",
     filters: ["+label:difficulty:easy+label:type:bug"],
     heading: "Bugs in Existing Tests",
     description: "Testcases that have problems, e.g. because they have become out of date compared to the spec.",
     feelingAdventurous: true},
    {name: "missingCoverage",
     filters: ["+label:difficulty:easy+label:type:missing-coverage"],
     heading: "Coverage Missing",
     description: "Areas where we need new tests to be written from scratch",
     feelingAdventurous: true}
]

var hexToRGB = function(string) {
    var components = [];
    if (string[0] == "#") {
        string = string.slice(1);
    }
    if (string.length == 3) {
        for (var i=0; i<3; i++) {
            components.push(parseInt(string[i] + string[i], 16) / 256.);
        }
    } else {
        for (var i=0; i<6; i+=2) {
            components.push(parseInt(string.slice(i, i+2), 16) / 256.);
        }
    }
    return components;
}

var luminance = function(components) {
    var X = components.map(function(x) {
        if (x <= 0.03928) {
            return x/12.92;
        } else {
            return Math.pow(((x+0.055)/1.055), 2.4);
        }
    });
    return 0.2126 * X[0] + 0.7152 * X[1] + 0.0722 * X[2];
}

var contrast = function(l1, l2) {
    if (l1 < l2) {
        var temp = l1;
        l1 = l2;
        l2 = temp;
    }
    return (l1 + 0.05) / (l2 + 0.05);
}

var getOpenBugs = function(labels, callback) {
    var issuesUrl = "https://api.github.com/search/issues";

    var issues = labels.map(function(x) {
        return $.ajax({
            dataType: "json",
            url: issuesUrl,
            data: ("q=state:open" + x + "+repo:" + repo + "&sort=created")
        });
    });

    $.when.apply(undefined, issues).done(
        function() {
            if (issues.length == 1) {
                var all  = arguments[0].items;
            } else {
                var all = Array.prototype.reduce.call(arguments,
                                                      function(prev, cur) {
                                                          return prev.concat(cur[0].items);
                                                      }, []);
            }
            all.sort(function(l, r) {
                return r.created_at.localeCompare(l.created_at)
            });
            callback(all);
    });
};

var label = function(data) {
    var contrastBlack = contrast(0, luminance(hexToRGB(data.color)));
    var contrastWhite = contrast(1, luminance(hexToRGB(data.color)));

    var color = contrastWhite > contrastBlack ? "white" : "black";
    return d.span(
        {className: "label", style: {backgroundColor: "#" + data.color, color: color}},
        data.name
    );
}

var FeelingAdventurous = React.createClass({
    gotoRandomIssue: function() {
        var issues = this.props.issues;

        var randomIndex = Math.floor(Math.random() * (issues.length + 1));

        window.location.href = issues[randomIndex].html_url;
    },

    render: function() {
        return d.button(
            {className: "button", onClick: this.gotoRandomIssue},
            "I'm Feeling Adventurous..."
        );
    }
});

var feelingAdventurous = function(issues) {
    return React.createElement(FeelingAdventurous, {issues: issues});
};

var Labels = React.createClass({
    render: function() {
        return d.div(
            {className: "labels"},
            this.props.labels.map(label)
        );
    }
});

var labels = function(data) {
    return React.createElement(Labels, data);
}

var Issue = React.createClass({
    render: function() {
        return d.li(
            {className: "issue"},
            d.div(
                {},
                "[ ",
                d.a(
                    {
                        className: "issue-link",
                        href: this.props.html_url,
                        heading: this.props.title
                    },
                    this.props.number
                ),
                " ] - ",
                d.span(
                    {className: "issue-desc"},
                    this.props.title
                )
            ),
            labels(this.props)
        );
    }
});

var issueItem = function(data) {
    return React.createElement(Issue, data);
}

var IssueList = React.createClass({
    getInitialState: function() {
        return {
            limited: true
        };
    },

    render: function() {
        if (this.props.loading) {
            return d.div({id: "loading"});
        } else if (!this.props.issues.length) {
            return d.ul({}, d.li({}, "No issues found"));
        } else {
            var issues;

            if (this.state.limited) {
                issues = this.props.issues.map(issueItem).slice(0, 5);
                if (this.props.issues.length > 5) {
                    issues = issues.concat(
                        d.div({className: "view-all",
                               onClick: function() {
                                   this.setState({limited: false})
                               }.bind(this)
                              },
                              "view all..."
                             ));
                }
            } else {
                issues = this.props.issues.map(issueItem);
            }

            return d.ul(
                {id: "issues"},
                issues
            );
        }
    }
});

var issueList = function(issues, loading) {
    return React.createElement(IssueList, {issues: issues, loading: loading});
};

var App = React.createClass({
    componentDidMount: function() {
        sections.forEach(function(x, i) {
            getOpenBugs(
                x.filters,
                function(data) {
                    var state = {}
                    state[x.name] = {loading: false,
                                      data: data};
                    this.setState(state);
                }.bind(this));
        }.bind(this));
    },

    getInitialState: function() {
        var rv = {};
        sections.forEach(function(x) {
            rv[x.name] = {loading: true,
                           data: []}
        });
        return rv;
    },

    render: function() {
        var this_obj = this;

        var feelingAdventurousReady = sections.every(function(x) {
            !x.feelingAdventurous || !this_obj.state[x.name].loading
        });

        var feelingAdventurousIssues = sections.reduce(function(prev, x) {
            if (!x.feelingAdventurous) {
                return prev;
            } else {
                return prev.concat(this_obj.state[x.name].data)
            }
        }, []);

        var args = [{},
                    feelingAdventurousReady ? [] : feelingAdventurous(feelingAdventurousIssues)]

        args = sections.reduce(function(prev, x) {
            var state = this_obj.state[x.name];
            var children = [d.h2({}, x.heading)];
            if (x.description) {
                children.push(d.p({}, x.description));
            }
            children.push(issueList(state.data, state.loading));
            return prev.concat(children);
        }, args);

        return d.div.apply(this, args);
    }
});

React.render(
    React.createElement(App, {}),
    document.getElementById("app")
);

