import type { Application } from "~/types/dashboard";
import type { CountriesOptionAttributes, OptionAttributes, programOptions } from "~/types/home";
import type { Program, SchoolDetail } from "~/types/program";

export const coursePreferenceOptions: OptionAttributes[] = [
    {
        value: '9014',
        label: "Agricultural Sciences"
    },
    {
        value: '8991',
        label: "Arts and Design"
    },
    {
        value: '8992',
        label: "Business and Economics"
    },
    {
        value: '8993',
        label: "Communications and Media"
    },
    {
        value: '8986',
        label: "Education"
    },
    {
        value: '8994',
        label: "Engineering and Technology"
    },
    {
        value: '9046',
        label: "Environmental Studies"
    },
    {
        value: '9015',
        label: "Humanities"
    },
    {
        value: '9012',
        label: "Law"
    },
    {
        value: '9016',
        label: "Mathematics"
    },
    {
        value: '8988',
        label: "Medical and Health Sciences"
    },
    {
        value: '8995',
        label: "Natural Sciences"
    },
    {
        value: '8987',
        label: "Social Sciences"
    }
]
export const locationOptions: CountriesOptionAttributes[] = [
    {
        label: "United Kingdom",
        value: [
            92
        ]
    },
    {
        label: "Canada",
        value: [
            156
        ]
    },
    {
        label: "Australia",
        value: [
            185
        ]
    },
    {
        label: "United States",
        value: [
            182
        ]
    },
    {
        label: "Europe",
        value: [
            67,
            68,
            62,
            63,
            88,
            78,
            191,
            80,
            90
        ]
    }
]
export const budgetList = [
    {
        label: "0   - 10,000",
        max: 10000,
        min: 0,
        value: "0-10000",
    },
    {
        label: "0   - 20,000",
        max: 20000,
        min: 0,
        value: "0-20000",
    },
    {
        label: "0   - 30,000",
        max: 30000,
        min: 0,
        value: "0-30000",
    },
    {
        label: "0   - 60,000",
        max: 60000,
        min: 0,
        value: "0-60000",
    },
    {
        label: "0   - 90,000",
        max: 90000,
        min: 0,
        value: "0-90000",
    },
]
export const programListOptions: OptionAttributes[] = [
    {
        value: '1',
        label: "Bachelor's"
    },
    {
        value: '2',
        label: "Master's"
    },
    {
        value: '6',
        label: "Associate"
    }
]
export const majors: programOptions[] = [
    {
        value: 1781,
        label: "Computer Engineering",
        parent: 8994
    },
    {
        value: 1846,
        label: "Software Development",
        parent: 8994
    },
    {
        value: 1867,
        label: "Cybersecurity",
        parent: 8994
    },
    {
        value: 1768,
        label: "Data Science",
        parent: 8994
    },
    {
        value: 3683,
        label: "Arts and Design",
        parent: 8991
    },
    {
        value: 1954,
        label: "Climate Science",
        parent: 9046
    },
    {
        value: 1857,
        label: "Applied Mathematics",
        parent: 9016
    },
    {
        value: 1815,
        label: "Criminology",
        parent: 8987
    },
    {
        value: 1749,
        label: "Education",
        parent: 8986
    },
    {
        value: 1831,
        label: "Criminal Law",
        parent: 9012
    },
    {
        value: 1957,
        label: "Human Rights Law",
        parent: 9012
    },
    {
        value: 1786,
        label: "Accounting",
        parent: 8992
    },
    {
        value: 1974,
        label: "E-commerce",
        parent: 8992
    },
];
export const schoolsList: Program[] = [
    {
        id: 423872,
        title: "Engineering ",
        school_ranking: null,
        fee: 29560,
        currency: {
            title: "GBP",
            symbol: "\u00a3",
        },
        in_state_fee: null,
        description: null,
        program_title: "Computer Engineering",
        super_meta_title: "Engineering and Technology",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 1,
            name: "Aberystwyth University",
            user_name: "aberystwyth_university",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IkI0S1pRQUF5ZTlKNCs1UEJxNkYwakE9PSIsInZhbHVlIjoiVDIxKytVMyszSUdBejgzR3VTTS81UHRHbTljaktRQVRLUkg0ekZXUDJIZHgxb3BsNlNWMlhSbVdaOS9SSVJUaG5EL0VudnhlRHY3blRkdzM2QlpaVGc9PSIsIm1hYyI6ImJiM2VjMzhmODJkYTc4YWIzNmM1NjAzYjFiY2E1OGQ3ZGNjZTUyNzE2YjBkZmI2MDMyMDQ2NjBkYjkzYWUwNGMiLCJ0YWciOiIifQ==?expires=1745069191&signature=3a43ba682583aac03f625b14c02c39f1ad0d6bc629d55e305f8fec69bccc05b3",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: null,
                    ielts: 6.5,
                    gpa: 3.2,
                },
            },
            address: {
                country_id: 92 ,
                lat: null,
                lng: null,
                country: "United Kingdom",
                state: "Wales",
                country_code: "UK",
            },
        },
    },
    {
        id: 410016,
        title: "Engineering ",
        school_ranking: null,
        fee: 29560,
        currency: {
            title: "GBP",
            symbol: "\u00a3",
        },
        in_state_fee: null,
        description: null,
        program_title: "Computer Engineering",
        super_meta_title: "Engineering and Technology",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 9519,
            name: "University of Birmingham - Edgbaston",
            user_name: "university-of-birmingham-edgbaston",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6InIvL1AzUCtiQkFndU1zcytoV1JIeXc9PSIsInZhbHVlIjoiVWJteVBicHBQOGlubGd5MWNnYTRUNFhVamNVV1VPOVE2WTArWis1VlBVWlZzT2RIVHdydlhNZC9XUVNrOXplNHNzb2VRVHpVVWVPbFJUU1p4SmxRay91ZTJJVUVmbXBlY2c1YnlodzFQcEk9IiwibWFjIjoiNzBmMzNmOWViNzQ1NGZhMzY3MmI0YzVlZjNmYWUwY2QwYzVlMTkwN2Q4ZTdhN2E0Mjk1NzdiNzBmNmE3ZTE4MyIsInRhZyI6IiJ9?expires=1745069191&signature=06b6e7ffe27c8903e83d2f9d999ea3386e97d4dfc68faba64165b4adcb69c52c",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: null,
                    ielts: 6.5,
                    gpa: 3.6,
                },
            },
            address: {
                country_id: 92 ,
                lat: null,
                lng: null,
                country: "United Kingdom",
                state: "West Midlands",
                country_code: "UK",
            },
        },
    },
    {
        id: 453728,
        title: "Science in Data Science ",
        school_ranking: null,
        fee: 27000,
        currency: {
            title: "GBP",
            symbol: "\u00a3",
        },
        in_state_fee: null,
        description: null,
        program_title: "Data Science",
        super_meta_title: "Engineering and Technology",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 191,
            name: "University of Exeter",
            user_name: "university_of_exeter",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6Ikh1S1Q4N3pEcVZ5UXZ3R3RhdGFINHc9PSIsInZhbHVlIjoid3NRVFhXSzd2SmpaWUtWd04rM0tsclVTQjk5RVZUZEVmY1Z4bGJUU1h1K0dMd1BQNm5pVHNIVjljZUdLRFpsTEx5TytKeFFPVzk0K0tBQVdYSFF1clE9PSIsIm1hYyI6ImNlZjBlYzE0OTY3NzgwMzU5ZGRlNWQwNDI5NzZkYmNmZWIwYzE3Zjk3ZjE2M2RiZWU1ZmRjYzI3OTgxOGIyYjMiLCJ0YWciOiIifQ==?expires=1745069786&signature=b9087b2bb2641442a53caae855c86998226fc6060b7001918a780dfbdcab89e8",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1350,
                    ielts: 7,
                    gpa: 3.6,
                },
            },
            address: {
                country_id: 92 ,
                lat: null,
                lng: null,
                country: "United Kingdom",
                state: "Devon",
                country_code: "UK",
            },
        },
    },
    {
        id: 452636,
        title: "Science in Economics and Data Science ",
        school_ranking: null,
        fee: 25900,
        currency: {
            title: "GBP",
            symbol: "\u00a3",
        },
        in_state_fee: null,
        description: null,
        program_title: "Data Science",
        super_meta_title: "Engineering and Technology",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 509,
            name: "Royal Holloway University of London",
            user_name: "royal_holloway_university_of_london",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6ImRmVkIrM25JU3lHNmRZbGZJNklkU0E9PSIsInZhbHVlIjoic2tzblZpSlR5UnZHcXhCaHdyNzdMTEc2RnhvWTliWlp1MnlPZ2FHQnZkQnp5T1Q2N1RwaTBNUUVLS1h0bFc3R1NzWTN0djFPV3EzYVhDRWlKT2Z3MFZZTklTeURRWW9YeEdibE9LWjVTcm89IiwibWFjIjoiNGZhNThiYWJjNzk2NGYzNTY4Y2JjNDdiYjg4NzgwNmMwMGZmNzQ3ZjZjNzJhNDAzYThhMWYwNjYyZDlkYmJjMyIsInRhZyI6IiJ9?expires=1745069786&signature=aa27218e0706bfd1474ebfd2bd82ea268d41d70f17c5c04b447bb87437404c1a",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1300,
                    ielts: 6.5,
                    gpa: 3.5,
                },
            },
            address: {
                country_id: 92 ,
                lat: null,
                lng: null,
                country: "United Kingdom",
                state: "London",
                country_code: "UK",
            },
        },
    },
    {
        id: 412293,
        title: "Arts in Politics with International Relations (Honours) ",
        school_ranking: null,
        fee: 25800,
        currency: {
            title: "GBP",
            symbol: "\u00a3",
        },
        in_state_fee: null,
        description: null,
        program_title: "Arts and Design",
        super_meta_title: "Arts and Design",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 10368,
            name: "University of York",
            user_name: "university-of-york",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IlQ1ZjFYMTNzNGtWQUpYUGlXeUxKbHc9PSIsInZhbHVlIjoidHRkcVMwNWFpazI1cmFPdlZHbXkzdUFIZGFkOXd3Umx3MW02Ti9acUgvQVRHRmk0WHRLMFhKSFNPQjJlem9tYmp6ODRXN21wMkF1QkVBL2FJYTluREE9PSIsIm1hYyI6IjVlNzJjMWZlNjMzNWZhNjgxNjc1YTAzOWNlODUzYjg5ZDQ0M2NhOGVjOWZjOTI2ZjA1NzE1MjgyZWU1NDNkNDMiLCJ0YWciOiIifQ==?expires=1745070071&signature=70abdb0a68e754fd86f49324e0133765c5065742b62695b3193d3f4640b337a1",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1400,
                    ielts: 7,
                    gpa: 3.7,
                },
            },
            address: {
                country_id: 92 ,
                lat: null,
                lng: null,
                country: "United Kingdom",
                state: "Yorkshire",
                country_code: "UK",
            },
        },
    },
    {
        id: 425587,
        title: "Arts in Philosophy with Italian (with a year abroad) (Honours) ",
        school_ranking: null,
        fee: 25800,
        currency: {
            title: "GBP",
            symbol: "\u00a3",
        },
        in_state_fee: null,
        description: null,
        program_title: "Arts and Design",
        super_meta_title: "Arts and Design",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 1,
            name: "Aberystwyth University",
            user_name: "aberystwyth_university",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IlVJb0liOTR6OHlYZktESWhLNDZ2Nmc9PSIsInZhbHVlIjoiWDE0a3dZTUJMWWpJcGFzR2dNaG5WdlloV0RmTGxESmFLZzE2d1lrbE9hcTV5SDFzTlcrNnNkZ1ZOZ3JkcVpENDlRQjIvcDJoRHVYSzYwTUk3SC9Rdmc9PSIsIm1hYyI6ImI3Njk4NGVmZmQ5NmUwMTg0ZTg2ZGI4OTA3MjZhZmM5MTY4YzVlNWYyMDYxMjkzZWY2MzY2MmI1NjE3MGQzZjciLCJ0YWciOiIifQ==?expires=1745070071&signature=79bbfd6551a2f9a44b94f2ac6701db4d5801734c855ba10ab1fccd34e995d694",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: null,
                    ielts: 6.5,
                    gpa: 3.2,
                },
            },
            address: {
                country_id: 92 ,
                lat: null,
                lng: null,
                country: "United Kingdom",
                state: "Wales",
                country_code: "UK",
            },
        },
    },
    {
        id: 451578,
        title:
            "Science in Meteorology and Climate with International Foundation Year ",
        school_ranking: null,
        fee: 29950,
        currency: {
            title: "GBP",
            symbol: "\u00a3",
        },
        in_state_fee: null,
        description: null,
        program_title: "Climate Science",
        super_meta_title: "Environmental Studies",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 506,
            name: "University Reading",
            user_name: "university_reading",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IlR0dTJRZHhVSkJPTmUwa0RlQUFwekE9PSIsInZhbHVlIjoiaFoxNW5TU3BBTy9ETnJDUFJ0R2Vubmt3eTZpaExLeDRBREJpdk5CTG9tVm5DT052WUJHVHhlTnRHZ3FnQldvSndtTVdzVUwwa0dzUDdsdnNSQmhkTmc9PSIsIm1hYyI6IjhkYTRiY2MxM2FiYjgyNzAxMDJiZjJjMGQxNzgyZjk4MDZmNTJlOTgyYzkxOTUzZDE5YmI1YTYwNTI0OGNlMjMiLCJ0YWciOiIifQ==?expires=1745070401&signature=46dea6b9cff0ddf26691a0de93ae832e4b561caef17d4b438be3e33c206abf1b",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1300,
                    ielts: 6.5,
                    gpa: 3.5,
                },
            },
            address: {
                country_id: 92 ,
                lat: null,
                lng: null,
                country: "United Kingdom",
                state: "Reading",
                country_code: "UK",
            },
        },
    },
    {
        id: 91462,
        title: "Climate Science",
        school_ranking: 78,
        fee: 2353,
        currency: {
            title: "GBP",
            symbol: "\u00a3",
        },
        in_state_fee: 2353,
        description: null,
        program_title: "Climate Science",
        super_meta_title: "Environmental Studies",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 505,
            name: "Durham University",
            user_name: "durham_university_1",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6Imk3WmJ3cjVtQlQ2ZUJUS1k2OTVvMWc9PSIsInZhbHVlIjoiclE4b0ZxTWRQN1dQZ3Irb2c4KzduNHlCZUI5TFlmN0NNSHNMVTlXR3d2bG40aFNnSEJvU0FTcWNxaTJrYTZ2Y1FZRW1IbERIaXZaWUIvZVU4VGc0bkE9PSIsIm1hYyI6IjdjNTVhZDFjN2M3MjkxOGVkNTYyOGYwNmIyMzZjNGYyMzUyNjQxN2ZmYzYyZWUzYWI3Yzc5ZmI4MTVjYjUyZWMiLCJ0YWciOiIifQ==?expires=1745070401&signature=8d16cef3c20ad628b825fe4acefc202eedf1b0f27b3e7296fec225c8790767fe",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: null,
                    ielts: 7,
                    gpa: 3.7,
                },
            },
            address: {
                country_id: 92 ,
                lat: null,
                lng: null,
                country: "United Kingdom",
                state: "Durham",
                country_code: "UK",
            },
        },
    },
    {
        id: 485660,
        title:
            "Foundation Studies - Engineering and Science (FS022SES) (108492M) + Science (Dean's Scholar, Applied Mathematics and Statistics) (Honours) BH101AMSI) (097606A)",
        school_ranking: null,
        fee: 28500,
        currency: {
            title: "AUD",
            symbol: "$",
        },
        in_state_fee: null,
        description: null,
        program_title: "Applied Mathematics",
        super_meta_title: "Mathematics",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 9978,
            name: "Royal Melbourne Institute of Technology (RMIT) - Training",
            user_name: "royal-melbourne-institute-of-technology-rmit-training",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6InhtNmZ0cDg2ZFV0ZEFPNDFROGVoc3c9PSIsInZhbHVlIjoiQnlxVVlsQnB2Q0dMUFkwSWxGMnhaWExpM1drSzRoekJ1RUNGV3pXcm9lTFJUQkFaUU9BUW1XRHRJeVg5S0FqL0hiSmM5ekV5WFlYbzhwQk9LMC9aS2R3OFNGeWx6TDNpVHpEOXYvTTQyek1QNGp0MWw1aXk4ZnVacUhSNFd3dlMiLCJtYWMiOiJhM2ViYzQ1NjU4MmJiNDA4OWQ0NDc0YjJmZmU2NzFlNTIwZTM4MTQ1Yjc2ZTU4MTVmOTEzOGYzN2M2NTMyZGI5IiwidGFnIjoiIn0=?expires=1745070745&signature=ae43cfc7eba615e7120b6d29902d3fe930e8fe14fa4ddf9a9cf13b4b82885f52",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: null,
                    ielts: 6.5,
                    gpa: 3.2,
                },
            },
            address: {
                country_id: 185,
                lat: null,
                lng: null,
                country: "Australia",
                state: "Victoria",
                country_code: "AU",
            },
        },
    },
    {
        id: 484110,
        title:
            "Murdoch University Preparation Course (069100D) Transfer to Double Degree - Criminology & Science (B1360) (096885G)",
        school_ranking: null,
        fee: 26910,
        currency: {
            title: "AUD",
            symbol: "$",
        },
        in_state_fee: null,
        description: null,
        program_title: "Criminology",
        super_meta_title: "Social Sciences",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 9953,
            name: "Murdoch College",
            user_name: "murdoch-college",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6InM3UVk2c1Q0ZzQyVmE2N012Q3JENFE9PSIsInZhbHVlIjoiWWJlZGwyaEZwZjlpUTRMcEhTSHVxaklFVHEzRHJRZXIzRG9QYldSTHJJck9PY245dWNjR09lVnFLL3RTTDNIUVNIQlNlZExNRDdXUTFUZm5BZjNlMFE9PSIsIm1hYyI6IjUzMGQ2MGI5MmM5ZWIwMzY1ODk5ODgwNmMxMWUxNDJmYmJkYTc5NjdlYjZjMzFjMWIwMDRjZGI0ODA1NGE2MTUiLCJ0YWciOiIifQ==?expires=1745070954&signature=bc3184222883ae8ea6d07a13e5e541d5f3973867102e56e4aec921a00ad2f29c",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: null,
                    ielts: 6,
                    gpa: 3,
                },
            },
            address: {
                country_id: 185,
                lat: null,
                lng: null,
                country: "Australia",
                state: "Australian Capital Territory",
                country_code: "AU",
            },
        },
    },
    {
        id: 481497,
        title: "Criminology (BCRIM) (061318F)",
        school_ranking: null,
        fee: 28216,
        currency: {
            title: "AUD",
            symbol: "$",
        },
        in_state_fee: null,
        description: null,
        program_title: "Criminology",
        super_meta_title: "Social Sciences",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 9923,
            name: "University of New England - Armidale",
            user_name: "university-of-new-england-armidale",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6Inp2WDRwTWI5Y0ppd2JCa1BYQzk0ZHc9PSIsInZhbHVlIjoiUGVrY1JKaWZEdUtCUk5sRzRueHN4d0Z1ZzNHeFQydTZmQ1o1bzJzVUM3Z2dKSVB6eUFuaGZ2VlIvamV3YmdzM2tIci9kQmVJZlp0YkkxOEphWHNFQ04zVkdyREsyeTdWWitZNktjSzArL0U9IiwibWFjIjoiYjQ2MDNhMTM3OGI2NzliYjIxM2ViYmFkMzVmNDk3NWMzYTAxZGU3ZjUwNjVlNGRjMmExZWFjZjRkZDI0MzYxNSIsInRhZyI6IiJ9?expires=1745070954&signature=baae1ea09bcd062c43b6d9d349563b4047a0febc81c0c07d0455d5f114f35c81",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: null,
                    ielts: 6.5,
                    gpa: 6,
                },
            },
            address: {
                country_id: 185,
                lat: null,
                lng: null,
                country: "Australia",
                state: "New South Wales",
                country_code: "AU",
            },
        },
    },
    {
        id: 77540,
        title:
            "B.Tech. - CSE-Cyber Security & Forensics in association with Microsoft",
        school_ranking: null,
        fee: 36600,
        currency: {
            title: "CAD",
            symbol: "$",
        },
        in_state_fee: null,
        description: null,
        program_title: "Cybersecurity",
        super_meta_title: "Engineering and Technology",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 9192,
            name: "Coquitlam College",
            user_name: "coquitlam_college",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IkdQMmxUWFFqczc2WC9makNkUE1pV2c9PSIsInZhbHVlIjoiNEVOYXh3WnhWTElSaEpsb2REblV0OXcwcVlkMzZTWnRGZkoxRnpXL1pCV1krNStObVZkUTVVWDhOOXpuWlIxN295UW9vcmt1eXFleTBOK0IxcUtydEE9PSIsIm1hYyI6IjdlYWIzNDZlOTgxYjlhZTBmMDBkZGQ2MTllNzZkYmI2NmRmOGE4MGY3MDI5NDkyMTE0ZWE2YzdlODliYjM2NmIiLCJ0YWciOiIifQ==?expires=1745306422&signature=52448bebe249fa9f4a2fb80c5d542ef01ec7ce95f308364591105780668eec79",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: null,
                    ielts: 6,
                    gpa: 2.8,
                },
            },
            address: {
                country_id: 156,
                lat: null,
                lng: null,
                country: "Canada",
                state: "British Columbia",
                country_code: "CA",
            },
        },
    },
    {
        id: 77542,
        title: "M.Tech. - Cryptology and Cyber Security",
        school_ranking: null,
        fee: 36600,
        currency: {
            title: "CAD",
            symbol: "$",
        },
        in_state_fee: null,
        description: null,
        program_title: "Cybersecurity",
        super_meta_title: "Engineering and Technology",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 9192,
            name: "Coquitlam College",
            user_name: "coquitlam_college",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6ImNTNmg2MmdDT0xBeW13MjVxZFNWR1E9PSIsInZhbHVlIjoiamVPakQyRHV0cHZGVHhWZWlmeVZDN1cxdERGV0dIclgrZWpaV203UVl6ejh2NEdub2hiSWoxVWJlWTd4ZHMvRmRrZTk1VzJOVWZWSDVwZXJSaXJBUHc9PSIsIm1hYyI6ImU1YTRjOTY4N2QxYzMzNTU2OGEyMGE2Y2I2NDY1ZWRhMDg1ODVhNWJhNDE0MjQ1ZGEzYmI5NWE5ZDRjZDgyMTYiLCJ0YWciOiIifQ==?expires=1745306422&signature=5dcf0d9144cb1fe2679b16ef94ae9f58801f2f4d99fdc4bdd07d1bd61242d20c",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: null,
                    ielts: 6,
                    gpa: 2.8,
                },
            },
            address: {
                country_id: 156,
                lat: null,
                lng: null,
                country: "Canada",
                state: "British Columbia",
                country_code: "CA",
            },
        },
    },
    {
        id: 90869,
        title: "International and Comparative Education",
        school_ranking: 8,
        fee: 63450,
        currency: {
            title: "USD",
            symbol: "$",
        },
        in_state_fee: 63450,
        description: null,
        program_title: "Education",
        super_meta_title: "Education",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 669,
            name: "Duke University",
            user_name: "duke_university",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IlRibTBDVkFlYVByYXlrTkVCVnIyWVE9PSIsInZhbHVlIjoiWmllU3BxcmNQL0F3NUY2MVpDTTdWZmFXbEhOYUx1eGpjUzE5ZU9Uc3dBa01HS1dTcDhKdGFBaW1DWWdMZHZnZWp3S2x4Z2FQQ1RXWjBSS2pSazhQSmc9PSIsIm1hYyI6IjJmN2RiNzkzOTZhN2ExY2Y4Y2VkZmI2NTQ5NzAzNGY1NjI5NzVlNTM1NzE5Y2NmNGI5NDVmNmIxOGMxNjFlNTQiLCJ0YWciOiIifQ==?expires=1745310230&signature=e401733d88f2aa02516487fff3a9c7198aae632d942fcf21f8972ad410edfb1d",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1540,
                    ielts: 7.5,
                    gpa: 4,
                },
            },
            address: {
                country_id: 182,
                lat: null,
                lng: null,
                country: "United States",
                state: "North Carolina",
                country_code: "US",
            },
        },
    },
    {
        id: 155294,
        title: "Education, General",
        school_ranking: 10,
        fee: 62840,
        currency: {
            title: "USD",
            symbol: "$",
        },
        in_state_fee: 62840,
        description: null,
        program_title: "Education",
        super_meta_title: "Education",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 671,
            name: "Johns Hopkins University",
            user_name: "johns_hopkins_university",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6ImhDWWlYbVJ3RE1jOXZ0Y0YwNlNMeGc9PSIsInZhbHVlIjoia2pNTyt4alpHcWxacWwwZmZXOFM5UmFpOVUrQUNISnhOMFF4dlpJVXJGZ1VYMFYzdlduUzNxZXZCU3dDVk9Fb21xcFU2RnZCSE83dzY0bVdPQk9RcWZOVGFBMnVabHMrdTZXM3hKYkV6WFU9IiwibWFjIjoiOTRmOThmODEzMDU5Y2VmMzY4NTc3YmM0MDJmMGUzYjNiYWI2ZDFkYzBjNzczMWI0NTE1NTFkNTBjZWNmNDRjYSIsInRhZyI6IiJ9?expires=1745310230&signature=382dfae9a8bca892037757803bcfc2c25ae44fcc3bf473274989ff9f1b18dab2",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1510,
                    ielts: 7.5,
                    gpa: 3.9,
                },
            },
            address: {
                country_id: 182,
                lat: null,
                lng: null,
                country: "United States",
                state: "Maryland",
                country_code: "US",
            },
        },
    },
    {
        id: 42575,
        title: "Criminal Justice\/Safety Studies",
        school_ranking: 1617,
        fee: 90000,
        currency: {
            title: "USD",
            symbol: "$",
        },
        in_state_fee: null,
        description: null,
        program_title: "Criminal Law",
        super_meta_title: "Law",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 1775,
            name: "California State University-Long Beach",
            user_name: "california_state_university_long_beach_2023122257",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IkRqNGcybTNaRk5mRHFDM1A1clNkQVE9PSIsInZhbHVlIjoiNncvSW0vS0JoaVpaL0N6eS9CWC8wbS9zdHB5MXd2anhJejJ2d3poVzZmR2pESHA3VHRuS2kwWXdjNE5OYjh2dStTUCs3OHh0Njk1VTNSRjRJcmhuVUZrdk1oV0M3dXJjbFJNVER1OXZ6S009IiwibWFjIjoiZWYxODEyYmY0YmQ5ZGJiZmViMTllYTJhNWY1NDc0MzBlMTNmN2Q4NDkxZGIwMmQ4MjRkNWZkN2QxODg0Yzg4YSIsInRhZyI6IiJ9?expires=1745310511&signature=d1f8ad502704aa6e855d45e05f25ff97ca118ae731c1d027cf98843bf39a4138",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1150,
                    ielts: 6.5,
                    gpa: 3.4,
                },
            },
            address: {
                country_id: 182,
                lat: null,
                lng: null,
                country: "United States",
                state: "California",
                country_code: "US",
            },
        },
    },
    {
        id: 42576,
        title:
            "Homeland Security, Law Enforcement, Firefighting and Related Protective Services, Other",
        school_ranking: 1617,
        fee: 90000,
        currency: {
            title: "USD",
            symbol: "$",
        },
        in_state_fee: null,
        description: null,
        program_title: "Criminal Law",
        super_meta_title: "Law",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 1775,
            name: "California State University-Long Beach",
            user_name: "california_state_university_long_beach_2023122257",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IktWbWIweWYwV0JMd3loNm1kWG9zNlE9PSIsInZhbHVlIjoibzRwOG9VSG5kYWhRVitqRUF4ajZuN1VKR0EwbTBHTHVJK0JzZlk2dXRtV1lGeDg0ZEFTOXFhQVF4NEpaTmcwdzVSVGNrZzdRM1lKN0xTT1lpblRFSlNBZlhFUFV4Ri9tUkw0LzhMbE1ZeVE9IiwibWFjIjoiYmM5OTVhMjdkZjc1NjY4NTA3NWIwZDE0YzEyZTU4MjU3Y2ZiZDI4M2MyOGUxYmVhN2M5NjgyMjQwODUxNjdjZiIsInRhZyI6IiJ9?expires=1745310511&signature=86969c106058220ef272e76285521bc207e0eb8270ddf2976be282cae070edb3",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1150,
                    ielts: 6.5,
                    gpa: 3.4,
                },
            },
            address: {
                country_id: 182,
                lat: null,
                lng: null,
                country: "United States",
                state: "California",
                country_code: "US",
            },
        },
    },
    {
        id: 487534,
        title: "BA in International Studies (Justice, Ethics, and Human Rights)",
        school_ranking: null,
        fee: 90000,
        currency: {
            title: "USD",
            symbol: "$",
        },
        in_state_fee: null,
        description: null,
        program_title: "Human Rights Law",
        super_meta_title: "Law",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 10874,
            name: "American University Washington D.C.",
            user_name: "american-university-washington-d-c",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6InM4NHFxVm1aOVhtbDR3dmVHZkcwNlE9PSIsInZhbHVlIjoiQ2JIanNZSVZuQUFCSHBZZ0R6ckpiNjNwZC9PVCtzV1NhZ3dtbURJTGpSU2pmMXBEZlNTc1R0TU53enVZZlAyVzZWMnQ0OWc0WmxyNGk3anlYSStmYk80ODNLTVZYU0orTWpUdUdINDZlR2s9IiwibWFjIjoiMWMzY2YyYWM4NGI0MTE2YTIwM2QzZWM5MjQ5MDY4NTczMjZhMTcyMjFmZWI1OWIzOTRiNTQ0MGVmMzhlMWE0YiIsInRhZyI6IiJ9?expires=1745310570&signature=09e2990ae9306ecdf5a9031b675766b2d10624115de3458747914b1a45e7a386",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1300,
                    ielts: 7,
                    gpa: 3.6,
                },
            },
            address: {
                country_id: 182,
                lat: null,
                lng: null,
                country: "United States",
                state: "Washington",
                country_code: "US",
            },
        },
    },
    {
        id: 492223,
        title: "BA in Anthropology (Disasters, Displacement and Human Rights)",
        school_ranking: null,
        fee: 90000,
        currency: {
            title: "USD",
            symbol: "$",
        },
        in_state_fee: null,
        description: null,
        program_title: "Human Rights Law",
        super_meta_title: "Law",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 766,
            name: "University of Tennessee, Knoxville",
            user_name: "university_of_tennessee_knoxville",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6Ik9xMkYxaXhBMEtYMEVzNFRmeDhsTFE9PSIsInZhbHVlIjoiQ3pWcysyVy93SXl5b1ZCMXJHYktpbnpSQmd2ckN5SklDSTgrdXcza2twdTZjV21UUGlQcC9hRWxSQkQxSUl0cC8vWFhuMldMRkpEWVBLV29iWDloWXhtNGdkNngyajZaMHdHRWNYSHBtdEk9IiwibWFjIjoiYTBlOTk3OTI0NTZiMTczMTlmZWZkZTIzZmVjYTI0ODUzYTliMjM5NTQ1NjgxODkzMDUzNjAyOWY5MDA2ZjM2MSIsInRhZyI6IiJ9?expires=1745310570&signature=20b814b957d4509d42223965c9977c039907271ebad1e78c99b5463b901eae68",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1250,
                    ielts: 6.5,
                    gpa: 3.8,
                },
            },
            address: {
                country_id: 182,
                lat: null,
                lng: null,
                country: "United States",
                state: "Tennessee",
                country_code: "US",
            },
        },
    },
    {
        id: 486514,
        title: "BAcc in Accountancy",
        school_ranking: null,
        fee: 90000,
        currency: {
            title: "USD",
            symbol: "$",
        },
        in_state_fee: null,
        description: null,
        program_title: "Accounting",
        super_meta_title: "Business and Economics",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 10863,
            name: "Jessup University, USA",
            user_name: "jessup-university-usa",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IkUvTkp1ZHIwTGNVVk9OYnBIcE9sRkE9PSIsInZhbHVlIjoiTlFPc3lSUFVYZzhEM2pZVUVuejN1MXJ1VVhLcWE5T1N4MldtcU9CZEtGQ1BYMEJ1YVJURUVkTmxvZk5IWUNRNXd6ZGUxVm5YM3pYNzJSY1owK0dKdGc9PSIsIm1hYyI6IjM1ZjE2NDNkMGJjZDljOTVkNDI1ZDk0NDhhOGQ2MWM5MDI1MWMwMmQwYjYwMDRhMDczZjIzY2NiNDBlMTgyNzciLCJ0YWciOiIifQ==?expires=1745314928&signature=59539c5bd9e592318334bb9e5ccca502c50172cdcc368e0d0e3bc9721a2b30e0",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1100,
                    ielts: 6,
                    gpa: 3.5,
                },
            },
            address: {
                country_id: 182,
                lat: null,
                lng: null,
                country: "United States",
                state: "California",
                country_code: "US",
            },
        },
    },
    {
        id: 486573,
        title: "B.S in Accounting",
        school_ranking: null,
        fee: 90000,
        currency: {
            title: "USD",
            symbol: "$",
        },
        in_state_fee: null,
        description: null,
        program_title: "Accounting",
        super_meta_title: "Business and Economics",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 9471,
            name: "Nazareth University",
            user_name: "nazareth-university",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6Ilh6ZEhMNmtnMTNBZkg4aTdkdVp1N3c9PSIsInZhbHVlIjoickYwdFBnamRrb1F3VXlUOEt2TlhOTHNDMG1FSHNHSUR5Rkw5OVhiRHJsUytmSmlSbWV6UWxZaUpKSEtTMzdyK1N5bThHanFqeDROVDh3ZE5zblZoS1E9PSIsIm1hYyI6IjY0ZGVjMTA3NzBiMWJmOGEyYjJmZmUzNTYwNzZkMTM3NGZjY2I0Y2NjZDg0ZmZkYzdmYzA3MWY4NmM2MTM2ZDkiLCJ0YWciOiIifQ==?expires=1745314928&signature=0199816a889917303e0f15210acc834632562b32516189356a7de16e871c04d7",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1150,
                    ielts: 6.5,
                    gpa: 3.5,
                },
            },
            address: {
                country_id: 182,
                lat: null,
                lng: null,
                country: "United States",
                state: "New York",
                country_code: "US",
            },
        },
    },
    {
        id: 155280,
        title: "E-Commerce\/Electronic Commerce",
        school_ranking: 10,
        fee: 62840,
        currency: {
            title: "USD",
            symbol: "$",
        },
        in_state_fee: 62840,
        description: null,
        program_title: "E-commerce",
        super_meta_title: "Business and Economics",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 671,
            name: "Johns Hopkins University",
            user_name: "johns_hopkins_university",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IlRwTGQwY1pIU0lZYVQ4cWViQnU5VGc9PSIsInZhbHVlIjoiR2hXaW93QXZwbkx2N09ueHltRDBYdjZTOVo4akoxeU9SSFcwRmlkakE2dkZta0lrUzBoTW53ZGtndkIxcThlajYxMmZzNjFxZUN1YjdaNndUcDhkQWFMSGpjeW1Rb1B2TTZMd3UwMVR1amM9IiwibWFjIjoiOTUyMmNkNjVkMDdiZWEyOTIwOGEwNzc1OWNkMzI1MzkxOTNlMTZmYjZjMmNlMzE5OWRlNTUyM2U1YWQ1NzkyNiIsInRhZyI6IiJ9?expires=1745315585&signature=576724828fceee2bbe208ceab072837ab47318b4a25506cd6af80a5e2be0b89c",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1510,
                    ielts: 7.5,
                    gpa: 3.9,
                },
            },
            address: {
                country_id: 182,
                lat: null,
                lng: null,
                country: "United States",
                state: "Maryland",
                country_code: "US",
            },
        },
    },
    {
        id: 352321,
        title: "E-Commerce\/Electronic Commerce",
        school_ranking: 176,
        fee: 48300,
        currency: {
            title: "USD",
            symbol: "$",
        },
        in_state_fee: 48300,
        description: null,
        program_title: "E-commerce",
        super_meta_title: "Business and Economics",
        class_grades: [
            {
                id: 1,
                title: "Bachelor's",
            },
        ],
        school: {
            id: 828,
            name: "University of La Verne",
            user_name: "university_of_la_verne",
            avatar:
                "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6InR5ZGR4RDQzdjRYWWhsN082a1dSclE9PSIsInZhbHVlIjoiTmxzWWpaR1lPVFprVC9PV2JqdFBZYnh6Q1BlVkk5SXJFK1FEelB3Vk0rWjZkNUtCZ2lqL3JENmhFa3pQMEM3OVdQQkkrT2hqRXFPZ0hsai84aWJOalc1bmp3dGp1ZytYOFlZRFhrTXdldnc9IiwibWFjIjoiNTY3MWIyZjc3NTA2ZGYwZTZiZGZjNDY1MGU1ZDAyNWM0ZWJlZjE2OTliNzNlYTMyOTcxMjU5OWM0M2I4MmViMyIsInRhZyI6IiJ9?expires=1745315585&signature=9338ff728ec0742341cc3382a42b6ee44e7096e8dd872abaa996be28db42843e",
            cover_photo: null,
            admission_stats: {
                acceptance_rate: null,
                average_scores: {
                    sat: 1150,
                    ielts: 6,
                    gpa: 3.4,
                },
            },
            address: {
                country_id: 182,
                lat: null,
                lng: null,
                country: "United States",
                state: "California",
                country_code: "US",
            },
        },
    },
];
export const schoolDeatailList: SchoolDetail[] = [
    {
        id: 1,
        name: "Aberystwyth University",
        email: "ug-admissions123@aber.ac.uk_masked",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6InJuemFNVjZFMVZDdFl0anZhekxUL2c9PSIsInZhbHVlIjoidmFtS3dsRWJ6NkFlYThUbnlJRTJ3UDRvY09uS1pmRzFzNDV5TllLb3k2MUlNdkRPbVl2NVFuaDBOUmpScmJZb28vUVdnQmMyd2tmUi9DOGJxbjRmcHc9PSIsIm1hYyI6IjJiYzE2MTBmZjFkNTI0ZmJlM2RjYWQ1NDc1ZjI5NzkyZGZhNjYyMDVhOGNiMjM2YzI1MzhmNjA4MDM0NzY3NTMiLCJ0YWciOiIifQ==?expires=1745316519&signature=0058b736956ecaa648810dbcd04d81744a6859ae39f1e33e684913a2857919ce",
        cover_photo: null,
        user_name: "aberystwyth_university",
        ranking: 953,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: null,
                ielts: 6.5,
                gpa: 3.2,
            },
        },
        career_outcomes: {
            employment_rate: 0.92,
            median_salary: 28000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 8000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United Kingdom, Wales",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: "https:\/\/www.nu.edu\/",
            country: "United Kingdom",
            state: "Wales",
            description:
                "Entry Requirements: GPA 2.5 Completed application form High School Diploma & language certificate CV & letter of motivation Copy of your passport  Language Requirements: English language certificate \u2013 IELTS 5.5 overall \u2013 TOEFL iBT 72 \u2013 TOEFL ITP (paper based) 543 \u2013 Pearson Test of English (Academic) 59 \u2013 Pearson Test of English (General) Level 1 \u2013 Cambridge English Advanced and Proficiency 160 overall \u2013 Cambridge Exam First (FCE) \u2013 TOEIC Listening\/Reading 785, Speaking 160, Writing 150 \u2013 PASSWORD5.5 (no less than 5.0 in each component) \u2013 EF SET (50-minute Test) 51 (only for students applying with a MOI letter) \u2013 Duolingo 100",
        },
    },
    {
        id: 9519,
        name: "University of Birmingham - Edgbaston",
        email: "university-of-birmingham-edgbaston@unknown.com",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6InZTSHZzOWhVSGIzRFJMd2w0WC9jRVE9PSIsInZhbHVlIjoieHo4MHR2NURnVkZPVURvUEJlamY2Z3l5US9ZWDd0eEx6bUJNWVpmdjIvTGdtOWNYZlZPY25RcmxMQnB2ejdkcEtQTGJzQTE0cGRVMEQ2QUlLZFY2SkVxdjV6R1p3QzhwZWpiTERkZStoVE09IiwibWFjIjoiYmQ4YzFjNjg2Y2YxYzA3ODQyZTk1NmRhMzFiM2I1NGM1Yzk5OWU2ZTNlNzA0ZTY2OGZkYzA3MThiYTU1MTg1ZSIsInRhZyI6IiJ9?expires=1745316575&signature=b4c4c0ed391f9cf96ee4e1701c7eebb571fc3906eb16bc7c8323bc0c80d30430",
        cover_photo: null,
        user_name: "university-of-birmingham-edgbaston",
        ranking: null,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: null,
                ielts: 6.5,
                gpa: 3.6,
            },
        },
        career_outcomes: {
            employment_rate: 0.94,
            median_salary: 32000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 10000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United Kingdom, West Midlands",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "United Kingdom",
            state: "West Midlands",
            description:
                "Entry Requirements: The normal admission requirement for our taught postgraduate programmes is a 2:1 Honours degree or equivalent in a relevant discipline. For a Graduate Diploma you should have a degree or diploma or equivalent qualification in an appropriate field. Graduate Diploma students who achieve Masters level in their modules may be transferred to the Masters level. English Requirements: IELTS 6.0 with no less than 5.5 in any band. TOEFL: 80 overall with no less than 19 in Reading, 19 in Listening, 21 in Speaking and 19 in Writing. Pearson Test of English (PTE) Academic 64 with no less than 59 in all four skills. Cambridge English (exams taken from 2015): Advanced \u2013 minimum overall score of 169, with no less than 162 in any component. LanguageCert ESOL SELT (UKVI) - B2 'Communicator' with no less than 25 in each skill.",
        },
    },
    {
        id: 191,
        name: "University of Exeter",
        email: "ug-ad123@exeter.ac.uk_masked",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6InN6aEVTbVNTMlFQZVk0S3E3RWkxS0E9PSIsInZhbHVlIjoiekd5c0haQldKTVU2UCsxMEZsK3NkRnhVWFllejJad3NVQTRaRHc5UERsN1NnbExpMUR5MU9OanlsL2t5ZktWTVdUSTE2clZ4NW1nb1NMQ251UGhFdkE9PSIsIm1hYyI6IjM0NjZiYmE1NDYyMDZlNmIxOWIzZmZmMTQ1YWRjNTdhNDg2MTE3NGM4MGQ4Yzc0OWZhMTU3MWUwODE2YzA4MjUiLCJ0YWciOiIifQ==?expires=1745316676&signature=739cfb37a2596bb6018364658f671aaf2a9f2d62b143ff1d8cea64524d1650e4",
        cover_photo: null,
        user_name: "university_of_exeter",
        ranking: 152,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: 1350,
                ielts: 7,
                gpa: 3.6,
            },
        },
        career_outcomes: {
            employment_rate: 0.95,
            median_salary: 32000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 15000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United Kingdom, Devon",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "United Kingdom",
            state: "Devon",
            description:
                "English Language Requirements IELTS 5.0 (with nothing less than 5.0 in subskills and at least one subskill at 5.5) or equivalent.",
        },
    },
    {
        id: 509,
        name: "Royal Holloway University of London",
        email: "studentservices123@royalholloway.ac.uk_masked",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IkhrU0paV1NqR0Yvek5IT055VWpUOHc9PSIsInZhbHVlIjoiZWY1YVRCaXh5ak93bVEvNmEzc0x2cVJYNjFJa1lCWEdqeUhYT0Z4N21BSEJiYkgzcElWQUFkb3ZjbzJXUUxWTngrZ2tRcHN1UXN1REhqNGt3cktSYWtqVlFiY2VkTUE2NGw3OTcyVGQzUkU9IiwibWFjIjoiZTRhMjMyODVjMGZjOTQ2YjdhM2E5NWUyOWFiNGMwOTg5ZTg1ZGQ5MjFlODVhZDU5ZmU0NjkwNGYzZTIwYWIxMSIsInRhZyI6IiJ9?expires=1745316692&signature=c9c54a553038288996e7126d04db712759408422d8ed3031f7a39a21d2ca52fe",
        cover_photo: null,
        user_name: "royal_holloway_university_of_london",
        ranking: 301,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: 1300,
                ielts: 6.5,
                gpa: 3.5,
            },
        },
        career_outcomes: {
            employment_rate: 0.92,
            median_salary: 35000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 8000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United Kingdom, London",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "United Kingdom",
            state: "London",
            description: "'ielts': '6.5', 'academic_requirement': ''",
        },
    },
    {
        id: 10368,
        name: "University of York",
        email: "university-of-york@unknown.com",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IlhrSkw5aWx2ZDlsZGpNMUpPR1N2OXc9PSIsInZhbHVlIjoiQ3MybStXRGZjdEJBY1BKZWs4MzRNNkFyR09JdlU0V3U4NXpXd0ZEQ1Z3UCtabkI1bURrbVZ6ek5pSGd3eWlaWTlwWDB0ZWRoWXFaeVRTQ1pHMzR4ZWc9PSIsIm1hYyI6ImY2OGQ0MDBhNjZjY2FhYWFhZTNiN2MxZmYzNmY2NzFhYTdkZjMxZTQzYTNlYTQwMmRjNjgwMDE0YWE0MDAzNGUiLCJ0YWciOiIifQ==?expires=1745316714&signature=70b5e55e1d59ac60b233d4a631ad0b85d7ea5b0e1c5ae6db57debdbaccd2f0d0",
        cover_photo: null,
        user_name: "university-of-york",
        ranking: null,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: 1400,
                ielts: 7,
                gpa: 3.7,
            },
        },
        career_outcomes: {
            employment_rate: 0.94,
            median_salary: 38000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 14000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United Kingdom, Yorkshire",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "United Kingdom",
            state: "Yorkshire",
            description:
                "Entry Requirements: Our Undergraduate Summer School has no formal academic requirements. You will be asked to provide details of your current studies. If you are not currently enrolled in an undergraduate (Bachelors) programme, please contact our team to discuss suitability. You must have turned 18 before your programme starts.  English Language Requirements: The programme is suitable for both native speakers of English and students learning English as a second\/foreign language. While there is no formal language requirement, for most modules, a good upper-intermediate level of English is strongly recommended (approximately CEFR B2 or IELTS 5). For the English Language Academic and Intercultural Skills module, an intermediate level of English is recommended (approximately CEFR B1 or IELTS 4.5).",
        },
    },
    {
        id: 1,
        name: "Aberystwyth University",
        email: "ug-admissions123@aber.ac.uk_masked",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IkdQTXpid0FJR05hV0RYS2piNk5mSVE9PSIsInZhbHVlIjoiZ2hQMnVMcGlnQ2ZscVVaUFk5bVQvcG1ucVVZODAvVlJ1bzdIbDlxa2NMbXg1c01SUktUdk1BNFNaMDdxbndubDVtd1FiRTE1dms1bnZXS0tPQk9pd0E9PSIsIm1hYyI6IjFlMzFjYmZmM2RhYTQwMzg3YjU4ZDI1ZGUwZTc3OTE0ZDBjMzNiZjkxNjNhMzkwMWQ1ODk5NWYyNmM2MmQzZTkiLCJ0YWciOiIifQ==?expires=1745316732&signature=9bf788eccbe882a7b313e01d337da4956a4cf5c37a172f18a9e62044d13d31e7",
        cover_photo: null,
        user_name: "aberystwyth_university",
        ranking: 953,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: null,
                ielts: 6.5,
                gpa: 3.2,
            },
        },
        career_outcomes: {
            employment_rate: 0.92,
            median_salary: 28000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 8000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United Kingdom, Wales",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: "https:\/\/www.nu.edu\/",
            country: "United Kingdom",
            state: "Wales",
            description:
                "Entry Requirements: GPA 2.5 Completed application form High School Diploma & language certificate CV & letter of motivation Copy of your passport  Language Requirements: English language certificate \u2013 IELTS 5.5 overall \u2013 TOEFL iBT 72 \u2013 TOEFL ITP (paper based) 543 \u2013 Pearson Test of English (Academic) 59 \u2013 Pearson Test of English (General) Level 1 \u2013 Cambridge English Advanced and Proficiency 160 overall \u2013 Cambridge Exam First (FCE) \u2013 TOEIC Listening\/Reading 785, Speaking 160, Writing 150 \u2013 PASSWORD5.5 (no less than 5.0 in each component) \u2013 EF SET (50-minute Test) 51 (only for students applying with a MOI letter) \u2013 Duolingo 100",
        },
    },
    {
        id: 506,
        name: "University Reading",
        email: "ifpadmissions123@reading.ac_masked",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IndacGZjS1hVZnpLK2o0a3hBN2tVU3c9PSIsInZhbHVlIjoiQmN6OHB6VzEzelFaR2ZVWEpoaElQWk02MnRPNU1LQWsvTXQxMnpYdWVVNWRKOEM4OVJLY0FoNXZoSEVKaUYyalFTSXoycWZlVEQxYkMrVlZMOVRCZ0E9PSIsIm1hYyI6IjhhMjFmYTkzZTMxNThkZTE2YTEzMTgxM2I5NzVhNDE3MzlmNzBjNGRhOWIxY2UyMTU5YTYyODc5NjAyOTcyYjEiLCJ0YWciOiIifQ==?expires=1745316773&signature=2e10d8cbb1dcedaeb89dfdbe265c8b885bae13e2ec0842b5dce8410109e42094",
        cover_photo: null,
        user_name: "university_reading",
        ranking: 333,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: 1300,
                ielts: 6.5,
                gpa: 3.5,
            },
        },
        career_outcomes: {
            employment_rate: 0.92,
            median_salary: 35000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 8000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United Kingdom, Reading",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "United Kingdom",
            state: "Reading",
            description:
                "English Requirements: IELTS - 6.0 no skill less than 5.5 You will need to provide: Copies of your English language certificate\/s: IELTS\/TOEFL. (If you need a visa to study in the UK, your IELTS exam must be UKVI). A copy of the identification page of your passport. A copy of your offer letter from your chosen university (if you will not be studying your degree programme at Reading).",
        },
    },
    {
        id: 505,
        name: "Durham University",
        email: "admissions123123@du.uk_masked",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IjlpQzJDV1ZjOUNaUCt4MXVsOVVyZmc9PSIsInZhbHVlIjoiYWF2YWc0bkZYb3E0V1pvQVk3ellVQTVkM0xCV2Y3eXlhSkExMUZjaG5rdTFKSlZ4VXpseGlvZ2k0ZG5xU3lVRk9oMm8yaTltVm1XQUd1Zm1Ucng1OXc9PSIsIm1hYyI6ImE0MGFmODBhYjYzYTllNzg1NGRkOGNhNDA2NDM0MzE1YWNjMGRjNDhkMjk0ZWFiMGYxYzJiZDRkYzAxMjY3ZDYiLCJ0YWciOiIifQ==?expires=1745316776&signature=2a1156a99f95e2449d6d085916d5a204d40d8e4611ec6d0a145321ffec3ba94e",
        cover_photo: null,
        user_name: "durham_university_1",
        ranking: 78,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: null,
                ielts: 7,
                gpa: 3.7,
            },
        },
        career_outcomes: {
            employment_rate: 0.94,
            median_salary: 30000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 9000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United Kingdom, Durham",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "United Kingdom",
            state: "Durham",
            description: "'ielts': '6.5', 'academic_requirement': ''",
        },
    },
    {
        id: 9978,
        name: "Royal Melbourne Institute of Technology (RMIT) - Training",
        email: "royal-melbourne-institute-of-technology-rmit-training@unknown.com",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IjJWMTRJR2dsUTN0ZmVmSDJmUmZiRlE9PSIsInZhbHVlIjoiTjltVDZubWF0RGVCbEY2aWdhRW1HVFVOMXpwNUhLWWlKcDlxQXp5aDVHTVJJeEpSTEMvK3lyc1NLdUtSYXN6eTNrOVVNOEQ1dGYrRmVvKzF5L3hlT1pUa01vN1V1MWcyOTJjMFd4ZFRTemZCYStWSUxhYWw5S3Y4OCtqdGNKOEMiLCJtYWMiOiI3MzYzYzA4OTVhZjg2NTZmMjQ0ZWQ4OWZlNjY4NjhkYTJhNzY4YzQzYzU1Y2IzZjMwNGQyNmExNDAzNWE2ZWE1IiwidGFnIjoiIn0=?expires=1745316779&signature=910ba9e9e6d4faf1b9e6945b08afc1c29d28c1dbbdab9740147ed5266580cc1d",
        cover_photo: null,
        user_name: "royal-melbourne-institute-of-technology-rmit-training",
        ranking: null,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: null,
                ielts: 6.5,
                gpa: 3.2,
            },
        },
        career_outcomes: {
            employment_rate: 0.9,
            median_salary: 70000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 15000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "Australia, Victoria",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "Australia",
            state: "Victoria",
            description: null,
        },
    },
    {
        id: 9953,
        name: "Murdoch College",
        email: "murdoch-college@unknown.com",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6ImhMRi90cXB0UXI4elB1K1R2aWhpUVE9PSIsInZhbHVlIjoiclhuenVOWVkyUHNpV3lIcmR5N1dra29JZVovSVRWZHJoTExkMHA0WU15Tyt3d1FjSDJXLzNlL3VsNnZDSHJtOHEzVUpFRFdrTUgxQW13Zjh5RXRIMnc9PSIsIm1hYyI6IjIzMmE3YTEwNTU2OTBjMTUzNDEyOWRlM2Y1M2ZmMTUzNTk1ZjIyNjhlNWZkZDI4ZGUyODIwYjc0NTVmYWM2MjYiLCJ0YWciOiIifQ==?expires=1745316783&signature=82fa71bf3d0149a33faabbc4e0d38cd60046c5ab4ec6d0c5e1f787deb15080f3",
        cover_photo: null,
        user_name: "murdoch-college",
        ranking: null,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: null,
                ielts: 6,
                gpa: 3,
            },
        },
        career_outcomes: {
            employment_rate: 0.75,
            median_salary: 58000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 10000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "Australia, Australian Capital Territory",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "Australia",
            state: "Australian Capital Territory",
            description: null,
        },
    },
    {
        id: 9923,
        name: "University of New England - Armidale",
        email: "university-of-new-england-armidale@unknown.com",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6Im41N2hGVW94a0dOeXJHWHhuMEVlT3c9PSIsInZhbHVlIjoicCttRzRHWFU0c29LZ2hTR2NCTjI3T2g4MHdOV2w3ZWtNM2pYR056aFpWeG5NZG9Hdytzc1pUWi9pQ0EwYzlqbVRFRS9UbzlVUXZadVhjY2hFblo2NFpmYXZveklGYitCeXQ2SkN1WXA0KzQ9IiwibWFjIjoiYzE4N2VlYmE2Y2QzYmU2NjgzYTAzM2IwM2UyYjU0YWUyNmJiOTUyNzEwOGFhNjgxYzExOWY0Mjk5NzkyMThjZCIsInRhZyI6IiJ9?expires=1745316918&signature=c9b53f3b4ef08881c93d93ae11a3e10c7e60e4c3a60de261971890649c488584",
        cover_photo: null,
        user_name: "university-of-new-england-armidale",
        ranking: null,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: null,
                ielts: 6.5,
                gpa: 6,
            },
        },
        career_outcomes: {
            employment_rate: 0.85,
            median_salary: 65000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 12000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "Australia, New South Wales",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "Australia",
            state: "New South Wales",
            description: null,
        },
    },
    {
        id: 9192,
        name: "Coquitlam College",
        email: "Admissions123@coquitlamcollege.ca",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6InM5TW1pUVZmK3Yrb3AzSEljbjFaL1E9PSIsInZhbHVlIjoiYUJCNkJxa3dSb0NmWU9FeVJ4dkhNS0JZOE40NTN3RmNzQ3VGMHpnYzMzMGpzb2RkWExadG5iVXJvbjA4NnFJRVlYdFZEamNxaGlKVlM4d1FvT0NjRVE9PSIsIm1hYyI6Ijg1NmNjMmViNDFmZjcwOGZmMDUzZTBhNmM0ZmM2ZGFkZTEyY2E2ZTMzMWY2ZWNiMzhlNmFhOTQ5OWNhYjBiNjAiLCJ0YWciOiIifQ==?expires=1745316921&signature=b32fdbbb3815eb174f33abf5c98b818843ecd94abc129d69d6c16571d572cc75",
        cover_photo: null,
        user_name: "coquitlam_college",
        ranking: 9999,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: null,
                ielts: 6,
                gpa: 2.8,
            },
        },
        career_outcomes: {
            employment_rate: 0.7,
            median_salary: 45000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 5000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "Canada, British Columbia",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "Canada",
            state: "British Columbia",
            description:
                "Entry Requirements: A high school diploma or school completion certificate. A vocational\/technical\/polytechnic diploma with a 60% or higher average. Mature student status   English Requirements:  ENGL 099: IELTS (Academic): 5.5 Overall (5.5 Reading, 5.5 Writing, 5.5 Speaking, 5.5 Listening) PTE (Academic): 60 Overall (55 Reading, 55 Writing, 55 Speaking, 55 Listening) TOEFL IBT: 75 Overall (17 Reading, 17 Writing, 17 Speaking, 17 Listening) CAEL: 50-59 BC EN 12: 50%-59% Duolingo: 95-104 (95 literacy)   ENGL 100: IELTS (Academic): 6.0 Overall (6.0 Reading, 6.0 Writing, 5.5 Speaking, 5.5 Listening) PTE (Academic): 60 Overall (60 Reading, 60 Writing, 55 Speaking, 55 Listening) TOEFL IBT: 80 Overall (19 Reading, 19 Writing, 19 Speaking, 19 Listening) CAEL: 60-69 BC EN 12: 60%-66% Duolingo: 105 (100 literacy)   ENGL 101: IELTS (Academic): 6.5 Overall (6.0 Reading, 6.0 Writing, 6.0 Speaking, 6.0 Listening) PTE (Academic): 65 Overall (60 Reading, 60 Writing, 60 Speaking, 60 Listening) TOEFL IBT: 86 Overall (20 Reading, 20 Writing, 20 Speaking, 20 Listening) CAEL: 70 BC EN 12: 67% minimum Duolingo: 110 (105 literacy)",
        },
    },
    {
        id: 9192,
        name: "Coquitlam College",
        email: "Admissions123@coquitlamcollege.ca",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IllsaXloODZMSW56dlBSYTZzcmx0alE9PSIsInZhbHVlIjoiNzZPeVFiS0dBbEMzTFd2dUVuV05FMGMzSDhDT1RyRlU5aDJnQ1NQd09IV0VjVVRVTGpKSFAzN1BpN0JtS1BUKzNZMU5kVGlvRXYxelJGYXpESE1kZlE9PSIsIm1hYyI6IjEzZDhlODBlZGQyNWFmYWU4MGFhNzQzZGUwMDkxYzE5YWI4NDA1NTUyN2I1OGYzNDUwNTlmYzI3YzVmYmE4NjMiLCJ0YWciOiIifQ==?expires=1745316924&signature=518ab009fabca4d7be0f43bf6bb8954f32eb933fe62bf769c9beb0abdd9726b8",
        cover_photo: null,
        user_name: "coquitlam_college",
        ranking: 9999,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: null,
                ielts: 6,
                gpa: 2.8,
            },
        },
        career_outcomes: {
            employment_rate: 0.7,
            median_salary: 45000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 5000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "Canada, British Columbia",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "Canada",
            state: "British Columbia",
            description:
                "Entry Requirements: A high school diploma or school completion certificate. A vocational\/technical\/polytechnic diploma with a 60% or higher average. Mature student status   English Requirements:  ENGL 099: IELTS (Academic): 5.5 Overall (5.5 Reading, 5.5 Writing, 5.5 Speaking, 5.5 Listening) PTE (Academic): 60 Overall (55 Reading, 55 Writing, 55 Speaking, 55 Listening) TOEFL IBT: 75 Overall (17 Reading, 17 Writing, 17 Speaking, 17 Listening) CAEL: 50-59 BC EN 12: 50%-59% Duolingo: 95-104 (95 literacy)   ENGL 100: IELTS (Academic): 6.0 Overall (6.0 Reading, 6.0 Writing, 5.5 Speaking, 5.5 Listening) PTE (Academic): 60 Overall (60 Reading, 60 Writing, 55 Speaking, 55 Listening) TOEFL IBT: 80 Overall (19 Reading, 19 Writing, 19 Speaking, 19 Listening) CAEL: 60-69 BC EN 12: 60%-66% Duolingo: 105 (100 literacy)   ENGL 101: IELTS (Academic): 6.5 Overall (6.0 Reading, 6.0 Writing, 6.0 Speaking, 6.0 Listening) PTE (Academic): 65 Overall (60 Reading, 60 Writing, 60 Speaking, 60 Listening) TOEFL IBT: 86 Overall (20 Reading, 20 Writing, 20 Speaking, 20 Listening) CAEL: 70 BC EN 12: 67% minimum Duolingo: 110 (105 literacy)",
        },
    },
    {
        id: 669,
        name: "Duke University",
        email: " undergrad-admissions@duke.edu_masked",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IjJEZy8wczY5TVVzSEFDQnRkWnRSd2c9PSIsInZhbHVlIjoiSlhGSUg0dTFGc0pyVGhmQSthU1AyNnQ4ZHIrbmVQUDBWaVl6NjNPOU91OEFlWnI3L1NSQ2taRGsvY2xKOFpDclRscGZmSHBUeHVkU0dCQWc2YjVBWmc9PSIsIm1hYyI6IjUwYjFjNTAwMTc0MmQ0MTc3MzNlMzJkNDJhMjQzMjY1N2FhNTg2NDk1ZGNjNzRlN2YyNTE3MGE1ZTAxNjE4OTQiLCJ0YWciOiIifQ==?expires=1745316928&signature=d2debc285373cb5eb1f9cbe89f3c247145dda1ec82b3695c2e150ae17f6d28a4",
        cover_photo: null,
        user_name: "duke_university",
        ranking: 8,
        admission_stats: {
            acceptance_rate: 6,
            average_scores: {
                sat: 1540,
                ielts: 7.5,
                gpa: 4,
            },
        },
        career_outcomes: {
            employment_rate: 0.92,
            median_salary: 75000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 48000,
            housing: 9164,
            meals: 6862,
            housing_and_meal: 16026,
        },
        campus_overview: {
            location: "United States, North Carolina",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On  & off-campus",
            extra_curriculum:
                "All Track Combined Baseball Basketball Diving Fencing Football Golf Lacrosse Soccer Swimming Swimming and Diving Tennis Track and Field: Indoor Track and Field: Outdoor Track and Field: X-Country Wrestling",
        },
        about: {
            website: "https:\/\/duke.edu",
            country: "United States",
            state: "North Carolina",
            description:
                "Duke admissions is extremely selective with an acceptance rate of 6. Students that get into Duke have an average SAT score between 1470-1570 or an average ACT score of 33-35. The regular admissions application deadline for Duke is January 2. Interested students can apply for early decision and the Duke early decision deadline is November 1.",
        },
    },
    {
        id: 671,
        name: "Johns Hopkins University",
        email: "gotojhu@jhu.edu_masked",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6Im1qaDBRMHFRTkRyaDltOWJ1ZWJSSEE9PSIsInZhbHVlIjoicUZCbXkvZXNIaXl3Skh6OFJrSXZjLytoazJ1ZWg5NC8vVWlVV2xzL29kWjVMWHdVN0VrYnFnSkF2SkMwMjBucXlYSmZJeHZhckd6a3MybjFHdGNCbG9SYXJpMXQzTzJjemZGSUVBeE5JQzA9IiwibWFjIjoiZGMxMTJmNjRjNTVjNjllZjBlNGZmZDQwNDlhMTU2ZjVhMDlhMjQ0NThkOTQ0MjhlY2NhZDYxMzZlYzk2MTE4NyIsInRhZyI6IiJ9?expires=1745317007&signature=ed98dc984a4fc32dce94fec9235762a56c5f0cb6277ff6e0d7dda728c96fd6b4",
        cover_photo: null,
        user_name: "johns_hopkins_university",
        ranking: 10,
        admission_stats: {
            acceptance_rate: 11,
            average_scores: {
                sat: 1510,
                ielts: 7.5,
                gpa: 3.9,
            },
        },
        career_outcomes: {
            employment_rate: 0.92,
            median_salary: 72000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 48000,
            housing: 9736,
            meals: 7064,
            housing_and_meal: 16800,
        },
        campus_overview: {
            location: "United States, Maryland",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On  & off-campus",
            extra_curriculum:
                "All Track Combined Baseball Basketball Fencing Football Lacrosse Soccer Swimming Tennis WaterPolo Wrestling",
        },
        about: {
            website: "https:\/\/www.jhu.edu\/",
            country: "United States",
            state: "Maryland",
            description:
                "Admission requirements:  A Bachelor's Degree with a 3.0 Minimum GPA      English Language Requirements:  IELTS 7.0 recommended   TOEFL 100 Recommended   ITEP Scores accepted (the academic year 2021\u20142022 only) ",
        },
    },
    {
        id: 1775,
        name: "California State University-Long Beach",
        email: "cie-admission@csulb.edu",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6InlkYTRzS0xnampTU2xVeVFpQjlMaVE9PSIsInZhbHVlIjoiMEkwZktvSnp3SVl6eWQ2NWNuQ1NuN3ZSSExRY0wzMklQMFl1L1VuV2lvSUdkeEJRRk5rMTg3L2lhaGJHM3BVMkd0ejBiWGxqWTZCTHJOZ053d3A3c2tWVmNDeThwMndQNnNIUEdZVE1WVTg9IiwibWFjIjoiYzJlMmEzZmJhNjI0ZTk3MThjNjU1NDgxYzdhODJiODk4MDBhNjQ3Y2E3NjhjZTdmMGIxOTVmZmU4MzJjNTlmNyIsInRhZyI6IiJ9?expires=1745317009&signature=138c8106fe8e4d84aba24a2b3ed5a396dc49f42670c3d21a8719aba17c6a81b4",
        cover_photo: null,
        user_name: "california_state_university_long_beach_2023122257",
        ranking: 1617,
        admission_stats: {
            acceptance_rate: 0,
            average_scores: {
                sat: 1150,
                ielts: 6.5,
                gpa: 3.4,
            },
        },
        career_outcomes: {
            employment_rate: 0.75,
            median_salary: 55000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 12000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United States, California",
            type: null,
            total_students: 40190,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "United States",
            state: "California",
            description: null,
        },
    },
    {
        id: 1775,
        name: "California State University-Long Beach",
        email: "cie-admission@csulb.edu",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6Ikd5UnVNdmF2aHc5d0lzZHlVMGNDWnc9PSIsInZhbHVlIjoicURraHdZS0tjVDZUT0FnSTdOVm1sREZNVmY1WnIvTXVtUW02Z0F6WEtCbVNFaXZuVGJNTG1ZODZrbTRDMC8rVTg3WjhxRVZiUGxGVkVCTFVocEFDZDFPek1RdnkzSEdZWnVDeVVjckxwc2s9IiwibWFjIjoiOThhZmY5ZTUyMDA5ZmUyM2UzNDAwNmIwZjc2MzEzMWZiMWE1MTUzM2JjMDI0MDUyYzE5ZDk4MmE3YWY1YzQ4MCIsInRhZyI6IiJ9?expires=1745317011&signature=da27be1f12ca4a47fe8b98ff7d38f43322735165e893fa4181363464db1016c8",
        cover_photo: null,
        user_name: "california_state_university_long_beach_2023122257",
        ranking: 1617,
        admission_stats: {
            acceptance_rate: 0,
            average_scores: {
                sat: 1150,
                ielts: 6.5,
                gpa: 3.4,
            },
        },
        career_outcomes: {
            employment_rate: 0.75,
            median_salary: 55000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 12000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United States, California",
            type: null,
            total_students: 40190,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "United States",
            state: "California",
            description: null,
        },
    },
    {
        id: 10874,
        name: "American University Washington D.C.",
        email: "american-university-washington-d-c@unknown.com",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IitxK3BEMjM0Uk5XYkQyMGZ4MWZ1Z1E9PSIsInZhbHVlIjoicG5qK0ZVYkhLdnhGdTFPRE5nc0NHYkVQQ0VZbW1uMkNpS3Q3VEk2RC9KNXRpQ1ZuL3R6ajZUdkx4QUQ1VVRia280S1RmV3BRNktGYTV0T05CMEdUYTFjWmloeDF2b01IY2M5K3A1bWV4YTQ9IiwibWFjIjoiNjFiZWQwMGI2Y2QxMGY4ZjRjM2RlMjZlZWU2NjZhOThhODRhMDgxNDM4ZTFlZGJhYWY5ZjlkNGRlNDgyYjg3OSIsInRhZyI6IiJ9?expires=1745317014&signature=c64ea3517cae48cdd15f429666111741ce85de3d9afdab0b92da1a078d9b6593",
        cover_photo: null,
        user_name: "american-university-washington-d-c",
        ranking: null,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: 1300,
                ielts: 7,
                gpa: 3.6,
            },
        },
        career_outcomes: {
            employment_rate: 0.92,
            median_salary: 65000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 32000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United States, Washington",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "United States",
            state: "Washington",
            description: null,
        },
    },
    {
        id: 766,
        name: "University of Tennessee, Knoxville",
        email: "admissions@utk.edu_masked",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6Iml4dFVpbWN6R0xNNXRDVUQwd3hiNlE9PSIsInZhbHVlIjoiK0IwendpYlpXWExwWkcvZ01IYW1TSElTYmsvbDc2VHdOU2JhODhSTlgyby9iaGFiUGMybC9sejRPT3dEOUpzcngzS2Exc1pPQWZKNFAxTis5N3hyS2EyakFKY2dqQUhOc0YyajdtMWFKd3M9IiwibWFjIjoiN2ZmMTlhMTdkNWNkYWNlYzgyZDdiYjJmMjUwMDNkYmI5YzE4MzQwMzliNzNlNTI5MzgwZjg1Nzk2ZDJhYzIzZCIsInRhZyI6IiJ9?expires=1745317101&signature=6e20a007ab96598dbb004adbf14a6b6c5beeb784a69f00946fb2ea2bd5e9c668",
        cover_photo: null,
        user_name: "university_of_tennessee_knoxville",
        ranking: 112,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: 1250,
                ielts: 6.5,
                gpa: 3.8,
            },
        },
        career_outcomes: {
            employment_rate: 0.8,
            median_salary: 70000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 22000,
            housing: 0,
            meals: 0,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United States, Tennessee",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On  & off-campus",
            extra_curriculum:
                "All Track Combined Baseball Basketball Football Golf Swimming and Diving Tennis",
        },
        about: {
            website: "https:\/\/www.utk.edu\/",
            country: "United States",
            state: "Tennessee",
            description:
                "Entry Requirement:  Bachelor\u2019s degree from an accredited college or university with a 2.7 out of 4.0 GPA or 3.0 GPA during the senior year of undergraduate study. The student must have a bachelor\u2019s degree from an accredited institution in forestry, wildlife, fisheries, or another natural resource area, or a professional degree in medicine (including veterinary medicine), or law. Applicants must take the general Graduate Record Examination with minimum scores required. Graduate Rating Forms or letters of recommendation from three individuals familiar with the applicant\u2019s academic ability are required.   English Requirements: TOEFL (IBT) : total score of 80 IELTS: 6.5",
        },
    },
    {
        id: 10863,
        name: "Jessup University, USA",
        email: "jessup-university-usa@unknown.com",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6Ik1MdHNzNXQ4YjhMYlJ0N25kR1Ztcnc9PSIsInZhbHVlIjoiR0dlVk1NaEJNUTZZTk5HaCtDMkF4TlBrQ3Riem93N1NSamd1QnoyWjNtTk5SWDQ5RktTeFBUQjNlajlRZFNJbHdpVjFBM0dpSFFtQ1VOUHVQaVJ1cFE9PSIsIm1hYyI6IjY2YjJjMmU2NTFkMTA1N2VkNWEyMGNmOTA0ZjJhY2E2ODQ5ZThhMjc2NWM1ZjYzYWVlYmQxZmI0Y2UyZTA0N2QiLCJ0YWciOiIifQ==?expires=1745317103&signature=fa08b3aefe48b76fe96404fb59e7b4b546babc61cb1d1e117b4bb1b991642a4e",
        cover_photo: null,
        user_name: "jessup-university-usa",
        ranking: null,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: 1100,
                ielts: 6,
                gpa: 3.5,
            },
        },
        career_outcomes: {
            employment_rate: 0.88,
            median_salary: 48000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 20000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United States, California",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "United States",
            state: "California",
            description: null,
        },
    },
    {
        id: 9471,
        name: "Nazareth University",
        email: "nazareth-university@unknown.com",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IlhwdXh2VExaZXBFZThJL0pETUhiYXc9PSIsInZhbHVlIjoiQTJ1ejdmQVdid0NGMVJJaFp5bmpKMldITlphbHVwYzc0aVhudSt4ZlJuUEM2YWl6MktIUkhuWFljdS9UdjFDTXFjaU1VcGQzOXBYY3lWZEtqTjZnc0E9PSIsIm1hYyI6IjA0Nzk5M2JiMTllNjZhNDBjNWRjNmE1NTI1ODRjYTQ0ZDY1ZjliNjliOTY5ZmZjYTRiZjM4OWZiZTVkYzAzNTciLCJ0YWciOiIifQ==?expires=1745317107&signature=92df015e5fbb560067e3d22a2cb14ac5cc8fb35faa9f15be19da05b086743195",
        cover_photo: null,
        user_name: "nazareth-university",
        ranking: null,
        admission_stats: {
            acceptance_rate: null,
            average_scores: {
                sat: 1150,
                ielts: 6.5,
                gpa: 3.5,
            },
        },
        career_outcomes: {
            employment_rate: 0.92,
            median_salary: 55000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 25000,
            housing: null,
            meals: null,
            housing_and_meal: 0,
        },
        campus_overview: {
            location: "United States, New York",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On ",
            extra_curriculum: null,
        },
        about: {
            website: null,
            country: "United States",
            state: "New York",
            description: null,
        },
    },
    {
        id: 671,
        name: "Johns Hopkins University",
        email: "gotojhu@jhu.edu_masked",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IlZ5cVNnb2Rscmg4V2ZuOTA5L0txMWc9PSIsInZhbHVlIjoiUlJmZ1E5SmtrRUIvV296QmhZNlZqckxmNnJUS3B1REgvYmJpOWxvbGFjNlpMQUVFR29GQmlhYVhpdDhJSkN4bGU1VFBsRDhOUjdyMGRvSncrSDRiWEFoa1hHc1ZWWkRZdnQyS3BtMG1Nb2s9IiwibWFjIjoiOTk2NGUwYTNiNjQwMmRlYTAyZmE5ZTBkYWZlZDNlNmJkYTNkMjYwNjgyOTMzY2U2ZDdjNDEwODAzMzUxM2E1NSIsInRhZyI6IiJ9?expires=1745317109&signature=45f677ec0b1c9385be6681e67b40391a51b1c669c657a94db6bb887abbf556ba",
        cover_photo: null,
        user_name: "johns_hopkins_university",
        ranking: 10,
        admission_stats: {
            acceptance_rate: 11,
            average_scores: {
                sat: 1510,
                ielts: 7.5,
                gpa: 3.9,
            },
        },
        career_outcomes: {
            employment_rate: 0.92,
            median_salary: 72000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 48000,
            housing: 9736,
            meals: 7064,
            housing_and_meal: 16800,
        },
        campus_overview: {
            location: "United States, Maryland",
            type: null,
            total_students: null,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On  & off-campus",
            extra_curriculum:
                "All Track Combined Baseball Basketball Fencing Football Lacrosse Soccer Swimming Tennis WaterPolo Wrestling",
        },
        about: {
            website: "https:\/\/www.jhu.edu\/",
            country: "United States",
            state: "Maryland",
            description:
                "Admission requirements:  A Bachelor's Degree with a 3.0 Minimum GPA      English Language Requirements:  IELTS 7.0 recommended   TOEFL 100 Recommended   ITEP Scores accepted (the academic year 2021\u20142022 only) ",
        },
    },
    {
        id: 828,
        name: "University of La Verne",
        email: "admission@laverne.edu_masked",
        avatar:
            "http:\/\/bk.arrowster.com\/temporary-file\/eyJpdiI6IklocWliYmUvMERLb05sbTF5Y2JPZlE9PSIsInZhbHVlIjoiWis1VTlGQTFUb29uN1FWYUo4a3NDRXJzRXFTZmRKWm5HUWJ0NzVpNVlBSUx2a1RDamFvall4QmptaVBRdERPSjA3b1JRVStCV3MxOHA4cERDY0F5Skl0MEFDMDRJVGlJT3hLQW9laXFicWc9IiwibWFjIjoiMDM0NDQzMTFmOTNmZDUwMDQ3MzI3MzIyZDViODM0NGMxZTAxYTFkNzM3MjA1NGU3MTM0N2U3MzQyMmY5YzdhNCIsInRhZyI6IiJ9?expires=1745317113&signature=ba86a379e12c2a3efc94e2628e2d8116bd28eb8cd25fe2f04848340625f5abbc",
        cover_photo: null,
        user_name: "university_of_la_verne",
        ranking: 176,
        admission_stats: {
            acceptance_rate: 76,
            average_scores: {
                sat: 1150,
                ielts: 6,
                gpa: 3.4,
            },
        },
        career_outcomes: {
            employment_rate: 0.88,
            median_salary: 52000,
        },
        financial_and_aid_cost: {
            average_financial_aid: 22000,
            housing: 8660,
            meals: 6820,
            housing_and_meal: 15480,
        },
        campus_overview: {
            location: "United States, California",
            type: null,
            total_students: 6201,
        },
        surroundings: {
            option_1: "updating",
            option_2: "updating",
        },
        campus_life: {
            housing: "On  & off-campus",
            extra_curriculum:
                "Baseball Basketball Football Golf Soccer Swimming and Diving Track and Field: Outdoor Track and Field: X-Country Water Polo",
        },
        about: {
            website: "https:\/\/laverne.edu\/",
            country: "United States",
            state: "California",
            description:
                "La Verne admissions is somewhat selective with an acceptance rate of 72. Students that get into La Verne have an average SAT score between 930-1150 or an average ACT score of 17-24. The regular admissions application deadline for La Verne is rolling.",
        },
    },
]
export const pagination = {
    path: "http:\/\/bk.arrowster.com\/api\/v2\/session-based-journey\/recommendation\/pre-run-engine",
    current_page: 1,
    last_page: 1,
    per_page: 10,
};

export const preApplication: Application = {
    id: 1,
    title: "PRE-APPLICATION",
    country_title: null,
    description:
        "Take a moment to consider how these four key steps - choosing your major, focusing your activities, joining competitions, and exploring internships - create a strategic foundation for your college journey. Together, they build compelling evidence that demonstrates not just your interests, but your real commitment to and experience in your chosen field of study.",
    view: 0,
    disabled: 0,
    tasks: [
        {
            id: 1,
            title: "Discover your strength and weakness",
            button_text: "Have a question? Contact our Counsellor",
            category: {
                id: 1,
                title: "career",
            },
            estimated_time: "11th Grade Fall",
            type: "optional",
            description:
                '<p>Take this MBTI test to discover your true self!<\/p><ul class="flex flex-col gap-1 list-inside list-disc"><li class="-indent-6 pl-6">One of the most important elements of a compelling college application is authentic self-reflection. The ability to understand and convey your true identity shapes every aspect of your application.<\/li><li class="-indent-6 pl-6">This test serves as a starting point for deeper self-exploration. Rather than accepting the results at face value, use them as a catalyst to examine who you are and what you aspire to achieve. These insights will not only strengthen your college applications but also guide your broader life journey.<\/li><\/ul>',
            checked: false,
            users: [],
            remarks: null,
            resources: [
                {
                    link: "https:\/\/www.16personalities.com\/free-personality-test",
                    text: "Link to MBTI Test",
                },
            ],
        },
        {
            id: 2,
            title: "Find your ideal careers",
            button_text: "Confirm major choice with a Counsellor",
            category: {
                id: 1,
                title: "career",
            },
            estimated_time: "11th Grade Fall",
            type: "optional",
            description:
                '<p>Understanding your career path begins with understanding yourself. The O*NET Interest Profiler is a thoughtfully designed tool that helps illuminate the types of work that would bring you genuine satisfaction and engagement. It measures six fundamental dimensions of work interests:<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5">Realistic: Your connection to hands-on work with tools, machines, and physical projects<\/li><li class="-indent-6 pl-0.5">Investigative: Your drive to analyze, research, and understand complex questions<\/li><li class="-indent-6 pl-0.5">Artistic: Your inclination toward creative expression through various mediums<\/li><li class="-indent-6 pl-0.5">Social: Your natural orientation toward helping, teaching, and supporting others<\/li><li class="-indent-6 pl-0.5">Enterprising: Your capacity for leadership, persuasion, and achieving goals<\/li><li class="-indent-6 pl-0.5">Conventional: Your appreciation for organization, detail, and systematic approaches<\/li><\/ul><p>The assessment takes 10-30 minutes. Remember, these results aren\u2019t meant to limit you - they\u2019re meant to illuminate possibilities you might not have considered. Use them as a starting point to explore occupations that could align with your natural interests and talents.<\/p>',
            checked: false,
            users: [],
            remarks: null,
            resources: [
                {
                    link: "https:\/\/www.mynextmove.org\/explore\/ip",
                    text: "Link to O*NET Interest Profiler",
                },
                {
                    link: "https:\/\/drjosephhammer.com\/resources\/systematic-career-exploration-approach-scea\/step-1-explore-your-career-interests\/onet-interest-profiler-interpretation\/",
                    text: "How to interpret your O*NET Interest Profiler Results",
                },
            ],
        },
        {
            id: 3,
            title: "Reflect on life experiences",
            button_text: "Have a question? Contact our Counsellor",
            category: {
                id: 1,
                title: "career",
            },
            estimated_time: "11th Grade Fall",
            type: "optional",
            description:
                '<p>Take a moment to reflect on your past experiences and how they\u2019ve shaped who you are. You can also chat with someone you trust, whether it\u2019s a teacher, friend, or family member.<\/p><p>Here are a few questions to guide your reflection, though you may find your own path of self-discovery leads to different questions entirely.<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5">What experiences keep coming back to your mind?<\/li><li class="-indent-6 pl-0.5">When have you felt most proud of your choices?<\/li><li class="-indent-6 pl-0.5">Which challenges taught you something unexpected about yourself?<\/li><li class="-indent-6 pl-0.5">What activities have always energized you, even as a child?<\/li><li class="-indent-6 pl-0.5">When did you surprise yourself by what you could do?<\/li><\/ul>',
            checked: false,
            users: [],
            remarks: null,
            resources: [
                {
                    link: "https:\/\/ctlc.blogs.bristol.ac.uk\/2021\/10\/01\/self-reflection-the-what-the-why-and-the-how-by-simon-brownhill\/",
                    text: "Self-reflection: the what, the why, and the how - by Simon Brownhill",
                },
            ],
        },
        {
            id: 4,
            title: "Chooses your major",
            button_text: "Have a question? Contact our Counsellor",
            category: {
                id: 1,
                title: "career",
            },
            estimated_time: "11th Grade Fall",
            type: "Require",
            description:
                "<p>Choose a major suitable to you, based on your interests, results of your MBTI test and also your career quiz.<\/p><p>Finalizing your major early will help you in choosing ECs related to your chosen major that will carry more weight in your college application.<\/p>",
            checked: false,
            users: [],
            remarks: null,
            resources: [
                {
                    link: "https:\/\/www.forbes.com\/sites\/goldiechan\/2024\/05\/20\/myers-briggs-personality-types\/",
                    text: "Top Majors & Careers for Your Myers-Briggs Personality Type",
                },
                {
                    link: "https:\/\/www.up.edu\/career\/career_resource_library\/choosingmajors.pdf",
                    text: "Choosing\/Changing a Major: Identifying Interests and Skills (Self-assesment Worksheet)",
                },
            ],
        },
        {
            id: 5,
            title: "Take English Standardized Test (IELTS, TOEFL, Duolingo)",
            button_text: "Have a question? Contact our Counsellor",
            category: {
                id: 2,
                title: "academics",
            },
            estimated_time: "11th Grade Spring",
            type: "Require",
            description:
                '<p>As International Students, you are required to provide a standardized English proficiency test as part of your college application. While these tests - IELTS, TOEFL, and DET - are important markers, they\u2019re simply meant to show colleges you can thrive in an English-speaking academic environment.<\/p><div><p>Here are the three most widely-accepted standardized English Test, chose the one that suit you best:<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">IELTS Academic<\/li><li class="-indent-6 pl-0.5 list-disc">TOEFL iBT<\/li><li class="-indent-6 pl-0.5 list-disc">Duolingo English Test<\/li><\/ul><\/div><p>Remember: These tests aren\u2019t about achieving the highest possible score. Instead, focus on comfortably exceeding your target schools\u2019 minimum requirements. This ensures your English proficiency won\u2019t be a concern, allowing admissions officers to focus on the unique perspectives and experiences you bring.<\/p>',
            checked: false,
            users: [],
            remarks: null,
            resources: [
                {
                    link: "",
                    text: "Sign up for: ",
                },
                {
                    link: "https:\/\/www.britishcouncil.vn\/en\/exam\/ielts\/book-test",
                    text: "[IELTS]",
                },
                {
                    link: "https:\/\/englishtest.duolingo.com\/",
                    text: "[DET]",
                },
                {
                    link: "https:\/\/www.ets.org\/toefl\/test-takers\/ibt\/register.html",
                    text: "[TOEFL IBT]",
                },
            ],
        },
        {
            id: 6,
            title: "Take SAT\/ACT",
            button_text: "Confirm study plan with a Counsellor",
            category: {
                id: 2,
                title: "academics",
            },
            estimated_time: "11th Grade Spring",
            type: "Require",
            description:
                "<p>While this item is required for some college and is optional for some, having a standardized test score will also help put your previous training into perspective and help admission officers be more confidence in your success in college.<\/p>",
            checked: false,
            users: [],
            remarks: null,
            resources: [
                {
                    link: "",
                    text: "Sign up for: ",
                },
                {
                    link: "https:\/\/satsuite.collegeboard.org\/sat\/registration",
                    text: "SAT",
                },
                {
                    link: "https:\/\/www.act.org\/",
                    text: "ACT",
                },
                {
                    link: "",
                    text: "Resources to prep for the test:",
                },
                {
                    link: "https:\/\/1600.io\/",
                    text: "1600.io",
                },
                {
                    link: "https:\/\/www.khanacademy.org\/digital-sat",
                    text: "Khan Academy's Official Digital SAT Prep",
                },
            ],
        },
        {
            id: 7,
            title: "Take AP Tests",
            button_text: "Have a question? Contact our Counsellor",
            category: {
                id: 2,
                title: "academics",
            },
            estimated_time: "11th Grade Spring",
            type: "optional",
            description:
                '<p>AP tests can strengthen your academic story. These subject-specific exams not only demonstrate your readiness for college-level work but also offer a universal way to showcase your abilities, regardless of your high school curriculum.<\/p><p>Here\u2019s why AP tests are worth considering:<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">They validate your mastery in specific subjects that align with your intended major<\/li><li class="-indent-6 pl-0.5 list-disc">They can translate into actual college credits, giving you a head start in your college journey<\/li><li class="-indent-6 pl-0.5 list-disc">You can take them without enrolling in AP classes - particularly valuable if your school doesn\u2019t offer an international curriculum<\/li><li class="-indent-6 pl-0.5 list-disc">They provide external validation of your academic abilities through a standardized measure that colleges trust<\/li><\/ul>',
            checked: false,
            users: [],
            remarks: null,
            resources: [
                {
                    link: "https:\/\/apstudents.collegeboard.org\/choosing-courses",
                    text: "Choosing AP Courses",
                },
                {
                    link: "https:\/\/apstudents.collegeboard.org\/register-for-ap-exams",
                    text: "Register for AP Exam",
                },
                {
                    link: "https:\/\/apstudents.collegeboard.org\/ap-exams-what-to-know",
                    text: "Information about AP Exams",
                },
            ],
        },
        {
            id: 8,
            title: "Create a list of activities",
            button_text: "Find more activities with a Counsellor",
            category: {
                id: 3,
                title: "extracurricular",
            },
            estimated_time: "11th Grade Spring",
            type: "Require",
            description:
                '<p>Your activities list is more than just a checklist\u2014it\'s your chance to show colleges who you are beyond academics. This section highlights your passions, commitments, and the impact you\u2019ve made in your community or personal growth journey. Admissions officers use this to understand your character, leadership skills, and how you spend your time outside the classroom.<\/p><p>Choose your ECs strategically based on your major and your interests. You should finalize your ECs before the summer of Grade 11 to make time to do the actual activity. Based on your interests, here are some activities Arrowster suggest that you take-part in. However, always remember: quality is always more important than quantity. Choose a few activities that excites you and participate actively<\/p><p class="font-semibold text-lg">Types of Activities to Include<\/p><ul class="flex flex-col gap-1 list-inside list-decimal pl-6"><li class="-indent-6 pl-0.5">School Clubs and Organizations<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Debate Team, Robotics Club, Student Government, Yearbook Committee.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Demonstrates teamwork, leadership, and initiative within your school community.<\/li><\/ul><\/li><li class="-indent-6 pl-0.5">Volunteer Work and Community Service<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Tutoring underprivileged students, organizing food drives, environmental cleanups.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Highlights empathy, social responsibility, and dedication to making a difference.<\/li><\/ul><\/li><li class="-indent-6 pl-0.5">Leadership Roles<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Class President, Team Captain, Founder of a local project or club.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Reflects your ability to inspire and lead others.<\/li><\/ul><\/li><li class="-indent-6 pl-0.5">Athletics<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Varsity sports, club teams, recreational leagues.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Shows commitment, discipline, and teamwork skills.<\/li><\/ul><\/li><li class="-indent-6 pl-0.5">Arts and Creative Pursuits<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Music, theater, dance, visual arts, filmmaking, writing.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Demonstrates creativity, passion, and personal expression.<\/li><\/ul><\/li><li class="-indent-6 pl-0.5">Internships and Work Experience<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Part-time jobs, internships in industries of interest, family business contributions.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Indicates responsibility, real-world experience, and career exploration.<\/li><\/ul><\/li><li class="-indent-6 pl-0.5">Personal Projects or Hobbies<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Building a website, writing a novel, starting a blog, learning a new instrument.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Reflects your curiosity, initiative, and self-motivation.<\/li><\/ul><\/li><\/ul><div><p class="font-semibold text-lg">When filling out your activities list:<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">Focus on quality, not quantity\u2014colleges value meaningful involvement over having many activities.<\/li><li class="-indent-6 pl-0.5 list-disc">Be specific! Use action verbs and quantify your achievements (e.g., "Organized a fundraiser that raised $5,000 for local shelters").<\/li><li class="-indent-6 pl-0.5 list-disc">Highlight leadership, impact, and growth wherever possible.<\/li><\/ul><\/div>',
            checked: false,
            users: [],
            remarks: null,
            resources: [],
        },
        {
            id: 9,
            title: "Join relevant competitions",
            button_text: "Have a question? Contact our Counsellor",
            category: {
                id: 3,
                title: "extracurricular",
            },
            estimated_time: "11th Grade Spring",
            type: "Require",
            description:
                '<p>Achieving success in competitions can significantly enhance your application. The impact of these accomplishments on your application will be influenced by the following factors:<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5">Scale of the competition<\/li><li class="-indent-6 pl-0.5">Reputation and level of competitiveness<\/li><li class="-indent-6 pl-0.5">Relevance to your chosen field of study<\/li><\/ul>',
            checked: false,
            users: [],
            remarks: null,
            resources: [
                {
                    link: "https:\/\/docs.google.com\/spreadsheets\/d\/1R9s3MAh1H_7rJ9NQhO18p6o7bvekrIDTk27l7emXk6o\/edit?gid=2136922681#gid=2136922681",
                    text: "Competition List (Updated Continuosly) - Debate Competiton",
                },
            ],
        },
        {
            id: 10,
            title: "Join or establish an interest-related club",
            button_text: "Have a question? Contact our Counsellor",
            category: {
                id: 3,
                title: "extracurricular",
            },
            estimated_time: "11th Grade Spring",
            type: "Require",
            description:
                '<p>Your activities list is more than just a checklist\u2014it\'s your chance to show colleges who you are beyond academics. This section highlights your passions, commitments, and the impact you\u2019ve made in your community or personal growth journey. Admissions officers use this to understand your character, leadership skills, and how you spend your time outside the classroom.<\/p><p class="font-semibold text-lg">Types of Activities to Include<\/p><ul class="flex flex-col gap-1 list-inside list-decimal pl-6"><li class="-indent-6 pl-0.5">School Clubs and Organizations<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Debate Team, Robotics Club, Student Government, Yearbook Committee.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Demonstrates teamwork, leadership, and initiative within your school community.<\/li><\/ul><\/li><li class="-indent-6 pl-0.5">Volunteer Work and Community Service<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Tutoring underprivileged students, organizing food drives, environmental cleanups.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Highlights empathy, social responsibility, and dedication to making a difference.<\/li><\/ul><\/li><li class="-indent-6 pl-0.5">Leadership Roles<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Class President, Team Captain, Founder of a local project or club.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Reflects your ability to inspire and lead others.<\/li><\/ul><\/li><li class="-indent-6 pl-0.5">Athletics<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Varsity sports, club teams, recreational leagues.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Shows commitment, discipline, and teamwork skills.<\/li><\/ul><\/li><li class="-indent-6 pl-0.5">Arts and Creative Pursuits<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Music, theater, dance, visual arts, filmmaking, writing.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Demonstrates creativity, passion, and personal expression.<\/li><\/ul><\/li><li class="-indent-6 pl-0.5">Internships and Work Experience<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Part-time jobs, internships in industries of interest, family business contributions.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Indicates responsibility, real-world experience, and career exploration.<\/li><\/ul><\/li><li class="-indent-6 pl-0.5">Personal Projects or Hobbies<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 list-disc">What: Building a website, writing a novel, starting a blog, learning a new instrument.<\/li><li class="-indent-6 pl-0.5 list-disc">Why: Reflects your curiosity, initiative, and self-motivation.<\/li><\/ul><\/li><\/ul><div><p class="font-semibold text-lg">When filling out your activities list:<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">Focus on quality, not quantity\u2014colleges value meaningful involvement over having many activities.<\/li><li class="-indent-6 pl-0.5 list-disc">Be specific! Use action verbs and quantify your achievements (e.g., "Organized a fundraiser that raised $5,000 for local shelters").<\/li><li class="-indent-6 pl-0.5 list-disc">Highlight leadership, impact, and growth wherever possible. Your activities list is your opportunity to show the admissions team how you\u2019ll contribute to their campus community!<\/li><\/ul><\/div><p>You can see the guide above on the required information for a complete activity list and tips on how to fill it out!<\/p>',
            checked: false,
            users: [],
            remarks: null,
            resources: [],
        },
        {
            id: 11,
            title: "(Optional) Complete an internship",
            button_text: "Have a question? Contact our Counsellor",
            category: {
                id: 3,
                title: "extracurricular",
            },
            estimated_time: "11th Grade Summer",
            type: "Require",
            description:
                '<p>AP tests can strengthen your academic story. These subject-specific exams not only demonstrate your readiness for college-level work but also offer a universal way to showcase your abilities, regardless of your high school curriculum.<\/p><p>Here\u2019s why AP tests are worth considering:<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">They validate your mastery in specific subjects that align with your intended major<\/li><li class="-indent-6 pl-0.5 list-disc">They can translate into actual college credits, giving you a head start in your college journey<\/li><li class="-indent-6 pl-0.5 list-disc">You can take them without enrolling in AP classes - particularly valuable if your school doesn\u2019t offer an international curriculum<\/li><li class="-indent-6 pl-0.5 list-disc">They provide external validation of your academic abilities through a standardized measure that colleges trust<\/li><\/ul>',
            checked: false,
            users: [],
            remarks: null,
            resources: [
                {
                    link: "",
                    text: "Topcv.vn - Largest Vietnamese job portal",
                },
                {
                    link: "",
                    text: "Ybox.vn - Youth and internship focused",
                },
                {
                    link: "",
                    text: "Glints.com\/vn - Multi-country professional network",
                },
                {
                    link: "",
                    text: "Vietnamworks.com - Premium careers platform",
                },
                {
                    link: "",
                    text: "Jobstreet.vn - Wide range job listings",
                },
                {
                    link: "",
                    text: "123job.vn - New generation job board",
                },
                {
                    link: "",
                    text: "Vn.indeed.com - Global jobs localized",
                },
                {
                    link: "",
                    text: "Vieclam24h.vn - Comprehensive job site",
                },
                {
                    link: "",
                    text: "Mywork.com.vn - All-level positions portal",
                },
                {
                    link: "",
                    text: "Careerbuilder.vn - US-backed recruitment site",
                },
                {
                    link: "",
                    text: "Timviec365.vn - Free posting platform",
                },
                {
                    link: "",
                    text: "Jobsgo.vn - Smart job matching",
                },
                {
                    link: "",
                    text: "Careerlink.vn - Location-based job search",
                },
                {
                    link: "",
                    text: "Topdev.vn - IT specialists platform, Itviec.com - Tech recruitment hub",
                },
            ],
        },
        {
            id: 12,
            title: "(Optional) Prepare your Resume",
            button_text: "Have a question? Contact our Counsellor",
            category: {
                id: 3,
                title: "extracurricular",
            },
            estimated_time: "11th Grade Summer",
            type: "Require",
            description:
                '<p>Your resume or CV is a crucial part of your college application. It provides admissions officers with a concise, well-organized snapshot of your academic, extracurricular, and personal achievements, helping them understand your skills, interests, and potential contributions to their campus.<\/p><div><p class="font-semibold text-lg">Structure of a successful CV:<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">Personal Information: Name, contact details.<\/li><li class="-indent-6 pl-0.5 list-disc">Education: GPA, relevant coursework, standardized test scores.<\/li><li class="-indent-6 pl-0.5 list-disc">Awards and Honors: Academic or extracurricular recognition.<\/li><li class="-indent-6 pl-0.5 list-disc">Activities: Clubs, leadership roles, community service, work experience.<\/li><li class="-indent-6 pl-0.5 list-disc">General Skills and Interests: Languages, technical skills, or hobbies.<\/li><\/ul><\/div><div><p class="font-semibold text-lg">Why Your Resume Matters<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">Shows Depth: Goes beyond what\u2019s in your application by detailing how you spend your time and what you\u2019ve achieved.<\/li><li class="-indent-6 pl-0.5 list-disc">Demonstrates Fit: Highlights your alignment with the school\u2019s values and programs.<\/li><li class="-indent-6 pl-0.5 list-disc">Professional Presentation: Reflects your ability to organize and present information clearly.<\/li><\/ul><\/div>',
            checked: false,
            users: [],
            remarks: null,
            resources: [
                {
                    link: "https:\/\/careerservices.fas.harvard.edu\/resources\/bullet-point-resume-template\/",
                    text: "Resume Template",
                },
                {
                    link: "https:\/\/cdn-careerservices.fas.harvard.edu\/wp-content\/uploads\/sites\/161\/2024\/10\/2024-HES_resume-and-letter.pdf",
                    text: "Resume and Cover Letter Guidee",
                },
            ],
        },
        {
            id: 13,
            title: "Create your School List ",
            button_text: "Review School List with a Counsellor",
            category: {
                id: 4,
                title: "school list",
            },
            estimated_time: "11th Grade Summer",
            type: "Require",
            description:
                '<p>Crafting your college list is about balancing ambition with practicality while staying true to your dreams. Here are the key steps:<\/p><div><h2 class="text-lg font-semibold">Imagine Your Ideal College Life<\/h2><p class="py-1">What excites you most?<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">City buzz with endless opportunities?<\/li><li class="-indent-6 pl-0.5 list-disc">Quiet campuses with intellectual vibes?<\/li><\/ul><p>Be sure to identify your academic and personal priorities, as well as factors like location, school size, living cost, majors offered, campus culture, and so on. This will help you find good matches.<\/p><\/div><div><h2 class="text-lg font-semibold">Build Your List<\/h2><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">Reach Schools (Dream Big)<\/li><li class="-indent-3 pl-2.5 list-disc">Highly competitive; your profile is slightly below average.<\/li><li class="-indent-3 pl-2.5 list-disc">Apply to 3-4 schools where you\u2019d be thrilled to get in.<\/li><li class="-indent-6 pl-0.5 list-disc">Target Schools (Your Fit)<\/li><li class="-indent-3 pl-2.5 list-disc">Academically and socially aligned with your profile.<\/li><li class="-indent-3 pl-2.5 list-disc">Choose 4-5 schools that feel just right for you.<\/li><li class="-indent-6 pl-0.5 list-disc">Safety Schools (Strong Backups)<\/li><li class="-indent-3 pl-2.5 list-disc">Your stats exceed their averages; acceptance is very likely.<\/li><li class="-indent-3 pl-2.5 list-disc">Pick 2-3 schools you\u2019d be happy to attend<\/li><\/ul><\/div><div><h2 class="text-lg font-semibold">Talk to Your Counselor<\/h2><p class="py-1">Your school counselor is a valuable resource in this process. They know your academic record, strengths, and career aspirations and can match you with schools that fit:<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">Help you identify potential reach, target, and safety schools.<\/li><li class="-indent-6 pl-0.5 list-disc">Provide insider tips on admissions trends or popular schools among past students.<\/li><li class="-indent-6 pl-0.5 list-disc">Write a strong recommendation letter that complements your application.<\/li><\/ul><p>Share your goals and interests openly, so they can guide you more effectively!<\/p><\/div><div><h2 class="text-lg font-semibold">Attend College Fairs and Info Sessions<\/h2><p class="py-1">These events are gold mines for gathering information. They allow you to explore a wide range of colleges, learn about their unique offerings, and connect directly with admissions officers. Here is how to make the most of it:<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">Prepare questions ahead of time about programs, campus life, or admissions.<\/li><li class="-indent-6 pl-0.5 list-disc">Collect brochures and take notes to compare later.<\/li><\/ul><\/div><div><h2 class="text-lg font-semibold">Visit Campuses If Possible<\/h2><p>Nothing beats experiencing a campus firsthand. A visit lets you gauge the vibe of the school and whether it feels like \u201chome." If you can\u2019t visit in person, many schools offer virtual tours and Q&A sessions with current students. You can find more information on each school\'s website and social media!<\/p><\/div>',
            checked: false,
            users: [],
            remarks: null,
            resources: [
                {
                    link: "https:\/\/apply.jhu.edu\/hopkins-insider\/how-to-build-your-college-list\/",
                    text: "How to build your College List",
                },
                {
                    link: "https:\/\/www.usnews.com\/education\/best-colleges\/articles\/how-to-make-a-college-list",
                    text: "How to make a College Listt",
                },
            ],
        },
    ],
};
export const postApplication: Application = {
    id: 7,
    title: "POST-APPLICATION",
    country_title: null,
    description:
        "After submitting, send final transcripts, confirm enrolment with deposits if accepted, handle visa requirements for international students, and prepare for university while tracking all deadlines.",
    view: 0,
    disabled: 0,
    tasks: [
        {
            id: 43,
            title: "Complete Final School Report and Transcript",
            button_text: "Have a question? Contact our Counsellor",
            category: {
                id: 5,
                title: "application",
            },
            estimated_time: "12th Grade Summer",
            type: "Require",
            description:
                "<p>Once you've completed your final year of high school, you'll need to submit your Final Report and Transcript to the colleges you've been accepted to. This document confirms that you've graduated and provides your final academic records, including grades from your senior year.<\/p><p>It\u2019s important to request this early from your school so that it reaches the college before their deadline. This is often a requirement for enrollment and to finalize your acceptance.<\/p>",
            checked: false,
            users: [],
            remarks: null,
            resources: [],
        },
        {
            id: 44,
            title: "(Optional) Submit Deposit & Bank Statement to College",
            button_text: "Have a question? Contact our Counsellor",
            category: {
                id: 8,
                title: "decision",
            },
            estimated_time: "12th Grade Summer",
            type: "Require",
            description:
                "<p>After receiving an offer of admission, many colleges require a deposit to confirm your enrollment. This deposit secures your place at the school and is often due shortly after your acceptance. Along with the deposit, some colleges may also ask for a bank statement to confirm that you or your family have the necessary financial resources to cover your tuition and living expenses.<\/p><p>The specifics deposit amount will depends on the University. Typically, the deposit is between $100 and $400, and is non-refundable.<\/p>",
            checked: false,
            users: [],
            remarks: null,
            resources: [],
        },
        {
            id: 45,
            title: "(US Only) Obtain I-20 from College",
            button_text: "Discuss how to show Proof of Finance with a Counsellor",
            category: {
                id: 9,
                title: "visa",
            },
            estimated_time: "12th Grade Summer",
            type: "Require",
            description:
                "<p>For international students planning to study in the U.S., the I-20 form is an essential document for obtaining a student visa. The I-20 certifies that you have been accepted to a U.S. school and have the financial resources to attend.<\/p><p>Once you\u2019ve paid your deposit and submitted necessary documents, the college will issue the I-20 form. Make sure to review it carefully and store it in a safe place, as you\u2019ll need it for your visa interview and entry into the U.S.<\/p>",
            checked: false,
            users: [],
            remarks: null,
            resources: [],
        },
        {
            id: 46,
            title: "Apply for Student Visa",
            button_text: "Have a question? Contact our Counsellor",
            category: {
                id: 9,
                title: "visa",
            },
            estimated_time: "12th Grade Summer",
            type: "Require",
            description:
                "<p>Once you have your I-20 form, you\u2019ll need to schedule a visa interview at your local U.S. embassy or consulate. This is an important step in the process of obtaining your student visa (F-1 Visa). Be sure to book your appointment well in advance, as slots may fill up quickly, and allow sufficient time for visa processing before your program's start date.<\/p><p>Prepare all necessary documents, including your I-20, passport, visa application, and financial proof, to present during your interview.<\/p>",
            checked: false,
            users: [],
            remarks: null,
            resources: [],
        },
    ],
};
export const applicationList: Application[] = [
    {
        id: 2,
        title: "Apply for EU",
        country_title: "europe",
        description: "",
        view: 0,
        disabled: 0,
        tasks: [
            {
                id: 14,
                title: "(Optional) Write Personal Statement ",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "12th Grade Summer",
                type: "optional",
                description:
                    '<p>Depends on your school, you might be required to submit a Personal Statement along with your application. A personal statement is your opportunity to stand out in a competitive university application process. It serves as a compelling narrative that goes beyond grades, allowing you to showcase your unique qualities, motivations, and potential.<\/p><p>Here are some key steps to writing a compelling Personal Statement<\/p><div><p class="font-bold">Preparation<\/p><p>Read university guidelines carefully<\/p><p>Brainstorm and outline your experiences, achievements, and goals<\/p><\/div><div><p class="font-bold">Crafting Your Statement<\/p><p>Create an engaging introduction highlighting your field of interest<\/p><p>Demonstrate motivation through specific experiences and skills<\/p><p>Connect your personal goals with the university\'s program<\/p><p>Reflect on challenges and personal growth<\/p><\/div><div><p class="font-bold">Writing Tips:<\/p><p>Be authentic and unique<\/p><p>Use clear, concise language<\/p><p>Provide concrete examples<\/p><p>Avoid clich\u00e9s and generic statements<\/p><\/div><div><p class="font-bold">What to Avoid:<\/p><p>Eliminate irrelevant information<\/p><p>Steer clear of personal drama or controversial topics<\/p><p>Refrain from exaggerations or resume repetition<\/p><p>Minimize technical jargon<\/p><\/div><p>Remember, your goal is to create a personal statement that compellingly demonstrates your potential, passion, and fit for the program.<\/p>',
                checked: false,
                users: [],
                remarks: null,
                resources: [
                    {
                        link: "https:\/\/drive.google.com\/file\/d\/1O3WFx106A1xnYaRVaxiI-d57KU6eFR31\/view",
                        text: "Arrowster's Personal Statement and SoP Guide",
                    },
                    {
                        link: "https:\/\/www.deakin.edu.au\/study\/how-to-apply\/preparing-your-application\/how-to-write-a-personal-statement",
                        text: "Deakin University's Personal Statement Guide",
                    },
                    {
                        link: "https:\/\/collegedunia.com\/netherlands\/article\/statement-of-purpose-for-netherlands",
                        text: "Guide for SoP for Netherlands",
                    },
                ],
            },
            {
                id: 15,
                title: "(Optional) Complete Letters of Recommendation",
                button_text: "Review Personal Statement with a Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "12th Grade Summer",
                type: "optional",
                description:
                    '<p> Most colleges require at least one recommendation letter from your school counselor as part of your application. This letter is important because it provides admissions officers with a broader perspective on your character, work ethic, and contributions to your school community, beyond what is reflected in your grades and test scores. Your counselor\u2019s recommendation gives context to your academic achievements and paints a picture of who you are as a person, highlighting your strengths, personality, and potential for success in college. <\/p> <p> A strong counselor recommendation can help distinguish you from other applicants, especially if your grades or test scores fall within a competitive range. It can also provide insight into your involvement in extracurricular activities, leadership roles, or challenges you\u2019ve overcome. This is an opportunity for your counselor to speak to your resilience, interpersonal skills, and how you have contributed to the school environment\u2014traits that are difficult to quantify but are crucial for thriving in college. <\/p> <div> <p class="text-lg">Who can you ask for a Letter of Recommendation:<\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc">Your Head Teacher<\/li> <li class="-indent-6 pl-0.5 list-disc">Your Subject Teachers <\/li> <li class="-indent-6 pl-0.5 list-disc">Your Research Mentors <\/li> <li class="-indent-6 pl-0.5 list-disc">Your Employer<\/li> <li class="-indent-6 pl-0.5 list-disc"> Even your friend (if the school accept a Peer Recommendation!) <\/li> <\/ul> <\/div> <p> The specific number of recommendations depends on the school, but generally students ask for 2 - 3 recommendations <\/p> <div> <p class="text-lg"> To ensure your counselor writes a compelling recommendation letter, it\u2019s essential to: <\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc"> Ask Early: Provide your counselor with ample time to write the letter, ideally several weeks before the deadline. <\/li> <li class="-indent-6 pl-0.5 list-disc"> Provide Information: Share details about your achievements, aspirations, and any specific programs or activities that you\u2019d like them to mention. This could include extracurriculars, academic projects, leadership experiences, and personal challenges. <\/li> <li class="-indent-6 pl-0.5 list-disc"> Be Clear About Your Goals: Let your counselor know about your college goals, the programs you are applying to, and any aspects of your personality or experiences that you\u2019d like them to emphasize. This will help them tailor the recommendation to the specific colleges and programs. <\/li> <\/ul> <\/div> <p> A well-written counselor recommendation can significantly strengthen your application, offering a more holistic view of who you are and what you can bring to the campus community. <\/p>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 16,
                title: "Complete Official High School Transcript and School Report",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    "<p>You can request your Transcript and Academic Report from your school, covering Grades 10, 11, and 12. For Grade 9, you will have to request a separate Transcript and Academic Report from your Secondary Institution.<\/p><p>If your school does not issue Transcript and Academic Report in English, you must provide a notarized translation for your college application. Be sure to request your materials at least two weeks before your application deadline to ensure you receive it on time.<\/p>",
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 17,
                title: "(Optional) Gather Financial Aid Application",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 6,
                    title: "finances",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    '<div> <p class="text-lg"> Depending on your school or scholarship requirement, you may need to submit financial materials including but not limited to: <\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc"> Family saving bank account statement <\/li> <li class="-indent-6 pl-0.5 list-disc"> Parents\' proof of income <\/li> <\/ul> <\/div>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 18,
                title:
                    "(Optional) Complete External Scholarship Application (Optional)",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 6,
                    title: "finances",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    '<p>School scholarships are just the tip of the iceberg. Thousands of euros in funding are waiting for students who know where to look. Government programs, corporate sponsors, professional associations, and international foundations offer scholarships that most students never discover.<\/p><div><p class="font-bold">What Really Works:<\/p><p>Use targeted search platforms like Scholarships.com and Fastweb<\/p><p>Create comprehensive online profiles<\/p><p>Set up email alerts for new opportunities<\/p><p>Build a spreadsheet to track deadlines<\/p><\/div><div><p class="font-bold">Some Types of Scholarships that Students Often Overlook:<\/p><p>Professional association grants<\/p><p>Local foundation scholarships<\/p><p>Corporate sponsorship programs<\/p><p>Regional government education funds<\/p><\/div><div><p class="font-bold">Generous Scholarship Funds in the EU:<\/p><p>Erasmus Mundus Scholarships<\/p><p>Deutschlandstipendium for international students<\/p><p>Stipendium Hungaricum Scholarship<\/p><p>Orange Tulip Scholarship<\/p><\/div>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
        ],
    },
    {
        id: 3,
        title: "Apply for Australia",
        country_title: "australia",
        description: "",
        view: 0,
        disabled: 0,
        tasks: [
            {
                id: 19,
                title: "(Optional) Write Personal Statement",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    '<p>Depends on your school, you might be required to submit a Personal Statement along with your application. A personal statement is your opportunity to stand out in a competitive university application process. It serves as a compelling narrative that goes beyond grades, allowing you to showcase your unique qualities, motivations, and potential.<\/p><p>Here are some key steps to writing a compelling Personal Statement:<\/p><div><p class="font-bold">Preparation<\/p><p>Read university guidelines carefully<\/p><p>Brainstorm and outline your experiences, achievements, and goals<\/p><\/div><div><p class="font-bold">Crafting Your Statement<\/p><p>Create an engaging introduction highlighting your field of interest<\/p><p>Demonstrate motivation through specific experiences and skills<\/p><p>Connect your personal goals with the university\'s program<\/p><p>Reflect on challenges and personal growth<\/p><\/div><div><p class="font-bold">Writing Tips:<\/p><p>Be authentic and unique<\/p><p>Use clear, concise language<\/p><p>Provide concrete examples<\/p><p>Avoid clich\u00e9s and generic statements<\/p><\/div><div><p class="font-bold">What to Avoid:<\/p><p>Eliminate irrelevant information<\/p><p>Steer clear of personal drama or controversial topics<\/p><p>Refrain from exaggerations or resume repetition<\/p><p>Minimize technical jargon<\/p><\/div><p>Remember, your goal is to create a personal statement that compellingly demonstrates your potential, passion, and fit for the program.<\/p>',
                checked: false,
                users: [],
                remarks: null,
                resources: [
                    {
                        link: "https:\/\/drive.google.com\/file\/d\/1O3WFx106A1xnYaRVaxiI-d57KU6eFR31\/view",
                        text: "Arrowster's Personal Statement and SoP Guide",
                    },
                    {
                        link: "https:\/\/www.deakin.edu.au\/study\/how-to-apply\/preparing-your-application\/how-to-write-a-personal-statement",
                        text: "Deakin University's Personal Statement Guide",
                    },
                    {
                        link: "https:\/\/collegedunia.com\/netherlands\/article\/statement-of-purpose-for-netherlands",
                        text: "Guide for SoP for Netherlands",
                    },
                ],
            },
            {
                id: 20,
                title: "(Optional) Complete Letters of Recommendation",
                button_text: "Review Personal Statement with a Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    '<p> Most colleges require at least one recommendation letter from your school counselor as part of your application. This letter is important because it provides admissions officers with a broader perspective on your character, work ethic, and contributions to your school community, beyond what is reflected in your grades and test scores. Your counselor\u2019s recommendation gives context to your academic achievements and paints a picture of who you are as a person, highlighting your strengths, personality, and potential for success in college. <\/p> <p> A strong counselor recommendation can help distinguish you from other applicants, especially if your grades or test scores fall within a competitive range. It can also provide insight into your involvement in extracurricular activities, leadership roles, or challenges you\u2019ve overcome. This is an opportunity for your counselor to speak to your resilience, interpersonal skills, and how you have contributed to the school environment\u2014traits that are difficult to quantify but are crucial for thriving in college. <\/p> <div> <p class="text-lg">Who can you ask for a Letter of Recommendation:<\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc">Your Head Teacher<\/li> <li class="-indent-6 pl-0.5 list-disc">Your Subject Teachers <\/li> <li class="-indent-6 pl-0.5 list-disc">Your Research Mentors <\/li> <li class="-indent-6 pl-0.5 list-disc">Your Employer<\/li> <li class="-indent-6 pl-0.5 list-disc"> Even your friend (if the school accept a Peer Recommendation!) <\/li> <\/ul> <\/div> <p> The specific number of recommendations depends on the school, but generally students ask for 2 - 3 recommendations <\/p> <div> <p class="text-lg"> To ensure your counselor writes a compelling recommendation letter, it\u2019s essential to: <\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc"> Ask Early: Provide your counselor with ample time to write the letter, ideally several weeks before the deadline. <\/li> <li class="-indent-6 pl-0.5 list-disc"> Provide Information: Share details about your achievements, aspirations, and any specific programs or activities that you\u2019d like them to mention. This could include extracurriculars, academic projects, leadership experiences, and personal challenges. <\/li><li class="-indent-6 pl-0.5 list-disc"> Be Clear About Your Goals: Let your counselor know about your college goals, the programs you are applying to, and any aspects of your personality or experiences that you\u2019d like them to emphasize. This will help them tailor the recommendation to the specific colleges and programs. <\/li> <\/ul> <\/div> <p> A well-written counselor recommendation can significantly strengthen your application, offering a more holistic view of who you are and what you can bring to the campus community. <\/p>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 21,
                title: "Complete Official High School Transcript and School Report",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "12th Grade Spring",
                type: "optional",
                description:
                    "<p>You can request your Transcript and Academic Report from your school, covering Grades 10, 11, and 12. For Grade 9, you will have to request a separate Transcript and Academic Report from your Secondary Institution.<\/p><p>If your school does not issue Transcript and Academic Report in English, you must provide a notarized translation for your college application. Be sure to request your materials at least two weeks before your application deadline to ensure you receive it on time.<\/p>",
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 22,
                title: "(Optional) Gather Financial Aid Application",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 6,
                    title: "finances",
                },
                estimated_time: "12th Grade Spring",
                type: "optional",
                description:
                    '<div> <p class="text-lg"> Depending on your school or scholarship requirement, you may need to submit financial materials including but not limited to: <\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc"> Family saving bank account statement <\/li> <li class="-indent-6 pl-0.5 list-disc"> Parents\' proof of income <\/li> <\/ul> <\/div>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 23,
                title:
                    "(Optional) Complete External Scholarship Application (Optional)",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 6,
                    title: "finances",
                },
                estimated_time: "12th Grade Spring",
                type: "optional",
                description:
                    '<p>School scholarships are just the tip of the iceberg. Thousands of dollars in funding are waiting for students who know where to look. Government programs, corporate sponsors, professional associations, and international foundations offer scholarships that most students never discover.<\/p><div><p class="font-bold">What Really Works:<\/p><p>Use targeted search platforms<\/p><p>Create comprehensive online profiles<\/p><p>Set up email alerts for new opportunities<\/p><p>Build a spreadsheet to track deadlines<\/p><\/div><div><p class="font-bold">Some Types of Scholarships that Students Often Overlook:<\/p><p>Professional association grants<\/p><p>Local foundation scholarships<\/p><p>Corporate sponsorship programs<\/p><p>Regional government education funds<\/p><\/div><div><p class="font-bold">Generous Scholarship Funds in Australia:<\/p><p>Australia Awards<\/p><p>Endeavour Leadership Program<\/p><p>Research Training Program (RTP)<\/p><p>International Postgraduate Research Scholarships (IPRS)<\/p><\/div>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
        ],
    },
    {
        id: 4,
        title: "Apply for Canada",
        country_title: "canada",
        description: "",
        view: 0,
        disabled: 0,
        tasks: [
            {
                id: 24,
                title: "(Optional) Write Personal Statement",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "11th Grade Summer",
                type: "optional",
                description:
                    '<p>Depends on your school, you might be required to submit a Personal Statement along with your application. A personal statement is your opportunity to stand out in a competitive university application process. It serves as a compelling narrative that goes beyond grades, allowing you to showcase your unique qualities, motivations, and potential.<\/p><p>Here are some key steps to writing a compelling Personal Statement<\/p><div><p class="font-bold">Preparation<\/p><p>Read university guidelines carefully<\/p><p>Brainstorm and outline your experiences, achievements, and goals<\/p><\/div><div><p class="font-bold">Crafting Your Statement<\/p><p>Create an engaging introduction highlighting your field of interest<\/p><p>Demonstrate motivation through specific experiences and skills<\/p><p>Connect your personal goals with the university\'s program<\/p><p>Reflect on challenges and personal growth<\/p><\/div><div><p class="font-bold">Writing Tips:<\/p><p>Be authentic and unique<\/p><p>Use clear, concise language<\/p><p>Provide concrete examples<\/p><p>Avoid clich\u00e9s and generic statements<\/p><\/div><div><p class="font-bold">What to Avoid:<\/p><p>Eliminate irrelevant information<\/p><p>Steer clear of personal drama or controversial topics<\/p><p>Refrain from exaggerations or resume repetition<\/p><p>Minimize technical jargon<\/p><\/div><p>Remember, your goal is to create a personal statement that compellingly demonstrates your potential, passion, and fit for the program.<\/p>',
                checked: false,
                users: [],
                remarks: null,
                resources: [
                    {
                        link: "https:\/\/drive.google.com\/file\/d\/1O3WFx106A1xnYaRVaxiI-d57KU6eFR31\/view",
                        text: "Arrowster's Personal Statement and SoP Guide",
                    },
                ],
            },
            {
                id: 25,
                title: "(Optional) Complete Letters of Recommendation",
                button_text: "Review Personal Statement with a Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "11th Grade Summer",
                type: "optional",
                description:
                    '<p> Most colleges require at least one recommendation letter from your school counselor as part of your application. This letter is important because it provides admissions officers with a broader perspective on your character, work ethic, and contributions to your school community, beyond what is reflected in your grades and test scores. Your counselor\u2019s recommendation gives context to your academic achievements and paints a picture of who you are as a person, highlighting your strengths, personality, and potential for success in college. <\/p> <p> A strong counselor recommendation can help distinguish you from other applicants, especially if your grades or test scores fall within a competitive range. It can also provide insight into your involvement in extracurricular activities, leadership roles, or challenges you\u2019ve overcome. This is an opportunity for your counselor to speak to your resilience, interpersonal skills, and how you have contributed to the school environment\u2014traits that are difficult to quantify but are crucial for thriving in college. <\/p> <div> <p class="text-lg">Who can you ask for a Letter of Recommendation:<\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc">Your Head Teacher<\/li> <li class="-indent-6 pl-0.5 list-disc">Your Subject Teachers <\/li> <li class="-indent-6 pl-0.5 list-disc">Your Research Mentors <\/li> <li class="-indent-6 pl-0.5 list-disc">Your Employer<\/li> <li class="-indent-6 pl-0.5 list-disc"> Even your friend (if the school accept a Peer Recommendation!) <\/li> <\/ul> <\/div> <p> The specific number of recommendations depends on the school, but generally students ask for 2 - 3 recommendations <\/p> <div> <p class="text-lg"> To ensure your counselor writes a compelling recommendation letter, it\u2019s essential to: <\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc"> Ask Early: Provide your counselor with ample time to write the letter, ideally several weeks before the deadline. <\/li> <li class="-indent-6 pl-0.5 list-disc"> Provide Information: Share details about your achievements, aspirations, and any specific programs or activities that you\u2019d like them to mention. This could include extracurriculars, academic projects, leadership experiences, and personal challenges. <\/li><li class="-indent-6 pl-0.5 list-disc"> Be Clear About Your Goals: Let your counselor know about your college goals, the programs you are applying to, and any aspects of your personality or experiences that you\u2019d like them to emphasize. This will help them tailor the recommendation to the specific colleges and programs. <\/li> <\/ul> <\/div> <p> A well-written counselor recommendation can significantly strengthen your application, offering a more holistic view of who you are and what you can bring to the campus community. <\/p>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 26,
                title: "Complete Official High School Transcript and School Report",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    "<p>You can request your Transcript and Academic Report from your school, covering Grades 10, 11, and 12. For Grade 9, you will have to request a separate Transcript and Academic Report from your Secondary Institution.<\/p><p>If your school does not issue Transcript and Academic Report in English, you must provide a notarized translation for your college application. Be sure to request your materials at least two weeks before your application deadline to ensure you receive it on time.<\/p>",
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 27,
                title: "(Optional) Gather Financial Aid Application",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 6,
                    title: "finances",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    '<div> <p class="text-lg"> Depending on your school or scholarship requirement, you may need to submit financial materials including but not limited to: <\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc"> Family saving bank account statement <\/li> <li class="-indent-6 pl-0.5 list-disc"> Parents\' proof of income <\/li> <\/ul> <\/div>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 28,
                title:
                    "(Optional) Complete External Scholarship Application (Optional)",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 6,
                    title: "finances",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    '<p>School scholarships are just the tip of the iceberg. Thousands of dollars in funding are waiting for students who know where to look. Government programs, corporate sponsors, professional associations, and international foundations offer scholarships that most students never discover.<\/p><div><p class="font-bold">What Really Works:<\/p><p>Use targeted search platforms<\/p><p>Create comprehensive online profiles<\/p><p>Set up email alerts for new opportunities<\/p><p>Build a spreadsheet to track deadlines<\/p><\/div><div><p class="font-bold">Some Types of Scholarships that Students Often Overlook:<\/p><p>Professional association grants<\/p><p>Local foundation scholarships<\/p><p>Corporate sponsorship programs<\/p><p>Regional government education funds<\/p><\/div><div><p class="font-bold">Generous Scholarship Funds in Canada:<\/p><p>Vanier Canada Graduate Scholarships<\/p><p>NSERC Postgraduate Scholarships<\/p><p>Pierre Elliott Trudeau Foundation Scholarships<\/p><p>International Postgraduate Research Scholarships<\/p><\/div>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
        ],
    },
    {
        id: 5,
        title: "Apply for US",
        country_title: "united_states",
        description: "",
        view: 0,
        disabled: 0,
        tasks: [
            {
                id: 29,
                title: "Write Personal Statement",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 7,
                    title: "common app",
                },
                estimated_time: "11th Grade Summer",
                type: "Require",
                description:
                    '<div><p>The Personal Statement is a critical part of your college application, offering you the opportunity to present yourself beyond your grades and test scores. It\'s your chance to share your unique story, personality, and perspective with the admissions team. Unlike other sections of your application, the Personal Statement allows you to communicate directly who you are, what drives you, and how you\u2019ll contribute to the campus community.<\/p><\/div><div><p class="font-bold">How to Approach It<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-3 list-disc">Be Authentic: Your Personal Statement should reflect your true self. Don\u2019t try to write what you think the admissions team wants to hear. Instead, focus on what matters to you, your experiences, and the lessons you\'ve learned.<\/li><li class="-indent-6 pl-0.5 list-disc">Answer the Prompt Thoughtfully: The prompts are designed to help you dig deeper into your personal experiences. Choose the one that resonates most with you and allows you to share something meaningful. You don\u2019t need to write about something monumental\u2014what matters is how you frame and reflect on your experiences.<\/li><li class="-indent-6 pl-0.5 list-disc">Tell a Story: A great Personal Statement is like a narrative. Whether you\'re recounting a challenge, describing a passion, or reflecting on a meaningful experience, aim to engage your reader with a compelling story. Make it personal, vivid, and reflective.<\/li><li class="-indent-6 pl-0.5 list-disc">Show, Don\u2019t Just Tell: Instead of simply stating facts about yourself, provide specific examples that illustrate your points. For instance, if you\'re writing about a personal setback, describe the situation, how it made you feel, and the actions you took to overcome it.<\/li><li class="-indent-6 pl-0.5 list-disc">Reflect on Your Growth: College admissions officers are interested in how you\'ve evolved. Whether it\u2019s overcoming a challenge, embracing new perspectives, or discovering a passion, make sure to highlight how these experiences have shaped who you are today.<\/li><\/ul><\/div><div><p class="font-bold">Essay Prompts for 2024\u20132025<\/p><p>Below are the essay prompts from the 2024-2025 school year application on Common App. Choose the one that best allows you to showcase who you are:<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">Identity, Background, Interest, or Talent: Share a background, identity, interest, or talent that\u2019s so meaningful to you, your application would be incomplete without it.<\/li><li class="-indent-6 pl-0.5 list-disc">Challenge or Setback: Recount a time you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?<\/li><li class="-indent-6 pl-0.5 list-disc">Questioning Beliefs or Ideas: Reflect on a time you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?<\/li><li class="-indent-6 pl-0.5 list-disc">Gratitude or Motivation: Reflect on something someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?<\/li><li class="-indent-6 pl-0.5 list-disc">Personal Growth: Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.<\/li><li class="-indent-6 pl-0.5 list-disc">Engaging Topics or Ideas: Describe a topic, idea, or concept you find so engaging it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?<\/li><li class="-indent-6 pl-0.5 list-disc">Your Own Topic: Share an essay on any topic of your choice. It can be one you\'ve already written, one that responds to a different prompt, or one of your own design.<\/li><\/ul><\/div><div><p class="font-bold">Final Tips<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">Stay Focused: Stick to the word limit of 650 words, making every word count.<\/li><li class="-indent-6 pl-0.5 list-disc">Revise and Edit: Your first draft won\u2019t be perfect\u2014revise for clarity, tone, and grammar.<\/li><li class="-indent-6 pl-0.5 list-disc">Seek Feedback: Ask teachers, family members, or mentors to review your essay and offer constructive feedback.<\/li><\/ul><\/div><div><p>The Personal Statement is your opportunity to make a strong and lasting impression. Use it wisely to present a compelling picture of who you are and why you\u2019re a great fit for the colleges you\'re applying to!<\/p><\/div>',
                checked: false,
                users: [],
                remarks: null,
                resources: [
                    {
                        link: "https:\/\/www.collegeessayguy.com\/blog\/personal-statement",
                        text: "Guide to Personal Statement - College Essay Guy",
                    },
                ],
            },
            {
                id: 30,
                title: "Write Supplemental Essays",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 7,
                    title: "common app",
                },
                estimated_time: "11th Grade Summer - 12th Grade Fall",
                type: "Require",
                description:
                    '<p>Supplemental essays are additional essays required by some colleges beyond the Common Application Personal Statement. They give you an opportunity to provide more insight into your experiences, interests, and fit for the school. While the Common App essay offers a broader view of who you are, supplemental essays allow you to focus on specific topics, such as your interest in the school or program, how you\u2019ll contribute to the campus community, or how your experiences align with their values.<\/p><p class="font-bold">Why Supplemental Essays Are Important?<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">Highlight your interest in the school: Show why this particular college is a perfect match for your goals and interests.<\/li><li class="-indent-6 pl-0.5 list-disc">Demonstrate fit: Explain how your background, experiences, and values align with the school\u2019s mission and culture.<\/li><li class="-indent-6 pl-0.5 list-disc">Stand out from other applicants: These essays help you showcase what makes you unique and what you can bring to the campus community.<\/li><\/ul><p class="font-bold">Common Types of Supplemental Essays<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">Why This School? These essays ask why you\'re interested in the college. Mention specific programs, faculty, or aspects of campus life that excite you.<\/li><li class="-indent-6 pl-0.5 list-disc">Why This Program? For specialized programs, explain why you\u2019re drawn to that particular field of study and how it aligns with your goals.<\/li><li class="-indent-6 pl-0.5 list-disc">Community Contribution - Discuss how you\u2019ll contribute to the school\u2019s community\u2014academically, socially, or through extracurricular involvement.<\/li><li class="-indent-6 pl-0.5 list-disc">Diversity and Inclusion - Reflect on how your background or experiences shape your perspective and how you\u2019ll contribute to the school\u2019s diverse student body.<\/li><\/ul><p class="font-bold">How to Approach the Supplemental Essay<\/p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 list-disc">Understand the Prompt: Carefully read the question to ensure you address every part and stay focused.<\/li><li class="-indent-6 pl-0.5 list-disc">Research the College\/Program: Highlight specific aspects of the school or program that align with your goals.<\/li><li class="-indent-6 pl-0.5 list-disc">Be Authentic: Share your true motivations and experiences to let your personality shine.<\/li><li class="-indent-6 pl-0.5 list-disc">Provide Specific Examples: Use concrete examples to back up your claims and strengthen your essay.<\/li><li class="-indent-6 pl-0.5 list-disc">Show How You Fit and Contribute: Explain how your background and skills will benefit the campus.<\/li><\/ul>',
                checked: false,
                users: [],
                remarks: null,
                resources: [
                    {
                        link: "https:\/\/www.forbes.com\/sites\/christopherrim\/2023\/09\/14\/how-to-answer-5-common-supplemental-essay-prompts\/",
                        text: "How to answer 5 common supplemental essay prompts",
                    },
                    {
                        link: "https:\/\/www.crimsoneducation.org\/vn-en\/blog\/how-to-tackle-every-type-of-supplemental-essay\/",
                        text: "Everything you need to know about supplemental essays",
                    },
                    {
                        link: "https:\/\/www.collegeessayguy.com\/supplemental-essays",
                        text: "How to Write Great Supplemental College Essays",
                    },
                ],
            },
            {
                id: 31,
                title: "Complete Letters of Recommendation",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 7,
                    title: "common app",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    '<p> Most colleges require at least one recommendation letter from your school counselor as part of your application. This letter is important because it provides admissions officers with a broader perspective on your character, work ethic, and contributions to your school community, beyond what is reflected in your grades and test scores. Your counselor\u2019s recommendation gives context to your academic achievements and paints a picture of who you are as a person, highlighting your strengths, personality, and potential for success in college. <\/p> <p> A strong counselor recommendation can help distinguish you from other applicants, especially if your grades or test scores fall within a competitive range. It can also provide insight into your involvement in extracurricular activities, leadership roles, or challenges you\u2019ve overcome. This is an opportunity for your counselor to speak to your resilience, interpersonal skills, and how you have contributed to the school environment\u2014traits that are difficult to quantify but are crucial for thriving in college. <\/p> <div> <p class="text-lg">Who can you ask for a Letter of Recommendation:<\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc">Your Head Teacher<\/li> <li class="-indent-6 pl-0.5 list-disc">Your Subject Teachers <\/li> <li class="-indent-6 pl-0.5 list-disc">Your Research Mentors <\/li> <li class="-indent-6 pl-0.5 list-disc">Your Employer<\/li> <li class="-indent-6 pl-0.5 list-disc"> Even your friend (if the school accept a Peer Recommendation!) <\/li> <\/ul> <\/div> <p> The specific number of recommendations depends on the school, but generally students ask for 2 - 3 recommendations <\/p> <div> <p class="text-lg"> To ensure your counselor writes a compelling recommendation letter, it\u2019s essential to: <\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc"> Ask Early: Provide your counselor with ample time to write the letter, ideally several weeks before the deadline. <\/li> <li class="-indent-6 pl-0.5 list-disc"> Provide Information: Share details about your achievements, aspirations, and any specific programs or activities that you\u2019d like them to mention. This could include extracurriculars, academic projects, leadership experiences, and personal challenges. <\/li><li class="-indent-6 pl-0.5 list-disc"> Be Clear About Your Goals: Let your counselor know about your college goals, the programs you are applying to, and any aspects of your personality or experiences that you\u2019d like them to emphasize. This will help them tailor the recommendation to the specific colleges and programs. <\/li> <\/ul> <\/div> <p> A well-written counselor recommendation can significantly strengthen your application, offering a more holistic view of who you are and what you can bring to the campus community. <\/p>',
                checked: false,
                users: [],
                remarks: null,
                resources: [
                    {
                        link: "https:\/\/drive.google.com\/file\/d\/1SclcvXZXTHSLnv2tmWlg_5ivOABAQI9L\/view",
                        text: "Arrowster LoR Guidee",
                    },
                    {
                        link: "https:\/\/gsi.berkeley.edu\/media\/sample-recommendation-letter.pdf",
                        text: "Sample Letter of Recommendation",
                    },
                    {
                        link: "ttps:\/\/admissions.upenn.edu\/how-to-apply\/preparing-your-application\/letters-of-recommendation",
                        text: "Tips on Preparing Letter of Recommendation",
                    },
                ],
            },
            {
                id: 32,
                title: "Complete Official High School Transcript and School Report",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 7,
                    title: "common app",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    "<p>You can request your Transcript and Academic Report from your school, covering Grades 10, 11, and 12. For Grade 9, you will have to request a separate Transcript and Academic Report from your Secondary Institution.<\/p><p>If your school does not issue Transcript and Academic Report in English, you must provide a notarized translation for your college application. Be sure to request your materials at least two weeks before your application deadline to ensure you receive it on time.<\/p>",
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 33,
                title: "Complete Common Application",
                button_text: "Review essays with a Counsellor",
                category: {
                    id: 7,
                    title: "common app",
                },
                estimated_time: "12th Grade Fall",
                type: "Require",
                description:
                    "<p>The Common Application is a standardized application platform accepted by many colleges. It includes personal information, academic history, test scores, extracurriculars, and a Personal Statement. Completing the Common App is the first step in applying to colleges that use it, providing a centralized way to submit your application materials to multiple institutions.<\/p><p>You can complete your Common Application by uploading documents and filling in information that you have been putting togeteher in all of the tasks above! Be sure to double-check all sections for accuracy and completeness before submitting<\/p>",
                checked: false,
                users: [],
                remarks: null,
                resources: [
                    {
                        link: "https:\/\/www.commonapp.org\/apply\/first-year-students",
                        text: "Check out the guide here",
                    },
                ],
            },
            {
                id: 34,
                title: "Complete Optional Art\/Music Supplements",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 7,
                    title: "common app",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    "<p>If you're applying to a program that allows or requests art or music supplements, this is your opportunity to showcase your talents.<\/p><p> Whether through portfolios, recordings, or performances, these supplements allow you to provide tangible examples of your artistic or musical abilities. If you believe your work will enhance your application, take the time to prepare and submit these materials according to the specific guidelines provided by the school.<\/p>",
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 35,
                title: "Complete Financial Aid Application",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 6,
                    title: "finances",
                },
                estimated_time: "12th Grade Fall",
                type: "Require",
                description:
                    "<p>The CSS Profile is a financial aid application required by many colleges to determine eligibility for institutional aid. It collects detailed financial information about your family\u2019s income, assets, and other financial factors.<\/p><p>Some schools also require separate scholarship applications for merit-based or need-based awards. Be sure to complete these forms accurately and submit them before deadlines to ensure you receive all financial aid opportunities.<\/p>",
                checked: false,
                users: [],
                remarks: null,
                resources: [
                    {
                        link: "https:\/\/www.collegeessayguy.com\/blog\/financial-aid-international-students",
                        text: "A Step-by-Step Financial Aid Guide for International Students",
                    },
                ],
            },
            {
                id: 36,
                title: "(Optional) Submit Early Decision Agreement",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 8,
                    title: "decision",
                },
                estimated_time: "12th Grade Fall",
                type: "Require",
                description:
                    "<p>If you're applying to a school through Early Decision (ED), you'll need to sign an Early Decision Agreement, which is a binding commitment. By submitting this agreement, you're agreeing to attend the school if admitted, and you must withdraw all other applications upon acceptance. Make sure to consult with your parents, counselor, and the admissions office to fully understand the terms and implications before submitting this agreement.<\/p>",
                checked: false,
                users: [],
                remarks: null,
                resources: [
                    {
                        link: "https:\/\/collegelab-compendium.document360.io\/docs\/ed-early-decision-agreements-explained",
                        text: "ED (Early Decision) Agreements: Explainer & FAQs",
                    },
                ],
            },
        ],
    },
    {
        id: 6,
        title: "Apply for UK",
        country_title: "united_kingdom",
        description: "",
        view: 0,
        disabled: 0,
        tasks: [
            {
                id: 37,
                title: "Write Personal Statement",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "12th Grade Summer",
                type: "optional",
                description:
                    "<p>A UCAS personal statement is a crucial 4,000-character (or 47-line) essay that forms a vital part of your UK university application. This piece of writing is your opportunity to convince admissions tutors why you deserve a place on your chosen course and demonstrate your passion, understanding, and suitability for your selected field of study. Unlike the Common App essay used in US college applications, the UCAS personal statement should focus primarily on your academic interests and subject-specific achievements rather than personal experiences.<\/p><p>The most effective UCAS personal statements follow a clear structure, typically beginning with why you're interested in the subject and what sparked your passion for it. You should then provide evidence of your commitment to the field through relevant academic achievements, independent reading, work experience, extracurricular activities, and projects. It's important to demonstrate how these experiences have developed your understanding of the subject and given you valuable skills. About 75-80% of your statement should focus on academic matters and subject-related experience, while the remaining portion can highlight relevant extracurricular activities that showcase transferable skills.<\/p><p>Since the same personal statement is sent to all your university choices (up to five), it needs to be relevant for all the courses you're applying to, even if they're slightly different. This means you should focus on the common themes and skills required across your chosen courses rather than mentioning specific universities. The statement should be well-written, free from errors, and demonstrate your ability to communicate clearly and effectively. Remember that with the 4,000-character limit, every word must count \u2013 admissions tutors are looking for concise, engaging writing that clearly shows your enthusiasm and suitability for university study in your chosen field.<\/p>",
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 38,
                title: "Complete Letters of Recommendation",
                button_text: "Review Personal Statement with a Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    '<p> Most colleges require at least one recommendation letter from your school counselor as part of your application. This letter is important because it provides admissions officers with a broader perspective on your character, work ethic, and contributions to your school community, beyond what is reflected in your grades and test scores. Your counselor\'s recommendation gives context to your academic achievements and paints a picture of who you are as a person, highlighting your strengths, personality, and potential for success in college. <\/p> <p> A strong counselor recommendation can help distinguish you from other applicants, especially if your grades or test scores fall within a competitive range. It can also provide insight into your involvement in extracurricular activities, leadership roles, or challenges you\'ve overcome. This is an opportunity for your counselor to speak to your resilience, interpersonal skills, and how you have contributed to the school environment\u2014traits that are difficult to quantify but are crucial for thriving in college. <\/p> <div> <p class="text-lg">Who can you ask for a Letter of Recommendation:<\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc">Your Head Teacher<\/li> <li class="-indent-6 pl-0.5 list-disc">Your Subject Teachers <\/li> <li class="-indent-6 pl-0.5 list-disc">Your Research Mentors <\/li> <li class="-indent-6 pl-0.5 list-disc">Your Employer<\/li> <li class="-indent-6 pl-0.5 list-disc"> Even your friend (if the school accept a Peer Recommendation!) <\/li> <\/ul> <\/div> <p> The specific number of recommendations depends on the school, but generally students ask for 2 - 3 recommendations <\/p> <div> <p class="text-lg"> To ensure your counselor writes a compelling recommendation letter, it\'s essential to: <\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc"> Ask Early: Provide your counselor with ample time to write the letter, ideally several weeks before the deadline. <\/li> <li class="-indent-6 pl-0.5 list-disc"> Provide Information: Share details about your achievements, aspirations, and any specific programs or activities that you\'d like them to mention. This could include extracurriculars, academic projects, leadership experiences, and personal challenges. <\/li><li class="-indent-6 pl-0.5 list-disc"> Be Clear About Your Goals: Let your counselor know about your college goals, the programs you are applying to, and any aspects of your personality or experiences that you\'d like them to emphasize. This will help them tailor the recommendation to the specific colleges and programs. <\/li> <\/ul> <\/div> <p> A well-written counselor recommendation can significantly strengthen your application, offering a more holistic view of who you are and what you can bring to the campus community. <\/p>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 39,
                title: "Complete Official High School Transcript and School Report",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "12th Grade Fall",
                type: "optional",
                description:
                    "<p>You can request your Transcript and Academic Report from your school, covering Grades 10, 11, and 12. For Grade 9, you will have to request a separate Transcript and Academic Report from your Secondary Institution.<\/p><p>If your school does not issue Transcript and Academic Report in English, you must provide a notarized translation for your college application. Be sure to request your materials at least two weeks before your application deadline to ensure you receive it on time.<\/p>",
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 40,
                title: "Complete UCAS",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 5,
                    title: "application",
                },
                estimated_time: "12th Grade fall",
                type: "Require",
                description:
                    '<p>UCAS (Universities and Colleges Admissions Service) is the main gateway for undergraduate university applications in the United Kingdom. This centralized platform allows students to apply to up to five UK universities or colleges through a single application. The system streamlines the application process by collecting all essential information in one place, including personal details, academic qualifications, and a personal statement. This 4,000-character personal statement is a crucial component where applicants explain their passion for their chosen subject and demonstrate why they would be an excellent fit for their selected courses.<\/p><p>To use UCAS, students first need to register on the UCAS website and create an account. They can then begin filling out their application, which includes entering their personal information, educational history, and predicted grades if they haven\'t completed their qualifications yet. After selecting their university choices and writing their personal statement, students need to obtain an academic reference, typically from a teacher or advisor.<\/p><div> <p class="text-lg">The application must be submitted by specific deadlines:<\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc"> October 15 for Oxford, Cambridge, and most medicine, dentistry, and veterinary courses<\/li> <li class="-indent-6 pl-0.5 list-disc">January 25 for most other undergraduate courses.<\/li> <\/ul> <\/div><p>Once submitted, students can track their application status through UCAS Track, where they\'ll receive university decisions and can respond to offers.<\/p>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 41,
                title: "Gather Financial Aid Application",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 6,
                    title: "finances",
                },
                estimated_time: "12th Grade fall",
                type: "Require",
                description:
                    '<div> <p class="text-lg"> Depending on your school or scholarship requirement, you may need to submit financial materials including but not limited to: <\/p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 list-disc"> Family saving bank account statement <\/li> <li class="-indent-6 pl-0.5 list-disc"> Parents\' proof of income <\/li> <\/ul> <\/div>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
            {
                id: 42,
                title: "Complete External Scholarship Application",
                button_text: "Have a question? Contact our Counsellor",
                category: {
                    id: 6,
                    title: "finances",
                },
                estimated_time: "12th Grade fall",
                type: "optional",
                description:
                    '<div><p>School scholarships are just the tip of the iceberg. Thousands of dollars in funding are waiting for students who know where to look. Government programs, corporate sponsors, professional associations, and international foundations offer scholarships that most students never discover.<\/p><\/div><div><p class="font-bold">What Really Works:<\/p><ul><li>Use targeted search platforms<\/li><li>Create comprehensive online profiles<\/li><li>Set up email alerts for new opportunities<\/li><li>Build a spreadsheet to track deadlines<\/li><\/ul><\/div><div><p class="font-bold">Some Types of Scholarships that Students Often Overlook:<\/p><ul><li>Professional association grants<\/li><li>Local foundation scholarships<\/li><li>Corporate sponsorship programs<\/li><li>Regional government education funds<\/li><\/ul><\/div><div><p class="font-bold">Generous Scholarship Funds in the UK:<\/p><ul><li>Chevening Scholarships<\/li><li>Commonwealth Scholarships<\/li><li>Gates Cambridge Scholarship<\/li><li>Rhodes Scholarship<\/li><li>UK Research and Innovation (UKRI) Scholarships<\/li><\/ul><\/div>',
                checked: false,
                users: [],
                remarks: null,
                resources: [],
            },
        ],
    },
];