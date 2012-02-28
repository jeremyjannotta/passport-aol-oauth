NODE = node
TEST = ./node_modules/.bin/vows
TESTS ?= test/*-test.js

test:
	@NODE_ENV=test NODE_PATH=lib $(TEST) $(TEST_FLAGS) $(TESTS)

docs: docs/api.html

docs/api.html: lib/passport-aol-oauth/*.js
	dox \
		--title Passport-AOL-OAuth \
		--desc "AOL OAuth 2.0 authentication strategies for Passport" \
		$(shell find lib/passport-aol-oauth/* -type f) > $@

docclean:
	rm -f docs/*.{1,html}

.PHONY: test docs docclean
