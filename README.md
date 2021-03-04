
<!--#echo json="package.json" key="name" underline="=" -->
ubborg-bashrc-terminal-util-pmb
===============================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Declare bash config files for use with terminal-util-pmb&#39;s
pluggable-bashrc-sourcer.
<!--/#echo -->


* [terminal-util-pmb repo](https://github.com/mk-pmb/terminal-util-pmb)


API
---

This module exports one function:

### bashrc(opts)

Returns an array of file specs.
`opts` is an optional options object that supports these optional keys:

* `examples`: If a non-empty string, basename of the examples rcd symlink.
  If false-y (default), the symlink is not declared.
* `libdir`: What string to put as the path to T-U's parent directory.
  Default: `'"$HOME"/lib'` (relative: `../../lib`)




<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
