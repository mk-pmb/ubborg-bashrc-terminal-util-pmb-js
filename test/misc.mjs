// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';
import eq from 'equal-pmb';

import bashrc from '..';


const mimeType = 'text/plain';
const tu = 'terminal-util-pmb/';
const tups = tu + 'pluggable-bashrc-sourcer.sh';
const tude = tu + 'doc/examples/bashrc_parts';


function cmpTest(descr, opt, ex) {
  test(descr, (t) => {
    t.plan(1);
    const ac = bashrc(opt);
    eq.lists(ac, ex);
    t.same(ac, ex);
  });
}


const exDef = [
  { path: '~/.profile',
    mimeType,
    content: 'eval "$("$HOME"/lib/' + tups + ' p)"',
  },
  { path: '~/.bashrc',
    mimeType: 'text/plain',
    content: 'eval "$("$HOME"/lib/' + tups + ' r)"',
  },
];

cmpTest('defaults', undefined, exDef);

cmpTest('example symlink', { examples: 'tu' }, [
  ...exDef,
  '~/.config/bash/tu.rcd =-> ../../lib/' + tude,
]);

const hbl = '/home/bernd/lib';

cmpTest('example symlink', { examples: 'tu', libdir: hbl }, [
  { path: '~/.profile',
    mimeType,
    content: 'eval "$(' + hbl + '/' + tups + ' p)"',
  },
  { path: '~/.bashrc',
    mimeType: 'text/plain',
    content: 'eval "$(' + hbl + '/' + tups + ' r)"',
  },
  '~/.config/bash/tu.rcd =-> ' + hbl + '/' + tude,
]);
