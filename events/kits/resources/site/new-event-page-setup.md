---
layout: default
section: event-kits
---

# Creating a New Event Page

It's very easy to quickly create a new page for your upcoming hackathon or
meetup event in just a few steps. We have ready-to-go event page templates
for you to simply fill in your details. 

## Setup

### GitHub

The steps for setting up, forking, and cloning this website's repository
are the same as the steps we've [documented for submitting tests][github-101]. The small
differences here are just repo URLs and branch names.

* If you're not already set up, follow the [setup instructions][github-setup].

* Follow the [fork instructions][github-fork], starting at  [https://github.com/w3c/testtwf-website][testtwf-website].
	
* Follow the [clone instructions][github-clone]. For the repo name, use ```https://github.com/your-github-username/testtwf-website.git```

* Create a branch for your page
	
		$ cd testtwf-website
		$ git checkout -b yourcity-event-page
	
Now the page you build in the steps below will be created in a branch of your
local copy of the website repository.

### Jekyll
Setting up Jekyll to build and preview your changes is also very easy - it just takes one command. See the **Build tool** section of our [contributing guidelines][contributing].

## Event Page Creation

A blank event [page template][event-page-template] is available for you. The layout and format is
already in place so all you have to do is fill in the data specific to your event.

### Create Your Page From Template

Make a copy the page template and rename it for your event, saving it in the directory 
for the year of your event. 

For example, if your event is in Seattle in January 2014:

	$ cp events/kits/resources/site/page-template-en.md events/2014/seattle.md
		
### Fill in Event Details

Open your copy of the page template and follow the inline instructions to fill in the details of
your event. 

_Note: It is ok to push your event page live leaving some of the sections defaulted to 
**"Coming Soon!"** At a minimum, the date, location, and About section should be filled in before going live._

### Update Site Config

* Open ```_config.yml``` at the root of the ```testtwf-website``` directory.
* Add your event to the **events** array.

	For example:
	
		{ 
			"upcoming:" "true",
			"date": "November 9, 2013",
			"location": "Shenzhen, China",
    		"slug": "shenzhen",
    		"year": 2013
    	}

_Note: The value for slug must match the filename of your event page. If you named your page 'seattle.md', the slug must be 'seattle'._

## Preview Your Page

Before you send the pull request, you'll likely want to preview your changes. If you've set
Jekyll up properly, you can launch the local server to see your changes:

	$ jekyll serve --watch
	
Then navigate to [http://localhost:4000/events][local-jekyll]

* Verify you see your event in the Upcoming Events section of this page
* Verify you see your event in the Upcoming Events sidebar
* Click through on your event page and verify it's laid out properly

If you need to make changes and preview them again, just refresh your browser.

## Go Live!

### Commit & Push

Before you send a pull request, you'll need to commit your changes to your local branch
and the branch oo the server:

	$ cd testtwf-website
	$ git add path_to_your_event_page
	$ git add _config.yml
	$ git commit -m "adding new event page for Seattle 2014"
	$ git push origin your-branchname
	

### Send Pull Request

* Follow the [submission instructions][github-submit], using the branch name
and URLs you used above.
* Once your pull requests has been sent, notifications will be sent to the repo 
owners, but you may want to also send an email to [public-testtwf-planning][public-testtwf-planning]
to request it be reviewed and merged.

## Making Ongoing Changes 

It's very normal to make updates to your event page as you confirm details, experts, speakers, etc.
As you confirm the details of your event, you can come back and make edits and send new pull requests as often as you like by following these guidelines.


[github-101]: /docs/github-101.html
[github-setup]: /docs/github-101.html#setup
[github-fork]: /docs/github-101.html#fork
[github-clone]: /docs/github-101.html#clone-the-test-repo
[github-submit]: /docs/github-101.html#submit
[testtwf-website]: https://github.com/w3c/testtwf-website
[contributing]: https://github.com/w3c/testtwf-website/blob/gh-pages/CONTRIBUTING.md
[event-page-template]: /events/kits/resources/site/page-template-en.html
[local-jekyll]: http://127.0.0.1:4000/events
[public-testtwf-planning]: http://lists.w3.org/Archives/Public/public-testtwf-planning/