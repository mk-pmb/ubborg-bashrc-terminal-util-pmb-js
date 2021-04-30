// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';
import eq from 'equal-pmb';

import bashrc from '..';


const mimeType = 'text/plain';
const tu = 'terminal-util-pmb/';
const tups = tu + 'pluggable-bashrc-sourcer.sh';
const tude = tu + 'doc/examples/bashrc_parts/';


function cmpTest(descr, opt, ex, detail) {
  test(descr, (t) => {
    t.plan(1);
    const ac = bashrc(opt);
    eq(ac[detail], ex[detail]);
    eq.lists(ac, ex);
    t.same(ac, ex);
  });
}


const exDef = [
  { path: '~/.profile',
    mimeType,
    content: 'eval "$("$HOME"/lib/' + tups + ' p)"\n',
  },
  { path: '~/.bashrc',
    mimeType: 'text/plain',
    content: 'eval "$("$HOME"/lib/' + tups + ' r)"\n',
  },
];

cmpTest('defaults', undefined, exDef, 0);

cmpTest('example symlink', { examples: 'tu' }, [
  ...exDef,
  '~/.config/bash/tu.rcd =-> ../../lib/' + tude,
], 0);

const hbl = '/home/bernd/lib';
const exBernd = [
  { path: '~/.profile',
    mimeType,
    content: 'eval "$(' + hbl + '/' + tups + ' p)"\n',
  },
  { path: '~/.bashrc',
    mimeType: 'text/plain',
    content: 'eval "$(' + hbl + '/' + tups + ' r)"\n',
  },
  '~/.config/bash/tu.core.rcd =-> ' + hbl + '/' + tude,
];

cmpTest('example symlink', {
  libdir: hbl,
  examples: 'tu.core',
}, exBernd, 0);

cmpTest('example symlink', {
  libdir: hbl,
  examples: ['tu.', 'core', 'extra'],
}, [
  ...exBernd,
  '~/.config/bash/tu.extra.rcd =-> §=> tu.core.rcd/extra/',
], 0);














/* scroll */
