set -e

node build.mjs
ruby prepub-version-inc.rb

npm publish
