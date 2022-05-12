const playButton = document.getElementById('play-button');

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const NOTE_B0  =31
const NOTE_C1  =33
const NOTE_CS1 =35
const NOTE_D1  =37
const NOTE_DS1 =39
const NOTE_E1  =41
const NOTE_F1  =44
const NOTE_FS1 =46
const NOTE_G1  =49
const NOTE_GS1 =52
const NOTE_A1  =55
const NOTE_AS1 =58
const NOTE_B1  =62
const NOTE_C2  =65
const NOTE_CS2 =69
const NOTE_D2  =73
const NOTE_DS2 =78
const NOTE_E2  =82
const NOTE_F2  =87
const NOTE_FS2 =93
const NOTE_G2  =98
const NOTE_GS2 =104
const NOTE_A2  =110
const NOTE_AS2 =117
const NOTE_B2  =123
const NOTE_C3  =131
const NOTE_CS3 =139
const NOTE_D3  =147
const NOTE_DS3 =156
const NOTE_E3  =165
const NOTE_F3  =175
const NOTE_FS3 =185
const NOTE_G3  =196
const NOTE_GS3 =208
const NOTE_A3  =220
const NOTE_AS3 =233
const NOTE_B3  =247
const NOTE_C4  =262
const NOTE_CS4 =277
const NOTE_D4  =294
const NOTE_DS4 =311
const NOTE_E4  =330
const NOTE_F4  =349
const NOTE_FS4 =370
const NOTE_G4  =392
const NOTE_GS4 =415
const NOTE_A4  =440
const NOTE_AS4 =466
const NOTE_B4  =494
const NOTE_C5  =523
const NOTE_CS5 =554
const NOTE_D5  =587
const NOTE_DS5 =622
const NOTE_E5  =659
const NOTE_F5  =698
const NOTE_FS5 =740
const NOTE_G5  =784
const NOTE_GS5 =831
const NOTE_A5  =880
const NOTE_AS5 =932
const NOTE_B5  =988
const NOTE_C6  =1047
const NOTE_CS6 =1109
const NOTE_D6  =1175
const NOTE_DS6 =1245
const NOTE_E6  =1319
const NOTE_F6  =1397
const NOTE_FS6 =1480
const NOTE_G6  =1568
const NOTE_GS6 =1661
const NOTE_A6  =1760
const NOTE_AS6 =1865
const NOTE_B6  =1976
const NOTE_C7  =2093
const NOTE_CS7 =2217
const NOTE_D7  =2349
const NOTE_DS7 =2489
const NOTE_E7  =2637
const NOTE_F7  =2794
const NOTE_FS7 =2960
const NOTE_G7  =3136
const NOTE_GS7 =3322
const NOTE_A7  =3520
const NOTE_AS7 =3729
const NOTE_B7  =3951
const NOTE_C8  =4186
const NOTE_CS8 =4435
const NOTE_D8  =4699
const NOTE_DS8 =4978
const REST     =0

const tempo = 144;

const notes = [

  NOTE_AS4,-2,  NOTE_F4,8,  NOTE_F4,8,  NOTE_AS4,8,//1
  NOTE_GS4,16,  NOTE_FS4,16,  NOTE_GS4,-2,
  NOTE_AS4,-2,  NOTE_FS4,8,  NOTE_FS4,8,  NOTE_AS4,8,
  NOTE_A4,16,  NOTE_G4,16,  NOTE_A4,-2,
  REST,1,

  NOTE_AS4,4,  NOTE_F4,-4,  NOTE_AS4,8,  NOTE_AS4,16,  NOTE_C5,16, NOTE_D5,16, NOTE_DS5,16,//7
  NOTE_F5,2,  NOTE_F5,8,  NOTE_F5,8,  NOTE_F5,8,  NOTE_FS5,16, NOTE_GS5,16,
  NOTE_AS5,-2,  NOTE_AS5,8,  NOTE_AS5,8,  NOTE_GS5,8,  NOTE_FS5,16,
  NOTE_GS5,-8,  NOTE_FS5,16,  NOTE_F5,2,  NOTE_F5,4,

  NOTE_DS5,-8, NOTE_F5,16, NOTE_FS5,2, NOTE_F5,8, NOTE_DS5,8, //11
  NOTE_CS5,-8, NOTE_DS5,16, NOTE_F5,2, NOTE_DS5,8, NOTE_CS5,8,
  NOTE_C5,-8, NOTE_D5,16, NOTE_E5,2, NOTE_G5,8,
  NOTE_F5,16, NOTE_F4,16, NOTE_F4,16, NOTE_F4,16,NOTE_F4,16,NOTE_F4,16,NOTE_F4,16,NOTE_F4,16,NOTE_F4,8, NOTE_F4,16,NOTE_F4,8,

  NOTE_AS4,4,  NOTE_F4,-4,  NOTE_AS4,8,  NOTE_AS4,16,  NOTE_C5,16, NOTE_D5,16, NOTE_DS5,16,//15
  NOTE_F5,2,  NOTE_F5,8,  NOTE_F5,8,  NOTE_F5,8,  NOTE_FS5,16, NOTE_GS5,16,
  NOTE_AS5,-2, NOTE_CS6,4,
  NOTE_C6,4, NOTE_A5,2, NOTE_F5,4,
  NOTE_FS5,-2, NOTE_AS5,4,
  NOTE_A5,4, NOTE_F5,2, NOTE_F5,4,

  NOTE_FS5,-2, NOTE_AS5,4,
  NOTE_A5,4, NOTE_F5,2, NOTE_D5,4,
  NOTE_DS5,-2, NOTE_FS5,4,
  NOTE_F5,4, NOTE_CS5,2, NOTE_AS4,4,
  NOTE_C5,-8, NOTE_D5,16, NOTE_E5,2, NOTE_G5,8,
  NOTE_F5,16, NOTE_F4,16, NOTE_F4,16, NOTE_F4,16,NOTE_F4,16,NOTE_F4,16,NOTE_F4,16,NOTE_F4,16,NOTE_F4,8, NOTE_F4,16,NOTE_F4,8
];

const oscillator = audioCtx.createOscillator();
oscillator.type = 'triangle';
oscillator.connect(audioCtx.destination);

const wholenote = (60000 * 4) / tempo;


let i = 0;
function nextNote() {
    const note = notes[i];
    const divider = notes[i + 1];

    // calculates the duration of each note
    let noteDuration;
    if (divider > 0) {
      // regular note, just proceed
      noteDuration = (wholenote) / divider;
    } else if (divider < 0) {
      // dotted notes are represented with negative durations!!
      noteDuration = (wholenote) / Math.abs(divider);
      noteDuration *= 1.5; // increases the duration in half for dotted notes
    }

    oscillator.frequency.setValueAtTime(note, audioCtx.currentTime);
    if (i == 0) {
        oscillator.start();
    }
    if (i == notes.length - 1) {
        oscillator.stop(audioCtx.currentTime);
    }
    i += 2;

    if (i < notes.length) {
        setTimeout(nextNote, noteDuration);
    }
}

playButton.addEventListener('click', () => {
    nextNote();
});
