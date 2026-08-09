.PHONY: install install-ruby install-node up

install: install-ruby install-node

install-ruby:
	bundle install

install-node:
	npm install

up:
	npm run watch:css & \
	bundle exec jekyll serve; \
	kill %1
