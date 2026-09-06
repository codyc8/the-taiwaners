# -*- coding: utf-8 -*-
"""Enrichment table. Each key maps a raw.json id to verified location data.
conf: 'verified'  = confirmed via web search this session
      'known'     = well-known landmark, address from model knowledge
      'needs_input' = could not resolve, requires Cody
"""
E = {
# ---------------- XINYI ----------------
"taipei-101":{"region":"Taipei City","area":"Xinyi","band":"city","mrt":"Taipei 101/World Trade Center (R)","addr":"台北市信義區信義路五段7號","conf":"known"},
"simple-kaffa-sola":{"region":"Taipei City","area":"Xinyi","band":"city","mrt":"Taipei 101/World Trade Center (R)","addr":"台北市信義區信義路五段7號 88F","conf":"known","note_add":"Inside Taipei 101, 88F. Same trip as 101 itself."},
"elephant-trail":{"region":"Taipei City","area":"Xinyi","band":"city","mrt":"Xiangshan (R)","addr":"台北市信義區信義路五段150巷 (象山親山步道登山口)","conf":"known","note_add":"~20 min climb to the classic 101 skyline shot. Go near sunset."},
# The two "shopping day" rows were bundles, not places — a single pin cannot
# stand for three malls. Each named store is now its own entry below; the
# bundles are merged away so nothing is listed twice.
"xinyi-shopping-day":{"region":"Taipei City","area":"Xinyi","band":"city","conf":"known","merge_into":"breeze-nan-shan"},
"breeze-nan-shan":{"region":"Taipei City","area":"Xinyi","band":"city","mrt":"Taipei 101/World Trade Center (R) / City Hall (BL)","addr":"台北市信義區松智路17號","conf":"verified","latlng":[25.0344124,121.5662931],"note_add":"B2-7F. JR East's atre fills 2-4F — BEAMS is on 3F and UNITED ARROWS is here too, so this one building covers both. i-Ride TAIPEI flight simulator on 6F. 11:00-21:30, to 22:00 Fri/Sat."},
"skm-xinyi":{"region":"Taipei City","area":"Xinyi","band":"city","mrt":"City Hall (BL) exit 3 / Taipei 101 (R)","addr":"台北市信義區松高路12號 (A8)","conf":"verified","latlng":[25.0383305,121.5667965],"latlng_precision":"street","note_add":"Four buildings, linked by skybridges: A4 松高路19號 (luxury + the 6F wagyu sukiyaki), A8 松高路12號 (all-round, B2 food court), A9 松壽路9號 (precincts + 法雅客), A11 松壽路11號 (younger brands, B2 Shingaoken curry). Life8 counters are in here."},
"bellavita":{"region":"Taipei City","area":"Xinyi","band":"city","mrt":"Taipei 101 (R) / City Hall (BL)","addr":"台北市信義區松仁路28號","conf":"verified","latlng":[25.0396680,121.5677269],"note_add":"The 貴婦百貨 — Italian-palazzo luxury mall, worth walking through even if nothing gets bought. 11:00-21:30, to 22:00 Fri/Sat and holiday eves. Big Christmas display."},
"dream-plaza":{"region":"Taipei City","area":"Xinyi","band":"city","mrt":"City Hall (BL)","addr":"台北市信義區松高路11號","conf":"verified","note_add":"Confirmed by your link. In the former Xinyi Eslite building, walkable from home."},
"fake-sober":{"region":"Taipei City","area":"Xinyi","band":"city","mrt":"Taipei 101 (R)","addr":"台北市信義區松壽路20號1樓","conf":"verified","note_add":"Coffee 08:00-18:00, becomes a bar 18:00-02:00. Behind Breeze/Vieshow."},
"adidas-xinyi":{"region":"Taipei City","area":"Xinyi","band":"city","mrt":"Taipei 101 (R)","addr":"台北市信義區松壽路18號","conf":"verified","note_add":"555坪, largest in Taiwan. Next door to Fake Sober."},
"le-xuan-wagyu":{"region":"Taipei City","area":"Xinyi","band":"city","mrt":"City Hall (BL) exit 3","addr":"台北市信義區松高路19號6F (新光三越A4)","conf":"verified","note_add":"Kansai-style A5 wagyu sukiyaki. Book ahead."},
"momo-paradise":{"region":"Taipei City","area":"Xinyi","band":"city","mrt":"Taipei 101 (R)","addr":"台北市信義區松壽路22號 Neo19","conf":"known"},
"kaixi-lurou":{"region":"Taipei City","area":"Xinyi","band":"city","mrt":"Taipei 101 (R)","addr":"台北市信義區莊敬路441號","conf":"verified","note_add":"Michelin Bib Gourmand. 麻辣滷肉飯 is the signature."},
"big-ball-songyan":{"region":"Taipei City","area":"Songyan / Big Ball","band":"city","mrt":"Sun Yat-Sen Memorial Hall (BL)","addr":"台北大巨蛋 台北市信義區忠孝東路四段515號 / 松山文創園區 台北市信義區光復南路133號","conf":"known","note_add":"Walkable from home via 國父紀念館, exactly as noted."},
"sun-yat-sen-memorial":{"region":"Taipei City","area":"Da'an / Ren'ai","band":"city","mrt":"Sun Yat-Sen Memorial Hall (BL)","addr":"台北市信義區仁愛路四段505號","conf":"known","note_add":"Literally down 仁愛路 from home. Hourly honor guard change."},

# ---------------- DA'AN / EAST DISTRICT ----------------
"soba-shinn-citrus":{"region":"Taipei City","area":"Da'an / Ren'ai","band":"city","mrt":"Zhongxiao Dunhua (BL)","addr":"台北市大安區仁愛路四段228-6號","conf":"verified","note_add":"~5 min walk from home. Closed Tuesdays; 11:45-13:30, 17:30-20:30."},
"jinyu-sushi":{"region":"Taipei City","area":"Da'an / Ren'ai","band":"city","mrt":"Sun Yat-Sen Memorial Hall (BL)","addr":"台北市大安區延吉街233巷18號","conf":"verified","note_add":"The '仁愛路家後面' one. Famous for absurdly thick sashimi. Closed Mondays."},
"weekend-fried-chicken":{"region":"Taipei City","area":"Da'an / Ren'ai","band":"city","mrt":"Zhongxiao Xinsheng (BL/O)","addr":"台北市大安區濟南路三段5巷5號","conf":"verified","note_add":"Also has a 大巨蛋 branch, which is the one actually near home."},
"mozi-bar":{"region":"Taipei City","area":"Da'an / East District","band":"city","mrt":"Zhongxiao Dunhua (BL) exit 3","addr":"台北市大安區忠孝東路四段216巷32弄10號","conf":"verified","latlng":[25.0399130,121.5512965],"latlng_precision":"street","note_add":"Speakeasy behind a working hair salon; entrance is a bookshelf door. Reservation required. Closed Mondays."},
"caveyard":{"region":"Taipei City","area":"Da'an / East District","band":"city","mrt":"Zhongxiao Dunhua (BL) exit 3","addr":"台北市大安區忠孝東路四段216巷11弄16號","conf":"verified","latlng":[25.0407898,121.5535247],"latlng_precision":"street","note_add":"Caveyard by -1. Same lane as Mozi, one 弄 over. Cave-themed, 30-odd shisha flavours, Aladdin-lamp cocktails. 18:00-02:00, to 03:00 Fri/Sat. 02-2711-9636."},
"trends-concept-57":{"kind":"place","region":"Taipei City","area":"Da'an / East District","band":"city","mrt":"Zhongxiao Dunhua (BL)","addr":"台北市松山區敦化南路一段57號1F","conf":"verified","note_add":"High-end select shop, same block as Mozi/Caveyard."},
"plain-me":{"kind":"place","region":"Taipei City","area":"Da'an / East District","band":"city","mrt":"Zhongxiao Dunhua (BL) exit 7","addr":"台北市大安區敦化南路一段161巷18號","conf":"verified","note_add":"Dunnan flagship. Also 西門店 昆明街96巷26號, plus 松菸/南西 Eslite counters."},
"airspace":{"kind":"place","region":"Taipei City","area":"Da'an / East District","band":"city","mrt":"Zhongxiao Dunhua (BL)","addr":"台北市大安區敦化南路一段187巷50號","conf":"verified","note_add":"Womenswear. Also 中山北路二段20巷 near Zhongshan Stn."},
"linjiang-night-market":{"region":"Taipei City","area":"Da'an / Tonghua","band":"city","mrt":"Xinyi Anhe (R)","addr":"台北市大安區臨江街 (通化夜市)","conf":"known","note_add":"米粉湯、石家割包、烤玉米、鹽酥雞"},
"tomo-sushi":{"region":"Taipei City","area":"Da'an / Tonghua","band":"city","mrt":"Xinyi Anhe (R)","addr":"台北市大安區通化街171巷34號","conf":"verified","note_add":"11 counter seats. Lunch omakase from ~$1000, much cheaper than dinner."},
"yongkang-street":{"region":"Taipei City","area":"Yongkang / Dongmen","band":"city","mrt":"Dongmen (R/O)","addr":"台北市大安區永康街","conf":"known","note_add":"Mango shaved ice, 鼎泰豐本店, tea shops."},
"rongjin-gorgeous-time":{"region":"Taipei City","area":"Yongkang / Dongmen","band":"city","mrt":"Dongmen (R/O)","addr":"台北市大安區金華街167號","conf":"verified","note_add":"Restored Japanese-era wooden compound. Photo spot."},
"coffee-s":{"region":"Taipei City","area":"Yongkang / Dongmen","band":"city","mrt":"Dongmen (R/O)","addr":"台北市大安區金華街161號 (榕錦時光生活園區內)","conf":"verified","note_add":"Inside 榕錦時光 — same stop, do both together."},

# ---------------- ZHONGZHENG ----------------
"cks-memorial":{"region":"Taipei City","area":"Zhongzheng","band":"city","mrt":"Chiang Kai-Shek Memorial Hall (R/G)","addr":"台北市中正區中山南路21號","conf":"known"},
"huashan-1914":{"region":"Taipei City","area":"Zhongzheng","band":"city","mrt":"Zhongxiao Xinsheng (BL/O)","addr":"台北市中正區八德路一段1號","conf":"known"},
"omakase-hezhangcun":{"region":"Taipei City","area":"Zhongzheng","band":"city","mrt":"Shandao Temple (BL)","addr":"台北市中正區忠孝東路一段108號1樓 (華山市場內)","conf":"verified","note_add":"Value omakase hidden in Huashan Market. Closed Mondays. Second branch 忠孝2店 忠孝東路三段251巷7弄10號."},
"coffee-sind":{"region":"Taipei City","area":"Zhongzheng","band":"city","mrt":"Zhongxiao Xinsheng (BL/O) exit 5","addr":"台北市中正區新生南路一段56巷8號","conf":"verified","note_add":"Named a 2026 world top-100 coffee shop, confirming your note. Tiny two-ping storefront."},
"limitless-escape":{"region":"Taipei City","area":"Gongguan","band":"city","mrt":"Gongguan (G)","addr":"台北市中正區汀州路三段188號3樓之3","conf":"verified","note_add":"Two English-friendly rooms: Prison Break and The Warrant."},

# ---------------- ZHONGSHAN / DATONG ----------------
"skm-nanxi":{"region":"Taipei City","area":"Zhongshan","band":"city","mrt":"Zhongshan (R/G) exit 1","addr":"台北市中山區南京西路12號","conf":"verified","latlng":[25.0520853,121.5210984],"note_add":"一館 南京西路12號, 三館 南京西路15號. Straight out of the MRT. Life8 counters here too."},
"eslite-nanxi":{"region":"Taipei City","area":"Zhongshan","band":"city","mrt":"Zhongshan (R/G) exit 1","addr":"台北市中山區南京西路14號","conf":"verified","latlng":[25.0521090,121.5206524],"note_add":"The old 新光三越南西二館, taken over by Eslite in 2018. Expo Select is in here, so is a BEAMS counter and Matsumoto Kiyoshi. Mall 11:00-22:00; bookstore runs to 24:00 Fri/Sat."},
"chifeng-street":{"region":"Taipei City","area":"Zhongshan / Chifeng","band":"city","mrt":"Zhongshan (R/G) exit 4","addr":"台北市大同區赤峰街","conf":"verified","latlng":[25.0552168,121.5196301],"latlng_precision":"street","note_add":"The walkable half of the 南西商圈 — old machine-shop lanes turned into small labels, vintage and coffee. Samo Ondoh is at 赤峰街9號."},
"qingguang-market":{"region":"Taipei City","area":"Zhongshan","band":"city","mrt":"Zhongshan Elementary School (O)","addr":"台北市中山區農安街・雙城街一帶","conf":"verified","latlng":[25.0642927,121.5243600],"latlng_precision":"street","note_add":"Runs 農安街 to 雙城街. 晴光紅豆餅 — the original of the chain, NT$15, 紅豆/奶油/蘿蔔絲 — is at 雙城街12巷16-1號. Also the crispy milk doughnuts and 黃記滷肉飯."},
"zhongshan-shopping-day":{"region":"Taipei City","area":"Zhongshan","band":"city","conf":"known","merge_into":"skm-nanxi"},
"oak-room":{"kind":"place","region":"Taipei City","area":"Zhongshan","band":"city","mrt":"Zhongshan (R/G)","addr":"台北市中山區中山北路二段42巷10號1樓","conf":"verified","note_add":"Taiwan's first menswear select shop. Across the lane from Impromptu."},
"impromptu":{"region":"Taipei City","area":"Zhongshan","band":"city","mrt":"Zhongshan (R/G) exit 3","addr":"台北市中山區中山北路二段39巷3號B1 (晶華酒店)","conf":"verified","note_add":"1 Michelin star 5 years running. Closed Mon/Tue. Book well ahead."},
"addiction-aquatic":{"region":"Taipei City","area":"Zhongshan","band":"city","mrt":"Xingtian Temple (O) / Zhongshan Junior High (BR)","addr":"台北市中山區民族東路410巷2弄18號","conf":"verified","note_add":"Standing sushi bar + seafood market, 10:30-22:30. Your list has this twice."},
"zhuantang-lurou":{"region":"Taipei City","area":"Zhongshan / Chifeng","band":"city","mrt":"Zhongshan (R/G)","addr":"台北市大同區赤峰街33巷12號1樓","conf":"verified","note_add":"12:00-20:00. Sauce served separately from the rice."},
"samo-ondoh":{"kind":"place","region":"Taipei City","area":"Zhongshan / Chifeng","band":"city","mrt":"Zhongshan (R/G) exit 5","addr":"台北市大同區赤峰街9號1F","conf":"verified","note_add":"Korean designer BAG brand, not clothing. Same street as 饌堂. Xinyi branch at 松壽路11號B1."},
"ningxia-night-market":{"region":"Taipei City","area":"Datong","band":"city","mrt":"Shuanglian (R)","addr":"台北市大同區寧夏路","conf":"known","note_add":"Food only, no shopping — 麻油雞、蚵仔煎、牛肉蒸餃、芋頭圓"},
"dadaocheng-dihua":{"region":"Taipei City","area":"Datong","band":"city","mrt":"Beimen (G) / Daqiaotou (O)","addr":"台北市大同區迪化街一段","conf":"known","note_add":"Historic shophouses, dried goods, tea, riverside sunset."},
"q-square-gatten":{"region":"Taipei City","area":"Taipei Main Station","band":"city","mrt":"Taipei Main Station (R/BL)","addr":"台北市大同區承德路一段1號 (京站時尚廣場)","conf":"known"},
"snoopy-qsquare":{"region":"Taipei City","area":"Taipei Main Station","band":"city","mrt":"Taipei Main Station (R/BL)","addr":"台北市大同區承德路一段1號 (京站時尚廣場)","conf":"known","note_add":"Same mall as the sushi — one stop."},

# ---------------- SHILIN / YANGMINGSHAN ----------------
"shilin-night-market":{"region":"Taipei City","area":"Shilin","band":"city","mrt":"Jiantan (R)","addr":"台北市士林區基河路101號","conf":"known","note_add":"More browsing than eating; lots of young indie stalls."},
"national-palace-museum":{"region":"Taipei City","area":"Shilin","band":"city","mrt":"Shilin (R) + bus","addr":"台北市士林區至善路二段221號","conf":"known"},
"jellysports":{"kind":"place","region":"Taipei City","area":"Shilin","band":"city","mrt":"Shilin (R)","addr":"台北市士林區中正路426號","conf":"verified","note_add":"捷利體育. Tennis/badminton specialist, 12:00-22:00. Walkable from Shilin Night Market."},
"bubu-car-cafe":{"region":"Taipei City","area":"Tianmu","band":"city","mrt":"Shipai (R) + bus","addr":"台北市士林區中山北路七段140巷1號","conf":"verified","note_add":"P.S. BUBU 金屋藏車食堂. Meteor Garden filming location; you eat inside vintage cars."},
"david-alpaca":{"region":"Taipei City","area":"Yangmingshan","band":"city","mrt":"Jiantan (R) + bus","addr":"台北市士林區國泰街9號","conf":"verified","note_add":"Alpacas you can feed. Next to Chinese Culture University — pair with The Top."},
"the-top":{"region":"Taipei City","area":"Yangmingshan","band":"city","mrt":"Jiantan (R) + bus","addr":"台北市士林區凱旋路61巷4弄33號","conf":"verified","note_add":"CASH ONLY, $350/person minimum, 17:00-03:00. Best-known night view restaurant on the mountain."},
"yangmingshan":{"region":"Taipei City","area":"Yangmingshan","band":"city","mrt":"Jiantan (R) + bus 260/紅5","addr":"陽明山國家公園","conf":"known","note_add":"Pair with 大衛小小羊 and The Top for one mountain day."},

# ---------------- WANHUA / XIMEN ----------------
"ximending":{"region":"Taipei City","area":"Ximending","band":"city","mrt":"Ximen (BL/G)","addr":"台北市萬華區西門町","conf":"known"},
"lao-shan-dong":{"region":"Taipei City","area":"Ximending","band":"city","mrt":"Ximen (BL/G) exit 6","addr":"台北市萬華區西寧南路70號B1之15 (萬年大樓)","conf":"verified","note_add":"Michelin Bib Gourmand 7 years running. In the Wannian Building basement food court. 76-year-old shop."},
"modern-toilet":{"region":"Taipei City","area":"Ximending","band":"city","mrt":"Ximen (BL/G)","addr":"台北市萬華區西寧南路50巷7號2樓","conf":"verified","note_add":"Confirmed still open in 2026. Same block as 老山東."},
"ximen-vintage-jackets":{"region":"Taipei City","area":"Ximending","band":"city","mrt":"Ximen (BL/G)","addr":"台北市萬華區永福街63號","conf":"verified","note_add":"Confirmed by your link — Japanese Import Clothing on 永福街, not the 2nd STREET chain. Bulk Japanese imports; coats and leather are the strong suit."},

# ---------------- WENSHAN / NANGANG / SONGSHAN ----------------
"maokong-gondola":{"region":"Taipei City","area":"Maokong / Zoo","band":"city","mrt":"Taipei Zoo (BR)","addr":"台北市文山區新光路二段8號 (動物園站)","conf":"known","note_add":"Take the crystal cabin. Tea houses + tea ice cream at the top."},
"taipei-zoo":{"region":"Taipei City","area":"Maokong / Zoo","band":"city","mrt":"Taipei Zoo (BR)","addr":"台北市文山區新光路二段30號","conf":"known"},
"zoo-water-dance":{"region":"Taipei City","area":"Maokong / Zoo","band":"city","mrt":"Taipei Zoo (BR)","addr":"台北市文山區新光路二段 (動物園站前廣場)","conf":"known","note_add":"Fountain show right outside the station — same stop as the zoo and gondola."},
"lalaport-nangang":{"region":"Taipei City","area":"Nangang","band":"city","mrt":"Nangang Software Park (BR) / Taipei Nangang Exhibition Center (BL/BR)","addr":"台北市南港區經貿二路131號","conf":"verified","note_add":"1 min from 南港軟體園區 exit 2, or 3-5 min down 經貿二路 from 南港展覽館 exit 1. BEAMS has a Nangang store here too."},
"raohe-night-market":{"region":"Taipei City","area":"Songshan / Raohe","band":"city","mrt":"Songshan (G)","addr":"台北市松山區饒河街","conf":"known","note_add":"胡椒餅 at the entrance, 臭豆腐. 五分埔 clothing wholesale is right next door. Near LaLaport Nangang."},
"meerkat75-cafe":{"region":"Taipei City","area":"Songshan / Xiaojudan","band":"city","mrt":"Taipei Arena (G) exit 3","addr":"台北市松山區八德路三段155巷10號","conf":"verified","note_add":"$300 minimum buys 10 min holding a meerkat. Closed Mondays. Also has 仁愛圓環 and 敦南 branches — the 仁愛 one is closest to home."},
"wills-teppanyaki":{"region":"Taipei City","area":"Songshan / Xiaojudan","band":"city","mrt":"Nanjing Fuxing (BR/G)","addr":"台北市松山區敦化北路165巷10號1樓","conf":"verified","note_add":"$2080 + 10%, 12 courses. Books open at midnight 14 days out via inline. Closed Mondays."},

# ---------------- NEW TAIPEI ----------------
# Home bases. The addresses in raw.json's _meta are the real ones; what goes in
# here is deliberately coarse — pinned to the nearest station or road, because
# these rows still ship to the browser (seed.mjs only flags them private, which
# hides them from the map, not from the row itself).
"cody-house-taipei":{"region":"Taipei City","area":"Da'an / Ren'ai","band":"city","mrt":"Sun Yat-Sen Memorial Hall (BL)","addr":"台北市大安區仁愛路四段 (國父紀念館站)","private":True,"conf":"known","latlng":[25.0412,121.5573],"latlng_precision":"approx","note_add":"The 仁愛路 base. Anchor for 'near home', '仁愛路家後面', 'walkable from home' — 國父紀念館, 大巨蛋 and 松菸 are all on foot from here."},
"cody-house-taoyuan":{"region":"Taoyuan","area":"Guishan","band":"day_trip","mrt":"TRA/HSR Taoyuan + car","addr":"桃園市蘆竹區六福路 (南崁)","private":True,"conf":"known","latlng":[25.0614,121.2970],"latlng_precision":"street","note_add":"The Taoyuan base, near the airport. Anchor for X-Park, 桃園酒廠, 手信霧隱城 and the Taoyuan-coast sushi."},
"austin-lin-house":{"region":"New Taipei","area":"Banqiao","band":"city","mrt":"Jiangzicui (BL)","addr":"新北市板橋區文化路一段 (江子翠站)","private":True,"conf":"known","note_add":"Pinned to Jiangzicui Station — Austin is right next to it."},
"nanya-night-market":{"region":"New Taipei","area":"Banqiao","band":"city","mrt":"Fuzhong (BL) exit 1","addr":"新北市板橋區南雅東路87號","conf":"verified","note_add":"17:00-24:00 daily."},
"wojia-steak-banqiao":{"region":"New Taipei","area":"Banqiao","band":"city","mrt":"Far Eastern Hospital (BL) exit 3","addr":"新北市板橋區遠東路62之1號","conf":"verified","note_add":"Largest 我家牛排 in Taiwan. Buffet from ~$390. Last entry 20:30."},
"capybara-knight":{"region":"New Taipei","area":"Tucheng","band":"city","mrt":"Tucheng (BL)","addr":"新北市土城區員林街61巷2弄18號","conf":"verified","note_add":"$200 weekday / $250 weekend includes a drink, capybara cake and 20 min with them. 10:00-17:30. Same blue line as Banqiao."},
"dianxiaoer-lurou":{"region":"New Taipei","area":"Sanchong","band":"city","mrt":"Taipei Bridge (O)","addr":"新北市三重區大同北路27號","latlng":(25.0626545,121.4954937),"conf":"verified","note_add":"Michelin Bib Gourmand. Right by 台北橋站 on the orange line — Sanchong on paper, but a straight Metro ride."},
"shiding-noodles":{"region":"New Taipei","area":"Shiding","band":"day_trip","mrt":"car / bus from Muzha","addr":"新北市石碇區烏塗里四分子3號","conf":"verified","note_add":"Hand-pulled noodle DIY + flowing-noodle meal. RESERVATION REQUIRED. 9:00-16:00, closed Tuesdays."},
"yingge-ceramics":{"region":"New Taipei","area":"Yingge","band":"day_trip","mrt":"TRA Yingge Station","addr":"新北市鶯歌區尖山埔路","conf":"known","note_add":"Pottery street; DIY ceramics studios. Pair with 東街日本料理."},
"dongjie-yingge":{"region":"New Taipei","area":"Yingge","band":"day_trip","mrt":"TRA Yingge Station","addr":"新北市鶯歌區永明街58號","conf":"verified","note_add":"Value no-menu Japanese, ~$500/person. Minutes from the ceramics street."},
"shifen-jiufen":{"region":"New Taipei","area":"Keelung & North Coast","band":"day_trip","mrt":"TRA to Ruifang, then Pingxi branch line","addr":"新北市瑞芳區 (十分老街・十分瀑布・九份老街・黃金瀑布)","conf":"known","note_add":"Sky lanterns at Shifen, waterfall, then Jiufen for sunset. Full day. Jiufen is brutally crowded on weekends."},
"nanya-rock":{"region":"New Taipei","area":"Keelung & North Coast","band":"day_trip","mrt":"bus from Ruifang","addr":"新北市瑞芳區南雅里 (南雅奇岩)","conf":"known","note_add":"On the NE coast road between Jiufen and Bitoujiao — same loop."},
"bitoujiao":{"region":"New Taipei","area":"Keelung & North Coast","band":"day_trip","mrt":"bus from Ruifang","addr":"新北市瑞芳區鼻頭路","conf":"known","note_add":"Coastal cape trail. Same NE coast run as 南雅奇岩."},
"yehliu":{"region":"New Taipei","area":"Keelung & North Coast","band":"day_trip","mrt":"bus from Taipei Main / Keelung","addr":"新北市萬里區港東路167-1號","conf":"known","note_add":"Queen's Head rock. Westernmost stop on the Keelung loop."},

# ---------------- KEELUNG ----------------
"keelung-night-market":{"region":"Keelung","area":"Keelung & North Coast","band":"day_trip","mrt":"TRA to Keelung","addr":"基隆市仁愛區愛四路 (基隆廟口夜市)","conf":"known","note_add":"廟口夜市. Best paired with Yehliu on the same day."},

# ---------------- TAOYUAN ----------------
"taoyuan-sake-brewery":{"region":"Taoyuan","area":"Guishan","band":"day_trip","mrt":"car","addr":"桃園市龜山區文化一路55號","conf":"verified","note_add":"Free entry to the product center 9:00-17:00 daily, no booking. The actual production line needs a 10+ person group booking, weekdays only. Very close to your Luzhu place."},
"sswyc-mochi":{"region":"Taoyuan","area":"Longtan","band":"day_trip","mrt":"car","addr":"桃園市龍潭區民豐一街99號","conf":"verified","note_add":"Edo-style castle town, 8:30-20:00. 手信坊 mochi. ~40 min south of Luzhu."},
"x-park":{"region":"Taoyuan","area":"Zhongli","band":"day_trip","mrt":"Taoyuan MRT A18 HSR Taoyuan Stn","addr":"桃園市中壢區春德路105號","conf":"verified","note_add":"Adult $600. 8 min walk from HSR Taoyuan via Gloria Outlets."},
"xiaowulai":{"region":"Taoyuan","area":"Fuxing","band":"day_trip","mrt":"car","addr":"桃園市復興區義盛里 (小烏來天空步道)","conf":"known","note_add":"Glass skywalk over the waterfall. Mountain drive; timed-entry tickets."},
"taoyuan-rotating-sushi":{"region":"Taoyuan","area":"Dayuan / Zhuwei","band":"day_trip","mrt":"car or motorcycle","addr":"桃園市大園區漁港路353巷176號","conf":"verified","note_add":"航空港360度景觀旋轉餐廳 — the DINING ROOM revolves, it is not conveyor sushi. Seafood/Chinese/Western on the top floor of the 漁會 building at 竹圍漁港, with sea views and planes landing. The motorcycle ride out is the point. Mon-Fri 11:00-14:00 & 17:00-21:00, weekends 11:00-21:00."},

# ---------------- FURTHER ----------------
"chun-shui-tang":{"region":"Taichung","area":"West District","band":"overnight","mrt":"HSR to Taichung","addr":"台中市西區四維街30號","conf":"known","note_add":"The original 春水堂 — claimed birthplace of bubble tea (1983)."},
"lihpao":{"region":"Taichung","area":"Houli","band":"overnight","mrt":"HSR to Taichung + shuttle","addr":"台中市后里區福容路8號","conf":"known","note_add":"Theme park + outlet mall + the Sky Dream ferris wheel."},
"kavalan":{"region":"Yilan","area":"Yuanshan","band":"day_trip","mrt":"bus/car via Xueshan Tunnel","addr":"宜蘭縣員山鄉員山路二段326號","conf":"known","note_add":"金車噶瑪蘭酒廠. Free distillery tour + tastings. ~1hr from Taipei by bus, so it is a long day trip, not an overnight."},
"sun-moon-lake":{"region":"Nantou","area":"Yuchi","band":"overnight","mrt":"HSR Taichung + bus","addr":"南投縣魚池鄉日月潭","conf":"known"},
"alishan":{"region":"Chiayi","area":"Alishan","band":"overnight","mrt":"HSR Chiayi + bus/forest railway","addr":"嘉義縣阿里山鄉","conf":"known","note_add":"Sunrise train is the point; that means sleeping on the mountain."},
"taroko":{"region":"Hualien","area":"Xiulin","band":"overnight","mrt":"TRA to Hualien + car","addr":"花蓮縣秀林鄉太魯閣國家公園","conf":"verified","warn":"Buluowan Terrace (the item on your list) is STILL CLOSED after the April 2024 earthquake. No buses run inside the park; Highway 8 opens only at set hours to self-drive vehicles. Only the Visitor Center and the Dekalun Trail are open. Some closures may last years.","note_add":""},
"kenting":{"region":"Pingtung","area":"Hengchun","band":"overnight","mrt":"HSR Zuoying + bus","addr":"屏東縣恆春鎮墾丁國家公園","conf":"known","note_add":"Southernmost tip. Realistically 2-3 days from Taipei."},

# ---------------- BRANDS (no single pin) ----------------
"uniqlo":{"kind":"brand","region":"Taipei City","area":"multiple","band":"city","conf":"known","note_add":"Branches in every district — 信義, 西門, 中山, Taipei Main. Grab at whichever shopping day you do."},
"gu":{"kind":"brand","region":"Taipei City","area":"multiple","band":"city","conf":"known","note_add":"Usually paired with or near Uniqlo. 微風南山 and 西門 have them."},
"nitori":{"kind":"brand","region":"Taipei City","area":"multiple","band":"city","conf":"known","note_add":"宜得利家居. Homeware; branches in most malls incl LaLaport Nangang."},
"beams":{"kind":"brand","region":"Taipei City","area":"Xinyi / Nangang","band":"city","conf":"verified","note_add":"微風南山 3F, 信義新天地, and 南港經貿二路131號2F. Hits on your Xinyi shopping day."},
"united-arrows":{"kind":"brand","region":"Taipei City","area":"Xinyi","band":"city","conf":"verified","note_add":"微風信義 and 微風南山, plus 大安 and Linkou Mitsui Outlet. Same trip as BEAMS."},
"life8":{"kind":"brand","region":"Taipei City","area":"multiple","band":"city","conf":"known","note_add":"Menswear, mostly 新光三越 counters — so 信義 or 南西 shopping day covers it."},
"expo-select":{"kind":"brand","region":"Taipei City","area":"Songyan / Nanxi","band":"city","conf":"verified","note_add":"Eslite's design select shop. 松菸店 pairs with 松山文創園區; 南西店 with the Zhongshan shopping day."},
"cat-cafes":{"kind":"brand","region":"Taipei City","area":"Everywhere","band":"city","conf":"known","note_add":"Genuinely everywhere in Taipei — no need to plan around one. Just something to do when a break is wanted."},
"claw-machines":{"kind":"place","region":"Taoyuan","area":"Taoyuan City","band":"day_trip","mrt":"TRA Taoyuan Station (rear exit, 1 min)","addr":"桃園市桃園區大林路91號","conf":"verified","note_add":"STARBEARY 熊嗨星樂園 大林旗艦店 — the one you go to. ~600坪 with close to 300 machines, snack prizes. 10:00-24:00, to 01:00 Fri/Sat."},

# ---------------- late additions ----------------
"shingaoken":{"region":"Taipei City","area":"Da'an / East District","band":"city","mrt":"Zhongxiao Dunhua (BL)","addr":"台北市大安區市民大道四段8號 (本店)","conf":"verified","note_add":"Japanese curry with katsu/steak. 本店 市民大道四段8號; also 信義新光A11 松壽路11號B2 and 北車微風 北平西路3號 — the A11 one folds into a Xinyi shopping day."},
"sushi-addiction-aquatic":{"region":"Taipei City","area":"Zhongshan","band":"city","mrt":"Xingtian Temple (O)","addr":"台北市中山區民族東路410巷2弄18號","conf":"verified","note_add":"Duplicate of the 'Crazy seafood' entry — merged.","merge_into":"addiction-aquatic"},
}
