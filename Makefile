bootstrap:
	@echo "Install bats, yarn and node packages if needed"
	@which bats || brew install bats
	@which yarn || brew install yarn
	@yarn install

bootstrap-ci:
	sudo add-apt-repository ppa:duggan/bats -y
	sudo apt-get update -q
	sudo apt-get install -y bats

test:
	bats tests
	yarn run test

publish:
	-rm -Rf dest
	yarn run build
	npm version patch -m "Release %s"
	npm publish
