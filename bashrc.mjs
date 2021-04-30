// -*- coding: utf-8, tab-width: 2 -*-

const tup = '/terminal-util-pmb/';


function joinTpl(...a) { return a.join.bind(a); }


function setupExamples(opt) {
  let exSpec = opt.examples;
  if (!exSpec) { return []; }
  if (exSpec.substr) { exSpec = ['', exSpec]; }
  const [exSubPrefix, exBaseLinkNoFext, ...extras] = exSpec;
  const bashDir = '~/.config/bash/';
  const fext = '.rcd';
  const baseLinkName = exSubPrefix + exBaseLinkNoFext + fext;
  const baseLinkSpec = (bashDir + baseLinkName + ' =-> '
    + (opt.libdir || '../../lib') + tup + 'doc/examples/bashrc_parts/');
  const baseLinkSubSym = ' =-> §=> ' + baseLinkName + '/';
  const specs = [
    baseLinkSpec,
    ...extras.map(joinTpl(bashDir + exSubPrefix, fext + baseLinkSubSym, '/')),
  ];
  return specs;
}


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
    ...setupExamples(opt),
  ];
  return files;
}


export default bashrc;
