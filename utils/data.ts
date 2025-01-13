export const roadmapData = [
    {
        title: "PRE-APPLICATION",
        country: null,
        disable: false,
        description: 'Take a moment to consider how these four key steps - choosing your major, focusing your activities, joining competitions, and exploring internships - create a strategic foundation for your college journey. Together, they build compelling evidence that demonstrates not just your interests, but your real commitment to and experience in your chosen field of study.',
        view: false,
        tasks: [
            {
                heading: "Discover your strength and weakness",
                category: 'career',
                estimated_time: '11th Grade Fall',
                type: 'optional',
                checked: false,
                resources: [
                    {
                        text: 'Link to MBTI Test',
                        link: 'https://www.16personalities.com/free-personality-test',
                    }
                ],
                task_description: `<p>Take this MBTI test to discover your true self!</p><ul class="flex flex-col gap-1 list-inside list-disc"><li class="-indent-6 pl-6">One of the most important elements of a compelling college application is authentic self-reflection. The ability to understand and convey your true identity shapes every aspect of your application.</li><li class="-indent-6 pl-6">This test serves as a starting point for deeper self-exploration. Rather than accepting the results at face value, use them as a catalyst to examine who you are and what you aspire to achieve. These insights will not only strengthen your college applications but also guide your broader life journey.</li></ul>`,
            },
            {
                heading: "Find your ideal careers",
                category: 'career',
                estimated_time: '11th Grade Fall',
                type: 'optional',
                checked: false,
                resources: [
                    {
                        text: 'Link to O*NET Interest Profiler',
                        link: 'https://www.mynextmove.org/explore/ip',
                    },
                    {
                        text: 'How to interpret your O*NET Interest Profiler Results',
                        link: 'https://drjosephhammer.com/resources/systematic-career-exploration-approach-scea/step-1-explore-your-career-interests/onet-interest-profiler-interpretation/'
                    }
                ],
                task_description: `<p>Understanding your career path begins with understanding yourself. The O*NET Interest Profiler is a thoughtfully designed tool that helps illuminate the types of work that would bring you genuine satisfaction and engagement. It measures six fundamental dimensions of work interests:</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5">Realistic: Your connection to hands-on work with tools, machines, and physical projects</li><li class="-indent-6 pl-0.5">Investigative: Your drive to analyze, research, and understand complex questions</li><li class="-indent-6 pl-0.5">Artistic: Your inclination toward creative expression through various mediums</li><li class="-indent-6 pl-0.5">Social: Your natural orientation toward helping, teaching, and supporting others</li><li class="-indent-6 pl-0.5">Enterprising: Your capacity for leadership, persuasion, and achieving goals</li><li class="-indent-6 pl-0.5">Conventional: Your appreciation for organization, detail, and systematic approaches</li></ul><p>The assessment takes 10-30 minutes. Remember, these results aren’t meant to limit you - they’re meant to illuminate possibilities you might not have considered. Use them as a starting point to explore occupations that could align with your natural interests and talents.</p>`,
            },
            {
                heading: "Reflect on life experiences",
                category: 'career',
                estimated_time: '11th Grade Fall',
                type: 'optional',
                checked: false,
                resources: [
                    {
                        text: 'Self-reflection: the what, the why, and the how - by Simon Brownhill',
                        link: 'https://ctlc.blogs.bristol.ac.uk/2021/10/01/self-reflection-the-what-the-why-and-the-how-by-simon-brownhill/',
                    }
                ],
                task_description: `<p>Take a moment to reflect on your past experiences and how they’ve shaped who you are. You can also chat with someone you trust, whether it’s a teacher, friend, or family member.</p><p>Here are a few questions to guide your reflection, though you may find your own path of self-discovery leads to different questions entirely.</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5">What experiences keep coming back to your mind?</li><li class="-indent-6 pl-0.5">When have you felt most proud of your choices?</li><li class="-indent-6 pl-0.5">Which challenges taught you something unexpected about yourself?</li><li class="-indent-6 pl-0.5">What activities have always energized you, even as a child?</li><li class="-indent-6 pl-0.5">When did you surprise yourself by what you could do?</li></ul>`,
            },
            {
                heading: "Chooses your major",
                category: 'career',
                estimated_time: '11th Grade Fall',
                type: 'Require',
                checked: false,
                resources: [
                    {
                        text: 'Top Majors & Careers for Your Myers-Briggs Personality Type',
                        link: 'https://www.up.edu/career/career_resource_library/choosingmajors.pdf',
                    },
                    {
                        text: 'Choosing/Changing a Major: Identifying Interests and Skills (Self-assesment Worksheet)',
                        link: 'https://www.up.edu/career/career_resource_library/choosingmajors.pdf',
                    }
                ],
                task_description: "<p>Choose a major suitable to you, based on your interests, results of your MBTI test and also your career quiz.</p><p>Finalizing your major early will help you in choosing ECs related to your chosen major that will carry more weight in your college application.</p>",
            },
            {
                heading: "Take English Standardized Test (IELTS, TOEFL, Duolingo)",
                category: 'academics',
                estimated_time: '11th Grade Spring',
                type: 'Require',
                checked: false,
                resources: [
                    {
                        text: 'Sign up for: ',
                        link: '',
                    },
                    {
                        text: '[IELTS]',
                        link: 'https://www.britishcouncil.vn/en/exam/ielts/book-test',
                    },
                    {
                        text: '[DET]',
                        link: 'https://englishtest.duolingo.com/',
                    },
                    {
                        text: '[TOEFL IBT]',
                        link: 'https://www.ets.org/toefl/test-takers/ibt/register.html',
                    },
                ],
                task_description: `<p>As International Students, you are required to provide a standardized English proficiency test as part of your college application. While these tests - IELTS, TOEFL, and DET - are important markers, they’re simply meant to show colleges you can thrive in an English-speaking academic environment.</p><div><p>Here are the three most widely-accepted standardized English Test, chose the one that suit you best:</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">IELTS Academic</li><li class="-indent-6 pl-0.5 marker:content-['-']">TOEFL iBT</li><li class="-indent-6 pl-0.5 marker:content-['-']">Duolingo English Test</li></ul></div><p>Remember: These tests aren’t about achieving the highest possible score. Instead, focus on comfortably exceeding your target schools’ minimum requirements. This ensures your English proficiency won’t be a concern, allowing admissions officers to focus on the unique perspectives and experiences you bring.</p>`,
            },
            {
                heading: "Take SAT/ACT",
                category: 'academics',
                estimated_time: '11th Grade Spring',
                type: 'Require',
                checked: false,
                resources: [
                    {
                        text: 'Sign up for: ',
                        link: '',
                    },
                    {
                        text: 'SAT',
                        link: 'https://satsuite.collegeboard.org/sat/registration',
                    },
                    {
                        text: 'ACT',
                        link: 'https://www.act.org/',
                    },
                    {
                        text: 'Resources to prep for the test:',
                        link: '',
                    },
                    {
                        text: '1600.io',
                        link: 'https://1600.io/',
                    },
                    {
                        text: "Khan Academy's Official Digital SAT Prep",
                        link: 'https://www.khanacademy.org/digital-sat',
                    },
                ],
                task_description: "<p>While this item is required for some college and is optional for some, having a standardized test score will also help put your previous training into perspective and help admission officers be more confidence in your success in college.</p>",
            },
            {
                heading: "Take AP Tests",
                category: 'academics',
                estimated_time: '11th Grade Spring',
                type: 'optional',
                checked: false,
                resources: [
                    {
                        text: 'Choosing AP Courses',
                        link: 'https://apstudents.collegeboard.org/choosing-courses',
                    },
                    {
                        text: 'Register for AP Exam',
                        link: 'https://apstudents.collegeboard.org/register-for-ap-exams',
                    },
                    {
                        text: 'Information about AP Exams',
                        link: 'https://apstudents.collegeboard.org/ap-exams-what-to-know',
                    },
                ],
                task_description: `<p>AP tests can strengthen your academic story. These subject-specific exams not only demonstrate your readiness for college-level work but also offer a universal way to showcase your abilities, regardless of your high school curriculum.</p><p>Here’s why AP tests are worth considering:</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">They validate your mastery in specific subjects that align with your intended major</li><li class="-indent-6 pl-0.5 marker:content-['-']">They can translate into actual college credits, giving you a head start in your college journey</li><li class="-indent-6 pl-0.5 marker:content-['-']">You can take them without enrolling in AP classes - particularly valuable if your school doesn’t offer an international curriculum</li><li class="-indent-6 pl-0.5 marker:content-['-']">They provide external validation of your academic abilities through a standardized measure that colleges trust</li></ul>`,
                cta: {
                    label: "Register for AP Test",
                    link: "https://apstudents.collegeboard.org/register-for-ap-exams"
                }
            },
            {
                heading: "Create a list of activities",
                category: 'extracurricular',
                estimated_time: '11th Grade Spring',
                type: 'Require',
                checked: false,
                task_description: `<p>Your activities list is more than just a checklist—it's your chance to show colleges who you are beyond academics. This section highlights your passions, commitments, and the impact you’ve made in your community or personal growth journey. Admissions officers use this to understand your character, leadership skills, and how you spend your time outside the classroom.</p><p>Choose your ECs strategically based on your major and your interests. You should finalize your ECs before the summer of Grade 11 to make time to do the actual activity. Based on your interests, here are some activities Arrowster suggest that you take-part in. However, always remember: quality is always more important than quantity. Choose a few activities that excites you and participate actively</p><p class="font-semibold text-lg">Types of Activities to Include</p><ul class="flex flex-col gap-1 list-inside list-decimal pl-6"><li class="-indent-6 pl-0.5">School Clubs and Organizations<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Debate Team, Robotics Club, Student Government, Yearbook Committee.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Demonstrates teamwork, leadership, and initiative within your school community.</li></ul></li><li class="-indent-6 pl-0.5">Volunteer Work and Community Service<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Tutoring underprivileged students, organizing food drives, environmental cleanups.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Highlights empathy, social responsibility, and dedication to making a difference.</li></ul></li><li class="-indent-6 pl-0.5">Leadership Roles<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Class President, Team Captain, Founder of a local project or club.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Reflects your ability to inspire and lead others.</li></ul></li><li class="-indent-6 pl-0.5">Athletics<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Varsity sports, club teams, recreational leagues.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Shows commitment, discipline, and teamwork skills.</li></ul></li><li class="-indent-6 pl-0.5">Arts and Creative Pursuits<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Music, theater, dance, visual arts, filmmaking, writing.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Demonstrates creativity, passion, and personal expression.</li></ul></li><li class="-indent-6 pl-0.5">Internships and Work Experience<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Part-time jobs, internships in industries of interest, family business contributions.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Indicates responsibility, real-world experience, and career exploration.</li></ul></li><li class="-indent-6 pl-0.5">Personal Projects or Hobbies<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Building a website, writing a novel, starting a blog, learning a new instrument.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Reflects your curiosity, initiative, and self-motivation.</li></ul></li></ul><div><p class="font-semibold text-lg">When filling out your activities list:</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">Focus on quality, not quantity—colleges value meaningful involvement over having many activities.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Be specific! Use action verbs and quantify your achievements (e.g., "Organized a fundraiser that raised $5,000 for local shelters").</li><li class="-indent-6 pl-0.5 marker:content-['-']">Highlight leadership, impact, and growth wherever possible.</li></ul></div>`,
            },
            {
                heading: "Join relevant competitions",
                category: 'extracurricular',
                estimated_time: '11th Grade Spring',
                type: 'Require',
                checked: false,
                resources: [
                    {
                        text: 'Competition List (Updated Continuosly) - Debate Competiton',
                        link: 'https://docs.google.com/spreadsheets/d/1R9s3MAh1H_7rJ9NQhO18p6o7bvekrIDTk27l7emXk6o/edit?gid=2136922681#gid=2136922681',
                    },
                ],
                task_description: `<p>Achieving success in competitions can significantly enhance your application. The impact of these accomplishments on your application will be influenced by the following factors:</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5">Scale of the competition</li><li class="-indent-6 pl-0.5">Reputation and level of competitiveness</li><li class="-indent-6 pl-0.5">Relevance to your chosen field of study</li></ul>`,
            },
            {
                heading: "Join or establish an interest-related club",
                category: 'extracurricular',
                estimated_time: '11th Grade Spring',
                type: 'Require',
                checked: false,
                task_description: `<p>Your activities list is more than just a checklist—it's your chance to show colleges who you are beyond academics. This section highlights your passions, commitments, and the impact you’ve made in your community or personal growth journey. Admissions officers use this to understand your character, leadership skills, and how you spend your time outside the classroom.</p><p class="font-semibold text-lg">Types of Activities to Include</p><ul class="flex flex-col gap-1 list-inside list-decimal pl-6"><li class="-indent-6 pl-0.5">School Clubs and Organizations<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Debate Team, Robotics Club, Student Government, Yearbook Committee.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Demonstrates teamwork, leadership, and initiative within your school community.</li></ul></li><li class="-indent-6 pl-0.5">Volunteer Work and Community Service<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Tutoring underprivileged students, organizing food drives, environmental cleanups.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Highlights empathy, social responsibility, and dedication to making a difference.</li></ul></li><li class="-indent-6 pl-0.5">Leadership Roles<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Class President, Team Captain, Founder of a local project or club.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Reflects your ability to inspire and lead others.</li></ul></li><li class="-indent-6 pl-0.5">Athletics<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Varsity sports, club teams, recreational leagues.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Shows commitment, discipline, and teamwork skills.</li></ul></li><li class="-indent-6 pl-0.5">Arts and Creative Pursuits<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Music, theater, dance, visual arts, filmmaking, writing.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Demonstrates creativity, passion, and personal expression.</li></ul></li><li class="-indent-6 pl-0.5">Internships and Work Experience<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Part-time jobs, internships in industries of interest, family business contributions.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Indicates responsibility, real-world experience, and career exploration.</li></ul></li><li class="-indent-6 pl-0.5">Personal Projects or Hobbies<ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-6 pl-0.5 marker:content-['-']">What: Building a website, writing a novel, starting a blog, learning a new instrument.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Why: Reflects your curiosity, initiative, and self-motivation.</li></ul></li></ul><div><p class="font-semibold text-lg">When filling out your activities list:</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">Focus on quality, not quantity—colleges value meaningful involvement over having many activities.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Be specific! Use action verbs and quantify your achievements (e.g., "Organized a fundraiser that raised $5,000 for local shelters").</li><li class="-indent-6 pl-0.5 marker:content-['-']">Highlight leadership, impact, and growth wherever possible. Your activities list is your opportunity to show the admissions team how you’ll contribute to their campus community!</li></ul></div><p>You can see the guide above on the required information for a complete activity list and tips on how to fill it out!</p>`,
            },
            {
                heading: "(Optional) Complete an internship",
                category: 'extracurricular',
                estimated_time: '11th Grade Summer',
                type: 'Require',
                checked: false,
                resources: [
                    {
                        text: 'Topcv.vn - Largest Vietnamese job portal',
                        link: '',
                    },
                    {
                        text: 'Ybox.vn - Youth and internship focused',
                        link: '',
                    },
                    {
                        text: 'Glints.com/vn - Multi-country professional network ',
                        link: '',
                    },
                    {
                        text: 'Vietnamworks.com - Premium careers platform ',
                        link: '',
                    },
                    {
                        text: 'Jobstreet.vn - Wide range job listings ',
                        link: '',
                    },
                    {
                        text: '123job.vn - New generation job board',
                        link: '',
                    },
                    {
                        text: 'Vn.indeed.com - Global jobs localized',
                        link: '',
                    },
                    {
                        text: 'Vieclam24h.vn - Comprehensive job site',
                        link: '',
                    },
                    {
                        text: 'Mywork.com.vn - All-level positions portal',
                        link: '',
                    },
                    {
                        text: 'Careerbuilder.vn - US-backed recruitment site',
                        link: '',
                    },
                    {
                        text: 'Timviec365.vn - Free posting platform',
                        link: '',
                    },
                    {
                        text: 'Jobsgo.vn - Smart job matching',
                        link: '',
                    },
                    {
                        text: 'Careerlink.vn - Location-based job search',
                        link: '',
                    },
                    {
                        text: 'Topdev.vn - IT specialists platform Itviec.com - Tech recruitment hub',
                        link: '',
                    },
                ],
                task_description: `<p>If possible, seek an internship related to your intended major. It shows your passion, commitment, and readiness for future challenges.</p><p>Getting a meaningful internship in high school might seem impossible. While your college friends have career fairs and established recruiting paths, you're left wondering if anyone will take a chance on you. But here's the truth: real opportunities exist, even if the path isn't obvious.</p><div><p class="font-semibold text-lg">Two Things Matter Most:</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">Who You Know - Your network</li><li class="-indent-6 pl-0.5 marker:content-['-']">How Bold You Are - Sometimes you need to ignore the "requirements" and just go for it</li></ul></div><div><p class="font-semibold text-lg">Start Building Your Network (You Already Have One):</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">Your teachers are your first champions - build genuine relationships with them</li><li class="-indent-6 pl-0.5 marker:content-['-']">Connect with your friends' parents who work in interesting fields</li><li class="-indent-6 pl-0.5 marker:content-['-']">Join online communities where professionals hang out (Stack Overflow, GitHub, relevant forums)</li></ul></div><div><p class="font-semibold text-lg">Be Bold:</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">Apply for college internships anyway - my friend landed at NASA this way</li><li class="-indent-6 pl-0.5 marker:content-['-']">Reach out directly to companies you admire</li><li class="-indent-6 pl-0.5 marker:content-['-']">Don't limit yourself to familiar industries</li><li class="-indent-6 pl-0.5 marker:content-['-']">Keep following up - persistence often matters more than perfection</li></ul></div><p>Remember: Companies aren't just looking for experience (you're in high school - they know you don't have much). They're looking for curiosity, initiative, and eagerness to learn. Sometimes getting that dream internship is simply about being brave enough to ask and persistent enough to keep asking.</p><p>Your first step? Pick one person in your network - a teacher, a friend's parent, anyone - and reach out this week. The worst they can say is no.</p>`,
            },
            {
                heading: "(Optional) Prepare your Resume",
                category: 'extracurricular',
                estimated_time: '11th Grade Summer',
                type: 'Require',
                checked: false,
                resources: [
                    {
                        text: 'Resume Template',
                        link: 'https://careerservices.fas.harvard.edu/resources/bullet-point-resume-template/',
                    },
                    {
                        text: 'Resume and Cover Letter Guidee',
                        link: 'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2024/10/2024-HES_resume-and-letter.pdf',
                    },
                ],
                task_description: `<p>Your resume or CV is a crucial part of your college application. It provides admissions officers with a concise, well-organized snapshot of your academic, extracurricular, and personal achievements, helping them understand your skills, interests, and potential contributions to their campus.</p><div><p class="font-semibold text-lg">Structure of a successful CV:</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">Personal Information: Name, contact details.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Education: GPA, relevant coursework, standardized test scores.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Awards and Honors: Academic or extracurricular recognition.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Activities: Clubs, leadership roles, community service, work experience.</li><li class="-indent-6 pl-0.5 marker:content-['-']">General Skills and Interests: Languages, technical skills, or hobbies.</li></ul></div><div><p class="font-semibold text-lg">Why Your Resume Matters</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">Shows Depth: Goes beyond what’s in your application by detailing how you spend your time and what you’ve achieved.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Demonstrates Fit: Highlights your alignment with the school’s values and programs.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Professional Presentation: Reflects your ability to organize and present information clearly.</li></ul></div>`,
            },
            {
                heading: "Create your School List ",
                category: 'school list',
                estimated_time: '11th Grade Summer',
                type: 'Require',
                checked: false,
                resources: [
                    {
                        text: 'How to build your College List',
                        link: 'https://apply.jhu.edu/hopkins-insider/how-to-build-your-college-list/',
                    },
                    {
                        text: 'How to make a College Listt',
                        link: 'https://www.usnews.com/education/best-colleges/articles/how-to-make-a-college-list',
                    },
                ],
                task_description: `<p>Crafting your college list is about balancing ambition with practicality while staying true to your dreams. Here are the key steps:</p><div><h2 class="text-lg font-semibold">Imagine Your Ideal College Life</h2><p class="py-1">What excites you most?</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">City buzz with endless opportunities?</li><li class="-indent-6 pl-0.5 marker:content-['-']">Quiet campuses with intellectual vibes?</li></ul><p>Be sure to identify your academic and personal priorities, as well as factors like location, school size, living cost, majors offered, campus culture, and so on. This will help you find good matches.</p></div><div><h2 class="text-lg font-semibold">Build Your List</h2><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">Reach Schools (Dream Big)</li><li class="-indent-6 pl-2.5 marker:content-['+']">Highly competitive; your profile is slightly below average.</li><li class="-indent-6 pl-2.5 marker:content-['+']">Apply to 3-4 schools where you’d be thrilled to get in.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Target Schools (Your Fit)</li><li class="-indent-6 pl-2.5 marker:content-['+']">Academically and socially aligned with your profile.</li><li class="-indent-6 pl-2.5 marker:content-['+']">Choose 4-5 schools that feel just right for you.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Safety Schools (Strong Backups)</li><li class="-indent-6 pl-2.5 marker:content-['+']">Your stats exceed their averages; acceptance is very likely.</li><li class="-indent-6 pl-2.5 marker:content-['+']">Pick 2-3 schools you’d be happy to attend</li></ul></div><div><h2 class="text-lg font-semibold">Talk to Your Counselor</h2><p class="py-1">Your school counselor is a valuable resource in this process. They know your academic record, strengths, and career aspirations and can match you with schools that fit:</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">Help you identify potential reach, target, and safety schools.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Provide insider tips on admissions trends or popular schools among past students.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Write a strong recommendation letter that complements your application.</li></ul><p>Share your goals and interests openly, so they can guide you more effectively!</p></div><div><h2 class="text-lg font-semibold">Attend College Fairs and Info Sessions</h2><p class="py-1">These events are gold mines for gathering information. They allow you to explore a wide range of colleges, learn about their unique offerings, and connect directly with admissions officers. Here is how to make the most of it:</p><ul class="flex flex-col gap-1 list-inside list-disc pl-6"><li class="-indent-6 pl-0.5 marker:content-['-']">Prepare questions ahead of time about programs, campus life, or admissions.</li><li class="-indent-6 pl-0.5 marker:content-['-']">Collect brochures and take notes to compare later.</li></ul></div><div><h2 class="text-lg font-semibold">Visit Campuses If Possible</h2><p>Nothing beats experiencing a campus firsthand. A visit lets you gauge the vibe of the school and whether it feels like “home." If you can’t visit in person, many schools offer virtual tours and Q&A sessions with current students. You can find more information on each school's website and social media!</p></div>`,
            },
        ],
    },
    {
        title: "Apply for EU",
        country: "europe",
        disable: false,
        description: "",
        view: false,
        tasks: [
            {
                heading: "(Optional) Write Personal Statement ",
                category: 'application',
                estimated_time: '12th Grade Summer',
                type: 'optional',
                checked: false,
                resources: [
                    {
                        text: "Arrowster's Personal Statement and SoP Guide",
                        link: 'https://drive.google.com/file/d/1O3WFx106A1xnYaRVaxiI-d57KU6eFR31/view',
                    },
                    {
                        text: "Deakin University's Personal Statement Guide",
                        link: 'https://www.deakin.edu.au/study/how-to-apply/preparing-your-application/how-to-write-a-personal-statement',
                    },
                    {
                        text: 'Guide for SoP for Netherlands',
                        link: 'https://collegedunia.com/netherlands/article/statement-of-purpose-for-netherlands',
                    },
                ],
                task_description: `<p>Depends on your school, you might be required to submit a Personal Statement along with your application. A personal statement is your opportunity to stand out in a competitive university application process. It serves as a compelling narrative that goes beyond grades, allowing you to showcase your unique qualities, motivations, and potential.</p><p>Here are some key steps to writing a compelling Personal Statement</p><div><p class="font-bold">Preparation</p><p>Read university guidelines carefully</p><p>Brainstorm and outline your experiences, achievements, and goals</p></div><div><p class="font-bold">Crafting Your Statement</p><p>Create an engaging introduction highlighting your field of interest</p><p>Demonstrate motivation through specific experiences and skills</p><p>Connect your personal goals with the university's program</p><p>Reflect on challenges and personal growth</p></div><div><p class="font-bold">Writing Tips:</p><p>Be authentic and unique</p><p>Use clear, concise language</p><p>Provide concrete examples</p><p>Avoid clichés and generic statements</p></div><div><p class="font-bold">What to Avoid:</p><p>Eliminate irrelevant information</p><p>Steer clear of personal drama or controversial topics</p><p>Refrain from exaggerations or resume repetition</p><p>Minimize technical jargon</p></div><p>Remember, your goal is to create a personal statement that compellingly demonstrates your potential, passion, and fit for the program.</p>`,
            },
            {
                heading: "(Optional) Complete Letters of Recommendation",
                category: 'application',
                estimated_time: '12th Grade Summer',
                type: 'optional',
                checked: false,
                task_description: `<p> Most colleges require at least one recommendation letter from your school counselor as part of your application. This letter is important because it provides admissions officers with a broader perspective on your character, work ethic, and contributions to your school community, beyond what is reflected in your grades and test scores. Your counselor’s recommendation gives context to your academic achievements and paints a picture of who you are as a person, highlighting your strengths, personality, and potential for success in college. </p> <p> A strong counselor recommendation can help distinguish you from other applicants, especially if your grades or test scores fall within a competitive range. It can also provide insight into your involvement in extracurricular activities, leadership roles, or challenges you’ve overcome. This is an opportunity for your counselor to speak to your resilience, interpersonal skills, and how you have contributed to the school environment—traits that are difficult to quantify but are crucial for thriving in college. </p> <div> <p class="text-lg">Who can you ask for a Letter of Recommendation:</p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 marker:content-['-']">our Head Teacher</li> <li class="-indent-6 pl-0.5 marker:content-['-']">Your Subject Teachers </li> <li class="-indent-6 pl-0.5 marker:content-['-']">Your Research Mentors </li> <li class="-indent-6 pl-0.5 marker:content-['-']">Your Employer</li> <li class="-indent-6 pl-0.5 marker:content-['-']"> Even your friend (if the school accept a Peer Recommendation!) </li> </ul> </div> <p> The specific number of recommendations depends on the school, but generally students ask for 2 - 3 recommendations </p> <div> <p class="text-lg"> To ensure your counselor writes a compelling recommendation letter, it’s essential to: </p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 marker:content-['-']"> Ask Early: Provide your counselor with ample time to write the letter, ideally several weeks before the deadline. </li> <li class="-indent-6 pl-0.5 marker:content-['-']"> Provide Information: Share details about your achievements, aspirations, and any specific programs or activities that you’d like them to mention. This could include extracurriculars, academic projects, leadership experiences, and personal challenges. </li> <li class="-indent-6 pl-0.5 marker:content-['-']"> Be Clear About Your Goals: Let your counselor know about your college goals, the programs you are applying to, and any aspects of your personality or experiences that you’d like them to emphasize. This will help them tailor the recommendation to the specific colleges and programs. </li> </ul> </div> <p> A well-written counselor recommendation can significantly strengthen your application, offering a more holistic view of who you are and what you can bring to the campus community. </p>`,
            },
            {
                heading: "Complete Official High School Transcript and School Report",
                category: 'application',
                estimated_time: '12th Grade Fall',
                type: 'optional',
                checked: false,
                task_description: `<p>You can request your Transcript and Academic Report from your school, covering Grades 10, 11, and 12. For Grade 9, you will have to request a separate Transcript and Academic Report from your Secondary Institution.</p><p>If your school does not issue Transcript and Academic Report in English, you must provide a notarized translation for your college application. Be sure to request your materials at least two weeks before your application deadline to ensure you receive it on time.</p>`,
            },
            {
                heading: "(Optional) Gather Financial Aid Application",
                category: 'finances',
                estimated_time: '12th Grade Fall',
                type: 'optional',
                checked: false,
                task_description: `<div> <p class="text-lg"> Depending on your school or scholarship requirement, you may need to submit financial materials including but not limited to: </p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 marker:content-['-']"> Family saving bank account statement </li> <li class="-indent-6 pl-0.5 marker:content-['-']"> Parents' proof of income </li> </ul> </div>`,
            },
            {
                heading: "(Optional) Complete External Scholarship Application (Optional)",
                category: 'finances',
                estimated_time: '12th Grade Fall',
                type: 'optional',
                checked: false,
                task_description: `<p>School scholarships are just the tip of the iceberg. Thousands of euros in funding are waiting for students who know where to look. Government programs, corporate sponsors, professional associations, and international foundations offer scholarships that most students never discover.</p><div><p class="font-bold">What Really Works:</p><p>Use targeted search platforms like Scholarships.com and Fastweb</p><p>Create comprehensive online profiles</p><p>Set up email alerts for new opportunities</p><p>Build a spreadsheet to track deadlines</p></div><div><p class="font-bold">Some Types of Scholarships that Students Often Overlook:</p><p>Professional association grants</p><p>Local foundation scholarships</p><p>Corporate sponsorship programs</p><p>Regional government education funds</p></div><div><p class="font-bold">Generous Scholarship Funds in the EU:</p><p>Erasmus Mundus Scholarships</p><p>Deutschlandstipendium for international students</p><p>Stipendium Hungaricum Scholarship</p><p>Orange Tulip Scholarship</p></div>`,
            },
        ],
    },
    // {
    //     title: "Apply for UK",
    //     country: "united_kingdom",
    //     disable: false,
    //     description: "",
    //     view: false,
    //     tasks: [
    //         {
    //             heading: "Complete Personal Statement",
    //             estimated_time: "15/12/2024",
    //             type: 'optional',
    //             checked: false,
    //             task_description: `<p>Depends on your school, you might be required to submit a Personal Statement along with your application. A personal statement is your opportunity to stand out in a competitive university application process. It serves as a compelling narrative that goes beyond grades, allowing you to showcase your unique qualities, motivations, and potential.</p><p>Here are some key steps to writing a compelling Personal Statement</p><div><p class="font-bold">Preparation</p><p>Read university guidelines carefully</p><p>Brainstorm and outline your experiences, achievements, and goals</p></div><div><p class="font-bold">Crafting Your Statement</p><p>Create an engaging introduction highlighting your field of interest</p><p>Demonstrate motivation through specific experiences and skills</p><p>Connect your personal goals with the university's program</p><p>Reflect on challenges and personal growth</p></div><div><p class="font-bold">Writing Tips:</p><p>Be authentic and unique</p><p>Use clear, concise language</p><p>Provide concrete examples</p><p>Avoid clichés and generic statements</p></div><div><p class="font-bold">What to Avoid:</p><p>Eliminate irrelevant information</p><p>Steer clear of personal drama or controversial topics</p><p>Refrain from exaggerations or resume repetition</p><p>Minimize technical jargon</p></div><div><p class="font-bold">Before you Submit:</p><p>Proofread meticulously</p><p>Seek feedback from mentors</p><p>Edit multiple times</p><p>Submit well before the deadline</p></div><p>Remember, your goal is to create a personal statement that compellingly demonstrates your potential, passion, and fit for the program.</p>`,
    //         },
    //         {
    //             heading: "Submit Application",
    //             estimated_time: "16/12/2024",
    //             type: 'Require',
    //             checked: false,
    //             task_description: `<p>Things to look out before submitting your application:</p><div><p class="font-bold">Website Review and Requirements</p><p>Double-check the college's official website for application deadlines and required documentation</p><p>Verify all necessary forms are identified and properly sourced</p><p>Ensure standardized test scores (ACT/SAT) have been submitted</p><p>Understand what specific qualities and attributes the college values in applicants</p></div><div><p class="font-bold">Strategic Planning and Timing</p><p>Schedule specific days and times for completing each college application</p><p>Avoid last-minute submissions by planning well ahead of deadlines</p><p>Create a structured timeline if applying to multiple institutions</p><p>Allow sufficient time for thorough completion of all components</p></div><div><p class="font-bold">Quality Control and Proofreading</p><p>Have another person review your essay for content and clarity</p><p>Carefully check for spelling errors and grammatical mistakes</p><p>Ensure all application sections are completed according to instructions</p><p>Review formatting and presentation of all submitted materials</p></div><div><p class="font-bold">Third-Party Document Verification</p><p>Follow up on letters of recommendation from teachers and counselors</p><p>Confirm submission of school reports and counselor evaluations</p><p>Track delivery of official test scores and transcripts</p><p>Maintain professional communication with school staff handling your documents</p></div><div><p class="font-bold">Record Keeping and Final Steps</p><p>Save digital copies of all submitted applications (screenshots or PDFs)</p><p>Print hard copies for personal records</p><p>Document submission confirmations and reference numbers</p><p>Keep track of login credentials for application portals</p></div><div><p class="font-bold">Application Enhancement Strategies</p><p>Showcase academic achievements and challenging coursework</p><p>Highlight leadership roles and meaningful extracurricular activities</p><p>Demonstrate personal growth and genuine enthusiasm for learning</p><p>Align application content with each college's specific values and mission</p><p>Present a well-rounded profile combining academics, activities, and character</p></div>`,
    //         },
    //         {
    //             heading: "Submit Outside Scholarship Application",
    //             estimated_time: "16/12/2024",
    //             type: 'optional',
    //             checked: false,
    //             task_description: `<div><p>School scholarships are just the tip of the iceberg. Thousands of dollars in funding are waiting for students who know where to look. Government programs, corporate sponsors, professional associations, and international foundations offer scholarships that most students never discover.</p></div><div><p class="font-bold">What Really Works:</p><ul><li>Use targeted search platforms</li><li>Create comprehensive online profiles</li><li>Set up email alerts for new opportunities</li><li>Build a spreadsheet to track deadlines</li></ul></div><div><p class="font-bold">Some Types of Scholarships that Students Often Overlook:</p><ul><li>Professional association grants</li><li>Local foundation scholarships</li><li>Corporate sponsorship programs</li><li>Regional government education funds</li></ul></div><div><p class="font-bold">Generous Scholarship Funds in the UK:</p><ul><li>Chevening Scholarships</li><li>Commonwealth Scholarships</li><li>Gates Cambridge Scholarship</li><li>Rhodes Scholarship</li><li>UK Research and Innovation (UKRI) Scholarships</li></ul></div>`,
    //         },
    //     ],
    // },
    {
        title: "Apply for Australia",
        country: "australia",
        disable: false,
        description: "",
        view: false,
        tasks: [
            {
                heading: "(Optional) Write Personal Statement",
                category: 'application',
                estimated_time: '12th Grade Fall',
                type: 'optional',
                checked: false,
                resources: [
                    {
                        text: "Arrowster's Personal Statement and SoP Guide",
                        link: 'https://drive.google.com/file/d/1O3WFx106A1xnYaRVaxiI-d57KU6eFR31/view',
                    },
                    {
                        text: "Deakin University's Personal Statement Guide",
                        link: 'https://www.deakin.edu.au/study/how-to-apply/preparing-your-application/how-to-write-a-personal-statement',
                    },
                    {
                        text: 'Guide for SoP for Netherlands',
                        link: 'https://collegedunia.com/netherlands/article/statement-of-purpose-for-netherlands',
                    },
                ],
                task_description: `<p>Depends on your school, you might be required to submit a Personal Statement along with your application. A personal statement is your opportunity to stand out in a competitive university application process. It serves as a compelling narrative that goes beyond grades, allowing you to showcase your unique qualities, motivations, and potential.</p><p>Here are some key steps to writing a compelling Personal Statement:</p><div><p class="font-bold">Preparation</p><p>Read university guidelines carefully</p><p>Brainstorm and outline your experiences, achievements, and goals</p></div><div><p class="font-bold">Crafting Your Statement</p><p>Create an engaging introduction highlighting your field of interest</p><p>Demonstrate motivation through specific experiences and skills</p><p>Connect your personal goals with the university's program</p><p>Reflect on challenges and personal growth</p></div><div><p class="font-bold">Writing Tips:</p><p>Be authentic and unique</p><p>Use clear, concise language</p><p>Provide concrete examples</p><p>Avoid clichés and generic statements</p></div><div><p class="font-bold">What to Avoid:</p><p>Eliminate irrelevant information</p><p>Steer clear of personal drama or controversial topics</p><p>Refrain from exaggerations or resume repetition</p><p>Minimize technical jargon</p></div><p>Remember, your goal is to create a personal statement that compellingly demonstrates your potential, passion, and fit for the program.</p>`,
            },
            {
                heading: "(Optional) Complete Letters of Recommendation",
                category: 'application',
                estimated_time: '12th Grade Fall',
                type: 'optional',
                checked: false,
                task_description: `<p> Most colleges require at least one recommendation letter from your school counselor as part of your application. This letter is important because it provides admissions officers with a broader perspective on your character, work ethic, and contributions to your school community, beyond what is reflected in your grades and test scores. Your counselor’s recommendation gives context to your academic achievements and paints a picture of who you are as a person, highlighting your strengths, personality, and potential for success in college. </p> <p> A strong counselor recommendation can help distinguish you from other applicants, especially if your grades or test scores fall within a competitive range. It can also provide insight into your involvement in extracurricular activities, leadership roles, or challenges you’ve overcome. This is an opportunity for your counselor to speak to your resilience, interpersonal skills, and how you have contributed to the school environment—traits that are difficult to quantify but are crucial for thriving in college. </p> <div> <p class="text-lg">Who can you ask for a Letter of Recommendation:</p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 marker:content-['-']">our Head Teacher</li> <li class="-indent-6 pl-0.5 marker:content-['-']">Your Subject Teachers </li> <li class="-indent-6 pl-0.5 marker:content-['-']">Your Research Mentors </li> <li class="-indent-6 pl-0.5 marker:content-['-']">Your Employer</li> <li class="-indent-6 pl-0.5 marker:content-['-']"> Even your friend (if the school accept a Peer Recommendation!) </li> </ul> </div> <p> The specific number of recommendations depends on the school, but generally students ask for 2 - 3 recommendations </p> <div> <p class="text-lg"> To ensure your counselor writes a compelling recommendation letter, it’s essential to: </p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 marker:content-['-']"> Ask Early: Provide your counselor with ample time to write the letter, ideally several weeks before the deadline. </li> <li class="-indent-6 pl-0.5 marker:content-['-']"> Provide Information: Share details about your achievements, aspirations, and any specific programs or activities that you’d like them to mention. This could include extracurriculars, academic projects, leadership experiences, and personal challenges. </li><li class="-indent-6 pl-0.5 marker:content-['-']"> Be Clear About Your Goals: Let your counselor know about your college goals, the programs you are applying to, and any aspects of your personality or experiences that you’d like them to emphasize. This will help them tailor the recommendation to the specific colleges and programs. </li> </ul> </div> <p> A well-written counselor recommendation can significantly strengthen your application, offering a more holistic view of who you are and what you can bring to the campus community. </p>`,
            },
            {
                heading: "Complete Official High School Transcript and School Report",
                category: 'application',
                estimated_time: '12th Grade Spring',
                type: 'optional',
                checked: false,
                task_description: `<p>You can request your Transcript and Academic Report from your school, covering Grades 10, 11, and 12. For Grade 9, you will have to request a separate Transcript and Academic Report from your Secondary Institution.</p><p>If your school does not issue Transcript and Academic Report in English, you must provide a notarized translation for your college application. Be sure to request your materials at least two weeks before your application deadline to ensure you receive it on time.</p>`,
            },
            {
                heading: "(Optional) Gather Financial Aid Application",
                category: 'finances',
                estimated_time: '12th Grade Spring',
                type: 'optional',
                checked: false,
                task_description: `<div> <p class="text-lg"> Depending on your school or scholarship requirement, you may need to submit financial materials including but not limited to: </p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 marker:content-['-']"> Family saving bank account statement </li> <li class="-indent-6 pl-0.5 marker:content-['-']"> Parents' proof of income </li> </ul> </div>`,
            },
            {
                heading: "(Optional) Complete External Scholarship Application (Optional)",
                category: 'finances',
                estimated_time: '12th Grade Spring',
                type: 'optional',
                checked: false,
                task_description: `<p>School scholarships are just the tip of the iceberg. Thousands of dollars in funding are waiting for students who know where to look. Government programs, corporate sponsors, professional associations, and international foundations offer scholarships that most students never discover.</p><div><p class="font-bold">What Really Works:</p><p>Use targeted search platforms</p><p>Create comprehensive online profiles</p><p>Set up email alerts for new opportunities</p><p>Build a spreadsheet to track deadlines</p></div><div><p class="font-bold">Some Types of Scholarships that Students Often Overlook:</p><p>Professional association grants</p><p>Local foundation scholarships</p><p>Corporate sponsorship programs</p><p>Regional government education funds</p></div><div><p class="font-bold">Generous Scholarship Funds in Australia:</p><p>Australia Awards</p><p>Endeavour Leadership Program</p><p>Research Training Program (RTP)</p><p>International Postgraduate Research Scholarships (IPRS)</p></div>`,
            },
        ],
    },
    {
        title: "Apply for Canada",
        country: "canada",
        disable: false,
        description: "",
        view: false,
        tasks: [
            {
                heading: "(Optional) Write Personal Statement",
                category: 'application',
                estimated_time: '11th Grade Summer',
                type: 'optional',
                checked: false,
                resources: [
                    {
                        text: "Arrowster's Personal Statement and SoP Guide",
                        link: 'https://drive.google.com/file/d/1O3WFx106A1xnYaRVaxiI-d57KU6eFR31/view',
                    },
                    {
                        text: "Deakin University's Personal Statement Guide",
                        link: 'https://www.deakin.edu.au/study/how-to-apply/preparing-your-application/how-to-write-a-personal-statement',
                    },
                    {
                        text: 'Guide for SoP for Netherlands',
                        link: 'https://collegedunia.com/netherlands/article/statement-of-purpose-for-netherlands',
                    },
                ],
                task_description: `<p>Depends on your school, you might be required to submit a Personal Statement along with your application. A personal statement is your opportunity to stand out in a competitive university application process. It serves as a compelling narrative that goes beyond grades, allowing you to showcase your unique qualities, motivations, and potential.</p><p>Here are some key steps to writing a compelling Personal Statement</p><div><p class="font-bold">Preparation</p><p>Read university guidelines carefully</p><p>Brainstorm and outline your experiences, achievements, and goals</p></div><div><p class="font-bold">Crafting Your Statement</p><p>Create an engaging introduction highlighting your field of interest</p><p>Demonstrate motivation through specific experiences and skills</p><p>Connect your personal goals with the university's program</p><p>Reflect on challenges and personal growth</p></div><div><p class="font-bold">Writing Tips:</p><p>Be authentic and unique</p><p>Use clear, concise language</p><p>Provide concrete examples</p><p>Avoid clichés and generic statements</p></div><div><p class="font-bold">What to Avoid:</p><p>Eliminate irrelevant information</p><p>Steer clear of personal drama or controversial topics</p><p>Refrain from exaggerations or resume repetition</p><p>Minimize technical jargon</p></div><p>Remember, your goal is to create a personal statement that compellingly demonstrates your potential, passion, and fit for the program.</p>`,
            },
            {
                heading: "(Optional) Complete Letters of Recommendation",
                category: 'application',
                estimated_time: '11th Grade Summer',
                type: 'optional',
                checked: false,
                task_description: `<p> Most colleges require at least one recommendation letter from your school counselor as part of your application. This letter is important because it provides admissions officers with a broader perspective on your character, work ethic, and contributions to your school community, beyond what is reflected in your grades and test scores. Your counselor’s recommendation gives context to your academic achievements and paints a picture of who you are as a person, highlighting your strengths, personality, and potential for success in college. </p> <p> A strong counselor recommendation can help distinguish you from other applicants, especially if your grades or test scores fall within a competitive range. It can also provide insight into your involvement in extracurricular activities, leadership roles, or challenges you’ve overcome. This is an opportunity for your counselor to speak to your resilience, interpersonal skills, and how you have contributed to the school environment—traits that are difficult to quantify but are crucial for thriving in college. </p> <div> <p class="text-lg">Who can you ask for a Letter of Recommendation:</p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 marker:content-['-']">our Head Teacher</li> <li class="-indent-6 pl-0.5 marker:content-['-']">Your Subject Teachers </li> <li class="-indent-6 pl-0.5 marker:content-['-']">Your Research Mentors </li> <li class="-indent-6 pl-0.5 marker:content-['-']">Your Employer</li> <li class="-indent-6 pl-0.5 marker:content-['-']"> Even your friend (if the school accept a Peer Recommendation!) </li> </ul> </div> <p> The specific number of recommendations depends on the school, but generally students ask for 2 - 3 recommendations </p> <div> <p class="text-lg"> To ensure your counselor writes a compelling recommendation letter, it’s essential to: </p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 marker:content-['-']"> Ask Early: Provide your counselor with ample time to write the letter, ideally several weeks before the deadline. </li> <li class="-indent-6 pl-0.5 marker:content-['-']"> Provide Information: Share details about your achievements, aspirations, and any specific programs or activities that you’d like them to mention. This could include extracurriculars, academic projects, leadership experiences, and personal challenges. </li><li class="-indent-6 pl-0.5 marker:content-['-']"> Be Clear About Your Goals: Let your counselor know about your college goals, the programs you are applying to, and any aspects of your personality or experiences that you’d like them to emphasize. This will help them tailor the recommendation to the specific colleges and programs. </li> </ul> </div> <p> A well-written counselor recommendation can significantly strengthen your application, offering a more holistic view of who you are and what you can bring to the campus community. </p>`,
            },
            {
                heading: "Complete Official High School Transcript and School Report",
                category: 'application',
                estimated_time: '12th Grade Fall',
                type: 'optional',
                checked: false,
                task_description: `<p>You can request your Transcript and Academic Report from your school, covering Grades 10, 11, and 12. For Grade 9, you will have to request a separate Transcript and Academic Report from your Secondary Institution.</p><p>If your school does not issue Transcript and Academic Report in English, you must provide a notarized translation for your college application. Be sure to request your materials at least two weeks before your application deadline to ensure you receive it on time.</p>`,
            },
            {
                heading: "(Optional) Gather Financial Aid Application",
                category: 'finances',
                estimated_time: '12th Grade Fall',
                type: 'optional',
                checked: false,
                task_description: `<div> <p class="text-lg"> Depending on your school or scholarship requirement, you may need to submit financial materials including but not limited to: </p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 marker:content-['-']"> Family saving bank account statement </li> <li class="-indent-6 pl-0.5 marker:content-['-']"> Parents' proof of income </li> </ul> </div>`,
            },
            {
                heading: "(Optional) Complete External Scholarship Application (Optional)",
                category: 'finances',
                estimated_time: '12th Grade Fall',
                type: 'optional',
                checked: false,
                task_description: `<p>School scholarships are just the tip of the iceberg. Thousands of dollars in funding are waiting for students who know where to look. Government programs, corporate sponsors, professional associations, and international foundations offer scholarships that most students never discover.</p><div><p class="font-bold">What Really Works:</p><p>Use targeted search platforms</p><p>Create comprehensive online profiles</p><p>Set up email alerts for new opportunities</p><p>Build a spreadsheet to track deadlines</p></div><div><p class="font-bold">Some Types of Scholarships that Students Often Overlook:</p><p>Professional association grants</p><p>Local foundation scholarships</p><p>Corporate sponsorship programs</p><p>Regional government education funds</p></div><div><p class="font-bold">Generous Scholarship Funds in Canada:</p><p>Vanier Canada Graduate Scholarships</p><p>NSERC Postgraduate Scholarships</p><p>Pierre Elliott Trudeau Foundation Scholarships</p><p>International Postgraduate Research Scholarships</p></div>`,
            },
        ],
    },
    {
        title: "Apply for US",
        country: "united_states",
        disable: false,
        description: "",
        view: false,
        tasks: [
            {
                heading: "Write Personal Statement",
                category: 'common app',
                estimated_time: '11th Grade Summer',
                type: 'Require',
                checked: false,
                resources: [
                    {
                        text: 'Guide to Personal Statement - College Essay Guy',
                        link: 'https://www.collegeessayguy.com/blog/personal-statement',
                    },
                ],
                task_description: `<div><p>The Personal Statement is a critical part of your college application, offering you the opportunity to present yourself beyond your grades and test scores. It's your chance to share your unique story, personality, and perspective with the admissions team. Unlike other sections of your application, the Personal Statement allows you to communicate directly who you are, what drives you, and how you’ll contribute to the campus community.</p></div><div><p class="font-bold">How to Approach It</p><ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-3 pl-0.5 marker:content-['-']">Be Authentic: Your Personal Statement should reflect your true self. Don’t try to write what you think the admissions team wants to hear. Instead, focus on what matters to you, your experiences, and the lessons you've learned.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Answer the Prompt Thoughtfully: The prompts are designed to help you dig deeper into your personal experiences. Choose the one that resonates most with you and allows you to share something meaningful. You don’t need to write about something monumental—what matters is how you frame and reflect on your experiences.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Tell a Story: A great Personal Statement is like a narrative. Whether you're recounting a challenge, describing a passion, or reflecting on a meaningful experience, aim to engage your reader with a compelling story. Make it personal, vivid, and reflective.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Show, Don’t Just Tell: Instead of simply stating facts about yourself, provide specific examples that illustrate your points. For instance, if you're writing about a personal setback, describe the situation, how it made you feel, and the actions you took to overcome it.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Reflect on Your Growth: College admissions officers are interested in how you've evolved. Whether it’s overcoming a challenge, embracing new perspectives, or discovering a passion, make sure to highlight how these experiences have shaped who you are today.</li></ul></div><div><p class="font-bold">Essay Prompts for 2024–2025</p><p>Below are the essay prompts from the 2024-2025 school year application on Common App. Choose the one that best allows you to showcase who you are:</p><ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-3 pl-0.5 marker:content-['-']">Identity, Background, Interest, or Talent: Share a background, identity, interest, or talent that’s so meaningful to you, your application would be incomplete without it.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Challenge or Setback: Recount a time you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?</li><li class="-indent-3 pl-0.5 marker:content-['-']">Questioning Beliefs or Ideas: Reflect on a time you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?</li><li class="-indent-3 pl-0.5 marker:content-['-']">Gratitude or Motivation: Reflect on something someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?</li><li class="-indent-3 pl-0.5 marker:content-['-']">Personal Growth: Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Engaging Topics or Ideas: Describe a topic, idea, or concept you find so engaging it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?</li><li class="-indent-3 pl-0.5 marker:content-['-']">Your Own Topic: Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design.</li></ul></div><div><p class="font-bold">Final Tips</p><ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-3 pl-0.5 marker:content-['-']">Stay Focused: Stick to the word limit of 650 words, making every word count.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Revise and Edit: Your first draft won’t be perfect—revise for clarity, tone, and grammar.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Seek Feedback: Ask teachers, family members, or mentors to review your essay and offer constructive feedback.</li></ul></div><div><p>The Personal Statement is your opportunity to make a strong and lasting impression. Use it wisely to present a compelling picture of who you are and why you’re a great fit for the colleges you're applying to!</p></div>`,
            },
            {
                heading: "Write Supplemental Essays",
                category: 'common app',
                estimated_time: '11th Grade Summer - 12th Grade Fall',
                type: 'Require',
                checked: false,
                resources: [
                    {
                        text: 'How to answer 5 common supplemental essay prompts',
                        link: 'https://www.forbes.com/sites/christopherrim/2023/09/14/how-to-answer-5-common-supplemental-essay-prompts/',
                    },
                    {
                        text: 'Everything you need to know about supplemental essays',
                        link: 'https://www.crimsoneducation.org/vn-en/blog/how-to-tackle-every-type-of-supplemental-essay/',
                    },
                    {
                        text: 'How to Write Great Supplemental College Essays',
                        link: 'https://www.collegeessayguy.com/supplemental-essays',
                    },
                ],
                task_description: `<p>Supplemental essays are additional essays required by some colleges beyond the Common Application Personal Statement. They give you an opportunity to provide more insight into your experiences, interests, and fit for the school. While the Common App essay offers a broader view of who you are, supplemental essays allow you to focus on specific topics, such as your interest in the school or program, how you’ll contribute to the campus community, or how your experiences align with their values.</p><p class="font-bold">Why Supplemental Essays Are Important?</p><ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-3 pl-0.5 marker:content-['-']">Highlight your interest in the school: Show why this particular college is a perfect match for your goals and interests.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Demonstrate fit: Explain how your background, experiences, and values align with the school’s mission and culture.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Stand out from other applicants: These essays help you showcase what makes you unique and what you can bring to the campus community.</li></ul><p class="font-bold">Common Types of Supplemental Essays</p><ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-3 pl-0.5 marker:content-['-']">Why This School? These essays ask why you're interested in the college. Mention specific programs, faculty, or aspects of campus life that excite you.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Why This Program? For specialized programs, explain why you’re drawn to that particular field of study and how it aligns with your goals.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Community Contribution - Discuss how you’ll contribute to the school’s community—academically, socially, or through extracurricular involvement.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Diversity and Inclusion - Reflect on how your background or experiences shape your perspective and how you’ll contribute to the school’s diverse student body.</li></ul><p class="font-bold">How to Approach the Supplemental Essay</p><ul class="flex flex-col gap-1 list-inside list-disc pl-3"><li class="-indent-3 pl-0.5 marker:content-['-']">Understand the Prompt: Carefully read the question to ensure you address every part and stay focused.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Research the College/Program: Highlight specific aspects of the school or program that align with your goals.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Be Authentic: Share your true motivations and experiences to let your personality shine.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Provide Specific Examples: Use concrete examples to back up your claims and strengthen your essay.</li><li class="-indent-3 pl-0.5 marker:content-['-']">Show How You Fit and Contribute: Explain how your background and skills will benefit the campus.</li></ul>`,
            },
            {
                heading: "Complete Letters of Recommendation",
                category: 'common app',
                estimated_time: '12th Grade Fall',
                type: 'optional',
                checked: false,
                resources: [
                    {
                        text: 'Arrowster LoR Guidee',
                        link: 'https://drive.google.com/file/d/1SclcvXZXTHSLnv2tmWlg_5ivOABAQI9L/view',
                    },
                    {
                        text: 'Sample Letter of Recommendation',
                        link: 'https://gsi.berkeley.edu/media/sample-recommendation-letter.pdf',
                    },
                    {
                        text: 'Tips on Preparing Letter of Recommendation',
                        link: 'https://admissions.upenn.edu/how-to-apply/preparing-your-application/letters-of-recommendation',
                    },
                ],
                task_description: `<p> Most colleges require at least one recommendation letter from your school counselor as part of your application. This letter is important because it provides admissions officers with a broader perspective on your character, work ethic, and contributions to your school community, beyond what is reflected in your grades and test scores. Your counselor’s recommendation gives context to your academic achievements and paints a picture of who you are as a person, highlighting your strengths, personality, and potential for success in college. </p> <p> A strong counselor recommendation can help distinguish you from other applicants, especially if your grades or test scores fall within a competitive range. It can also provide insight into your involvement in extracurricular activities, leadership roles, or challenges you’ve overcome. This is an opportunity for your counselor to speak to your resilience, interpersonal skills, and how you have contributed to the school environment—traits that are difficult to quantify but are crucial for thriving in college. </p> <div> <p class="text-lg">Who can you ask for a Letter of Recommendation:</p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 marker:content-['-']">our Head Teacher</li> <li class="-indent-6 pl-0.5 marker:content-['-']">Your Subject Teachers </li> <li class="-indent-6 pl-0.5 marker:content-['-']">Your Research Mentors </li> <li class="-indent-6 pl-0.5 marker:content-['-']">Your Employer</li> <li class="-indent-6 pl-0.5 marker:content-['-']"> Even your friend (if the school accept a Peer Recommendation!) </li> </ul> </div> <p> The specific number of recommendations depends on the school, but generally students ask for 2 - 3 recommendations </p> <div> <p class="text-lg"> To ensure your counselor writes a compelling recommendation letter, it’s essential to: </p> <ul class="flex flex-col gap-1 list-inside list-disc pl-6"> <li class="-indent-6 pl-0.5 marker:content-['-']"> Ask Early: Provide your counselor with ample time to write the letter, ideally several weeks before the deadline. </li> <li class="-indent-6 pl-0.5 marker:content-['-']"> Provide Information: Share details about your achievements, aspirations, and any specific programs or activities that you’d like them to mention. This could include extracurriculars, academic projects, leadership experiences, and personal challenges. </li><li class="-indent-6 pl-0.5 marker:content-['-']"> Be Clear About Your Goals: Let your counselor know about your college goals, the programs you are applying to, and any aspects of your personality or experiences that you’d like them to emphasize. This will help them tailor the recommendation to the specific colleges and programs. </li> </ul> </div> <p> A well-written counselor recommendation can significantly strengthen your application, offering a more holistic view of who you are and what you can bring to the campus community. </p>`,
            },
            {
                heading: "Complete Official High School Transcript and School Report",
                category: 'common app',
                estimated_time: '12th Grade Fall',
                type: 'optional',
                checked: false,
                task_description: `<p>You can request your Transcript and Academic Report from your school, covering Grades 10, 11, and 12. For Grade 9, you will have to request a separate Transcript and Academic Report from your Secondary Institution.</p><p>If your school does not issue Transcript and Academic Report in English, you must provide a notarized translation for your college application. Be sure to request your materials at least two weeks before your application deadline to ensure you receive it on time.</p>`,
            },
            {
                heading: "Complete Common Application",
                category: 'common app',
                estimated_time: '12th Grade Fall',
                type: 'Require',
                checked: false,
                resources: [
                    {
                        text: 'Check out the guide here',
                        link: 'https://www.commonapp.org/apply/first-year-students',
                    },
                ],
                task_description: "<p>The Common Application is a standardized application platform accepted by many colleges. It includes personal information, academic history, test scores, extracurriculars, and a Personal Statement. Completing the Common App is the first step in applying to colleges that use it, providing a centralized way to submit your application materials to multiple institutions.</p><p>You can complete your Common Application by uploading documents and filling in information that you have been putting togeteher in all of the tasks above! Be sure to double-check all sections for accuracy and completeness before submitting</p>",
            },
            {
                heading: "Complete Optional Art/Music Supplements",
                category: 'common app',
                estimated_time: '12th Grade Fall',
                type: 'optional',
                checked: false,
                task_description: "<p>If you're applying to a program that allows or requests art or music supplements, this is your opportunity to showcase your talents.</p><p> Whether through portfolios, recordings, or performances, these supplements allow you to provide tangible examples of your artistic or musical abilities. If you believe your work will enhance your application, take the time to prepare and submit these materials according to the specific guidelines provided by the school.</p>",
            },
            {
                heading: "Complete Financial Aid Application",
                category: 'finances',
                estimated_time: '12th Grade Fall',
                type: 'Require',
                checked: false,
                resources: [
                    {
                        text: 'A Step-by-Step Financial Aid Guide for International Students',
                        link: 'https://www.collegeessayguy.com/blog/financial-aid-international-students',
                    },
                ],
                task_description: "<p>The CSS Profile is a financial aid application required by many colleges to determine eligibility for institutional aid. It collects detailed financial information about your family’s income, assets, and other financial factors.</p><p>Some schools also require separate scholarship applications for merit-based or need-based awards. Be sure to complete these forms accurately and submit them before deadlines to ensure you receive all financial aid opportunities.</p>",
            },
            {
                heading: "(Optional) Submit Early Decision Agreement",
                category: 'decision',
                estimated_time: '12th Grade Fall',
                type: 'Require',
                checked: false,
                resources: [
                    {
                        text: 'ED (Early Decision) Agreements: Explainer & FAQs',
                        link: 'https://collegelab-compendium.document360.io/docs/ed-early-decision-agreements-explained',
                    },
                ],
                task_description: "<p>If you're applying to a school through Early Decision (ED), you'll need to sign an Early Decision Agreement, which is a binding commitment. By submitting this agreement, you're agreeing to attend the school if admitted, and you must withdraw all other applications upon acceptance. Make sure to consult with your parents, counselor, and the admissions office to fully understand the terms and implications before submitting this agreement.</p>",
            },
        ],
    },
    {
        title: "POST-APPLICATION",
        country: null,
        disable: false,
        description: "",
        view: false,
        tasks: [
            {
                heading: "Complete Final School Report and Transcript",
                category: 'application',
                estimated_time: '12th Grade Summer',
                type: 'Require',
                checked: false,
                task_description: `<p>Once you've completed your final year of high school, you'll need to submit your Final Report and Transcript to the colleges you've been accepted to. This document confirms that you've graduated and provides your final academic records, including grades from your senior year.</p><p>It’s important to request this early from your school so that it reaches the college before their deadline. This is often a requirement for enrollment and to finalize your acceptance.</p>`,
            },
            {
                heading: "(Optional) Submit Deposit & Bank Statement to College",
                category: 'decision',
                estimated_time: '12th Grade Summer',
                type: 'Require',
                checked: false,
                task_description: `<p>After receiving an offer of admission, many colleges require a deposit to confirm your enrollment. This deposit secures your place at the school and is often due shortly after your acceptance. Along with the deposit, some colleges may also ask for a bank statement to confirm that you or your family have the necessary financial resources to cover your tuition and living expenses.</p><p>The specifics deposit amount will depends on the University. Typically, the deposit is between $100 and $400, and is non-refundable.</p>`,
            },
            {
                heading: "(US Only) Obtain I-20 from College",
                category: 'visa',
                estimated_time: '12th Grade Summer',
                type: 'Require',
                checked: false,
                task_description: `<p>For international students planning to study in the U.S., the I-20 form is an essential document for obtaining a student visa. The I-20 certifies that you have been accepted to a U.S. school and have the financial resources to attend.</p><p>Once you’ve paid your deposit and submitted necessary documents, the college will issue the I-20 form. Make sure to review it carefully and store it in a safe place, as you’ll need it for your visa interview and entry into the U.S.</p>`,
            },
            {
                heading: "Apply for Student Visa",
                category: 'visa',
                estimated_time: '12th Grade Summer',
                type: 'Require',
                checked: false,
                task_description: `<p>Once you have your I-20 form, you’ll need to schedule a visa interview at your local U.S. embassy or consulate. This is an important step in the process of obtaining your student visa (F-1 Visa). Be sure to book your appointment well in advance, as slots may fill up quickly, and allow sufficient time for visa processing before your program's start date.</p><p>Prepare all necessary documents, including your I-20, passport, visa application, and financial proof, to present during your interview.</p>`,
            },
        ],
    },
];

export const onboardingData = [
    {
        title: "Getting started",
        country: null,
        disable: false,
        description: "Understanding who you are is the first step to crafting a strong college application, as you cannot convey your true self without a clear self-image.",
        view: false,
        tasks: [
            {
                heading: "Getting started with Arrowster task",
                estimated_time: '',
                category: 'tutorial',
                type: 'optional',
                checked: false,
                task_description: `<div><p>Welcome to your personalized study abroad roadmap!</p><p>Our AI and expert counselors are here to guide your journey - from exploring your interests to landing your dream school. Each step is tailored to your goals and timeline.</p><p>Ready to begin your adventure?</p></div>`,
            },
            {
                heading: "How to find school with our AI",
                estimated_time: '',
                category: 'tutorial',
                type: 'optional',
                checked: false,
                task_description: `<p>Discover the perfect school for you with our AI-powered tool! This innovative platform helps you explore various educational institutions tailored to your needs. Start by entering your preferences, such as location, subjects of interest, and desired campus culture. Our AI will analyze your input and suggest schools that align with your goals. Take your time to review the recommendations, and don't hesitate to dive deeper into each option to find the best fit for your educational journey!</p>`,
            },
            {
                heading: "Know more about our Counselor",
                estimated_time: '',
                category: 'tutorial',
                type: 'optional',
                checked: false,
                task_description: `<p>Meet our three expert counselors: Ken, Thanh, and Hayden. Each of them hails from prestigious universities and brings a wealth of experience in the study abroad sector. They are here to assist you with any questions or guidance you may need on your journey.</p>`,
            },
        ],
    },
]