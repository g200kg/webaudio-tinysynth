function WebAudioTinySynth(opt){
    this.sy=
    /* webaudio-tynysynth core object */
  {
    is:"webaudio-tinysynth",
    properties:{
      width:      {type:String, value:"300px", observer:"layout"},
      height:     {type:String, value:"32px", observer:"layout"},
      masterVol:  {type:Number, value:0.5, observer:"setMasterVol"},
      reverbLev:  {type:Number, value:0.3, observer:"setReverbLev"},
      mute:       {type:Number, value:0},
      quality:    {type:Number, value:1, observer:"setQuality"},
      graph:      {type:Number, value:1},
      debug:      {type:Number, value:0},
      src:        {type:String, value:null, observer:"loadMIDIUrl"},
      loop:       {type:Number, value:0},
      disabledrop:{type:Number, value:0},
      internalcontext: {type:Number, value:1},
      tsmode:     {type:Number, value:0},
      perfmon:    {type:Number, value:0},
      voices:     {type:Number, value:64},
      useReverb:  {type:Number, value:1},
    },
    layout:function(){
      this.$["wa-canvas"].style.width=this.width;
      this.$["wa-canvas"].style.height=this.height;
    },
    program:[
// 1-8 : Piano
      {name:"Acoustic Grand Piano"},    {name:"Bright Acoustic Piano"},
      {name:"Electric Grand Piano"},    {name:"Honky-tonk Piano"},
      {name:"Electric Piano 1"},        {name:"Electric Piano 2"},
      {name:"Harpsichord"},             {name:"Clavi"},
/* 9-16 : Chromatic Perc*/
      {name:"Celesta"},                 {name:"Glockenspiel"},
      {name:"Music Box"},               {name:"Vibraphone"},
      {name:"Marimba"},                 {name:"Xylophone"},
      {name:"Tubular Bells"},           {name:"Dulcimer"},
/* 17-24 : Organ */
      {name:"Drawbar Organ"},           {name:"Percussive Organ"},
      {name:"Rock Organ"},              {name:"Church Organ"},
      {name:"Reed Organ"},              {name:"Accordion"},
      {name:"Harmonica"},               {name:"Tango Accordion"},
/* 25-32 : Guitar */
      {name:"Acoustic Guitar (nylon)"}, {name:"Acoustic Guitar (steel)"},
      {name:"Electric Guitar (jazz)"},  {name:"Electric Guitar (clean)"},
      {name:"Electric Guitar (muted)"}, {name:"Overdriven Guitar"},
      {name:"Distortion Guitar"},       {name:"Guitar harmonics"},
/* 33-40 : Bass */
      {name:"Acoustic Bass"},           {name:"Electric Bass (finger)"},
      {name:"Electric Bass (pick)"},    {name:"Fretless Bass"},
      {name:"Slap Bass 1"},             {name:"Slap Bass 2"},
      {name:"Synth Bass 1"},            {name:"Synth Bass 2"},
/* 41-48 : Strings */
      {name:"Violin"},                  {name:"Viola"},
      {name:"Cello"},                   {name:"Contrabass"},
      {name:"Tremolo Strings"},         {name:"Pizzicato Strings"},
      {name:"Orchestral Harp"},         {name:"Timpani"},
/* 49-56 : Ensamble */
      {name:"String Ensemble 1"},       {name:"String Ensemble 2"},
      {name:"SynthStrings 1"},          {name:"SynthStrings 2"},
      {name:"Choir Aahs"},              {name:"Voice Oohs"},
      {name:"Synth Voice"},             {name:"Orchestra Hit"},
/* 57-64 : Brass */
      {name:"Trumpet"},                 {name:"Trombone"},
      {name:"Tuba"},                    {name:"Muted Trumpet"},
      {name:"French Horn"},             {name:"Brass Section"},
      {name:"SynthBrass 1"},            {name:"SynthBrass 2"},
/* 65-72 : Reed */
      {name:"Soprano Sax"},             {name:"Alto Sax"},
      {name:"Tenor Sax"},               {name:"Baritone Sax"},
      {name:"Oboe"},                    {name:"English Horn"},
      {name:"Bassoon"},                 {name:"Clarinet"},
/* 73-80 : Pipe */
      {name:"Piccolo"},                 {name:"Flute"},
      {name:"Recorder"},                {name:"Pan Flute"},
      {name:"Blown Bottle"},            {name:"Shakuhachi"},
      {name:"Whistle"},                 {name:"Ocarina"},
/* 81-88 : SynthLead */
      {name:"Lead 1 (square)"},         {name:"Lead 2 (sawtooth)"},
      {name:"Lead 3 (calliope)"},       {name:"Lead 4 (chiff)"},
      {name:"Lead 5 (charang)"},        {name:"Lead 6 (voice)"},
      {name:"Lead 7 (fifths)"},         {name:"Lead 8 (bass + lead)"},
/* 89-96 : SynthPad */
      {name:"Pad 1 (new age)"},         {name:"Pad 2 (warm)"},
      {name:"Pad 3 (polysynth)"},       {name:"Pad 4 (choir)"},
      {name:"Pad 5 (bowed)"},           {name:"Pad 6 (metallic)"},
      {name:"Pad 7 (halo)"},            {name:"Pad 8 (sweep)"},
/* 97-104 : FX */
      {name:"FX 1 (rain)"},             {name:"FX 2 (soundtrack)"},
      {name:"FX 3 (crystal)"},          {name:"FX 4 (atmosphere)"},
      {name:"FX 5 (brightness)"},       {name:"FX 6 (goblins)"},
      {name:"FX 7 (echoes)"},           {name:"FX 8 (sci-fi)"},
/* 105-112 : Ethnic */
      {name:"Sitar"},                   {name:"Banjo"},
      {name:"Shamisen"},                {name:"Koto"},
      {name:"Kalimba"},                 {name:"Bag pipe"},
      {name:"Fiddle"},                  {name:"Shanai"},
/* 113-120 : Percussive */
      {name:"Tinkle Bell"},             {name:"Agogo"},
      {name:"Steel Drums"},             {name:"Woodblock"},
      {name:"Taiko Drum"},              {name:"Melodic Tom"},
      {name:"Synth Drum"},              {name:"Reverse Cymbal"},
/* 121-128 : SE */
      {name:"Guitar Fret Noise"},       {name:"Breath Noise"},
      {name:"Seashore"},                {name:"Bird Tweet"},
      {name:"Telephone Ring"},          {name:"Helicopter"},
      {name:"Applause"},                {name:"Gunshot"},
    ],
    drummap:[
// 35
      {name:"Acoustic Bass Drum"},      {name:"Bass Drum 1"},      {name:"Side Stick"},              {name:"Acoustic Snare"},
      {name:"Hand Clap"},               {name:"Electric Snare"},   {name:"Low Floor Tom"},           {name:"Closed Hi Hat"},
      {name:"High Floor Tom"},          {name:"Pedal Hi-Hat"},     {name:"Low Tom"},                 {name:"Open Hi-Hat"},
      {name:"Low-Mid Tom"},             {name:"Hi-Mid Tom"},       {name:"Crash Cymbal 1"},          {name:"High Tom"},
      {name:"Ride Cymbal 1"},           {name:"Chinese Cymbal"},   {name:"Ride Bell"},               {name:"Tambourine"},
      {name:"Splash Cymbal"},           {name:"Cowbell"},          {name:"Crash Cymbal 2"},          {name:"Vibraslap"},
      {name:"Ride Cymbal 2"},           {name:"Hi Bongo"},         {name:"Low Bongo"},               {name:"Mute Hi Conga"},
      {name:"Open Hi Conga"},           {name:"Low Conga"},        {name:"High Timbale"},            {name:"Low Timbale"},
      {name:"High Agogo"},              {name:"Low Agogo"},        {name:"Cabasa"},                  {name:"Maracas"},
      {name:"Short Whistle"},           {name:"Long Whistle"},     {name:"Short Guiro"},             {name:"Long Guiro"},
      {name:"Claves"},                  {name:"Hi Wood Block"},    {name:"Low Wood Block"},          {name:"Mute Cuica"},
      {name:"Open Cuica"},              {name:"Mute Triangle"},    {name:"Open Triangle"},
    ],
    program1:[
      // 1-8 : Piano
      [{w:"sine",v:.4,d:0.7,r:0.1,},{w:"triangle",v:3,d:0.7,s:0.1,g:1,a:0.01,k:-1.2}],
      [{w:"triangle",v:0.4,d:0.7,r:0.1,},{w:"triangle",v:4,t:3,d:0.4,s:0.1,g:1,k:-1,a:0.01,}],
      [{w:"sine",d:0.7,r:0.1,},{w:"triangle",v:4,f:2,d:0.5,s:0.5,g:1,k:-1}],
      [{w:"sine",d:0.7,v:0.2,},{w:"triangle",v:4,t:3,f:2,d:0.3,g:1,k:-1,a:0.01,s:0.5,}],
      [{w:"sine",v:0.35,d:0.7,},{w:"sine",v:3,t:7,f:1,d:1,s:1,g:1,k:-.7}],
      [{w:"sine",v:0.35,d:0.7,},{w:"sine",v:11,t:7,f:1,d:0.5,s:1,g:1,k:-.7}],
      [{w:"sawtooth",v:0.34,d:2,},{w:"sine",v:8,f:0.1,d:2,s:1,r:2,g:1,}],
      [{w:"triangle",v:0.34,d:1.5,},{w:"square",v:6,f:0.1,d:1.5,s:0.5,r:2,g:1,}],
      /* 9-16 : Chromatic Perc*/
      [{w:"sine",d:0.3,r:0.3,},{w:"sine",v:7,t:11,d:0.03,g:1,}],
      [{w:"sine",d:0.3,r:0.3,},{w:"sine",v:11,t:6,d:0.2,s:0.4,g:1,}],
      [{w:"sine",v:0.2,d:0.3,r:0.3,},{w:"sine",v:11,t:5,d:0.1,s:0.4,g:1,}],
      [{w:"sine",v:0.2,d:0.6,r:0.6,},{w:"triangle",v:11,t:5,f:1,s:0.5,g:1,}],
      [{w:"sine",v:0.3,d:0.2,r:0.2,},{w:"sine",v:6,t:5,d:0.02,g:1,}],
      [{w:"sine",v:0.3,d:0.2,r:0.2,},{w:"sine",v:7,t:11,d:0.03,g:1,}],
      [{w:"sine",v:0.2,d:1,r:1,},{w:"sine",v:11,t:3.5,d:1,r:1,g:1,}],
      [{w:"triangle",v:0.2,d:0.5,r:0.2,},{w:"sine",v:6,t:2.5,d:0.2,s:0.1,r:0.2,g:1,}],
      /* 17-24 : Organ */
      [{w:"w9999",v:0.3,s:0.9,},{w:"w9999",v:0.3,t:2,f:2,s:0.9,}],//[{w:"sine",v:0.3,s:0.9,},{w:"sine",v:0.3,t:4,f:2,s:0.9,}],
      [{w:"w9999",v:0.2,s:1,},{w:"sine",v:11,t:6,f:2,s:0.1,g:1,h:0.006,r:0.002,d:0.002,},{w:"w9999",v:0.2,t:2,f:1,h:0,s:1,}],
      [{w:"w9999",v:0.27,d:0.1,s:0.9,},{w:"w9999",v:0.3,t:4,f:2,s:0.5,}],//[{w:"triangle",v:0.3,d:11,},{w:"triangle",v:15,t:3,f:1.5,s:0.2,g:1,}],
      [{w:"w9999",v:0.3,a:0.04,s:0.9,},{w:"w9999",v:0.2,t:8,f:2,a:0.04,s:0.9,}],//[{w:"sine",v:0.3,a:0.02,s:0.9,},{w:"sine",v:5,t:5,f:1.5,a:0.02,s:0.9,g:1,}],
      [{w:"sine",v:0.2,a:0.02,d:0.05,s:1,},{w:"sine",v:6,t:3,f:1,a:0.02,d:0.05,s:1,g:1,}],
      [{w:"triangle",v:0.2,a:0.02,d:0.05,s:0.8,},{w:"square",v:7,t:3,f:1,d:0.05,s:1.5,g:1,}],
      [{w:"square",v:0.2,a:0.02,d:0.2,s:0.5,},{w:"square",v:1,d:0.03,s:2,g:1,}],
      [{w:"square",v:0.2,a:0.02,d:0.1,s:0.8,},{w:"square",v:1,a:0.3,d:0.1,s:2,g:1,}],
      /* 25-32 : Guitar */
      [{w:"triangle",v:0.3,d:0.5,},{w:"triangle",v:5,t:3,f:1.5,d:1,s:0.1,g:1,}],
      [{w:"triangle",v:0.4,d:0.6,},{w:"triangle",v:8,t:1.001,d:1,s:1,g:1,}],
      [{w:"triangle",v:0.3,d:1,},{w:"triangle",v:6,f:2,d:0.4,s:0.5,g:1,}],
      [{w:"sine",v:0.3,d:1,},{w:"triangle",v:6,f:1,d:0.4,s:0.5,g:1,}],
      [{w:"sine",v:0.4,d:0.1,},{w:"sine",v:7,g:1,}],
      [{w:"triangle",v:0.3,d:1,},{w:"square",v:7,f:2,d:0.3,s:0.5,g:1,}],
      [{w:"triangle",v:0.4,d:1,},{w:"square",v:4,f:2,d:1,s:0.7,g:1,}],
      [{w:"sine",v:0.2,t:1.5,a:0.005,h:0.2,d:0.6,},{w:"sine",v:11,t:5,f:2,d:1,s:0.5,g:1,}],
      /* 33-40 : Bass */
      [{w:"sine",d:0.3,},{w:"sine",v:4,t:3,d:1,s:1,g:1,}],
      [{w:"sine",d:0.3,},{w:"sine",v:4,t:3,d:1,s:1,g:1,}],
      [{w:"w9999",d:0.3,v:0.7,s:0.5,},{w:"sawtooth",v:1.2,d:0.02,s:0.5,g:1,h:0,r:0.02,}],//[{w:"sine",d:0.3,},{w:"sine",v:11,t:3,d:0.05,s:0.5,g:1,}],
      [{w:"sine",d:0.3,},{w:"sine",v:4,t:3,d:1,s:1,g:1,}],
      [{w:"triangle",v:0.3,t:2,d:1,},{w:"triangle",v:15,t:2.5,d:0.04,s:0.1,g:1,}],
      [{w:"triangle",v:0.3,t:2,d:1,},{w:"triangle",v:15,t:2.5,d:0.04,s:0.1,g:1,}],
      [{w:"triangle",d:0.7,},{w:"square",v:0.4,t:0.5,f:1,d:0.2,s:10,g:1,}],
      [{w:"triangle",d:0.7,},{w:"square",v:0.4,t:0.5,f:1,d:0.2,s:10,g:1,}],
      /* 41-48 : Strings */
      [{w:"sawtooth",v:0.4,a:0.1,d:11,},{w:"sine",v:5,d:11,s:0.2,g:1,}],
      [{w:"sawtooth",v:0.4,a:0.1,d:11,},{w:"sine",v:5,d:11,s:0.2,g:1,}],
      [{w:"sawtooth",v:0.4,a:0.1,d:11,},{w:"sine",v:5,t:0.5,d:11,s:0.2,g:1,}],
      [{w:"sawtooth",v:0.4,a:0.1,d:11,},{w:"sine",v:5,t:0.5,d:11,s:0.2,g:1,}],
      [{w:"sine",v:0.4,a:0.1,d:11,},{w:"sine",v:6,f:2.5,d:0.05,s:1.1,g:1,}],
      [{w:"sine",v:0.3,d:0.1,r:0.1,},{w:"square",v:4,t:3,d:1,s:0.2,g:1,}],
      [{w:"sine",v:0.3,d:0.5,r:0.5,},{w:"sine",v:7,t:2,f:2,d:1,r:1,g:1,}],
      [{w:"triangle",v:0.6,h:0.03,d:0.1,r:0.1,p:0.8,},{w:"sine",v:4,t:3,d:0.08,r:0.08,p:0.8,g:1,}],
      /* 49-56 : Ensamble */
      [{w:"sawtooth",v:0.3,a:0.03,s:0.5,},{w:"sawtooth",v:0.2,t:2,f:2,d:1,s:2,}],
      [{w:"sawtooth",v:0.3,f:-2,a:0.03,s:0.5,},{w:"sawtooth",v:0.2,t:2,f:2,d:1,s:2,}],
      [{w:"sawtooth",v:0.2,a:0.02,s:1,},{w:"sawtooth",v:0.2,t:2,f:2,a:1,d:1,s:1,}],
      [{w:"sawtooth",v:0.2,a:0.02,s:1,},{w:"sawtooth",v:0.2,f:2,a:0.02,d:1,s:1,}],
      [{w:"triangle",v:0.3,a:0.03,s:1,},{w:"sine",v:3,t:5,f:1,d:1,s:1,g:1,}],
      [{w:"sine",v:0.4,a:0.03,s:0.9,},{w:"sine",v:1,t:2,f:3,d:0.03,s:0.2,g:1,}],
      [{w:"triangle",v:0.6,a:0.05,s:0.5,},{w:"sine",v:1,f:0.8,d:0.2,s:0.2,g:1,}],
      [{w:"square",v:0.15,a:0.01,d:0.2,r:0.2,t:0.5,h:0.03,},{w:"square",v:4,f:0.5,d:0.2,r:11,a:0.01,g:1,h:0.02,},{w:"square",v:0.15,t:4,f:1,a:0.02,d:0.15,r:0.15,h:0.03,},{g:3,w:"square",v:4,f:-0.5,a:0.01,h:0.02,d:0.15,s:0,r:11,p:1,k:0,}],
      /* 57-64 : Brass */
      [{w:"square",v:0.2,a:0.01,d:1,s:0.6,r:0.04,},{w:"sine",v:1,d:0.1,s:4,g:1,}],
      [{w:"square",v:0.2,a:0.02,d:1,s:0.5,r:0.08,},{w:"sine",v:1,d:0.1,s:4,g:1,}],
      [{w:"square",v:0.2,a:0.04,d:1,s:0.4,r:0.08,},{w:"sine",v:1,d:0.1,s:4,g:1,}],
      [{w:"square",v:0.15,a:0.04,s:1,},{w:"sine",v:2,d:0.1,g:1,}],
      [{w:"square",v:0.2,a:0.02,d:1,s:0.5,r:0.08,},{w:"sine",v:1,d:0.1,s:4,g:1,}],
      [{w:"square",v:0.2,a:0.02,d:1,s:0.6,r:0.08,},{w:"sine",v:1,f:0.2,d:0.1,s:4,g:1,}],
      [{w:"square",v:0.2,a:0.02,d:0.5,s:0.7,r:0.08,},{w:"sine",v:1,d:0.1,s:4,g:1,}],
      [{w:"square",v:0.2,a:0.02,d:1,s:0.5,r:0.08,},{w:"sine",v:1,d:0.1,s:4,g:1,}],
      /* 65-72 : Reed */
      [{w:"square",v:0.2,a:0.02,d:2,s:0.6,},{w:"sine",v:2,d:1,g:1,}],
      [{w:"square",v:0.2,a:0.02,d:2,s:0.6,},{w:"sine",v:2,d:1,g:1,}],
      [{w:"square",v:0.2,a:0.02,d:1,s:0.6,},{w:"sine",v:2,d:1,g:1,}],
      [{w:"square",v:0.2,a:0.02,d:1,s:0.6,},{w:"sine",v:2,d:1,g:1,}],
      [{w:"sine",v:0.4,a:0.02,d:0.7,s:0.5,},{w:"square",v:5,t:2,d:0.2,s:0.5,g:1,}],
      [{w:"sine",v:0.3,a:0.05,d:0.2,s:0.8,},{w:"sawtooth",v:6,f:0.1,d:0.1,s:0.3,g:1,}],
      [{w:"sine",v:0.3,a:0.03,d:0.2,s:0.4,},{w:"square",v:7,f:0.2,d:1,s:0.1,g:1,}],
      [{w:"square",v:0.2,a:0.05,d:0.1,s:0.8,},{w:"square",v:4,d:0.1,s:1.1,g:1,}],
      /* 73-80 : Pipe */
      [{w:"sine",a:0.02,d:2,},{w:"sine",v:6,t:2,d:0.04,g:1,}],
      [{w:"sine",v:0.7,a:0.03,d:0.4,s:0.4,},{w:"sine",v:4,t:2,f:0.2,d:0.4,g:1,}],
      [{w:"sine",v:0.7,a:0.02,d:0.4,s:0.6,},{w:"sine",v:3,t:2,d:0.05,s:0.1,g:1,}],
      [{w:"sine",v:0.4,a:0.06,d:0.3,s:0.3,},{w:"sine",v:7,t:2,d:0.2,s:0.2,g:1,}],
      [{w:"sine",a:0.02,d:0.3,s:0.3,},{w:"sawtooth",v:3,t:2,d:0.3,g:1,}],
      [{w:"sine",v:0.4,a:0.02,d:2,s:0.1,},{w:"sawtooth",v:8,t:2,f:1,d:0.5,g:1,}],
      [{w:"sine",v:0.7,a:0.03,d:0.5,s:0.3,},{w:"sine",v:0.003,t:0,f:4,d:0.1,s:0.002,g:1,}],
      [{w:"sine",v:0.7,a:0.02,d:2,},{w:"sine",v:1,t:2,f:1,d:0.02,g:1,}],
      /* 81-88 : SynthLead */
      [{w:"square",v:0.3,d:1,s:0.5,},{w:"square",v:1,f:0.2,d:1,s:0.5,g:1,}],
      [{w:"sawtooth",v:0.3,d:2,s:0.5,},{w:"square",v:2,f:0.1,s:0.5,g:1,}],
      [{w:"triangle",v:0.5,a:0.05,d:2,s:0.6,},{w:"sine",v:4,t:2,g:1,}],
      [{w:"triangle",v:0.3,a:0.01,d:2,s:0.3,},{w:"sine",v:22,t:2,f:1,d:0.03,s:0.2,g:1,}],
      [{w:"sawtooth",v:0.3,d:1,s:0.5,},{w:"sine",v:11,t:11,a:0.2,d:0.05,s:0.3,g:1,}],
      [{w:"sine",v:0.3,a:0.06,d:1,s:0.5,},{w:"sine",v:7,f:1,d:1,s:0.2,g:1,}],
      [{w:"sawtooth",v:0.3,a:0.02,d:0.2,s:0.7,r:0.08,},{w:"sawtooth",v:0.3,t:0.75,f:2,a:0.02,d:0.2,s:0.5,r:0.08,}],
      [{w:"triangle",v:0.3,a:0.01,d:0.7,s:0.5,},{w:"square",v:5,t:0.5,d:0.7,s:0.5,g:1,}],
      /* 89-96 : SynthPad */
      [{w:"triangle",v:0.3,a:0.02,d:0.3,s:0.3,r:0.3,},{w:"square",v:3,t:4,f:1,a:0.02,d:0.1,s:1,g:1,}],
      [{w:"triangle",v:0.3,a:0.05,d:1,s:0.7,r:0.3,},{w:"sawtooth",v:3,t:4,f:1,d:0.3,s:1,g:1,}],
      [{w:"square",v:0.3,a:0.03,d:0.5,s:0.3,r:0.1,},{w:"square",v:4,f:1,a:0.03,d:0.1,g:1,}],
      [{w:"triangle",v:0.3,a:0.08,d:1,s:0.3,r:0.1,},{w:"square",v:3,f:1,d:0.3,s:0.3,g:1,}],
      [{w:"sine",v:0.3,a:0.05,d:1,s:0.3,r:0.1,},{w:"sine",v:0.1,t:2.001,f:1,d:1,s:50,g:1,}],
      [{w:"triangle",v:0.3,a:0.03,d:0.7,s:0.3,r:0.2,},{w:"sine",v:12,t:7,f:1,d:0.5,s:1.7,g:1,}],
      [{w:"sine",v:0.3,a:0.05,d:1,s:0.3,r:0.1,},{w:"sawtooth",v:22,t:6,d:0.06,s:0.3,g:1,}],
      [{w:"triangle",v:0.3,a:0.05,d:11,r:0.3,},{w:"triangle",v:1,d:1,s:8,g:1,}],
      /* 97-104 : FX */
      [{w:"sawtooth",v:0.3,d:4,s:0.8,r:0.1,},{w:"square",v:1,t:2,f:8,a:1,d:1,s:1,r:0.1,g:1,}],
      [{w:"triangle",v:0.3,d:1,s:0.5,},{w:"triangle",v:11,f:1,a:1,d:0.3,s:1,g:1,}],
      [{w:"sine",v:0.3,d:1,s:0.3,},{w:"square",v:22,t:11,d:0.5,s:0.1,g:1,}],
      [{w:"sawtooth",v:0.3,a:0.04,d:1,s:0.8,r:0.1,},{w:"square",v:1,t:0.5,d:1,s:2,g:1,}],
      [{w:"triangle",v:0.3,d:1,s:0.3,},{w:"sine",v:22,t:6,d:0.6,s:0.05,g:1,}],
      [{w:"sine",v:0.6,a:0.1,d:0.05,s:0.4,},{w:"sine",v:5,t:5,f:1,d:0.05,s:0.3,g:1,}],
      [{w:"sine",a:0.1,d:0.05,s:0.4,},{w:"sine",v:5,t:5,f:1,d:0.05,s:0.3,g:1,}],
      [{w:"square",v:0.3,a:0.1,d:0.1,s:0.4,},{w:"square",v:1,f:1,d:0.3,s:0.1,g:1,}],
      /* 105-112 : Ethnic */
      [{w:"sawtooth",v:0.3,d:0.5,r:0.5,},{w:"sawtooth",v:11,t:5,d:0.05,g:1,}],
      [{w:"square",v:0.3,d:0.2,r:0.2,},{w:"square",v:7,t:3,d:0.05,g:1,}],
      [{w:"triangle",d:0.2,r:0.2,},{w:"square",v:9,t:3,d:0.1,r:0.1,g:1,}],
      [{w:"triangle",d:0.3,r:0.3,},{w:"square",v:6,t:3,d:1,r:1,g:1,}],
      [{w:"triangle",v:0.4,d:0.2,r:0.2,},{w:"square",v:22,t:12,d:0.1,r:0.1,g:1,}],
      [{w:"sine",v:0.25,a:0.02,d:0.05,s:0.8,},{w:"square",v:1,t:2,d:0.03,s:11,g:1,}],
      [{w:"sine",v:0.3,a:0.05,d:11,},{w:"square",v:7,t:3,f:1,s:0.7,g:1,}],
      [{w:"square",v:0.3,a:0.05,d:0.1,s:0.8,},{w:"square",v:4,d:0.1,s:1.1,g:1,}],
      /* 113-120 : Percussive */
      [{w:"sine",v:0.4,d:0.3,r:0.3,},{w:"sine",v:7,t:9,d:0.1,r:0.1,g:1,}],
      [{w:"sine",v:0.7,d:0.1,r:0.1,},{w:"sine",v:22,t:7,d:0.05,g:1,}],
      [{w:"sine",v:0.6,d:0.15,r:0.15,},{w:"square",v:11,t:3.2,d:0.1,r:0.1,g:1,}],
      [{w:"sine",v:0.8,d:0.07,r:0.07,},{w:"square",v:11,t:7,r:0.01,g:1,}],
      [{w:"sine",v:0.7,t:0.5,d:0.2,r:0.2,p:0.95,},{w:"square",v:14,t:2,g:1,}],
      [{w:"sine",v:0.7,d:0.1,r:0.1,p:0.9,},{w:"square",v:14,t:2,d:0.005,r:0.005,g:1,}],
      [{w:"square",d:0.15,r:0.15,p:0.5,},{w:"square",v:4,t:5,d:0.001,r:0.001,g:1,}],
      [{w:"n0",v:0.3,a:1,s:1,d:0.15,r:0,t:0.5,}],
      /* 121-128 : SE */
      [{w:"sine",t:0,f:3322,d:0,r:0,p:1.3,v:0.3,h:0.03,},{g:1,w:"square",v:1,t:0,f:52,d:0,r:0,p:2,}],
      [{w:"n0",v:0.2,a:0.05,h:0.02,d:0.02,r:0.02,}],
      [{w:"n0",v:0.3,a:1,d:1,}],
      [{w:"sine",v:0.3,a:0.1,d:1,s:0.5,},{w:"sawtooth",v:6,t:0,f:8,d:1,s:1,r:0.1,g:1,}],
      [{w:"square",v:0.3,t:0.25,d:11,s:1,},{w:"square",v:12,t:0,f:8,d:1,s:1,r:11,g:1,}],
      [{w:"n0",v:0.4,t:0,f:500,a:1,d:11,s:1,r:0.5,},{w:"square",v:2,t:0,f:14,d:1,s:1,r:11,g:1,}],
      [{w:"sine",t:0,f:1221,a:0.2,d:1,r:0.25,s:1,},{g:1,w:"n0",v:3,t:0.5,d:1,s:1,r:1,}],
      [{w:"sine",d:0.4,r:0.4,p:0.1,t:2.5,v:1,},{w:"n0",v:12,t:2,d:1,r:1,g:1,}],
    ],
    program0:[
// 1-8 : Piano
      [{w:"triangle",v:.5,d:.7}],                   [{w:"triangle",v:.5,d:.7}],
      [{w:"triangle",v:.5,d:.7}],                   [{w:"triangle",v:.5,d:.7}],
      [{w:"triangle",v:.5,d:.7}],                   [{w:"triangle",v:.5,d:.7}],
      [{w:"sawtooth",v:.3,d:.7}],                   [{w:"sawtooth",v:.3,d:.7}],
/* 9-16 : Chromatic Perc*/
      [{w:"sine",v:.5,d:.3,r:.3}],                  [{w:"triangle",v:.5,d:.3,r:.3}],
      [{w:"square",v:.2,d:.3,r:.3}],                [{w:"square",v:.2,d:.3,r:.3}],
      [{w:"sine",v:.5,d:.1,r:.1}],                  [{w:"sine",v:.5,d:.1,r:.1}],
      [{w:"square",v:.2,d:1,r:1}],                  [{w:"sawtooth",v:.3,d:.7,r:.7}],
/* 17-24 : Organ */
      [{w:"sine",v:0.5,a:0.01,s:1}],                [{w:"sine",v:0.7,d:0.02,s:0.7}],
      [{w:"square",v:.2,s:1}],                      [{w:"triangle",v:.5,a:.01,s:1}],
      [{w:"square",v:.2,a:.02,s:1}],                [{w:"square",v:0.2,a:0.02,s:1}],
      [{w:"square",v:0.2,a:0.02,s:1}],              [{w:"square",v:.2,a:.05,s:1}],
/* 25-32 : Guitar */
      [{w:"triangle",v:.5,d:.5}],                   [{w:"square",v:.2,d:.6}],
      [{w:"square",v:.2,d:.6}],                     [{w:"triangle",v:.8,d:.6}],
      [{w:"triangle",v:.4,d:.05}],                  [{w:"square",v:.2,d:1}],
      [{w:"square",v:.2,d:1}],                      [{w:"sine",v:.4,d:.6}],
/* 33-40 : Bass */
      [{w:"triangle",v:.7,d:.4}],                   [{w:"triangle",v:.7,d:.7}],
      [{w:"triangle",v:.7,d:.7}],                   [{w:"triangle",v:.7,d:.7}],
      [{w:"square",v:.3,d:.2}],                     [{w:"square",v:.3,d:.2}],
      [{w:"square",v:.3,d:.1,s:.2}],                [{w:"sawtooth",v:.4,d:.1,s:.2}],
/* 41-48 : Strings */
      [{w:"sawtooth",v:.2,a:.02,s:1}],              [{w:"sawtooth",v:.2,a:.02,s:1}],
      [{w:"sawtooth",v:.2,a:.02,s:1}],              [{w:"sawtooth",v:.2,a:.02,s:1}],
      [{w:"sawtooth",v:.2,a:.02,s:1}],              [{w:"sawtooth",v:.3,d:.1}],
      [{w:"sawtooth",v:.3,d:.5,r:.5}],              [{w:"triangle",v:.6,d:.1,r:.1,h:0.03,p:0.8}],
/* 49-56 : Ensamble */
      [{w:"sawtooth",v:.2,a:.02,s:1}],              [{w:"sawtooth",v:.2,a:.02,s:1}],
      [{w:"sawtooth",v:.2,a:.02,s:1}],              [{w:"sawtooth",v:.2,a:.02,s:1}],
      [{w:"triangle",v:.3,a:.03,s:1}],              [{w:"sine",v:.3,a:.03,s:1}],
      [{w:"triangle",v:.3,a:.05,s:1}],              [{w:"sawtooth",v:.5,a:.01,d:.1}],
/* 57-64 : Brass */
      [{w:"square",v:.3,a:.05,d:.2,s:.6}],          [{w:"square",v:.3,a:.05,d:.2,s:.6}],
      [{w:"square",v:.3,a:.05,d:.2,s:.6}],           [{w:"square",v:0.2,a:.05,d:0.01,s:1}],
      [{w:"square",v:.3,a:.05,s:1}],                [{w:"square",v:.3,s:.7}],
      [{w:"square",v:.3,s:.7}],                     [{w:"square",v:.3,s:.7}],
/* 65-72 : Reed */
      [{w:"square",v:.3,a:.02,d:2}],                [{w:"square",v:.3,a:.02,d:2}],
      [{w:"square",v:.3,a:.03,d:2}],                [{w:"square",v:.3,a:.04,d:2}],
      [{w:"square",v:.3,a:.02,d:2}],                [{w:"square",v:.3,a:.05,d:2}],
      [{w:"square",v:.3,a:.03,d:2}],                [{w:"square",v:.3,a:.03,d:2}],
/* 73-80 : Pipe */
      [{w:"sine",v:.7,a:.02,d:2}],                  [{w:"sine",v:.7,a:.02,d:2}],
      [{w:"sine",v:.7,a:.02,d:2}],                  [{w:"sine",v:.7,a:.02,d:2}],
      [{w:"sine",v:.7,a:.02,d:2}],                  [{w:"sine",v:.7,a:.02,d:2}],
      [{w:"sine",v:.7,a:.02,d:2}],                  [{w:"sine",v:.7,a:.02,d:2}],
/* 81-88 : SynthLead */
      [{w:"square",v:.3,s:.7}],                     [{w:"sawtooth",v:.4,s:.7}],
      [{w:"triangle",v:.5,s:.7}],                   [{w:"sawtooth",v:.4,s:.7}],
      [{w:"sawtooth",v:.4,d:12}],                   [{w:"sine",v:.4,a:.06,d:12}],
      [{w:"sawtooth",v:.4,d:12}],                   [{w:"sawtooth",v:.4,d:12}],
/* 89-96 : SynthPad */
      [{w:"sawtooth",v:.3,d:12}],                   [{w:"triangle",v:.5,d:12}],
      [{w:"square",v:.3,d:12}],                     [{w:"triangle",v:.5,a:.08,d:11}],
      [{w:"sawtooth",v:.5,a:.05,d:11}],             [{w:"sawtooth",v:.5,d:11}],
      [{w:"triangle",v:.5,d:11}],                   [{w:"triangle",v:.5,d:11}],
/* 97-104 : FX */
      [{w:"triangle",v:.5,d:11}],                   [{w:"triangle",v:.5,d:11}],
      [{w:"square",v:.3,d:11}],                     [{w:"sawtooth",v:0.5,a:0.04,d:11}],
      [{w:"sawtooth",v:.5,d:11}],                   [{w:"triangle",v:.5,a:.8,d:11}],
      [{w:"triangle",v:.5,d:11}],                   [{w:"square",v:.3,d:11}],
/* 105-112 : Ethnic */
      [{w:"sawtooth",v:.3,d:1,r:1}],                [{w:"sawtooth",v:.5,d:.3}],
      [{w:"sawtooth",v:.5,d:.3,r:.3}],              [{w:"sawtooth",v:.5,d:.3,r:.3}],
      [{w:"square",v:.3,d:.2,r:.2}],                [{w:"square",v:.3,a:.02,d:2}],
      [{w:"sawtooth",v:.2,a:.02,d:.7}],             [{w:"triangle",v:.5,d:1}],
/* 113-120 : Percussive */
      [{w:"sawtooth",v:.3,d:.3,r:.3}],              [{w:"sine",v:.8,d:.1,r:.1}],
      [{w:"square",v:.2,d:.1,r:.1,p:1.05}],         [{w:"sine",v:.8,d:.05,r:.05}],
      [{w:"triangle",v:0.5,d:0.1,r:0.1,p:0.96}],    [{w:"triangle",v:0.5,d:0.1,r:0.1,p:0.97}],
      [{w:"square",v:.3,d:.1,r:.1,p:.1}],           [{w:"n0",v:0.3,a:1,d:0.01,r:0.01,p:1.2}],
/* 121-128 : SE */
      [{w:"triangle",v:0.5,d:0.03,t:0,f:1332,r:0.001,p:1.1}],
      [{w:"n0",v:0.2,t:0.1,d:0.02,a:0.05,h:0.02,r:0.02}],
      [{w:"n0",v:0.3,a:1,t:0.1,d:1}],
      [{w:"sine",v:0.3,a:0.8,d:1,t:0,f:1832}],
      [{w:"triangle",d:0.5,t:0,f:444,s:1,}],
      [{w:"n0",v:0.4,d:1,t:0,f:22,s:1,}],
      [{w:"n0",v:0.5,a:0.2,d:11,t:0,f:44}],
      [{w:"n0",v:0.5,t:0.25,d:0.4,r:0.4}],
    ],
    drummap1:[
/*35*/  [{w:"triangle",t:0,f:66,v:2,d:0.02,h:0.03,p:0.9,r:0.02,},{w:"square",g:1,t:10.1,v:22,r:0.002,h:0,p:0,d:0.002,}],
        [{w:"triangle",t:0,f:66,v:2,d:0.02,h:0.03,p:0.9,r:0.02,},{w:"square",g:1,t:10.1,v:22,r:0.002,h:0,p:0,d:0.002,}],
        [{w:"n0",f:222,p:0,t:0,r:0.01,h:0,}],
        [{w:"sine",f:191,v:0.5,d:0.03,p:0.9,t:0,r:0.03,h:0.03,},{w:"n0",v:1.2,t:0,f:70,h:0.015,r:0.01,p:0,}],
        [{w:"square",f:1150,v:0.34,t:0,r:0.03,h:0.025,d:0.03,p:0.98,},{g:1,w:"n0",t:0,f:44,h:0.05,d:0.1,s:1,r:0.1,}],
/*40*/  [{w:"triangle",f:232,v:1,d:0.06,p:0.7,t:0,r:0.06,},{w:"n0",g:1,t:0,f:1121,v:12,r:0.01,h:0.015,}],
        [{w:"triangle",f:200,v:0.9,d:0.12,h:0.02,p:0.5,t:0,r:0.12,},{g:1,w:"n0",v:5,t:0.4,h:0.015,d:0.005,r:0.005,}],
        [{w:"n1",f:390,v:0.35,r:0.01,t:0,}],
        [{w:"triangle",f:200,v:0.9,d:0.12,h:0.02,p:0.5,t:0,r:0.12,},{g:1,w:"n0",v:5,t:0.5,h:0.015,d:0.005,r:0.005,}],
        [{w:"n1",v:0.35,f:390,r:0.03,t:0,h:0.005,d:0.03,}],
/*45*/  [{w:"triangle",f:250,v:0.9,d:0.12,h:0.02,p:0.5,t:0,r:0.12,},{g:1,w:"n0",v:5,t:0.3,h:0.015,d:0.005,r:0.005,}],
        [{w:"n1",v:0.35,f:390,t:0,d:0.2,r:0.2,},{w:"n0",v:0.3,t:0,c:0,f:440,h:0.005,d:0.05,}],
        [{w:"triangle",f:320,v:0.9,d:0.12,h:0.02,p:0.5,t:0,r:0.12,},{g:1,w:"n0",v:5,t:0.3,h:0.015,d:0.005,r:0.005,}],
        [{w:"triangle",f:360,v:0.9,d:0.12,h:0.02,p:0.5,t:0,r:0.12,},{g:1,w:"n0",v:5,t:0.3,h:0.015,d:0.005,r:0.005,}],
        [{w:"n1",f:1200,d:0.2,r:0.2,h:0.05,t:0,},{w:"n0",t:0,v:1,d:0.1,r:0.1,p:1.2,f:440,}],
/*50*/  [{w:"triangle",f:420,v:0.9,d:0.12,h:0.02,p:0.5,t:0,r:0.12,},{g:1,w:"n0",v:5,t:0.3,h:0.015,d:0.005,r:0.005,}],
        [{w:"n1",f:500,v:0.15,d:0.4,r:0.4,h:0,t:0,},{w:"n0",v:0.1,t:0,r:0.01,f:440,}],
        [{w:"n1",f:800,d:0.2,r:0.2,h:0.05,t:0,p:1.1,},{w:"n0",t:0,v:1,d:0.1,r:0.1,p:2,f:440,}],
        [{w:"sine",f:1651,v:0.15,d:0.2,r:0.2,h:0,t:0,},{w:"sawtooth",g:1,t:1.21,v:7.2,d:0.1,r:11,h:1,},{g:1,w:"n0",v:3.1,t:0.152,d:0.002,r:0.002,}],
        null,
/*55*/  [{w:"n1",f:1200,d:0.2,r:0.2,h:0.05,t:0,},{w:"n0",t:0,v:1,d:0.1,r:0.1,p:1.2,f:440,}],
        null,
        [{w:"n1",f:555,d:0.25,r:0.25,h:0.05,t:0,},{w:"n0",t:0,v:1,d:0.1,r:0.1,f:440,a:0.005,h:0.02,}],
        null,
        [{w:"n1",f:440,v:0.15,d:0.4,r:0.4,h:0,t:0,},{w:"n0",v:0.4,t:0,r:0.01,f:440,}],
/*60*/  null,
        null,
        null,
        null,
        null,
/*65*/  null,
        null,
        null,
        null,
        null,
/*70*/  null,
        null,
        null,
        null,
        null,
/*75*/  null,
        null,
        null,
        null,
        null,
/*80*/  [{w:"sine",f:1720,v:0.3,d:0.02,t:0,r:0.02,},{w:"square",g:1,t:0,f:2876,v:6,d:0.2,s:1,r:0.2,}],
        [{w:"sine",f:1720,v:0.3,d:0.25,t:0,r:0.25,},{w:"square",g:1,t:0,f:2876,v:6,d:0.2,s:1,r:0.2,}],
    ],
    drummap0:[
/*35*/[{w:"triangle",t:0,f:110,v:1,d:0.05,h:0.02,p:0.1,}],
      [{w:"triangle",t:0,f:150,v:0.8,d:0.1,p:0.1,h:0.02,r:0.01,}],
      [{w:"n0",f:392,v:0.5,d:0.01,p:0,t:0,r:0.05}],
      [{w:"n0",f:33,d:0.05,t:0,}],
      [{w:"n0",f:100,v:0.7,d:0.03,t:0,r:0.03,h:0.02,}],
/*40*/[{w:"n0",f:44,v:0.7,d:0.02,p:0.1,t:0,h:0.02,}],
      [{w:"triangle",f:240,v:0.9,d:0.1,h:0.02,p:0.1,t:0,}],
      [{w:"n0",f:440,v:0.2,r:0.01,t:0,}],
      [{w:"triangle",f:270,v:0.9,d:0.1,h:0.02,p:0.1,t:0,}],
      [{w:"n0",f:440,v:0.2,d:0.04,r:0.04,t:0,}],
/*45*/[{w:"triangle",f:300,v:0.9,d:0.1,h:0.02,p:0.1,t:0,}],
      [{w:"n0",f:440,v:0.2,d:0.1,r:0.1,h:0.02,t:0,}],
      [{w:"triangle",f:320,v:0.9,d:0.1,h:0.02,p:0.1,t:0,}],
      [{w:"triangle",f:360,v:0.9,d:0.1,h:0.02,p:0.1,t:0,}],
      [{w:"n0",f:150,v:0.2,d:0.1,r:0.1,h:0.05,t:0,p:0.1,}],
/*50*/[{w:"triangle",f:400,v:0.9,d:0.1,h:0.02,p:0.1,t:0,}],
      [{w:"n0",f:150,v:0.2,d:0.1,r:0.01,h:0.05,t:0,p:0.1}],
      [{w:"n0",f:150,v:0.2,d:0.1,r:0.01,h:0.05,t:0,p:0.1}],
      [{w:"n0",f:440,v:0.3,d:0.1,p:0.9,t:0,r:0.1,}],
      [{w:"n0",f:200,v:0.2,d:0.05,p:0.9,t:0,}],
/*55*/[{w:"n0",f:440,v:0.3,d:0.12,p:0.9,t:0,}],
      [{w:"sine",f:800,v:0.4,d:0.06,t:0,}],
      [{w:"n0",f:150,v:0.2,d:0.1,r:0.01,h:0.05,t:0,p:0.1}],
      [{w:"n0",f:33,v:0.3,d:0.2,p:0.9,t:0,}],
      [{w:"n0",f:300,v:0.3,d:0.14,p:0.9,t:0,}],
/*60*/[{w:"sine",f:200,d:0.06,t:0,}],
      [{w:"sine",f:150,d:0.06,t:0,}],
      [{w:"sine",f:300,t:0,}],
      [{w:"sine",f:300,d:0.06,t:0,}],
      [{w:"sine",f:250,d:0.06,t:0,}],
/*65*/[{w:"square",f:300,v:.3,d:.06,p:.8,t:0,}],
      [{w:"square",f:260,v:.3,d:.06,p:.8,t:0,}],
      [{w:"sine",f:850,v:.5,d:.07,t:0,}],
      [{w:"sine",f:790,v:.5,d:.07,t:0,}],
      [{w:"n0",f:440,v:0.3,a:0.05,t:0,}],
/*70*/[{w:"n0",f:440,v:0.3,a:0.05,t:0,}],
      [{w:"triangle",f:1800,v:0.4,p:0.9,t:0,h:0.03,}],
      [{w:"triangle",f:1800,v:0.3,p:0.9,t:0,h:0.13,}],
      [{w:"n0",f:330,v:0.3,a:0.02,t:0,r:0.01,}],
      [{w:"n0",f:330,v:0.3,a:0.02,t:0,h:0.04,r:0.01,}],
/*75*/[{w:"n0",f:440,v:0.3,t:0,}],
      [{w:"sine",f:800,t:0,}],
      [{w:"sine",f:700,t:0,}],
      [{w:"n0",f:330,v:0.3,t:0,}],
      [{w:"n0",f:330,v:0.3,t:0,h:0.1,r:0.01,p:0.7,}],
/*80*/[{w:"sine",t:0,f:1200,v:0.3,r:0.01,}],
      [{w:"sine",t:0,f:1200,v:0.3,d:0.2,r:0.2,}],

    ],
    toTime:function(ti){
      ti=(ti*4*60/this.song.timebase/this.song.tempo)|0;
      var m=(ti/60)|0;
      var s=ti%60;
      return ("00"+m).substr(-2)+":"+("00"+s).substr(-2);
    },
    ready:function(){
      var i;
      this.pg=[]; this.vol=[]; this.ex=[]; this.bend=[]; this.rpnidx=[]; this.brange=[];
      this.sustain=[]; this.notetab=[];
      this.maxTick=0, this.playTick=0, this.playing=0;
      if(this.$ && this.$["wa-canvas"]){
        this.canvas=this.$["wa-canvas"];
        this.ctx=this.canvas.getContext("2d");
        this.ctx.fillStyle="#000";
        this.ctx.fillRect(0,0,300,32);
        this.pcnt=0;
      }
      this.preroll=0.2;
      this.relcnt=0;
      setInterval(
        function(){
          if(++this.relcnt>=3){
            this.relcnt=0;
            for(var i=this.notetab.length-1;i>=0;--i){
              var nt=this.notetab[i];
              if(this.actx.currentTime>nt.e){
                this.pruneNote(nt);
                this.notetab.splice(i,1);
              }
            }
            if(this.canvas){
              this.ctx.fillStyle="#000";
              this.ctx.fillRect(0,0,300,32);
              var row1=8,row2=20;
              if(this.song)
                row1=4,row2=24;
              else {
                this.ctx.fillStyle="#fff";
                this.ctx.fillText("TinySynth",8,20);
              }
              if(this.graph){
                this.ctx.fillStyle="#800";
                this.ctx.fillRect(80,row1,132,4);
                this.ctx.fillRect(80,row2,132,4);
                this.ctx.fillStyle="#f00";
                for(var i=this.notetab.length-1;i>=0;--i){
                  nt=this.notetab[i];
                  if(!nt.f || nt.ch==9){
                    this.ctx.fillRect(80+nt.n,row1,4,4);
                    this.ctx.fillRect(80+nt.ch*8,row2,6,4);
                  }
                }
              }
              if(this.perfmon){
                this.ctx.fillStyle="#000";
                this.ctx.clearRect(180,30,28,-12);
                this.ctx.fillStyle="#000";
                this.ctx.fillText(this.notetab.length,185,28);
              }
              this.ctx.fillStyle="#fff";
              this.ctx.fillRect(250,15,32,2);
              this.ctx.fillStyle="#fff";
              this.ctx.strokeStyle="#000";
              this.ctx.beginPath();
              this.ctx.arc(250+this.masterVol*32,16,6,0,6.28,0);
              this.ctx.moveTo(220,12); this.ctx.lineTo(224,12); this.ctx.lineTo(230,6);
              this.ctx.lineTo(230,26); this.ctx.lineTo(224,20); this.ctx.lineTo(220,20);
              this.ctx.fill();
              this.ctx.stroke();
              this.ctx.strokeStyle="#fff";
              this.ctx.lineWidth=2;
              this.ctx.beginPath();
              this.ctx.arc(230,16,4,-1,1,false);
              this.ctx.stroke();
              this.ctx.beginPath();
              this.ctx.arc(230,16,8,-1,1,false);
              this.ctx.stroke();
              if(this.masterVol==0){
                this.ctx.strokeStyle="#000";
                this.ctx.lineWidth=4;
                this.ctx.beginPath();
                this.ctx.moveTo(220,7);
                this.ctx.lineTo(238,25);
                this.ctx.stroke();
                this.ctx.strokeStyle="#fff";
                this.ctx.lineWidth=2;
                this.ctx.stroke();
              }
              if(this.song){
                this.ctx.fillStyle="#fff";
                this.ctx.fillRect(4,2,28,28);
                this.ctx.fillRect(80,15,128,2);
                this.ctx.fillStyle="#000";
                if(this.playing){
                  this.ctx.fillRect(12,10,4,12);
                  this.ctx.fillRect(22,10,4,12);
                }
                else{
                  this.ctx.beginPath();
                  this.ctx.moveTo(12,9);
                  this.ctx.lineTo(25,16);
                  this.ctx.lineTo(12,23);
                  this.ctx.fill();
                }
                this.ctx.fillStyle="#fff"
                this.ctx.fillText(this.toTime(this.playTick),38,14);
                this.ctx.fillText(this.toTime(this.maxTick),38,28);
                this.ctx.strokeStyle="#000";
                this.ctx.beginPath();
                this.ctx.arc(80+this.playTick/this.maxTick*128,16,6,0,6.28,0);
                this.ctx.fill();
                this.ctx.stroke();
              }
            }
          }
          if(this.playing && this.song.ev.length>0){
            var e=this.song.ev[this.playIndex];
            while(this.actx.currentTime+this.preroll>this.playTime){
              if(e.m[0]==0xff51){
                this.song.tempo=e.m[1];
                this.tick2Time=4*60/this.song.tempo/this.song.timebase;
              }
              else
                this.send(e.m,this.playTime);
              ++this.playIndex;
              if(this.playIndex>=this.song.ev.length){
                if(this.loop){
                  e=this.song.ev[this.playIndex=0];
                  this.playTick=e.t;
                }
                else{
                  this.playTick=this.maxTick;
                  this.playing=0;
                  break;
                }
              }
              else{
                e=this.song.ev[this.playIndex];
                this.playTime+=(e.t-this.playTick)*this.tick2Time;
                this.playTick=e.t;
              }
            }
          }
        }.bind(this),60);
      if(this.canvas){
        this.canvas.addEventListener("dragover",this.dragOver.bind(this),false);
        this.canvas.addEventListener("drop",this.execDrop.bind(this),false);
        this.canvas.addEventListener("click",this.click.bind(this),false);
        this.canvas.addEventListener("mousedown",this.pointerdown.bind(this),false);
        this.canvas.addEventListener("mousemove",this.pointermove.bind(this),false);
        this.canvas.addEventListener("touchstart",this.pointerdown.bind(this),false);
        this.canvas.addEventListener("touchmove",this.pointermove.bind(this),false);
      }
      console.log("internalcontext:"+this.internalcontext)
      if(this.internalcontext){
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.setAudioContext(new AudioContext());
      }
      for(var i=0;i<16;++i)
        this.pg[i]=0;
      this.isReady=1;
    },
    setMasterVol:function(v){
      if(v!=undefined)
        this.masterVol=v;
      if(this.out)
        this.out.gain.value=this.masterVol;
    },
    setReverbLev:function(v){
      if(v!=undefined)
        this.reverbLev=v;
      var r=parseFloat(this.reverbLev);
      if(this.rev&&!isNaN(r))
        this.rev.gain.value=r*8;
    },
    setLoop:function(f){
      this.loop=f;
    },
    setVoices:function(v){
      this.voices=v;
    },
    getPlayStatus:function(){
      return {play:this.playing, maxTick:this.maxTick, curTick:this.playTick};
    },
    locateMIDI:function(tick){
      var i,p=this.playing;
      this.stopMIDI();
      for(i=0;i<this.song.ev.length && tick>this.song.ev[i].t;++i){
        var m=this.song.ev[i];
        if((m.m[0]&0xf0)==0xc0)
          this.pg[m.m[0]&0x0f]=m.m[1];
        if(m.m[0]==0xff51)
          this.song.tempo=m.m[1];
      }
      this.playIndex=i;
      this.playTick=this.song.ev[i].t;
      if(p)
        this.playMIDI();
    },
    getPos(e){
      var p=e.target.getBoundingClientRect();
      return {x:e.clientX-p.left,y:e.clientY-p.top};
    },
    pointerdown:function(ev){
      var e;
      if(ev.touches)
        e=ev.touches[0];
      else
        e=ev;
      this.downpos=this.getPos(e);
      if(e.touches[0] || (e.buttons&1)){
        if(this.song&&this.downpos.x>=80&&this.downpos.x<=208){
          var p=(this.downpos.x-80)/128*this.maxTick;
          synth.locateMIDI(p);
        }
        if(this.downpos.x>=250&&this.downpos.x<282){
          var p=(this.downpos.x-250)/32;
          synth.setMasterVol(p);
        }
      }
    },
    pointermove:function(e){
      if(e.touches)
        e = e.touches[0];
      if(e.buttons&1){
        var pos=this.getPos(e);
        if(this.song&&pos.x>=80&&pos.x<=208){
          var p=(pos.x-80)/128*this.maxTick;
          synth.locateMIDI(p);
        }
        if(pos.x>=250&&pos.x<282){
          var p=(pos.x-250)/32;
          synth.setMasterVol(p);
        }
      }
    },
    click:function(e){
      var pos=this.getPos(e);
      if(pos.x<40 && this.song){
        if(this.playing)
          this.stopMIDI();
        else if(this.song)
          this.playMIDI();
      }
      if(pos.x>=215&&pos.x<243 && this.downpos.x>=215 && this.downpos.x<243){
        if(this.masterVol>0){
          this.lastMasterVol=this.masterVol;
          this.masterVol=0;
        }
        else
          this.masterVol=this.lastMasterVol;
      }
    },
    dragOver:function(e){
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    execDrop:function(e){
      var f = e.dataTransfer.files;
      if(this.disabledrop==0){
        var reader = new FileReader();
        reader.onload=function(e){
          this.loadMIDI(reader.result);
        }.bind(this);
        reader.readAsArrayBuffer(f[0]);
      }
      e.stopPropagation();
      e.preventDefault();
    },
    getTimbreName:function(m,n){
      if(m==0)
        return this.program[n].name;
      else
        return this.drummap[n-35].name;
    },
    loadMIDIUrl:function(url){
      if(!url)
        return;
      var xhr=new XMLHttpRequest();
      xhr.open("GET",url,true);
      xhr.responseType="arraybuffer";
      xhr.loadMIDI=this.loadMIDI.bind(this);
      xhr.onload=function(e){
        if(this.status==200){
          this.loadMIDI(this.response);
        }
      };
      xhr.send();
    },
    reset:function(){
      for(var i=0;i<16;++i){
        this.send([0xb0+i,120,0],0);
        this.send([0xb0+i,121,0],0);
      }
    },
    stopMIDI:function(){
      this.playing=0;
      this.reset();
      this.releaseAllNote();
    },
    playMIDI:function(){
      if(!this.song)
        return;
      var dummy=this.actx.createOscillator();
      dummy.connect(this.actx.destination);
      dummy.frequency.value=0;
      dummy.start(0);
      dummy.stop(this.actx.currentTime+0.001);
      if(this.playTick>=this.maxTick)
        this.playTick=0,this.playIndex=0;
      this.playTime=this.actx.currentTime+.1;
      this.tick2Time=4*60/this.song.tempo/this.song.timebase;
      this.playing=1;
    },
    loadMIDI:function(data){
      function Get2(s, i) { return (s[i]<<8) + s[i+1]; }
      function Get3(s, i) { return (s[i]<<16) + (s[i+1]<<8) + s[i+2]; }
      function Get4(s, i) { return (s[i]<<24) + (s[i+1]<<16) + (s[i+2]<<8) + s[i+3]; }
      function GetStr(s, i, len) {
        return String.fromCharCode.apply(null,s.slice(i,i+len));
      }
      function Delta(s, i) {
        var v, d;
        v = 0;
        datalen = 1;
        while((d = s[i]) & 0x80) {
          v = (v<<7) + (d&0x7f);
          ++datalen;
          ++i;
        }
        return (v<<7)+d;
      }
      function Msg(song,tick,s,i){
        var v=s[i];
        datalen=1;
        if((v&0x80)==0)
          v=runst,datalen=0;
        runst=v;
        switch(v&0xf0){
        case 0xc0: case 0xd0:
          song.ev.push({t:tick,m:[v,s[i+datalen]]});
          datalen+=1;
          break;
        case 0xf0:
          switch(v) {
          case 0xff:
            var len = Delta(s, i + 2);
            datastart = 2+datalen;
            datalen = len+datalen+2;
            switch(s[i+1]) {
            case 0x02: song.copyright+=GetStr(s, i + datastart, datalen - 3); break;
            case 0x01: case 0x03: case 0x04: case 0x09:
              song.text=GetStr(s, i + datastart, datalen - datastart);
              break;
            case 0x2f:
              return 1;
            case 0x51:
              var val = Math.floor(60000000 / Get3(s, i + 3));
              song.ev.push({t:tick, m:[0xff51, val]});
              break;
            }
            break;
          }
          break;
        default:
          song.ev.push({t:tick,m:[v,s[i+datalen],s[i+datalen+1]]});
          datalen+=2;
        }
        return 0;
      }
      this.stopMIDI();
      var s=new Uint8Array(data);
      var datalen = 0, datastart = 0, runst = 0x90;
      var idx = 0;
      var hd = s.slice(0,  4);
      if(hd.toString()!="77,84,104,100")  //MThd
        return;
      var len = Get4(s, 4);
      var fmt = Get2(s, 8);
      var numtrk = Get2(s, 10);
      this.maxTick=0;
      var tb = Get2(s, 12)*4;
      idx = (len + 8);
      this.song={copyright:"",text:"",tempo:120,timebase:tb,ev:[]};
      for(tr=0;tr<numtrk;++tr){
        hd=s.slice(idx, idx+4);
        len=Get4(s, idx+4);
        if(hd.toString()=="77,84,114,107") {//MTrk
          var tick = 0;
          var j = 0;
          this.notetab.length = 0;
          for(;;) {
            tick += Delta(s, idx + 8 + j);
            j += datalen;
            var e = Msg(this.song, tick, s, idx + 8 + j);
            j += datalen;
            if(e)
              break;
          }
          if(tick>this.maxTick)
            this.maxTick=tick;
        }
        idx += (len+8);
      }
      this.song.ev.sort(function(x,y){return x.t-y.t});
      this.reset();
      this.locateMIDI(0);
    },
    setQuality:function(q){
      var i,k,n,p;
      var defp={g:0,w:"sine",t:1,f:0,v:0.5,a:0,h:0.01,d:0.01,s:0,r:0.05,p:1,k:0};
      function filldef(p){
        for(n=0;n<p.length;++n){
          for(k in defp){
            if(!p[n].hasOwnProperty(k) || typeof(p[n][k])=="undefined")
              p[n][k]=defp[k];
          }
        }
        return p;
      }
      if(q!=undefined)
        this.quality=q;
      for(i=0;i<128;++i)
        this.program[i].p=filldef(this.program0[i]);
      for(i=0;i<this.drummap0.length;++i)
        this.drummap[i].p=filldef(this.drummap0[i]);
      if(this.quality){
        for(i=0;i<this.program1.length;++i)
          this.program[i].p=filldef(this.program1[i]);
        for(i=0;i<this.drummap.length;++i){
          if(this.drummap1[i])
            this.drummap[i].p=filldef(this.drummap1[i]);
        }
      }
    },
    pruneNote:function(nt){
      for(var k=nt.o.length-1;k>=0;--k){
          try{this.chmod[nt.ch].disconnect(nt.o[k].detune);}catch(e){}
          nt.o[k].disconnect();
          if(nt.o[k].frequency)
            nt.o[k].frequency.cancelScheduledValues(0);
          else
            nt.o[k].playbackRate.cancelScheduledValues(0);
          nt.o[k].stop(0);
      }
      for(var k=nt.g.length-1;k>=0;--k){
        nt.g[k].disconnect();
        nt.g[k].gain.cancelScheduledValues(0);
      }
    },
    limitVoices:function(ch,n){
      this.notetab.sort(function(n1,n2){
        if(n1.f!=n2.f) return n1.f?1:-1;
        if(n1.e!=n2.e) return n2.e-n1.e;
        return n2.t-n1.t;
      });
      for(var i=this.notetab.length-1;i>=0;--i){
        var nt=this.notetab[i];
        if(this.actx.currentTime>nt.e
           || (nt.ch==ch&&nt.n==n&&nt.f) || i>=(this.voices-1)){
          this.pruneNote(nt);
          this.notetab.splice(i,1);
        }
      }
    },
    note:function(t,ch,n,v,p){  /* note trigger */
      var o=[],g=[],vp=[],fp=[],r=[];
      var f=440*Math.pow(2,(n-69)/12);
      var i,out,sc;
      this.limitVoices(ch,n);
      for(i=0;i<p.length;++i){
        pn=p[i];
        var dt=t+pn.a+pn.h;
        if(pn.g==0)
          out=this.chvol[ch], sc=v*v/16384, fp[i]=f*pn.t+pn.f;
        else
          out=(o[pn.g-1].frequency?o[pn.g-1].frequency:o[pn.g-1].playbackRate), sc=fp[pn.g-1], fp[i]=fp[pn.g-1]*pn.t+pn.f;
        switch(pn.w[0]){
        case "n":
          o[i]=this.actx.createBufferSource();
          o[i].buffer=this.noiseBuf[pn.w];
          o[i].loop=true;
          o[i].playbackRate.value=fp[i]/440;
          if(pn.p!=1)
            this.setParamTarget(o[i].playbackRate,fp[i]/440*pn.p,dt,pn.d);
          break;
        default:
          o[i]=this.actx.createOscillator();
          o[i].frequency.value=fp[i];
          if(pn.p!=1)
            this.setParamTarget(o[i].frequency,fp[i]*pn.p,dt,pn.d);
          if(pn.w[0]=="w")
            o[i].setPeriodicWave(this.wave[pn.w]);
          else
            o[i].type=pn.w;
          this.chmod[ch].connect(o[i].detune);
          o[i].detune.value=this.bend[ch];
          break;
        }
        g[i]=this.actx.createGain();
        r[i]=pn.r;
        o[i].connect(g[i]); g[i].connect(out);
        vp[i]=sc*pn.v;
        if(pn.k)
          vp[i]*=Math.pow(2,(n-60)/12*pn.k);
        if(pn.a){
          g[i].gain.value=0;
          g[i].gain.setValueAtTime(0,t);
          g[i].gain.linearRampToValueAtTime(vp[i],t+pn.a);
        }
        else
          g[i].gain.setValueAtTime(vp[i],t);
        this.setParamTarget(g[i].gain,pn.s*vp[i],dt,pn.d);
        o[i].start(t);
      }
      this.notetab.push({t:t,e:ch==9?t+p[0].d*10:99999,ch:ch,n:n,o:o,g:g,t2:t+pn.a,v:vp,r:r,f:ch==9?1:0});
    },
    setParamTarget:function(p,v,t,d){
      if(d!=0)
        p.setTargetAtTime(v,t,d);
      else
        p.setValueAtTime(v,t);
    },
    releaseAllNote:function(){
      t=this.actx.currentTime+.1;
      for(var i=this.notetab.length-1;i>=0;--i){
        var nt=this.notetab[i];
        for(var k=nt.g.length-1;k>=0;--k){
          nt.g[k].gain.cancelScheduledValues(t);
          nt.g[k].gain.setValueAtTime(0,t);
        }
        nt.f=1;
        nt.e=t;
      }
    },
    releaseNote:function(nt,t){
      for(var k=nt.g.length-1;k>=0;--k){
        nt.g[k].gain.cancelScheduledValues(t);
        if(t==nt.t2)
          nt.g[k].gain.setValueAtTime(nt.v[k],t);
        else if(t<nt.t2)
          nt.g[k].gain.setValueAtTime(nt.v[k]*(t-nt.t)/(nt.t2-nt.t),t);
        this.setParamTarget(nt.g[k].gain,0,t,nt.r[k]);
      }
      nt.e=t+nt.r[0]*10;
      nt.f=1;
    },
    sustainState:function(ch,v,t){
      this.sustain[ch]=v;
      if(v<64){
        for(var i=this.notetab.length-1;i>=0;--i){
          var nt=this.notetab[i];
          if(t>=nt.t && nt.ch==ch && nt.f==1)
            this.releaseNote(nt,t);
        }
      }
    },
    allSoundOff:function(){
      for(var i=this.notetab.length-1;i>=0;--i){
        var nt=this.notetab[i];
        this.pruneNote(nt);
        this.notetab.splice(i,1);
      }
    },
    resetAllController:function(ch){
      this.bend[ch]=0; this.vol[ch]=100/127*100/127; this.ex[ch]=1.0;
      this.brange[ch]=2<<7; this.rpnidx[ch]=0x3fff; this.sustain[ch]=0;
      this.chvol[ch].gain.value=this.vol[ch]*this.ex[ch];
      this.chmod[ch].gain.value=0;
      if(this.chpan[ch])
       this.chpan[ch].pan.value=0;
    },
    send:function(msg,t,tsmode){    /* send midi message */
      var i;
      if(t==undefined||t<=0){
        t=0;
        if(this.actx)
          t=this.actx.currentTime;
      }
      else{
        if(tsmode==undefined)
          tsmode=this.tsmode;
        if(tsmode)
          t=t*.001-this.tsdiff;
      }
      var ch=msg[0]&0xf;
      var cmd=msg[0]&~0xf;
      if(cmd<0x80||cmd>=0x100)
        return;
      if(cmd==0x90 && msg[2]==0)
        cmd=0x80;
      switch(cmd){
      case 0xb0:  /* ctl change */
        switch(msg[1]){
        case 1: /* modulation */
          this.chmod[ch].gain.setValueAtTime(msg[2]*100/127,t);
          break;
        case 7: /* ch vol */
          this.vol[ch]=msg[2]*msg[2]/(127*127);
          this.chvol[ch].gain.setValueAtTime(this.vol[ch]*this.ex[ch],t);
          break;
        case 10: /* pan */
          if(this.chpan[ch])
            this.chpan[ch].pan.setValueAtTime((msg[2]-64)/64,t);
          break;
        case 11: /* expression */
          this.ex[ch]=msg[2]*msg[2]/(127*127);
          this.chvol[ch].gain.setValueAtTime(this.vol[ch]*this.ex[ch],t);
          break;
        case 64: /* sustain */
          this.sustainState(ch,msg[2],t);
          break;
        case 98:  case 98: /* nrpn lsb/msb */
          this.rpnidx[ch]=0x3fff;
          break;
        case 100: /* rpn lsb */
          this.rpnidx[ch]=(this.rpnidx[ch]&0x380)|msg[2];
          break;
        case 101: /* rpn msb */
          this.rpnidx[ch]=(this.rpnidx[ch]&0x7f)|(msg[2]<<7);
          break;
        case 6:  /* data entry msb */
          if(this.rpnidx[ch]==0)
            this.brange[ch]=(msg[2]<<7)+(this.brange[ch]&0x7f);
          break;
        case 38:  /* data entry lsb */
          if(this.rpnidx[ch]==0)
            this.brange[ch]=(this.brange[ch]&0x380)|msg[2];
          break;
        case 120:  /* all sound off */
        case 123:  /* all notes off */
        case 124: case 125: case 126: case 127: /* omni off/on mon/poly */
          this.allSoundOff();
          break;
        case 121:  /* reset all controller */
          for(var i=0;i<16;++i)
            this.resetAllController(i);
          break;
        }
        break;
      case 0xc0:  /* prg change */
        this.pg[ch]=msg[1];
        break;
      case 0xe0:  /* pitch bend */
        var br=this.brange[ch]*100/127;
        this.bend[ch]=(msg[1]+(msg[2]<<7)-8192)*br/8192;
        for(var i=this.notetab.length-1;i>=0;--i){
          var nt=this.notetab[i];
          if(nt.ch==ch){
            for(var k=nt.o.length-1;k>=0;--k)
              nt.o[k].detune.setValueAtTime(this.bend[ch],t);
          }
        }
        break;
      case 0x90:  /* note on */
//        if(this.canvas){
//          this.ctx.fillStyle="#f00";
//          this.ctx.globalCompositeOperation="lighter";
//          this.ctx.fillRect(240,62-ch*4,10,3);
//        }
        if(ch==9){
          if(msg[1]>=35&&msg[1]<=81)
            this.note(t,ch,msg[1],msg[2],this.drummap[msg[1]-35].p);
        }
        else
          this.note(t,ch,msg[1],msg[2],this.program[this.pg[ch]].p);
        break;
      case 0x80:  /* note off */
        for(var i=this.notetab.length-1;i>=0;--i){
          var nt=this.notetab[i];
          if(t>=nt.t && nt.ch==ch && nt.n==msg[1] && nt.f==0){
            nt.f=1;
            if(this.sustain[ch]<64)
              this.releaseNote(nt,t);
          }
        }
        break;
      }
    },
    createWave:function(w){
      var imag=new Float32Array(w.length);
      var real=new Float32Array(w.length);
      for(var i=1;i<w.length;++i)
        imag[i]=w[i];
      this.wave[w]=this.actx.createPeriodicWave(real,imag);
    },
    getAudioContext:function(){
      return this.actx;
    },
    setAudioContext:function(actx,dest){
      this.audioContext=this.actx=actx;
      this.dest=dest;
      if(!dest)
        this.dest=actx.destination;
      this.tsdiff=performance.now()*.001-this.actx.currentTime;
      console.log("TSDiff:"+this.tsdiff);
      this.out=this.actx.createGain();
      this.comp=this.actx.createDynamicsCompressor();
      var blen=this.actx.sampleRate*.5|0;
      this.convBuf=this.actx.createBuffer(2,blen,this.actx.sampleRate);
      this.noiseBuf={};
      this.noiseBuf.n0=this.actx.createBuffer(1,blen,this.actx.sampleRate);
      this.noiseBuf.n1=this.actx.createBuffer(1,blen,this.actx.sampleRate);
      var d1=this.convBuf.getChannelData(0);
      var d2=this.convBuf.getChannelData(1);
      var dn=this.noiseBuf.n0.getChannelData(0);
      var dr=this.noiseBuf.n1.getChannelData(0);
      for(i=0;i<blen;++i){
        if(i/blen<Math.random()){
          d1[i]=Math.exp(-3*i/blen)*(Math.random()-.5);
          d2[i]=Math.exp(-3*i/blen)*(Math.random()-.5);
        }
        dn[i]=Math.random()*2-1;
      }
      for(var jj=0;jj<256;++jj){
        var r=Math.random()*50+1;
        for(i=0;i<blen;++i){
          var dd=Math.sin((i/blen)*2*Math.PI*440*r);
          dr[i]+=dd/16;
        }
      }
      if(this.useReverb){
        this.conv=this.actx.createConvolver();
        this.conv.buffer=this.convBuf;
        this.rev=this.actx.createGain();
        this.rev.gain.value=this.reverbLev;
        this.out.connect(this.conv);
        this.conv.connect(this.rev);
        this.rev.connect(this.comp);
      }
      this.setMasterVol();
      this.out.connect(this.comp);
      this.comp.connect(this.dest);
      this.chvol=[]; this.chmod=[]; this.chpan=[];
      this.wave={};
      this.createWave("w9999");
      this.lfo=this.actx.createOscillator();
      this.lfo.frequency.value=5;
      this.lfo.start(0);
      for(i=0;i<16;++i){
        this.chvol[i]=this.actx.createGain();
        if(this.actx.createStereoPanner){
          this.chpan[i]=this.actx.createStereoPanner();
          this.chvol[i].connect(this.chpan[i]);
          this.chpan[i].connect(this.out);
        }
        else{
          this.chpan[i]=null;
          this.chvol[i].connect(this.out);
        }
        this.chmod[i]=this.actx.createGain();
        this.lfo.connect(this.chmod[i]);
        this.pg[i]=i;
        this.resetAllController(i);
      }
      if(this.graph>=1){
        this.ana=this.actx.createAnalyser();
        this.out.connect(this.ana);
      }
      this.setReverbLev();
      this.send([0x90,60,1]);
      this.send([0x90,60,0]);
    },
  }
/* webaudio-tinysynth coreobject */

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
    this.locateMIDI=function(p){this.sy.locateMIDI(p);};
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
