function WebAudioTinySynth(){
    this.sy=
    /*include webaudio-tinysynth-coreobj.js*/
    ;
    this.setQuality=function(q){this.sy.setQuality(q);};
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
    for(var k in this.sy.properties) {
      this.sy[k]=this.sy.properties[k].value;
    }
    this.setQuality(1);
    this.sy.ready();
}
