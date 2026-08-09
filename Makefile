.PHONY: install install-ruby install-node build up

install: install-ruby install-node

install-ruby:
	bundle install

install-node:
	npm install

build:
	npm run build:css
	bundle exec jekyll build

up:
	npm run watch:css & \
	bundle exec jekyll serve; \
	kill %1
