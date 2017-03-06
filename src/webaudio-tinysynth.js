"use strict";
function WebAudioTinySynth(opt){
  this.__proto__ = this.sy =
  /*include ../tmp/webaudio-tinysynth-nogui.js*/
;
  for(var k in this.sy.properties)
    this[k]=this.sy.properties[k].value;
  this.setQuality(1);
  if(opt){
    if(opt.useReverb!=undefined)
      this.useReverb=opt.useReverb;
    if(opt.quality!=undefined)
      this.setQuality(opt.quality);
    if(opt.voices!=undefined)
      this.setVoices(opt.voices);
  }
  this.ready();
}
