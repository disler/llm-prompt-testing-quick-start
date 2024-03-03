/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-21 01:48:14
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-24 22:16:28
 */

'use strict';

(function(window) {
    var rouge = (function() {
        if (typeof(module) === 'object' && module && typeof(module.exports) === 'object') {
            var _ = require('lodash-node');
        }

        var fact = _.memoize(function(n) {
            return n === 0 ? 1 : n * fact(n - 1);
        });

        var lcs = function(candidate, reference) {
            var candidate = _.invoke(candidate, String.prototype.toLowerCase),
                reference = _.invoke(reference, String.prototype.toLowerCase);

            var startIdx = 0,
                candidateEndIdx = candidate.length - 1,
                referenceEndIdx = reference.length - 1,
                similarityCount = 0;

            while (candidate[startIdx] === reference[startIdx]) {
                startIdx++;

                similarityCount++;
            }

            while (candidate[candidateEndIdx] === reference[referenceEndIdx]) {
                candidateEndIdx--;
                referenceEndIdx--;

                similarityCount++;
            }

            var trimmedCandidate = candidate.slice(startIdx, candidateEndIdx + 1),
                trimmedReference = reference.slice(startIdx, referenceEndIdx + 1);

            var cTable = [];

            for (var i = 0; i <= trimmedReference.length; i++) {
                cTable.push(Uint8Array(trimmedCandidate.length + 1));
            }

            for (var i = 1; i <= trimmedReference.length; i++) {
                for (var j = 1; j <= trimmedCandidate.length; j++) {
                    if (trimmedReference[i - 1] === trimmedCandidate[j - 1]) {
                        cTable[i][j] = cTable[i - 1][j - 1] + 1;
                    } else {
                        cTable[i][j] = Math.max(cTable[i][j - 1], cTable[i - 1][j]);
                    }
                }
            }

            return cTable[trimmedReference.length][trimmedCandidate.length] + similarityCount;
        }

        var skipBigram = function(wordArr) {
            if (wordArr.length < 2) {
                return null;
            } else {
                return wordArr.reduce(function(acc, currWord, index, wordBank) {
                    for (var i = index + 1; i < wordBank.length; i++) {
                        acc.push(currWord + wordBank[i]);
                    }

                    return acc;
                }, []);
            }
        }

        var extractGram = function(wordArr, n) {
            if (n === 0 || n > wordArr.length) {
                return null;
            } else if (n === 1) {
                return wordArr;
            } else {
                return wordArr.reduce(function(acc, _, index, wordBank) {
                    if (index + n <= wordBank.length) {
                        var currGram = '';

                        for (var i = index; i < index + n; i++) {
                            currGram += wordBank[i].toString();
                        }

                        return acc.concat([currGram]);
                    } else {
                        return acc;
                    }
                }, []);
            }
        }

        var evalJackKnife = function(candidate, references, evalMethod) {
            var pairwiseResults = [];

            for (var i = 0; i < references.length; i++) {
                var result = references.reduce(function(acc, currRef, index) {
                    if (index !== i) {
                        acc.push(evalMethod(candidate, currRef));
                    }

                    return acc;
                }, []);

                pairwiseResults.push(_.max(result));
            }

            var sumResult = pairwiseResults.reduce(function(acc, currResult) {
                return acc + currResult;
            }, 0);

            return sumResult / pairwiseResults.length;
        }

        var evalNGram = function(candidate, reference, n, jackKnife) {
            var n = n || 1,
                jackKnife = jackKnife !== false;

            var candidateWords = candidate.match(/\w+/g),
                candidateGrams = extractGram(candidateWords, n);

            if (typeof(reference) === 'string' || (_.isArray(reference) && reference.length === 1)) {
                if (typeof(reference) === 'string') {
                    var referenceWords = reference.match(/\w+/g);
                } else {
                    var referenceWords = reference[0].match(/\w+/g);
                }

                var referenceGrams = extractGram(referenceWords, n),
                    referenceGramCount = referenceGrams.length;

                var matchedGrams = _.intersection(candidateGrams, referenceGrams),
                    matchedGramCount = matchedGrams.length;

                return matchedGramCount / referenceGramCount;
            } else if (_.isArray(reference) && reference.length > 1) {
                if (jackKnife) {
                    return evalJackKnife(candidate, reference, function(x, y) {
                        return evalNGram(x, y, n, false);
                    });
                } else {
                    var referenceGramCount = 0,
                        referenceGrams = reference.reduce(function(acc, currRef) {
                            var words = currRef.match(/\w+/g),
                                grams = extractGram(words, n);

                            referenceGramCount += grams.length;

                            return acc.concat([grams]);
                        }, []);

                    var matchCount = 0;

                    referenceGrams.forEach(function(ref) {
                        var matchedGrams = _.intersection(candidateGrams, ref);

                        matchCount += matchedGrams.length;
                    });

                    return matchCount / referenceGramCount;
                }
            } else {
                return null;
            }
        }

        var evalLCS = function(candidate, reference) {
            var candidateSentences = candidate.split(/[\.!\?]\s/),
                candidateWordCount = candidate.match(/\w+/g).length;

            if (typeof(reference) === 'string' || (_.isArray(reference) && reference.length === 1)) {
                if (typeof(reference) === 'string') {
                    var referenceSentences = reference.split(/[\.!\?]\s/),
                        referenceWordCount = reference.match(/\w+/g).length;
                } else {
                    var referenceSentences = reference[0].split(/[\.!\?]\s/),
                        referenceWordCount = reference[0].match(/\w+/g).length;
                }

                var lcsSum = referenceSentences.reduce(function(acc, reference) {
                    var lcsArr = candidateSentences.map(function(candidate) {
                        return lcs(candidate, reference);
                    });

                    return acc + _.union(lcsArr).length;
                }, 0);

                var r = lcsSum / referenceWordCount,
                    p = lcsSum / candidateWordCount,
                    beta = p / r;

                var fMeasure = ((1 + beta * beta) * r * p) / (r + beta * beta * p);

                return fMeasure;
            } else if (_.isArray(reference) && reference.length > 1) {
                return evalJackKnife(candidate, reference, evalLCS);
            } else {
                return null;
            }
        }

        var evalSkipBigram = function(candidate, reference) {
            var candidateWords = candidate.match(/\w+/g),
                candidateWordCount = candidateWords.length,
                candidateSkipBigrams = skipBigram(candidateWords),
                candidateCombs = fact(candidateWordCount) / (2 * fact(candidateWordCount - 2));

            if (typeof(reference) === 'string' || (_.isArray(reference) && reference.length === 1)) {
                if (typeof(reference) === 'string') {
                    var referenceWords = reference.match(/\w+/g);
                } else {
                    var referenceWords = reference[0].match(/\w+/g);
                }

                var referenceWordCount = referenceWords.length,
                    referenceSkipBigrams = skipBigram(referenceWords),
                    referenceCombs = fact(referenceWordCount) / (2 * fact(referenceWordCount - 2));

                var r = candidateSkipBigrams / candidateCombs,
                    p = referenceSkipBigrams / referenceCombs,
                    beta = p / r;

                var fMeasure = ((1 + beta * beta) * r * p) / (r + beta * beta * p);

                return fMeasure;
            } else if (_.isArray(reference) && reference.length > 1) {
                return evalJackKnife(candidate, reference, evalSkipBigram);
            }
        }

        return {
            n: evalNGram,
            l: evalLCS,
            s: evalSkipBigram,
            _fact: fact,
            _lcs: lcs,
            _extractGram: extractGram,
            _skipBigram: skipBigram
        }
    })(rouge || {});

    if (typeof(module) === 'object' && module && typeof(module.exports) === 'object') {
        module.exports = rouge;
    } else {
        if (typeof(define) === 'function' && define.amd) {
            return rouge;
        } else {
            window.rouge = rouge;
        }
    }
})(this);
