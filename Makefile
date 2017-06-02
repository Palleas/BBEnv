bootstrap:
	@echo "Install bats, yarn and node packages if needed"
	@which bats || brew install bats
	@brew install yarn || true
	@yarn install

test:
	bats tests
	yarn run test
