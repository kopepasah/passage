# Passage

Vagrant SSH command forwarder build specifically for working with [VVV 2.0][1].

## Requirements

- VVV 2.0
- Node + NPM

## Installation

This tool can be installed anywhere, as long as you source the `passage` shell command or export it within your path, within your enviroment.

### Example

If you clone this repo into `~/.code/passage`, you would add the following to your `.bash_profile`:
```
export PATH="~/.code/passage"
```

## Required Settings

This repo requires [VVV 2.0][1] because it uses the `vvv-config.yml` or `vvv-custom.yml` to find the location of sites within the Vagrant.

In addition, a `machines.json` file is required in order to define your machine locations (`passage` will assume the first item in the JSON object unless otherwise specified). This files should be placed within the passage directory.

#### Example `machines.json` Object

```
{
  "vvv" : "/PATH/TO/VVV"
}
```

## Usage

Passage was really built to run command specific to a site (e.g. `wp plugin list`). When running commands specific to a site, `passage` should be run from within the site's directory like so:

```
passage wp plugin list
```

### Options

| Command | Description                     | Defaults                     |
|---------|---------------------------------|------------------------------|
| target  | Path to the target VVV.         | First item in machines.json. |
| site    | Site name (from vvv-config.yml) | Current site directory.      |


[1]: https://github.com/Varying-Vagrant-Vagrants/VVV
