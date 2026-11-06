// Runs Index with no server, for the online demo. site/build-site.js fills in the two marked
// spots. Index's own code answers the page as usual, but its "files" are kept in this browser.
(function () {
  const seed = {"data/athletics.csv":"student_id,sport,season,level,position\nS001,Volleyball,Fall,JV,Setter\nS004,Basketball,Winter,Varsity,Guard\nS005,Track,Spring,Varsity,Sprinter\nS007,Soccer,Fall,JV,Midfielder\nS008,Baseball,Spring,Varsity,Pitcher\nS012,Swimming,Winter,JV,Breaststroke\nS013,Soccer,Fall,JV,Forward\nS017,Track,Spring,JV,Distance Runner\nS018,Volleyball,Fall,JV,Middle Blocker\nS018,Softball,Spring,Varsity,Outfielder\nS023,Tennis,Spring,Varsity,Singles\nS027,Wrestling,Winter,JV,Wrestler\nS032,Baseball,Spring,Varsity,Infielder\nS033,Soccer,Fall,JV,Defender\nS036,Soccer,Fall,JV,Forward\nS039,Wrestling,Winter,JV,Wrestler\nS043,Swimming,Winter,JV,Butterfly\nS044,Tennis,Spring,JV,Doubles\nS046,Tennis,Spring,Varsity,Doubles\nS049,Track,Spring,Varsity,Jumper\nS050,Softball,Spring,JV,Outfielder\nS051,Softball,Spring,Varsity,Catcher\nS053,Soccer,Fall,JV,Goalkeeper\nS056,Soccer,Fall,JV,Goalkeeper\nS058,Soccer,Fall,JV,Midfielder\nS059,Swimming,Winter,JV,Butterfly\nS061,Baseball,Spring,Varsity,Catcher\nS065,Cross Country,Fall,Varsity,Runner\nS069,Basketball,Winter,JV,Forward\nS072,Volleyball,Fall,Varsity,Libero\nS076,Volleyball,Fall,Varsity,Setter\nS076,Swimming,Winter,Varsity,Breaststroke\nS078,Wrestling,Winter,JV,Wrestler\nS080,Basketball,Winter,JV,Forward\nS081,Tennis,Spring,JV,Singles\nS082,Tennis,Spring,JV,Singles\nS084,Cross Country,Fall,JV,Runner\nS085,Wrestling,Winter,Varsity,Wrestler\nS085,Track,Spring,Varsity,Sprinter\nS088,Volleyball,Fall,JV,Outside Hitter\nS089,Wrestling,Winter,Varsity,Wrestler\nS092,Wrestling,Winter,Varsity,Wrestler\nS093,Swimming,Winter,JV,Butterfly\nS093,Track,Spring,JV,Jumper\nS095,Baseball,Spring,JV,Catcher\nS096,Baseball,Spring,JV,Outfielder\nS097,Cross Country,Fall,JV,Runner\nS099,Wrestling,Winter,JV,Wrestler\nS100,Volleyball,Fall,JV,Outside Hitter\nS101,Soccer,Fall,JV,Forward\nS102,Wrestling,Winter,JV,Wrestler\nS107,Cross Country,Fall,JV,Runner\nS108,Baseball,Spring,Varsity,Catcher\nS112,Tennis,Spring,Varsity,Singles\nS112,Wrestling,Winter,Varsity,Wrestler\nS114,Swimming,Winter,JV,Breaststroke\nS116,Swimming,Winter,Varsity,Butterfly\nS118,Wrestling,Winter,JV,Wrestler\nS119,Basketball,Winter,JV,Center\nS121,Cross Country,Fall,JV,Runner\nS121,Softball,Spring,JV,Pitcher\nS123,Football,Fall,JV,Linebacker\nS124,Soccer,Fall,Varsity,Goalkeeper\nS125,Wrestling,Winter,Varsity,Wrestler\nS125,Soccer,Fall,JV,Midfielder\nS126,Soccer,Fall,Varsity,Forward\nS129,Wrestling,Winter,Varsity,Wrestler\nS129,Baseball,Spring,Varsity,Outfielder\nS130,Football,Fall,Varsity,Quarterback\nS130,Swimming,Winter,JV,Freestyle\nS131,Baseball,Spring,Varsity,Outfielder\nS133,Wrestling,Winter,Varsity,Wrestler\nS134,Volleyball,Fall,Varsity,Libero\nS135,Tennis,Spring,JV,Doubles\nS136,Cross Country,Fall,JV,Runner\nS137,Basketball,Winter,Varsity,Center\nS138,Soccer,Fall,Varsity,Forward\nS142,Wrestling,Winter,JV,Wrestler\nS143,Wrestling,Winter,Varsity,Wrestler\nS144,Softball,Spring,JV,Outfielder\nS144,Swimming,Winter,JV,Breaststroke\nS145,Softball,Spring,JV,Outfielder\nS148,Soccer,Fall,JV,Midfielder\nS151,Softball,Spring,Varsity,Outfielder\nS152,Softball,Spring,Varsity,Catcher\nS160,Tennis,Spring,JV,Doubles\nS161,Baseball,Spring,JV,Pitcher\nS162,Volleyball,Fall,JV,Setter\nS162,Wrestling,Winter,JV,Wrestler\nS165,Basketball,Winter,JV,Guard\nS167,Soccer,Fall,JV,Goalkeeper\nS169,Football,Fall,Varsity,Quarterback\nS170,Basketball,Winter,JV,Center\nS170,Cross Country,Fall,JV,Runner\nS172,Swimming,Winter,JV,Breaststroke\nS176,Wrestling,Winter,Varsity,Wrestler\nS177,Track,Spring,Varsity,Sprinter\nS179,Track,Spring,JV,Distance Runner\nS179,Football,Fall,Varsity,Linebacker\nS180,Soccer,Fall,Varsity,Defender\nS180,Swimming,Winter,Varsity,Butterfly\nS182,Tennis,Spring,JV,Singles\nS183,Wrestling,Winter,JV,Wrestler\nS186,Swimming,Winter,JV,Freestyle\nS189,Basketball,Winter,JV,Guard\nS189,Track,Spring,JV,Distance Runner\nS191,Soccer,Fall,Varsity,Goalkeeper\nS191,Basketball,Winter,Varsity,Center\nS193,Basketball,Winter,JV,Guard\nS194,Basketball,Winter,JV,Forward\nS203,Volleyball,Fall,JV,Libero\nS205,Tennis,Spring,JV,Singles\nS206,Tennis,Spring,Varsity,Doubles\nS207,Soccer,Fall,JV,Forward\nS210,Track,Spring,JV,Thrower\nS211,Wrestling,Winter,JV,Wrestler\nS212,Tennis,Spring,JV,Singles\nS213,Swimming,Winter,Varsity,Freestyle\nS213,Track,Spring,JV,Jumper\nS214,Tennis,Spring,Varsity,Doubles\nS216,Basketball,Winter,JV,Forward\nS217,Baseball,Spring,Varsity,Outfielder\nS218,Wrestling,Winter,JV,Wrestler\nS218,Tennis,Spring,JV,Singles\nS219,Soccer,Fall,JV,Defender\nS219,Tennis,Spring,JV,Singles\nS220,Basketball,Winter,Varsity,Forward\nS221,Baseball,Spring,Varsity,Outfielder\nS222,Tennis,Spring,Varsity,Doubles\nS223,Swimming,Winter,Varsity,Breaststroke\nS224,Volleyball,Fall,JV,Libero\nS225,Baseball,Spring,JV,Catcher\nS226,Softball,Spring,Varsity,Pitcher\nS227,Wrestling,Winter,Varsity,Wrestler\nS230,Tennis,Spring,JV,Singles\nS230,Volleyball,Fall,JV,Setter\nS234,Wrestling,Winter,Varsity,Wrestler\nS234,Soccer,Fall,Varsity,Goalkeeper\nS235,Swimming,Winter,JV,Breaststroke\nS242,Basketball,Winter,JV,Center\nS242,Volleyball,Fall,Varsity,Setter\nS243,Cross Country,Fall,JV,Runner\nS244,Soccer,Fall,JV,Midfielder\nS245,Baseball,Spring,Varsity,Pitcher\nS248,Track,Spring,JV,Sprinter\nS251,Tennis,Spring,Varsity,Doubles\nS254,Track,Spring,JV,Sprinter\nS254,Swimming,Winter,Varsity,Freestyle\nS255,Softball,Spring,Varsity,Pitcher\nS259,Tennis,Spring,JV,Doubles\nS261,Track,Spring,Varsity,Sprinter\nS262,Baseball,Spring,Varsity,Infielder\nS265,Track,Spring,JV,Distance Runner\nS269,Baseball,Spring,Varsity,Catcher\nS269,Football,Fall,Varsity,Receiver\nS270,Wrestling,Winter,Varsity,Wrestler\nS271,Swimming,Winter,Varsity,Butterfly\nS272,Wrestling,Winter,Varsity,Wrestler\nS272,Football,Fall,Varsity,Receiver\nS276,Baseball,Spring,JV,Pitcher\nS277,Basketball,Winter,Varsity,Guard\nS278,Tennis,Spring,Varsity,Singles\nS280,Cross Country,Fall,Varsity,Runner\nS280,Tennis,Spring,JV,Singles\nS282,Basketball,Winter,JV,Forward\nS287,Wrestling,Winter,Varsity,Wrestler\nS289,Track,Spring,Varsity,Distance Runner\nS291,Basketball,Winter,JV,Center\nS291,Track,Spring,Varsity,Sprinter\nS299,Softball,Spring,JV,Pitcher\nS300,Football,Fall,Varsity,Lineman\nS301,Volleyball,Fall,JV,Middle Blocker\nS303,Basketball,Winter,Varsity,Guard\nS303,Soccer,Fall,JV,Defender\nS304,Basketball,Winter,JV,Guard\nS305,Volleyball,Fall,Varsity,Outside Hitter\nS305,Basketball,Winter,Varsity,Forward\nS309,Tennis,Spring,JV,Singles\nS310,Cross Country,Fall,Varsity,Runner\nS312,Track,Spring,Varsity,Jumper\nS313,Swimming,Winter,JV,Breaststroke\nS316,Basketball,Winter,JV,Guard\nS316,Soccer,Fall,JV,Midfielder\nS319,Basketball,Winter,JV,Center\nS321,Cross Country,Fall,JV,Runner\nS321,Wrestling,Winter,JV,Wrestler\nS322,Track,Spring,JV,Distance Runner\nS324,Volleyball,Fall,Varsity,Libero\nS324,Swimming,Winter,Varsity,Breaststroke\nS325,Swimming,Winter,Varsity,Freestyle\nS328,Soccer,Fall,JV,Forward\nS328,Wrestling,Winter,JV,Wrestler\nS329,Swimming,Winter,Varsity,Butterfly\nS329,Cross Country,Fall,Varsity,Runner\nS331,Tennis,Spring,JV,Doubles\nS334,Swimming,Winter,JV,Backstroke\nS335,Swimming,Winter,JV,Butterfly\nS336,Wrestling,Winter,Varsity,Wrestler\nS340,Soccer,Fall,JV,Forward\nS341,Track,Spring,JV,Thrower\nS343,Basketball,Winter,JV,Forward\nS346,Volleyball,Fall,Varsity,Setter\nS347,Wrestling,Winter,Varsity,Wrestler\nS347,Cross Country,Fall,JV,Runner\nS350,Cross Country,Fall,JV,Runner\nS352,Soccer,Fall,Varsity,Midfielder\nS354,Wrestling,Winter,Varsity,Wrestler\nS358,Volleyball,Fall,Varsity,Outside Hitter\nS362,Baseball,Spring,JV,Catcher\nS365,Soccer,Fall,Varsity,Defender\nS369,Swimming,Winter,JV,Butterfly\nS372,Volleyball,Fall,Varsity,Middle Blocker\nS375,Swimming,Winter,Varsity,Butterfly\nS375,Soccer,Fall,JV,Forward\nS377,Track,Spring,Varsity,Thrower\nS379,Softball,Spring,JV,Outfielder\nS380,Track,Spring,JV,Jumper\nS381,Volleyball,Fall,Varsity,Outside Hitter\nS381,Softball,Spring,Varsity,Infielder\nS384,Wrestling,Winter,Varsity,Wrestler\nS385,Soccer,Fall,JV,Goalkeeper\nS385,Swimming,Winter,JV,Breaststroke\nS386,Track,Spring,JV,Sprinter\nS389,Track,Spring,Varsity,Sprinter\nS392,Soccer,Fall,JV,Goalkeeper\nS393,Cross Country,Fall,JV,Runner\nS394,Swimming,Winter,Varsity,Breaststroke\nS397,Football,Fall,JV,Lineman\nS397,Swimming,Winter,JV,Backstroke\nS398,Basketball,Winter,Varsity,Forward\n","data/clubs.csv":"student_id,club,role,start_date\nS001,Robotics,Member,2026-09-02\nS002,Robotics,President,2025-09-03\nS002,Debate,Member,2026-09-10\nS003,Environmental Club,Founder,2026-01-15\nS004,Student Council,President,2025-09-03\nS005,Debate,Captain,2025-09-03\nS006,Worship Team,Leader,2025-09-03\nS008,Film Club,Member,2026-09-10\nS009,Robotics,Vice President,2026-09-02\nS010,Chess team,Member,2026-11-04\nS011,Student Council,Member,2025-09-12\nS011,Art Club,Member,2026-09-07\nS013,Worship Team,Member,2024-09-05\nS017,Yearbook,Member,2025-09-04\nS018,Worship Team,Member,2026-09-05\nS019,Student Council,Member,2026-09-10\nS022,Key Club,Member,2025-09-11\nS023,Robotics,Member,2026-09-15\nS024,Drama Club,Member,2026-09-02\nS026,Yearbook,Member,2025-09-01\nS027,Key Club,Member,2026-09-03\nS027,Environmental Club,Member,2026-09-02\nS029,Robotics,Member,2025-09-17\nS029,Spanish Club,Member,2024-09-20\nS030,Photography Club,Member,2025-09-12\nS031,Key Club,Member,2026-09-02\nS035,Key Club,Member,2026-09-14\nS036,Photography Club,Member,2025-09-20\nS037,Robotics,Member,2026-09-01\nS038,Environmental Club,Member,2026-09-09\nS038,Student Council,Member,2026-09-11\nS039,Film Club,Member,2025-09-08\nS041,Debate,Member,2025-09-13\nS042,Drama Club,Member,2025-09-09\nS042,Spanish Club,Member,2026-09-10\nS043,Key Club,Member,2026-09-16\nS043,Worship Team,Member,2026-09-12\nS044,Debate,Member,2026-09-16\nS045,Art Club,Member,2026-09-10\nS048,Yearbook,Vice President,2026-09-03\nS048,Photography Club,Member,2026-09-03\nS050,Film Club,Member,2026-09-13\nS055,Drama Club,Member,2026-09-14\nS057,Robotics,Member,2026-09-07\nS057,Environmental Club,Member,2026-09-17\nS058,Drama Club,President,2025-09-12\nS059,Yearbook,Member,2025-09-19\nS059,Environmental Club,Member,2025-09-20\nS060,Chess Club,Member,2026-09-03\nS061,Debate,Member,2025-09-13\nS063,Robotics,Member,2026-09-03\nS063,Spanish Club,Member,2026-09-13\nS064,Spanish Club,Member,2026-09-02\nS064,Art Club,Member,2026-09-03\nS065,Drama Club,Member,2025-09-09\nS066,Photography Club,President,2025-09-09\nS066,Spanish Club,Secretary,2024-09-20\nS066,Environmental Club,Vice President,2024-09-19\nS067,Drama Club,Member,2025-09-15\nS069,Environmental Club,Member,2026-09-16\nS070,Robotics,Member,2025-09-01\nS070,Art Club,Member,2026-09-10\nS071,Environmental Club,Member,2025-09-08\nS076,Debate,Secretary,2026-09-08\nS076,Photography Club,Member,2023-09-19\nS079,Student Council,Member,2026-09-02\nS084,Spanish Club,Member,2026-09-05\nS084,Drama Club,Member,2026-09-19\nS084,Art Club,Member,2026-09-11\nS086,Key Club,Member,2026-09-13\nS086,Photography Club,Member,2026-09-13\nS087,Key Club,Member,2026-09-06\nS087,Student Council,Member,2026-09-05\nS088,Art Club,Member,2026-09-19\nS088,Key Club,Member,2025-09-20\nS089,Student Council,Member,2026-09-10\nS090,Key Club,Member,2025-09-12\nS090,Spanish Club,Member,2026-09-08\nS091,Debate,Member,2026-09-18\nS093,Chess Club,Member,2025-09-14\nS094,Yearbook,Member,2025-09-20\nS097,Worship Team,Member,2026-09-17\nS099,Film Club,Member,2025-09-04\nS101,Drama Club,Member,2026-09-14\nS103,Debate,Member,2025-09-07\nS103,Environmental Club,Member,2026-09-17\nS104,Photography Club,Member,2026-09-01\nS105,Yearbook,Member,2024-09-16\nS105,Spanish Club,Member,2024-09-09\nS108,Photography Club,Member,2026-09-10\nS111,Key Club,Member,2025-09-12\nS111,Yearbook,Member,2025-09-11\nS111,Chess Club,Member,2026-09-16\nS112,Student Council,Member,2026-09-17\nS113,Worship Team,Member,2024-09-03\nS118,Yearbook,Member,2024-09-06\nS119,Drama Club,Member,2026-09-17\nS119,Worship Team,Member,2026-09-07\nS120,Yearbook,Member,2026-09-16\nS120,Key Club,Member,2024-09-15\nS123,Chess Club,Member,2026-09-14\nS124,Robotics,Member,2026-09-20\nS126,Environmental Club,Member,2024-09-02\nS127,Worship Team,Member,2024-09-08\nS129,Student Council,Treasurer,2026-09-08\nS129,Yearbook,Secretary,2023-09-20\nS130,Spanish Club,Member,2024-09-13\nS130,Drama Club,Member,2026-09-01\nS131,Art Club,Vice President,2023-09-02\nS131,Chess Club,Secretary,2024-09-13\nS132,Photography Club,Member,2025-09-06\nS132,Yearbook,Member,2025-09-15\nS133,Student Council,Member,2026-09-10\nS134,Art Club,Member,2025-09-15\nS136,Debate,Member,2023-09-09\nS137,Debate,Member,2026-09-13\nS139,Worship Team,Member,2025-09-20\nS140,Drama Club,Member,2023-09-09\nS140,Student Council,Member,2025-09-03\nS142,Robotics,Member,2026-09-10\nS143,Key Club,Secretary,2026-09-20\nS143,Spanish Club,Member,2026-09-02\nS146,Worship Team,Member,2025-09-10\nS147,Drama Club,Member,2026-09-08\nS148,Spanish Club,Member,2026-09-16\nS148,Film Club,Member,2026-09-10\nS148,Robotics,Member,2026-09-10\nS149,Art Club,Member,2024-09-08\nS151,Robotics,Member,2025-09-04\nS153,Art Club,Member,2026-09-10\nS154,Spanish Club,Member,2024-09-19\nS155,Yearbook,Member,2026-09-08\nS156,Worship Team,Member,2025-09-04\nS157,Film Club,Secretary,2024-09-03\nS158,Key Club,President,2023-09-20\nS162,Debate,Member,2025-09-12\nS162,Chess Club,Member,2026-09-19\nS163,Yearbook,Member,2025-09-20\nS163,Spanish Club,Member,2026-09-03\nS164,Drama Club,Member,2026-09-18\nS165,Film Club,Member,2026-09-01\nS165,Robotics,Member,2025-09-07\nS167,Spanish Club,Member,2026-09-09\nS167,Robotics,Member,2026-09-19\nS170,Photography Club,Member,2026-09-16\nS171,Environmental Club,Member,2026-09-20\nS173,Worship Team,Vice President,2025-09-14\nS174,Environmental Club,Member,2026-09-02\nS175,Robotics,Member,2025-09-07\nS178,Film Club,Member,2026-09-03\nS178,Key Club,Member,2024-09-08\nS179,Robotics,Member,2025-09-02\nS179,Student Council,Member,2024-09-16\nS180,Key Club,Treasurer,2026-09-04\nS181,Environmental Club,Member,2026-09-07\nS182,Student Council,Member,2026-09-03\nS184,Environmental Club,Treasurer,2023-09-10\nS185,Environmental Club,Member,2025-09-17\nS186,Student Council,Member,2026-09-10\nS186,Film Club,Member,2026-09-13\nS186,Drama Club,Member,2026-09-08\nS187,Robotics,Member,2026-09-14\nS187,Photography Club,Member,2025-09-18\nS191,Student Council,Secretary,2025-09-04\nS191,Photography Club,Member,2024-09-09\nS193,Worship Team,Member,2025-09-20\nS194,Film Club,Member,2026-09-17\nS195,Robotics,Secretary,2023-09-03\nS196,Student Council,Member,2025-09-18\nS198,Worship Team,Member,2026-09-19\nS198,Debate,Member,2026-09-05\nS199,Film Club,Member,2026-09-13\nS200,Spanish Club,Member,2026-09-08\nS201,Debate,Member,2025-09-13\nS203,Chess Club,Member,2026-09-02\nS204,Photography Club,Member,2025-09-03\nS206,Drama Club,Vice President,2024-09-12\nS208,Key Club,Member,2026-09-11\nS209,Yearbook,Member,2026-09-06\nS209,Film Club,Member,2026-09-18\nS209,Chess Club,Member,2026-09-15\nS212,Environmental Club,Member,2025-09-02\nS214,Chess Club,Member,2025-09-15\nS215,Art Club,Member,2025-09-16\nS215,Robotics,Member,2025-09-12\nS216,Key Club,Member,2026-09-10\nS216,Chess Club,Member,2026-09-08\nS217,Student Council,Member,2025-09-02\nS218,Robotics,Member,2026-09-20\nS219,Art Club,Member,2026-09-03\nS220,Worship Team,Member,2026-09-02\nS220,Photography Club,Member,2026-09-16\nS221,Film Club,President,2023-09-11\nS221,Photography Club,Secretary,2026-09-15\nS222,Photography Club,Member,2026-09-13\nS222,Student Council,Member,2026-09-07\nS223,Yearbook,Treasurer,2026-09-07\nS223,Chess Club,Treasurer,2024-09-19\nS223,Worship Team,Member,2024-09-14\nS224,Student Council,Member,2025-09-18\nS225,Robotics,Member,2024-09-03\nS226,Art Club,Member,2025-09-07\nS226,Photography Club,Member,2025-09-08\nS227,Student Council,Member,2024-09-08\nS228,Debate,Treasurer,2024-09-11\nS228,Drama Club,Member,2025-09-12\nS228,Worship Team,Secretary,2025-09-07\nS229,Robotics,Member,2026-09-14\nS230,Art Club,Member,2026-09-15\nS231,Chess Club,Member,2026-09-18\nS231,Environmental Club,Member,2026-09-05\nS232,Student Council,Member,2026-09-17\nS232,Robotics,Member,2026-09-04\nS233,Student Council,Vice President,2026-09-14\nS233,Debate,Member,2023-09-02\nS235,Drama Club,Member,2026-09-07\nS236,Art Club,Member,2026-09-05\nS236,Worship Team,Member,2024-09-09\nS236,Environmental Club,Member,2026-09-15\nS238,Art Club,Member,2026-09-17\nS239,Spanish Club,Member,2026-09-08\nS241,Spanish Club,Vice President,2026-09-12\nS242,Spanish Club,Member,2024-09-09\nS243,Film Club,Member,2026-09-14\nS247,Art Club,Member,2026-09-14\nS247,Photography Club,Member,2025-09-13\nS249,Environmental Club,Member,2024-09-18\nS254,Key Club,Member,2024-09-02\nS254,Film Club,Member,2024-09-20\nS255,Environmental Club,Secretary,2023-09-04\nS258,Key Club,Member,2026-09-03\nS261,Art Club,Member,2025-09-19\nS262,Student Council,Member,2023-09-02\nS262,Film Club,Member,2026-09-13\nS262,Drama Club,Member,2023-09-14\nS264,Environmental Club,Member,2026-09-11\nS265,Worship Team,Member,2026-09-02\nS266,Debate,Vice President,2026-09-20\nS268,Worship Team,Member,2026-09-20\nS269,Art Club,Member,2025-09-11\nS270,Chess Club,Member,2024-09-03\nS271,Film Club,Member,2026-09-15\nS273,Chess Club,Member,2026-09-10\nS275,Debate,Member,2026-09-01\nS276,Worship Team,Member,2026-09-17\nS277,Environmental Club,Member,2024-09-15\nS279,Film Club,Treasurer,2025-09-17\nS279,Drama Club,Treasurer,2026-09-02\nS279,Robotics,Member,2023-09-15\nS280,Debate,Member,2025-09-02\nS280,Art Club,Secretary,2026-09-10\nS281,Spanish Club,Member,2026-09-09\nS282,Environmental Club,Member,2026-09-04\nS282,Chess Club,Member,2026-09-06\nS283,Photography Club,Treasurer,2023-09-02\nS284,Key Club,Member,2026-09-03\nS284,Worship Team,Member,2026-09-07\nS285,Robotics,Member,2023-09-10\nS285,Film Club,Vice President,2024-09-08\nS286,Robotics,Member,2025-09-18\nS288,Film Club,Member,2026-09-14\nS289,Photography Club,Member,2024-09-04\nS290,Art Club,Member,2026-09-14\nS291,Environmental Club,Member,2024-09-09\nS291,Photography Club,Member,2025-09-10\nS294,Worship Team,Member,2026-09-12\nS294,Debate,Member,2025-09-03\nS295,Spanish Club,Member,2026-09-06\nS296,Photography Club,Member,2023-09-13\nS299,Debate,Member,2026-09-19\nS300,Environmental Club,Member,2023-09-15\nS305,Yearbook,President,2025-09-16\nS307,Photography Club,Member,2026-09-08\nS308,Chess Club,Vice President,2026-09-17\nS308,Drama Club,Member,2026-09-09\nS312,Drama Club,Secretary,2024-09-09\nS312,Debate,Member,2023-09-13\nS314,Chess Club,Member,2025-09-03\nS316,Environmental Club,Member,2024-09-12\nS316,Worship Team,Member,2025-09-09\nS316,Student Council,Member,2026-09-19\nS320,Drama Club,Member,2026-09-10\nS320,Environmental Club,Member,2026-09-07\nS321,Photography Club,Member,2025-09-07\nS321,Chess Club,Member,2026-09-20\nS322,Chess Club,Member,2026-09-06\nS327,Robotics,Member,2026-09-02\nS327,Student Council,Member,2026-09-18\nS328,Environmental Club,Member,2026-09-11\nS329,Yearbook,Member,2025-09-04\nS331,Student Council,Member,2025-09-04\nS333,Chess Club,President,2026-09-06\nS334,Robotics,Member,2026-09-11\nS334,Debate,Member,2026-09-08\nS335,Photography Club,Member,2025-09-13\nS337,Debate,Member,2026-09-06\nS337,Drama Club,Member,2024-09-13\nS338,Photography Club,Member,2023-09-13\nS338,Yearbook,Member,2025-09-20\nS338,Robotics,Treasurer,2024-09-05\nS339,Chess Club,Member,2023-09-05\nS340,Chess Club,Member,2026-09-14\nS342,Chess Club,Member,2023-09-06\nS343,Yearbook,Member,2026-09-20\nS344,Key Club,Member,2026-09-10\nS345,Chess Club,Member,2026-09-16\nS347,Spanish Club,President,2023-09-01\nS347,Environmental Club,Member,2026-09-04\nS347,Drama Club,Member,2025-09-06\nS348,Yearbook,Member,2026-09-15\nS350,Drama Club,Member,2026-09-20\nS351,Environmental Club,Member,2026-09-12\nS354,Photography Club,Member,2024-09-18\nS357,Student Council,Member,2026-09-09\nS358,Spanish Club,Treasurer,2023-09-07\nS360,Chess Club,Member,2025-09-05\nS362,Robotics,Member,2026-09-14\nS364,Yearbook,Member,2025-09-11\nS364,Key Club,Member,2025-09-19\nS365,Photography Club,Vice President,2025-09-05\nS365,Worship Team,Treasurer,2023-09-18\nS366,Worship Team,Member,2025-09-20\nS367,Photography Club,Member,2026-09-20\nS368,Environmental Club,Member,2026-09-17\nS369,Key Club,Member,2026-09-11\nS370,Student Council,Member,2025-09-12\nS372,Yearbook,Member,2024-09-20\nS374,Spanish Club,Member,2025-09-15\nS377,Photography Club,Member,2025-09-04\nS380,Art Club,Member,2026-09-02\nS381,Chess Club,Member,2026-09-10\nS381,Film Club,Member,2026-09-13\nS382,Debate,Member,2026-09-08\nS385,Spanish Club,Member,2023-09-18\nS386,Art Club,Member,2026-09-11\nS386,Spanish Club,Member,2026-09-05\nS387,Environmental Club,Member,2026-09-18\nS387,Art Club,Member,2025-09-14\nS388,Debate,Member,2026-09-10\nS389,Photography Club,Member,2025-09-03\nS390,Chess Club,Member,2026-09-17\nS390,Student Council,Member,2026-09-02\nS391,Worship Team,Member,2025-09-01\nS392,Key Club,Vice President,2023-09-03\nS395,Drama Club,Member,2026-09-04\nS396,Debate,Member,2026-09-11\nS399,Debate,Member,2026-09-15\nS399,Drama Club,Member,2026-09-15\nS312,Art Club,President,2025-09-14\nS106,Art Club,Treasurer,2024-09-13\nS291,Art Club,Member,2025-09-11\nS185,Art Club,Member,2026-09-10\nS080,Art Club,Member,2025-09-17\nS267,Art Club,Member,2026-09-11\n","data/events.csv":"student_id,event,date,role\nS002,Science Fair,2026-10-15,Presenter\nS003,Earth Day Assembly,2026-04-22,Organizer\nS004,Homecoming,2026-10-09,Planning lead\nS005,Model UN,2026-10-24,Delegate\nS008,Spring Film Night,2026-05-02,Director\nS012,Science Fair,2026-10-15,Presenter\nS012,Earth Day Assembly,2026-04-22,Organizer\nS012,Career Day,2026-03-12,Volunteer\nS015,Homecoming,2026-10-09,Volunteer\nS015,Earth Day Assembly,2026-04-22,Organizer\nS017,Career Day,2026-03-12,Student Host\nS019,Spring Musical,2026-04-17,Stage Crew\nS020,Science Fair,2026-10-15,Volunteer\nS020,Earth Day Assembly,2026-04-22,Organizer\nS021,Science Fair,2026-10-15,Presenter\nS022,Fall Play,2026-10-30,Stage Crew\nS023,Fall Play,2026-10-30,Cast\nS024,Fall Play,2026-10-30,Cast\nS025,Fall Play,2026-10-30,Cast\nS025,Homecoming,2026-10-09,Decorations\nS027,Homecoming,2026-10-09,Decorations\nS029,Career Day,2026-03-12,Volunteer\nS029,Earth Day Assembly,2026-04-22,Volunteer\nS030,Model UN,2026-10-24,Delegate\nS030,Career Day,2026-03-12,Volunteer\nS033,Science Fair,2026-10-15,Volunteer\nS033,Earth Day Assembly,2026-04-22,Volunteer\nS034,Model UN,2026-10-24,Chair\nS034,Fall Play,2026-10-30,Cast\nS035,Fall Play,2026-10-30,Cast\nS036,Spring Musical,2026-04-17,Orchestra\nS036,Model UN,2026-10-24,Delegate\nS037,Homecoming,2026-10-09,Volunteer\nS042,Spring Musical,2026-04-17,Orchestra\nS043,Science Fair,2026-10-15,Presenter\nS044,Earth Day Assembly,2026-04-22,Presenter\nS046,Earth Day Assembly,2026-04-22,Volunteer\nS047,Fall Play,2026-10-30,Stage Crew\nS049,Fall Play,2026-10-30,Cast\nS050,Science Fair,2026-10-15,Presenter\nS051,Spring Musical,2026-04-17,Cast\nS051,Earth Day Assembly,2026-04-22,Presenter\nS052,Earth Day Assembly,2026-04-22,Organizer\nS053,Homecoming,2026-10-09,Planning lead\nS055,Fall Play,2026-10-30,Stage Manager\nS056,Science Fair,2026-10-15,Presenter\nS057,Homecoming,2026-10-09,Volunteer\nS057,Model UN,2026-10-24,Delegate\nS058,Career Day,2026-03-12,Volunteer\nS058,Homecoming,2026-10-09,Planning lead\nS058,Spring Film Night,2026-05-02,Editor\nS063,Model UN,2026-10-24,Delegate\nS063,Science Fair,2026-10-15,Presenter\nS064,Science Fair,2026-10-15,Volunteer\nS065,Spring Film Night,2026-05-02,Volunteer\nS068,Spring Musical,2026-04-17,Cast\nS070,Career Day,2026-03-12,Volunteer\nS072,Homecoming,2026-10-09,Volunteer\nS073,Model UN,2026-10-24,Chair\nS073,Science Fair,2026-10-15,Volunteer\nS075,Earth Day Assembly,2026-04-22,Organizer\nS076,Spring Film Night,2026-05-02,Volunteer\nS076,Fall Play,2026-10-30,Stage Crew\nS078,Homecoming,2026-10-09,Volunteer\nS080,Science Fair,2026-10-15,Presenter\nS083,Fall Play,2026-10-30,Stage Manager\nS084,Homecoming,2026-10-09,Volunteer\nS084,Fall Play,2026-10-30,Cast\nS084,Science Fair,2026-10-15,Presenter\nS085,Earth Day Assembly,2026-04-22,Volunteer\nS087,Fall Play,2026-10-30,Cast\nS088,Model UN,2026-10-24,Delegate\nS089,Homecoming,2026-10-09,Decorations\nS092,Career Day,2026-03-12,Volunteer\nS092,Model UN,2026-10-24,Delegate\nS094,Spring Film Night,2026-05-02,Editor\nS094,Fall Play,2026-10-30,Stage Manager\nS099,Fall Play,2026-10-30,Cast\nS100,Earth Day Assembly,2026-04-22,Presenter\nS101,Model UN,2026-10-24,Delegate\nS102,Spring Musical,2026-04-17,Orchestra\nS103,Spring Film Night,2026-05-02,Director\nS108,Career Day,2026-03-12,Student Host\nS108,Homecoming,2026-10-09,Planning lead\nS110,Model UN,2026-10-24,Delegate\nS111,Model UN,2026-10-24,Delegate\nS111,Science Fair,2026-10-15,Volunteer\nS112,Model UN,2026-10-24,Delegate\nS112,Spring Film Night,2026-05-02,Volunteer\nS113,Homecoming,2026-10-09,Volunteer\nS113,Fall Play,2026-10-30,Stage Crew\nS115,Science Fair,2026-10-15,Volunteer\nS116,Earth Day Assembly,2026-04-22,Volunteer\nS117,Earth Day Assembly,2026-04-22,Organizer\nS119,Homecoming,2026-10-09,Planning lead\nS119,Model UN,2026-10-24,Delegate\nS123,Homecoming,2026-10-09,Planning lead\nS123,Fall Play,2026-10-30,Stage Crew\nS125,Homecoming,2026-10-09,Volunteer\nS131,Earth Day Assembly,2026-04-22,Presenter\nS132,Science Fair,2026-10-15,Presenter\nS132,Earth Day Assembly,2026-04-22,Volunteer\nS133,Science Fair,2026-10-15,Presenter\nS135,Science Fair,2026-10-15,Presenter\nS136,Earth Day Assembly,2026-04-22,Volunteer\nS140,Science Fair,2026-10-15,Presenter\nS142,Model UN,2026-10-24,Delegate\nS144,Homecoming,2026-10-09,Volunteer\nS145,Science Fair,2026-10-15,Presenter\nS145,Fall Play,2026-10-30,Cast\nS147,Fall Play,2026-10-30,Stage Crew\nS152,Career Day,2026-03-12,Student Host\nS152,Spring Musical,2026-04-17,Cast\nS154,Model UN,2026-10-24,Delegate\nS158,Science Fair,2026-10-15,Presenter\nS159,Spring Musical,2026-04-17,Stage Crew\nS161,Homecoming,2026-10-09,Volunteer\nS162,Spring Musical,2026-04-17,Cast\nS166,Fall Play,2026-10-30,Cast\nS167,Homecoming,2026-10-09,Planning lead\nS176,Earth Day Assembly,2026-04-22,Presenter\nS177,Career Day,2026-03-12,Student Host\nS179,Spring Film Night,2026-05-02,Volunteer\nS179,Fall Play,2026-10-30,Cast\nS180,Model UN,2026-10-24,Chair\nS181,Science Fair,2026-10-15,Presenter\nS184,Earth Day Assembly,2026-04-22,Presenter\nS185,Homecoming,2026-10-09,Volunteer\nS187,Model UN,2026-10-24,Delegate\nS189,Science Fair,2026-10-15,Volunteer\nS189,Fall Play,2026-10-30,Stage Manager\nS189,Homecoming,2026-10-09,Decorations\nS190,Model UN,2026-10-24,Delegate\nS197,Homecoming,2026-10-09,Decorations\nS200,Homecoming,2026-10-09,Volunteer\nS201,Spring Film Night,2026-05-02,Volunteer\nS201,Homecoming,2026-10-09,Planning lead\nS203,Homecoming,2026-10-09,Volunteer\nS210,Earth Day Assembly,2026-04-22,Volunteer\nS214,Earth Day Assembly,2026-04-22,Presenter\nS214,Spring Film Night,2026-05-02,Director\nS216,Homecoming,2026-10-09,Volunteer\nS218,Spring Musical,2026-04-17,Orchestra\nS220,Fall Play,2026-10-30,Cast\nS220,Model UN,2026-10-24,Chair\nS220,Science Fair,2026-10-15,Presenter\nS222,Model UN,2026-10-24,Delegate\nS224,Homecoming,2026-10-09,Planning lead\nS227,Career Day,2026-03-12,Student Host\nS229,Model UN,2026-10-24,Delegate\nS231,Science Fair,2026-10-15,Presenter\nS234,Earth Day Assembly,2026-04-22,Organizer\nS234,Homecoming,2026-10-09,Decorations\nS235,Homecoming,2026-10-09,Volunteer\nS236,Fall Play,2026-10-30,Cast\nS236,Spring Film Night,2026-05-02,Volunteer\nS238,Science Fair,2026-10-15,Volunteer\nS239,Spring Musical,2026-04-17,Cast\nS240,Model UN,2026-10-24,Delegate\nS241,Model UN,2026-10-24,Delegate\nS242,Model UN,2026-10-24,Delegate\nS243,Homecoming,2026-10-09,Volunteer\nS244,Career Day,2026-03-12,Volunteer\nS245,Fall Play,2026-10-30,Cast\nS247,Spring Film Night,2026-05-02,Volunteer\nS249,Science Fair,2026-10-15,Presenter\nS249,Earth Day Assembly,2026-04-22,Presenter\nS251,Spring Musical,2026-04-17,Cast\nS251,Earth Day Assembly,2026-04-22,Presenter\nS251,Model UN,2026-10-24,Delegate\nS252,Science Fair,2026-10-15,Presenter\nS255,Homecoming,2026-10-09,Decorations\nS256,Homecoming,2026-10-09,Volunteer\nS258,Science Fair,2026-10-15,Presenter\nS259,Earth Day Assembly,2026-04-22,Presenter\nS260,Spring Musical,2026-04-17,Orchestra\nS260,Science Fair,2026-10-15,Presenter\nS262,Spring Musical,2026-04-17,Orchestra\nS267,Homecoming,2026-10-09,Planning lead\nS267,Fall Play,2026-10-30,Stage Manager\nS271,Model UN,2026-10-24,Delegate\nS274,Spring Musical,2026-04-17,Stage Crew\nS276,Model UN,2026-10-24,Delegate\nS276,Fall Play,2026-10-30,Cast\nS276,Homecoming,2026-10-09,Decorations\nS277,Science Fair,2026-10-15,Presenter\nS279,Model UN,2026-10-24,Delegate\nS280,Fall Play,2026-10-30,Cast\nS283,Spring Musical,2026-04-17,Cast\nS288,Science Fair,2026-10-15,Presenter\nS289,Fall Play,2026-10-30,Cast\nS291,Fall Play,2026-10-30,Cast\nS303,Career Day,2026-03-12,Student Host\nS304,Science Fair,2026-10-15,Volunteer\nS308,Homecoming,2026-10-09,Volunteer\nS309,Fall Play,2026-10-30,Cast\nS312,Career Day,2026-03-12,Volunteer\nS312,Science Fair,2026-10-15,Presenter\nS315,Career Day,2026-03-12,Volunteer\nS315,Spring Film Night,2026-05-02,Editor\nS324,Model UN,2026-10-24,Delegate\nS324,Career Day,2026-03-12,Student Host\nS324,Earth Day Assembly,2026-04-22,Volunteer\nS325,Earth Day Assembly,2026-04-22,Organizer\nS325,Science Fair,2026-10-15,Presenter\nS331,Spring Musical,2026-04-17,Cast\nS332,Science Fair,2026-10-15,Presenter\nS333,Science Fair,2026-10-15,Presenter\nS334,Homecoming,2026-10-09,Volunteer\nS337,Spring Film Night,2026-05-02,Volunteer\nS341,Fall Play,2026-10-30,Cast\nS342,Career Day,2026-03-12,Student Host\nS344,Spring Musical,2026-04-17,Cast\nS346,Science Fair,2026-10-15,Presenter\nS346,Homecoming,2026-10-09,Planning lead\nS347,Model UN,2026-10-24,Delegate\nS347,Spring Musical,2026-04-17,Stage Crew\nS348,Earth Day Assembly,2026-04-22,Presenter\nS350,Model UN,2026-10-24,Delegate\nS351,Career Day,2026-03-12,Volunteer\nS351,Science Fair,2026-10-15,Volunteer\nS352,Spring Film Night,2026-05-02,Volunteer\nS352,Homecoming,2026-10-09,Volunteer\nS353,Fall Play,2026-10-30,Stage Crew\nS353,Science Fair,2026-10-15,Presenter\nS354,Spring Film Night,2026-05-02,Editor\nS355,Fall Play,2026-10-30,Cast\nS362,Earth Day Assembly,2026-04-22,Volunteer\nS362,Spring Film Night,2026-05-02,Director\nS363,Earth Day Assembly,2026-04-22,Organizer\nS364,Science Fair,2026-10-15,Presenter\nS366,Science Fair,2026-10-15,Presenter\nS367,Science Fair,2026-10-15,Presenter\nS367,Model UN,2026-10-24,Delegate\nS370,Fall Play,2026-10-30,Stage Crew\nS372,Career Day,2026-03-12,Volunteer\nS373,Spring Musical,2026-04-17,Cast\nS374,Career Day,2026-03-12,Student Host\nS375,Model UN,2026-10-24,Delegate\nS375,Fall Play,2026-10-30,Stage Manager\nS376,Science Fair,2026-10-15,Presenter\nS377,Fall Play,2026-10-30,Cast\nS378,Career Day,2026-03-12,Student Host\nS378,Science Fair,2026-10-15,Presenter\nS381,Homecoming,2026-10-09,Planning lead\nS385,Fall Play,2026-10-30,Stage Manager\nS386,Model UN,2026-10-24,Chair\nS389,Science Fair,2026-10-15,Presenter\nS389,Earth Day Assembly,2026-04-22,Presenter\nS392,Fall Play,2026-10-30,Cast\nS392,Science Fair,2026-10-15,Presenter\nS394,Earth Day Assembly,2026-04-22,Organizer\nS395,Fall Play,2026-10-30,Cast\nS395,Homecoming,2026-10-09,Planning lead\nS395,Science Fair,2026-10-15,Presenter\nS397,Fall Play,2026-10-30,Cast\nS397,Earth Day Assembly,2026-04-22,Presenter\nS397,Model UN,2026-10-24,Chair\nS398,Science Fair,2026-10-15,Presenter\nS399,Fall Play,2026-10-30,Stage Manager\nS400,Career Day,2026-03-12,Volunteer\nS400,Science Fair,2026-10-15,Volunteer\nS400,Spring Film Night,2026-05-02,Volunteer\n","data/incoming_freshmen.csv":"student_id,school_id,first_name,last_name,email,gender,tshirt_size,counselor\nS401,283752,Daphne,Harrison,daphneharrison31@pacificachristian.org,Female,S,Ms. Hale\nS402,952249,Nadia,Hoffman,nadiahoffman31@pacificachristian.org,Female,XL,Ms. Hale\nS403,667212,Joel,Nielsen,joelnielsen31@pacificachristian.org,Male,M,Mr. Brooks\nS404,182325,Jasmine,Hamilton,jasminehamilton31@pacificachristian.org,Female,M,Ms. Hale\nS405,260536,Alina,Mann,alinamann31@pacificachristian.org,Female,L,Mr. Brooks\nS406,809496,Mila,Romero,milaromero31@pacificachristian.org,Female,L,Ms. Tran\nS407,661047,Amir,Sharma,amirsharma31@pacificachristian.org,Male,S,Ms. Tran\nS408,240057,Jacob,Harper,jacobharper31@pacificachristian.org,Male,S,Ms. Hale\nS409,102029,Alex,Ingram,alexingram31@pacificachristian.org,Male,M,Mr. Brooks\nS410,976293,Maria,Ahmed,mariaahmed31@pacificachristian.org,Female,L,Ms. Hale\nS411,741437,Amir,Rodriguez,amirrodriguez31@pacificachristian.org,Male,S,Ms. Tran\nS412,264109,Leo,Jackson,leojackson31@pacificachristian.org,Male,M,Mr. Brooks\nS413,264884,Luna,Powell,lunapowell31@pacificachristian.org,Female,S,Mr. Brooks\nS414,670478,Zachary,Wu,zacharywu31@pacificachristian.org,Male,M,Ms. Tran\nS415,402592,Rafael,Xu,rafaelxu31@pacificachristian.org,Male,S,Ms. Tran\nS416,935650,Eliana,Dixon,elianadixon31@pacificachristian.org,Female,L,Ms. Hale\nS417,377732,Kara,Yates,karayates31@pacificachristian.org,Female,XL,Ms. Tran\nS418,109727,Matthew,Turner,matthewturner31@pacificachristian.org,Male,M,Ms. Tran\nS419,958053,Isaac,Webb,isaacwebb31@pacificachristian.org,Male,S,Ms. Tran\nS420,349740,Isla,Boateng,islaboateng31@pacificachristian.org,Female,S,Ms. Hale\nS421,484339,Paul,Nielsen,paulnielsen31@pacificachristian.org,Male,L,Mr. Brooks\nS422,585184,Malia,Silva,maliasilva31@pacificachristian.org,Female,S,Ms. Tran\nS423,544819,Claire,Kaur,clairekaur31@pacificachristian.org,Female,M,Mr. Brooks\nS424,850797,Harper,Salazar,harpersalazar31@pacificachristian.org,Female,L,Ms. Tran\nS425,692576,Joel,Dominguez,joeldominguez31@pacificachristian.org,Male,S,Ms. Hale\nS426,793904,Vincent,Zhou,vincentzhou31@pacificachristian.org,Male,XL,Ms. Tran\nS427,925176,Zara,Richards,zararichards31@pacificachristian.org,Female,S,Ms. Tran\nS428,973100,Nadia,Lucas,nadialucas31@pacificachristian.org,Female,S,Mr. Brooks\nS429,975090,Adrian,Adeyemi,adrianadeyemi31@pacificachristian.org,Male,M,Ms. Hale\nS430,471339,Caroline,Caldwell,carolinecaldwell31@pacificachristian.org,Female,M,Ms. Hale\nS431,187324,Mira,Nunez,miranunez31@pacificachristian.org,Female,S,Mr. Brooks\nS432,834163,Owen,Howard,owenhoward31@pacificachristian.org,Male,M,Ms. Hale\nS433,864699,Jasmine,Yu,jasmineyu31@pacificachristian.org,Female,XL,Ms. Tran\nS434,223794,Carmen,Porter,carmenporter31@pacificachristian.org,Female,XS,Mr. Brooks\nS435,601322,Paige,Yu,paigeyu31@pacificachristian.org,Female,S,Ms. Tran\nS436,639776,Pablo,Lim,pablolim31@pacificachristian.org,Male,S,Mr. Brooks\nS437,839732,Victor,Nunez,victornunez31@pacificachristian.org,Male,XS,Mr. Brooks\nS438,654975,Ingrid,Boyd,ingridboyd31@pacificachristian.org,Female,L,Ms. Hale\nS439,585026,Ethan,Hart,ethanhart31@pacificachristian.org,Male,L,Ms. Hale\nS440,460500,Imani,Ramos,imaniramos31@pacificachristian.org,Female,XL,Ms. Tran\nS441,187948,Omar,Ingram,omaringram31@pacificachristian.org,Male,XL,Mr. Brooks\nS442,604800,Emilia,Zimmerman,emiliazimmerman31@pacificachristian.org,Female,M,Ms. Tran\nS443,730581,Daniela,Grant,danielagrant31@pacificachristian.org,Female,XS,Ms. Hale\nS444,263212,Sophie,Robinson,sophierobinson31@pacificachristian.org,Female,S,Ms. Tran\nS445,495104,Helena,Das,helenadas31@pacificachristian.org,Female,S,Ms. Hale\nS446,296242,Rosa,Douglas,rosadouglas31@pacificachristian.org,Female,M,Ms. Hale\nS447,676138,Cameron,Yang,cameronyang31@pacificachristian.org,Male,M,Ms. Tran\nS448,749435,Joel,Zimmerman,joelzimmerman31@pacificachristian.org,Male,M,Ms. Tran\nS449,383250,Vera,Moreno,veramoreno31@pacificachristian.org,Female,M,Mr. Brooks\nS450,392840,Javier,Johansson,javierjohansson31@pacificachristian.org,Male,XL,Mr. Brooks\nS451,890005,Leila,Vega,leilavega31@pacificachristian.org,Female,XL,Ms. Tran\nS452,259343,Elise,Santos,elisesantos31@pacificachristian.org,Female,S,Ms. Tran\nS453,179768,Amir,Mueller,amirmueller31@pacificachristian.org,Male,S,Mr. Brooks\nS454,707361,Kofi,Boyd,kofiboyd31@pacificachristian.org,Male,M,Ms. Hale\nS455,724011,Ryan,Murray,ryanmurray31@pacificachristian.org,Male,L,Mr. Brooks\nS456,280043,Elias,Valdez,eliasvaldez31@pacificachristian.org,Male,M,Ms. Tran\nS457,423572,Nadia,Wheeler,nadiawheeler31@pacificachristian.org,Female,L,Ms. Tran\nS458,278604,Tyler,Fitzgerald,tylerfitzgerald31@pacificachristian.org,Male,M,Ms. Hale\nS459,939966,Caleb,Yoon,calebyoon31@pacificachristian.org,Male,L,Ms. Tran\nS460,952313,Zachary,Becker,zacharybecker31@pacificachristian.org,Male,L,Ms. Hale\nS461,823537,Stella,Sharma,stellasharma31@pacificachristian.org,Female,S,Ms. Tran\nS462,540329,Omar,Singh,omarsingh31@pacificachristian.org,Male,L,Ms. Tran\nS463,318596,Vera,Farah,verafarah31@pacificachristian.org,Female,M,Ms. Hale\nS464,985411,Gabriel,Lynch,gabriellynch31@pacificachristian.org,Male,M,Mr. Brooks\nS465,761547,Jeremiah,Cooper,jeremiahcooper31@pacificachristian.org,Male,S,Ms. Hale\nS466,559313,Ruby,Campbell,rubycampbell31@pacificachristian.org,Female,S,Ms. Hale\nS467,518151,Francisco,Schneider,franciscoschneider31@pacificachristian.org,Male,M,Ms. Tran\nS468,209142,Patrick,Joshi,patrickjoshi31@pacificachristian.org,Male,L,Mr. Brooks\nS469,684979,Jada,Mwangi,jadamwangi31@pacificachristian.org,Female,S,Mr. Brooks\nS470,375191,Olivia,Fischer,oliviafischer31@pacificachristian.org,Female,M,Ms. Hale\nS471,160844,Kara,Powell,karapowell31@pacificachristian.org,Female,M,Mr. Brooks\nS472,577296,Helena,Quintero,helenaquintero31@pacificachristian.org,Female,M,Ms. Tran\nS473,156752,Ana,Zhao,anazhao31@pacificachristian.org,Female,M,Ms. Tran\nS474,305788,Vincent,Nichols,vincentnichols31@pacificachristian.org,Male,S,Mr. Brooks\nS475,595044,Ethan,Garcia,ethangarcia31@pacificachristian.org,Male,XL,Ms. Hale\nS476,277295,Paige,Singh,paigesingh31@pacificachristian.org,Female,L,Ms. Tran\nS477,224176,George,Gallagher,georgegallagher31@pacificachristian.org,Male,M,Ms. Hale\nS478,413027,Evan,Hopkins,evanhopkins31@pacificachristian.org,Male,L,Ms. Hale\nS479,506015,Eva,Johansson,evajohansson31@pacificachristian.org,Female,L,Mr. Brooks\nS480,346222,Yusuf,McDonald,yusufmcdonald31@pacificachristian.org,Male,S,Mr. Brooks\nS481,524831,Blake,Duncan,blakeduncan31@pacificachristian.org,Male,M,Ms. Hale\nS482,945993,Simon,Myers,simonmyers31@pacificachristian.org,Male,S,Mr. Brooks\nS483,307821,Kiara,Weber,kiaraweber31@pacificachristian.org,Female,XL,Ms. Tran\nS484,723342,Sara,Mendoza,saramendoza31@pacificachristian.org,Female,XS,Mr. Brooks\nS485,300665,Pablo,Robinson,pablorobinson31@pacificachristian.org,Male,L,Ms. Tran\nS486,691106,Fiona,Joshi,fionajoshi31@pacificachristian.org,Female,L,Mr. Brooks\nS487,862690,Vera,Okafor,veraokafor31@pacificachristian.org,Female,S,Mr. Brooks\nS488,608140,Rosa,Yu,rosayu31@pacificachristian.org,Female,L,Ms. Tran\nS489,274679,Logan,Yamamoto,loganyamamoto31@pacificachristian.org,Male,S,Ms. Tran\nS490,989161,Bianca,Reynolds,biancareynolds31@pacificachristian.org,Female,S,Ms. Tran\nS491,464901,Juliana,Carroll,julianacarroll31@pacificachristian.org,Female,S,Ms. Hale\nS492,224675,Alina,Ashby,alinaashby31@pacificachristian.org,Female,L,Ms. Hale\nS493,829904,Mai,Ibrahim,maiibrahim31@pacificachristian.org,Female,M,Mr. Brooks\nS494,378839,Evan,Rossi,evanrossi31@pacificachristian.org,Male,M,Ms. Tran\nS495,326184,Elise,Cunningham,elisecunningham31@pacificachristian.org,Female,M,Ms. Hale\nS496,865201,Imani,Stone,imanistone31@pacificachristian.org,Female,M,Ms. Tran\nS497,736757,Mira,Soto,mirasoto31@pacificachristian.org,Female,S,Ms. Tran\nS498,497179,Aiden,Garza,aidengarza31@pacificachristian.org,Male,S,Ms. Hale\nS499,836688,Henry,Delgado,henrydelgado31@pacificachristian.org,Male,S,Ms. Hale\nS500,486512,Alice,Spencer,alicespencer31@pacificachristian.org,Female,M,Ms. Tran\n","data/service_hours.csv":"student_id,date,organization,hours,description\nS001,2026-10-04,Harbor Food Bank,3,Sorted donations\nS002,2026-09-20,Beach Cleanup Coalition,4,Led a cleanup crew\nS003,2026-09-27,Beach Cleanup Coalition,5,Organized volunteers\nS003,2026-10-11,Harbor Food Bank,2,Packed meals\nS004,2026-10-01,Senior Center,6,Tech help for residents\nS006,2026-10-18,Youth Camp,8,Camp counselor\nS007,2026-10-12,Animal Shelter,3,Walked dogs\nS011,2026-08-14,Beach Cleanup Coalition,2,Led a cleanup crew\nS012,2026-04-21,Community Garden,3,Weeded and watered\nS012,2026-10-15,Neighborhood Tutoring,8,Homework help\nS012,2026-02-27,Harbor Food Bank,8,Stocked shelves\nS013,2026-01-27,Senior Center,1,Played games with residents\nS015,2026-07-10,Harbor Food Bank,1,Stocked shelves\nS015,2026-05-19,Harbor Food Bank,7,Stocked shelves\nS015,2026-02-26,Senior Center,2,Tech help for residents\nS015,2026-03-08,Animal Shelter,1,Fostering event helper\nS016,2026-09-25,Neighborhood Tutoring,3,Reading tutoring\nS018,2026-10-26,Animal Shelter,6,Cleaned kennels\nS018,2026-09-07,Senior Center,2,Tech help for residents\nS020,2026-01-21,Neighborhood Tutoring,1,Math tutoring\nS023,2026-05-11,Senior Center,1,Played games with residents\nS025,2026-05-08,Beach Cleanup Coalition,1,Picked up litter\nS025,2026-01-01,Beach Cleanup Coalition,5,Led a cleanup crew\nS026,2026-09-12,Harbor Food Bank,1,Packed meals\nS026,2026-07-26,Beach Cleanup Coalition,2,Led a cleanup crew\nS026,2026-07-13,Neighborhood Tutoring,3,Math tutoring\nS026,2026-08-03,City Library,7,Helped at the book sale\nS029,2026-02-27,Community Garden,7,Planted beds\nS029,2026-09-10,Animal Shelter,8,Fostering event helper\nS029,2026-09-24,Senior Center,1,Played games with residents\nS029,2026-09-20,Community Garden,5,Built compost bins\nS033,2026-10-17,Youth Camp,1,Camp counselor\nS033,2026-03-04,Animal Shelter,6,Walked dogs\nS034,2026-03-19,Beach Cleanup Coalition,4,Sorted recycling\nS034,2026-10-25,Community Garden,4,Planted beds\nS035,2026-09-13,Harbor Food Bank,5,Sorted donations\nS036,2026-05-02,Harbor Food Bank,2,Sorted donations\nS036,2026-07-01,Harbor Food Bank,7,Stocked shelves\nS036,2026-07-08,Senior Center,4,Served lunch\nS037,2026-09-22,Animal Shelter,4,Fostering event helper\nS037,2026-09-15,Senior Center,2,Served lunch\nS037,2026-04-28,Beach Cleanup Coalition,5,Sorted recycling\nS037,2026-05-24,Animal Shelter,2,Fostering event helper\nS038,2026-09-13,Animal Shelter,1,Fostering event helper\nS040,2026-05-11,Youth Camp,7,Set up activities\nS040,2026-06-16,Senior Center,7,Tech help for residents\nS041,2026-03-02,Harbor Food Bank,3,Packed meals\nS041,2026-03-10,Beach Cleanup Coalition,1,Led a cleanup crew\nS041,2026-03-26,Neighborhood Tutoring,4,Reading tutoring\nS043,2026-09-06,Beach Cleanup Coalition,8,Picked up litter\nS044,2026-10-10,Harbor Food Bank,4,Sorted donations\nS046,2026-09-07,Animal Shelter,3,Cleaned kennels\nS046,2026-08-02,Community Garden,2,Planted beds\nS046,2026-04-25,Senior Center,8,Served lunch\nS046,2026-04-16,Animal Shelter,1,Cleaned kennels\nS047,2026-05-14,Harbor Food Bank,4,Stocked shelves\nS050,2026-10-20,Senior Center,5,Tech help for residents\nS053,2026-05-17,City Library,5,Read to children\nS053,2026-08-17,City Library,8,Shelved books\nS054,2026-05-24,Senior Center,4,Tech help for residents\nS054,2026-06-16,Senior Center,1,Tech help for residents\nS055,2026-08-15,Harbor Food Bank,7,Packed meals\nS056,2026-10-20,Neighborhood Tutoring,7,Reading tutoring\nS058,2026-04-26,Neighborhood Tutoring,8,Math tutoring\nS058,2026-02-04,Community Garden,4,Planted beds\nS058,2026-02-24,Neighborhood Tutoring,2,Homework help\nS059,2026-01-26,Senior Center,5,Tech help for residents\nS059,2026-02-06,Neighborhood Tutoring,6,Homework help\nS060,2026-08-20,Beach Cleanup Coalition,6,Sorted recycling\nS062,2026-03-01,Animal Shelter,3,Cleaned kennels\nS063,2026-10-16,Animal Shelter,5,Cleaned kennels\nS063,2026-09-20,Animal Shelter,2,Fostering event helper\nS063,2026-09-02,Harbor Food Bank,5,Sorted donations\nS064,2026-10-12,Neighborhood Tutoring,6,Math tutoring\nS067,2026-05-17,Animal Shelter,6,Fostering event helper\nS068,2026-03-03,Harbor Food Bank,2,Stocked shelves\nS069,2026-10-02,Community Garden,4,Planted beds\nS069,2026-09-08,Animal Shelter,7,Walked dogs\nS070,2026-01-26,Neighborhood Tutoring,6,Reading tutoring\nS070,2026-03-18,Harbor Food Bank,8,Stocked shelves\nS070,2026-05-21,Harbor Food Bank,3,Packed meals\nS070,2026-08-14,Senior Center,8,Tech help for residents\nS072,2026-05-07,Youth Camp,5,Set up activities\nS073,2026-09-01,Beach Cleanup Coalition,2,Sorted recycling\nS073,2026-09-17,Youth Camp,8,Set up activities\nS073,2026-09-02,City Library,2,Shelved books\nS074,2026-03-26,Animal Shelter,6,Cleaned kennels\nS074,2026-06-24,Senior Center,6,Played games with residents\nS075,2026-03-01,Animal Shelter,6,Walked dogs\nS077,2026-06-09,Senior Center,4,Tech help for residents\nS077,2026-07-01,Youth Camp,8,Set up activities\nS077,2026-10-17,Neighborhood Tutoring,7,Homework help\nS078,2026-10-23,Senior Center,4,Tech help for residents\nS078,2026-04-15,City Library,6,Helped at the book sale\nS081,2026-10-28,City Library,6,Helped at the book sale\nS082,2026-04-06,City Library,4,Shelved books\nS082,2026-06-26,Neighborhood Tutoring,2,Homework help\nS083,2026-09-19,Community Garden,5,Weeded and watered\nS083,2026-10-24,Beach Cleanup Coalition,6,Picked up litter\nS083,2026-09-07,City Library,6,Helped at the book sale\nS083,2026-10-20,Animal Shelter,3,Cleaned kennels\nS085,2026-02-17,Neighborhood Tutoring,4,Reading tutoring\nS085,2026-06-28,Beach Cleanup Coalition,4,Picked up litter\nS086,2026-09-08,Youth Camp,1,Set up activities\nS087,2026-09-08,Community Garden,2,Built compost bins\nS088,2026-09-06,City Library,5,Helped at the book sale\nS088,2026-08-10,Youth Camp,4,Set up activities\nS088,2026-07-01,Neighborhood Tutoring,7,Homework help\nS089,2026-01-07,Community Garden,7,Planted beds\nS091,2026-09-23,Animal Shelter,8,Cleaned kennels\nS093,2026-05-04,City Library,7,Helped at the book sale\nS093,2026-01-07,City Library,7,Shelved books\nS093,2026-02-18,Harbor Food Bank,1,Sorted donations\nS096,2026-09-22,Harbor Food Bank,5,Stocked shelves\nS097,2026-10-07,Community Garden,7,Planted beds\nS097,2026-09-12,Neighborhood Tutoring,5,Reading tutoring\nS097,2026-10-04,Community Garden,2,Built compost bins\nS098,2026-10-26,Neighborhood Tutoring,2,Reading tutoring\nS098,2026-09-20,Animal Shelter,6,Walked dogs\nS100,2026-02-12,Neighborhood Tutoring,8,Reading tutoring\nS100,2026-03-20,Animal Shelter,3,Fostering event helper\nS101,2026-09-02,Harbor Food Bank,5,Packed meals\nS102,2026-06-07,Neighborhood Tutoring,6,Reading tutoring\nS102,2026-08-28,Harbor Food Bank,3,Packed meals\nS102,2026-07-21,Neighborhood Tutoring,6,Math tutoring\nS103,2026-05-05,Animal Shelter,7,Walked dogs\nS103,2026-10-14,City Library,2,Shelved books\nS103,2026-10-16,Neighborhood Tutoring,5,Reading tutoring\nS103,2026-03-09,Senior Center,7,Tech help for residents\nS104,2026-10-04,Animal Shelter,7,Walked dogs\nS104,2026-10-07,Community Garden,1,Planted beds\nS105,2026-02-21,Neighborhood Tutoring,3,Reading tutoring\nS105,2026-08-14,Community Garden,8,Weeded and watered\nS106,2026-04-12,Community Garden,4,Built compost bins\nS107,2026-05-06,Animal Shelter,5,Cleaned kennels\nS107,2026-03-19,Beach Cleanup Coalition,5,Sorted recycling\nS107,2026-01-27,Youth Camp,4,Set up activities\nS110,2026-10-09,Community Garden,2,Planted beds\nS113,2026-06-15,Neighborhood Tutoring,7,Homework help\nS114,2026-10-24,Animal Shelter,6,Fostering event helper\nS116,2026-02-05,Beach Cleanup Coalition,6,Picked up litter\nS116,2026-09-08,Beach Cleanup Coalition,3,Picked up litter\nS116,2026-01-27,Neighborhood Tutoring,3,Homework help\nS116,2026-02-21,City Library,2,Read to children\nS119,2026-10-21,Youth Camp,3,Helped with crafts\nS119,2026-09-19,Harbor Food Bank,3,Stocked shelves\nS120,2026-10-22,Harbor Food Bank,4,Packed meals\nS121,2026-04-04,Neighborhood Tutoring,7,Math tutoring\nS122,2026-10-25,Youth Camp,2,Helped with crafts\nS124,2026-01-12,Youth Camp,1,Set up activities\nS125,2026-08-21,Community Garden,4,Built compost bins\nS126,2026-10-28,Beach Cleanup Coalition,7,Picked up litter\nS126,2026-03-12,Animal Shelter,3,Walked dogs\nS126,2026-09-20,Animal Shelter,4,Walked dogs\nS126,2026-10-18,Community Garden,3,Planted beds\nS127,2026-09-23,Community Garden,1,Built compost bins\nS130,2026-04-04,Neighborhood Tutoring,5,Homework help\nS131,2026-02-16,Community Garden,1,Planted beds\nS131,2026-08-24,Community Garden,6,Weeded and watered\nS132,2026-06-21,Neighborhood Tutoring,1,Math tutoring\nS133,2026-07-03,Beach Cleanup Coalition,1,Picked up litter\nS133,2026-04-25,City Library,2,Read to children\nS134,2026-07-23,Harbor Food Bank,4,Sorted donations\nS134,2026-10-22,Beach Cleanup Coalition,6,Sorted recycling\nS134,2026-04-06,Senior Center,6,Played games with residents\nS134,2026-08-18,Animal Shelter,1,Cleaned kennels\nS135,2026-04-17,Senior Center,7,Served lunch\nS135,2026-08-02,Animal Shelter,2,Cleaned kennels\nS135,2026-04-11,Neighborhood Tutoring,8,Reading tutoring\nS135,2026-09-09,City Library,5,Shelved books\nS138,2026-10-13,Senior Center,2,Tech help for residents\nS139,2026-01-15,Senior Center,1,Tech help for residents\nS141,2026-10-16,Senior Center,7,Played games with residents\nS141,2026-10-17,City Library,6,Shelved books\nS141,2026-09-10,Neighborhood Tutoring,4,Math tutoring\nS142,2026-10-01,Youth Camp,8,Camp counselor\nS144,2026-09-03,Youth Camp,4,Helped with crafts\nS144,2026-09-19,City Library,7,Shelved books\nS144,2026-09-22,Animal Shelter,6,Fostering event helper\nS144,2026-10-13,Youth Camp,8,Camp counselor\nS145,2026-10-11,Neighborhood Tutoring,8,Homework help\nS145,2026-10-06,Animal Shelter,1,Cleaned kennels\nS146,2026-02-07,Beach Cleanup Coalition,6,Led a cleanup crew\nS147,2026-10-06,Beach Cleanup Coalition,5,Led a cleanup crew\nS150,2026-09-04,Animal Shelter,2,Fostering event helper\nS151,2026-06-13,Community Garden,4,Weeded and watered\nS152,2026-08-03,Neighborhood Tutoring,1,Math tutoring\nS153,2026-09-18,Beach Cleanup Coalition,6,Led a cleanup crew\nS153,2026-10-21,Beach Cleanup Coalition,2,Sorted recycling\nS153,2026-08-10,Senior Center,2,Served lunch\nS153,2026-07-19,City Library,1,Read to children\nS154,2026-05-17,Youth Camp,2,Set up activities\nS154,2026-05-19,Neighborhood Tutoring,1,Homework help\nS154,2026-04-13,Neighborhood Tutoring,4,Reading tutoring\nS156,2026-03-27,Community Garden,3,Built compost bins\nS157,2026-07-10,Beach Cleanup Coalition,2,Sorted recycling\nS157,2026-10-25,Beach Cleanup Coalition,1,Led a cleanup crew\nS159,2026-03-10,Animal Shelter,6,Walked dogs\nS160,2026-05-25,Youth Camp,8,Set up activities\nS162,2026-06-04,Youth Camp,6,Set up activities\nS164,2026-07-14,Neighborhood Tutoring,2,Homework help\nS165,2026-01-01,City Library,1,Read to children\nS165,2026-02-21,Harbor Food Bank,1,Stocked shelves\nS167,2026-10-13,Community Garden,8,Built compost bins\nS168,2026-09-07,City Library,3,Shelved books\nS169,2026-03-09,Community Garden,3,Weeded and watered\nS169,2026-06-08,Animal Shelter,6,Cleaned kennels\nS170,2026-09-20,Youth Camp,8,Helped with crafts\nS170,2026-10-08,Neighborhood Tutoring,1,Homework help\nS170,2026-10-19,Community Garden,6,Planted beds\nS170,2026-10-09,City Library,3,Shelved books\nS171,2026-03-12,Neighborhood Tutoring,3,Reading tutoring\nS172,2026-10-23,Youth Camp,6,Helped with crafts\nS172,2026-09-13,Senior Center,6,Tech help for residents\nS173,2026-08-04,Neighborhood Tutoring,8,Homework help\nS173,2026-02-06,Harbor Food Bank,5,Sorted donations\nS173,2026-04-21,Harbor Food Bank,8,Stocked shelves\nS174,2026-08-22,Community Garden,5,Planted beds\nS175,2026-03-12,Neighborhood Tutoring,1,Math tutoring\nS176,2026-10-12,Youth Camp,3,Camp counselor\nS176,2026-04-03,Beach Cleanup Coalition,7,Led a cleanup crew\nS177,2026-03-02,Beach Cleanup Coalition,7,Led a cleanup crew\nS177,2026-02-05,Neighborhood Tutoring,8,Math tutoring\nS182,2026-09-15,Senior Center,1,Served lunch\nS183,2026-10-10,Beach Cleanup Coalition,4,Led a cleanup crew\nS183,2026-10-05,Neighborhood Tutoring,6,Math tutoring\nS183,2026-10-15,Animal Shelter,6,Cleaned kennels\nS186,2026-10-23,Youth Camp,1,Set up activities\nS186,2026-10-15,Senior Center,8,Served lunch\nS186,2026-09-08,Youth Camp,8,Set up activities\nS187,2026-09-11,Beach Cleanup Coalition,6,Picked up litter\nS188,2026-10-05,Beach Cleanup Coalition,4,Picked up litter\nS188,2026-09-14,Harbor Food Bank,5,Stocked shelves\nS189,2026-10-24,Youth Camp,3,Helped with crafts\nS189,2026-10-26,Animal Shelter,7,Fostering event helper\nS191,2026-04-21,Senior Center,1,Served lunch\nS192,2026-03-06,Senior Center,5,Served lunch\nS192,2026-01-06,City Library,2,Shelved books\nS193,2026-07-23,Youth Camp,8,Helped with crafts\nS195,2026-06-05,Animal Shelter,2,Walked dogs\nS196,2026-08-11,Senior Center,3,Tech help for residents\nS196,2026-08-16,Beach Cleanup Coalition,6,Sorted recycling\nS200,2026-02-16,Neighborhood Tutoring,6,Math tutoring\nS200,2026-03-16,Animal Shelter,8,Walked dogs\nS202,2026-03-03,Senior Center,6,Served lunch\nS205,2026-08-05,Neighborhood Tutoring,3,Reading tutoring\nS205,2026-03-21,Beach Cleanup Coalition,8,Led a cleanup crew\nS210,2026-02-22,City Library,3,Read to children\nS211,2026-10-15,Beach Cleanup Coalition,4,Picked up litter\nS211,2026-10-21,Beach Cleanup Coalition,5,Picked up litter\nS211,2026-09-12,Animal Shelter,1,Fostering event helper\nS212,2026-08-05,Beach Cleanup Coalition,8,Led a cleanup crew\nS212,2026-03-12,Harbor Food Bank,3,Stocked shelves\nS213,2026-08-26,Beach Cleanup Coalition,3,Picked up litter\nS213,2026-06-17,City Library,8,Shelved books\nS214,2026-10-13,Youth Camp,7,Helped with crafts\nS214,2026-01-19,Youth Camp,2,Set up activities\nS215,2026-07-11,Youth Camp,3,Camp counselor\nS219,2026-09-14,Neighborhood Tutoring,1,Math tutoring\nS220,2026-09-22,City Library,8,Shelved books\nS221,2026-04-06,Youth Camp,6,Helped with crafts\nS223,2026-07-06,Youth Camp,7,Set up activities\nS224,2026-07-17,Youth Camp,5,Camp counselor\nS224,2026-06-25,Animal Shelter,3,Cleaned kennels\nS225,2026-08-03,Harbor Food Bank,3,Stocked shelves\nS226,2026-04-15,Beach Cleanup Coalition,8,Led a cleanup crew\nS227,2026-04-16,City Library,4,Read to children\nS227,2026-02-14,Neighborhood Tutoring,6,Homework help\nS227,2026-08-11,Beach Cleanup Coalition,4,Led a cleanup crew\nS229,2026-10-14,Community Garden,8,Weeded and watered\nS229,2026-10-23,Animal Shelter,2,Walked dogs\nS229,2026-10-14,Animal Shelter,6,Fostering event helper\nS231,2026-10-23,Beach Cleanup Coalition,3,Led a cleanup crew\nS231,2026-09-08,Animal Shelter,8,Cleaned kennels\nS231,2026-09-18,Community Garden,8,Planted beds\nS231,2026-09-27,Community Garden,7,Planted beds\nS233,2026-01-21,Youth Camp,3,Camp counselor\nS233,2026-10-03,Animal Shelter,1,Walked dogs\nS234,2026-09-11,City Library,3,Read to children\nS237,2026-01-01,City Library,8,Read to children\nS237,2026-03-06,Animal Shelter,7,Fostering event helper\nS239,2026-04-28,Neighborhood Tutoring,8,Math tutoring\nS239,2026-09-23,Animal Shelter,3,Fostering event helper\nS240,2026-07-26,Animal Shelter,7,Cleaned kennels\nS241,2026-07-08,Neighborhood Tutoring,4,Homework help\nS241,2026-03-20,Neighborhood Tutoring,2,Homework help\nS241,2026-10-06,Senior Center,2,Played games with residents\nS243,2026-09-17,Senior Center,8,Tech help for residents\nS243,2026-09-12,Beach Cleanup Coalition,3,Led a cleanup crew\nS244,2026-05-19,Animal Shelter,5,Fostering event helper\nS244,2026-09-21,Neighborhood Tutoring,3,Homework help\nS244,2026-08-06,Community Garden,3,Built compost bins\nS244,2026-01-07,Animal Shelter,6,Cleaned kennels\nS247,2026-10-27,Animal Shelter,6,Cleaned kennels\nS249,2026-10-06,City Library,5,Helped at the book sale\nS249,2026-05-06,Beach Cleanup Coalition,4,Picked up litter\nS251,2026-02-06,Senior Center,5,Tech help for residents\nS251,2026-08-04,Neighborhood Tutoring,2,Math tutoring\nS251,2026-03-23,Animal Shelter,5,Fostering event helper\nS251,2026-01-16,Animal Shelter,5,Walked dogs\nS252,2026-10-11,City Library,4,Shelved books\nS255,2026-03-22,Community Garden,2,Weeded and watered\nS255,2026-01-11,Harbor Food Bank,6,Packed meals\nS256,2026-09-27,Harbor Food Bank,8,Packed meals\nS256,2026-10-08,Beach Cleanup Coalition,3,Led a cleanup crew\nS256,2026-09-18,Animal Shelter,6,Fostering event helper\nS256,2026-10-17,Beach Cleanup Coalition,6,Sorted recycling\nS257,2026-04-08,Senior Center,4,Played games with residents\nS257,2026-03-23,Youth Camp,7,Helped with crafts\nS257,2026-07-10,Youth Camp,5,Camp counselor\nS261,2026-03-03,Beach Cleanup Coalition,6,Picked up litter\nS261,2026-04-25,Harbor Food Bank,2,Sorted donations\nS262,2026-02-20,Senior Center,4,Served lunch\nS264,2026-09-04,Neighborhood Tutoring,2,Reading tutoring\nS265,2026-10-23,Senior Center,6,Served lunch\nS269,2026-04-20,Animal Shelter,2,Cleaned kennels\nS269,2026-07-23,Animal Shelter,1,Cleaned kennels\nS270,2026-01-07,Harbor Food Bank,8,Sorted donations\nS271,2026-10-15,Youth Camp,2,Helped with crafts\nS275,2026-04-09,Neighborhood Tutoring,5,Homework help\nS275,2026-03-24,Youth Camp,1,Set up activities\nS276,2026-09-15,Beach Cleanup Coalition,6,Led a cleanup crew\nS276,2026-10-09,Beach Cleanup Coalition,3,Picked up litter\nS277,2026-02-08,Community Garden,5,Weeded and watered\nS277,2026-01-13,Youth Camp,1,Camp counselor\nS278,2026-09-06,Senior Center,7,Played games with residents\nS278,2026-10-21,Beach Cleanup Coalition,7,Sorted recycling\nS279,2026-04-02,Beach Cleanup Coalition,1,Sorted recycling\nS279,2026-07-22,Community Garden,4,Built compost bins\nS279,2026-06-28,Harbor Food Bank,2,Sorted donations\nS279,2026-01-17,Neighborhood Tutoring,7,Math tutoring\nS280,2026-04-09,Harbor Food Bank,2,Packed meals\nS280,2026-08-14,Animal Shelter,4,Fostering event helper\nS280,2026-06-14,City Library,4,Read to children\nS282,2026-10-22,Beach Cleanup Coalition,1,Picked up litter\nS284,2026-09-12,Beach Cleanup Coalition,4,Sorted recycling\nS285,2026-03-17,Beach Cleanup Coalition,4,Picked up litter\nS285,2026-05-01,Beach Cleanup Coalition,2,Led a cleanup crew\nS286,2026-10-24,Youth Camp,1,Camp counselor\nS286,2026-03-16,Beach Cleanup Coalition,6,Picked up litter\nS286,2026-10-13,City Library,8,Read to children\nS287,2026-03-01,Senior Center,7,Played games with residents\nS288,2026-08-23,Senior Center,2,Tech help for residents\nS288,2026-09-20,Community Garden,2,Planted beds\nS288,2026-06-07,Neighborhood Tutoring,7,Math tutoring\nS289,2026-04-04,City Library,7,Read to children\nS289,2026-03-18,Harbor Food Bank,2,Sorted donations\nS290,2026-09-15,Neighborhood Tutoring,6,Math tutoring\nS291,2026-02-21,Harbor Food Bank,6,Packed meals\nS291,2026-04-02,Neighborhood Tutoring,4,Homework help\nS292,2026-02-10,Animal Shelter,3,Walked dogs\nS293,2026-09-09,City Library,3,Helped at the book sale\nS294,2026-06-14,City Library,3,Helped at the book sale\nS294,2026-01-04,Youth Camp,2,Camp counselor\nS294,2026-07-11,Community Garden,3,Weeded and watered\nS298,2026-05-03,Beach Cleanup Coalition,5,Sorted recycling\nS298,2026-02-01,Community Garden,6,Planted beds\nS299,2026-10-19,Neighborhood Tutoring,7,Homework help\nS300,2026-08-24,Neighborhood Tutoring,7,Homework help\nS302,2026-08-23,Animal Shelter,8,Fostering event helper\nS303,2026-03-03,Neighborhood Tutoring,4,Reading tutoring\nS304,2026-10-13,Senior Center,3,Played games with residents\nS304,2026-09-21,Beach Cleanup Coalition,5,Sorted recycling\nS304,2026-09-21,Animal Shelter,3,Fostering event helper\nS305,2026-10-05,Animal Shelter,4,Fostering event helper\nS305,2026-08-16,City Library,3,Shelved books\nS306,2026-09-04,Harbor Food Bank,1,Sorted donations\nS309,2026-09-03,Beach Cleanup Coalition,6,Sorted recycling\nS311,2026-07-18,Harbor Food Bank,8,Stocked shelves\nS311,2026-02-20,Harbor Food Bank,1,Sorted donations\nS312,2026-03-28,Youth Camp,6,Set up activities\nS312,2026-07-14,Community Garden,7,Planted beds\nS313,2026-02-04,Youth Camp,2,Camp counselor\nS313,2026-02-28,Animal Shelter,8,Fostering event helper\nS314,2026-08-08,Beach Cleanup Coalition,2,Picked up litter\nS315,2026-05-02,Beach Cleanup Coalition,5,Sorted recycling\nS317,2026-04-26,Animal Shelter,5,Walked dogs\nS317,2026-07-04,Harbor Food Bank,2,Packed meals\nS317,2026-02-09,Harbor Food Bank,4,Sorted donations\nS318,2026-02-08,Harbor Food Bank,5,Packed meals\nS320,2026-09-15,Community Garden,3,Planted beds\nS320,2026-06-28,Neighborhood Tutoring,7,Math tutoring\nS320,2026-02-14,Beach Cleanup Coalition,1,Led a cleanup crew\nS321,2026-03-11,Beach Cleanup Coalition,6,Led a cleanup crew\nS321,2026-07-13,Harbor Food Bank,1,Packed meals\nS322,2026-09-14,Harbor Food Bank,1,Packed meals\nS323,2026-03-23,Community Garden,1,Planted beds\nS323,2026-02-03,Neighborhood Tutoring,3,Math tutoring\nS324,2026-01-19,Harbor Food Bank,6,Stocked shelves\nS324,2026-09-24,Community Garden,3,Weeded and watered\nS324,2026-02-14,Beach Cleanup Coalition,6,Sorted recycling\nS326,2026-10-04,Beach Cleanup Coalition,3,Led a cleanup crew\nS327,2026-10-03,Youth Camp,7,Camp counselor\nS327,2026-10-22,Community Garden,2,Planted beds\nS328,2026-01-24,Beach Cleanup Coalition,1,Led a cleanup crew\nS328,2026-06-09,City Library,5,Read to children\nS328,2026-04-17,Community Garden,6,Built compost bins\nS329,2026-06-12,City Library,8,Read to children\nS329,2026-03-05,Youth Camp,2,Helped with crafts\nS330,2026-10-07,City Library,5,Read to children\nS330,2026-09-20,Neighborhood Tutoring,7,Math tutoring\nS331,2026-04-06,Neighborhood Tutoring,1,Math tutoring\nS332,2026-10-07,Neighborhood Tutoring,4,Math tutoring\nS332,2026-10-19,Animal Shelter,5,Cleaned kennels\nS334,2026-09-20,Harbor Food Bank,7,Stocked shelves\nS336,2026-04-25,Animal Shelter,7,Cleaned kennels\nS338,2026-03-24,Animal Shelter,1,Walked dogs\nS338,2026-05-25,Youth Camp,1,Camp counselor\nS339,2026-02-16,Animal Shelter,3,Cleaned kennels\nS339,2026-07-19,Youth Camp,7,Set up activities\nS339,2026-08-02,Animal Shelter,5,Cleaned kennels\nS339,2026-01-13,Beach Cleanup Coalition,6,Led a cleanup crew\nS340,2026-09-03,Youth Camp,7,Camp counselor\nS340,2026-10-18,Animal Shelter,7,Fostering event helper\nS341,2026-10-22,Neighborhood Tutoring,6,Homework help\nS343,2026-09-09,Animal Shelter,6,Cleaned kennels\nS344,2026-05-07,Community Garden,6,Planted beds\nS346,2026-09-21,Harbor Food Bank,4,Stocked shelves\nS350,2026-10-20,Beach Cleanup Coalition,3,Led a cleanup crew\nS352,2026-10-13,Harbor Food Bank,2,Stocked shelves\nS353,2026-10-02,Senior Center,5,Played games with residents\nS354,2026-05-26,Community Garden,1,Built compost bins\nS354,2026-08-19,Harbor Food Bank,8,Stocked shelves\nS355,2026-09-08,Beach Cleanup Coalition,8,Led a cleanup crew\nS355,2026-10-05,Community Garden,7,Weeded and watered\nS358,2026-04-05,City Library,5,Helped at the book sale\nS358,2026-06-15,City Library,4,Shelved books\nS359,2026-02-07,Beach Cleanup Coalition,1,Led a cleanup crew\nS359,2026-07-15,Animal Shelter,7,Fostering event helper\nS359,2026-10-14,Animal Shelter,2,Fostering event helper\nS359,2026-03-12,City Library,4,Helped at the book sale\nS360,2026-01-15,Neighborhood Tutoring,4,Reading tutoring\nS360,2026-07-24,Youth Camp,1,Set up activities\nS361,2026-09-17,Beach Cleanup Coalition,2,Picked up litter\nS362,2026-09-27,Community Garden,4,Weeded and watered\nS364,2026-06-05,Harbor Food Bank,1,Sorted donations\nS364,2026-02-18,Harbor Food Bank,1,Sorted donations\nS366,2026-03-12,Senior Center,8,Played games with residents\nS366,2026-08-24,City Library,3,Shelved books\nS366,2026-05-07,City Library,5,Shelved books\nS366,2026-05-27,Community Garden,3,Built compost bins\nS367,2026-10-14,Animal Shelter,7,Cleaned kennels\nS368,2026-10-02,Beach Cleanup Coalition,8,Led a cleanup crew\nS369,2026-09-27,Animal Shelter,8,Walked dogs\nS369,2026-10-25,Harbor Food Bank,1,Sorted donations\nS369,2026-10-24,Neighborhood Tutoring,2,Math tutoring\nS370,2026-04-20,Beach Cleanup Coalition,5,Picked up litter\nS370,2026-10-07,Neighborhood Tutoring,4,Homework help\nS370,2026-03-18,Harbor Food Bank,1,Stocked shelves\nS370,2026-06-27,Youth Camp,2,Helped with crafts\nS371,2026-03-27,Neighborhood Tutoring,3,Reading tutoring\nS373,2026-09-22,Beach Cleanup Coalition,7,Sorted recycling\nS373,2026-06-20,Youth Camp,8,Set up activities\nS373,2026-10-23,Youth Camp,2,Camp counselor\nS375,2026-09-24,Neighborhood Tutoring,6,Reading tutoring\nS376,2026-05-19,Neighborhood Tutoring,4,Homework help\nS377,2026-10-03,Neighborhood Tutoring,2,Homework help\nS378,2026-03-03,Animal Shelter,1,Cleaned kennels\nS378,2026-07-17,Senior Center,8,Played games with residents\nS378,2026-02-28,Harbor Food Bank,6,Packed meals\nS380,2026-09-01,Youth Camp,4,Camp counselor\nS380,2026-10-28,Community Garden,8,Built compost bins\nS382,2026-06-04,Senior Center,4,Tech help for residents\nS382,2026-02-28,Harbor Food Bank,5,Sorted donations\nS383,2026-10-06,Harbor Food Bank,8,Sorted donations\nS384,2026-06-01,Beach Cleanup Coalition,2,Sorted recycling\nS387,2026-02-02,Neighborhood Tutoring,3,Reading tutoring\nS389,2026-07-12,City Library,7,Shelved books\nS389,2026-09-06,Neighborhood Tutoring,6,Math tutoring\nS390,2026-02-02,Community Garden,6,Weeded and watered\nS391,2026-05-09,Neighborhood Tutoring,5,Reading tutoring\nS391,2026-07-06,City Library,2,Shelved books\nS392,2026-02-27,Neighborhood Tutoring,3,Reading tutoring\nS392,2026-03-03,Youth Camp,5,Set up activities\nS394,2026-01-04,Harbor Food Bank,2,Sorted donations\nS394,2026-01-09,Beach Cleanup Coalition,4,Led a cleanup crew\nS396,2026-07-02,City Library,7,Helped at the book sale\nS396,2026-03-22,City Library,6,Helped at the book sale\nS396,2026-02-17,Neighborhood Tutoring,1,Math tutoring\nS396,2026-07-26,City Library,4,Read to children\nS397,2026-05-21,Neighborhood Tutoring,3,Homework help\nS397,2026-04-09,Community Garden,6,Built compost bins\nS397,2026-08-10,Harbor Food Bank,1,Stocked shelves\nS398,2026-03-10,Beach Cleanup Coalition,8,Picked up litter\nS399,2026-09-22,Harbor Food Bank,8,Stocked shelves\nS399,2026-10-16,Senior Center,1,Tech help for residents\nS400,2026-05-05,Neighborhood Tutoring,1,Reading tutoring\nS400,2026-01-25,Senior Center,5,Served lunch\nS400,2026-07-06,Neighborhood Tutoring,3,Homework help\nS400,2026-06-21,Youth Camp,7,Helped with crafts\n","data/students.csv":"student_id,school_id,first_name,last_name,email,graduation_year,grade,gender,tshirt_size,counselor\nS001,482913,Maya,Ortega,mayaortega30@pacificachristian.org,2030,9,Female,S,Ms. Hale\nS002,615077,Jonah,Reed,jonahreed29@pacificachristian.org,2029,10,Male,L,Mr. Brooks\nS003,390264,Priya,Nair,priyanair28@pacificachristian.org,2028,11,Female,M,Ms. Hale\nS004,748150,Eli,Carter,elicarter27@pacificachristian.org,2027,12,Male,XL,Mr. Brooks\nS005,527391,Sofia,Lindqvist,sofialindqvist29@pacificachristian.org,2029,10,Female,S,Ms. Tran\nS006,806432,Marcus,Bell,marcusbell28@pacificachristian.org,2028,11,Male,L,Ms. Tran\nS007,153869,Hana,Kim,hanakim30@pacificachristian.org,2030,9,Female,M,Mr. Brooks\nS008,931705,Diego,Alvarez,diegoalvarez27@pacificachristian.org,2027,12,Male,M,Ms. Hale\nS009,264518,Maya,Chen,mayachen28@pacificachristian.org,2028,11,Female,XS,Ms. Tran\nS010,679240,Dum,Dum,dumdum30@pacificachristian.org,2030,9,Male,M,Ms. Hale\nS011,266290,Leila,Jordan,leilajordan29@pacificachristian.org,2029,10,Female,XS,Mr. Brooks\nS012,349248,Marco,Pacheco,marcopacheco29@pacificachristian.org,2029,10,Male,XL,Mr. Brooks\nS013,411576,Leah,Cortez,leahcortez28@pacificachristian.org,2028,11,Female,S,Ms. Hale\nS014,931764,Nadia,Duarte,nadiaduarte29@pacificachristian.org,2029,10,Female,M,Ms. Hale\nS015,248491,Thea,Johnson,theajohnson28@pacificachristian.org,2028,11,Female,L,Mr. Brooks\nS016,198631,Jose,Carroll,josecarroll30@pacificachristian.org,2030,9,Male,M,Ms. Hale\nS017,540344,Jasmine,Chavez,jasminechavez28@pacificachristian.org,2028,11,Female,L,Ms. Hale\nS018,930485,Daniela,Hoffman,danielahoffman30@pacificachristian.org,2030,9,Female,S,Ms. Hale\nS019,472895,Kaia,Rossi,kaiarossi28@pacificachristian.org,2028,11,Female,L,Ms. Tran\nS020,206956,Yusuf,Yang,yusufyang29@pacificachristian.org,2029,10,Male,M,Ms. Tran\nS021,567467,Victor,Powell,victorpowell27@pacificachristian.org,2027,12,Male,L,Mr. Brooks\nS022,426865,Lena,Holmes,lenaholmes28@pacificachristian.org,2028,11,Female,L,Ms. Hale\nS023,584276,Lucia,Abbott,luciaabbott28@pacificachristian.org,2028,11,Female,L,Ms. Hale\nS024,827220,John,Wu,johnwu30@pacificachristian.org,2030,9,Male,M,Ms. Tran\nS025,192919,Kayla,Padilla,kaylapadilla29@pacificachristian.org,2029,10,Female,M,Mr. Brooks\nS026,510270,Theo,Schultz,theoschultz29@pacificachristian.org,2029,10,Male,M,Ms. Tran\nS027,534175,Iris,Davis,irisdavis30@pacificachristian.org,2030,9,Female,M,Ms. Hale\nS028,743337,Matthew,Ortiz,matthewortiz30@pacificachristian.org,2030,9,Male,M,Mr. Brooks\nS029,337390,Mariam,Pierce,mariampierce28@pacificachristian.org,2028,11,Female,L,Mr. Brooks\nS030,811903,Talia,Phillips,taliaphillips29@pacificachristian.org,2029,10,Female,M,Mr. Brooks\nS031,536914,Aiden,Velasquez,aidenvelasquez30@pacificachristian.org,2030,9,Male,L,Ms. Tran\nS032,781079,Kenji,Nakamura,kenjinakamura28@pacificachristian.org,2028,11,Male,S,Mr. Brooks\nS033,225188,Rebecca,Walker,rebeccawalker27@pacificachristian.org,2027,12,Female,M,Ms. Tran\nS034,669130,Kaia,Dominguez,kaiadominguez28@pacificachristian.org,2028,11,Female,XS,Ms. Hale\nS035,301747,Caleb,Spencer,calebspencer30@pacificachristian.org,2030,9,Male,M,Ms. Tran\nS036,310018,Harper,Tucker,harpertucker29@pacificachristian.org,2029,10,Female,M,Ms. Tran\nS037,842669,Mai,Burke,maiburke29@pacificachristian.org,2029,10,Female,M,Ms. Hale\nS038,471775,Liam,Jensen,liamjensen30@pacificachristian.org,2030,9,Male,XL,Mr. Brooks\nS039,317254,Miguel,Perez,miguelperez28@pacificachristian.org,2028,11,Male,M,Mr. Brooks\nS040,450995,Nadia,Flores,nadiaflores28@pacificachristian.org,2028,11,Female,M,Ms. Hale\nS041,861778,Rania,Santos,raniasantos28@pacificachristian.org,2028,11,Female,S,Ms. Tran\nS042,368400,Jason,Mayer,jasonmayer29@pacificachristian.org,2029,10,Male,S,Mr. Brooks\nS043,797485,Zoe,Saito,zoesaito30@pacificachristian.org,2030,9,Female,L,Ms. Tran\nS044,708669,Noor,Boyd,noorboyd28@pacificachristian.org,2028,11,Female,S,Ms. Hale\nS045,582585,Nathan,Zimmerman,nathanzimmerman30@pacificachristian.org,2030,9,Male,L,Ms. Tran\nS046,237922,Carlos,Peterson,carlospeterson27@pacificachristian.org,2027,12,Male,L,Mr. Brooks\nS047,797873,Camila,Paulsen,camilapaulsen27@pacificachristian.org,2027,12,Female,S,Mr. Brooks\nS048,939389,Cole,Fuentes,colefuentes27@pacificachristian.org,2027,12,Male,XXL,Ms. Hale\nS049,192789,Thomas,Anderson,thomasanderson27@pacificachristian.org,2027,12,Male,M,Ms. Hale\nS050,263147,Isla,Medina,islamedina30@pacificachristian.org,2030,9,Female,M,Mr. Brooks\nS051,133615,Gianna,Patel,giannapatel27@pacificachristian.org,2027,12,Female,M,Mr. Brooks\nS052,932801,Gabriela,Fujita,gabrielafujita27@pacificachristian.org,2027,12,Female,L,Ms. Hale\nS053,172216,David,Pierce,davidpierce29@pacificachristian.org,2029,10,Male,L,Mr. Brooks\nS054,610803,Finn,Murray,finnmurray28@pacificachristian.org,2028,11,Male,XL,Mr. Brooks\nS055,798167,Logan,Douglas,logandouglas29@pacificachristian.org,2029,10,Male,XL,Ms. Hale\nS056,641269,Eric,Holmes,ericholmes27@pacificachristian.org,2027,12,Male,S,Ms. Hale\nS057,682670,Jasmine,Doyle,jasminedoyle30@pacificachristian.org,2030,9,Female,M,Ms. Hale\nS058,653418,Andre,Morgan,andremorgan27@pacificachristian.org,2027,12,Male,L,Mr. Brooks\nS059,789514,Amelia,Molina,ameliamolina29@pacificachristian.org,2029,10,Female,XS,Mr. Brooks\nS060,631301,Isla,Rivera,islarivera28@pacificachristian.org,2028,11,Female,M,Ms. Tran\nS061,944517,Christian,Acosta,christianacosta29@pacificachristian.org,2029,10,Male,M,Ms. Hale\nS062,666483,Iris,Jones,irisjones28@pacificachristian.org,2028,11,Female,S,Mr. Brooks\nS063,621426,Naomi,Rodriguez,naomirodriguez30@pacificachristian.org,2030,9,Female,M,Ms. Tran\nS064,166997,Violet,Boateng,violetboateng30@pacificachristian.org,2030,9,Female,S,Ms. Hale\nS065,364011,Jeremiah,Cardenas,jeremiahcardenas27@pacificachristian.org,2027,12,Male,S,Ms. Hale\nS066,264893,Talia,Haddad,taliahaddad27@pacificachristian.org,2027,12,Female,S,Ms. Hale\nS067,414621,Elijah,Thomas,elijahthomas28@pacificachristian.org,2028,11,Male,S,Ms. Tran\nS068,533935,Khalil,Dominguez,khalildominguez29@pacificachristian.org,2029,10,Male,M,Ms. Hale\nS069,153798,Andres,Contreras,andrescontreras30@pacificachristian.org,2030,9,Male,L,Ms. Hale\nS070,509797,Zachary,Abbott,zacharyabbott29@pacificachristian.org,2029,10,Male,M,Ms. Hale\nS071,195804,Leon,Wood,leonwood27@pacificachristian.org,2027,12,Male,L,Ms. Tran\nS072,726821,Mira,Walsh,mirawalsh27@pacificachristian.org,2027,12,Female,S,Ms. Tran\nS073,868121,Ines,Adeyemi,inesadeyemi30@pacificachristian.org,2030,9,Female,M,Ms. Hale\nS074,665057,James,Mendez,jamesmendez28@pacificachristian.org,2028,11,Male,M,Mr. Brooks\nS075,774843,Max,Mayer,maxmayer28@pacificachristian.org,2028,11,Male,M,Mr. Brooks\nS076,449866,Anna,Morales,annamorales27@pacificachristian.org,2027,12,Female,S,Mr. Brooks\nS077,612951,Vanessa,Hughes,vanessahughes27@pacificachristian.org,2027,12,Female,S,Ms. Hale\nS078,807608,Adam,Ali,adamali29@pacificachristian.org,2029,10,Male,L,Ms. Hale\nS079,261936,Elena,Navarro,elenanavarro29@pacificachristian.org,2029,10,Female,M,Mr. Brooks\nS080,332571,Benjamin,Shaw,benjaminshaw29@pacificachristian.org,2029,10,Male,M,Ms. Tran\nS081,572452,Luna,Navarro,lunanavarro30@pacificachristian.org,2030,9,Female,S,Mr. Brooks\nS082,789246,Ahmed,Singh,ahmedsingh29@pacificachristian.org,2029,10,Male,XL,Ms. Tran\nS083,846346,Esther,Castro,esthercastro30@pacificachristian.org,2030,9,Female,XS,Ms. Hale\nS084,267188,Vincent,Mann,vincentmann30@pacificachristian.org,2030,9,Male,XL,Mr. Brooks\nS085,694317,Andre,Delgado,andredelgado27@pacificachristian.org,2027,12,Male,M,Ms. Hale\nS086,443470,Tobias,Chavez,tobiaschavez29@pacificachristian.org,2029,10,Male,S,Ms. Hale\nS087,403565,Alana,Sullivan,alanasullivan30@pacificachristian.org,2030,9,Female,M,Ms. Tran\nS088,365485,Kiara,Cunningham,kiaracunningham28@pacificachristian.org,2028,11,Female,S,Ms. Hale\nS089,983748,Joel,Velasquez,joelvelasquez29@pacificachristian.org,2029,10,Male,M,Ms. Tran\nS090,424225,Owen,Gonzalez,owengonzalez29@pacificachristian.org,2029,10,Male,L,Ms. Hale\nS091,202215,Alexa,Rivera,alexarivera30@pacificachristian.org,2030,9,Female,L,Ms. Tran\nS092,831975,Fiona,Cardenas,fionacardenas27@pacificachristian.org,2027,12,Female,S,Ms. Hale\nS093,984035,Joseph,Marshall,josephmarshall29@pacificachristian.org,2029,10,Male,XL,Mr. Brooks\nS094,724179,Paige,Ali,paigeali28@pacificachristian.org,2028,11,Female,S,Ms. Hale\nS095,210782,Max,Clark,maxclark30@pacificachristian.org,2030,9,Male,XL,Ms. Hale\nS096,714218,Owen,Price,owenprice30@pacificachristian.org,2030,9,Male,M,Mr. Brooks\nS097,223221,Eliana,Hoffman,elianahoffman30@pacificachristian.org,2030,9,Female,M,Ms. Hale\nS098,531241,Ravi,Noor,ravinoor30@pacificachristian.org,2030,9,Male,M,Mr. Brooks\nS099,676121,Ian,Leon,ianleon28@pacificachristian.org,2028,11,Male,S,Mr. Brooks\nS100,548662,Mariam,James,mariamjames28@pacificachristian.org,2028,11,Female,S,Mr. Brooks\nS101,202313,Xavier,Mwangi,xaviermwangi30@pacificachristian.org,2030,9,Male,M,Mr. Brooks\nS102,836493,Emilia,Dang,emiliadang29@pacificachristian.org,2029,10,Female,S,Ms. Hale\nS103,801152,Ethan,Stone,ethanstone29@pacificachristian.org,2029,10,Male,M,Ms. Tran\nS104,486722,Leon,Price,leonprice29@pacificachristian.org,2029,10,Male,L,Mr. Brooks\nS105,834107,David,Douglas,daviddouglas28@pacificachristian.org,2028,11,Male,M,Ms. Hale\nS106,768657,Amelia,Myers,ameliamyers27@pacificachristian.org,2027,12,Female,L,Mr. Brooks\nS107,122395,Hiro,Yates,hiroyates29@pacificachristian.org,2029,10,Male,S,Ms. Tran\nS108,759688,Rahul,Hassan,rahulhassan29@pacificachristian.org,2029,10,Male,M,Ms. Hale\nS109,219637,George,Salinas,georgesalinas29@pacificachristian.org,2029,10,Male,L,Ms. Tran\nS110,253863,Victor,Simmons,victorsimmons28@pacificachristian.org,2028,11,Male,M,Ms. Tran\nS111,543901,Abigail,Robinson,abigailrobinson28@pacificachristian.org,2028,11,Female,L,Ms. Tran\nS112,881906,Eliana,Wood,elianawood28@pacificachristian.org,2028,11,Female,M,Ms. Tran\nS113,291547,Michael,Bowen,michaelbowen28@pacificachristian.org,2028,11,Male,M,Ms. Hale\nS114,777365,Emilia,Farah,emiliafarah29@pacificachristian.org,2029,10,Female,L,Ms. Hale\nS115,745057,Kiara,Adeyemi,kiaraadeyemi27@pacificachristian.org,2027,12,Female,S,Ms. Hale\nS116,640639,Ruby,Murphy,rubymurphy27@pacificachristian.org,2027,12,Female,M,Mr. Brooks\nS117,468442,Yara,Carroll,yaracarroll28@pacificachristian.org,2028,11,Female,M,Ms. Hale\nS118,953359,Dominic,Popov,dominicpopov28@pacificachristian.org,2028,11,Male,L,Mr. Brooks\nS119,184538,Jenna,Price,jennaprice30@pacificachristian.org,2030,9,Female,S,Mr. Brooks\nS120,376133,Sienna,Gardner,siennagardner28@pacificachristian.org,2028,11,Female,XS,Ms. Hale\nS121,739304,Alina,Lawson,alinalawson28@pacificachristian.org,2028,11,Female,M,Mr. Brooks\nS122,709940,Aiden,Wheeler,aidenwheeler28@pacificachristian.org,2028,11,Male,S,Ms. Tran\nS123,980746,Asher,Soto,ashersoto30@pacificachristian.org,2030,9,Male,M,Ms. Tran\nS124,933865,Joel,Gallagher,joelgallagher27@pacificachristian.org,2027,12,Male,XXL,Ms. Hale\nS125,643792,Aisha,Wright,aishawright29@pacificachristian.org,2029,10,Female,L,Ms. Tran\nS126,319733,Caleb,Stewart,calebstewart28@pacificachristian.org,2028,11,Male,L,Ms. Tran\nS127,543408,Lena,Ruiz,lenaruiz28@pacificachristian.org,2028,11,Female,S,Ms. Tran\nS128,947680,Jose,Blake,joseblake28@pacificachristian.org,2028,11,Male,XL,Ms. Hale\nS129,431439,Pablo,Marshall,pablomarshall27@pacificachristian.org,2027,12,Male,XXL,Mr. Brooks\nS130,469941,Connor,Lambert,connorlambert28@pacificachristian.org,2028,11,Male,XL,Mr. Brooks\nS131,132258,Xavier,Wright,xavierwright27@pacificachristian.org,2027,12,Male,M,Ms. Tran\nS132,509636,Caleb,Zhou,calebzhou29@pacificachristian.org,2029,10,Male,M,Ms. Tran\nS133,763563,Scarlett,Larsen,scarlettlarsen27@pacificachristian.org,2027,12,Female,S,Mr. Brooks\nS134,748914,Lana,Mueller,lanamueller28@pacificachristian.org,2028,11,Female,S,Mr. Brooks\nS135,680431,Ingrid,Fitzgerald,ingridfitzgerald27@pacificachristian.org,2027,12,Female,L,Ms. Hale\nS136,187025,Brandon,Joshi,brandonjoshi27@pacificachristian.org,2027,12,Male,L,Mr. Brooks\nS137,169816,Finn,Ali,finnali28@pacificachristian.org,2028,11,Male,M,Ms. Hale\nS138,117449,Jamal,Webb,jamalwebb29@pacificachristian.org,2029,10,Male,M,Ms. Tran\nS139,524849,Jose,Espinoza,joseespinoza29@pacificachristian.org,2029,10,Male,M,Ms. Hale\nS140,557412,James,Harris,jamesharris27@pacificachristian.org,2027,12,Male,L,Ms. Hale\nS141,480119,Jayden,Jordan,jaydenjordan30@pacificachristian.org,2030,9,Male,M,Mr. Brooks\nS142,772532,Aria,Schneider,ariaschneider29@pacificachristian.org,2029,10,Female,L,Ms. Tran\nS143,178589,Aria,Campbell,ariacampbell27@pacificachristian.org,2027,12,Female,L,Ms. Hale\nS144,445822,Ines,Ali,inesali30@pacificachristian.org,2030,9,Female,S,Ms. Hale\nS145,725865,Gabriela,Malik,gabrielamalik30@pacificachristian.org,2030,9,Female,S,Mr. Brooks\nS146,563061,Ivan,Nunez,ivannunez29@pacificachristian.org,2029,10,Male,M,Mr. Brooks\nS147,218012,Hannah,Adeyemi,hannahadeyemi30@pacificachristian.org,2030,9,Female,M,Ms. Hale\nS148,696352,Paul,Bauer,paulbauer30@pacificachristian.org,2030,9,Male,L,Ms. Hale\nS149,415001,Wei,Richards,weirichards28@pacificachristian.org,2028,11,Male,M,Ms. Tran\nS150,243448,Isaac,Yu,isaacyu28@pacificachristian.org,2028,11,Male,M,Ms. Tran\nS151,132418,Leah,Ward,leahward27@pacificachristian.org,2027,12,Female,M,Ms. Tran\nS152,906662,Talia,Mueller,taliamueller27@pacificachristian.org,2027,12,Female,S,Mr. Brooks\nS153,893883,Cameron,Powell,cameronpowell28@pacificachristian.org,2028,11,Male,S,Mr. Brooks\nS154,604415,Antonio,Malik,antoniomalik27@pacificachristian.org,2027,12,Male,L,Mr. Brooks\nS155,811355,Miguel,Rahman,miguelrahman30@pacificachristian.org,2030,9,Male,L,Ms. Tran\nS156,927909,Jason,Tanaka,jasontanaka28@pacificachristian.org,2028,11,Male,L,Ms. Tran\nS157,332300,Adam,Bergman,adambergman27@pacificachristian.org,2027,12,Male,L,Ms. Hale\nS158,981247,Nicholas,Gupta,nicholasgupta27@pacificachristian.org,2027,12,Male,L,Ms. Hale\nS159,631570,Elena,Quintero,elenaquintero28@pacificachristian.org,2028,11,Female,S,Ms. Tran\nS160,770479,Leah,O'Connor,leahoconnor28@pacificachristian.org,2028,11,Female,L,Mr. Brooks\nS161,638100,Justin,Jackson,justinjackson28@pacificachristian.org,2028,11,Male,L,Mr. Brooks\nS162,897310,Rania,Chang,raniachang29@pacificachristian.org,2029,10,Female,M,Ms. Hale\nS163,770357,Thea,Cardenas,theacardenas28@pacificachristian.org,2028,11,Female,M,Ms. Hale\nS164,897386,Kevin,Porter,kevinporter29@pacificachristian.org,2029,10,Male,M,Mr. Brooks\nS165,318481,Mia,Jensen,miajensen29@pacificachristian.org,2029,10,Female,XL,Mr. Brooks\nS166,853667,Esther,Simmons,esthersimmons29@pacificachristian.org,2029,10,Female,L,Ms. Tran\nS167,412602,Luis,Fernandez,luisfernandez30@pacificachristian.org,2030,9,Male,L,Ms. Hale\nS168,447421,Malia,Johnson,maliajohnson30@pacificachristian.org,2030,9,Female,XL,Mr. Brooks\nS169,257612,Matthew,Rossi,matthewrossi28@pacificachristian.org,2028,11,Male,L,Ms. Tran\nS170,576487,Chloe,Wang,chloewang30@pacificachristian.org,2030,9,Female,XS,Ms. Tran\nS171,167781,Scarlett,Boateng,scarlettboateng29@pacificachristian.org,2029,10,Female,L,Ms. Hale\nS172,707036,Maria,Yang,mariayang30@pacificachristian.org,2030,9,Female,M,Ms. Tran\nS173,565875,George,Leon,georgeleon27@pacificachristian.org,2027,12,Male,M,Mr. Brooks\nS174,926311,Xavier,Williams,xavierwilliams29@pacificachristian.org,2029,10,Male,M,Ms. Tran\nS175,558613,Khalil,Kumar,khalilkumar28@pacificachristian.org,2028,11,Male,XXL,Mr. Brooks\nS176,929773,Mira,Wood,mirawood27@pacificachristian.org,2027,12,Female,M,Ms. Tran\nS177,928896,Paige,Keller,paigekeller27@pacificachristian.org,2027,12,Female,S,Mr. Brooks\nS178,254744,Aria,Parker,ariaparker28@pacificachristian.org,2028,11,Female,S,Mr. Brooks\nS179,258554,Omar,James,omarjames28@pacificachristian.org,2028,11,Male,M,Mr. Brooks\nS180,226307,Justin,Holmes,justinholmes28@pacificachristian.org,2028,11,Male,L,Ms. Hale\nS181,982935,Madeline,Weaver,madelineweaver28@pacificachristian.org,2028,11,Female,M,Ms. Tran\nS182,759774,Oscar,Duncan,oscarduncan29@pacificachristian.org,2029,10,Male,S,Ms. Hale\nS183,990878,Adaeze,Bennett,adaezebennett30@pacificachristian.org,2030,9,Female,S,Ms. Hale\nS184,660302,Kiara,Singh,kiarasingh27@pacificachristian.org,2027,12,Female,XL,Ms. Tran\nS185,171454,Angelo,Garza,angelogarza28@pacificachristian.org,2028,11,Male,L,Ms. Hale\nS186,920613,Samira,Pham,samirapham30@pacificachristian.org,2030,9,Female,S,Mr. Brooks\nS187,172751,Rebecca,Wright,rebeccawright29@pacificachristian.org,2029,10,Female,S,Ms. Tran\nS188,205189,Khalil,Gordon,khalilgordon30@pacificachristian.org,2030,9,Male,M,Ms. Hale\nS189,724387,Fatima,Patel,fatimapatel30@pacificachristian.org,2030,9,Female,XS,Mr. Brooks\nS190,848011,Julia,Ward,juliaward28@pacificachristian.org,2028,11,Female,S,Ms. Tran\nS191,900253,George,Burke,georgeburke27@pacificachristian.org,2027,12,Male,M,Ms. Hale\nS192,285367,Penelope,Abbott,penelopeabbott29@pacificachristian.org,2029,10,Female,M,Ms. Hale\nS193,118281,Adaeze,Patel,adaezepatel28@pacificachristian.org,2028,11,Female,M,Mr. Brooks\nS194,227253,Max,Meyer,maxmeyer29@pacificachristian.org,2029,10,Male,M,Mr. Brooks\nS195,879685,Naomi,Wright,naomiwright27@pacificachristian.org,2027,12,Female,M,Ms. Tran\nS196,894441,Logan,Banerjee,loganbanerjee29@pacificachristian.org,2029,10,Male,M,Ms. Hale\nS197,984876,Helena,Reyes,helenareyes29@pacificachristian.org,2029,10,Female,M,Ms. Tran\nS198,365158,Alina,Nguyen,alinanguyen30@pacificachristian.org,2030,9,Female,M,Mr. Brooks\nS199,538369,Simon,Farah,simonfarah30@pacificachristian.org,2030,9,Male,M,Ms. Hale\nS200,762717,Marco,Navarro,marconavarro29@pacificachristian.org,2029,10,Male,XXL,Mr. Brooks\nS201,654943,Maria,Navarro,marianavarro29@pacificachristian.org,2029,10,Female,L,Mr. Brooks\nS202,691629,Pablo,Padilla,pablopadilla28@pacificachristian.org,2028,11,Male,M,Mr. Brooks\nS203,120339,Ava,Costa,avacosta30@pacificachristian.org,2030,9,Female,S,Ms. Hale\nS204,985861,Kai,Rogers,kairogers27@pacificachristian.org,2027,12,Male,L,Ms. Tran\nS205,505771,Daphne,Schneider,daphneschneider29@pacificachristian.org,2029,10,Female,M,Ms. Tran\nS206,146598,Nina,Russell,ninarussell27@pacificachristian.org,2027,12,Female,M,Ms. Tran\nS207,459617,David,Wang,davidwang29@pacificachristian.org,2029,10,Male,M,Ms. Tran\nS208,968530,Zoe,Jensen,zoejensen29@pacificachristian.org,2029,10,Female,S,Mr. Brooks\nS209,382226,Talia,Rogers,taliarogers30@pacificachristian.org,2030,9,Female,M,Ms. Tran\nS210,784908,Ravi,Thompson,ravithompson29@pacificachristian.org,2029,10,Male,M,Ms. Tran\nS211,691836,Sara,Bradley,sarabradley30@pacificachristian.org,2030,9,Female,M,Ms. Hale\nS212,618951,Victoria,Thomas,victoriathomas28@pacificachristian.org,2028,11,Female,M,Ms. Tran\nS213,286896,Rania,Mwangi,raniamwangi29@pacificachristian.org,2029,10,Female,M,Mr. Brooks\nS214,229885,Alina,Mitchell,alinamitchell28@pacificachristian.org,2028,11,Female,S,Mr. Brooks\nS215,668481,Evan,Hoang,evanhoang29@pacificachristian.org,2029,10,Male,S,Ms. Hale\nS216,870398,Xavier,Pacheco,xavierpacheco30@pacificachristian.org,2030,9,Male,L,Mr. Brooks\nS217,317734,Hector,Zhang,hectorzhang28@pacificachristian.org,2028,11,Male,M,Ms. Tran\nS218,325930,Bianca,Novak,biancanovak29@pacificachristian.org,2029,10,Female,M,Mr. Brooks\nS219,155170,Jasmine,Thompson,jasminethompson30@pacificachristian.org,2030,9,Female,M,Ms. Tran\nS220,110046,Marisol,Romero,marisolromero30@pacificachristian.org,2030,9,Female,M,Ms. Tran\nS221,316169,Theo,Leon,theoleon27@pacificachristian.org,2027,12,Male,M,Mr. Brooks\nS222,286323,Nadia,Das,nadiadas30@pacificachristian.org,2030,9,Female,M,Ms. Hale\nS223,859692,Dylan,James,dylanjames27@pacificachristian.org,2027,12,Male,L,Mr. Brooks\nS224,532603,Daniela,Miller,danielamiller29@pacificachristian.org,2029,10,Female,S,Mr. Brooks\nS225,394152,Joshua,Carroll,joshuacarroll28@pacificachristian.org,2028,11,Male,XL,Ms. Hale\nS226,333183,Maria,Larsen,marialarsen29@pacificachristian.org,2029,10,Female,S,Mr. Brooks\nS227,752912,William,Weber,williamweber28@pacificachristian.org,2028,11,Male,XL,Ms. Tran\nS228,389251,Mila,Richards,milarichards27@pacificachristian.org,2027,12,Female,XL,Ms. Tran\nS229,265625,Hannah,Wright,hannahwright30@pacificachristian.org,2030,9,Female,XS,Ms. Tran\nS230,390842,Layla,Jimenez,laylajimenez30@pacificachristian.org,2030,9,Female,XS,Mr. Brooks\nS231,753745,Thomas,Yamamoto,thomasyamamoto30@pacificachristian.org,2030,9,Male,XL,Ms. Tran\nS232,608045,Adaeze,James,adaezejames29@pacificachristian.org,2029,10,Female,M,Mr. Brooks\nS233,188992,Rebecca,Padilla,rebeccapadilla27@pacificachristian.org,2027,12,Female,XS,Mr. Brooks\nS234,632432,Hiro,Quintero,hiroquintero27@pacificachristian.org,2027,12,Male,XL,Ms. Tran\nS235,446287,Aaron,Gordon,aarongordon27@pacificachristian.org,2027,12,Male,M,Ms. Hale\nS236,366397,Lucia,Okoye,luciaokoye28@pacificachristian.org,2028,11,Female,M,Mr. Brooks\nS237,138784,Alexa,Weber,alexaweber29@pacificachristian.org,2029,10,Female,M,Ms. Tran\nS238,621304,Penelope,Nunez,penelopenunez30@pacificachristian.org,2030,9,Female,M,Mr. Brooks\nS239,518147,Jada,Pham,jadapham29@pacificachristian.org,2029,10,Female,XS,Mr. Brooks\nS240,728276,Rahul,Morgan,rahulmorgan29@pacificachristian.org,2029,10,Male,M,Mr. Brooks\nS241,751442,Sebastian,Ward,sebastianward27@pacificachristian.org,2027,12,Male,M,Ms. Tran\nS242,198955,Isabel,Ibrahim,isabelibrahim28@pacificachristian.org,2028,11,Female,L,Mr. Brooks\nS243,206910,Alex,Sullivan,alexsullivan30@pacificachristian.org,2030,9,Male,L,Ms. Tran\nS244,989695,Gianna,Cardenas,giannacardenas29@pacificachristian.org,2029,10,Female,M,Ms. Hale\nS245,537985,Tyler,Adeyemi,tyleradeyemi27@pacificachristian.org,2027,12,Male,M,Ms. Hale\nS246,239276,Kevin,Fuentes,kevinfuentes27@pacificachristian.org,2027,12,Male,L,Ms. Hale\nS247,161209,Xavier,Vu,xaviervu29@pacificachristian.org,2029,10,Male,L,Ms. Tran\nS248,182640,Jeremiah,Patterson,jeremiahpatterson30@pacificachristian.org,2030,9,Male,XXL,Mr. Brooks\nS249,934766,Leo,Richards,leorichards27@pacificachristian.org,2027,12,Male,S,Ms. Tran\nS250,188028,Kaia,Taylor,kaiataylor28@pacificachristian.org,2028,11,Female,XS,Ms. Tran\nS251,498606,Eleanor,Marshall,eleanormarshall27@pacificachristian.org,2027,12,Female,S,Mr. Brooks\nS252,828503,Daniel,Weaver,danielweaver30@pacificachristian.org,2030,9,Male,L,Ms. Tran\nS253,661583,Olivia,Owens,oliviaowens30@pacificachristian.org,2030,9,Female,S,Mr. Brooks\nS254,862589,Juliana,Fujita,julianafujita28@pacificachristian.org,2028,11,Female,S,Ms. Hale\nS255,429789,Samira,Jain,samirajain27@pacificachristian.org,2027,12,Female,S,Mr. Brooks\nS256,838045,Cameron,Dixon,camerondixon30@pacificachristian.org,2030,9,Male,M,Ms. Hale\nS257,118051,James,Kaur,jameskaur27@pacificachristian.org,2027,12,Male,XXL,Mr. Brooks\nS258,424121,Hiro,Grant,hirogrant30@pacificachristian.org,2030,9,Male,M,Ms. Hale\nS259,493990,Ines,Lin,ineslin29@pacificachristian.org,2029,10,Female,XL,Mr. Brooks\nS260,950497,Miguel,Hansen,miguelhansen29@pacificachristian.org,2029,10,Male,L,Ms. Hale\nS261,458811,Julian,Jacobs,julianjacobs28@pacificachristian.org,2028,11,Male,M,Mr. Brooks\nS262,774467,Owen,Adeyemi,owenadeyemi27@pacificachristian.org,2027,12,Male,S,Ms. Hale\nS263,120974,Victor,Mayer,victormayer30@pacificachristian.org,2030,9,Male,L,Mr. Brooks\nS264,609651,Alina,Taylor,alinataylor30@pacificachristian.org,2030,9,Female,M,Ms. Tran\nS265,776968,Nolan,Vasquez,nolanvasquez30@pacificachristian.org,2030,9,Male,L,Ms. Tran\nS266,965101,Mateo,Hopkins,mateohopkins27@pacificachristian.org,2027,12,Male,XXL,Ms. Hale\nS267,456655,Abigail,Paulsen,abigailpaulsen30@pacificachristian.org,2030,9,Female,M,Mr. Brooks\nS268,211265,Ahmed,Medina,ahmedmedina29@pacificachristian.org,2029,10,Male,L,Mr. Brooks\nS269,170828,Ravi,Novak,ravinovak28@pacificachristian.org,2028,11,Male,M,Mr. Brooks\nS270,899929,Khalil,Malik,khalilmalik28@pacificachristian.org,2028,11,Male,XL,Mr. Brooks\nS271,644073,Darius,Jensen,dariusjensen28@pacificachristian.org,2028,11,Male,XL,Mr. Brooks\nS272,671320,Hugo,Davis,hugodavis27@pacificachristian.org,2027,12,Male,S,Ms. Hale\nS273,780533,Ivan,Mason,ivanmason28@pacificachristian.org,2028,11,Male,M,Mr. Brooks\nS274,634078,Cole,Romero,coleromero27@pacificachristian.org,2027,12,Male,L,Ms. Tran\nS275,731064,Lena,Garcia,lenagarcia28@pacificachristian.org,2028,11,Female,S,Ms. Hale\nS276,925884,Aaron,Murray,aaronmurray30@pacificachristian.org,2030,9,Male,M,Mr. Brooks\nS277,967390,Ella,Hoffman,ellahoffman28@pacificachristian.org,2028,11,Female,XS,Ms. Hale\nS278,912270,Eliana,Hughes,elianahughes30@pacificachristian.org,2030,9,Female,M,Ms. Hale\nS279,745692,Wyatt,Zhang,wyattzhang27@pacificachristian.org,2027,12,Male,XS,Ms. Tran\nS280,541085,Joshua,Holland,joshuaholland27@pacificachristian.org,2027,12,Male,M,Ms. Hale\nS281,705198,Hailey,Gibson,haileygibson29@pacificachristian.org,2029,10,Female,M,Ms. Hale\nS282,664477,Connor,Vu,connorvu30@pacificachristian.org,2030,9,Male,L,Ms. Tran\nS283,475235,Imani,Mayer,imanimayer27@pacificachristian.org,2027,12,Female,M,Mr. Brooks\nS284,284803,Stella,Wheeler,stellawheeler30@pacificachristian.org,2030,9,Female,L,Ms. Tran\nS285,400922,Hailey,Hansen,haileyhansen27@pacificachristian.org,2027,12,Female,XS,Ms. Hale\nS286,284494,Isla,Miller,islamiller29@pacificachristian.org,2029,10,Female,L,Mr. Brooks\nS287,201147,Aisha,Quintero,aishaquintero27@pacificachristian.org,2027,12,Female,XS,Ms. Tran\nS288,255700,Violet,Jacobs,violetjacobs28@pacificachristian.org,2028,11,Female,M,Mr. Brooks\nS289,766112,Anthony,Tucker,anthonytucker27@pacificachristian.org,2027,12,Male,XL,Ms. Tran\nS290,445362,Leo,Roberts,leoroberts30@pacificachristian.org,2030,9,Male,M,Ms. Tran\nS291,480218,Ana,Foster,anafoster28@pacificachristian.org,2028,11,Female,S,Ms. Hale\nS292,829191,Natalia,Parker,nataliaparker29@pacificachristian.org,2029,10,Female,S,Mr. Brooks\nS293,415773,Gianna,Boateng,giannaboateng30@pacificachristian.org,2030,9,Female,L,Ms. Hale\nS294,282131,Ava,Jain,avajain28@pacificachristian.org,2028,11,Female,S,Mr. Brooks\nS295,820680,Noah,Adeyemi,noahadeyemi30@pacificachristian.org,2030,9,Male,L,Ms. Hale\nS296,270776,Mohamed,Keller,mohamedkeller27@pacificachristian.org,2027,12,Male,XL,Mr. Brooks\nS297,867146,Marisol,Perez,marisolperez29@pacificachristian.org,2029,10,Female,L,Mr. Brooks\nS298,869073,Nina,Martin,ninamartin27@pacificachristian.org,2027,12,Female,S,Mr. Brooks\nS299,230623,Chloe,Li,chloeli29@pacificachristian.org,2029,10,Female,S,Mr. Brooks\nS300,460361,Leo,Hayes,leohayes27@pacificachristian.org,2027,12,Male,L,Ms. Hale\nS301,548428,Amelia,Dominguez,ameliadominguez30@pacificachristian.org,2030,9,Female,M,Ms. Hale\nS302,615525,Wei,Rogers,weirogers29@pacificachristian.org,2029,10,Male,S,Ms. Tran\nS303,634774,Mariam,Lee,mariamlee29@pacificachristian.org,2029,10,Female,S,Mr. Brooks\nS304,323315,John,Okafor,johnokafor30@pacificachristian.org,2030,9,Male,M,Mr. Brooks\nS305,738683,Penelope,Navarro,penelopenavarro27@pacificachristian.org,2027,12,Female,XS,Mr. Brooks\nS306,569108,Miguel,Hoang,miguelhoang28@pacificachristian.org,2028,11,Male,XL,Ms. Hale\nS307,444225,Gavin,Farah,gavinfarah29@pacificachristian.org,2029,10,Male,S,Ms. Hale\nS308,793946,Juliana,Nichols,juliananichols27@pacificachristian.org,2027,12,Female,L,Mr. Brooks\nS309,292190,Thea,Bergman,theabergman30@pacificachristian.org,2030,9,Female,M,Ms. Hale\nS310,233370,Sadie,Wang,sadiewang28@pacificachristian.org,2028,11,Female,S,Ms. Tran\nS311,247619,Julia,Farah,juliafarah27@pacificachristian.org,2027,12,Female,XS,Ms. Hale\nS312,588430,Alejandro,Mayer,alejandromayer27@pacificachristian.org,2027,12,Male,L,Mr. Brooks\nS313,157970,Jason,Fujita,jasonfujita29@pacificachristian.org,2029,10,Male,M,Ms. Hale\nS314,819081,Gabriela,Rao,gabrielarao29@pacificachristian.org,2029,10,Female,M,Ms. Tran\nS315,180686,Mei,West,meiwest28@pacificachristian.org,2028,11,Female,S,Ms. Tran\nS316,751309,Leon,Burns,leonburns28@pacificachristian.org,2028,11,Male,XL,Ms. Hale\nS317,424291,Clara,Medina,claramedina29@pacificachristian.org,2029,10,Female,M,Mr. Brooks\nS318,924103,Julia,Lopez,julialopez28@pacificachristian.org,2028,11,Female,M,Mr. Brooks\nS319,503296,Benjamin,Evans,benjaminevans30@pacificachristian.org,2030,9,Male,XL,Ms. Hale\nS320,205840,Kai,Robinson,kairobinson27@pacificachristian.org,2027,12,Male,M,Ms. Tran\nS321,854328,Christian,Abdi,christianabdi29@pacificachristian.org,2029,10,Male,XL,Ms. Hale\nS322,245931,Simon,Fischer,simonfischer30@pacificachristian.org,2030,9,Male,M,Ms. Hale\nS323,296675,Max,Barnes,maxbarnes29@pacificachristian.org,2029,10,Male,M,Ms. Hale\nS324,959863,Leila,Wu,leilawu27@pacificachristian.org,2027,12,Female,S,Ms. Tran\nS325,456838,Serena,Wood,serenawood28@pacificachristian.org,2028,11,Female,S,Ms. Tran\nS326,692769,Angelo,Jimenez,angelojimenez28@pacificachristian.org,2028,11,Male,L,Mr. Brooks\nS327,657576,Renee,Duncan,reneeduncan30@pacificachristian.org,2030,9,Female,L,Ms. Hale\nS328,905210,David,Weaver,davidweaver29@pacificachristian.org,2029,10,Male,L,Ms. Tran\nS329,858936,Elise,Joshi,elisejoshi27@pacificachristian.org,2027,12,Female,S,Mr. Brooks\nS330,333432,Omar,Diaz,omardiaz30@pacificachristian.org,2030,9,Male,XL,Ms. Hale\nS331,807403,Mariam,Lucas,mariamlucas29@pacificachristian.org,2029,10,Female,M,Mr. Brooks\nS332,329974,Eva,Zhou,evazhou30@pacificachristian.org,2030,9,Female,M,Ms. Tran\nS333,638846,Lydia,Hernandez,lydiahernandez27@pacificachristian.org,2027,12,Female,L,Ms. Hale\nS334,658986,Alana,Noor,alananoor30@pacificachristian.org,2030,9,Female,M,Mr. Brooks\nS335,387690,Julia,Patterson,juliapatterson29@pacificachristian.org,2029,10,Female,S,Mr. Brooks\nS336,844829,Benjamin,Quinn,benjaminquinn27@pacificachristian.org,2027,12,Male,XL,Ms. Tran\nS337,964754,Aisha,Lynch,aishalynch28@pacificachristian.org,2028,11,Female,XS,Mr. Brooks\nS338,643752,Zoe,Vu,zoevu27@pacificachristian.org,2027,12,Female,M,Ms. Tran\nS339,151845,Ana,Dixon,anadixon27@pacificachristian.org,2027,12,Female,M,Ms. Hale\nS340,475336,Emilia,Williams,emiliawilliams30@pacificachristian.org,2030,9,Female,M,Ms. Tran\nS341,394805,Anna,Maldonado,annamaldonado30@pacificachristian.org,2030,9,Female,M,Mr. Brooks\nS342,173630,Amara,Marin,amaramarin27@pacificachristian.org,2027,12,Female,L,Mr. Brooks\nS343,501617,Penelope,Medina,penelopemedina30@pacificachristian.org,2030,9,Female,S,Mr. Brooks\nS344,321834,Dominic,Nakamura,dominicnakamura29@pacificachristian.org,2029,10,Male,L,Mr. Brooks\nS345,640624,Francisco,Hayes,franciscohayes29@pacificachristian.org,2029,10,Male,M,Ms. Hale\nS346,159147,Clara,Contreras,claracontreras28@pacificachristian.org,2028,11,Female,L,Ms. Hale\nS347,148851,Joseph,Molina,josephmolina27@pacificachristian.org,2027,12,Male,XL,Mr. Brooks\nS348,541432,Rahul,Romero,rahulromero29@pacificachristian.org,2029,10,Male,XXL,Ms. Tran\nS349,809040,Michael,Mendez,michaelmendez29@pacificachristian.org,2029,10,Male,M,Mr. Brooks\nS350,490394,Adaeze,Parker,adaezeparker30@pacificachristian.org,2030,9,Female,L,Mr. Brooks\nS351,938481,Stella,Rogers,stellarogers29@pacificachristian.org,2029,10,Female,XS,Ms. Tran\nS352,595907,Ethan,Campbell,ethancampbell27@pacificachristian.org,2027,12,Male,L,Ms. Hale\nS353,279775,Ava,Chang,avachang30@pacificachristian.org,2030,9,Female,M,Ms. Hale\nS354,494550,Lucas,Porter,lucasporter28@pacificachristian.org,2028,11,Male,XL,Mr. Brooks\nS355,882985,Elise,Perry,eliseperry30@pacificachristian.org,2030,9,Female,S,Mr. Brooks\nS356,205016,Jacob,Saito,jacobsaito30@pacificachristian.org,2030,9,Male,M,Ms. Tran\nS357,537909,Nolan,Jackson,nolanjackson29@pacificachristian.org,2029,10,Male,M,Mr. Brooks\nS358,762114,Madeline,Bergman,madelinebergman27@pacificachristian.org,2027,12,Female,M,Ms. Hale\nS359,480108,Thomas,Peterson,thomaspeterson27@pacificachristian.org,2027,12,Male,M,Mr. Brooks\nS360,241693,Fiona,Santos,fionasantos28@pacificachristian.org,2028,11,Female,XS,Ms. Tran\nS361,148355,Dylan,Mehta,dylanmehta30@pacificachristian.org,2030,9,Male,L,Mr. Brooks\nS362,872769,Leon,Arnold,leonarnold28@pacificachristian.org,2028,11,Male,M,Ms. Hale\nS363,669903,Elena,Jackson,elenajackson27@pacificachristian.org,2027,12,Female,S,Mr. Brooks\nS364,114594,Mila,Blake,milablake28@pacificachristian.org,2028,11,Female,S,Ms. Hale\nS365,868968,Isla,Wilson,islawilson27@pacificachristian.org,2027,12,Female,XL,Ms. Tran\nS366,852306,Adam,Costa,adamcosta27@pacificachristian.org,2027,12,Male,XL,Ms. Hale\nS367,537309,Matthew,Yang,matthewyang30@pacificachristian.org,2030,9,Male,XL,Ms. Tran\nS368,629607,Cole,Morris,colemorris30@pacificachristian.org,2030,9,Male,M,Mr. Brooks\nS369,860344,Arjun,Kowalski,arjunkowalski30@pacificachristian.org,2030,9,Male,L,Mr. Brooks\nS370,158449,Camila,Ramirez,camilaramirez28@pacificachristian.org,2028,11,Female,M,Ms. Tran\nS371,219620,Michael,Wallace,michaelwallace27@pacificachristian.org,2027,12,Male,L,Ms. Tran\nS372,534943,Victoria,Weber,victoriaweber28@pacificachristian.org,2028,11,Female,XS,Ms. Tran\nS373,750199,Ethan,Romero,ethanromero27@pacificachristian.org,2027,12,Male,XL,Ms. Tran\nS374,123901,Elise,Malik,elisemalik29@pacificachristian.org,2029,10,Female,L,Mr. Brooks\nS375,576532,Olivia,Pacheco,oliviapacheco30@pacificachristian.org,2030,9,Female,XS,Mr. Brooks\nS376,915553,Felix,Quintero,felixquintero27@pacificachristian.org,2027,12,Male,M,Ms. Tran\nS377,233949,Leon,Cardenas,leoncardenas28@pacificachristian.org,2028,11,Male,L,Ms. Hale\nS378,552103,Alex,Reyes,alexreyes28@pacificachristian.org,2028,11,Male,L,Ms. Tran\nS379,644450,Jia,Becker,jiabecker29@pacificachristian.org,2029,10,Female,M,Ms. Hale\nS380,206839,Eliana,Martin,elianamartin30@pacificachristian.org,2030,9,Female,M,Mr. Brooks\nS381,929716,Amara,Schneider,amaraschneider28@pacificachristian.org,2028,11,Female,S,Ms. Tran\nS382,535636,Alexa,Jenkins,alexajenkins28@pacificachristian.org,2028,11,Female,L,Mr. Brooks\nS383,969776,Isabel,Wheeler,isabelwheeler30@pacificachristian.org,2030,9,Female,M,Ms. Tran\nS384,292856,Dominic,Wheeler,dominicwheeler27@pacificachristian.org,2027,12,Male,XL,Ms. Tran\nS385,870111,Vanessa,Johansson,vanessajohansson27@pacificachristian.org,2027,12,Female,S,Mr. Brooks\nS386,991575,Jia,Clark,jiaclark29@pacificachristian.org,2029,10,Female,M,Ms. Hale\nS387,519747,Chloe,Barnes,chloebarnes29@pacificachristian.org,2029,10,Female,L,Ms. Hale\nS388,648022,Gabriela,Mitchell,gabrielamitchell30@pacificachristian.org,2030,9,Female,M,Mr. Brooks\nS389,679873,Francisco,Schultz,franciscoschultz28@pacificachristian.org,2028,11,Male,L,Ms. Tran\nS390,534272,Naomi,Vasquez,naomivasquez29@pacificachristian.org,2029,10,Female,S,Ms. Tran\nS391,240005,Pablo,Duncan,pabloduncan27@pacificachristian.org,2027,12,Male,M,Ms. Hale\nS392,448424,Juliana,Lin,julianalin27@pacificachristian.org,2027,12,Female,L,Mr. Brooks\nS393,989697,Eva,Kaplan,evakaplan28@pacificachristian.org,2028,11,Female,S,Mr. Brooks\nS394,762456,Jasmine,Pacheco,jasminepacheco27@pacificachristian.org,2027,12,Female,L,Mr. Brooks\nS395,124314,Sara,Vega,saravega30@pacificachristian.org,2030,9,Female,M,Ms. Tran\nS396,448157,Gemma,Becker,gemmabecker29@pacificachristian.org,2029,10,Female,XS,Ms. Hale\nS397,781903,Thomas,Stone,thomasstone29@pacificachristian.org,2029,10,Male,L,Ms. Tran\nS398,586328,Esther,Martin,esthermartin27@pacificachristian.org,2027,12,Female,S,Mr. Brooks\nS399,371639,Aiden,Kelly,aidenkelly30@pacificachristian.org,2030,9,Male,M,Mr. Brooks\nS400,823207,Jacob,Ward,jacobward27@pacificachristian.org,2027,12,Male,M,Ms. Tran\n","settings/counselors.json":"{\n  \"_about\": \"Counselors by the first letter of the last name. The entry tool fills these in for new students and can reassign everyone.\",\n  \"by_last_name\": [\n    { \"from\": \"A\", \"to\": \"H\", \"counselor\": \"Ms. Hale\" },\n    { \"from\": \"I\", \"to\": \"P\", \"counselor\": \"Mr. Brooks\" },\n    { \"from\": \"Q\", \"to\": \"Z\", \"counselor\": \"Ms. Tran\" }\n  ]\n}\n","settings/groups.json":"{\n  \"_about\": \"How each CSV becomes groups. group = the column that names the group, detail = an optional column shown next to it (like a role), words = what people type to mean this kind of group. A CSV not listed here uses its first column after student_id. defaults = what a blank box in Index means. repeats = the same student can be listed more than once.\",\n  \"_students_about\": \"Columns of students.csv the search box understands, besides names, grade and counselor. label = how it's shown, words = what people type next to a value ('size M', 'class of 2028'). Values of one or two letters (like shirt size M) only count next to one of these words.\",\n  \"students\": {\n    \"fields\": {\n      \"gender\": { \"label\": \"Gender\", \"words\": [\"gender\"] },\n      \"tshirt_size\": { \"label\": \"Shirt Size\", \"words\": [\"shirt\", \"shirts\", \"tshirt\", \"tshirts\", \"t shirt\", \"t shirts\", \"size\", \"sizes\", \"shirt size\", \"t shirt size\"] },\n      \"graduation_year\": { \"label\": \"Class of\", \"words\": [\"class of\", \"class\", \"graduating\", \"graduating in\", \"graduates\", \"grad\", \"grads\", \"graduation year\", \"expected graduation\"] }\n    }\n  },\n  \"clubs\": {\n    \"label\": \"Club\",\n    \"group\": \"club\",\n    \"detail\": \"role\",\n    \"defaults\": { \"role\": \"Member\" },\n    \"words\": [\"club\", \"clubs\"]\n  },\n  \"athletics\": {\n    \"label\": \"Team\",\n    \"group\": \"sport\",\n    \"detail\": \"level\",\n    \"words\": [\"team\", \"teams\", \"sport\", \"sports\", \"athlete\", \"athletes\", \"athletics\"]\n  },\n  \"events\": {\n    \"label\": \"Event\",\n    \"group\": \"event\",\n    \"detail\": \"role\",\n    \"words\": [\"event\", \"events\"]\n  },\n  \"service_hours\": {\n    \"label\": \"Service\",\n    \"group\": \"organization\",\n    \"detail\": null,\n    \"repeats\": true,\n    \"words\": [\"service\", \"service hours\", \"volunteer\", \"volunteers\", \"volunteering\"]\n  }\n}\n","settings/synonyms.json":"{\n  \"_about\": \"Words the search box understands besides what's in the data. Edit freely; plurals and small typos are handled automatically.\",\n  \"grades\": {\n    \"freshman\": \"9\", \"freshie\": \"9\", \"frosh\": \"9\", \"fresh\": \"9\", \"ninth\": \"9\",\n    \"sophomore\": \"10\", \"soph\": \"10\", \"sophomoric\": \"10\", \"tenth\": \"10\",\n    \"junior\": \"11\", \"jr\": \"11\", \"jnr\": \"11\", \"eleventh\": \"11\",\n    \"senior\": \"12\", \"sr\": \"12\", \"snr\": \"12\", \"twelfth\": \"12\"\n  },\n  \"details\": {\n    \"leader\": [\"President\", \"Vice President\", \"Captain\", \"Founder\", \"Leader\"],\n    \"lead\": [\"President\", \"Vice President\", \"Captain\", \"Founder\", \"Leader\"],\n    \"leading\": [\"President\", \"Vice President\", \"Captain\", \"Founder\", \"Leader\"],\n    \"officer\": [\"President\", \"Vice President\", \"Captain\", \"Founder\", \"Leader\"],\n    \"pres\": [\"President\"],\n    \"prez\": [\"President\"],\n    \"vp\": [\"Vice President\"],\n    \"capt\": [\"Captain\"]\n  },\n  \"_field_values\": \"Other words for values in the students.csv columns listed in groups.json, so 'girls' finds Female and 'medium' finds M.\",\n  \"field_values\": {\n    \"gender\": {\n      \"girl\": \"Female\", \"female\": \"Female\", \"woman\": \"Female\", \"women\": \"Female\", \"lady\": \"Female\", \"ladies\": \"Female\",\n      \"boy\": \"Male\", \"male\": \"Male\", \"man\": \"Male\", \"men\": \"Male\", \"guy\": \"Male\"\n    },\n    \"tshirt_size\": {\n      \"extra small\": \"XS\", \"small\": \"S\", \"medium\": \"M\", \"med\": \"M\", \"large\": \"L\",\n      \"extra large\": \"XL\", \"xlarge\": \"XL\", \"xxl\": \"XXL\", \"2xl\": \"XXL\", \"extra extra large\": \"XXL\"\n    }\n  },\n  \"not\": [\n    \"not\", \"no\", \"non\", \"without\", \"except\", \"excluding\", \"exclude\", \"isnt\", \"arent\", \"dont\",\n    \"doesnt\", \"never\", \"none\", \"nor\", \"neither\", \"nobody\", \"outside\"\n  ],\n  \"_not_ends\": \"A 'not' covers the words after it until one of these, so in 'not in robotics but juniors' only robotics is excluded.\",\n  \"not_ends\": [\"but\", \"who\", \"that\", \"are\", \"is\", \"has\", \"have\", \"do\", \"does\", \"also\", \"yet\"],\n  \"ignore\": [\n    \"a\", \"all\", \"an\", \"and\", \"any\", \"are\", \"as\", \"at\", \"be\", \"do\", \"does\", \"for\", \"from\", \"g\", \"gr\",\n    \"has\", \"have\", \"in\", \"into\", \"is\", \"kids\", \"list\", \"me\", \"of\", \"on\", \"or\", \"part\", \"people\", \"show\",\n    \"student\", \"students\", \"that\", \"the\", \"their\", \"them\", \"to\", \"what\", \"which\", \"who\", \"with\",\n    \"counselor\", \"counselors\", \"counsellor\", \"counsellors\", \"advisor\", \"advisors\", \"advisory\", \"advisee\", \"find\", \"get\", \"give\", \"ppl\", \"u\", \"pls\", \"plz\", \"please\",\n    \"everyone\", \"everybody\", \"anyone\", \"doing\", \"does\", \"do\", \"go\", \"goes\", \"play\", \"plays\", \"playing\",\n    \"member\", \"members\", \"involved\", \"join\", \"joined\", \"belong\", \"belongs\", \"currently\", \"also\", \"but\", \"yet\"\n  ]\n}\n"};
  const KEY = 'index-demo-1794004718731';

  let files = null;
  try { files = JSON.parse(localStorage.getItem(KEY)); } catch {}
  files = files ?? { ...seed };
  const remember = () => { try { localStorage.setItem(KEY, JSON.stringify(files)); } catch {} };

  const fs = {
    existsSync: file => file in files,
    readFileSync: file => {
      if (!(file in files)) throw new Error(`${file} is missing`);
      return files[file];
    },
    writeFileSync: (file, text) => { files[file] = String(text); remember(); },
    readdirSync: dir => Object.keys(files).filter(f => f.startsWith(`${dir}/`)).map(f => f.slice(dir.length + 1)),
    // The demo keeps no backups or log.
    mkdirSync() {}, copyFileSync() {}, appendFileSync() {},
  };
  const path = {
    join: (...parts) => parts.join('/'),
    basename: (file, ext = '') => {
      const name = file.split('/').pop();
      return ext && name.endsWith(ext) ? name.slice(0, -ext.length) : name;
    },
  };

  // Each of Index's files, as Node would load it.
  const sources = {"csv": function (module, exports, require) {
// Reads the CSV files in data/. Every CSV needs a student_id column;
// students.csv holds one row per student.

const fs = require('node:fs');
const path = require('node:path');

// Parses CSV text into objects keyed by the header row. Handles quoted fields,
// commas and newlines inside quotes, and "" as an escaped quote.
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some(v => v !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some(v => v !== '')) rows.push(row);

  const [header = [], ...body] = rows;
  const columns = header.map(h => h.trim());
  return {
    columns,
    rows: body.map(r => Object.fromEntries(columns.map((col, j) => [col, (r[j] ?? '').trim()]))),
  };
}

// The year a student in `grade` graduates. The school year turns over in July,
// so in November 2026 a senior is the class of 2027.
function graduationYear(grade, today = new Date()) {
  const lastYear = today.getMonth() >= 6 ? today.getFullYear() + 1 : today.getFullYear();
  return String(lastYear + (12 - Number(grade)));
}

// Every CSV in the folder, keyed by file name without ".csv". Incoming freshmen have a file of
// their own but are students like any other, so they join `students` here, as grade 8 (the
// grade before freshman), and aren't a group file.
function loadFiles(dir) {
  const files = {};
  for (const name of fs.readdirSync(dir)) {
    if (!name.toLowerCase().endsWith('.csv')) continue;
    const text = fs.readFileSync(path.join(dir, name), 'utf8').replace(/^﻿/, '');
    files[name.slice(0, -4)] = parseCsv(text);
  }
  const incoming = files.incoming_freshmen;
  if (incoming && files.students) {
    delete files.incoming_freshmen;
    const rows = incoming.rows.map(r => ({ ...r, grade: '8', graduation_year: graduationYear('8') }));
    files.students = { columns: files.students.columns, rows: [...rows, ...files.students.rows] };
  }
  // Emails always show in lower case, however they were typed into a CSV.
  for (const row of files.students?.rows ?? []) if (row.email) row.email = row.email.toLowerCase();
  return files;
}

module.exports = { parseCsv, loadFiles, graduationYear };

},
"choices": function (module, exports, require) {
// Rules the Add a Student form and the server share. First, understanding what's typed in
// the Grade, Gender and Shirt size boxes: "m" is Male,
// "extra large" is XL, "junior" is 11. The page uses it for suggestions and the server
// uses it to check what was sent, so both understand the same words.
//
// A box's choices look like [{ value: 'XL', words: ['extra large', 'x large', ...] }].
(function (exports) {
  // Lowercase with punctuation as spaces: "X-Large" -> "x large".
  const tidy = text => String(text ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const squash = text => tidy(text).replace(/ /g, '');

  // Single-letter edits between two words, for catching typos like "meduim".
  function editDistance(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
    return d[a.length][b.length];
  }

  const allWords = choice => [choice.value, ...choice.words];

  // The value typed text means: an exact value or word (spaces and dashes don't matter),
  // else a small typo of a longer word. '' if it means nothing.
  exports.understand = function (text, choices) {
    const typed = squash(text);
    if (!typed) return '';
    const exact = choices.find(c => allWords(c).some(w => squash(w) === typed));
    if (exact) return exact.value;
    if (typed.length < 4) return '';
    const close = choices.filter(c => allWords(c).some(w => squash(w).length >= 4 && editDistance(typed, squash(w)) <= 1));
    return close.length === 1 ? close[0].value : '';
  };

  // Suggestions for partly typed text, best first: what it already means, then choices with
  // a value or word starting with it. Nothing typed shows every choice.
  exports.suggest = function (text, choices) {
    const typed = squash(text);
    if (!typed) return choices;
    const meant = exports.understand(text, choices);
    const starts = choices.filter(c => c.value !== meant && allWords(c).some(w => squash(w).startsWith(typed)));
    return [...choices.filter(c => c.value === meant), ...starts];
  };

  // A person's name with proper capitals: "maya o'brien-reed" -> "Maya O'Brien-Reed",
  // "MCDONALD" -> "McDonald", "iii" -> "III". A name already written with a capital inside
  // it ("DeShawn") is left as typed.
  exports.properName = function (text) {
    return String(text ?? '').split(' ').map(word => {
      if (/^\p{Lu}.*\p{Ll}.*\p{Lu}/u.test(word)) return word;
      const lower = word.toLowerCase();
      if (/^(ii|iii|iv)[.,]?$/.test(lower)) return lower.toUpperCase();
      return lower.replace(/(^|[-'’])(\p{L})/gu, (all, before, letter) => before + letter.toUpperCase())
        .replace(/^Mc(\p{Ll})/u, (all, letter) => `Mc${letter.toUpperCase()}`);
    }).join(' ');
  };

  // A title with proper capitals: "club of the arts" -> "Club of the Arts". Words with a capital
  // in them are left alone, so "FBLA" and "Ms." stay as typed.
  exports.titleText = function (text) {
    return String(text ?? '').split(' ').map((word, i) => {
      if (word !== word.toLowerCase()) return word;
      if (i > 0 && /^(of|and|or|the|a|an|in|on|at|to|for|by)$/.test(word)) return word;
      return word.replace(/(^|-)(\p{L})/gu, (all, before, letter) => before + letter.toUpperCase());
    }).join(' ');
  };

  // A sentence: just its first letter capitalized.
  exports.sentenceText = text => String(text ?? '').charAt(0).toUpperCase() + String(text ?? '').slice(1);

  // "Ortega, Maya" as { last_name, first_name }. The last comma splits them, so
  // "Quinn, Jr., Rosa" keeps the Jr. with the last name. Blank parts if there's no comma.
  exports.splitName = function (text) {
    const name = String(text ?? '').trim().replace(/\s+/g, ' ');
    const at = name.lastIndexOf(',');
    if (at < 0) return { last_name: '', first_name: '' };
    return { last_name: name.slice(0, at).trim(), first_name: name.slice(at + 1).trim() };
  };

  // The school email: full name, then the last two digits of the graduation year.
  // For now; the real format comes later. "Maya Ortega", 2030 -> mayaortega30@pacificachristian.org
  exports.schoolEmail = function ({ first_name, last_name, graduation_year }) {
    const name = `${first_name}${last_name}`.normalize('NFD').toLowerCase().replace(/[^a-z]/g, '');
    return `${name}${String(graduation_year).slice(-2)}@pacificachristian.org`;
  };

  // The counselor for a last name from rules like { from: 'A', to: 'H', counselor: 'Ms. Hale' }.
  exports.counselorFor = function (lastName, rules) {
    const letter = String(lastName ?? '').trim().charAt(0).toUpperCase();
    return rules.find(r => letter >= r.from && letter <= r.to)?.counselor ?? '';
  };
})(typeof module === 'object' && module.exports ? module.exports : ((window.SL = window.SL || {}).choices = {}));

},
"students": function (module, exports, require) {
// Adding and changing students in data/students.csv and who is in each group (clubs.csv,
// athletics.csv and any other group CSV), for the entry tool.
// Every change backs up the old file to data/backups/ first and is noted in
// data/changes.log. createStore(dataDir, settingsDir) lets the tests use copies.

const fs = require('node:fs');
const path = require('node:path');
const { parseCsv, loadFiles, graduationYear } = require('../shared/code/csv');
const { understand, splitName, schoolEmail, counselorFor, properName, titleText, sentenceText } = require('./choices');

const GRADES = ['8', '9', '10', '11', '12'];   // 8 is the incoming class, in incoming_freshmen.csv
const GENDERS = ['Male', 'Female'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const GRADE_NAMES = { 8: 'Incoming Freshman', 9: 'Freshman', 10: 'Sophomore', 11: 'Junior', 12: 'Senior' };
// The students.csv columns the add form has its own boxes for; any other column gets a plain box.
const FORM_COLUMNS = ['student_id', 'school_id', 'first_name', 'last_name', 'email', 'grade',
  'graduation_year', 'gender', 'tshirt_size', 'counselor'];

// Words the Grade, Gender and Shirt size boxes understand, on top of those in
// settings/synonyms.json (grades and field_values).
const BUILT_IN_WORDS = {
  grade: { 8: ['8th', 'grade 8', 'incoming', 'incoming freshman', 'incoming freshmen'], 9: ['9th', 'grade 9', '9th grade'], 10: ['10th', 'grade 10', '10th grade'],
    11: ['11th', 'grade 11', '11th grade'], 12: ['12th', 'grade 12', '12th grade'] },
  gender: { Male: ['m', 'boy', 'male'], Female: ['f', 'girl', 'female'] },
  tshirt_size: {
    XS: ['extra small', 'x small', 'xsmall'], S: ['small', 'sm', 'sml'], M: ['medium', 'med', 'md'],
    L: ['large', 'lg', 'lrg'], XL: ['extra large', 'x large', 'xlarge', '1xl'],
    XXL: ['2xl', 'xx large', 'xxlarge', '2x', 'extra extra large', 'double extra large'],
  },
};

// A CSV field, quoted only when it needs to be.
function csvField(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv({ columns, rows }) {
  return [columns, ...rows.map(r => columns.map(c => r[c] ?? ''))]
    .map(fields => fields.map(csvField).join(','))
    .join('\n') + '\n';
}

// Checks counselor rules: single letters A to Z, "from" not after "to", a counselor
// named, and no two ranges covering the same letter.
function checkRules(rules) {
  const errors = [];
  if (!Array.isArray(rules)) return ['Rules must be a list.'];
  const clean = rules.map(r => ({
    from: String(r.from ?? '').trim().toUpperCase(),
    to: String(r.to ?? '').trim().toUpperCase(),
    counselor: titleText(String(r.counselor ?? '').trim()),
  }));
  clean.forEach((r, i) => {
    const row = `Rule ${i + 1}`;
    if (!/^[A-Z]$/.test(r.from) || !/^[A-Z]$/.test(r.to)) errors.push(`${row}: use single letters A to Z.`);
    else if (r.from > r.to) errors.push(`${row}: "${r.from}" comes after "${r.to}".`);
    if (!r.counselor) errors.push(`${row}: name the counselor.`);
  });
  if (!errors.length) {
    for (let i = 0; i < clean.length; i++) {
      for (let j = i + 1; j < clean.length; j++) {
        if (clean[i].from <= clean[j].to && clean[j].from <= clean[i].to) {
          errors.push(`Rules ${i + 1} and ${j + 1} both cover some of the same letters.`);
        }
      }
    }
  }
  return errors.length ? { errors } : { rules: clean.sort((a, b) => a.from.localeCompare(b.from)) };
}

function createStore(dataDir, settingsDir) {
  const studentsFile = path.join(dataDir, 'students.csv');
  const incomingFile = path.join(dataDir, 'incoming_freshmen.csv');
  const rulesFile = path.join(settingsDir, 'counselors.json');

  // Everyone, incoming freshmen included. To change a file, use studentFile or incomingTable.
  function readStudents() {
    return loadFiles(dataDir).students;
  }

  function studentFile() {
    return parseCsv(fs.readFileSync(studentsFile, 'utf8').replace(/^﻿/, ''));
  }

  function incomingTable() {
    if (!fs.existsSync(incomingFile)) {
      return { columns: ['student_id', 'school_id', 'first_name', 'last_name', 'email', 'gender', 'tshirt_size', 'counselor'], rows: [] };
    }
    return parseCsv(fs.readFileSync(incomingFile, 'utf8').replace(/^﻿/, ''));
  }

  function readRules() {
    if (!fs.existsSync(rulesFile)) return [];
    return JSON.parse(fs.readFileSync(rulesFile, 'utf8')).by_last_name ?? [];
  }

  // What each typed box understands: { grade: [{ value: '11', label: 'Junior', words: ['junior', ...] }], ... }.
  // The label is what the box shows (grades by name); the value is what's saved.
  function choices(today = new Date()) {
    const file = path.join(settingsDir, 'synonyms.json');
    const synonyms = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
    const fromSettings = { grade: synonyms.grades ?? {}, ...synonyms.field_values };
    const build = (field, values) => values.map(value => ({
      value,
      label: field === 'grade' ? GRADE_NAMES[value] : value,
      words: [...new Set([
        ...Object.entries(fromSettings[field] ?? {}).filter(([, v]) => v === value).map(([word]) => word),
        ...(BUILT_IN_WORDS[field][value] ?? []),
      ])].filter(w => w.toLowerCase() !== value.toLowerCase()),
    }));
    return {
      grade: build('grade', GRADES),
      gender: build('gender', GENDERS),
      tshirt_size: build('tshirt_size', SIZES),
      // The incoming class first, then the four in school now, seniors last.
      graduation_year: GRADES.map(g => graduationYear(g, today)).map(year => ({ value: year, label: year, words: [] })),
    };
  }

  // Copies the current file to data/backups/, writes the new one, and logs what changed.
  function save(table, note, file = studentsFile) {
    const backups = path.join(dataDir, 'backups');
    fs.mkdirSync(backups, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    if (fs.existsSync(file)) fs.copyFileSync(file, path.join(backups, `${path.basename(file, '.csv')}-${stamp}.csv`));
    fs.writeFileSync(file, toCsv(table));
    fs.appendFileSync(path.join(dataDir, 'changes.log'), `${new Date().toISOString()}  ${note}\n`);
  }

  function nextStudentId(rows) {
    const numbers = rows.map(r => Number(String(r.student_id).replace(/\D/g, ''))).filter(Number.isFinite);
    return `S${String(Math.max(0, ...numbers) + 1).padStart(3, '0')}`;
  }

  // Checks and tidies a new student. The student ID is our own running number (S001,
  // S002…) and is always given here; the school ID is the school's 6-digit number.
  // The name comes as "Last Name, First Name". A blank email is made from the name and
  // year, and a blank counselor from the last name. Returns { student } or { errors }.
  function prepare(input, rows, rules, today) {
    const value = key => String(input[key] ?? '').trim();
    const errors = [];
    const known = choices(today);
    // What's typed is saved with proper capitals, and emails in lower case.
    const typedName = splitName(input.student_name);
    const first_name = properName(typedName.first_name), last_name = properName(typedName.last_name);
    const typedCounselor = value('counselor');
    const counselors = [...rules.map(r => r.counselor), ...rows.map(r => r.counselor)].filter(Boolean);
    // "junior", "m" or "extra large" become 11, Male and XL.
    const meant = field => understand(value(field), known[field]);
    const student = {
      student_id: nextStudentId(rows),
      school_id: value('school_id'),
      first_name,
      last_name,
      email: value('email').toLowerCase(),
      grade: meant('grade'),
      graduation_year: value('graduation_year'),
      gender: meant('gender'),
      tshirt_size: meant('tshirt_size'),
      // "ms. tran" is the Ms. Tran on file; a new name gets capitals of its own.
      counselor: counselors.find(c => c.toLowerCase() === typedCounselor.toLowerCase()) ?? titleText(typedCounselor),
      // Columns added to students.csv later, kept as typed.
      ...Object.fromEntries(extraColumns().map(c => [c, value(c)])),
    };

    if (!first_name || !last_name) errors.push('Type the name as Last Name, First Name.');
    if (!/^\d{6}$/.test(student.school_id)) errors.push('School ID must be 6 digits.');
    else if (rows.some(r => r.school_id === student.school_id)) errors.push(`School ID ${student.school_id} is already used.`);
    // Grade and graduation year fill each other in (class of 2030 is a freshman this year).
    const year = student.graduation_year;
    const fromYear = GRADES.find(g => graduationYear(g, today) === year) ?? '';
    if (value('grade') && !student.grade) errors.push('Grade must be Freshman, Sophomore, Junior or Senior (or 9 to 12).');
    else if (year && !/^\d{4}$/.test(year)) errors.push('Expected Graduation must be a 4-digit year.');
    else if (!student.grade && !year) errors.push('Fill in the grade or the expected graduation.');
    else if (year && !fromYear) {
      errors.push(`Class of ${year} isn't in high school this year (${graduationYear('12', today)} to ${graduationYear('8', today)}).`);
    } else if (student.grade && year && student.grade !== fromYear) {
      const plural = { 8: 'incoming freshmen', 9: 'freshmen', 10: 'sophomores', 11: 'juniors', 12: 'seniors' };
      errors.push(`Class of ${year} are ${plural[fromYear]} this year, not ${plural[student.grade]}.`);
    }
    if (!student.gender) errors.push('Gender must be Male or Female.');
    if (!student.tshirt_size) errors.push(`Shirt size must be one of ${SIZES.join(', ')}.`);
    if (student.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(student.email)) errors.push("That email doesn't look right.");
    if (errors.length) return { errors };

    if (!student.grade) student.grade = fromYear;
    if (!student.graduation_year) student.graduation_year = graduationYear(student.grade, today);
    if (!student.email) student.email = schoolEmail(student);
    if (rows.some(r => r.email === student.email)) return { errors: [`${student.email} is already used. Type a different email.`] };
    if (!student.counselor) student.counselor = counselorFor(student.last_name, rules);
    return { student };
  }

  // What adding this student would save, without saving: { student } or { errors }.
  function checkStudent(input, today = new Date()) {
    return prepare(input, readStudents().rows, readRules(), today);
  }

  function addStudent(input, today = new Date()) {
    const result = prepare(input, readStudents().rows, readRules(), today);
    if (result.errors) return result;
    const s = result.student;
    // The incoming class has its own file, where the grade and year go without saying.
    const incoming = s.grade === '8';
    const table = incoming ? incomingTable() : studentFile();
    const row = { ...s };
    if (incoming) { delete row.grade; delete row.graduation_year; }
    // Keep the file's own column order; add any column it doesn't have yet at the end.
    for (const column of Object.keys(row)) {
      if (!table.columns.includes(column)) table.columns.push(column);
    }
    table.rows.push(row);
    save(table, `Added ${s.student_id} ${s.first_name} ${s.last_name}`, incoming ? incomingFile : studentsFile);
    return result;
  }

  // Columns of students.csv the form has no box of its own for (any column added later).
  function extraColumns() {
    return studentFile().columns.filter(c => !FORM_COLUMNS.includes(c));
  }

  // Every CSV in data/ that has a student_id column, other than students.csv:
  // { clubs: { label: 'Club', table: { columns, rows } }, ... }. New CSVs are picked up as they are.
  function groupsConfig() {
    const file = path.join(settingsDir, 'groups.json');
    return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  }

  function otherFiles() {
    const config = groupsConfig();
    const files = {};
    for (const [name, table] of Object.entries(loadFiles(dataDir))) {
      if (name === 'students' || !table.columns.includes('student_id')) continue;
      files[name] = { label: config[name]?.label ?? name.replace(/_/g, ' '), table };
    }
    return files;
  }

  // Everything recorded about one student: all their students.csv columns, in the file's
  // order, and their rows in every other CSV. Returns null if there's no such student.
  function studentDetails(id) {
    const { columns, rows } = readStudents();
    const row = rows.find(r => r.student_id === id);
    if (!row) return null;
    const records = Object.entries(otherFiles()).map(([file, { label, table }]) => ({
      file, label,
      columns: table.columns.filter(c => c !== 'student_id'),
      rows: table.rows.filter(r => r.student_id === id).map(({ student_id, ...rest }) => rest),
    }));
    // Nicer names for columns, the same ones Sylus uses (settings/groups.json, students.fields).
    const labels = Object.fromEntries(Object.entries(groupsConfig().students?.fields ?? {}).map(([c, f]) => [c, f.label === 'Class of' ? 'Expected Graduation' : f.label]));
    return {
      fields: columns.map(column => ({ column, label: labels[column] ?? '', value: row[column] ?? '' })),
      records,
    };
  }

  // Deletes a student from students.csv and every other CSV, backing up each file changed.
  function deleteStudent(id) {
    const [table, tableFile] = [[studentFile(), studentsFile], [incomingTable(), incomingFile]]
      .find(([t]) => t.rows.some(r => r.student_id === id)) ?? [];
    if (!table) return { errors: ["That student isn't on file."] };
    const student = table.rows.find(r => r.student_id === id);
    const name = `${student.first_name} ${student.last_name}`;
    const removed = {};
    for (const [file, { table: other }] of Object.entries(otherFiles())) {
      const keep = other.rows.filter(r => r.student_id !== id);
      if (keep.length === other.rows.length) continue;
      removed[file] = other.rows.length - keep.length;
      save({ columns: other.columns, rows: keep }, `Deleted ${id} ${name}'s ${removed[file]} rows from ${file}.csv`, path.join(dataDir, `${file}.csv`));
    }
    save({ columns: table.columns, rows: table.rows.filter(r => r.student_id !== id) }, `Deleted ${id} ${name}`, tableFile);
    return { deleted: { student_id: id, name }, removed };
  }

  // Which students' counselors would change under these rules.
  function previewCounselors(rules) {
    return readStudents().rows
      .map(r => ({ student_id: r.student_id, name: `${r.first_name} ${r.last_name}`, from: r.counselor ?? '', to: counselorFor(r.last_name, rules) }))
      .filter(c => c.to && c.to !== c.from);
  }

  // Saves the rules and gives every student the counselor their last name points to.
  // Students whose letter no rule covers keep their counselor.
  function applyCounselors(rules) {
    let changed = 0;
    const changes = [[studentFile(), studentsFile], [incomingTable(), incomingFile]].map(([table, file]) => {
      if (!table.columns.includes('counselor')) table.columns.push('counselor');
      let count = 0;
      for (const row of table.rows) {
        const counselor = counselorFor(row.last_name, rules);
        if (counselor && counselor !== row.counselor) { row.counselor = counselor; count++; }
      }
      changed += count;
      return { table, file, count };
    });
    fs.writeFileSync(rulesFile, JSON.stringify({
      _about: 'Counselors by the first letter of the last name. The entry tool fills these in for new students and can reassign everyone.',
      by_last_name: rules,
    }, null, 2) + '\n');
    for (const { table, file, count } of changes) {
      if (count) save(table, `Counselors reassigned by last name: ${count} students changed`, file);
    }
    return changed;
  }

  // One CSV of groups (clubs, athletics, events...), or null if data/ has no such file. Its
  // settings come from settings/groups.json; a file not listed there uses its first column
  // after student_id as the group's name.
  function groupFile(name) {
    const files = otherFiles();
    if (!Object.hasOwn(files, name)) return null;
    const { table } = files[name];
    const config = groupsConfig()[name] ?? {};
    return {
      table,
      file: path.join(dataDir, `${name}.csv`),
      nameColumn: config.group || table.columns.find(c => c !== 'student_id'),
      repeats: !!config.repeats,          // the same student can be listed more than once (service visits)
      defaults: config.defaults ?? {},    // what a blank box means, like role = Member
    };
  }

  // Who is in each group of a file: { Robotics: [{ student_id, club, role, start_date }] }.
  function groupList(name) {
    const { table, nameColumn } = groupFile(name);
    const groups = Object.create(null);
    for (const r of table.rows) {
      if (r[nameColumn]) (groups[r[nameColumn]] ??= []).push(r);
    }
    return groups;
  }

  // What Index needs for a section per group file, in the order of settings/groups.json.
  function groupState() {
    const order = Object.keys(groupsConfig());
    const place = name => (order.includes(name) ? order.indexOf(name) : order.length);
    const names = Object.keys(otherFiles()).sort((a, b) => place(a) - place(b));
    return Object.fromEntries(names.map(name => {
      const { table, nameColumn, repeats, defaults } = groupFile(name);
      const fields = table.columns.filter(c => c !== 'student_id' && c !== nameColumn).map(column => {
        return { column, type: /date/i.test(column) ? 'date' : 'text', default: defaults[column] ?? '' };
      });
      return [name, { nameColumn, repeats, fields, members: groupList(name) }];
    }));
  }

  const sameRow = (table, a, b) => table.columns.every(c => String(a[c] ?? '') === String(b[c] ?? ''));

  // A typed value as it's saved. Words like a role take the spelling already in the file
  // ("jv" is JV), or proper capitals; a description gets a capital to start.
  function cleanValue(table, column, typed) {
    if (/date|hours/i.test(column)) return typed;
    if (/description/i.test(column)) return sentenceText(typed);
    return table.rows.map(r => r[column]).find(v => v && v.toLowerCase() === typed.toLowerCase()) ?? titleText(typed);
  }

  // Puts a student already in students.csv into a group (a new name starts a new group).
  // `input` is keyed by the file's columns. Blank dates and defaults are filled in.
  // Returns { member } or { errors }.
  function addGroupRow(name, input, today = new Date()) {
    const group = groupFile(name);
    if (!group) return { errors: ["That group file isn't in data/."] };
    const { table, nameColumn, repeats, defaults } = group;
    const kind = nameColumn.replace(/_/g, ' ');
    const value = key => String(input[key] ?? '').trim();
    let groupName = value(nameColumn).replace(/\s+/g, ' ');
    const student = readStudents().rows.find(r => r.student_id === value('student_id'));
    const errors = [];
    if (!groupName) errors.push(`Choose a ${kind} or type a new name.`);
    if (groupName.length > 60) errors.push(`Keep the ${kind} name under 60 letters.`);
    if (!student) errors.push('Choose a student from the suggestions.');
    if (errors.length) return { errors };

    // "robotics" joins the existing Robotics rather than starting a second club.
    groupName = table.rows.map(r => r[nameColumn]).find(g => g && g.toLowerCase() === groupName.toLowerCase()) ?? titleText(groupName);
    const others = table.rows.filter(r => r[nameColumn] === groupName);
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const row = { student_id: student.student_id, [nameColumn]: groupName };
    for (const column of table.columns) {
      if (column === 'student_id' || column === nameColumn) continue;
      row[column] = cleanValue(table, column, value(column)) || defaults[column] || '';
      if (/date/i.test(column) && !row[column]) {
        // An event happens on one date, so a new person gets the date the others have.
        row[column] = (!repeats && !/start/i.test(column) && others[0]?.[column]) || date;
      }
      if (/date/i.test(column) && !/^\d{4}-\d{2}-\d{2}$/.test(row[column])) errors.push('Dates must look like 2026-11-05.');
      if (/hours/i.test(column) && !/^\d+(\.\d+)?$/.test(row[column])) errors.push('Hours must be a number.');
    }
    if (errors.length) return { errors };

    const studentName = `${student.first_name} ${student.last_name}`;
    const mine = others.filter(r => r.student_id === student.student_id);
    if (repeats ? mine.some(r => sameRow(table, r, row)) : mine.length) {
      return { errors: [`${studentName} is already in ${groupName}${repeats ? ' with these details' : ''}.`] };
    }
    table.rows.push(row);
    const details = table.columns.filter(c => !['student_id', nameColumn].includes(c) && !/date/i.test(c)).map(c => row[c]).filter(Boolean).join(' · ');
    save(table, `Added ${student.student_id} ${studentName} to ${groupName}${details ? ` (${details})` : ''}`, group.file);
    return { member: { ...row, name: studentName, group: groupName } };
  }

  // Changes one entry: `input.row` is the entry as it was, `input.changes` the new values.
  // The student, the group and any dates stay as they are.
  function updateGroupRow(name, input) {
    const group = groupFile(name);
    if (!group) return { errors: ["That group file isn't in data/."] };
    const { table, nameColumn, repeats, defaults } = group;
    const row = table.rows.find(r => sameRow(table, r, input.row ?? {}));
    if (!row) return { errors: ['That entry has changed. Refresh the page and try again.'] };

    const updated = { ...row };
    for (const [column, value] of Object.entries(input.changes ?? {})) {
      if (!table.columns.includes(column) || ['student_id', nameColumn].includes(column) || /date/i.test(column)) continue;
      updated[column] = cleanValue(table, column, String(value ?? '').trim()) || defaults[column] || '';
    }
    const hours = table.columns.find(c => /hours/i.test(c));
    if (hours && !/^\d+(\.\d+)?$/.test(updated[hours])) return { errors: ['Hours must be a number.'] };
    if (repeats && table.rows.some(r => r !== row && sameRow(table, r, updated))) {
      return { errors: ['That student already has an entry just like this.'] };
    }
    Object.assign(row, updated);
    save(table, `Changed ${row.student_id} in ${row[nameColumn]}`, group.file);
    return { member: updated };
  }

  // Takes a student out of a group. Where students can be listed more than once, `input`
  // is the whole row and only that one entry goes.
  function removeGroupRow(name, input) {
    const group = groupFile(name);
    if (!group) return { errors: ["That group file isn't in data/."] };
    const { table, nameColumn, repeats } = group;
    const groupName = String(input[nameColumn] ?? '').trim();
    const id = String(input.student_id ?? '').trim();
    const theirs = table.rows.filter(r => r.student_id === id && r[nameColumn] === groupName);
    const gone = repeats ? theirs.filter(r => sameRow(table, r, input)).slice(0, 1) : theirs;
    if (!gone.length) return { errors: [`That student isn't in ${groupName || 'that group'}.`] };
    save({ columns: table.columns, rows: table.rows.filter(r => !gone.includes(r)) }, `Removed ${id} from ${groupName}`, group.file);
    // The rows themselves come back too, so the page can offer Undo.
    return { removed: gone.length, rows: gone };
  }

  // Undo for removeGroupRow: puts its rows back as they were, every column included.
  function restoreGroupRows(name, input) {
    const group = groupFile(name);
    if (!group) return { errors: ["That group file isn't in data/."] };
    const { table, nameColumn, repeats } = group;
    const rows = Array.isArray(input.rows) ? input.rows : [];
    const students = readStudents().rows;
    if (!rows.length || rows.some(r => !students.some(s => s.student_id === r?.student_id) || !r?.[nameColumn])) {
      return { errors: ["That couldn't be undone: the student or group is no longer there."] };
    }
    const taken = rows.find(r => table.rows.some(t => t.student_id === r.student_id && t[nameColumn] === r[nameColumn]
      && (!repeats || sameRow(table, t, r))));
    if (taken) return { errors: [`That student is already back in ${taken[nameColumn]}.`] };

    const clean = rows.map(r => Object.fromEntries(table.columns.map(c => [c, String(r[c] ?? '')])));
    table.rows.push(...clean);
    save(table, `Undid removal: ${clean[0].student_id} back in ${clean[0][nameColumn]}`, group.file);
    return { restored: clean.length };
  }

  return { readStudents, studentFile, readRules, choices, extraColumns, studentDetails, deleteStudent, nextStudentId, checkStudent, addStudent, previewCounselors, applyCounselors, groupList, groupState, addGroupRow, updateGroupRow, removeGroupRow, restoreGroupRows };
}

module.exports = { createStore, checkRules, counselorFor, graduationYear, splitName, schoolEmail, toCsv, GRADES, GENDERS, SIZES };

},
"api": function (module, exports, require) {
// What Index's page can ask for, as plain requests that answer { status, body }. The server
// (server.js) and the online demo (site/) both answer the page with this, so they act the same.

const { checkRules, graduationYear, GRADES } = require('./students');

// `rebuild` updates Sylus after a change, where there's a Sylus to update.
function createApi(store, rebuild = () => 'nothing to update') {
  function state() {
    const { rows } = store.readStudents();
    return {
      students: rows.map(r => ({
        student_id: r.student_id, school_id: r.school_id ?? '', email: r.email ?? '', first_name: r.first_name, last_name: r.last_name, preferred_name: r.preferred_name,
        name: `${r.first_name} ${r.last_name}`, grade: r.grade, counselor: r.counselor ?? '',
      })),
      groups: store.groupState(),
      nextId: store.nextStudentId(rows),
      rules: store.readRules(),
      choices: store.choices(),
      extraColumns: store.extraColumns(),   // students.csv columns added later, each gets a box
      // The class each grade graduates with this school year: { 9: '2030', ..., 12: '2027' }.
      classOf: Object.fromEntries(GRADES.map(g => [g, graduationYear(g)])),
    };
  }

  const saved = result => (result.errors ? { status: 400, body: result } : { status: 200, body: { ...result, build: rebuild(), state: state() } });

  // Answers a GET, or null if there's no such request.
  function get(pathname, params) {
    if (pathname === '/api/state') return { status: 200, body: state() };

    // Everything about one student, for the pop-up: /api/student?id=S001
    if (pathname === '/api/student') {
      const details = store.studentDetails(params.get('id') ?? '');
      return details ? { status: 200, body: details } : { status: 404, body: { errors: ["That student isn't in students.csv."] } };
    }
    return null;
  }

  // Answers a POST, or null if there's no such request.
  function post(pathname, body) {
    if (pathname === '/api/students/check') {
      const result = store.checkStudent(body);
      return { status: result.errors ? 400 : 200, body: result };
    }
    if (pathname === '/api/students') return saved(store.addStudent(body));
    if (pathname === '/api/students/delete') return saved(store.deleteStudent(String(body.student_id ?? '')));

    // /api/groups/clubs/add, /api/groups/athletics/remove...
    const groupRoute = pathname.match(/^\/api\/groups\/([^/]+)\/(add|edit|remove|restore)$/);
    if (groupRoute) {
      const action = { add: store.addGroupRow, edit: store.updateGroupRow, remove: store.removeGroupRow, restore: store.restoreGroupRows }[groupRoute[2]];
      return saved(action(decodeURIComponent(groupRoute[1]), body));
    }

    if (pathname === '/api/counselors/preview' || pathname === '/api/counselors/apply') {
      const checked = checkRules(body.rules);
      if (checked.errors) return { status: 400, body: checked };
      if (pathname.endsWith('preview')) return { status: 200, body: { changes: store.previewCounselors(checked.rules) } };
      const changed = store.applyCounselors(checked.rules);
      return { status: 200, body: { changed, build: changed ? rebuild() : 'nothing to update', state: state() } };
    }
    return null;
  }

  return { get, post };
}

module.exports = { createApi };

}};
  const loaded = { 'node:fs': fs, 'node:path': path };
  function require(name) {
    const key = name.startsWith('node:') ? name : name.split('/').pop();
    if (key in loaded) return loaded[key];
    const module = { exports: {} };
    loaded[key] = module.exports;
    sources[key](module, module.exports, require);
    loaded[key] = module.exports;
    return module.exports;
  }

  const store = require('students').createStore('data', 'settings');
  const api = require('api').createApi(store);

  // The page's requests go to Index's code here instead of a server.
  const realFetch = window.fetch.bind(window);
  window.fetch = async (address, options = {}) => {
    if (!String(address).startsWith('/api/')) return realFetch(address, options);
    const url = new URL(address, location.origin);
    let answer;
    try {
      answer = options.method === 'POST' ? api.post(url.pathname, JSON.parse(options.body || '{}')) : api.get(url.pathname, url.searchParams);
    } catch (err) {
      answer = { status: 500, body: { errors: [err.message] } };
    }
    const { status, body } = answer ?? { status: 404, body: { errors: ['Not found'] } };
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  };

  document.getElementById('demo-reset').addEventListener('click', () => {
    try { localStorage.removeItem(KEY); } catch {}
    location.reload();
  });
})();
