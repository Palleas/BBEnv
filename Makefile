bootstrap:
	@echo "Install bats, yarn and node packages if needed"
	@brew install bats || true
	@brew install yarn || true
	@yarn install

test: bootstrap
	bats tests
