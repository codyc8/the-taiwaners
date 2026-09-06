// Taipei Metro schematic network.
// Station coordinates and line/station ordering are derived from OpenStreetMap
// (Overpass: subway stations in the Taipei basin, keyed by their official
// `ref` codes such as R10 / BL12), so the shape you see is real geography —
// the same projection the area centroids are plotted with.
// Line colours are the official Taipei Rapid Transit Corporation colours.

export type LineCode = 'R' | 'G' | 'BL' | 'O' | 'BR' | 'Y';

export type Station = {
  id: string;
  name: string;
  zh: string;
  lat: number;
  lng: number;
  /** Every line that calls at this station. */
  lines: LineCode[];
};

export type Line = {
  code: LineCode;
  /** English line name, e.g. "Tamsui–Xinyi". */
  name: string;
  /** Official TRTC line colour. */
  color: string;
  /** Station ids in running order. A line with a branch has more than one run. */
  segments: string[][];
};

export const LINE_ORDER: LineCode[] = ['R', 'G', 'BL', 'O', 'BR', 'Y'];

export const STATIONS: Record<string, Station> = {
  banqiao: { id: 'banqiao', name: "Banqiao", zh: "板橋", lat: 25.0145, lng: 121.46299, lines: ['BL', 'Y'] },
  banxin: { id: 'banxin', name: "Banxin", zh: "板新", lat: 25.01453, lng: 121.47242, lines: ['Y'] },
  beimen: { id: 'beimen', name: "Beimen", zh: "北門", lat: 25.0494, lng: 121.51033, lines: ['G'] },
  beitou: { id: 'beitou', name: "Beitou", zh: "北投", lat: 25.13193, lng: 121.49859, lines: ['R'] },
  cailiao: { id: 'cailiao', name: "Cailiao", zh: "菜寮", lat: 25.06027, lng: 121.49211, lines: ['O'] },
  chiangkaishekmemorialhall: { id: 'chiangkaishekmemorialhall', name: "Chiang Kai-Shek Memorial Hall", zh: "中正紀念堂", lat: 25.0337, lng: 121.51755, lines: ['R', 'G'] },
  daan: { id: 'daan', name: "Da'an", zh: "大安", lat: 25.03333, lng: 121.54355, lines: ['R', 'BR'] },
  daanpark: { id: 'daanpark', name: "Da'an Park", zh: "大安森林公園", lat: 25.03356, lng: 121.53528, lines: ['R'] },
  dahupark: { id: 'dahupark', name: "Dahu Park", zh: "大湖公園", lat: 25.08376, lng: 121.60234, lines: ['BR'] },
  danfeng: { id: 'danfeng', name: "Danfeng", zh: "丹鳳", lat: 25.02893, lng: 121.42266, lines: ['O'] },
  dapinglin: { id: 'dapinglin', name: "Dapinglin", zh: "大坪林", lat: 24.98293, lng: 121.54133, lines: ['G', 'Y'] },
  daqiaotou: { id: 'daqiaotou', name: "Daqiaotou", zh: "大橋頭", lat: 25.0632, lng: 121.51269, lines: ['O'] },
  dazhi: { id: 'dazhi', name: "Dazhi", zh: "大直", lat: 25.07987, lng: 121.54744, lines: ['BR'] },
  dingpu: { id: 'dingpu', name: "Dingpu", zh: "頂埔", lat: 24.95973, lng: 121.41948, lines: ['BL'] },
  dingxi: { id: 'dingxi', name: "Dingxi", zh: "頂溪", lat: 25.0136, lng: 121.51547, lines: ['O'] },
  donghu: { id: 'donghu', name: "Donghu", zh: "東湖", lat: 25.06742, lng: 121.61161, lines: ['BR'] },
  dongmen: { id: 'dongmen', name: "Dongmen", zh: "東門", lat: 25.03384, lng: 121.52926, lines: ['R', 'O'] },
  fareasternhospital: { id: 'fareasternhospital', name: "Far Eastern Hospital", zh: "亞東醫院", lat: 24.99752, lng: 121.45236, lines: ['BL'] },
  fujenuniversity: { id: 'fujenuniversity', name: "Fu Jen University", zh: "輔大", lat: 25.03272, lng: 121.43527, lines: ['O'] },
  fuxinggang: { id: 'fuxinggang', name: "Fuxinggang", zh: "復興崗", lat: 25.13749, lng: 121.4855, lines: ['R'] },
  fuzhong: { id: 'fuzhong', name: "Fuzhong", zh: "府中", lat: 25.00877, lng: 121.45928, lines: ['BL'] },
  gangqian: { id: 'gangqian', name: "Gangqian", zh: "港墘", lat: 25.08007, lng: 121.5752, lines: ['BR'] },
  gongguan: { id: 'gongguan', name: "Gongguan", zh: "公館", lat: 25.01492, lng: 121.53426, lines: ['G'] },
  guandu: { id: 'guandu', name: "Guandu", zh: "關渡", lat: 25.1257, lng: 121.46714, lines: ['R'] },
  guting: { id: 'guting', name: "Guting", zh: "古亭", lat: 25.02672, lng: 121.52272, lines: ['G', 'O'] },
  haishan: { id: 'haishan', name: "Haishan", zh: "海山", lat: 24.98532, lng: 121.44879, lines: ['BL'] },
  hongshulin: { id: 'hongshulin', name: "Hongshulin", zh: "紅樹林", lat: 25.15441, lng: 121.45883, lines: ['R'] },
  houshanpi: { id: 'houshanpi', name: "Houshanpi", zh: "後山埤", lat: 25.04474, lng: 121.58232, lines: ['BL'] },
  huilong: { id: 'huilong', name: "Huilong", zh: "迴龍", lat: 25.02208, lng: 121.4119, lines: ['O'] },
  huzhou: { id: 'huzhou', name: "Huzhou", zh: "葫洲", lat: 25.07264, lng: 121.60736, lines: ['BR'] },
  jiangzicui: { id: 'jiangzicui', name: "Jiangzicui", zh: "江子翠", lat: 25.03042, lng: 121.47278, lines: ['BL'] },
  jiannanroad: { id: 'jiannanroad', name: "Jiannan Road", zh: "劍南路", lat: 25.08485, lng: 121.55565, lines: ['BR'] },
  jiantan: { id: 'jiantan', name: "Jiantan", zh: "劍潭", lat: 25.08429, lng: 121.52498, lines: ['R'] },
  jingan: { id: 'jingan', name: "Jingan", zh: "景安", lat: 24.99379, lng: 121.50505, lines: ['O', 'Y'] },
  jingmei: { id: 'jingmei', name: "Jingmei", zh: "景美", lat: 24.99271, lng: 121.54071, lines: ['G'] },
  jingping: { id: 'jingping', name: "Jingping", zh: "景平", lat: 24.99215, lng: 121.51617, lines: ['Y'] },
  kunyang: { id: 'kunyang', name: "Kunyang", zh: "昆陽", lat: 25.05049, lng: 121.59332, lines: ['BL'] },
  linguang: { id: 'linguang', name: "Linguang", zh: "麟光", lat: 25.01844, lng: 121.55891, lines: ['BR'] },
  liuzhangli: { id: 'liuzhangli', name: "Liuzhangli", zh: "六張犁", lat: 25.02382, lng: 121.55312, lines: ['BR'] },
  longshantemple: { id: 'longshantemple', name: "Longshan Temple", zh: "龍山寺", lat: 25.03528, lng: 121.49958, lines: ['BL'] },
  luzhou: { id: 'luzhou', name: "Luzhou", zh: "蘆洲", lat: 25.09128, lng: 121.4651, lines: ['O'] },
  mingde: { id: 'mingde', name: "Mingde", zh: "明德", lat: 25.10986, lng: 121.51877, lines: ['R'] },
  minquanwrd: { id: 'minquanwrd', name: "Minquan W. Rd.", zh: "民權西路", lat: 25.06285, lng: 121.5194, lines: ['R', 'O'] },
  muzha: { id: 'muzha', name: "Muzha", zh: "木柵", lat: 24.99825, lng: 121.57318, lines: ['BR'] },
  nangang: { id: 'nangang', name: "Nangang", zh: "南港", lat: 25.05209, lng: 121.60719, lines: ['BL'] },
  nangangsoftwarepark: { id: 'nangangsoftwarepark', name: "Nangang Software Park", zh: "南港軟體園區", lat: 25.05995, lng: 121.6159, lines: ['BR'] },
  nanjingfuxing: { id: 'nanjingfuxing', name: "Nanjing Fuxing", zh: "南京復興", lat: 25.05184, lng: 121.54397, lines: ['G', 'BR'] },
  nanjingsanmin: { id: 'nanjingsanmin', name: "Nanjing Sanmin", zh: "南京三民", lat: 25.05143, lng: 121.56431, lines: ['G'] },
  nanshijiao: { id: 'nanshijiao', name: "Nanshijiao", zh: "南勢角", lat: 24.99003, lng: 121.50885, lines: ['O'] },
  neihu: { id: 'neihu', name: "Neihu", zh: "內湖", lat: 25.0835, lng: 121.59419, lines: ['BR'] },
  newtaipeiindustrialpark: { id: 'newtaipeiindustrialpark', name: "New Taipei Industrial Park", zh: "新北產業園區", lat: 25.06127, lng: 121.45981, lines: ['Y'] },
  ntuhospital: { id: 'ntuhospital', name: "NTU Hospital", zh: "台大醫院", lat: 25.04165, lng: 121.51618, lines: ['R'] },
  qiaohe: { id: 'qiaohe', name: "Qiaohe", zh: "橋和", lat: 25.0046, lng: 121.49025, lines: ['Y'] },
  qilian: { id: 'qilian', name: "Qilian", zh: "唭哩岸", lat: 25.1209, lng: 121.50613, lines: ['R'] },
  qiyan: { id: 'qiyan', name: "Qiyan", zh: "奇岩", lat: 25.1256, lng: 121.50114, lines: ['R'] },
  qizhang: { id: 'qizhang', name: "Qizhang", zh: "七張", lat: 24.97502, lng: 121.54292, lines: ['G'] },
  sanchong: { id: 'sanchong', name: "Sanchong", zh: "三重", lat: 25.05598, lng: 121.48538, lines: ['O'] },
  sanchongelementaryschool: { id: 'sanchongelementaryschool', name: "Sanchong Elementary School", zh: "三重國小", lat: 25.07, lng: 121.4973, lines: ['O'] },
  sanhejuniorhighschool: { id: 'sanhejuniorhighschool', name: "Sanhe Junior High School", zh: "三和國中", lat: 25.07681, lng: 121.48638, lines: ['O'] },
  sanminseniorhighschool: { id: 'sanminseniorhighschool', name: "Sanmin Senior High School", zh: "三民高中", lat: 25.0855, lng: 121.4733, lines: ['O'] },
  shandaotemple: { id: 'shandaotemple', name: "Shandao Temple", zh: "善導寺", lat: 25.04476, lng: 121.52342, lines: ['BL'] },
  shilin: { id: 'shilin', name: "Shilin", zh: "士林", lat: 25.09349, lng: 121.52625, lines: ['R'] },
  shipai: { id: 'shipai', name: "Shipai", zh: "石牌", lat: 25.11461, lng: 121.51552, lines: ['R'] },
  shisizhang: { id: 'shisizhang', name: "Shisizhang", zh: "十四張", lat: 24.98447, lng: 121.52759, lines: ['Y'] },
  shuanglian: { id: 'shuanglian', name: "Shuanglian", zh: "雙連", lat: 25.05763, lng: 121.5207, lines: ['R'] },
  songjiangnanjing: { id: 'songjiangnanjing', name: "Songjiang Nanjing", zh: "松江南京", lat: 25.05201, lng: 121.53304, lines: ['G', 'O'] },
  songshan: { id: 'songshan', name: "Songshan", zh: "松山", lat: 25.05007, lng: 121.57747, lines: ['G'] },
  songshanairport: { id: 'songshanairport', name: "Songshan Airport", zh: "松山機場", lat: 25.06309, lng: 121.55161, lines: ['BR'] },
  stignatiushighschool: { id: 'stignatiushighschool', name: "St. Ignatius High School", zh: "徐匯中學", lat: 25.08034, lng: 121.48023, lines: ['O'] },
  sunyatsenmemorialhall: { id: 'sunyatsenmemorialhall', name: "Sun Yat-Sen Memorial Hall", zh: "國父紀念館", lat: 25.04134, lng: 121.55739, lines: ['BL'] },
  taipei101worldtradecenter: { id: 'taipei101worldtradecenter', name: "Taipei 101/World Trade Center", zh: "台北101/世貿", lat: 25.03298, lng: 121.56245, lines: ['R'] },
  taipeiarena: { id: 'taipeiarena', name: "Taipei Arena", zh: "台北小巨蛋", lat: 25.05169, lng: 121.5515, lines: ['G'] },
  taipeibridge: { id: 'taipeibridge', name: "Taipei Bridge", zh: "台北橋", lat: 25.06318, lng: 121.50055, lines: ['O'] },
  taipeicityhall: { id: 'taipeicityhall', name: "Taipei City Hall", zh: "市政府", lat: 25.04113, lng: 121.5661, lines: ['BL'] },
  taipeimainstation: { id: 'taipeimainstation', name: "Taipei Main Station", zh: "台北車站", lat: 25.04624, lng: 121.51747, lines: ['R', 'BL'] },
  taipeinangangexhibitioncenter: { id: 'taipeinangangexhibitioncenter', name: "Taipei Nangang Exhibition Center", zh: "南港展覽館", lat: 25.05457, lng: 121.61722, lines: ['BL', 'BR'] },
  taipeizoo: { id: 'taipeizoo', name: "Taipei Zoo", zh: "動物園", lat: 24.99832, lng: 121.57945, lines: ['BR'] },
  taipowerbuilding: { id: 'taipowerbuilding', name: "Taipower Building", zh: "台電大樓", lat: 25.02067, lng: 121.52821, lines: ['G'] },
  tamsui: { id: 'tamsui', name: "Tamsui", zh: "淡水", lat: 25.16778, lng: 121.44557, lines: ['R'] },
  technologybuilding: { id: 'technologybuilding', name: "Technology Building", zh: "科技大樓", lat: 25.0261, lng: 121.54346, lines: ['BR'] },
  touqianzhuang: { id: 'touqianzhuang', name: "Touqianzhuang", zh: "頭前庄", lat: 25.0395, lng: 121.46139, lines: ['O', 'Y'] },
  tucheng: { id: 'tucheng', name: "Tucheng", zh: "土城", lat: 24.97318, lng: 121.44439, lines: ['BL'] },
  wanfangcommunity: { id: 'wanfangcommunity', name: "Wanfang Community", zh: "萬芳社區", lat: 24.99861, lng: 121.56812, lines: ['BR'] },
  wanfanghospital: { id: 'wanfanghospital', name: "Wanfang Hospital", zh: "萬芳醫院", lat: 24.99943, lng: 121.55814, lines: ['BR'] },
  wanlong: { id: 'wanlong', name: "Wanlong", zh: "萬隆", lat: 25.0019, lng: 121.53902, lines: ['G'] },
  wende: { id: 'wende', name: "Wende", zh: "文德", lat: 25.07856, lng: 121.58494, lines: ['BR'] },
  xiangshan: { id: 'xiangshan', name: "Xiangshan", zh: "象山", lat: 25.03287, lng: 121.56976, lines: ['R'] },
  xiansetemple: { id: 'xiansetemple', name: "Xianse Temple", zh: "先嗇宮", lat: 25.04643, lng: 121.47168, lines: ['O'] },
  xiaonanmen: { id: 'xiaonanmen', name: "Xiaonanmen", zh: "小南門", lat: 25.0359, lng: 121.51081, lines: ['G'] },
  xihu: { id: 'xihu', name: "Xihu", zh: "西湖", lat: 25.08219, lng: 121.56732, lines: ['BR'] },
  ximen: { id: 'ximen', name: "Ximen", zh: "西門", lat: 25.04271, lng: 121.50861, lines: ['G', 'BL'] },
  xinbeitou: { id: 'xinbeitou', name: "Xinbeitou", zh: "新北投", lat: 25.13696, lng: 121.50317, lines: ['R'] },
  xindian: { id: 'xindian', name: "Xindian", zh: "新店", lat: 24.95807, lng: 121.53763, lines: ['G'] },
  xindiandistrictoffice: { id: 'xindiandistrictoffice', name: "Xindian District Office", zh: "新店區公所", lat: 24.96739, lng: 121.54135, lines: ['G'] },
  xingfu: { id: 'xingfu', name: "Xingfu", zh: "幸福", lat: 25.04999, lng: 121.45997, lines: ['Y'] },
  xingtiantemple: { id: 'xingtiantemple', name: "Xingtian Temple", zh: "行天宮", lat: 25.05941, lng: 121.53316, lines: ['O'] },
  xinhai: { id: 'xinhai', name: "Xinhai", zh: "辛亥", lat: 25.00548, lng: 121.55706, lines: ['BR'] },
  xinpu: { id: 'xinpu', name: "Xinpu", zh: "新埔", lat: 25.02346, lng: 121.46831, lines: ['BL'] },
  xinpuminsheng: { id: 'xinpuminsheng', name: "Xinpu Minsheng", zh: "新埔民生", lat: 25.02613, lng: 121.46667, lines: ['Y'] },
  xinyianhe: { id: 'xinyianhe', name: "Xinyi Anhe", zh: "信義安和", lat: 25.03313, lng: 121.55273, lines: ['R'] },
  xinzhuang: { id: 'xinzhuang', name: "Xinzhuang", zh: "新莊", lat: 25.03633, lng: 121.45336, lines: ['O'] },
  xiulangbridge: { id: 'xiulangbridge', name: "Xiulang Bridge", zh: "秀朗橋", lat: 24.99033, lng: 121.5249, lines: ['Y'] },
  yonganmarket: { id: 'yonganmarket', name: "Yongan Market", zh: "永安市場", lat: 25.00241, lng: 121.5109, lines: ['O'] },
  yongchun: { id: 'yongchun', name: "Yongchun", zh: "永春", lat: 25.04088, lng: 121.5757, lines: ['BL'] },
  yongning: { id: 'yongning', name: "Yongning", zh: "永寧", lat: 24.96687, lng: 121.43627, lines: ['BL'] },
  yuanshan: { id: 'yuanshan', name: "Yuanshan", zh: "圓山", lat: 25.07142, lng: 121.52014, lines: ['R'] },
  zhishan: { id: 'zhishan', name: "Zhishan", zh: "芝山", lat: 25.103, lng: 121.52252, lines: ['R'] },
  zhonghe: { id: 'zhonghe', name: "Zhonghe", zh: "中和", lat: 25.00232, lng: 121.49585, lines: ['Y'] },
  zhongshan: { id: 'zhongshan', name: "Zhongshan", zh: "中山", lat: 25.05263, lng: 121.52039, lines: ['R', 'G'] },
  zhongshanelementaryschool: { id: 'zhongshanelementaryschool', name: "Zhongshan Elementary School", zh: "中山國小", lat: 25.06267, lng: 121.5266, lines: ['O'] },
  zhongshanjuniorhighschool: { id: 'zhongshanjuniorhighschool', name: "Zhongshan Junior High School", zh: "中山國中", lat: 25.06069, lng: 121.5442, lines: ['BR'] },
  zhongxiaodunhua: { id: 'zhongxiaodunhua', name: "Zhongxiao Dunhua", zh: "忠孝敦化", lat: 25.04151, lng: 121.54948, lines: ['BL'] },
  zhongxiaofuxing: { id: 'zhongxiaofuxing', name: "Zhongxiao Fuxing", zh: "忠孝復興", lat: 25.04154, lng: 121.54377, lines: ['BL', 'BR'] },
  zhongxiaoxinsheng: { id: 'zhongxiaoxinsheng', name: "Zhongxiao Xinsheng", zh: "忠孝新生", lat: 25.04229, lng: 121.53284, lines: ['BL', 'O'] },
  zhongyi: { id: 'zhongyi', name: "Zhongyi", zh: "忠義", lat: 25.13095, lng: 121.47337, lines: ['R'] },
  zhongyuan: { id: 'zhongyuan', name: "Zhongyuan", zh: "中原", lat: 25.00818, lng: 121.48427, lines: ['Y'] },
  zhuwei: { id: 'zhuwei', name: "Zhuwei", zh: "竹圍", lat: 25.13697, lng: 121.45951, lines: ['R'] },
};

export const LINES: Line[] = [
  {
    code: 'R', name: "Tamsui–Xinyi", color: '#E3002C',
    segments: [
      [
        'tamsui', 'hongshulin', 'zhuwei', 'guandu', 'zhongyi', 'fuxinggang', 'beitou',
        'qiyan', 'qilian', 'shipai', 'mingde', 'zhishan', 'shilin', 'jiantan',
        'yuanshan', 'minquanwrd', 'shuanglian', 'zhongshan', 'taipeimainstation',
        'ntuhospital', 'chiangkaishekmemorialhall', 'dongmen', 'daanpark', 'daan',
        'xinyianhe', 'taipei101worldtradecenter', 'xiangshan',
      ],
      [
        'beitou', 'xinbeitou',
      ],
    ],
  },
  {
    code: 'G', name: "Songshan–Xindian", color: '#008659',
    segments: [
      [
        'xindian', 'xindiandistrictoffice', 'qizhang', 'dapinglin', 'jingmei',
        'wanlong', 'gongguan', 'taipowerbuilding', 'guting',
        'chiangkaishekmemorialhall', 'xiaonanmen', 'ximen', 'beimen', 'zhongshan',
        'songjiangnanjing', 'nanjingfuxing', 'taipeiarena', 'nanjingsanmin',
        'songshan',
      ],
    ],
  },
  {
    code: 'BL', name: "Bannan", color: '#0070BD',
    segments: [
      [
        'dingpu', 'yongning', 'tucheng', 'haishan', 'fareasternhospital', 'fuzhong',
        'banqiao', 'xinpu', 'jiangzicui', 'longshantemple', 'ximen',
        'taipeimainstation', 'shandaotemple', 'zhongxiaoxinsheng', 'zhongxiaofuxing',
        'zhongxiaodunhua', 'sunyatsenmemorialhall', 'taipeicityhall', 'yongchun',
        'houshanpi', 'kunyang', 'nangang', 'taipeinangangexhibitioncenter',
      ],
    ],
  },
  {
    code: 'O', name: "Zhonghe–Xinlu", color: '#F8B61C',
    segments: [
      [
        'huilong', 'danfeng', 'fujenuniversity', 'xinzhuang', 'touqianzhuang',
        'xiansetemple', 'sanchong', 'cailiao', 'taipeibridge', 'daqiaotou',
        'minquanwrd', 'zhongshanelementaryschool', 'xingtiantemple',
        'songjiangnanjing', 'zhongxiaoxinsheng', 'dongmen', 'guting', 'dingxi',
        'yonganmarket', 'jingan', 'nanshijiao',
      ],
      [
        'luzhou', 'sanminseniorhighschool', 'stignatiushighschool',
        'sanhejuniorhighschool', 'sanchongelementaryschool', 'daqiaotou',
      ],
    ],
  },
  {
    code: 'BR', name: "Wenhu", color: '#C48C31',
    segments: [
      [
        'taipeizoo', 'muzha', 'wanfangcommunity', 'wanfanghospital', 'xinhai',
        'linguang', 'liuzhangli', 'technologybuilding', 'daan', 'zhongxiaofuxing',
        'nanjingfuxing', 'zhongshanjuniorhighschool', 'songshanairport', 'dazhi',
        'jiannanroad', 'xihu', 'gangqian', 'wende', 'neihu', 'dahupark', 'huzhou',
        'donghu', 'nangangsoftwarepark', 'taipeinangangexhibitioncenter',
      ],
    ],
  },
  {
    code: 'Y', name: "Circular", color: '#FFDB00',
    segments: [
      [
        'newtaipeiindustrialpark', 'xingfu', 'touqianzhuang', 'xinpuminsheng',
        'banqiao', 'banxin', 'zhongyuan', 'qiaohe', 'zhonghe', 'jingan', 'jingping',
        'xiulangbridge', 'shisizhang', 'dapinglin',
      ],
    ],
  },
];

export const LINE_BY_CODE: Record<LineCode, Line> = Object.fromEntries(
  LINES.map(l => [l.code, l]),
) as Record<LineCode, Line>;

/** Station id for a display name: lowercase, letters and digits only. */
const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

// The `mrt` column is written the way a person would say it, so a few entries
// are shorter or longer than the official station name.
const ALIASES: Record<string, string> = {
  cityhall: 'taipeicityhall',
  taipei101: 'taipei101worldtradecenter',
  worldtradecenter: 'taipei101worldtradecenter',
  zhongshanjuniorhigh: 'zhongshanjuniorhighschool',
  nangangexhibitioncenter: 'taipeinangangexhibitioncenter',
  mainstation: 'taipeimainstation',
  taipeistation: 'taipeimainstation',
  ckdmemorialhall: 'chiangkaishekmemorialhall',
  ntuhospitalstation: 'ntuhospital',
};

/** Look a station up by however the `mrt` field spelled it. */
export function findStation(name: string): Station | null {
  const k = ALIASES[key(name)] ?? key(name);
  if (STATIONS[k]) return STATIONS[k];
  // Fall back to the longest station id that is a prefix of the query, or vice
  // versa — catches "Taipei 101" against "Taipei 101/World Trade Center".
  let best: Station | null = null;
  for (const s of Object.values(STATIONS)) {
    if (!s.id.startsWith(k) && !k.startsWith(s.id)) continue;
    if (!best || s.id.length > best.id.length) best = s;
  }
  return best;
}

// "Zhongshan (R/G) exit 3", "Beimen (G) / Daqiaotou (O)",
// "Taipei 101/World Trade Center (R) / City Hall (BL)". The station name is
// everything up to its own parenthesised line codes; a leading "/" or "+" is
// the separator left over from the previous entry.
const REF_RE = /([A-Za-z0-9'’.&\-/ ]+?)\s*\(([A-Z]{1,2}(?:\/[A-Z]{1,2})*)\)/g;

export type MrtRef = { station: Station | null; name: string; lines: LineCode[] };

const VALID = new Set<string>(LINE_ORDER);

/** Pull the station + line codes out of one `mrt` string. */
export function parseMrt(mrt: string): MrtRef[] {
  const out: MrtRef[] = [];
  if (!mrt) return out;
  for (const m of mrt.matchAll(REF_RE)) {
    const name = m[1]
      .replace(/^[\s/+,·-]+/, '')       // separator left by the previous entry
      .replace(/^exit\s+\S+\s*[\s/+,·-]*/i, '')  // ...or by its "exit 3" suffix
      .trim();
    const lines = m[2].split('/').filter(c => VALID.has(c)) as LineCode[];
    if (!name || !lines.length) continue;
    out.push({ station: findStation(name), name, lines });
  }
  return out;
}

/** Lines and stations that serve a group of places, in official line order. */
export function servedBy(places: { mrt?: string | null }[]): {
  lines: LineCode[];
  stations: Station[];
} {
  const lines = new Set<LineCode>();
  const stations = new Map<string, Station>();
  for (const p of places) {
    for (const ref of parseMrt(p.mrt ?? '')) {
      for (const c of ref.lines) lines.add(c);
      if (ref.station) stations.set(ref.station.id, ref.station);
    }
  }
  return {
    lines: LINE_ORDER.filter(c => lines.has(c)),
    stations: [...stations.values()],
  };
}
