ROUGE.js
=====

A Javascript implementation of the Recall-Oriented Understudy for Gisting Evaluation (ROUGE) evaluation metric for summaries. This package implements the following metrics:

- n-gram (ROUGE-N)
- Longest Common Subsequence (ROUGE-L)
- Skip Bigram (ROUGE-S)

## Rationale
ROUGE is somewhat a standard metric for evaluating the performance of auto-summarization algorithms. However, with the exception of [MEAD](http://www.summarization.com/mead/) (which is written in Perl. Yes. Perl.), requesting a copy of ROUGE to work with requires one to navigate a barely functional [webpage](http://www.isi.edu/licensed-sw/see/rouge/), fill up [forms](http://www.berouge.com/Pages/DownloadROUGE.aspx), and sign a legal release somewhere along the way while at it. These definitely exist for good reason, but it gets irritating when all one wishes to do is benchmark an algorithm.

Nevertheless, the [paper](http://www.aclweb.org/anthology/W04-1013) describing ROUGE is available for public consumption. The appropriate course of action is then to convert the equations in the paper to a more user-friendly format, which takes the form of the present repository. So there. No more forms. See how life could have been made a lot easier for everyone if we were all willing to stop writing legalese or making people click submit buttons?

## Quick Start
This package is available on NPM, like so:
```shell
npm install --save rouge
```
To use it, simply require the package:
```
var rouge = require('rouge');
```
If you're a "browser + console" kind of person, you can clone this repository and load ``src/rouge.js`` directly. No biggie.

A small but growing number of tests are written in Mocha. To run them:
```shell
npm test
```
This should give you many lines of colorful text in your CLI. Naturally, you'll need to have Mocha installed, but you knew that already.

## Usage
All three functions follow more-or-less the same type signature by design, so what works with one will work with the other. Where possible, I've tried to write everything such that it's as fast as possible, but if you're going to be doing some serious crunching, consider using a lower-level language.

A caveat: The original paper is ambiguous in some areas, but I've tried to be as loyal as I can. Most notably, the default behavior of all metrics when multiple reference summaries are provided is to jackknife the data, because it feels more reasonable to do so than to not. You can override this as described below.

### ``rouge.n(candidate, [reference, ...], n, jackknife)``
Calculates a metric based on word n-gram matches. If ``n`` is not specified, it defaults to 1, because the law of the land claims that good approximation of human judgment occurs when unigrams are considered. If ``jackknife`` is not specified, it defaults to ``true``.

```js
// Where `candidate` and `reference` are both strings. 
// This uses unigrams with jackknifing.
rouge.n(candidate, reference, 1);

// Where `candidate` is a string, and the second argument is a string array, 
// i.e. `reference1` and `reference2` are strings. 
// This uses bigrams with jackknifing disabled.
rouge.n(candidate, [reference1, reference2], 2, false);
```

### ``rouge.l(candidate, [reference, ...], jackknife)``
Calculates a metric based on the longest common subsequence (LCS) of words. If ``jackknife`` is not specified, it defaults to ``true``. This uses a dynamic programming approach with search-space reduction to calculate the LCS, but life is generally better when you don't have run-on sentences in your summary, yes?

```js
// Where `candidate` and `reference` are both strings.
rouge.l(candidate, reference);

// Where `candidate` is a string, and the second argument is a string array, 
// i.e. `reference1` and `reference2` are strings. 
// This performs the calculation with jackknifing disabled.
rouge.l(candidate, [reference1, reference2], false);
```

### ``rouge.s(candidate, [reference, ...], jackknife)``
Calculates a metric based on skip bigrams. If ``jackknife`` is not specified, it defaults to ``true``.

```js
// Where `candidate` and `reference` are both strings.
rouge.s(candidate, reference);

// Where `candidate` is a string, and the second argument is a string array, 
// i.e. `reference1` and `reference2` are strings.
// This performs the calculation with jackknifing disabled.
rouge.s(candidate, [reference1, reference2], false);
```

## Additional Notes
ROUGE itself is not without limitation, many of which are described by the author himself. The functions above have been written to hopefully give a user as much flexibility as possible in implementing (or stacking atop) any modifications and enhancements they might wish to add. For example, it's trivial to run a stemmer on your sentences, concatenate the results (to get a string once again) and throw them into the above. If you'd like to perform your own statistical averaging, just disable jackknifing and perform your own pairwise comparisons as needed.

## Versioning

Development will be maintained under the Semantic Versioning guidelines as much as possible in order to ensure transparency and backwards compatibility.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

+ Breaking backward compatibility bumps the major (and resets the minor and patch)
+ New additions without breaking backward compatibility bump the minor (and resets the patch)
+ Bug fixes and miscellaneous changes bump the patch

For more information on SemVer, visit http://semver.org/.

## Bug Tracking and Feature Requests

Have a bug or a feature request? [Please open a new issue](https://github.com/kenlimmj/rouge/issues).

Before opening any issue, please search for existing issues and read the [Issue Guidelines](CONTRIBUTING.md). 

## Contributing

Please submit all pull requests against *-wip branches. All code should pass JSHint/JSLint validation.

The amount of data available for writing tests is unfortunately woefully inadequate. I've tried to be as thorough as possible, but that eliminates neither the possibility of nor existence of errors. The gold standard is the DUC data-set, but that too is form-walled and legal-release-walled, which is infuriating. If you have data in the form of a candidate summary, reference(s), and a verified ROUGE score you do not mind sharing, I would love to add that to the test harness. 

## License
Licensed under the MIT License. 

