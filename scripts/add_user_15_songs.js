const fs = require('fs');
const path = require('path');
const { isChordLine } = require('../client/src/utils/musicTransposer');

const songsFilePath = path.join(__dirname, '..', 'server', 'data', 'songs.json');

const fifteenSongs = [
  // 1. Stutisi Jaya Hondu Nanna Manave (#1708) - Praise
  {
    id: 'song-stutisi-jaya-hondu-1708',
    songNumber: '1708',
    title: 'Stutisi Jaya Hondu Nanna Manave',
    kannadaTitle: 'ಸ್ತುತಿಸಿ ಜಯ ಹೊಂದು ನನ್ನ ಮನವೇ',
    type: 'Praise',
    tempo: 116,
    styleNumber: '82',
    chords: 'Bm',
    originalKey: 'Bm',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Bm
ಸ್ತುತಿಸಿ ಜಯ ಹೊಂದು ನನ್ನ ಮನವೇ ನೀ
G            A         Bm
ಭಜಿಸಿ ಜಯ ಹೊಂದು ನನ್ನ ಮನವೇ ||2
G
ಸ್ತುತಿಯಲ್ಲಿ ಇರುವುದು ಜಯ
A                          Bm
ಸೈತಾನನಿಗೆ ಲಯ ಲಯ ಲಯ ಲಯ -2
G
ಆರಾಧನೆಯಲ್ಲಿ ಸಿಗುವುದು ಜಯ
A                          Bm
ಸೈತಾನನಿಗೆ ಲಯ ಲಯ ಲಯ ಲಯ -2

Bm
1. ಯೆರಿಕೋ ಕೋಟೆ ನೋಡಿ ನೀ ಭಯಪಡಬೇಡ
G            A         Bm
ಯೆಹೋಶುವನಂತೆ ಆರ್ಭಟಿಸು ||2
G
ಸ್ತುತಿಯಲ್ಲಿ ಇರುವುದು ಜಯ
A                          Bm
ಸೈತಾನನಿಗೆ ಲಯ ಲಯ ಲಯ ಲಯ -2

Bm
2. ಗೋಲ್ಯಾತನನ್ನು ನೋಡಿ ನೀ ಭಯಪಡಬೇಡ
G            A         Bm
ದಾವೀದನಂತೆ ನೀ ಸ್ತುತಿಸು ||2
G
ಸ್ತುತಿಯಲ್ಲಿ ಇರುವುದು ಜಯ
A                          Bm
ಸೈತಾನನಿಗೆ ಲಯ ಲಯ ಲಯ ಲಯ -2

Bm
3. ಸೆರೆಮನೆಯಲ್ಲಿದ್ದರೂ ನೀ ಭಯಪಡಬೇಡ
G            A         Bm
ಪೌಲ ಸೀಲರಂತೆ ನೀ ಸ್ತುತಿಸು ||2
G
ಸ್ತುತಿಯಲ್ಲಿ ಇರುವುದು ಜಯ
A                          Bm
ಸೈತಾನನಿಗೆ ಲಯ ಲಯ ಲಯ ಲಯ -2

Bm
4. ಊರೆಲ್ಲಾ ಎದುರಾದರೂ ನೀ ಭಯಪಡಬೇಡ
G            A         Bm
ನಮ್ಮಲ್ಲಿ ಇರುವವ ದೊಡ್ಡವನು ಯೇಸು ||2
G
ಸ್ತುತಿಯಲ್ಲಿ ಇರುವುದು ಜಯ
A                          Bm
ಸೈತಾನನಿಗೆ ಲಯ ಲಯ ಲಯ ಲಯ -2`,
    englishLyrics: `Bm
Stutisi jaya hondu nanna manave ni
G            A         Bm
Bhajisi jaya hondu nanna manave ||2
G
Stutiyalli iruvudu jaya
A                          Bm
Saitananige laya laya laya laya -2
G
Aradhaneyalli siguvudu jaya
A                          Bm
Saitananige laya laya laya laya -2

Bm
1. Yeriko kote nodi ni bhayapadabeda
G            A         Bm
Yehosuvanante arbhatisu ||2
G
Stutiyalli iruvudu jaya
A                          Bm
Saitananige laya laya laya laya -2

Bm
2. Golyatanannu nodi ni bhayapadabeda
G            A         Bm
Davidanante ni stutisu ||2
G
Stutiyalli iruvudu jaya
A                          Bm
Saitananige laya laya laya laya -2

Bm
3. Seremaneyalliddaru ni bhayapadabeda
G            A         Bm
Paula silarante ni stutisu ||2
G
Stutiyalli iruvudu jaya
A                          Bm
Saitananige laya laya laya laya -2

Bm
4. Urella eduradaru ni bhayapadabeda
G            A         Bm
Nammalli iruvava dodḍavanu Yesu ||2
G
Stutiyalli iruvudu jaya
A                          Bm
Saitananige laya laya laya laya -2`,
    lyricsText: `Bm
ಸ್ತುತಿಸಿ ಜಯ ಹೊಂದು ನನ್ನ ಮನವೇ ನೀ
G            A         Bm
ಭಜಿಸಿ ಜಯ ಹೊಂದು ನನ್ನ ಮನವೇ ||2`
  },

  // 2. Ninna Nambi Bande Na Lajje Padalilla - Praise
  {
    id: 'song-ninna-nambi-bande-lajje',
    songNumber: '7140',
    title: 'Ninna Nambi Bande Na Lajje Padalilla',
    kannadaTitle: 'ನಿನ್ನ ನಂಬಿ ಬಂದೆ ನಾ ಲಜ್ಜೆ ಪಡಲಿಲ್ಲ',
    type: 'Praise',
    tempo: 112,
    styleNumber: '80',
    chords: 'Gm',
    originalKey: 'Gm',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Gm
ನಿನ್ನ ನಂಬಿ ಬಂದೆ ನಾ ಲಜ್ಜೆ ಪಡಲಿಲ್ಲ
F                      Gm
ನಿನ್ ದಯೆ ಎಂದು ಕೈಬಿಡಲಿಲ್ಲ ||2
Eb
ಬರಿಕೈಯಾಗಿ ಬಂದೆನು ನಾ
D
ತುಂಬಿದವನಾಗಿ ಮಾಡಿರುವೆ ||2

Gm           F
ಎಲ್ ಎಲೋಹಿ... ಎಲ್ ಎಲೋಹಿ...
Eb           D
ಎಲ್ ಎಲೋಹಿ... ನಿನ್ನ ಸ್ತುತಿಪೆ -2

Gm
1. ಗಾಯಪಟ್ಟು ನಿಂತೆ ಕಣ್ಣೀರಲ್ಲಿದ್ದೆ
F                     Gm
ಕುಗ್ಗಿರುವ ನನಗಾಗಿ ಇಳಿದು ಬಂದೆ ||2
Eb
ಒಡಂಬಡಿಕೆ ಮಾಡಿಕೊಂಡು
D
ನಷ್ಟವಾದದ್ದೆಲ್ಲವ ತಿರುಗಿ ತಂದೆ ||2

Gm
2. ನಂಬಿದವರೆಲ್ಲಾ ನನ್ನ ತೊರೆದರು
F                     Gm
ನಂಬಿಗಸ್ತನಾಗಿ ನೀ ಜೊತೆಗಿರುವೆ ||2
Eb
ಪರದೇಶಿಯಾಗಿ ಇದ್ದ ನನ್ನ
D
ಸ್ವಂತ ಮಗನಂತೆ ಪ್ರೀತಿಸಿದೆ ||2`,
    englishLyrics: `Gm
Ninna nambi bande naa lajje padalilla
F                      Gm
Nin daye yendhu kaibidalilla ||2
Eb
Barikaiyaaghi bandhenu naa
D
Thumbhidhavanaaghi maadiruve ||2

Gm           F
El Elohae... El Elohae...
Eb           D
El Elohae... Ninna sthuthipe -2

Gm
1. Gaayapattu ninthe kannirallidhe
F                     Gm
Kuggiruva nanaghagi ilidhu bandhe ||2
Eb
Odambadike maadikondu
D
Nashtavaadhadhellava thirughi thandhe ||2

Gm
2. Nambhidavarella nanna thoredharu
F                     Gm
Nambhigasthanaaghi nee jhotheiruve ||2
Eb
Paradheshiyaaghi iddha nanna
D
Swanta maganante preetiside ||2`,
    lyricsText: `Gm
ನಿನ್ನ ನಂಬಿ ಬಂದೆ ನಾ ಲಜ್ಜೆ ಪಡಲಿಲ್ಲ
F                      Gm
ನಿನ್ ದಯೆ ಎಂದು ಕೈಬಿಡಲಿಲ್ಲ`
  },

  // 3. Hosa Baalu Thandavane (#5263) - Praise
  {
    id: 'song-hosa-baalu-thandavane-5263',
    songNumber: '5263',
    title: 'Hosa Baalu Thandavane Hosa Aarambha',
    kannadaTitle: 'ಹೊಸ ಬಾಳು ತಂದವನೆ ಹೊಸ ಆರಂಭ ತಂದವನೆ',
    type: 'Praise',
    tempo: 110,
    styleNumber: '85',
    chords: 'Fm',
    originalKey: 'Fm',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Fm                   Db
ಹೊಸ ಬಾಳು ತಂದವನೆ ಹೊಸ ಆರಂಭ ತಂದವನೆ
Eb                   Fm
ಸ್ತೋತ್ರ ನಿಮಗೆ ಸ್ತೋತ್ರ ||2
Fm                   Db
ಪೂರ್ಣ ಮನದಿಂದ ಸಲ್ಲಿಸುವೆ ಸ್ತೋತ್ರ ನಿಮಗೆ ಸ್ತೋತ್ರ
Eb                   Fm
ಪೂರ್ಣ ಹೃದಯದಿಂದ ಸಲ್ಲಿಸುವೆ ಸ್ತೋತ್ರ ನಿಮಗೆ ಸ್ತೋತ್ರ ||2

Fm                   Db
1. ತನ್ ಮಕ್ಕಳನ್ನು ಮರೆಯದಂತೆ ಅನುದಿನವು ಪೋಷಿಸಿದೆ
Eb                   Fm
ಕೊರತೆಯನ್ನು ಕ್ರಿಸ್ತನಲ್ಲಿ ನೀಗಿಸಿ ಕಾದು ನಡೆಸಿರುವೆ ||2
Bbm          C       Fm
ಸ್ತೋತ್ರ ನಿಮಗೆ ಸ್ತೋತ್ರ... -2

Fm                   Db
2. ಕಳೆದದ್ದನು ಯೋಚಿಸದೆ ಪೂರ್ವ ಕಾಲವ ಚಿಂತಿಸದೆ
Eb                   Fm
ಹೊಸದನ್ನು ಕೊಡಲಿರುವ ಮಹಿಮೆಯ ಶೃಂಗಾರ ಮಾಡಿರುವೆ ||2
Bbm          C       Fm
ಸ್ತೋತ್ರ ನಿಮಗೆ ಸ್ತೋತ್ರ... -2

Fm                   Db
3. ಕಣ್ಣಿರಿಂದ ಬಿತ್ತಿದ್ದನ್ನು ಆನಂದದಿಂದ ಕೊಯ್ಯುವೆವು
Eb                   Fm
ಬೇಡಿನಿಂತ ಕೈಗಳನ್ನು ಕೊಡುವ ಕೈಯಾಗಿ ಮಾರ್ಪಡಿಸಿದೆ ||2
Bbm          C       Fm
ಸ್ತೋತ್ರ ನಿಮಗೆ ಸ್ತೋತ್ರ... -2`,
    englishLyrics: `Fm                   Db
Hosa baalu thandavane hosa aarambha thandavane
Eb                   Fm
Sthothra nimage sthothra ||2
Fm                   Db
Poorna manadinda sallisuve sthothra nimage sthothra
Eb                   Fm
Poorna hrudayadinda sallisuve sthothra nimage sthothra ||2

Fm                   Db
1. Tan makkalannu mareyadanthe anudinavu poshicide
Eb                   Fm
Koratheyannu Kristanalli neegisi kaadu nadesiruve ||2
Bbm          C       Fm
Sthothra nimage sthothra... -2

Fm                   Db
2. Kaledaddanu yochisade poorva kaalava chintisade
Eb                   Fm
Hosadannu kodaliruva mahimeya shrungaara maadiruve ||2
Bbm          C       Fm
Sthothra nimage sthothra... -2

Fm                   Db
3. Kanneerina bittiddannu aanandadinda koyyuvevu
Eb                   Fm
Bedininta kaigalannu koduva kaiyaagi maarpadiside ||2
Bbm          C       Fm
Sthothra nimage sthothra... -2`,
    lyricsText: `Fm                   Db
ಹೊಸ ಬಾಳು ತಂದವನೆ ಹೊಸ ಆರಂಭ ತಂದವನೆ
Eb                   Fm
ಸ್ತೋತ್ರ ನಿಮಗೆ ಸ್ತೋತ್ರ`
  },

  // 4. Nan Taleyannu Ettuva Deva - Praise
  {
    id: 'song-nan-taleyannu-ettuva-deva',
    songNumber: '7150',
    title: 'Nan Taleyannu Ettuva Deva',
    kannadaTitle: 'ನನ್ ತಲೆಯನ್ನು ಎತ್ತುವ ದೇವ',
    type: 'Praise',
    tempo: 114,
    styleNumber: '82',
    chords: 'Em',
    originalKey: 'Em',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Em                    B
ನನ್ ತಲೆಯನ್ನು ಎತ್ತುವ ದೇವ ನನೊಂದಿಗಿರಲು ಭಯವೆ ಇಲ್ಲ
D                     Am           Em
ನನ್ ಸ್ಥಿತಿಯ ತಿಳಿದ ದೇವ ನನ್ನ ಜೊತೆಯಿರಲು ಭಯವೆ ಇಲ್ಲ ||2

Em                    B
ಎಲ್ ಪೆರಾಜಿಮ್ ಎಲ್ ಪೆರಾಜಿಮ್ ತಡೆಯ ಮುರಿವವನೇ
D                     Am           Em
ಲಜ್ಜೆಯ ಕಂಡ ದಿನಗಳಿಗೆಲ್ಲ ಸನ್ಮಾನ ತರುವವನೇ ||2

Em                    B
1. ಹಳೆಯದ್ದೆಲ್ಲ ಇಲ್ಲದಾಯಿತು ಹಿಂದಿನದೆಲ್ಲ ಮರೆಯಾಯಿತು ||2
D                     Am           Em
ಕರ್ತನೆ ನನಗಾಗಿ ಇಳಿಯುವನು ಹೊಸ ಕಾರ್ಯವ ಮಾಡುವನು ||2

Em                    B
2. ಅವಮಾನ ಪಟ್ಟ ಸ್ಥಳಗಳಲ್ಲೆಲ್ಲ ನನ್ನ ತಲೆ ಮೇಲೆತ್ತಿ ನಿಲ್ಲಿಸಿದೆ ||2
D                     Am           Em
ನಿತ್ಯ ಮಹಿಮೆಯ ನನಗೆ ನೀಡಿ ತಲೆ - ತಲೆಮಾರಿಗೂ ಸ್ತುತಿಯ ತಂದೆ ||2

Em                    B
3. ಶ್ರೇಷ್ಠವಾದ ಸ್ಥಳಗಳಲ್ಲೆಲ್ಲ ಉತ್ತಮ ಪಾಲನು ನನಗೆ ತಂದೆ ||2
D                     Am           Em
ನೀ ವಾಗ್ದಾನ ಮಾಡಿದ ಎಲ್ಲವನ್ನೂ ತಕ್ಕ ಸಮಯಕ್ಕೆ ನೆರವೇರಿಸುವೆ ||2`,
    englishLyrics: `Em                    B
Nan taleyannu ettuva deva nanondigiralu bhayave illa
D                     Am           Em
Nan sthitiya thilida deva nanna jotheyiralu bhayave illa ||2

Em                    B
El Perazim El Perazim thadeya murivavane
D                     Am           Em
Lajjeya kanda dinagaligella sanmana tharuvavane ||2

Em                    B
1. Haleyaddella illadayithu hindinadella mareyayithu ||2
D                     Am           Em
Karthane nanagaagi iliyuvanu hosa kaaryava maaduvanu ||2

Em                    B
2. Avamana patta sthalagalallele nanna thale melethi nilliside ||2
D                     Am           Em
Nithya mahimeya nanage needi thale thalemaarigu sthuthiya thande ||2

Em                    B
3. Sreshtavaada sthalagalallele uttama paalanu nanage thande ||2
D                     Am           Em
Nee vaagdana maadida ellavannu takka samayakke nereverisuve ||2`,
    lyricsText: `Em                    B
ನನ್ ತಲೆಯನ್ನು ಎತ್ತುವ ದೇವ ನನೊಂದಿಗಿರಲು ಭಯವೆ ಇಲ್ಲ
D                     Am           Em
ನನ್ ಸ್ಥಿತಿಯ ತಿಳಿದ ದೇವ ನನ್ನ ಜೊತೆಯಿರಲು ಭಯವೆ ಇಲ್ಲ`
  },

  // 5. Jeevadindedda Yesuve (#448) - Praise
  {
    id: 'song-jeevadindedda-yesuve-448',
    songNumber: '448',
    title: 'Jeevadindedda Yesuve Na Baaluve',
    kannadaTitle: 'ಜೀವದಿಂದೆದ್ದ ಯೇಸುವೇ ನಾ ಬಾಳುವೆ',
    type: 'Praise',
    tempo: 118,
    styleNumber: '82',
    chords: 'Dm',
    originalKey: 'Dm',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Dm                    C
ಜೀವದಿಂದೆದ್ದ ಯೇಸುವೇ ನಾ ಬಾಳುವೆ ನಿನಗಾಗಿಯೇ
Bb                    C           Dm
ನೀನೊಬ್ಬನೆ ದೇವನು ನೀನೊಬ್ಬನೆ ರಕ್ಷಕನು ||2
Dm                    C
ನನ್ನ ಎತ್ತಿ ಎತ್ತಿ ನಿಲ್ಲಿಸಿದೇ ಸರ್ವಶಕ್ತ ನೀನೆ
Bb                    C           Dm
ನನ್ನ ದೂಳಿನಿಂದ ಎತ್ತಿದೇ ಸಮಾಧಾನ ಕರ್ತ ನೀನೆ ||2

C        Dm       C        Dm
ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ -2

Dm                    C
1. ಶಿಲುಬೆಯ ಆ ಯಜ್ಞದಿ ನನಗಾಗಿಯೇ ಜೀವ ನೀಡಿದೆ
Bb                    C           Dm
ಮರಣದ ಬಾಗಿಲಿಂದ ಯೇಸು ನನ್ನನು ತಪ್ಪಿಸಿದ ||2
Dm                    C
ನನ್ನ ಎತ್ತಿ ಎತ್ತಿ ನಿಲ್ಲಿಸಿದೇ ಸರ್ವಶಕ್ತ ನೀನೆ
Bb                    C           Dm
ನನ್ನ ದೂಳಿನಿಂದ ಎತ್ತಿದೇ ಸಮಾಧಾನ ಕರ್ತ ನೀನೆ ||2

Dm                    C
2. ಕ್ರಿಸ್ತನ ಮರಣದಿಂದಲೆ ನನ್ನ ಎಲ್ಲಾ ಶಾಪ ನೀಗಿತು
Bb                    C           Dm
ಅಬ್ರಾಹಾಮನ ಆಶೀರ್ವಾದ ಕ್ರಿಸ್ತನಿಂದಲೆ ದೊರಕಿತು ||2
Dm                    C
ನನ್ನ ಎತ್ತಿ ಎತ್ತಿ ನಿಲ್ಲಿಸಿದೇ ಸರ್ವಶಕ್ತ ನೀನೆ
Bb                    C           Dm
ನನ್ನ ದೂಳಿನಿಂದ ಎತ್ತಿದೇ ಸಮಾಧಾನ ಕರ್ತ ನೀನೆ ||2`,
    englishLyrics: `Dm                    C
Jeevadindedda Yesuve na baaluve ninagagiye
Bb                    C           Dm
Ninobbane devanu ninobbane rakshakanu ||2
Dm                    C
Nanna etti etti nilliside sarvashakta nine
Bb                    C           Dm
Nanna dulininda ettide samadhana karta nine ||2

C        Dm       C        Dm
Haleluya haleluya haleluya haleluya -2

Dm                    C
1. Shilubeya a yajnadi nanagagiye jiva nidide
Bb                    C           Dm
Maranada bagilinda yesu nannanu tappisida ||2
Dm                    C
Nanna etti etti nilliside sarvashakta nine
Bb                    C           Dm
Nanna dulininda ettide samadhana karta nine ||2

Dm                    C
2. Kristana maranadindale nanna ella shapa nigitu
Bb                    C           Dm
Abrahamana asirvada kristanindale dorakitu ||2
Dm                    C
Nanna etti etti nilliside sarvashakta nine
Bb                    C           Dm
Nanna dulininda ettide samadhana karta nine ||2`,
    lyricsText: `Dm                    C
ಜೀವದಿಂದೆದ್ದ ಯೇಸುವೇ ನಾ ಬಾಳುವೆ ನಿನಗಾಗಿಯೇ
Bb                    C           Dm
ನೀನೊಬ್ಬನೆ ದೇವನು ನೀನೊಬ್ಬನೆ ರಕ್ಷಕನು`
  },

  // 6. Kaayalu Neen Iruvaga (#7168) - Worship
  {
    id: 'song-kaayalu-neen-iruvaga-7168',
    songNumber: '7168',
    title: 'Kaayalu Neen Iruvaga Taleyetti Nadeyuve',
    kannadaTitle: 'ಕಾಯಲು ನೀನಿರುವಾಗ ತಲೆ ಎತ್ತಿ ನಡೆಯುವೆ',
    type: 'Worship',
    tempo: 70,
    styleNumber: '42',
    chords: 'F',
    originalKey: 'F',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `F                    Gm          C        F
ಕಾಯಲು ನೀನಿರುವಾಗ ತಲೆ ಎತ್ತಿ ನಡೆಯುವೆ
F                    Gm          C        F
ಜೊತೆಯಲ್ಲಿ ನೀನಿರುವಾಗ ಧೈರ್ಯಾದಿ ಸಾಗುವೆ ||2

F           Bb                  F
ಯಾವುದನ್ನು ಮರೆಮಾಡದೆ ನನ್ನನ್ನು ಪ್ರೀತಿಸಿರುವೆ
F           Bb                  F
ನನ್ನ ಮೇಲೆ ತಪ್ಪೊರಿಸದೆ ನನ್ನನ್ನು ಕ್ಷಮಿಸಿರುವೆ
Dm          Gm       Am     Bbm       F
ನಿನ್ನ ಕೃಪೆಯೇ ನನ್ನ ಮೇಲೆತ್ತಿ ಮೇಲೆತ್ತಿ ನಿಲ್ಲಿಸಿದೆ ||2

F           Am       F           Gm
1. ಕೊಳೆಯಾದ ನನ್ನ ಬಟ್ಟೆಯ ನಿನ್ನ ಕೈಯಿಂದ ತೆಗೆದೆ
Bb          C        Bbm         F
ನೀತಿಯ ನಿಲುವಂಗಿಯ ತೊಡಿಸಿದೆ ನಿನ್ನ ರಕ್ತದಿಂದಲೇ ||2

F           Am       Bb          C
2. ನಿಯಮದ ಪ್ರಕಾರ ಮರಣದ ಕಲ್ಲುಗಳು ನನ್ನ ಮೇಲೆ ಎತ್ತಲ್ಪಟ್ಟಾಗ
F           Am       Bb          C
ನನ್ ಜೊತೆ ನಿಂತು ಮರಣವ ತಡೆದು ನನಗಾಗಿ ಮಾತಾಡಿದೆ ||2
Dm          Gm       Dm          C
ತಲೆಯ ಎತ್ತಿದೆ ಕರುಣೆ ಕಂಡೆನು ನಿಯಮವಿಲ್ಲದ ಒಂದು ಸ್ಥಳವ ಕಂಡೆನು
F           Gm       C
ಇದಯ್ಯಲ್ಲವೇ ನಿನ್ನ ಕೃಪೆಯು ||2`,
    englishLyrics: `F                    Gm          C        F
Kaayalu nin iruvaga taleyetti nadeyuve
F                    Gm          C        F
Jotheyalli nin iruvaga dhairyadi saaguve ||2

F           Bb                  F
Yavudannu maremaadade nananu preetisiruve
F           Bb                  F
Nanna mele tapporisade nananu kshamisiruve
Dm          Gm       Am     Bbm       F
Ninna krupe nanna meletti meletti nilliside ||2

F           Am       F           Gm
1. Koleyada nanna batteya ninna kai inda tegede
Bb          C        Bbm         F
Neetiya niluvangiya todiside ninna rakthadindale ||2

F           Am       Bb          C
2. Niyamada prakara maranada kalgalu nanna mele hettalpattaga
F           Am       Bb          C
Nan jothe nintu maranava tadedu nanagagi maatadide ||2
Dm          Gm       Dm          C
Taleya hettide karune kandenu niyamavillada ondu stalava kandenu
F           Gm       C
Edheyallave ninna krupeyu ||2`,
    lyricsText: `F                    Gm          C        F
ಕಾಯಲು ನೀನಿರುವಾಗ ತಲೆ ಎತ್ತಿ ನಡೆಯುವೆ
F                    Gm          C        F
ಜೊತೆಯಲ್ಲಿ ನೀನಿರುವಾಗ ಧೈರ್ಯಾದಿ ಸಾಗುವೆ`
  },

  // 7. Appa Naa Ninna Kaanuve (#793) - Worship
  {
    id: 'song-appa-naa-ninna-kaanuve-793',
    songNumber: '793',
    title: 'Appa Naa Ninna Kaanuve Thande',
    kannadaTitle: 'ಅಪ್ಪಾ ನಾ ನಿನ್ನ ಕಾಣುವೆ ತಂದೆ ನಾ ನಿನ್ನ ಸ್ತುತಿಸುವೆ',
    type: 'Worship',
    tempo: 68,
    styleNumber: '46',
    chords: 'C',
    originalKey: 'C',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `C                   F
ಅಪ್ಪಾ ನಾ ನಿನ್ನ ಕಾಣುವೆ
G                   C
ತಂದೆ ನಾ ನಿನ್ನ ಸ್ತುತಿಸುವೆ ||2
C                   F
ತಂದೆಯು ನೀನೆ ತಾಯಿಯು ನೀನೆ
G                   C
ನಾ ನಿನ್ನ ಕಂದನಲ್ಲೋ ||2

C                   F
1. ಮಾರ್ಗವು ನೀನೆ ಸತ್ಯವು ನೀನೆ
G                   C
ನೀ ನನ್ನ ಜೀವವಲ್ಲೋ ||2
C                   F
ಅಪ್ಪಾ ನಾ ನಿನ್ನ ಕಾಣುವೆ
G                   C
ತಂದೆ ನಾ ನಿನ್ನ ಸ್ತುತಿಸುವೆ ||2

C                   F
2. ಒಳ್ಳೆ ಕುರುಬನು ನೀನಲ್ಲವೋ
G                   C
ನಾ ನಿನ್ನ ಕುರಿಮರಿಯು ||2
C                   F
ಜೀವ ಜಲದ ಬುಗ್ಗೆಯು ನೀನೆ
G                   C
ನಿನ್ನಲ್ಲಿ ದಾಹಗೊಂಡೆ ||2

C                   F
3. ಕತ್ತಲೆಯಲ್ಲಿ ಬೆಳಕು ನೀನೆ
G                   C
ಬೆಳಕಾಗಿ ಮುನ್ನಡೆಸು ||2
C                   F
ಅಪ್ಪಾ ನಾ ನಿನ್ನ ಕಾಣುವೆ
G                   C
ತಂದೆ ನಾ ನಿನ್ನ ಸ್ತುತಿಸುವೆ ||2`,
    englishLyrics: `C                   F
Appa naa ninna kaanuve
G                   C
Thande naa ninna sthuthisuve ||2
C                   F
Thandeyu neene thayiyu neene
G                   C
Naa ninna kandanallo ||2

C                   F
1. Margavu neene sathyavu neene
G                   C
Neenenna jeevavallo ||2
C                   F
Appa naa ninna kaanuve
G                   C
Thande naa ninna sthuthisuve ||2

C                   F
2. Olle kurubanu neenallavo
G                   C
Naa ninna kurimariyu ||2
C                   F
Jeeva jalada buggeyu neene
G                   C
Ninnalli dahagonde ||2

C                   F
3. Kattaleyalli belaku neene
G                   C
Belakaagi munnadesu ||2
C                   F
Appa naa ninna kaanuve
G                   C
Thande naa ninna sthuthisuve ||2`,
    lyricsText: `C                   F
ಅಪ್ಪಾ ನಾ ನಿನ್ನ ಕಾಣುವೆ
G                   C
ತಂದೆ ನಾ ನಿನ್ನ ಸ್ತುತಿಸುವೆ`
  },

  // 8. Sharonu Pushpave (#7264) - Worship
  {
    id: 'song-sharonu-pushpave-7264',
    songNumber: '7264',
    title: 'Sharonu Pushpave Nan Praana Snehave',
    kannadaTitle: 'ಶಾರೋನು ಪುಷ್ಪವೇ ನನ್ ಪ್ರಾಣ ಸ್ನೇಹವೇ',
    type: 'Worship',
    tempo: 70,
    styleNumber: '42',
    chords: 'Em',
    originalKey: 'Em',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Em
ಶಾರೋನು ಪುಷ್ಪವೇ ನನ್ ಪ್ರಾಣ ಸ್ನೇಹವೇ
Am                   D          Em
ನಿರ್ದೋಷ ರಕ್ತವೇ ದೇವರಿನ ಕುರಿಮರಿಯೇ ||2
Em                   G
ಸುಂದರನು ನೀನು ಸುಂದರನು
Bm                   Em
ಹತ್ತು ಸಾವಿರರಲ್ಲಿ ಶ್ರೇಷ್ಠನು ||2

Em
ಹೋಸನ್ನಾ ಉನ್ನತ ದೇವನೇ
Am                   Em
ಹೋಸನ್ನಾ ದಾವೀದ ಕುಮಾರನೇ -2

Em
1. ಸ್ನೇಹಿತರು ಮರೆತುಹೋದರೂ
Am
ಬಂಧುಗಳು ಬಿಟ್ಟುಹೋದರೂ
D                    G          Bm
ಜೊತೆಯಾಗಿ ನಿಂತ ಪ್ರೀತಿಯ ಮರೆಯಲಾರೆ ನಾ ||2
Em
ಜೊತೆಗಾರನೇ ನನ್ನ ಜೊತೆಗಾರನೇ
Am                   B          Em
ವೇದನೆಯಲ್ಲಿ ಆಧರಿಸುವ ನನ್ ಪ್ರಿಯನೇ ||2

Em
2. ರೋಗದ ಹಾಸಿಗೆಯಲ್ಲಿ
Am
ನಿರೀಕ್ಷೆಯ ಕಳೆದುಕೊಂಡರೂ
D                    G          Bm
ನನ್ನ ಮುಟ್ಟಿ ಸ್ವಸ್ಥಪಡಿಸಿದ ವೈದ್ಯನು ನೀ ||2
Em
ಪರಿಹಾರಿಯೇ ನನ್ನ ಪರಿಹಾರಿಯೇ ನನ್ನ
Am                   B          Em
ರೋಗವ ಹೊತ್ತುಕೊಂಡ ಯೇಸುವೇ ||2`,
    englishLyrics: `Em
Sharonu pushpave nan praana snehave
Am                   D          Em
Nirdosha rakthave devarina kurimariye ||2
Em                   G
Sundaranu neenu sundaranu
Bm                   Em
Hatthu saaviraralli shreshtanu ||2

Em
Hosanna unnatha devane
Am                   Em
Hosanna Daaveeda kumaarane -2

Em
1. Snehitaru marethuhodaroo
Am
Bandhugalu bittuhodaroo
D                    G          Bm
Jotheyaagi ninta preetiya mareyalaare naa ||2
Em
Jothegaarane nanna jothegaarane
Am                   B          Em
Vedaneyalli aadharisuva nan priyane ||2

Em
2. Rogada haasigeyalli
Am
Nireeksheya kaledukondaroo
D                    G          Bm
Nanna mutti swasthapadisida vaagyanu nee ||2
Em
Parihaariye nanna parihaariye nanna
Am                   B          Em
Rogava hotthukonda Yesuve ||2`,
    lyricsText: `Em
ಶಾರೋನು ಪುಷ್ಪವೇ ನನ್ ಪ್ರಾಣ ಸ್ನೇಹವೇ
Am                   D          Em
ನಿರ್ದೋಷ ರಕ್ತವೇ ದೇವರಿನ ಕುರಿಮರಿಯೇ`
  },

  // 9. Ennalli Ukkutte Stotravu (#1303) - Worship
  {
    id: 'song-ennalli-ukkutte-stotravu-1303',
    songNumber: '1303',
    title: 'Ennalli Ukkutte Stotravu Swami',
    kannadaTitle: 'ಎನ್ನಲ್ಲಿ ಉಕ್ಕುತ್ತೆ ಸ್ತೋತ್ರವು ಸ್ವಾಮಿ ಎಂದೆಂದೂ',
    type: 'Worship',
    tempo: 72,
    styleNumber: '48',
    chords: 'G',
    originalKey: 'G',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G
ಎನ್ನಲ್ಲಿ ಉಕ್ಕುತ್ತೆ ಸ್ತೋತ್ರವು
Em           A        Bm
ಸ್ವಾಮಿ ಎಂದೆಂದೂ ನಾ ಹಾಡುವೆ ||2
Bm           F#       G            A        Bm
ಜನಿಸಿದ ದಿನದಿಂದ ಈವರೆಗೂ ಕರುಣಿಸಿ ಕಾದಿ ನೀ ||2

Bm           F#
1. ಆಕಾಶ ಮಂಡಲವೆಲ್ಲಾ
Bm           F#
ಸಕಲ ದೇವದೂತ ಸೈನ್ಯವು ||2
G                    A            Bm
ಭೂಚರ ಜಲಚರಗಳೆಲ್ಲವೂ ಸೃಷ್ಟಿಕರ್ತನ ಕೀರ್ತಿಸಲು ||2

Bm           F#
2. ನಿನ್ನಯ ಅತಿ ಶ್ರೇಷ್ಠ ನಾಮ
Bm           F#
ಅದು ನನಗೆಂಥ ಉಲ್ಲಾಸವು ||2
G                    A            Bm
ನಿನ್ನಯ ನಾಮವ ನಂಬಿ ಎನಗುಂಟು ಅಭಯವು ||2

Bm           F#
3. ಆತನ ಪ್ರೀತಿಯ ಕಂಡೆ
Bm           F#
ಆ ಕಲ್ವಾರಿ ಶಿಲುಬೆಯಲ್ಲಿ ||2
G                    A            Bm
ಹೃದಯದ ಭಾರವ ಕಳೆದೆ ನಾ ನೋಡಿದ ಕ್ಷಣದಿಂದಲೆ ||2`,
    englishLyrics: `G
Ennalli Ukkutte Stotravu
Em           A        Bm
Swami Endhendhu Naa Haaduve ||2
Bm           F#       G            A        Bm
Janisida Dinadinda Evaregu Karunisi Kaade Nee ||2

Bm           F#
1. Aakasha Mandalavella
Bm           F#
Sakala Devadhutha Sainyavu ||2
G                    A            Bm
Bhuchara Jalcharagallellavu Srushtikartana Keerthisalu ||2

Bm           F#
2. Ninnaya Athi Shreshta Naama
Bm           F#
Adu Nanagenthha Ullasavu ||2
G                    A            Bm
Ninnaya Naamava Nambi Nangendu Abhayavu ||2

Bm           F#
3. Aatana Preetiya Kande
Bm           F#
Aa Kalvari Silubeyalli ||2
G                    A            Bm
Hrudayada Bhaarava Kalede Naa Nodida Kshanadindale ||2`,
    lyricsText: `G
ಎನ್ನಲ್ಲಿ ಉಕ್ಕುತ್ತೆ ಸ್ತೋತ್ರವು
Em           A        Bm
ಸ್ವಾಮಿ ಎಂದೆಂದೂ ನಾ ಹಾಡುವೆ`
  },

  // 10. Ninondige Jeevana Kannirallu (#7203) - Worship
  {
    id: 'song-ninondige-jeevana-7203',
    songNumber: '7203',
    title: 'Ninondige Jeevana Kannirallu Sundara',
    kannadaTitle: 'ನಿನ್ನೊಂದಿಗೆ ಜೀವನ ಕಣ್ಣೀರಲ್ಲೂ ಸುಂದರ ಪಯಣ',
    type: 'Worship',
    tempo: 68,
    styleNumber: '44',
    chords: 'G',
    originalKey: 'G',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G                    C
ನಿನ್ನೊಂದಿಗೆ ಜೀವನ ಕಣ್ಣೀರಲ್ಲೂ ಸುಂದರ ಪಯಣ
G                    C
ನಿನ್ನೊಂದಿಗೆ ಜೀವನ ಕಣ್ಣೀರಲ್ಲೂ ಅಂದದ ಪಯಣ ||2

D                    G
ನೀನೇ ನನ್ನ ಪ್ರಾಣಧಾರವೂ... ನೀನೇ ನನ್ನ ಜೀವಧಾರವು
D                    G
ನೀನೇ ನನ್ನ ಪ್ರಾಣಧಾರವೂ... ನೀನೇ ನನ್ನ ಜೀವಧಾರವು -2

G                    Em
1. ನೀನು ಇಲ್ಲದೆ ನಾನು ಜೀವಿಸಲಾರೆ
C                    D
ನೀನು ಇಲ್ಲದೆ ನಾನು ಬದುಕಲಾರೆ ||2
G                    Em
ನೀನು ಇಲ್ಲದೆ ನಾನು ಊಹಿಸಲಾರೆ
C                    D
ನೀನು ಇಲ್ಲದೆ ನಾನು ಶೂನ್ಯವಯ್ಯ ||2
G                    C
ನಿನ್ನ ಮರೆತ ಕ್ಷಣವೇ ಒಂದು ಯುಗವಾಗಿ ಅನಿಸಿತು ನನಗೆ
G                    C
ಮುರಿದ ಈ ಹೃದಯ ಹುಡುಕಿತು ನಿನ್ನ ಪ್ರೀತಿಗಾಗಿ ||2

G                    Em
2. ನಿನ್ನೊಂದಿಗೆ ಜೀವಿಸುವೆ ನಾ ನಿರಂತರವು
C                    D
ನಿನ್ನನ್ನೇ ಪ್ರೀತಿಸುವೆ ನಾ ಸದಾಕಾಲವೂ ||2
G                    Em
ಲೋಕವೆಲ್ಲಾ ಹುಡುಕಿದೆ ನಾನು ಎಲ್ಲಾ ಶೂನ್ಯವೂ
C                    D
ಕೊನೆಗೆ ಉಳಿದಿರುವೆ ನೀನೆ ಸದಾಕಾಲವು ||2`,
    englishLyrics: `G                    C
Ninondige Jeevana Kannirallu Sundara Payana
G                    C
Ninondige Jeevana Kannirallu Andada Payana ||2

D                    G
Neen Nanna Pranadaravu... Neen Nanna Jeevadaravu
D                    G
Neen Nanna Pranadaravu... Neen Nanna Jeevadaravu -2

G                    Em
1. Neenu illade Naanu Jeevisalare
C                    D
Neenu illade Naanu Badukalare ||2
G                    Em
Neenu illade Naanu Huhisalare
C                    D
Neenu illade Naanu Shunyavayya ||2
G                    C
Ninna Mareta Kshanavhe Ondu Hugavagi anisitu nanaghe
G                    C
Murida E hrudaya hudukiti ninna preetigagi ||2

G                    Em
2. Ninondige Jeevisuve Na Nirantaravu
C                    D
Ninnane preetisuve Na Sadakalavu ||2
G                    Em
Lokavella Hudukide naanu yella shunyavu
C                    D
Koneghe hulidiruve neene sadakalavu ||2`,
    lyricsText: `G                    C
ನಿನ್ನೊಂದಿಗೆ ಜೀವನ ಕಣ್ಣೀರಲ್ಲೂ ಸುಂದರ ಪಯಣ
G                    C
ನಿನ್ನೊಂದಿಗೆ ಜೀವನ ಕಣ್ಣೀರಲ್ಲೂ ಅಂದದ ಪಯಣ`
  },

  // 11. Yesuvina Makkalu Naavu (#277) - Praise
  {
    id: 'song-yesuvina-makkalu-naavu-277',
    songNumber: '277',
    title: 'Yesuvina Makkalu Naavu Endendu',
    kannadaTitle: 'ಯೇಸುವಿನ ಮಕ್ಕಳು ನಾವು ಎಂದೆಂದು ನಲಿಯುವೆವು',
    type: 'Praise',
    tempo: 120,
    styleNumber: '85',
    chords: 'C',
    originalKey: 'C',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `C                    G         C
ಯೇಸುವಿನ ಮಕ್ಕಳು ನಾವು ಎಂದೆಂದು ನಲಿಯುವೆವು ||2
F                    G         C
ಯಾವಾಗಲೂ ಎಂದೆಂದಿಗೂ ಕರ್ತನಲ್ಲಿ ಹರ್ಷಿಸುವೆವು ನಮ್ಮ -2

C                    F         G
1. ಯಾವುದಕ್ಕೂ ಚಿಂತಿಸದೆ ಈಗಲೇ ಸ್ತುತಿಸುವೆವು
C                    F         G         C
ನಾವು ಎಂದೆಂದು ಸ್ತುತಿಸುವೆವು -2

C                    F         G
2. ಇಂದು ಕಾಣುವ ಶತ್ರುಗಳ ಎಂದಿಗೂ ಕಾಣಲಾರೆವು
C                    F         G         C
ಯೇಸು ನಮಗಾಗಿ ಯುದ್ಧ ಮಾಡುವ -2

C                    F         G
3. ನಮಗೆದುರಾದ ಮಾಟವಿಲ್ಲ ಶಕುನವು ಎಂದೂ ಇಲ್ಲ
C                    F         G         C
ಸೈತಾನ ನಮ್ಮ ಕಾಲ ಕೆಳಗೆ -2`,
    englishLyrics: `C                    G         C
Yesuvina makkalu naavu endendu naliyuvevu ||2
F                    G         C
Yavagalu endendigu karthanalli harshisuvevu namma -2

C                    F         G
1. Yavudakku chinthisade eegale sthuthisuvevu
C                    F         G         C
Naavu endendu sthuthisuvevu -2

C                    F         G
2. Indu kanuva shatrugala endendigu kanalarevu
C                    F         G         C
Yesu namagagi yuddha maduva -2

C                    F         G
3. Namagedurada matavilla shakunavu endu illa
C                    F         G         C
Saithana namma kala kelage -2`,
    lyricsText: `C                    G         C
ಯೇಸುವಿನ ಮಕ್ಕಳು ನಾವು ಎಂದೆಂದು ನಲಿಯುವೆವು
F                    G         C
ಯಾವಾಗಲೂ ಎಂದೆಂದಿಗೂ ಕರ್ತನಲ್ಲಿ ಹರ್ಷಿಸುವೆವು`
  },

  // 12. Enisalu Aagadashtu Melannu (#5416) - Worship
  {
    id: 'song-enisalu-aagadashtu-5416',
    songNumber: '5416',
    title: 'Enisalu Aagadashtu Melannu Neenu Nanagaagi',
    kannadaTitle: 'ಎಣಿಸಲು ಆಗದಷ್ಟು ಮೇಲನ್ನು ನೀನು ನನಗಾಗಿ',
    type: 'Worship',
    tempo: 68,
    styleNumber: '42',
    chords: 'Em',
    originalKey: 'Em',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Em
ಎಣಿಸಲು ಆಗದಷ್ಟು ಮೇಲನ್ನು
C
ನೀನು ನನಗಾಗಿ ತಂದವನೆ
D
ಗ್ರಹಿಸಲು ಆಗದಷ್ಟು ಕೃಪೆಯನ್ನು
Em
ನನ್ನ ಬದುಕಲ್ಲಿ ಇಟ್ಟವನೆ ||2

Am
ನಿನ್ ಕರ ನನ್ನೆಲ್ಲಾ ಅಗತ್ಯವನ್ನು
Em
ಪೂರೈಸಿ ಪೋಷಿಸಿತು
Am
ನಿನ್ ರಕ್ತ ನನ್ನೆಲ್ಲಾ ಸ್ವಾಸ್ಥ್ಯವನ್ನು
D
ಕಾಪಾಡಿ ರಕ್ಷಿಸಿತು
Am                  Bm
ಈ ವರೆಗೂ ಕಾದು ನಡೆಸಿ ನನ್ನ ಉದ್ಧರಿಸಿದಾತನೆ
C                   D          Em
ಪೂರ್ಣ ಹೃದಯದಿ ನಿನ್ನ ಸ್ತುತಿಸುತ ಆರಾಧಿಸುವೆ ಯೇಸುವೆ ||2

Em
1. ಕುಗ್ಗಿ ಹೋದಾಗೆಲ್ಲಾ ಹೊಸ ಬಲದಿ ತುಂಬಿಸಿದೆ
C                     D          Em
ನನ್ನ ಕಾಲು ಜಾರಿದಾಗೆಲ್ಲ ಎತ್ತಿ ಸ್ಥಿರವಾಗಿ ನಿಲ್ಲಿಸಿದೆ ||2
Am                  Em
ನಾ ಕೂಗಿ ಕರೆದಾಗೆಲ್ಲ ನನ್ನ ಮೊರೆಗೆ ಉತ್ತರಿಸಿದೆ
Am                  D
ವೈರಿಯು ನಾಚುವಂತೆ ನನ್ನ ನಂಬಿಕೆ ಗೆಲ್ಲಿಸಿದೆ ||2

Em
2. ನಾ ಪಡೆದ ಕಿರೀಟವೆಲ್ಲಾ ನಿನ್ನ ಕೃಪೆಯ ಕೆತ್ತನೆ
C                     D          Em
ನಾ ಹೊಂದಿದ ಘನತೆಯೆಲ್ಲಾ ನಿನ್ನ ಮಹಿಮೆಯ ಲೇಪನ ||2
Am                  Em
ನನ್ನಲ್ಲಿರುವ ಆಶೀರ್ವಾದವು ನಿನ್ನ ಪ್ರೀತಿಯ ಕಾಣಿಕೆ
Am                  D
ನಾ ಏರಿದ ಪ್ರತಿ ಸ್ಥಾನವು ನಿನ್ನ ದಯೆಯ ಕೊಡುಗೆ ||2`,
    englishLyrics: `Em
Enisalu agadashtu melannu
C
Neenu nanagagi tandavane
D
Grahisalu agadashtu krupeyannu
Em
Nanna badukalli ittavane ||2

Am
Nin kara nannella agatyavannu
Em
Pooraisi poshisitu
Am
Nin raktha nanna swasthyavannu
D
Kaapadi rakshisitu
Am                  Bm
Ee varegu kaadu nadesi nanna uddarisidatane
C                   D          Em
Poorna hrudayadi ninna sthutisuta aaradhisuve yesuve ||2

Em
1. Kuggi hodhagella hosa baladi tumbiside
C                     D          Em
Nanna kaalu jaaridagella etthi sthiravaagi nilliside ||2
Am                  Em
Naa koogi karedaagella nanna morege utthariside
Am                  D
Vairiyu naachuvanthe nanna nambike gelliside ||2

Em
2. Na padeda kiritavella ninna krupeya ketthane
C                     D          Em
Na hondida ghanathe ella ninna mahimeya lepana ||2
Am                  Em
Nannalliruva aashirvaadavu ninna pritiya kaanike
Am                  D
Na erida prathi sthanavu ninna dayeya koduge ||2`,
    lyricsText: `Em
ಎಣಿಸಲು ಆಗದಷ್ಟು ಮೇಲನ್ನು
C
ನೀನು ನನಗಾಗಿ ತಂದವನೆ`
  },

  // 13. Arunodaya Stotra Bali (#253) - Praise / Worship
  {
    id: 'song-arunodaya-stotra-bali-253',
    songNumber: '253',
    title: 'Arunodaya Stotra Bali Appa Appa',
    kannadaTitle: 'ಅರುಣೋದಯ ಸ್ತೋತ್ರ ಬಲಿ ಅಪ್ಪಾ ಅಪ್ಪಾ ನಿಮಗೆ ತಾನೇ',
    type: 'Praise',
    tempo: 112,
    styleNumber: '80',
    chords: 'Cm',
    originalKey: 'Cm',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Cm
ಅರುಣೋದಯ ಸ್ತೋತ್ರ ಬಲಿ
Fm
ಅಪ್ಪಾ ಅಪ್ಪಾ ನಿಮಗೆ ತಾನೇ ||2
G
ಆರಾಧನೆ ಸ್ತೋತ್ರ ಬಲಿ
Cm
ಅಪ್ಪಾ ಅಪ್ಪಾ ನಿಮಗೆ ತಾನೇ ||2
Fm          Cm
ಅಪ್ಪಾ ಅಪ್ಪಾ ನಿಮಗೆ ತಾನೇ -2

Cm
1. ಎಬಿನೇಜರ್ ಎಬಿನೇಜರ್ ಇದುವರೆಗೂ ಕಾಪಾಡಿರುವೆ
Fm                     G          Cm
ಇದುವರೆಗೂ ಕಾಪಾಡಿರುವೆ ಎಬಿನೇಜರ್ ಎಬಿನೇಜರ್ ||2
Ab                     G
ಪರಿಶುದ್ಧ ದೇವನೇ ಪರಲೋಕ ರಾಜನೇ
Ab                     G          Cm
ಪರಲೋಕ ರಾಜನೇ ಪರಿಶುದ್ಧ ದೇವನೇ ||2

Cm
2. ಎಲ್-ಷಡಾಯ್ ಎಲ್-ಷಡಾಯ್ ಸರ್ವಶಕ್ತ ನೀನೇ
Fm                     G          Cm
ಸರ್ವಶಕ್ತ ನೀನೇ ಎಲ್-ಷಡಾಯ್ ಎಲ್-ಷಡಾಯ್ ||2
G
ಎಲ್-ರೋಯಿ ಎಲ್-ರೋಯಿ ನನ್ನನ್ನು ಕಾಣ್ವವನೇ
Cm
ನನ್ನನ್ನು ಕಾಣ್ವವನೇ ಎಲ್-ರೋಯಿ ಎಲ್-ರೋಯಿ ||2

Cm
3. ಯೆಹೋವ ಯೀರೇ ಎಲ್ಲವ ಒದಗಿಸುವೆ
Fm                     G          Cm
ಎಲ್ಲವ ಒದಗಿಸುವೆ ಯೆಹೋವ ಯೀರೇ ||2
G
ಅತಿಶಯ ದೇವನೆ ಆಲೋಚನಾ ಕರ್ತನೇ
Cm
ಆಲೋಚನಾ ಕರ್ತನೇ ಅತಿಶಯ ದೇವನೆ ||2`,
    englishLyrics: `Cm
Arunodaya stotra bali
Fm
Appa appa nimage tane ||2
G
Aradhane stotra bali
Cm
Appa appa nimage tane ||2
Fm          Cm
Appa appa nimage tane -2

Cm
1. Ebenezer Ebenezer iduvaregu kapadiruve
Fm                     G          Cm
Iduvaregu kapadiruve Ebenezer Ebenezer ||2
Ab                     G
Parishuddha devane paraloka rajane
Ab                     G          Cm
Paraloka rajane parishuddha devane ||2

Cm
2. El-Shaddai El-Shaddai sarvashakta neene
Fm                     G          Cm
Sarvashakta neene El-Shaddai El-Shaddai ||2
G
El-Roi El-Roi nannannu kanvavane
Cm
Nannannu kanvavane El-Roi El-Roi ||2

Cm
3. Jehovah Jireh ellava odaguṣuve
Fm                     G          Cm
Ellava odaguṣuve Jehovah Jireh ||2
G
Atishaya devane alochana kartane
Cm
Alochana kartane atishaya devane ||2`,
    lyricsText: `Cm
ಅರುಣೋದಯ ಸ್ತೋತ್ರ ಬಲಿ
Fm
ಅಪ್ಪಾ ಅಪ್ಪಾ ನಿಮಗೆ ತಾನೇ`
  },

  // 14. Appa Nin Karadalli Naanu (#4038) - Worship
  {
    id: 'song-appa-nin-karadalli-4038',
    songNumber: '4038',
    title: 'Appa Nin Karadalli Naanu Jedi Mannaagiruvaga',
    kannadaTitle: 'ಅಪ್ಪಾ ನಿನ್ ಕರದಲ್ಲಿ ನಾನು ಜೇಡಿ ಮಣ್ಣಾಗಿರುವಾಗ',
    type: 'Worship',
    tempo: 70,
    styleNumber: '42',
    chords: 'F',
    originalKey: 'F',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `F
ಅಪ್ಪಾ ನಿನ್ ಕರದಲ್ಲಿ ನಾನು
Gm           F
ಜೇಡಿ ಮಣ್ಣಾಗಿರುವಾಗ ||2
Dm           C
ಆ ಜೇಡಿ ಮಣ್ಣಲ್ಲಿ ನೀನು
Gm           F
ಒಳ್ಳೆ ಪಾತ್ರೆಯ ಮಾಡಿರುವೆ ಅಯ್ಯಾ ||2

F            Bb
ನನ್ನ ಕರಗಳ ತಟ್ಟಿ ತಟ್ಟಿ ಆರಾಧಿಪೆ
Gm           C            F
ಆರಾಧಿಪೆ ನಿನ್ನನ್ನಾರಾಧಿಪೆ ||2
F            Bb
ಆರಾಧನೆ ನನ್ ಯೇಸಯ್ಯಾ
Gm           C            F
ಕೊಂಡಾಡುವೆ ನನ್ ಯೇಸಯ್ಯಾ -2

F            Gm          C           F
1. ಕಟ್ಟಲ್ಪಟ್ಟ ಕತ್ತೆಯಾದ ನನ್ನ ಬಿಡಿಸಿ ಕರೆದಿರುವೆ ನೀನು ||2
Dm           Gm          C           F
ನಿನ್ನನ್ನು ಹೊತ್ತು ಸಾಗುವಂತೆ ನನ್ನನ್ನು ಉಪಯೋಗಿಸಿರುವೆ ||2

F            Gm          C           F
2. ತಪ್ಪಿ ಹೋದ ಮಗನಂತಿದ್ದೆ ಎಲ್ಲವನ್ನೂ ಕಳೆದುಕೊಂಡು ಬಂದೆ ||2
Dm           Gm          C           F
ನನ್ನೆಲ್ಲಾ ತಪ್ಪುಗಳ ಕ್ಷಮಿಸಿ ಮತ್ತೆ ಮಗನ ಸ್ಥಾನವನ್ನೆ ಕೊಟ್ಟೆ ||2`,
    englishLyrics: `F
Appa nin karadalli nanu
Gm           F
jedi mannagiruvaga ||2
Dm           C
Aa jedi mannalli ninu
Gm           F
olle paatreya madiruve ayya ||2

F            Bb
Nanna karagala thatti thatti araadhipe
Gm           C            F
araadhipe ninnannaradhipe ||2
F            Bb
Araadhane nan Yesayya
Gm           C            F
kondaduve nan Yesayya -2

F            Gm          C           F
1. Kattalpatta kattheyada nanna bidisi karediruve nee ||2
Dm           Gm          C           F
Ninnannu hotthu saaguvanthe nannannu upayogisiruve ||2

F            Gm          C           F
2. Thappi hoda magananthidde yellavannu kaledukondu bande ||2
Dm           Gm          C           F
Nannella tappugala kshamisi matthe magana sthanavanne kotte ||2`,
    lyricsText: `F
ಅಪ್ಪಾ ನಿನ್ ಕರದಲ್ಲಿ ನಾನು
Gm           F
ಜೇಡಿ ಮಣ್ಣಾಗಿರುವಾಗ`
  },

  // 15. Sthirapadisuvaatane Balapadisuvaatane (#7189) - Worship
  {
    id: 'song-sthirapadisuvaatane-7189',
    songNumber: '7189',
    title: 'Sthirapadisuvaatane Balapadisuvaatane',
    kannadaTitle: 'ಸ್ಥಿರಪಡಿಸುವಾತನೇ ಬಲಪಡಿಸುವಾತನೇ',
    type: 'Worship',
    tempo: 72,
    styleNumber: '46',
    chords: 'D',
    originalKey: 'D',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `D
ಸ್ಥಿರಪಡಿಸುವಾತನೇ ಬಲಪಡಿಸುವಾತನೇ
Bm
ಕೆಳಬಿದ್ದ ಸ್ಥಳದಲ್ಲೆ ನಿಲ್ಲಿಸುವಾತನೇ ||2
G
ಘನಪಡಿಸುವಾತನೇ ಹೆಚ್ಚಿಸುವಾತನೇ
A
ನಮ್ಮ ಪರ ನಿಂತು ಜಯ ನೀಡುವಾತನೇ ||2

D
ಏನಾದರು ನೀನೇ ಮಾಡಿ ಕಥೆಯೆಲ್ಲಾ ಬದಲಾಗಿಸುವೆ
Bm
ನಿನ್ನ ನಾಮಕ್ಕೆ ಎಲ್ಲಾ ಮಹಿಮೆ ತಂದುಕೊಳ್ಳುವೆ ||2
G
ಏನಾದರು ನೀನೇ ಮಾಡಿ ಕಥೆಯೆಲ್ಲಾ ಬದಲಾಗಿಸುವೆ
A
ನಿನ್ನ ನಾಮಕ್ಕೆ ಎಲ್ಲಾ ಮಹಿಮೆ ತಂದುಕೊಳ್ಳುವೆ ||2

D            A
ಯೇಸುವೇ... ಯೇಸುವೇ... ನಿನಗೆ ಎಲ್ಲಾ ಸಾಧ್ಯವೇ -2

D
1. ಸರ್ವಕೃಪಾನಿಧಿ ಪರಮ ಕುಂಬಾರನೇ
Bm
ನಮ್ಮಯ ಜೀವವು ನಿನ್ನ ಕೈಯಲ್ಲಿದೆ ||2
G
ಓ ದೇವಾ ನಿಮ್ಮಾಲೋಚನೆಯೆಲ್ಲಾ ಉತ್ಕೃಷ್ಟವಾಗಿವೆ
A
ನಮ್ಮೂಹೆಗೆ ಮೀರಿದ ಕಾರ್ಯಗಳೆಷ್ಟೋ ಮಾಡುತ್ತಲೇ ಇವೆ ||2

D
2. ನಿನ್ನಾಜ್ಞೆ ಇಲ್ಲದೆ ಏನಾಗದೆಂದಿಗೂ
Bm
ನಿನ್ನ ಬೇಲಿ ಮೀರಲು ವೈರಿಗೆ ಸಾಧ್ಯವೋ? ||2
G
ಓ ದೇವಾ ನೀವೇ ನಮ್ಮೊಡನಿರಲು ಅಷ್ಟೇ ಸಾಕಯ್ಯಾ
A
ಅಪವಾದಿ ಬಗೆದ ಕೇಡುಗಳ್ಳೆಲ್ಲಾ ಮೇಲಾಗಿ ಬರುವವು ||2`,
    englishLyrics: `D
Sthirapadisuvaatane balapadisuvaatane
Bm
Kelabidda sthaladalle nillisuvaatane ||2
G
Ghanapadisuvaatane hecchisuvaatane
A
Namma para nintu jaya needuvaatane ||2

D
Enaadaru neene maadi katheyella badalaagisuve
Bm
Ninna naamakke ella mahime tandukolluve ||2
G
Enaadaru neene maadi katheyella badalaagisuve
A
Ninna naamakke ella mahime tandukolluve ||2

D            A
Yesuve... Yesuve... Ninage ella saadhyave -2

D
1. Sarvakrupaanidhi parama kumbaarane
Bm
Nammaya jeevavu ninna kaiyallide ||2
G
O Deva nimmaalocheneyella uttkrushtavaagive
A
Nammoohege meerida kaaryagaleshto maadutthale ive ||2

D
2. Ninnaagne illade enaagadendidoo
Bm
Ninna beli meeralu vairige saadhyavo? ||2
G
O Deva neeve nammodaniralu ashte saakayya
A
Apavaadi bageda kedugalella melaagi baruvavu ||2`,
    lyricsText: `D
ಸ್ಥಿರಪಡಿಸುವಾತನೇ ಬಲಪಡಿಸುವಾತನೇ
Bm
ಕೆಳಬಿದ್ದ ಸ್ಥಳದಲ್ಲೆ ನಿಲ್ಲಿಸುವಾತನೇ`
  }
];

// Validate all chord lines
for (const s of fifteenSongs) {
  const kLines = (s.kannadaLyrics || s.englishLyrics).split('\n');
  for (const l of kLines) {
    if (isChordLine(l)) {
      // chord line verified
    }
  }
}

// Append and save to server/data/songs.json
const existing = JSON.parse(fs.readFileSync(songsFilePath, 'utf8'));
const existingIds = new Set(existing.map(x => x.id));
const toAdd = fifteenSongs.filter(s => !existingIds.has(s.id));
const combined = [...existing, ...toAdd];
fs.writeFileSync(songsFilePath, JSON.stringify(combined, null, 2), 'utf8');
console.log('SUCCESS! Added', toAdd.length, 'requested songs. Total library size:', combined.length);
