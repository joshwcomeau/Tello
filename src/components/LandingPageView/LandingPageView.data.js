import addWeeks from 'date-fns/add_weeks';
import getDay from 'date-fns/get_day';
import setDay from 'date-fns/set_day';

import strangerThingsPhoto from '../../images/stranger-things@2x.jpg';

const changeWeek = (date, numWeeksToAdd) => {
  const weekday = getDay(date);

  const newDate = addWeeks(new Date(), numWeeksToAdd);

  return setDay(newDate, weekday);
};

export const strangerThings = {
  id: 2993,
  createdAt: '2017-09-13T14:11:21.121Z',
  name: 'Stranger Things',
  image: strangerThingsPhoto,
  status: 'Running',
  type: 'Scripted',
  summary:
    "A love letter to the '80s classics that captivated a generation, Stranger Things is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.",
  region: null,
  seenEpisodeIds: [553946, 578663, 578664, 578665, 578666],
  episodes: {
    '553946': {
      id: 553946,
      name: 'The Vanishing of Will Byers',
      season: 1,
      number: 1,
      airstamp: changeWeek('2016-07-13T12:00:00+00:00', -7),
    },
    '578663': {
      id: 578663,
      name: 'The Weirdo on Maple Street',
      season: 1,
      number: 2,
      airstamp: changeWeek('2016-07-13T12:00:00+00:00', -6),
    },
    '578664': {
      id: 578664,
      name: 'Holly, Jolly',
      season: 1,
      number: 3,
      airstamp: changeWeek('2016-07-13T12:00:00+00:00', -5),
    },
    '578665': {
      id: 578665,
      name: 'The Body',
      season: 1,
      number: 4,
      airstamp: changeWeek('2016-07-13T12:00:00+00:00', -4),
    },
    '578666': {
      id: 578666,
      name: 'The Flea and the Acrobat',
      season: 1,
      number: 5,
      airstamp: changeWeek('2016-07-13T12:00:00+00:00', -3),
    },
    '578667': {
      id: 578667,
      name: 'The Monster',
      season: 1,
      number: 6,
      airstamp: changeWeek('2016-07-13T12:00:00+00:00', -2),
    },
    '578668': {
      id: 578668,
      name: 'The Bathtub',
      season: 1,
      number: 7,
      airstamp: changeWeek('2016-07-13T12:00:00+00:00', -1),
    },
    '578669': {
      id: 578669,
      name: 'The Upside Down',
      season: 1,
      number: 8,
      airstamp: changeWeek('2016-07-13T12:00:00+00:00', 0),
    },
  },
};

const gameOfThrones = {
  id: 82,
  createdAt: '2017-09-10T15:31:20.005Z',
  name: 'Game of Thrones',
  image:
    'http://static.tvmaze.com/uploads/images/original_untouched/124/310209.jpg',
  status: 'Running',
  type: 'Scripted',
  summary:
    'Based on the bestselling book series A Song of Ice and Fire by George R.R. Martin, this sprawling new HBO drama is set in a world where summers span decades and winters can last a lifetime. From the scheming south and the savage eastern lands, to the frozen north and ancient Wall that protects the realm from the mysterious darkness beyond, the powerful families of the Seven Kingdoms are locked in a battle for the Iron Throne. This is a story of duplicity and treachery, nobility and honor, conquest and triumph. In the Game of Thrones, you either win or you die.',
  region: 'US',
  seenEpisodeIds: [],
  episodes: {
    '937256': {
      id: 937256,
      name: 'Dragonstone',
      season: 7,
      number: 1,
      airstamp: changeWeek('2017-07-17T01:00:00+00:00', -8),
    },
    '1221410': {
      id: 1221410,
      name: 'Stormborn',
      season: 7,
      number: 2,
      airstamp: changeWeek('2017-07-24T01:00:00+00:00', -5),
    },
    '1221411': {
      id: 1221411,
      name: "The Queen's Justice",
      season: 7,
      number: 3,
      airstamp: changeWeek('2017-07-31T01:00:00+00:00', -4),
    },
    '1221412': {
      id: 1221412,
      name: 'The Spoils of War',
      season: 7,
      number: 4,
      airstamp: changeWeek('2017-08-07T01:00:00+00:00', -3),
    },
    '1221413': {
      id: 1221413,
      name: 'Eastwatch',
      season: 7,
      number: 5,
      airstamp: changeWeek('2017-08-14T01:00:00+00:00', -2),
    },
    '1221414': {
      id: 1221414,
      name: 'Beyond the Wall',
      season: 7,
      number: 6,
      airstamp: changeWeek('2017-08-21T01:00:00+00:00', -1),
    },
    '1221415': {
      id: 1221415,
      name: 'The Dragon and the Wolf',
      season: 7,
      number: 7,
      airstamp: changeWeek('2017-08-28T01:00:00+00:00', 0),
    },
  },
};

const sharkTank = {
  id: 329,
  createdAt: '2017-09-11T00:03:44.423Z',
  name: 'Shark Tank',
  image:
    'http://static.tvmaze.com/uploads/images/original_untouched/2/5297.jpg',
  status: 'Running',
  type: 'Reality',
  summary:
    'An exciting new reality show that, in these trying economic times, gives budding entrepreneurs a chance to make their dreams come true and become successful - and possibly wealthy - business people. But the entrepreneurs must first try to convince five tough, multi-millionaire tycoons to part with their own hard-earned cash and give them the funding they need to jumpstart their business ideas.Enter the Sharks of Shark Tank, who lifted themselves up by their bootstraps to make their own entrepreneurial dreams come true and turned their ideas into empires. The five Sharks of this ruthless panel are real estate mogul Barbara Corcoran, "infomercial" industry pioneer Kevin Harrington, technology innovator Robert Herjavec, fashion icon Daymond John and financial expert Kevin O\'Leary.',
  region: 'US',
  seenEpisodeIds: [],
  episodes: {
    '848240': {
      id: 848240,
      name: 'ISlide, Re Think, Fizzics, Spoonful of Comfort',
      season: 8,
      number: 1,
      airstamp: changeWeek('2016-09-24T01:00:00+00:00', -14),
    },
    '919436': {
      id: 919436,
      name: 'GoodHangups, The Lapel Project, Ice Age Meals, TactiBite',
      season: 8,
      number: 2,
      airstamp: changeWeek('2016-10-01T01:00:00+00:00', -13),
    },
    '926905': {
      id: 926905,
      name:
        'Raising Wild, The Cookie Kahuna, TekDry, Night Runner, Angels and Tomboys',
      season: 8,
      number: 3,
      airstamp: changeWeek('2016-10-08T01:00:00+00:00', -12),
    },
    '936161': {
      id: 936161,
      name:
        'Angels and Tomboys, Atlantic Candy Company, The biēm Butter Sprayer, Solemates',
      season: 8,
      number: 4,
      airstamp: changeWeek('2016-10-15T01:00:00+00:00', -11),
    },
    '944709': {
      id: 944709,
      name: "SandiLake Clothing, Parker's Maple, Safe Grabs, SiliDog",
      season: 8,
      number: 5,
      airstamp: changeWeek('2016-10-22T01:00:00+00:00', -10),
    },
    '950979': {
      id: 950979,
      name: "Joyce's LuLu Bang, unPack, Sunscreenr, Potato Parcel",
      season: 8,
      number: 6,
      airstamp: changeWeek('2016-10-29T01:00:00+00:00', -9),
    },
    '961152': {
      id: 961152,
      name: 'EcoFlower, The Style Club, Safe Catch, #BeSomebody',
      season: 8,
      number: 7,
      airstamp: changeWeek('2016-11-05T01:00:00+00:00', -8),
    },
    '962488': {
      id: 962488,
      name: "Milk Snob, Jack's Stands, Chi'Lantro BBQ, Toor",
      season: 8,
      number: 8,
      airstamp: changeWeek('2016-11-12T02:00:00+00:00', -7),
    },
    '969837': {
      id: 969837,
      name: 'Barbell, PupBox, Line Cutterz, Energybits',
      season: 8,
      number: 9,
      airstamp: changeWeek('2016-11-19T02:00:00+00:00', -6),
    },
    '987556': {
      id: 987556,
      name: 'Chewable Coffee Products, Electronic Skateboard, Simply Fit Board',
      season: 8,
      number: 10,
      airstamp: changeWeek('2016-12-03T02:00:00+00:00', -5),
    },
    '993989': {
      id: 993989,
      name:
        "An Entrepreneur Who Works with Santa to Reply to Children's Letters, 83-Year-Old Ironman Triathlon Competitor, Profile of Billionaire Mark Cuban",
      season: 8,
      number: 11,
      airstamp: changeWeek('2016-12-10T02:00:00+00:00', -4),
    },
    '1013690': {
      id: 1013690,
      name:
        'Naturally Perfect Dolls, PDX Pet Design, Basic Outfitters, Victory Coffees',
      season: 8,
      number: 12,
      airstamp: changeWeek('2017-01-07T02:00:00+00:00', -3),
    },
    '1020614': {
      id: 1020614,
      name: "Grease Bags, Pinblock, Mama's MilkBox, Nicepipes Apparel",
      season: 8,
      number: 13,
      airstamp: changeWeek('2017-01-14T02:00:00+00:00', -2),
    },
    '1023462': {
      id: 1023462,
      name:
        'Tiny House Rentals; Snack Chips with Cricket Flour; Earplugs That Filter Damaging Sounds; Modernized Childhood Toy',
      season: 8,
      number: 14,
      airstamp: changeWeek('2017-01-28T02:00:00+00:00', -1),
    },
    '1031909': {
      id: 1031909,
      name:
        'Stylish Baby Mats; Portable Pressurized Shower Kit; Folding Smart-Cart',
      season: 8,
      number: 15,
      airstamp: changeWeek('2017-02-04T02:00:00+00:00', 0),
    },
    '1048804': {
      id: 1048804,
      name:
        'A Vibrating Mat That Helps Calm Babies; An Ointment Made From Essential Oils; A Natural Snack Made With Acai',
      season: 8,
      number: 16,
      airstamp: changeWeek('2017-02-11T02:00:00+00:00', 1),
    },
    '1048805': {
      id: 1048805,
      name:
        'An App That Allows Children To Use A Plush Toy To Send And Receive Voicemail; Software That Automates Plant Care',
      season: 8,
      number: 17,
      airstamp: changeWeek('2017-02-18T02:00:00+00:00', 2),
    },
    '1050340': {
      id: 1050340,
      name:
        'Food Supplements, Drone Pilot Training and Educational Courses, Elephant-Themed Apparel and Stylish Beach Towels',
      season: 8,
      number: 18,
      airstamp: changeWeek('2017-02-25T02:00:00+00:00', 3),
    },
  },
};

const ninetyDayFiance = {
  id: 3139,
  createdAt: '2017-09-11T12:50:27.035Z',
  name: '90 Day Fiancé',
  image:
    'http://static.tvmaze.com/uploads/images/original_untouched/17/43103.jpg',
  status: 'Running',
  type: 'Reality',
  summary:
    "90 Day Fiancé offers a unique look into the world of international dating and matrimony. Using a unique 90-day fiance visa, the K-1 visa, four women and two men will travel to the U.S. to live with their overseas partners for the first time. The couples must marry before their visas expire in 90 days, or the visiting partner will have to return home. They'll have to overcome language barriers, culture shock and skeptical friends and family -- all with a clock that starts ticking the moment they step foot on U.S. soil. The stakes are incredibly high as these couples are forced to make a life-altering decision: get married or send their international mate home.",
  region: 'US',
  seenEpisodeIds: [],
  episodes: {
    '238892': {
      id: 238892,
      name: 'Departures and Arrivals',
      season: 3,
      number: 1,
      airstamp: changeWeek('2015-10-12T02:00:00+00:00', -5),
      isSeen: true,
    },
    '336863': {
      id: 336863,
      name: 'Welcome to the Family',
      season: 3,
      number: 2,
      airstamp: changeWeek('2015-10-19T02:00:00+00:00', -4),
      isSeen: true,
    },
    '336864': {
      id: 336864,
      name: 'Questions & Answers',
      season: 3,
      number: 3,
      airstamp: changeWeek('2015-10-26T02:00:00+00:00', -3),
      isSeen: true,
    },
    '336865': {
      id: 336865,
      name: 'Full of Surprises',
      season: 3,
      number: 4,
      airstamp: changeWeek('2015-11-02T03:00:00+00:00', -2),
      isSeen: true,
    },
    '384684': {
      id: 384684,
      name: 'Missing Home',
      season: 3,
      number: 5,
      airstamp: changeWeek('2015-11-09T03:00:00+00:00', -1),
      isSeen: true,
    },
    '384685': {
      id: 384685,
      name: 'Lights, Camera, Drama',
      season: 3,
      number: 6,
      airstamp: changeWeek('2015-11-16T03:00:00+00:00', 0),
      isSeen: true,
    },
    '384686': {
      id: 384686,
      name: "Don't Push Me",
      season: 3,
      number: 7,
      airstamp: changeWeek('2015-11-23T03:00:00+00:00', 1),
      isSeen: true,
    },
    '482368': {
      id: 482368,
      name: 'Bachelorette Blues',
      season: 3,
      number: 8,
      airstamp: changeWeek('2015-11-30T02:00:00+00:00', 2),
      isSeen: true,
    },
  },
};

const stevenUniverse = {
  id: 1615,
  createdAt: '2017-09-12T19:20:04.011Z',
  name: 'Steven Universe',
  image:
    'http://static.tvmaze.com/uploads/images/original_untouched/8/22200.jpg',
  status: 'Running',
  type: 'Animation',
  summary:
    'Steven Universe, from Adventure Time writer-artist Rebecca Sugar, is a coming-of-age story told from the perspective of Steven, the youngest member of a team of magical Guardians of the Universe.',
  region: 'US',
  seenEpisodeIds: [],
  episodes: {
    '881988': {
      id: 881988,
      name: 'Mindful Education',
      season: 4,
      number: 4,
      airstamp: changeWeek('2016-08-25T23:00:00+00:00', -9),
    },
    '881989': {
      id: 881989,
      name: 'Future Boy Zoltron',
      season: 4,
      number: 5,
      airstamp: changeWeek('2016-09-01T23:00:00+00:00', -8),
    },
    '903640': {
      id: 903640,
      name: 'Last One Out of Beach City',
      season: 4,
      number: 6,
      airstamp: changeWeek('2016-09-08T23:00:00+00:00', -7),
    },
    '903641': {
      id: 903641,
      name: 'Onion Gang',
      season: 4,
      number: 7,
      airstamp: changeWeek('2016-09-15T23:00:00+00:00', -6),
    },
    '916587': {
      id: 916587,
      name: 'Gem Harvest, Parts 1 & 2',
      season: 4,
      number: 8,
      airstamp: changeWeek('2016-11-18T00:30:00+00:00', -5),
    },
    '977395': {
      id: 977395,
      name: 'Three Gems and a Baby',
      season: 4,
      number: 9,
      airstamp: changeWeek('2016-12-02T00:30:00+00:00', -4),
    },
    '977396': {
      id: 977396,
      name: 'Tiger Philanthropist',
      season: 4,
      number: 18,
      airstamp: changeWeek('2017-03-04T00:00:00+00:00', -2),
    },
    '1020995': {
      id: 1020995,
      name: "Steven's Dream",
      season: 4,
      number: 10,
      airstamp: changeWeek('2017-01-31T00:00:00+00:00', -1),
    },
    '1020996': {
      id: 1020996,
      name: 'Adventures in Light Distortion',
      season: 4,
      number: 11,
      airstamp: changeWeek('2017-01-31T00:15:00+00:00', 0),
    },
    '1020997': {
      id: 1020997,
      name: 'Gem Heist',
      season: 4,
      number: 12,
      airstamp: changeWeek('2017-02-01T00:00:00+00:00', 1),
    },
    '1020998': {
      id: 1020998,
      name: 'The Zoo',
      season: 4,
      number: 13,
      airstamp: changeWeek('2017-02-02T00:00:00+00:00', 2),
    },
    '1020999': {
      id: 1020999,
      name: 'That Will Be All',
      season: 4,
      number: 14,
      airstamp: changeWeek('2017-02-03T00:00:00+00:00', 3),
    },
  },
};

export const SHOWS = [
  strangerThings,
  sharkTank,
  gameOfThrones,
  stevenUniverse,
  ninetyDayFiance,
];
