<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Simple Github Action to parse Pixel Flavored gitOps tags

These tags are in a form of `8.1.3-fpm-bullseye_2` -> upstream_build-version

## PixelFederation flavored semver strings

[Semver](https://semver.org/) strings generally contains Major.Minor.Patch plus additional info. Pixelfederation flavored semverstrings contains addtional `_BuildNumber` at the end e.g.  `8.1.3-fpm-bullseye_2`.


## Semver GHA outputs

For a given input `tag = 8.1.3-fpm-bullseye_2` this acction will output following strings.

Usage:
```
- name: Parse tag semver string
  id: semver
  uses: pixelfederation/gh-action-semver-parser@wip
  with:
    tag: "8.1.3-fpm-bullseye_2"
```

Outputs:
```    
pft = "8.1.3-fpm-bullseye_2"
ut = "8.1.3-fpm-bullseye"

mmp = "8.1.3"
mm = "8.1"

mmpr = "8.1.3-bullseye"
mmr = "8.1-bullseye"

m = "8"

release = "bullseye"
```

if GHA action can't parse semver string and is not able to find required fields it will set output to undefined.