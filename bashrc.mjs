// -*- coding: utf-8, tab-width: 2 -*-

const tup = '/terminal-util-pmb/';

function bashrc(opt) {
  if (!opt) { return bashrc(true); }

  function eva(modeArg, dotName) {
    const c = ('eval "$(' + (opt.libdir || '"$HOME"/lib')
      + tup + 'pluggable-bashrc-sourcer.sh ' + modeArg + ')"\n');
    return { path: '~/.' + dotName, mimeType: 'text/plain', content: c };
  }

  const files = [
    eva('p', 'profile'),
    eva('r', 'bashrc'),
  ];

  if (opt.examples) {
    files.push('~/.config/bash/' + opt.examples + '.rcd =-> '
      + (opt.libdir || '../../lib') + tup + 'doc/examples/bashrc_parts');
  }

  return files;
}

export default bashrc;
