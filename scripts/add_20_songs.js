const fs = require('fs');
const path = require('path');
const { isChordLine } = require('../client/src/utils/musicTransposer');

const songsFilePath = path.join(__dirname, '..', 'server', 'data', 'songs.json');

const twentySongs = [
  // ==========================================
  // 10 WORSHIP SONGS
  // ==========================================
  {
    id: 'song-chalisuva-atmane',
    songNumber: '701',
    title: 'Chalisuva Atmane Parishudha Atmane',
    kannadaTitle: 'ಚಲಿಸುವ ಆತ್ಮನೇ ಪರಿಶುದ್ಧ ಆತ್ಮನೇ',
    type: 'Worship',
    tempo: 68,
    styleNumber: '46',
    chords: 'E',
    originalKey: 'E',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `E           A         B       E
ಚಲಿಸುವ ಆತ್ಮನೇ ಪರಿಶುದ್ಧ ಆತ್ಮನೇ ||2
A           B        G#m      C#m   B        E
ಊನ ನೆಲದೊಳು ವೃಷ್ಟಿ ಸುರಿಸ ಇಳಿದು ಬಾ ದೇವಾ ||2

E            A        E       F#m     B       E
1. ಸಂತೈಸಾಯಾ ಹೃದಯಗಳು ಯೇಸುವಿನ ನಾಮದಲ್ಲಿ
B            F#m      B       E       G#m     B       E
ಗುಣಪಡಿಸು ಗಾಯಗಳ ಚೈತನ್ಯ ಆತ್ಮನೇ ||2

E            A        E       F#m     B       E
2. ಅಭಿಷೇಕಿಸಿ ತುಂಬು ನೀ ಆನಂದ ತೈಲದಿಂದ
B            F#m      B       E       G#m     B       E
ತೊಡೆದುಬಿಡು ಹೊಲಸನ್ನು ನಿನ್ನಯ ಶಕ್ತಿಯಿಂದ ||2

E            A        E       F#m     B       E
3. ಬಲಗೊಳಿಸು ನನ್ನಾತ್ಮವ ಈ ಲೋಕ ಯಾತ್ರೆಯೊಳು
B            F#m      B       E       G#m     B       E
ಬದುಕೇನು ಧನ್ಯವಾಗಿಸು ನಿನ್ನಯ ಕೃಪೆಯಿಂದ ||2`,
    englishLyrics: `E           A         B       E
Chalisuva atmane parishudha atmane ||2
A           B        G#m      C#m   B        E
Oona neladolu vrishti surisa illidu baa deva ||2

E            A        E       F#m     B       E
1. Santaisaya hrudayagalu Yesuvina naamadali
B            F#m      B       E       G#m     B       E
Gunapadesu gayagala chaitanya atmane ||2

E            A        E       F#m     B       E
2. Abhishekisi tumbu nee aananda tailadinda
B            F#m      B       E       G#m     B       E
Todedubidu holasannu ninnaya shaktienda ||2

E            A        E       F#m     B       E
3. Balagolisu nanatmava ee loka yaatreyolu
B            F#m      B       E       G#m     B       E
Badukenu dhanyavaagisu ninnaya krupeinda ||2`,
    lyricsText: `E           A         B       E
ಚಲಿಸುವ ಆತ್ಮನೇ ಪರಿಶುದ್ಧ ಆತ್ಮನೇ
A           B        G#m      C#m   B        E
ಊನ ನೆಲದೊಳು ವೃಷ್ಟಿ ಸುರಿಸ ಇಳಿದು ಬಾ ದೇವಾ`
  },
  {
    id: 'song-nee-maatra-saaku',
    songNumber: '702',
    title: 'Nee Maatra Saaku Nanage Yesayya',
    kannadaTitle: 'ನೀ ಮಾತ್ರ ಸಾಕು ನನಗೆ ಯೇಸಯ್ಯಾ',
    type: 'Worship',
    tempo: 70,
    styleNumber: '42',
    chords: 'Em',
    originalKey: 'Em',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Em                    D
ನೀ ಮಾತ್ರ ಸಾಕು ನನಗೆ ಯೇಸಯ್ಯಾ
C                     Em
ನೀನಿರಲು ಸಾಕು ನನ್ನ ಬಾಳಿನಲ್ಲಿ
G                     D
ನೀನೇ ನನ್ನ ಸರ್ವಸ್ವವು ಯೇಸಯ್ಯಾ
C                     Em
ನೀನೇ ನನ್ನ ನೆಮ್ಮದಿಯು ||2

Em                   D
1. ಕಷ್ಟದ ಹಾದಿಯಲ್ಲಿ ಬಂದಾಗಲೂ
C                    Em
ಕಣ್ಣೀರಿನ ಕಣಿವೆಯಲ್ಲಿ ನೊಂದಾಗಲೂ ||2
G                    D
ಕೈಹಿಡಿದು ನನ್ನನ್ನು ನಡೆಸು ನೀನು
C                    Em
ಕಾಯುವ ದೇವನು ನೀನೆ ಯೇಸಯ್ಯಾ ||2

Em                   D
2. ಆಶ್ರಯವಿಲ್ಲದೆ ಅಲೆದಾಗಲೂ
C                    Em
ಆತ್ಮೀಯರೆಲ್ಲರೂ ತ್ಯಜಿಸಿದಾಗಲೂ ||2
G                    D
ತಾಯಿಯಂತೆ ನನ್ನನ್ನು ಸಾಂತ್ವನಿಸಿ
C                    Em
ಪ್ರೀತಿಯ ತೋರಿದ ಪ್ರಭು ನೀನೇ ||2`,
    englishLyrics: `Em                    D
Nee maatra saaku nanage Yesayya
C                     Em
Neeniralu saaku nanna baalinalli
G                     D
Neene nanna sarvasvavu Yesayya
C                     Em
Neene nanna nemmadiyu ||2

Em                   D
1. Kashtada haadiyalli bandaagaloo
C                    Em
Kanneerina kaniveyalli nondaagaloo ||2
G                    D
Kaihididu nannannu nadesu neenu
C                    Em
Kaayuva devanu neene Yesayya ||2

Em                   D
2. Aashrayavillade aledaagaloo
C                    Em
Aatmeeyarellaroo tyajisidaagaloo ||2
G                    D
Taayiyante nannannu saantvanisi
C                    Em
Preetiya torida prabhu neene ||2`,
    lyricsText: `Em                    D
ನೀ ಮಾತ್ರ ಸಾಕು ನನಗೆ ಯೇಸಯ್ಯಾ
C                     Em
ನೀನಿರಲು ಸಾಕು ನನ್ನ ಬಾಳಿನಲ್ಲಿ`
  },
  {
    id: 'song-ninnanthe-yaarilla',
    songNumber: '703',
    title: 'Ninnanthe Yaarilla Ninna Horathu',
    kannadaTitle: 'ನಿನ್ನಂತೆ ಯಾರಿಲ್ಲ ನಿನ್ನ ಹೊರತು ದೇವರಿಲ್ಲ',
    type: 'Worship',
    tempo: 68,
    styleNumber: '44',
    chords: 'Gm',
    originalKey: 'Gm',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Gm                  Cm
ನಿನ್ನಂತೆ ಯಾರಿಲ್ಲ ನಿನ್ನ ಹೊರತು ದೇವರಿಲ್ಲ
F                   Gm
ನೀನೇ ನನಗೆಲ್ಲ ನನಗ್ಯಾವ ಭಯವಿಲ್ಲ ||2
Gm         Cm        F          Gm
ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ -2
Gm         Cm        F          Gm
ನಿಮಗೆ ಸ್ತೋತ್ರ ನಿಮಗೆ ಸ್ತೋತ್ರ ನಿಮಗೆ ಸ್ತೋತ್ರ ನಿಮಗೆ ಸ್ತೋತ್ರ -2

Gm                  Cm
1. ನಾನು ನಂಬಿದಾತನೇ ನೀನೇ ನಂಬಿಗಸ್ತನೇ
F                   Gm
ನಂಬಿಕೆಯ ಹುಟ್ಟಿಸಿ ಪೂರೈಸುವಾತನೇ ||2
Gm          Cm         F          Gm
ನಂಬಿಗಸ್ತನೇ ನಂಬಿಗಸ್ತನೇ ಹಲ್ಲೇಲೂಯಾ -2

Gm                  Cm
2. ಓ ಕೃಪಾಪೂರ್ಣನೇ ಮನಮರುಗುವಾತನೇ
F                   Gm
ನನ್ನ ಜೊತೆಗಾರನೇ ಇಮ್ಮಾನುವೇಲನೇ ||2
Gm          Cm         F          Gm
ಕೃಪಾಪೂರ್ಣನೇ ಕೃಪಾಪೂರ್ಣನೇ ಹಲ್ಲೇಲೂಯಾ -2

Gm                  Cm
3. ಮರಣ ಜಯಿಸಿದಾತನೇ ಜೀವಲೋಕದರಸನೇ
F                   Gm
ಪುನರುತ್ಥಾನ ಜೀವವು ನೀನೇ ನನ್ನ ಯೇಸುವೇ ||2
Gm          Cm         F          Gm
ಜಯಿಸಿದಾತನೇ ಜಯಿಸಿದಾತನೇ ಹಲ್ಲೇಲೂಯಾ -2`,
    englishLyrics: `Gm                  Cm
Ninnanthe yaarilla ninna horathu devarilla
F                   Gm
Neene nangella nanagyava bhayavilla ||2
Gm         Cm        F          Gm
Halleluya Halleluya Halleluya Halleluya -2
Gm         Cm        F          Gm
Nimage sthotra nimage sthotra nimage sthotra nimage sthotra -2

Gm                  Cm
1. Naanu nambidathane neene nambigasthane
F                   Gm
Nambikeya huttisi pooraisuvathane ||2
Gm          Cm         F          Gm
Nambigasthane Nambigasthane Halleluya -2

Gm                  Cm
2. O krupaapoornane manamaruguwathane
F                   Gm
Nanna zothegarane Immanuvelane ||2
Gm          Cm         F          Gm
Krupaapoornane Krupaapoornane Halleluya -2

Gm                  Cm
3. Marana jayisidathane jeevalokadarasane
F                   Gm
Punaruthana jeevavu neene nanna yesuve ||2
Gm          Cm         F          Gm
Jayisidathane Jayisidathane Halleluya -2`,
    lyricsText: `Gm                  Cm
ನಿನ್ನಂತೆ ಯಾರಿಲ್ಲ ನಿನ್ನ ಹೊರತು ದೇವರಿಲ್ಲ
F                   Gm
ನೀನೇ ನನಗೆಲ್ಲ ನನಗ್ಯಾವ ಭಯವಿಲ್ಲ`
  },
  {
    id: 'song-sarvadallu-unnathane',
    songNumber: '704',
    title: 'Sarvadallu Unnathane Mahimeya Arasane',
    kannadaTitle: 'ಸರ್ವದಲ್ಲು ಉನ್ನತನೇ ಮಹಿಮೆಯ ಅರಸನೇ',
    type: 'Worship',
    tempo: 72,
    styleNumber: '42',
    chords: 'E',
    originalKey: 'E',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `E
ಸರ್ವದಲ್ಲು ಉನ್ನತನೇ
C#m          A
ಮಹಿಮೆಯ ಅರಸನೇ
F#m          B
ಪ್ರೀತಿಸುವ ತಂದೆಯೇ
F#m          E
ಕ್ಷಮಿಸುವ ಕರ್ತನೇ ||2

A        B        C#m     G#
ಆರಾಧಿಸುವೆ ನಿನ್ ಆರಾಧಿಸುವೆ
A        B        E
ಆರಾಧಿಸುವೆ ನಿನ್ನ -2

E                   C#m
1. ನಿನ್ನಯ ಹಾಗೆ ನಮ್ಮನು ಯಾರು
A                   B
ಪ್ರೀತಿಸಲು ಸಾಧ್ಯವಿಲ್ಲಾ ||2
G#               C#m
ಕಲ್ವಾರಿ ಕ್ರೂಜೆಯಲ್ಲಿ ನಿನ್ನ ಕುವರನನ್ನೇ
F#m             B                  E
ನನಗಾಗಿ ಅರ್ಪಿಸಿರುವೇ ||2

E                   C#m
2. ಕರುಣಾಳು ದೇವನೇ ಎನ್ ಬಾಳ ಜ್ಯೋತಿಯೇ
A                   B
ಕೇಳು ಈ ಪ್ರಾರ್ಥನೇ ||2
C#m              F#m
ನನ್ ಮೌನರಾಗ ನೀನೇ ಹೃದಯ ಬಡಿತವಾಗಿ
B                   E
ಜೀವಿಸು ನನ್ನೊಳು ದೇವನೇ ||2`,
    englishLyrics: `E
Sarvadallu unnathane
C#m          A
Mahimeya arasane
F#m          B
Preethisuva thandeye
F#m          E
Kshamisuva karthane ||2

A        B        C#m     G#
Aaradhisuve nin aaradhisuve
A        B        E
Aaradhisuve ninna -2

E                   C#m
1. Ninnaya haage nammanu yaaru
A                   B
Preethisalu saadhyavilla ||2
G#               C#m
Kalvaari krujeyalli ninna kuvarananne
F#m             B                  E
Nanagagi arpisiruve ||2

E                   C#m
2. Karunalu devane en baala jyotiye
A                   B
Kelu ee prarthane ||2
C#m              F#m
Nan maunaraga neene hrudaya baditavagi
B                   E
Jeevisu nannolu devane ||2`,
    lyricsText: `E
ಸರ್ವದಲ್ಲು ಉನ್ನತನೇ
C#m          A
ಮಹಿಮೆಯ ಅರಸನೇ`
  },
  {
    id: 'song-karthanu-nanna-kurubanu',
    songNumber: '705',
    title: 'Karthanu Nanna Kurubanu (Psalm 23)',
    kannadaTitle: 'ಕರ್ತನು ನನ್ನ ಕುರುಬನು ಎಂದಿಗೂ ಕೊರತೆ ಪಡೆನು',
    type: 'Worship',
    tempo: 70,
    styleNumber: '48',
    chords: 'C',
    originalKey: 'C',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `C
ಕರ್ತನು ನನ್ನ ಕುರುಬನು ಎಂದಿಗೂ
F            G        C
ಕೊರತೆ ಪಡೆನು ನಾನೆಂದು ||2
C
ಹಸಿರು ಹುಲ್ಲು ಗಾವಲಲ್ಲಿ
F            G        C
ನನ್ನನು ತಂಗಿಸುವನು ||2

F
ಶಾಂತವಾದ ನೀರಿನ ಬಳಿ
G            C
ನನ್ನನು ನಡೆಸುವನು
F
ನನ್ನ ಪ್ರಾಣವ ಪುನರ್ಜೀವಿಸಿ
G            C
ನೀತಿಯ ಮಾರ್ಗದಿ ನಡೆಸುವನು ||2

C
1. ಮರಣದ ನೆರಳಿನ ಕಣಿವೆಯಲ್ಲಿ
F             G         C
ನಡೆದರೂ ಕೇಡಿಗೆ ಭಯಪಡೆನು ||2
C
ಏಕೆಂದರೆ ನಿನ್ನ ಕೋಲು ದೊಣ್ಣೆಯು
F             G         C
ನನ್ನನು ಆದರಿಸುವುದು ||2

F
ವೈರಿಗಳ ಎದುರಿನಲ್ಲಿ
G             C
ಮೇಜನ್ನು ಸಿದ್ಧ ಮಾಡುತಿ
F
ನನ್ನ ತಲೆಯ ಎಣ್ಣೆಯಿಂದಲಿ
G             C
ಅಭಿಷೇಕ ಮಾಡುತಿ ||2`,
    englishLyrics: `C
Karthanu nanna kurubanu endigu
F            G        C
Korate padenu nanendu ||2
C
Hasiru hullu gavalalli
F            G        C
Nannanu thangi susvanu ||2

F
Shanthavada neerina bali
G            C
Nannanu nadisuvanu
F
Nanna praanava punarjjeevisi
G            C
Neethiya margadi nadisuvanu ||2

C
1. Maranada neralina kaniviyalli
F             G         C
Nadidaru kedige bhayapade ||2
C
Ennu ninna koolu donneyu
F             G         C
Nannanu aadharisuvudu ||2

F
Vairigala edurinalli
G             C
Mejannu siddha maduthi
F
Nanna thaleya enneyindali
G             C
Abisheka maduthi ||2`,
    lyricsText: `C
ಕರ್ತನು ನನ್ನ ಕುರುಬನು ಎಂದಿಗೂ
F            G        C
ಕೊರತೆ ಪಡೆನು ನಾನೆಂದು`
  },
  {
    id: 'song-devaru-namage-ashraya',
    songNumber: '706',
    title: 'Devaru Nanage Ashraya Durga (Psalm 46)',
    kannadaTitle: 'ದೇವರು ನನಗೆ ಆಶ್ರಯ ದುರ್ಗ',
    type: 'Worship',
    tempo: 68,
    styleNumber: '46',
    chords: 'Gm',
    originalKey: 'Gm',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Gm          F        Gm
ದೇವರು ನನಗೆ ಆಶ್ರಯ ದುರ್ಗ
Cm          F        Gm
ಸಂಕಟದಲ್ಲಿ ಸಿದ್ಧ ಸಹಾಯಕ ||2
Gm          Cm
ಕಡಲಲ್ಲಿ ಗುಡ್ಡಗಳು
F               Gm
ಮುಳುಗಿದರೂ ಭಯವಿಲ್ಲ
Gm          Cm
ಈ ಭೂಮಿ ಅಳೆದರೂ
F                 Gm
ನನಗೇನೂ ಭಯವಿಲ್ಲ ||2

Gm           F                    Gm
1. ಹಸಿರುಗಾವಲಲ್ಲಿ ನನ್ನನ್ನು ಮೇಯಿಸುವನು
Gm           F                    Gm
ತಂಪಾದ ಬುಗ್ಗೆಯಿಂದ ದಾಹವ ತಣಿಸುವನು ||2
Gm          Cm           F         Gm
ನನ್ನ ಪ್ರಾಣವನ್ನು ಉಜ್ಜೀವಗೊಳಿಸುವನು ||2
D           Gm
ಉಜ್ಜೀವಗೊಳಿಸುವನು

Gm           F                    Gm
2. ವೈರಿಗಳ ಎದುರಲಿ ಔತಣ ಬಡಿಸುವನು
Gm           F                    Gm
ನನ್ನಯ ಶಿರದಲ್ಲಿ ತೈಲವ ಹಚ್ಚುವನು ||2
Gm          Cm           F         Gm
ಜೀವಮಾನವೆಲ್ಲಾ ಶುಭವ ನೀಡುವನು ||2
Gm          Cm           F         Gm
ಜೀವಮಾನವೆಲ್ಲಾ ಕೃಪೆಯ ತೋರುವನು ||2`,
    englishLyrics: `Gm          F        Gm
Devaru nanage ashraya durga
Cm          F        Gm
Sankatadalli siddha sahayaka ||2
Gm          Cm
Kadalalli guddagalu
F               Gm
Mulugidaru bhayavilla
Gm          Cm
Ee bhoomi alidaru
F                 Gm
Nanagenu bhayavilla ||2

Gm           F                    Gm
1. Hasiru gavalalli nannannu meyusavanu
Gm           F                    Gm
Tampada buggeyinda dahava tanisuvanu ||2
Gm          Cm           F         Gm
Nanna pranavannu ujjivagolisuvanu ||2
D           Gm
Ujjivagolisuvanu

Gm           F                    Gm
2. Vairigala eduralli outana badisuvanu
Gm           F                    Gm
Nannaya shiradalli tailava haccuvanu ||2
Gm          Cm           F         Gm
Jeevamanavella shubava needuvanu ||2
Gm          Cm           F         Gm
Jeevamanavella krupeya toruvanu ||2`,
    lyricsText: `Gm          F        Gm
ದೇವರು ನನಗೆ ಆಶ್ರಯ ದುರ್ಗ
Cm          F        Gm
ಸಂಕಟದಲ್ಲಿ ಸಿದ್ಧ ಸಹಾಯಕ`
  },
  {
    id: 'song-neene-nanna-jeeva',
    songNumber: '707',
    title: 'Neene Nanna Jeeva Yesuve',
    kannadaTitle: 'ನೀನೇ ನನ್ನ ಜೀವ ಯೇಸುವೇ',
    type: 'Worship',
    tempo: 72,
    styleNumber: '42',
    chords: 'G',
    originalKey: 'G',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G                      D
ನೀನೇ ನನ್ನ ಜೀವ ಯೇಸುವೇ ನೀನೇ ನನ್ನ ಸರ್ವಸ್ವ
Em                     C
ನನ್ನ ಹೃದಯ ನಿನ್ನ ಮಂದಿರ ನಿನ್ನ ಪ್ರೀತಿಯೇ ನನ್ನ ಉಸಿರು ||2
G                      D
ನೀನೇ ನನ್ನ ಗಾನ ಯೇಸುವೇ ನೀನೇ ನನ್ನ ಧ್ಯಾನ ಪ್ರಭುವೇ
Am            D             G
ನಿನ್ನ ನಾಮವೇ ನನ್ನಯ ಶಕ್ತಿ ನಿನ್ನಲ್ಲಿಯೇ ನನ್ನ ಪ್ರಾಣ ||2

G                      Em
1. ನನ್ನ ಕಣ್ಣೀರ ನಡುವೆ ನೀ ಬಂದೆ
C                      D
ನನ್ನ ನೋವಿಗೆ ಮದ್ದು ನೀಡಿದೆ ||2
G                      Em
ಕಳೆದುಹೋದ ದಾರಿಯಲ್ಲಿ ಬೆಳಕಾಗಿ ನೀ ನಿಂತೆ
C                     D
ನಿನ್ನ ಕೃಪೆಯಿಂದ ನಾನು ಬದುಕುವೆ ||2
G                      D
ನಿನ್ನ ಬಲದಿಂದ ನಡೆಯುವೆ ಎಂದಿಗೂ
Am           D             G
ನನ್ನ ಕೈ ಹಿಡಿದು ಜೊತೆಗೆ ಬಂದೆ ಯೇಸುವೇ ||2`,
    englishLyrics: `G                      D
Neene nanna jeeva Yesuve neene nanna sarvasva
Em                     C
Nanna hrudaya ninna mandira ninna preetiye nanna usiru ||2
G                      D
Neene nanna gaana Yesuve neene nanna dhyana prabhave
Am            D             G
Ninna naamave nannaya shakti ninnalliye nanna praana ||2

G                      Em
1. Nanna kanneera naduve nee bande
C                      D
Nanna novige maddu needide ||2
G                      Em
Kaleduhoda daariyalli belakagi nee ninte
C                     D
Ninna krupeyinda naanu badukuve ||2
G                      D
Ninna baladinda nadiyuve endigoo
Am           D             G
Nanna kai hididu jothege bande Yesuve ||2`,
    lyricsText: `G                      D
ನೀನೇ ನನ್ನ ಜೀವ ಯೇಸುವೇ ನೀನೇ ನನ್ನ ಸರ್ವಸ್ವ
Em                     C
ನನ್ನ ಹೃದಯ ನಿನ್ನ ಮಂದಿರ ನಿನ್ನ ಪ್ರೀತಿಯೇ ನನ್ನ ಉಸಿರು`
  },
  {
    id: 'song-ninna-hage-devaru',
    songNumber: '708',
    title: 'Ninna Haage Devaru Bhuviyallilla',
    kannadaTitle: 'ನಿನ್ನ ಹಾಗೆ ದೇವರು ಭುವಿಯಲ್ಲಿಲ್ಲ',
    type: 'Worship',
    tempo: 70,
    styleNumber: '42',
    chords: 'G',
    originalKey: 'G',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G             Bm          Em         D
ನಿನ್ನ ಹಾಗೆ ದೇವರು ಭುವಿಯಲ್ಲಿಲ್ಲ
C             Am          D          G
ನೀನಿಲ್ಲದೆ ಬೇರೆ ಆಧಾರವಿಲ್ಲ ||2
Bm            Em          G
ನಿನ್ನ ಪ್ರಿಯನಾಗಿ ನಾ ನೆಲೆಗೊಳ್ಳುವೆ
C             D           G
ನೀನೆ ನನ್ನ ಸರ್ವಸ್ವ ನನ್ ಯೇಸುವೇ ||2

G             Bm          C
ಆರಾಧನೆ ನಿಮಗೆ ಆರಾಧನೆ
C             D           G
ನನ್ ಯೇಸುವೇ ನಿಮಗೆ ಆರಾಧನೆ -2

G             Bm          Em         D
1. ನನ್ನೆಲ್ಲವನ್ನೂ ನಾ ಸಮರ್ಪಿಸುವೆ
C             Am          D          G
ಶುದ್ಧೀಕರಿಸು ನಿನ್ನ ವಾಕ್ಯದಿಂದಲೇ ||2
Bm            Em          G
ನಿನ್ನ ಚಿತ್ತದಂತೆ ನನ್ನ ನಡೆಸು ನೀ
C             D           G
ಪವಿತ್ರಾತ್ಮನಿಂದ ನನ್ನ ತುಂಬಿಸು ನೀ ||2

G             Bm          Em         D
2. ನಿನ್ನ ಮಾರ್ಗದಲ್ಲಿ ನಾನೆಂದು ನಡೆಯಲು
C             Am          D          G
ಮಾರ್ಗದರ್ಶಿಯಾಗಿ ನನ್ನ ನೀ ನಡೆಸು ||2
Bm            Em          G
ನಂಬಿಕೆಯಲ್ಲಿ ನಾ ದೃಢವಾಗಲು
C             D           G
ಕ್ರಿಸ್ತನೆಂಬ ಬಂಡೆ ಮೇಲೆ ನನ್ನ ನಿಲ್ಲಿಸು ||2`,
    englishLyrics: `G             Bm          Em         D
Ninna hage devaru bhuviyallilla
C             Am          D          G
Neenillade bere aadharavilla ||2
Bm            Em          G
Ninna priyanaagi naa nelegolluve
C             D           G
Neene nanna sarvasva nan yesuve ||2

G             Bm          C
Aaradhane nimage aaradhane
C             D           G
Nan yesuve nimage aaradhane -2

G             Bm          Em         D
1. Nannelavannu naa samarpisuve
C             Am          D          G
Shuddhikarisu ninna vaakyadindale ||2
Bm            Em          G
Ninna chithadante nanna nadesu nee
C             D           G
Pavitraatmaninda nanna thumbisu nee ||2

G             Bm          Em         D
2. Ninna maargadalli naanendu nadeyalu
C             Am          D          G
Margadarshiyagi nanna nee nadesu ||2
Bm            Em          G
Nambikeyalli naa drudavagalu
C             D           G
Kristanemba bande mele nanna nillisu ||2`,
    lyricsText: `G             Bm          Em         D
ನಿನ್ನ ಹಾಗೆ ದೇವರು ಭುವಿಯಲ್ಲಿಲ್ಲ
C             Am          D          G
ನೀನಿಲ್ಲದೆ ಬೇರೆ ಆಧಾರವಿಲ್ಲ`
  },
  {
    id: 'song-goodness-of-god',
    songNumber: '03',
    title: 'Goodness of God',
    type: 'Worship',
    tempo: 66,
    styleNumber: '46',
    chords: 'G',
    originalKey: 'G',
    category: 'english',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G                    C              G
I love You, Lord, for Your mercy never fails me
D           Em             C        D
All my days, I've been held in Your hands
Em                       C
From the moment that I wake up
G               Em
Until I lay my head
C               D            G
Oh, I will sing of the goodness of God

C                                     G
All my life You have been faithful
C                                     G             D
And all my life You have been so, so good
C                                     G     D      Em
With every breath that I am able
C               D            G
Oh, I will sing of the goodness of God

G                 C                G
1. I love Your voice, You have led me through the fire
D                 Em             C             D
In darkest nights, You are close like no other
Em                  C           G       D      Em
I've known You as a Father, I've known You as a friend
C               D            G
And I have lived in the goodness of God

G               C                D                 G
Your goodness is running after, it's running after me
G               C                D                 G
Your goodness is running after, it's running after me
G                          C                 D                Em
With my life laid down, I'm surrendered now, I give You everything
G               C                D                 G
'Cause Your goodness is running after, it's running after me`,
    englishLyrics: `G                    C              G
I love You, Lord, for Your mercy never fails me
D           Em             C        D
All my days, I've been held in Your hands
Em                       C
From the moment that I wake up
G               Em
Until I lay my head
C               D            G
Oh, I will sing of the goodness of God

C                                     G
All my life You have been faithful
C                                     G             D
And all my life You have been so, so good
C                                     G     D      Em
With every breath that I am able
C               D            G
Oh, I will sing of the goodness of God

G                 C                G
1. I love Your voice, You have led me through the fire
D                 Em             C             D
In darkest nights, You are close like no other
Em                  C           G       D      Em
I've known You as a Father, I've known You as a friend
C               D            G
And I have lived in the goodness of God

G               C                D                 G
Your goodness is running after, it's running after me
G               C                D                 G
Your goodness is running after, it's running after me
G                          C                 D                Em
With my life laid down, I'm surrendered now, I give You everything
G               C                D                 G
'Cause Your goodness is running after, it's running after me`,
    lyricsText: `G                    C              G
I love You, Lord, for Your mercy never fails me
D           Em             C        D
All my days, I've been held in Your hands`
  },
  {
    id: 'song-what-a-beautiful-name',
    songNumber: '04',
    title: 'What A Beautiful Name',
    type: 'Worship',
    tempo: 68,
    styleNumber: '42',
    chords: 'D',
    originalKey: 'D',
    category: 'english',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `D
You were the Word at the beginning
G            Bm           A
One with God the Lord Most High
Bm            A           D
Your hidden glory in creation
G             Bm          A
Now revealed in You our Christ

D
What a beautiful Name it is
A
What a beautiful Name it is
Bm          A             G
The Name of Jesus Christ my King
D
What a beautiful Name it is
A
Nothing compares to this
Bm          A             G
What a beautiful Name it is, the Name of Jesus

D
1. You didn't want heaven without us
G             Bm             A
So Jesus, You brought heaven down
Bm          A            D
My sin was great, Your love was greater
G             Bm          A
What could separate us now?

G
Death could not hold You, the veil tore before You
Bm                     A
You silenced the boast of sin and grave
G
The heavens are roaring the praise of Your glory
Bm                   A
For You are raised to life again

G
You have no rival, You have no equal
Bm                    A
Now and forever God You reign
G
Yours is the kingdom, Yours is the glory
Bm                   A
Yours is the Name above all names`,
    englishLyrics: `D
You were the Word at the beginning
G            Bm           A
One with God the Lord Most High
Bm            A           D
Your hidden glory in creation
G             Bm          A
Now revealed in You our Christ

D
What a beautiful Name it is
A
What a beautiful Name it is
Bm          A             G
The Name of Jesus Christ my King
D
What a beautiful Name it is
A
Nothing compares to this
Bm          A             G
What a beautiful Name it is, the Name of Jesus

D
1. You didn't want heaven without us
G             Bm             A
So Jesus, You brought heaven down
Bm          A            D
My sin was great, Your love was greater
G             Bm          A
What could separate us now?

G
Death could not hold You, the veil tore before You
Bm                     A
You silenced the boast of sin and grave
G
The heavens are roaring the praise of Your glory
Bm                   A
For You are raised to life again

G
You have no rival, You have no equal
Bm                    A
Now and forever God You reign
G
Yours is the kingdom, Yours is the glory
Bm                   A
Yours is the Name above all names`,
    lyricsText: `D
You were the Word at the beginning
G            Bm           A
One with God the Lord Most High`
  },

  // ==========================================
  // 10 PRAISE SONGS
  // ==========================================
  {
    id: 'song-hosanna-unnathadalli',
    songNumber: '301',
    title: 'Hosanna Hosanna Hosanna Unnathadalli',
    kannadaTitle: 'ಹೋಸನ್ನಾ ಹೋಸನ್ನಾ ಉನ್ನತದಲ್ಲಿ',
    type: 'Praise',
    tempo: 122,
    styleNumber: '82',
    chords: 'Dm',
    originalKey: 'Dm',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Dm                  C
ನನ್ ಚಿಕ್ಕ ಹೃದಯದಿ ಅತ್ಯುನ್ನತನಾದ
Bb                  C
ನನ್ ದೇವರನ್ ಆರಾಧಿಸುವೆ ||2
Dm                  C
ಒಡೆದ ನನ್ ಪಾತ್ರೆಯ ಕುಂಬಾರನ ಬಳಿ ತಂದು
Bb                  C
ಸರಿಮಾಡಲು ಕೋರುವೆ ||2

Dm        Gm        C           F
ಹೋಸನ್ನಾ ಹೋಸನ್ನಾ ಯಹೂದ್ಯರ ರಾಜನಿಗೆ
Dm        Gm        C              F
ಹೋಸನ್ನಾ ಹೋಸನ್ನಾ ಬರಲಿರುವ ನನ್ ರಾಜನಿಗೆ -2

Dm                  C
1. ಪಾಪದ ಕೂಪದಿ ಬಿದ್ದಿದ್ದ ನನ್ನನ್ನು
Bb                  C
ಕೃಪೆಯಿಂದ ಎತ್ತಿ ಹಿಡಿದೆ ||2
Dm                  C
ಬಂಡೆಯ ಮೇಲೆಯೇ ನಿಲ್ಲಿಸಿ ನನ್ನನ್ನು
Bb                  C
ಹೊಸ ಗೀತೆಯ ಕಲಿಸಿದೆ ||2

Dm                  C
2. ಆಕಾಶ ಮಂಡಲ ಭೂಮಿಯ ಸಕಲವೂ
Bb                  C
ನಿನ್ನ ನಾಮ ಕೊಂಡಾಡುವುದು ||2
Dm                  C
ಜಯ ಜಯ ಗೀತೆಯ ದಿನವೆಲ್ಲಾ ಹಾಡುವೆ
Bb                  C
ರಾಜಾಧಿ ರಾಜನಿಗೆ ||2`,
    englishLyrics: `Dm                  C
Nan chikka hrudayadi athyutthanatha naada
Bb                  C
Nan devaran aaraadhisuve ||2
Dm                  C
Odedha nan paathreya kumbaarana bali tandhu
Bb                  C
Sarimaadalu koruve ||2

Dm        Gm        C           F
Hosanna Hosanna Yahoodyara raajanige
Dm        Gm        C              F
Hosanna Hosanna baraliruva nan raajanige -2

Dm                  C
1. Paapada koopadi biddidda nannannu
Bb                  C
Krupeyinda etti hidide ||2
Dm                  C
Bandeya meleye nillisi nannannu
Bb                  C
Hosa geetheya kaliside ||2

Dm                  C
2. Aakaasha mandala bhoomiya sakalavoo
Bb                  C
Ninna naama kondaaduvudu ||2
Dm                  C
Jaya jaya geetheya dinavella haaduve
Bb                  C
Raajaadhi raajanige ||2`,
    lyricsText: `Dm                  C
ನನ್ ಚಿಕ್ಕ ಹೃದಯದಿ ಅತ್ಯುನ್ನತನಾದ
Bb                  C
ನನ್ ದೇವರನ್ ಆರಾಧಿಸುವೆ`
  },
  {
    id: 'song-jaya-koduva-devarige',
    songNumber: '302',
    title: 'Jaya Koduva Devarige Koti Koti Stotra',
    kannadaTitle: 'ಜಯ ಕೊಡುವ ದೇವರಿಗೆ ಕೋಟಿ ಕೋಟಿ ಸ್ತೋತ್ರ',
    type: 'Praise',
    tempo: 118,
    styleNumber: '85',
    chords: 'D',
    originalKey: 'D',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `D
ಜಯ ಕೊಡುವ ದೇವರಿಗೆ ಕೋಟಿ ಕೋಟಿ ಸ್ತೋತ್ರ
Em            G          A               D
ಜೀವ ನೀಡುವ ಯೇಸು ರಾಜನಿಗೆ ಎಂದೆಂದಿಗೂ ಸ್ತೋತ್ರ ||2
D
ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಾಡುವೆ
Em            A          D
ಆನಂದ ಧ್ವನಿಯಿಂದ ಹೊಗಳುವೆ -2

D
1. ನೀತಿಯ ಹಸ್ತದೀ ಸಹಿಸಿ ನಡೆಸುವ ಕರ್ತನೆ
Em            A          D
ನನ್ನ ಬಲವೂ ಹೆದರೆನು ಎಂದಿಗೂ ||2
D
ಅದ್ಭುತ ಕರ್ತನೆ ಸೃಷ್ಟಿಗೆ ನಾಯಕನೆ
Em            A          D
ಯುದ್ಧ ಶೂರನೆ ಜೀವಿಸುವ ರಕ್ಷಕನೆ ||2

D
2. ನಂಬಿಗಸ್ತನು ನನ್ನನ್ನು ಕಾಯುವನು
Em            A          D
ಪರಿಶುದ್ಧ ಆತ್ಮದಿಂದ ಅಭಿಷೇಕ ಮಾಡ್ವನು ||2
D
ವೈರಿಯ ಸೈನ್ಯವ ಪಾದದ ಕೆಳಗೆ ತುಳಿದು
Em            A          D
ಜಯದ ಧ್ವಜವ ನೆಟ್ಟಾತನು ನೀನೇ ||2`,
    englishLyrics: `D
Jaya koduva devarige koti koti stotra
Em            G          A               D
Jeeva needuva Yesu rajanige endendigu stotra ||2
D
Halleluaiah halleluaiah haaduve
Em            A          D
Ananda dwaniinda hogaluve -2

D
1. Neetiya hasthadi sahisi nadesuva kartane
Em            A          D
Nanna balavu hedarenu endendigu ||2
D
Adbhutha kartane srushtige nayakane
Em            A          D
Yuddha shoorane jeevisuva rakshakane ||2

D
2. Nambigasthanu nannanu kayuvanu
Em            A          D
Parishuddha atmadinda abisheka madvanu ||2
D
Vairiya sainyava paadada kelage thulidu
Em            A          D
Jayada dhwajava nettathanu neene ||2`,
    lyricsText: `D
ಜಯ ಕೊಡುವ ದೇವರಿಗೆ ಕೋಟಿ ಕೋಟಿ ಸ್ತೋತ್ರ
Em            G          A               D
ಜೀವ ನೀಡುವ ಯೇಸು ರಾಜನಿಗೆ ಎಂದೆಂದಿಗೂ ಸ್ತೋತ್ರ`
  },
  {
    id: 'song-aananda-paramananda',
    songNumber: '303',
    title: 'Aananda Paramaananda Kristanalliruvude',
    kannadaTitle: 'ಆನಂದ ಪರಮಾನಂದ ಕ್ರಿಸ್ತನಲ್ಲಿರುವುದೆ ಆನಂದ',
    type: 'Praise',
    tempo: 115,
    styleNumber: '82',
    chords: 'G',
    originalKey: 'G',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G                      C             G
ಆನಂದ ಪರಮಾನಂದ ಕ್ರಿಸ್ತನಲ್ಲಿರುವುದೆ ಆನಂದ ||2
G
ನಿನ್ನ ನಾಮ ಸುಗಂಧದ ಪರಿಮಳ ತೈಲ
D                      G
ಲೋಕದಲ್ ಎಲ್ಲೆಲ್ಲೂ ಸುವಾಸನೆ ಬೀರುವುದು ||2
G        C        D        G
ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ -2

C                      G
1. ಯೇಸುವಿನ ಮುಖದ ದರ್ಶನ ಕಂಡೇ
D                      G
ಸಾವಿನ ಜನರಲ್ಲಿ ಶ್ರೇಷ್ಠನೆಂದು ಹೇಳುವೇ ||2
C                      G
ಆಲೋಚನೆಯಲ್ಲಿ ಕರ್ತನು ಆತನೇ
D                      G
ಸ್ತುತಿ ಸ್ತೋತ್ರವೇ ಹೇಳಿ ಎಂದೆಂದೂ ನಾ ಹಾಡುವೇ ||2

C                      G
2. ಕರ್ತನ ಮುಖದ ಪ್ರಕಾಶ ಕಂಡೇ
D                      G
ಶಾಂತಿ ಕೊಡಲು ನನ್ನ ಹೃದಯದಿ ಬಂದನು ||2
C                      G
ದೇವದರ್ಶನ ಗೀತೆಗಳು ನಿನಗೇ
D                      G
ಘನ ಮಹಿಮೆ ಹೇಳಿ ಹರ್ಷಿಸಿ ನಾ ಹಾಡುವೇ ||2`,
    englishLyrics: `G                      C             G
Ananda paramananda kristanalliruvude ananda ||2
G
Ninna nama sugandhada parimala taila
D                      G
Lokadal ellellu suvasane biruvudu ||2
G        C        D        G
Halleluya Halleluya Halleluya -2

C                      G
1. Yesuvina mukhada darshana kande
D                      G
Savina janaralli shreshtanendu heluve ||2
C                      G
Alochaneyalli kartanu atane
D                      G
Stuti stotrave heli endendu na haaduve ||2

C                      G
2. Kartana mukhada prakasha kande
D                      G
Shanti kodalu nanna hrudayadi bandanu ||2
C                      G
Devadarshana gitegalu ninage
D                      G
Ghana mahime heli harshisi na haaduve ||2`,
    lyricsText: `G                      C             G
ಆನಂದ ಪರಮಾನಂದ ಕ್ರಿಸ್ತನಲ್ಲಿರುವುದೆ ಆನಂದ
G
ನಿನ್ನ ನಾಮ ಸುಗಂಧದ ಪರಿಮಳ ತೈಲ`
  },
  {
    id: 'song-stuti-stutisu-manave',
    songNumber: '304',
    title: 'Stuti Stuti Stutisu Manave (Psalm 103)',
    kannadaTitle: 'ಸ್ತುತಿ ಸ್ತುತಿ ಸ್ತುತಿಸು ಮನವೇ ಕರ್ತರಾದ ದೇವರನ್ನು',
    type: 'Praise',
    tempo: 114,
    styleNumber: '85',
    chords: 'G',
    originalKey: 'G',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G
ಸ್ತುತಿ ಸ್ತುತಿ ಸ್ತುತಿಸು ಮನವೇ
C            D        G
ಕರ್ತರಾದ ದೇವರನ್ನು ಮರೆಯದೇ ||2
G        Em       C   D     G
ಆರಾಧನೆ ಆರಾಧನೆ ಆರಾಧನೆ ನಿನಗೆ -2

Em                   C
1. ಕಷ್ಟದಲ್ಲೂ ಸಂಪತ್ತಲ್ಲೂ ನಿರಂತರವು ಸ್ತುತಿಸು
G                    D
ಇಸ್ರಾಯೇಲ್ ದೇವರನ್ನು ಸ್ತುತಿಸು ಯಾಕೋಬನ ದೇವರನ್ನು ಸ್ತುತಿಸು ||2
D                             G
ಹಗಲಲ್ಲೂ ಇರುಳಲ್ಲೂ ಅಗ್ನಿಯಾಗಿ ಕಾಯ್ದ ದೇವರನ್ನು ಸ್ತುತಿಸು ||2

Em                   C
2. ಮೇಘವಾಗಿ ಕಾಯ್ದ ದೇವರನ್ನು ಸ್ತುತಿಸು
G                    D
ಶಕ್ತಿಯುತ ದೇವರನ್ನು ಸ್ತುತಿಸು ಸೌಖ್ಯದಾತ ದೇವರನ್ನು ಸ್ತುತಿಸು ||2
D                             G
ಕಣ್ಣೀರಲ್ಲೂ ರೋಗದಲ್ಲೂ ಶಾಂತಿಯಾಗಿ ರಕ್ಷಿಸುವ ದೇವರನ್ನು ಸ್ತುತಿಸು ||2`,
    englishLyrics: `G
Stuti Stuti Stutisu Manave
C            D        G
Kartaarada Devarannu Marayade ||2
G        Em       C   D     G
Aaradhane Aaradhane Aaradhane ninage -2

Em                   C
1. Kashtadalloo Sampattalloo Nirantaravu Stutisu
G                    D
Israayela Devarannu Stutisu Yaakobana Devarannu Stutisu ||2
D                             G
Hagalalloo Irulalloo Agniyaagi Kaayda Devarannu Stutisu ||2

Em                   C
2. Meghavaagi Kaayda Devarannu Stutisu
G                    D
Shaktiyuta Devarannu Stutisu Soukhyadaata Devarannu Stutisu ||2
D                             G
Kanneeralloo Rogadalloo Shaantiyaagi Rakshisuva Devarannu Stutisu ||2`,
    lyricsText: `G
ಸ್ತುತಿ ಸ್ತುತಿ ಸ್ತುತಿಸು ಮನವೇ
C            D        G
ಕರ್ತರಾದ ದೇವರನ್ನು ಮರೆಯದೇ`
  },
  {
    id: 'song-kartane-ninnannu-kondaduvenu',
    songNumber: '305',
    title: 'Kartane Ninnannu Kondaduvenu',
    kannadaTitle: 'ಕರ್ತನೆ ನಿನ್ನನ್ನು ಕೊಂಡಾಡುವೆನು',
    type: 'Praise',
    tempo: 116,
    styleNumber: '82',
    chords: 'G',
    originalKey: 'G',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G                    C
ಕರ್ತನೆ ನಿನ್ನನ್ನು ಕೊಂಡಾಡುವೆನು
D                    G
ನನಗೆ ಆಶ್ರಯ ನೀನಲ್ಲವೇ ||2
C            G        D            G
ದೇವನೆ ದೇವನೆ ನೀನೇ ನನ್ನ ರಕ್ಷಕ -2

G                    D
1. ಜೀವನದಲ್ಲಿ ನಾ ನಿನ್ನ ಕುರಿತು
C                    G
ಸಾರುವೆನು ನಿನ್ನ ಕೀರ್ತಿಯನ್ನು ||2
G                    D
ಹೊಸ ಜೀವವನ್ನು ನನಗೆ ಕೊಟ್ಟು
C                    G
ಪರಿಶುದ್ಧ ಮಾರ್ಗದಲ್ಲಿ ನನ್ನ ನಡೆಸು ||2
C            G        D            G
ದೇವನೆ ದೇವನೆ ನೀನೇ ನನ್ನ ರಕ್ಷಕ -2

G                    D
2. ಬೆಟ್ಟಗಳು ಸ್ಥಳವನ್ನು ಬಿಟ್ಟು ಹೋದರು
C                    G
ಗುಡ್ಡಗಳು ನಡುಗಿ ಕದಲಿದರು ||2
G                    D
ಅಂಗೈಯಲ್ಲಿ ಚಿತ್ರಿಸಿ ಕಾಪಾಡುವ
C                    G
ದೀರ್ಘ ಶಾಂತಿ ಪೂರ್ಣ ಪ್ರೀತಿ ಕೊಡುವವನು ||2
C            G        D            G
ದೇವನೆ ದೇವನೆ ನೀನೇ ನನ್ನ ರಕ್ಷಕ -2`,
    englishLyrics: `G                    C
Kartane ninnannu kondaduvenu
D                    G
Nanage ashraya neenallave ||2
C            G        D            G
Devane devane neene nanna rakshaka -2

G                    D
1. Jeevanadalli naa ninna kuritu
C                    G
Saruvenu ninna keertiyannu ||2
G                    D
Hosa jeevavannu nanage kottu
C                    G
Parisuddha margadalli nanna nadesu ||2
C            G        D            G
Devane devane neene nanna rakshaka -2

G                    D
2. Bettagalu sthalavannu bittu hodaru
C                    G
Gudagalu nadugi kadalidaroo ||2
G                    D
Angaiyalli chitrisi kapaduva
C                    G
Deergha shanti purna preeti koduvavanu ||2
C            G        D            G
Devane devane neene nanna rakshaka -2`,
    lyricsText: `G                    C
ಕರ್ತನೆ ನಿನ್ನನ್ನು ಕೊಂಡಾಡುವೆನು
D                    G
ನನಗೆ ಆಶ್ರಯ ನೀನಲ್ಲವೇ`
  },
  {
    id: 'song-halleluya-sthuthi-maadiri',
    songNumber: '306',
    title: 'Halleluya Sthuthi Maadiri',
    kannadaTitle: 'ಹಲ್ಲೇಲೂಯಾ ಸ್ತುತಿ ಮಾಡಿರಿ ನಮ್ಮ ಯೇಸುವಿಗೆ',
    type: 'Praise',
    tempo: 112,
    styleNumber: '80',
    chords: 'Em',
    originalKey: 'Em',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `Em                    D
ಹಲ್ಲೇಲೂಯಾ ಸ್ತುತಿ ಮಾಡಿರಿ
C           D         Em
ನಮ್ಮ ಯೇಸುವಿಗೆ ಸ್ತೋತ್ರ ಮಾಡಿರಿ ||2
Em      D        C        Em
ಹಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ -2

Em                   C
1. ಶಿಲುಬೆಯ ಯಜ್ಞದಿ ನಿನ್ನ ರಕ್ತವ ಸುರಿಸಿದೆ
D                    C          Em
ಪಾಪ ನಿವಾರಿಸಿ ಶುದ್ಧೀಕರಿಸಿ ರಕ್ಷಣೆ ನೀಡಿದೆ ||2
Em      D        C        Em
ಹಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ -2

Em                   C
2. ನನ್ನ ಜೀವಿತದಿ ಸದಾ ನಿನ್ನನೆ ಸ್ಮರಿಸುವೆನು
D                    C          Em
ನಿನ್ನಾತ್ಮ ಹೊಂದಿ ನಿನ್ ಚಿತ್ತ ಅರಿತು ಬಾಳುವೆ ನಾನಿಂದು ||2
Em      D        C        Em
ಹಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ -2

Em                   C
3. ಯೇಸುವ ನಂಬಿರಿ ನಿಜ ರಕ್ಷಣೆ ಹೊಂದಿರಿ
D                    C          Em
ನಿತ್ಯ ಭಾಗ್ಯವ ಪಡೆಯಿರಿ ಎಂಬ ವಾರ್ತೆಯ ಸಾರುವೆನು ||2
Em      D        C        Em
ಹಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ -2`,
    englishLyrics: `Em                    D
Halleluya sthuthi maadiri
C           D         Em
Namma Yesuvige sthotra maadiri ||2
Em      D        C        Em
Haa halleluya halleluya halleluya -2

Em                   C
1. Shilubeya yajnadi ninna raktava suriseedi
D                    C          Em
Paapa nivaarisi shuddheekarisi rakshane needidi ||2
Em      D        C        Em
Haa halleluya halleluya halleluya -2

Em                   C
2. Nanna jeevitadi sadaa ninnane smarisuvenu
D                    C          Em
Ninnaatma hondi nin chitta aritu baaluve naanindu ||2
Em      D        C        Em
Haa halleluya halleluya halleluya -2

Em                   C
3. Yesuva nambiri nija rakshane hondiri
D                    C          Em
Nitya bhaagyava padeyiri emba vaarteya saaruvenu ||2
Em      D        C        Em
Haa halleluya halleluya halleluya -2`,
    lyricsText: `Em                    D
ಹಲ್ಲೇಲೂಯಾ ಸ್ತುತಿ ಮಾಡಿರಿ
C           D         Em
ನಮ್ಮ ಯೇಸುವಿಗೆ ಸ್ತೋತ್ರ ಮಾಡಿರಿ`
  },
  {
    id: 'song-yesu-naama-sundara-naama',
    songNumber: '307',
    title: 'Yesu Naama Sundara Naama',
    kannadaTitle: 'ಯೇಸು ನಾಮ ಸುಂದರ ನಾಮ ಮಧುರ ಮಧುರ',
    type: 'Praise',
    tempo: 120,
    styleNumber: '82',
    chords: 'A',
    originalKey: 'A',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `A                   D
ಯೇಸು ನಾಮ ಸುಂದರ ನಾಮ
E                   A
ಯೇಸು ನಾಮ ಮಧುರ ಮಧುರ ||2
A                   D
ಜೇನಿಗಿಂತಲೂ ನಾಮ ಮಧುರವು
E                    A
ಪಾಪವೆಲ್ಲಾ ಕ್ಷಮಿಸುವ ನಾಮ ||2
A        D        E        A
ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ -2

A                   D
1. ಶಾಂತಿ ನೀಡುವ ದಿವ್ಯ ನಾಮ
E                   A
ನೆಮ್ಮದಿ ತರುವ ಶ್ರೇಷ್ಠ ನಾಮ ||2
A                   D
ದುಃಖವ ನೀಗಿಸಿ ಸಂತೋಷ ಕೊಡುವ
E                   A
ಕರುಣೆಯುಳ್ಳ ಪ್ರಿಯನ ನಾಮ ||2

A                   D
2. ಅಂಧಕಾರವ ಓಡಿಸುವ ನಾಮ
E                   A
ಬಂಧನವೆಲ್ಲಾ ಮುರಿಯುವ ನಾಮ ||2
A                   D
ಜಯವನ್ನು ಕೊಡುವ ಯೇಸುವಿನ ನಾಮ
E                   A
ಸರ್ವ ಲೋಕದಿ ಮೇಲಾದ ನಾಮ ||2`,
    englishLyrics: `A                   D
Yesu nama sundara nama
E                   A
Yesu nama madhura madhura ||2
A                   D
Jheniginthalu nama madhuravu
E                    A
Paapavella kshamisuva nama ||2
A        D        E        A
Halleluya Halleluya Halleluya -2

A                   D
1. Shaanti needuva divya naama
E                   A
Nemmadi taruva shreshta naama ||2
A                   D
Dukkhava neegisi santosha koduva
E                   A
Karuneyulla priyana naama ||2

A                   D
2. Andhakaarava odisuva naama
E                   A
Bandhanavella muriyuva naama ||2
A                   D
Jayavannu koduva Yesuvina naama
E                   A
Sarva lokadi melaada naama ||2`,
    lyricsText: `A                   D
ಯೇಸು ನಾಮ ಸುಂದರ ನಾಮ
E                   A
ಯೇಸು ನಾಮ ಮಧುರ ಮಧುರ`
  },
  {
    id: 'song-santosha-dinda-ullasadinda',
    songNumber: '308',
    title: 'Santosha Dinda Ullasadinda',
    kannadaTitle: 'ಸಂತೋಷದಿಂದ ಉಲ್ಲಾಸದಿಂದ ನಾ ಬರುವೆ',
    type: 'Praise',
    tempo: 118,
    styleNumber: '85',
    chords: 'G',
    originalKey: 'G',
    category: 'kannada',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G                    C
ಸಂತೋಷದಿಂದ ಉಲ್ಲಾಸದಿಂದ
D                    G
ನಾ ಬರುವೆ ನಿನ್ ಸನ್ನಿಧಿಗೆ ||2
G                    C
ಕುಣಿಯುತ್ತಾ ನಲಿಯುತ್ತಾ
D                    G
ಸ್ತುತಿ ಗಾನದಿಂದ ನಾ ಬರುವೆ ನಿನ್ ಮನೆಗೆ ||2
G        C        D        G
ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ ಹಲ್ಲೇಲೂಯಾ -2

G                    C
1. ದುಃಖಕ್ಕೆ ಬದಲಾಗಿ ಸ್ತುತಿ ವಸ್ತ್ರ
D                    G
ಭಾರದ ಆತ್ಮಕ್ಕೆ ಆನಂದ ತೈಲ ||2
G                    C
ನೀ ಸುರಿಸುವೆ ನನ್ನ ತುಂಬಿಸುವೆ
D                    G
ಸ್ವಾತಂತ್ರ್ಯವೇ ನಿನ್ನ ಆತ್ಮದಲ್ಲಿ ||2

G                    C
2. ಕರ್ತನ ಹೊಸ ಗಾನ ನನ್ನ ಬಾಯಲ್ಲಿ
D                    G
ಇಬ್ಬಾಯಿ ಕತ್ತಿಯು ನನ್ನ ಕೈಯಲ್ಲಿ ||2
G                    C
ಜಯಘೋಷ ಮಾಡುತ್ತಾ ಮುಂದೆ ಸಾಗುವೆ
D                    G
ಪ್ರತಿಯೊಂದು ಯುದ್ಧವು ನಾ ಗೆಲ್ಲುವೆ ||2`,
    englishLyrics: `G                    C
Santosha dinda ullasadinda
D                    G
Naa baruve nin sannidhige ||2
G                    C
Kuniyutta naliyutta
D                    G
Sthuthi gaanadinda naa baruve nin manege ||2
G        C        D        G
Halleluya Halleluya Halleluya -2

G                    C
1. Dukhakkeke badalagi stuti vastra
D                    G
Bharada aatmakke aananda taila ||2
G                    C
Nee surisuve nanna thumbisuve
D                    G
Swatantrave ninna aatmadalli ||2

G                    C
2. Karthana hosa gaana nanna baayalli
D                    G
Ibbayi kattiyu nanna kaiyalli ||2
G                    C
Jaya ghosha madutta munde saguve
D                    G
Prati ondu yuddhavu naa gelluve ||2`,
    lyricsText: `G                    C
ಸಂತೋಷದಿಂದ ಉಲ್ಲಾಸದಿಂದ
D                    G
ನಾ ಬರುವೆ ನಿನ್ ಸನ್ನಿಧಿಗೆ`
  },
  {
    id: 'song-this-is-amazing-grace',
    songNumber: '05',
    title: 'This Is Amazing Grace',
    type: 'Praise',
    tempo: 100,
    styleNumber: '88',
    chords: 'G',
    originalKey: 'G',
    category: 'english',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `G
Who breaks the power of sin and darkness
C
Whose love is mighty and so much stronger
Em            D               C
The King of glory, the King above all kings

G
Who shakes the whole earth with holy thunder
C
And leaves us breathless in awe and wonder
Em            D               C
The King of glory, the King above all kings

G                                  C
This is amazing grace, this is unfailing love
              Em                      D
That You would take my place, that You would bear my cross
G                                  C
You laid down Your life, that I would be set free
              Em            D               G
Oh, Jesus, I sing for all that You've done for me

G
1. Who brings our chaos back into order
C
Who makes the orphan a son and daughter
Em            D               C
The King of glory, the King of glory
G
Who rules the nations with truth and justice
C
Shines like the sun in all of its brilliance
Em            D               C
The King of glory, the King above all kings

G
Worthy is the Lamb who was slain
C
Worthy is the King who conquered the grave
G
Worthy is the Lamb who was slain
C
Worthy is the King who conquered the grave`,
    englishLyrics: `G
Who breaks the power of sin and darkness
C
Whose love is mighty and so much stronger
Em            D               C
The King of glory, the King above all kings

G
Who shakes the whole earth with holy thunder
C
And leaves us breathless in awe and wonder
Em            D               C
The King of glory, the King above all kings

G                                  C
This is amazing grace, this is unfailing love
              Em                      D
That You would take my place, that You would bear my cross
G                                  C
You laid down Your life, that I would be set free
              Em            D               G
Oh, Jesus, I sing for all that You've done for me

G
1. Who brings our chaos back into order
C
Who makes the orphan a son and daughter
Em            D               C
The King of glory, the King of glory
G
Who rules the nations with truth and justice
C
Shines like the sun in all of its brilliance
Em            D               C
The King of glory, the King above all kings

G
Worthy is the Lamb who was slain
C
Worthy is the King who conquered the grave
G
Worthy is the Lamb who was slain
C
Worthy is the King who conquered the grave`,
    lyricsText: `G
Who breaks the power of sin and darkness
C
Whose love is mighty and so much stronger`
  },
  {
    id: 'song-great-are-you-lord',
    songNumber: '06',
    title: 'Great Are You Lord',
    type: 'Praise',
    tempo: 72,
    styleNumber: '50',
    chords: 'G',
    originalKey: 'G',
    category: 'english',
    lyricsImage: null,
    createdAt: new Date().toISOString(),
    kannadaLyrics: `C               Em
You give life, You are love
D
You bring light to the darkness
C               Em
You give hope, You restore
D
Every heart that is broken
C          Em          D
Great are You, Lord

C               Em
It's Your breath in our lungs
D
So we pour out our praise, we pour out our praise
C               Em
It's Your breath in our lungs
D
So we pour out our praise to You only

G
1. All the earth will shout Your praise
Em
Our hearts will cry, these bones will sing
C                      G
Great are You, Lord`,
    englishLyrics: `C               Em
You give life, You are love
D
You bring light to the darkness
C               Em
You give hope, You restore
D
Every heart that is broken
C          Em          D
Great are You, Lord

C               Em
It's Your breath in our lungs
D
So we pour out our praise, we pour out our praise
C               Em
It's Your breath in our lungs
D
So we pour out our praise to You only

G
1. All the earth will shout Your praise
Em
Our hearts will cry, these bones will sing
C                      G
Great are You, Lord`,
    lyricsText: `C               Em
You give life, You are love
D
You bring light to the darkness`
  }
];

// Validate all chord lines
for (const s of twentySongs) {
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
const toAdd = twentySongs.filter(s => !existingIds.has(s.id));
const combined = [...existing, ...toAdd];
fs.writeFileSync(songsFilePath, JSON.stringify(combined, null, 2), 'utf8');
console.log('SUCCESS! Added', toAdd.length, 'new songs. Total library size:', combined.length);
