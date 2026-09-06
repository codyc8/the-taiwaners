// One-off editorial pass over data/places.json.
//
// The notes were transcribed from a group chat and a Google My Maps export, so
// they carry three kinds of noise the site should not show:
//   1. source-section tags  — "from the Xinyi shopping day — ..."
//   2. notes about the notes — "Confirmed by your link", "Your list has this twice"
//   3. a Chinese fragment immediately restated in English, or vice versa
// and several name_en values are descriptions rather than names ("Sushi place",
// "Braised Pork Bowl", "Museum Park Next to house: Sun Yat-sen Memorial Hall").
//
// Edits are listed explicitly rather than regexed: these are 100 hand-written
// notes, and a rule broad enough to catch the artifacts also eats real content
// like "吃到飽 all you can eat".
import { readFileSync, writeFileSync } from 'node:fs';

const NOTES = {
  'simple-kaffa-sola': 'Inside Taipei 101, 88F — same trip as 101 itself.',
  'big-ball-songyan': 'Walkable from home, past 國父紀念館.',
  'elephant-trail': '~20 min climb to the classic 101 skyline shot. Go near sunset. No actual elephants.',
  'breeze-nan-shan': "B2-7F. JR East's atre fills 2-4F, so BEAMS (3F) and UNITED ARROWS are both in this one building. i-Ride TAIPEI flight simulator on 6F. 11:00-21:30, to 22:00 Fri/Sat.",
  'skm-xinyi': 'Four buildings linked by skybridges: A4 松高路19號 (luxury, plus the 6F wagyu sukiyaki), A8 松高路12號 (all-round, B2 food court), A9 松壽路9號 (precincts, 法雅客), A11 松壽路11號 (younger brands, B2 新高軒 curry). Life8 counters in here.',
  'bellavita': 'The 貴婦百貨 — Italian-palazzo luxury mall, worth walking through even if nothing gets bought. 11:00-21:30, to 22:00 Fri/Sat and holiday eves. Big Christmas display.',
  'dream-plaza': 'In the former Xinyi Eslite building, walkable from home.',
  'meerkat75-cafe': '$300 minimum buys 10 min holding a meerkat. Closed Mondays. Branches at 仁愛圓環 and 敦南 — the 仁愛 one is closest to home.',
  'skm-nanxi': '一館 南京西路12號, 三館 南京西路15號. Straight out of the MRT. Life8 counters here too.',
  'eslite-nanxi': 'The old 新光三越南西二館, Eslite since 2018. Expo Select, a BEAMS counter and Matsumoto Kiyoshi are all inside. Mall 11:00-22:00; bookstore to 24:00 Fri/Sat.',
  'chifeng-street': 'The walkable half of the 南西商圈 — old machine-shop lanes turned into small labels, vintage and coffee. Samo Ondoh is at 赤峰街9號.',
  'qingguang-market': 'Runs 農安街 to 雙城街. 晴光紅豆餅, the original of the chain, is at 雙城街12巷16-1號 — NT$15, 紅豆/奶油/蘿蔔絲. Also crispy milk doughnuts and 黃記滷肉飯.',
  'ningxia-night-market': 'Food only, no shopping — 麻油雞、蚵仔煎、牛肉蒸餃、芋頭圓.',
  'linjiang-night-market': 'Eating and browsing both — 米粉湯、石家割包、烤玉米、鹽酥雞.',
  'raohe-night-market': 'Eating and browsing both — 胡椒餅 at the entrance, 臭豆腐. 五分埔 clothing wholesale next door. Near LaLaport Nangang.',
  'rongjin-gorgeous-time': 'Restored Japanese-era wooden compound, near 永康街 and 師大. Photo spot.',
  'sun-yat-sen-memorial': 'Literally down 仁愛路 from home. Hourly honor guard change.',
  'cody-house-taipei': 'The 仁愛路 base. 國父紀念館, 大巨蛋 and 松菸 are all on foot from here.',
  'cody-house-taoyuan': 'The Taoyuan base, near the airport. Anchor for X-Park, 桃園酒廠, 手信霧隱城 and the Taoyuan-coast revolving restaurant.',
  'austin-lin-house': 'Pinned to Jiangzicui Station — Austin is right next to it.',
  'lalaport-nangang': '1 min from 南港軟體園區 exit 2, or 3-5 min down 經貿二路 from 南港展覽館 exit 1. BEAMS has a Nangang store here. 五分埔 and 饒河夜市 are nearby.',
  'q-square-gatten': 'In 京站時尚廣場, straight out of Taipei Main Station.',
  'snoopy-qsquare': 'Same mall as the sushi — one stop.',
  'addiction-aquatic': 'Standing sushi bar plus a seafood market. 10:30-22:30.',
  'cat-cafes': 'Genuinely everywhere in Taipei, so no need to plan around one. Something to do when a break is wanted.',
  'maokong-gondola': 'Take the crystal cabin. Tea houses and tea ice cream at the top.',
  'yehliu': "Queen's Head rock. Westernmost stop on the Keelung loop.",
  'shifen-jiufen': 'Sky lanterns at Shifen, then 十分瀑布, then Jiufen for sunset, with 黃金瀑布 on the way. Full day: train from Taipei, then the branch line. Jiufen is brutally crowded on weekends.',
  'nanya-rock': 'On the NE coast road between Jiufen and Bitoujiao — same loop.',
  'alishan': 'The sunrise train is the point, which means sleeping on the mountain.',
  'taroko': '花蓮. Buluowan Terrace is the stop to aim for.',
  'xiaowulai': 'Glass skywalk over the waterfall. Mountain drive, and tickets are timed-entry.',
  'bitoujiao': 'Coastal cape trail on the 東北角. Same run as 南雅奇岩.',
  'kenting': "Taiwan's southernmost tip. Realistically 2-3 days from Taipei.",
  'shiding-noodles': 'Hand-pulled noodle DIY plus a flowing-noodle meal. RESERVATION REQUIRED. 9:00-16:00, closed Tuesdays.',
  'taoyuan-sake-brewery': 'Free entry to the product center 9:00-17:00 daily, no booking. The production line itself needs a 10+ person group booking, weekdays only. Very close to the Taoyuan place.',
  'chun-shui-tang': 'Taichung. The original 春水堂 — claimed birthplace of bubble tea, 1983.',
  'sswyc-mochi': 'Edo-style castle town, 8:30-20:00, built around 手信坊 mochi. ~40 min south of the Taoyuan place.',
  'yingge-ceramics': 'Pottery street with DIY studios. Pair with 東街日本料理.',
  'kavalan': 'Free distillery tour and tastings. ~1hr from Taipei by bus, so a long day trip rather than an overnight.',
  'claw-machines': '~600坪 with close to 300 machines, snack prizes. 10:00-24:00, to 01:00 Fri/Sat.',
  'shingaoken': 'Japanese curry with katsu or steak. 本店 市民大道四段8號; also 新光三越A11 松壽路11號B2 and 北車微風 北平西路3號 — the A11 one folds into a Xinyi shopping day.',
  'le-xuan-wagyu': 'Kansai-style A5 wagyu sukiyaki, near 101. Book ahead.',
  'omakase-hezhangcun': 'Value omakase hidden inside Huashan Market. Closed Mondays. Second branch at 忠孝東路三段251巷7弄10號.',
  'taoyuan-rotating-sushi': 'The dining room revolves — it is not conveyor sushi. Seafood, Chinese and Western on the top floor of the 漁會 building at 竹圍漁港, with sea views and planes landing. The motorcycle ride out is the point. Mon-Fri 11:00-14:00 and 17:00-21:00, weekends 11:00-21:00.',
  'jinyu-sushi': 'Right behind the 仁愛路 place. Famous for absurdly thick sashimi. Closed Mondays.',
  'soba-shinn-citrus': '~5 min walk from home, on 仁愛路四段 near 安和路. Closed Tuesdays; 11:45-13:30, 17:30-20:30.',
  'momo-paradise': '吃到飽 all-you-can-eat sukiyaki and shabu.',
  'wojia-steak-banqiao': '吃到飽 all you can eat — the largest 我家牛排 in Taiwan. Buffet from ~$390, last entry 20:30.',
  'david-alpaca': 'Alpacas you can feed, next to Chinese Culture University. Pair with The Top for one mountain day.',
  'lao-shan-dong': 'Michelin Bib Gourmand seven years running. A 76-year-old shop in the Wannian Building basement food court.',
  'modern-toilet': 'Still open as of 2026. Same block as 老山東.',
  'bubu-car-cafe': 'Meteor Garden filming location — you eat inside vintage cars.',
  'fake-sober': 'Coffee 08:00-18:00, then a bar 18:00-02:00. Behind Breeze/Vieshow, near 101.',
  'coffee-sind': 'Named a 2026 world top-100 coffee shop. Tiny two-ping storefront.',
  'the-top': 'The best-known night-view restaurant on the mountain. CASH ONLY, $350/person minimum, 17:00-03:00.',
  'wills-teppanyaki': '$2080 + 10%, 12 courses. Books open at midnight 14 days out via inline. Closed Mondays.',
  'tomo-sushi': '11 counter seats. Lunch omakase from ~$1000, much cheaper than dinner.',
  'impromptu': 'One Michelin star five years running; tasting menu ~$4000. Closed Mon/Tue, book well ahead.',
  'mozi-bar': 'Speakeasy behind a working hair salon — the entrance is a bookshelf door. Reservation required. Closed Mondays.',
  'caveyard': 'Caveyard by -1, same lane as Mozi and one 弄 over. Cave-themed, 30-odd shisha flavours, Aladdin-lamp cocktails. 18:00-02:00, to 03:00 Fri/Sat. 02-2711-9636.',
  'dianxiaoer-lurou': 'Michelin Bib Gourmand, right by 台北橋站 on the orange line — Sanchong on paper, but a straight Metro ride.',
  'weekend-fried-chicken': 'The 大巨蛋 branch is the one actually near home.',
  'coffee-s': 'Inside 榕錦時光 — same stop, so do both together.',
  'samo-ondoh': 'Korean designer bags, not clothing. Same street as 饌堂. Xinyi branch at 松壽路11號B1.',
  'trends-concept-57': 'High-end select shop, same block as Mozi and Caveyard.',
  'uniqlo': 'Branches in every district — 信義, 西門, 中山, Taipei Main. Grab at whichever shopping day happens.',
  'airspace': 'Womenswear. Second store at 中山北路二段20巷, near Zhongshan Stn.',
  'jellysports': 'Tennis and badminton specialist, 12:00-22:00. Walkable from Shilin Night Market.',
  'nitori': 'Homeware. Branches in most malls, including LaLaport Nangang.',
  'life8': 'Menswear, mostly 新光三越 counters — so a 信義 or 南西 shopping day covers it.',
  'plain-me': 'Dunnan flagship. Also 西門店 昆明街96巷26號, plus 松菸 and 南西 Eslite counters.',
  'united-arrows': '微風信義 and 微風南山, plus 大安 and Linkou Mitsui Outlet. Same trip as BEAMS.',
  'expo-select': "Eslite's design select shop. 松菸店 pairs with 松山文創園區; 南西店 with the Zhongshan day.",
  'beams': '微風南山 3F, 信義新天地, and 南港經貿二路131號2F. Hits on a Xinyi shopping day.',
  'ximen-vintage-jackets': 'Japanese import clothing on 永福街 — not the 2nd STREET chain. Bulk imports; coats and leather are the strong suit.',
  'adidas-xinyi': '555坪, the largest in Taiwan. Next door to Fake Sober.',
  'keelung-night-market': '廟口夜市. Best paired with Yehliu on the same day.',
  'limitless-escape': 'Two English-friendly rooms: Prison Break and The Warrant.',
};

// Names that are descriptions, not names. The researched ones are applied by
// scripts/rename.json; these are the ones that only needed a prefix stripped.
const NAMES = {
  'national-palace-museum': 'National Palace Museum',
  'rongjin-gorgeous-time': 'Rongjin Gorgeous Time',
  'sun-yat-sen-memorial': 'Sun Yat-sen Memorial Hall',
  'cks-memorial': 'Chiang Kai-shek Memorial Hall',
  'huashan-1914': 'Huashan 1914 Creative Park',
  'addiction-aquatic': 'Addiction Aquatic Development',
  'snoopy-qsquare': 'PEANUTS Store Q Square',
  'ximending': 'Ximending',
  'adidas-xinyi': 'adidas Brand Center Xinyi',
  'soba-shinn-citrus': 'Soba Shinn Citrus',
  'elephant-trail': 'Elephant Mountain Trail',
  'big-ball-songyan': 'Taipei Dome & Songshan Cultural Park',
  'taroko': 'Taroko National Park',
  'yehliu': 'Yehliu Geopark',
  'cat-cafes': 'Cat cafes',
  'shifen-jiufen': 'Shifen Old Street & Jiufen',
  'keelung-night-market': 'Keelung Miaokou Night Market',
  'dadaocheng-dihua': 'Dadaocheng & Dihua Street',
};

// Chinese-name corrections found while checking the English ones.
const ZH = {
  'tomo-sushi': '朋鮨 TOMO',   // was 朋鰭; the restaurant's own listings use 鮨
};

const ROOT = new URL('../', import.meta.url);
const db = JSON.parse(readFileSync(new URL('data/places.json', ROOT), 'utf8'));
const byId = new Map(db.places.map(p => [p.id, p]));

let researched = {};
try { researched = JSON.parse(readFileSync(new URL('scripts/rename.json', ROOT), 'utf8')); } catch {}

const missing = [];
for (const [src, table] of [['note', NOTES], ['name_en', NAMES], ['name_en', researched], ['name_zh', ZH]]) {
  for (const [id, value] of Object.entries(table)) {
    const p = byId.get(id);
    if (!p) { missing.push(id); continue; }
    p[src] = value;
  }
}

if (missing.length) { console.error('unknown ids:', missing.join(', ')); process.exit(1); }
writeFileSync(new URL('data/places.json', ROOT), JSON.stringify(db, null, 2) + '\n');
console.log(`polished ${Object.keys(NOTES).length} notes, ${Object.keys(NAMES).length + Object.keys(researched).length} names, ${Object.keys(ZH).length} zh`);
