# dpndon-cli
The CLI tool for dpndon that helps refer information of dependencies of a npm module.

## Quick start

```
$ npm install -g dpndon-cli
```

## Options

### -h, --help, help

#### description
Show help of dpndon-cli.

#### example
```
$ dpndon -h
```

## Commands

### opener [package-name]

#### Description
launch the opener for dependencies of the npm project.

#### Example
It loads package.json at current directory if packagename is not given.
```
$ dpndon opener
```

It loads package.json from npm registry if packagename is given.
```
$ dpndon opener dpndon-core
```

## License
MIT

## Author
[Kotaro Takahashi@k4h4shi](https://twitter.com/k4h4shi)
