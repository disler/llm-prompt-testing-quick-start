/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-24 16:26:12
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-24 22:17:00
 */

'use strict';

var _ = require('lodash-node'),
    chai = require('chai'),
    expect = chai.expect,
    rouge = require('../src/rouge.js');

chai.use(require('chai-things'));

suite('Utility Methods', function() {
    test('Factorial Calculation', function() {
        var factorial = rouge._fact;

        var fact0 = factorial(0),
            fact1 = factorial(1),
            fact10 = factorial(10),
            fact20 = factorial(20);

        expect(fact0).to.equal(1);
        expect(fact1).to.equal(1);
        expect(fact10).to.equal(3628800);
        expect(fact20).to.equal(2432902008176640000);
    });

    test('Longest Common Subsequence', function() {
        var lcs = rouge._lcs;

        var banana = ['B', 'A', 'N', 'A', 'N', 'A'],
            atana = ['A', 'T', 'A', 'N', 'A'],
            abazdc = ['A', 'B', 'A', 'Z', 'D', 'C'],
            bacbad = ['B', 'A', 'C', 'B', 'A', 'D'],
            abcdgh = ['A', 'B', 'C', 'D', 'G', 'H'],
            aedfhr = ['A', 'E', 'D', 'F', 'H', 'R'];

        expect(lcs(banana, atana)).to.equal(4);
        expect(lcs(abazdc, bacbad)).to.equal(4);
        expect(lcs(abcdgh, aedfhr)).to.equal(3);
    });

    test('n-gram Generation', function() {
        var gram = rouge._extractGram,
            data = ['Colorless', 'green', 'ideas', 'sleep', 'furiously'];

        var nullgram = gram(data, 0),
            overgram = gram(data, 6);

        var unigram = gram(data, 1),
            bigram = gram(data, 2),
            trigram = gram(data, 3),
            fourgram = gram(data, 4),
            fivegram = gram(data, 5);

        expect(nullgram).to.be.null();
        expect(overgram).to.be.null();

        expect(unigram).to.have.length(5);
        expect(unigram).to.contain.something.that.equals('Colorless');
        expect(unigram).to.contain.something.that.equals('green');
        expect(unigram).to.contain.something.that.equals('ideas');
        expect(unigram).to.contain.something.that.equals('sleep');
        expect(unigram).to.contain.something.that.equals('furiously');

        expect(bigram).to.have.length(4);
        expect(bigram).to.contain.something.that.equals('Colorlessgreen');
        expect(bigram).to.contain.something.that.equals('greenideas');
        expect(bigram).to.contain.something.that.equals('ideassleep');
        expect(bigram).to.contain.something.that.equals('sleepfuriously');

        expect(trigram).to.have.length(3);
        expect(trigram).to.contain.something.that.equals('Colorlessgreenideas');
        expect(trigram).to.contain.something.that.equals('greenideassleep');
        expect(trigram).to.contain.something.that.equals('ideassleepfuriously');

        expect(fourgram).to.have.length(2);
        expect(fourgram).to.contain.something.that.equals('Colorlessgreenideassleep');
        expect(fourgram).to.contain.something.that.equals('greenideassleepfuriously');

        expect(fivegram).to.have.length(1);
        expect(fivegram).to.deep.equal(['Colorlessgreenideassleepfuriously']);
    });

    test('Skip Bigram Generation', function() {
        var skipBigram = rouge._skipBigram;

        var badInput = ['llama'],
            badResult = skipBigram(badInput);

        var goodInput = ['police', 'killed', 'the', 'gunman'],
            goodResult = skipBigram(goodInput);

        expect(badResult).to.be.null();

        expect(goodResult).to.have.length(6);
        expect(goodResult).to.contain.something.that.equals('policekilled');
        expect(goodResult).to.contain.something.that.equals('policethe');
        expect(goodResult).to.contain.something.that.equals('policegunman');
        expect(goodResult).to.contain.something.that.equals('killedthe');
        expect(goodResult).to.contain.something.that.equals('killedgunman');
        expect(goodResult).to.contain.something.that.equals('thegunman');
    });
});

suite('Evaluation Metrics', function() {
    var candidate = 'pulses may ease schizophrenic voices',
        reference1 = 'magnetic pulse series sent through brain may ease schizophrenic voices',
        reference2 = 'yale finds magnetic stimulation some relief to schizophrenics imaginary voices';

    test('ROUGE-N', function() {
        expect(rouge.n(candidate, reference1, 1)).to.equal(4 / 10);
        expect(rouge.n(candidate, reference2, 1)).to.equal(1 / 10);
        expect(rouge.n(candidate, [reference1, reference2], 1, false)).to.equal(5 / 20);
        expect(rouge.n(candidate, [reference1, reference2], 1, true)).to.exist();

        expect(rouge.n(candidate, reference1, 2)).to.equal(3 / 9);
        expect(rouge.n(candidate, reference2, 2)).to.equal(0 / 9);
        expect(rouge.n(candidate, [reference1, reference2], 2, false)).to.equal(3 / 18);
        expect(rouge.n(candidate, [reference1, reference2], 2, true)).to.exist();

        expect(rouge.n(candidate, reference1, 3)).to.equal(2 / 8);
        expect(rouge.n(candidate, reference2, 3)).to.equal(0 / 8);
        expect(rouge.n(candidate, [reference1, reference2], 3, false)).to.equal(2 / 16);
        expect(rouge.n(candidate, [reference1, reference2], 3, true)).to.exist();

        expect(rouge.n(candidate, reference1, 4)).to.equal(1 / 7);
        expect(rouge.n(candidate, reference2, 4)).to.equal(0 / 7);
        expect(rouge.n(candidate, [reference1, reference2], 4, false)).to.equal(1 / 14);
        expect(rouge.n(candidate, [reference1, reference2], 4, true)).to.exist();
    });

    test('ROUGE-L', function() {
        expect(rouge.l(candidate, reference1)).to.exist();
        expect(rouge.l(candidate, reference2)).to.exist();

        expect(rouge.l(candidate, [reference1, reference2])).to.exist();
    });

    test('ROUGE-S', function() {
        expect(rouge.s(candidate, reference1)).to.exist();
        expect(rouge.s(candidate, reference2)).to.exist();

        expect(rouge.s(candidate, [reference1, reference2])).to.exist();
    });
});
