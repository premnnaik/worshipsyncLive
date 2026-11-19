const fs = require('fs');
const path = require('path');
const { isChordLine } = require('../client/src/utils/musicTransposer');

const songsFilePath = path.join(__dirname, '..', 'server', 'data', 'songs.json');

const newSongs = [
  {
    id: 'song-ninna-krupeyondhe',
    songNumber: '280',
    title: 'Ninna Krupeyondhe Nanage Saku',
    kannadaTitle: 'ನಿನ್ನ ಕೃಪೆಯೊಂದೆ ನನಗೆ ಸಾಕು',
    type: 'Worship',
    tempo: 70,
    styleNumber: '42',
    chords: 'G',
    originalKey: 'G',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G                  C         D
ನಿನ್ನ ಕೃಪೆಯೊಂದೆ ನನಗೆ ಸಾಕು ಯೇಸಯ್ಯ
C               D            G
ನಿನ್ನ ಕೃಪೆಯು ಇರದೆ ನಾ ಹೇಗೆ ಜೀವಿಸಲಿ ||2
G        Em        C   D     G
ಆರಾಧನೆ ಆರಾಧನೆ ಆರಾಧನೆ ನಿನಗೆ -2

G                Bm
1. ಈ ಲೋಕ ಯಾತ್ರೆಯಲ್ಲಿ ಜೊತೆಯಲ್ಲಿ ಇರುವವನೆ
Em             C            D
ಪ್ರತಿ ದಿನವು ಪ್ರತಿ ಕ್ಷಣವು ನನ್ನನ್ನು ಕಾಯುವೆ ||2
G                 D
ಬೆಟ್ಟಗಳು ಸ್ಥಳ ಬಿಟ್ಟವು ಗುಡ್ಡಗಳು ಕದಲಿಯಾವು
Em             C            D
ನಿನ್ನ ಕೃಪೆಯು ಕ್ಷಣ ಕ್ಷಣವು ನನ್ನನ್ನು ಕಾಯ್‌ವದು ||2

G                 Bm
2. ಆಕಾಶಕ್ಕಿಂತ ದೊಡ್ಡದು ಆ ನಿನ್ನ ಕೃಪೆಯು
Em             C           D
ನಿನ್ನ ಶುಭವು ನಿನ್ನ ಕೃಪೆಯು ನನ್ನ ಹಿಂದೆ ಬರುವುದು ||2
G                 D
ಕಷ್ಟಗಳ ನಡುವೆಯೂ ಕೈ ಬಿಡದೆ ನಡೆಸಿದಿ
Em            C          D
ಎಂದೆಂದೂ ನಾ ನಿನ್ನ ನಾಮವ ಸ್ತುತಿಸುವೆ ||2`,
    englishLyrics: `G                  C         D
Ninna krupeyondhe nanage saku Yesayya
C               D            G
Ninna krupeyu irade na hege jivisali ||2
G        Em        C   D     G
Aaradhane Aaradhane Aaradhane ninage -2

G                Bm
1. Ee loka yaatreyalli joteyalli iruvavane
Em             C            D
Prati dinavu prati kshanavu nannannu kaayuve ||2
G                 D
Bettagalu sthala bittavu guddagalu kadaliyavu
Em             C            D
Ninna krupeyu kshana kshanavu nannannu kaayvadu ||2

G                 Bm
2. Aakashakkinta doddadu aa ninna krupeyu
Em             C           D
Ninna shubhavu ninna krupeyu nanna hinde baruvadu ||2
G                 D
Kashtagala naduveyoo kai bidade nadesidi
Em            C          D
Endendoo na ninna naamava sthutisuve ||2`,
    lyricsText: `G                  C         D
ನಿನ್ನ ಕೃಪೆಯೊಂದೆ ನನಗೆ ಸಾಕು ಯೇಸಯ್ಯ
C               D            G
ನಿನ್ನ ಕೃಪೆಯು ಇರದೆ ನಾ ಹೇಗೆ ಜೀವಿಸಲಿ ||2`
  },
  {
    id: 'song-nanna-hattiraviru',
    songNumber: '612',
    title: 'Nanna Hattiraviru O Yeshuve',
    kannadaTitle: 'ನನ್ನ ಹತ್ತಿರವಿರು ಓ ಯೇಸುವೇ',
    type: 'Worship',
    tempo: 68,
    styleNumber: '46',
    chords: 'Em',
    originalKey: 'Em',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Em                    D
ನನ್ನ ಹತ್ತಿರವಿರು ಓ ಯೇಸುವೇ
C        Bm          Em
ನಿನ್ನನು ಬಿಟ್ಟು ಬಾಳಲಾರೆನು ||2
Em            D
ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ
Am       D          Em
ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ||2

Em                   G         D
1. ಕತ್ತಲೆಯ ಸಮಯದಿ ಬೆಳಕಾಗಿರು
Am          C        D         Em
ಮರಣದ ಸಮಯದಿ ಜೀವವಾಗಿರು ||2
Em                   G         D
ಕಣ್ಣೀರಿನ ಸಮಯದಿ ತಾಯಿಯಾಗಿರು
Am          C        D         Em
ಸಾಲದ ಸಮಯದಿ ತಂದೆಯಾಗಿರು ||2

Em                          G         D
2. ನಿನ್ನ ವಾಕ್ಯ ಓದುವ ಸಮಯದಿ ಗುರುವಾಗಿರು
Am           C       D          Em
ಪ್ರಾರ್ಥಿಸುವ ಸಮಯದಿ ದೇವರಾಗಿರು ||2
Em                   G         D
ಬಲಹೀನ ಸಮಯದಿ ಬಲವಾಗಿರು
Am          C         D         Em
ಪ್ರತಿ ದಿನ ಪ್ರತಿ ಕ್ಷಣ ಜೊತೆಯಾಗಿರು ||2`,
    englishLyrics: `Em                    D
Nanna hattiraviru o Yeshuve
C        Bm          Em
Ninnanu bittu baalalaarenu ||2
Em            D
Halleluya Halleluya
Am       D          Em
Halleluya Halleluya ||2

Em                   G         D
1. Kaathaleya samayadi belakaagiru
Am          C        D         Em
Maranada samayadi jeeva vaagiru ||2
Em                   G         D
Kanneerina samayadi thaaiyaagiru
Am          C        D         Em
Saalada samayadi thandeyaagiru ||2

Em                          G         D
2. Ninna vaakya oduva samayadi guruvaagiru
Am           C       D          Em
Praarthisuva samayadi devaraagiru ||2
Em                   G         D
Balaheena samayadi balavaagiru
Am          C         D         Em
Prati dina prati kshana joteyaagiru ||2`,
    lyricsText: `Em                    D
ನನ್ನ ಹತ್ತಿರವಿರು ಓ ಯೇಸುವೇ
C        Bm          Em
ನಿನ್ನನು ಬಿಟ್ಟು ಬಾಳಲಾರೆನು ||2`
  },
  {
    id: 'song-sthothradindale-sthuti',
    songNumber: '340',
    title: 'Sthothradindale Sthuthi Haaduve',
    kannadaTitle: 'ಸ್ತೋತ್ರದಿಂದಲೇ ಸ್ತುತಿ ಹಾಡುವೆ',
    type: 'Praise',
    tempo: 110,
    styleNumber: '85',
    chords: 'C',
    originalKey: 'C',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `C
ಸ್ತೋತ್ರದಿಂದಲೇ ಸ್ತುತಿ ಹಾಡುವೆ
F                    G
ನನ್ನ ಯೇಸು ರಾಜನೆ
C
ನನಗಾಗಿ ಮಾಡಿದ ಉಪಕಾರಕ್ಕೆ
F           G        C
ಎಂದೆಂದೂ ನಾ ವಂದಿಸುವೆ ||2
F            G
ಆರಾಧನೆ ಆರಾಧನೆ ನಿನಗೆ
Am           G        C
ಆರಾಧನೆ ಆರಾಧನೆ ನಿನಗೆ -2

C                             Am
1. ಎಣಿಸಲಾಗದ ಆಶೀರ್ವಾದಗಳ
F                    G
ನನಗೆ ನೀ ನೀಡಿರುವೆ ||2
C                             Am
ಯೋಗ್ಯತೆ ಇಲ್ಲದ ನನಗೆ ಕೃಪೆ
F             G         C
ನೀ ನೀಡಿರುವೆ ಸ್ತೋತ್ರ ||2

C                            Am
2. ಸತ್ಯ ದೇವರೇ ಏಕ ಪುತ್ರನೇ
F                    G
ನಿನ್ನನ್ನೇ ನಾ ನಂಬಿರುವೆ ||2
C                                  Am
ಎಲ್ಲಾ ಕಾಲದಲ್ಲೂ ನಿನ್ನ ಕೃಪೆಯನ್ನೇ
F              G          C
ವರವಾಗಿ ನೀಡೆನಗೆ ||2`,
    englishLyrics: `C
Sthothradindale Sthuthi Haaduve
F                    G
Nanna Yesu Raajane
C
Nanagaagi Maadida Upakaarakke
F           G        C
Endendu Naa Vandisuve ||2
F            G
Aaradhane Aaradhane ninage
Am           G        C
Aaradhane Aaradhane ninage -2

C                             Am
1. Enisalaagadha Aasheervadagala
F                    G
Nanage Nee Neediruve ||2
C                             Am
Yogyathe Illada Nanage Krupe
F             G         C
Nee Neediruve Sthothra ||2

C                            Am
2. Sathya Devare Eka Putrane
F                    G
Ninnanne Naa Nambiruve ||2
C                                  Am
Ella Kaaladallu Ninna Krupeyanne
F              G          C
Varavaagi Needenage ||2`,
    lyricsText: `C
ಸ್ತೋತ್ರದಿಂದಲೇ ಸ್ತುತಿ ಹಾಡುವೆ
F                    G
ನನ್ನ ಯೇಸು ರಾಜನೆ`
  },
  {
    id: 'song-yesuve-ninna-naamave',
    songNumber: '155',
    title: 'Yesuve Ninna Naamave Melethuve',
    kannadaTitle: 'ಯೇಸುವೇ ನಿನ್ನ ನಾಮವೇ ಮೇಲೆತ್ತುವೆ',
    type: 'Praise',
    tempo: 116,
    styleNumber: '82',
    chords: 'G',
    originalKey: 'G',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G                C
ಯೇಸುವೇ ನಿನ್ನ ನಾಮವೇ
D                 G
ಮೇಲೆತ್ತುವೆ ಹಲ್ಲೇಲೂಯಾ
G                C
ನಿನ್ನ ನಾಮ ಮೇಲೆತ್ತುವೆ
D                    G
ಇಂದು ಮಹಿಮೆ ಪಡಿಸುವೆ ||2
G        C        D        G
ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ -2

G                  C
1. ಎಲ್ಲಾ ನಾಮಕ್ಕಿಂತ ಮೇಲಾದ ನಾಮ
D                  G
ಮೊಣಕಾಲುಗಳೆಲ್ಲಾ ಬಾಗುವ ನಾಮ ||2
G                  C
ನಾಲಿಗೆಗಳೆಲ್ಲಾ ಒಪ್ಪುವ ನಾಮ
D                    G
ಯೇಸುವೇ ಕರ್ತನೆಂದು ||2

G                  C
2. ರೋಗವ ನೀಗಿಸುವ ದಿವ್ಯ ನಾಮ
D                  G
ಶತ್ರುವ ಸೋಲಿಸುವ ಶ್ರೇಷ್ಠ ನಾಮ ||2
G                  C
ಪಾಪವ ಕ್ಷಮಿಸುವ ಪಾವನ ನಾಮ
D                    G
ಜಯವನ್ನು ನೀಡುವ ನಾಮ ||2`,
    englishLyrics: `G                C
Yesuve ninna naamave
D                 G
Melethuve halleluya
G                C
Ninna naama melethuve
D                    G
Indu mahime padisuve ||2
G        C        D        G
Halleluya Halleluya Halleluya -2

G                  C
1. Ella naamakkinta melaada naama
D                  G
Monakaalugalella baaguva naama ||2
G                  C
Naaligegalella oppuva naama
D                    G
Yesuve karthanendu ||2

G                  C
2. Rogava neegisuva divya naama
D                  G
Shatruva solisuva shreshta naama ||2
G                  C
Paapava kshamisuva paavana naama
D                    G
Jayavannu needuva naama ||2`,
    lyricsText: `G                C
ಯೇಸುವೇ ನಿನ್ನ ನಾಮವೇ
D                 G
ಮೇಲೆತ್ತುವೆ ಹಲ್ಲೇಲೂಯಾ`
  },
  {
    id: 'song-nanna-balavada-yehovane',
    songNumber: '804',
    title: 'Nanna Balavada Yehovane',
    kannadaTitle: 'ನನ್ನ ಬಲವಾದ ಯೆಹೋವನೇ',
    type: 'Worship',
    tempo: 72,
    styleNumber: '50',
    chords: 'G',
    originalKey: 'G',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G                  C
ಮುಂಜಾನೆ ಜಾವದಲ್ಲಿ ಹುಡುಕುವೆ ಹುಡುಕುವೆ
D                    G
ನಿನ್ನ ಮುಖ ಕಂಡು ತೃಪ್ತಿ ಹೊಂದುವೆ ||2
Em             Am
ಆ... ಆ... ಆರಾಧನೆ
D              G
ಆ... ಆ... ಆರಾಧನೆ ||2

G                  C
ನನ್ನ ಬಲವಾದ ಯೆಹೋವನೇ
D                  G
ನಿನ್ನಲ್ಲೇ ಮಮತೆಯಿಟ್ಟಿರುವೆ ||2
Em                 Am
ನಿನ್ನ ಶರಣನೆ ನನ್ನ ದುರ್ಗವೇ
D                     G
ನನ್ನ ರಕ್ಷಣೆಯ ಕೊಂಬೇಸುವೇ ||2

G                     C
1. ಕುಗ್ಗಿ ಹೋದವರಿಗೆ ಆಶ್ರಯವಾಗಿರುವೆ
D                     G
ಆಪತ್ಕಾಲದಲ್ಲಿ ದುರ್ಗವು ಆಗಿರುವೆ ||2
Em                      Am
ದೀನ ನನ್ನ ನಿರೀಕ್ಷೆ ಕೆಡವಲ್ಪಡುವುದಿಲ್ಲ
D                      G
ಎಂದೆಂದೂ ನಾ ನಿನ್ನ ಕೊಂಡಾಡುವೆ ||2

G                       C
2. ನೀನೇ ನನ್ನ ಬಂಡೆಯು ನೀನೇ ನನ್ನ ಕೋಟೆಯು
D                       G
ನೀ ನನ್ನ ವಿಮೋಚಕನು ಆಶ್ರಯಗಿರಿಯು ||2
Em                   Am
ಹಿಗ್ಗಾಯೋನ್ ವಾದ್ಯದಿ ಆರಾಧಿಪೆ
D                     G
ಕೈತಟ್ಟಿ ಉತ್ಸಾಹದಿ ಆರಾಧಿಪೆ ||2`,
    englishLyrics: `G                  C
Munjane javadalli hudukuve hudukuve
D                    G
Ninna mukha kandu trupti honduve ||2
Em             Am
Aa... aa... aaradhane
D              G
Aa... aa... aaradhane ||2

G                  C
Nanna balavada yehovane
D                  G
Ninnalle mamateyittiruve ||2
Em                 Am
Ninna sharanane nanna durgave
D                     G
Nanna rakshaneya kombesuve ||2

G                     C
1. Kuggi hodhavarige aashrayavaagiruve
D                     G
Apathkaladalli durgavu aagiruve ||2
Em                      Am
Deena nanna nireekshe kedavalpaduvadilla
D                      G
Endendoo na ninna kondaaduve ||2

G                       C
2. Neene nanna bandeyu neene nanna koteyu
D                       G
Nee nanna vimochakanu aashrayagiriyu ||2
Em                   Am
Higgayon vaadyadi aaradhipe
D                     G
Kai tatti utsaahadi aaradhipe ||2`,
    lyricsText: `G                  C
ಮುಂಜಾನೆ ಜಾವದಲ್ಲಿ ಹುಡುಕುವೆ ಹುಡುಕುವೆ
D                    G
ನಿನ್ನ ಮುಖ ಕಂಡು ತೃಪ್ತಿ ಹೊಂದುವೆ ||2`
  }
];

// Validate all chord lines
for (const s of newSongs) {
  const kLines = s.kannadaLyrics.split('\n');
  for (const l of kLines) {
    if (isChordLine(l)) {
      console.log(`[${s.songNumber}] Chord:`, l);
    }
  }
}

// Append and save to server/data/songs.json
const existing = JSON.parse(fs.readFileSync(songsFilePath, 'utf8'));
const existingIds = new Set(existing.map(x => x.id));
const toAdd = newSongs.filter(s => !existingIds.has(s.id));
const combined = [...existing, ...toAdd];
fs.writeFileSync(songsFilePath, JSON.stringify(combined, null, 2), 'utf8');
console.log('SUCCESS! Added', toAdd.length, 'songs. Total songs now:', combined.length);
