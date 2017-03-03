function WebAudioTinySynth(opt){
    this.sy=
    /*include webaudio-tinysynth-coreobj.js*/
    ;
    this.setQuality=function(q){this.sy.setQuality(q);};
    this.setVoices=function(n){this.sy.setVoices(n);};
    this.setReverbLev=function(v){this.sy.setReverbLev(v);};
    this.setMasterVol=function(v){this.sy.setMasterVol(v);};
    this.setLoop=function(v){this.sy.setLoop(v);};
    this.getTimbreName=function(m,n){return this.sy.getTimbreName(m,n);};
    this.send=function(m,t,tsmode){this.sy.send(m,t,tsmode);};
    this.loadMIDIUrl=function(url){this.sy.loadMIDIUrl(url);};
    this.loadMIDI=function(ar){this.sy.loadMIDI(ar);};
    this.playMIDI=function(){this.sy.playMIDI();};
    this.stopMIDI=function(){this.sy.stopMIDI();};
    this.getPlayStatus=function(){return this.sy.getPlayStatus();};
    this.getAudioContext=function(){return this.sy.getAudioContext();};
    for(var k in this.sy.properties) {
      this.sy[k]=this.sy.properties[k].value;
    }
    this.setQuality(1);
    if(opt){
      if(opt.useReverb!=undefined)
        this.sy.useReverb=opt.useReverb;
      if(opt.quality!=undefined)
        this.setQuality(opt.quality);
      if(opt.voices!=undefined)
        this.setVoices(opt.voices);
    }
    this.sy.ready();
}
