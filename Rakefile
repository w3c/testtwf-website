#############################################################################
#
# Modified version of jekyllrb Rakefile
# https://github.com/jekyll/jekyll/blob/master/Rakefile
#
#############################################################################

require 'rake'
require 'yaml'

CONFIG = YAML.load(File.read('_config.yml'))
REPO = CONFIG["repo"]
DESTINATION = CONFIG['destination']

USERNAME = "w3c"
SOURCE_BRANCH = "master"
DESTINATION_BRANCH = "gh-pages"

ENV["USERNAME"] = USERNAME
ENV["REPO"] = REPO
ENV["DESTINATION"] = DESTINATION
ENV["DESTINATION_BRANCH"] = DESTINATION_BRANCH

#############################################################################
#
# Helper functions
#
#############################################################################


def check_destination
  unless Dir.exist? DESTINATION
    Dir.mkdir DESTINATION
  end
end

def init_submodules
  sh "git submodule update --init"
end

def jekyll command
  sh "bundle exec jekyll #{command}"
end

#############################################################################
#
# Site tasks
#
#############################################################################

check_destination

desc "Update submodules"
task :submodule_update do
  init_submodules
  if `git diff --staged`.strip != ""
    puts "staging area must be clean"
    exit
  end
  sh "git submodule -q foreach 'git fetch -q && git checkout -q origin/master && cd $toplevel && git add $path'"
  if `git diff --staged`.strip != ""
    sh "git commit -m 'Update to latest submodules'"
  end
end

desc "Generate the site"
task :build do
  jekyll "build"
end

desc "Generate the site and serve locally"
task :serve do
  jekyll "serve"
end

desc "Generate the site, serve locally and watch for changes"
task :watch do
  jekyll "serve --watch"
end

desc "Generate the site and push changes to remote origin"
task :deploy do
  # Detect pull request

  if ENV['TRAVIS_PULL_REQUEST'] != "false" || !system("git rev-parse #{SOURCE_BRANCH}")
    sh "git submodule update --init"
    jekyll "build"
    puts 'Pull request detected. Not proceeding with deploy.'
    exit
  end

  puts 'Running on master; proceeding with deploy.'

  # Configure git if this is run in Travis CI
  if ENV["TRAVIS"]
    if ENV['TRAVIS_SECURE_ENV_VARS'] == "false"
      puts 'Not able to access secure variables'
      exit
    end
    sh "git config --global user.name '#{ENV['GIT_NAME']}'"
    sh "git config --global user.email '#{ENV['GIT_EMAIL']}'"
    sh "git config --global push.default tracking"
  end

  sh "git submodule update --init"
  sh "git checkout #{SOURCE_BRANCH}"

  sh "./clone.sh"

  # Generate the site
  jekyll "build"

  # Commit and push to github
  sh "./deploy.sh"
end

