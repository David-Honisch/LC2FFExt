#LC2FFExt

#Open Source Browser Extension

@vironic:sidepanel, external process, webservice (desktop app reg.)
@david:options, sidepanel, activetab
@ruly:html parser, selection by category

#Current package declaration
{
  "name": "webextensions-examples",
  "title": "WebExtensions Examples",
  "version": "1.0.0",
  "description": "Example Firefox add-ons created using the WebExtensions API",
  "devDependencies": {
    "eslint": "^4.4.1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/mdn/webextensions-examples.git"
  },
  "scripts": {
    "test": "eslint .",
    "lint": "eslint ."
  },
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/mdn/webextensions-examples/issues"
  },
  "keywords": [
    "webextensions",
    "webextensions-apis",
    "mdn",
    "firefox",
    "mozilla"
  ],
  "homepage": "https://developer.mozilla.org/Add-ons/WebExtensions/Examples",
  "dependencies": {
    "babel-eslint": "^7.2.3"
  }
}
