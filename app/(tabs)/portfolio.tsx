import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image, ScrollView, useWindowDimensions, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';


type PortfolioType = 'front-end' | 'back-end' | 'tech-support';

interface PortfolioEntry {
    type: PortfolioType;
    title: string;
    description: string;
    screenshot: any;
    techStack: string[];
    testimonials: string[];
    link: string | null;
}

// Portfolio data example
const portfolioEntries: PortfolioEntry[] = [
    {
        type: 'front-end',
        title: 'This Website',
        description: 'A simple yet professional personal website meant to market my skills as a software developer. As a lover of UI design, I wanted to create a website that was both functional and visually appealing. I put a lot of thought into the animations especially!',
        screenshot: require('@/assets/images/this-website.png'),
        techStack: ['React Native', 'TypeScript', 'TailwindCSS', 'Expo'],
        testimonials: ["Self hosted, secure, modern, and responsive. This website is a sound example of what you will get when you hire me."],
        link: '/'
    },
    {
        type: 'front-end',
        title: 'Desert Hawk Aviation',
        description: 'A professional website for a flight school, featuring a modern design and responsive layout. Built with Next.js and React, this site showcases the school\'s services and experience. I also secured a domain name and set up a cost-effective hosting solution for the client. Additionally I set up their LinkedIn and Instagram.',
        screenshot: require('@/assets/images/desert-hawk-aviation.png'),
        techStack: ['React Native', 'TypeScript', 'NextJS', 'Docker', 'Domain Name Registration', 'Web Hosting'],
        testimonials: ['"We needed a web presence to drive marketing towards our flight school. Bryson custom built a professional website and has kept it up and secure on the internet. He also handled our social media accounts to boot! I highly recommend him for any of your web needs." \n- Tom Perkins, President, Desert Hawk Aviation'],
        link: 'https://deserthawkaviation.com'
    },
    {
        type: 'front-end',
        title: 'Daily Chits',
        description: 'A fun game inspired by wordle, where players guess a daily board game given a set of images. Optimized for web and mobile, this app features tracking of user scores and daily challenges.',
        screenshot: require('@/assets/images/daily-chits.png'),
        techStack: ['React', 'TypeScript', 'NextJS', 'Docker'],
        testimonials: ['"Bryson did a knock out job writing this website, from design to deployment. He helped me flesh out my ideas and made them a reality." \n- Daily Chits Founder'],
        link: null //todo make this link to the live site
    },
    {
        type: 'front-end',
        title: 'Calendar CMS',
        description: 'A private content management system architected for a small businesses to schedule content to be posted on their website. Secured with Auth0 and hosted on the cloud, this app allows businesses to schedule and manage their content without needing a developer.',
        screenshot: require('@/assets/images/bg-crm.png'),
        techStack: ['React Native', 'JavaScript', 'NextJS', 'Auth0'],
        testimonials: ['"I found that I was spending way too much time putting content together for my website. Bryson`s CMS allowed me to line up content when I had time, and then it would magically appear on my website right when I wanted it!" \n- Brandon Stangl, founder of Pip and Dagger'],
        link: null
    },
    {
        type: 'back-end',
        title: 'Image Web API',
        description: 'Robust REST API to handle posting and serving images and metadata. Serves as the backend for multiple web and mobile applications, featuring secure file storage, metadata management, and millisecond response times. Can be hosted on Windows or Linux servers, and can be deployed on-premises or in the cloud.',
        screenshot: require('@/assets/images/image-web-api.png'),
        techStack: ['C#', 'Postgres', 'Docker', 'Oracle Cloud', '.NET 8'],
        testimonials: [],
        link: null
    },
    {
        type: 'back-end',
        title: 'OAuth 2.0 Web API',
        description: 'A secure REST API that implements OAuth 2.0 for authentication and authorization. This API can be used to protect resources and manage user access across multiple applications. It is designed to be flexible and can be integrated with various front-end and back-end technologies.',
        screenshot: require('@/assets/images/oauth.webp'),
        techStack: ['C#', 'Postgres', '.NET 8', 'OAuth 2.0'],
        testimonials: [],
        link: null
    },
    {
        type: 'back-end',
        title: 'Server Scalability',
        description: 'As a software engineer at GlobalMed, I was responsible for ensuring our applications were highly available and could scale to handle thousands of concurrent users. I implemented load balancing, caching strategies, and optimized database queries to improve performance and reliability.',
        screenshot: require('@/assets/images/scalability.png'),
        techStack: ['C#', 'Redis', '.NET 8', 'SQL Server', 'Docker'],
        testimonials: [],
        link: null
    },
        {
        type: 'back-end',
        title: 'Electronic Healthcare Record Integration',
        description: 'As a software engineer at GlobalMed, I worked on integrating our telehealth platform with various Electronic Healthcare Record (EHR) systems. This involved developing APIs to securely exchange patient data, ensuring compliance with HIPAA regulations, and providing a seamless user experience for healthcare providers.',
        screenshot: require('@/assets/images/ehr.webp'),
        techStack: ['C#', 'API\'s', '.NET 8', 'Mongo DB', 'Docker', 'Azure'],
        testimonials: [],
        link: null
    },
    {
        type: 'tech-support',
        title: 'Stillwater Farm Retreat Website and IT Support',
        description: 'Assisted StillWater Farm Retreat with building a website to market their retreat center. Set up domain registration, hosting, and email services. Educated owner on how to build and manage the website',
        screenshot: require('@/assets/images/stillwater-farm-retreat.png'),
        techStack: ['SquareSpace', 'Domain Registration', 'Web Hosting'],
        testimonials: ['"I always wanted to build my own website, but it seemed way too complicated. Bryson built the website in front of my very eyes, educating me on how I could do it myself in the future. He was such a blessing to work with, and now I can run my own website!"\n- Stephanie Shockley, Owner and Founder'],
        link: 'https://stillwaterfarmretreat.com'
    },
    {
        type: 'tech-support',
        title: 'Allegro Music POS Migration',
        description: 'I migrated Allegro Music`s point of sale system from on-premesis to the cloud, enabling the owner to manage the same inventory from multiple locations. Helped resolve issues with cashier workstations, advising owner on the appropriate computers for his use case. Resolved issues with internet connectivity.',
        screenshot: require('@/assets/images/allegro-music.jpg'),
        techStack: ['Windows', 'Azure', 'Point of Sale'],
        testimonials: ['"Bryson came in and saved us a lot of headache and a lot of money. Buying a new license for our POS would cost thousands, but Bryson`s cloud solution was easy and effective. His knowledge about a wide range of tech topics helped us resolve several other issues" \n-Jim, Manager of Allegro Music'],
        link: null
    },
    {
        type: 'tech-support',
        title: 'Clarksville Medical Group Tech Consulting',
        description: 'Advised Clarksville Medical Group on their IT infrastructure, helping them keep their systems up to date and secure. Advised on cost saving measures and best practices for working with patient data.',
        screenshot: require('@/assets/images/caduceus.jpg'),
        techStack: ['Windows', 'Office 365', 'HIPAA Compliance'],
        testimonials: ['"I knew Bryson was an expert on HIPAA compliance from his experience in telehealth. He helped us ensure our systems were secure and modern, and he did it at a fraction of the cost of other consultants." - Clarksville Medical Group Owner'],
        link: null
    },
];

const typeLabels: Record<PortfolioType, string> = {
    'front-end': 'Front-End',
    'back-end': 'Back-End',
    'tech-support': 'Tech Support/IT',
};

// Helper to get card style for a given type
function getCardTypeStyle(type: PortfolioType) {
    switch (type) {
        case 'front-end':
            return styles.frontEndCard;
        case 'back-end':
            return styles.backEndCard;
        case 'tech-support':
            return styles.techSupportCard;
        default:
            return undefined;
    }
}

export default function PortfolioScreen() {
    const [filter, setFilter] = useState<'all' | PortfolioType>('all');
    const [modalEntry, setModalEntry] = useState<PortfolioEntry | null>(null);
    const { width } = useWindowDimensions();

    const filteredEntries = filter === 'all' ? portfolioEntries : portfolioEntries.filter(e => e.type === filter);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <LinearGradient colors={['#1D3D47', '#A1CEDC']} style={styles.gradientBackground}>
                    <Text style={styles.headerText}>Portfolio</Text>
                </LinearGradient>
            }
        >
            <ThemedView style={styles.filterRow}>
                {(['all', 'front-end', 'back-end', 'tech-support'] as const).map(type => (
                    <TouchableOpacity
                        key={type}
                        style={[styles.filterButton, filter === type && styles.filterButtonActive, getCardTypeStyle(type as PortfolioType), { borderLeftWidth: 5 }]}
                        onPress={() => setFilter(type)}
                    >
                        <Text style={[styles.filterButtonText, { color: filter === type ? '#fff' : '#1D3D47', }]}>{type === 'all' ? 'All' : typeLabels[type as PortfolioType]}</Text>
                    </TouchableOpacity>
                ))}
            </ThemedView>
            <ScrollView contentContainerStyle={styles.grid}>
                {filteredEntries.map((entry, idx) => (
                    <ThemedTouchableOpacity
                        key={idx}
                        style={[styles.card, getCardTypeStyle(entry.type)]}
                        onPress={() => setModalEntry(entry)}
                        activeOpacity={0.9}
                        lightColor='#fff'
                        darkColor='#23272B'
                        accessibilityRole="button"
                    >
                        <Image source={entry.screenshot} style={styles.thumbnail} />
                        <ThemedText style={styles.cardTitle} darkColor='' lightColor='#1D3D47'>{entry.title}</ThemedText>
                        <ThemedText style={styles.cardDesc} darkColor='' lightColor='#4F5A65'>{entry.description}</ThemedText>
                        <View style={[styles.techStackRow, { marginBottom: 8, marginTop: 'auto' }]}>
                            {entry.techStack.map((tech: string, i: number) => (
                                <ThemedView key={i} style={styles.techIconWrap} lightColor='#E3F2FD' darkColor='#1D3D47'>
                                    <ThemedText style={styles.techIconText} lightColor='#1D3D47' darkColor='#E3F2FD'>{tech}</ThemedText>
                                </ThemedView>
                            ))}
                        </View>
                    </ThemedTouchableOpacity>
                ))}
            </ScrollView>
            <Modal visible={!!modalEntry} animationType="slide" transparent onRequestClose={() => setModalEntry(null)}>
                <ThemedView style={styles.modalOverlay}>
                    <ThemedView style={styles.modalContent} lightColor='#fff' darkColor='#23272B'>
                        {modalEntry && (
                            <>
                                <ThemedText style={styles.modalTitle} lightColor='#1D3D47' darkColor='#fff'>{modalEntry.title}</ThemedText>
                                <Image source={modalEntry.screenshot} style={styles.modalImage} />
                                <ThemedText style={styles.modalDesc} lightColor='#4F5A65' darkColor=''>{modalEntry.description}</ThemedText>
                                <View style={styles.techStackRow}>
                                    {modalEntry.techStack.map((tech: string, i: number) => (
                                        <ThemedView key={i} style={styles.techIconWrap} lightColor='#E3F2FD' darkColor='#1D3D47'>
                                            <ThemedText style={styles.techIconText} lightColor='#1D3D47' darkColor='#E3F2FD'>{tech}</ThemedText>
                                        </ThemedView>
                                    ))}
                                </View>
                                {modalEntry.testimonials.length > 0 &&
                                    <ThemedView style={styles.testimonialBox} lightColor='#E3F2FD' darkColor='#1D3D47'>
                                        {modalEntry.testimonials.map((t: string, i: number) => (
                                            <ThemedText key={i} style={styles.testimonialText} lightColor='#1D3D47' darkColor='#E3F2FD'>{t}</ThemedText>
                                        ))}
                                    </ThemedView>
                                }


                                {modalEntry.link && (
                                    <ThemedTouchableOpacity
                                        style={[styles.closeButton]}
                                        lightColor='#1D3D47'
                                        darkColor='#FFF'
                                        onPress={() => Linking.openURL(modalEntry.link!)}
                                    >
                                        <ThemedText lightColor='#fff' darkColor='#1D3D47' style={styles.closeButtonText}>View Project</ThemedText>
                                    </ThemedTouchableOpacity>
                                )}
                                <ThemedTouchableOpacity 
                                    style={[styles.closeButton]} 
                                    onPress={() => setModalEntry(null)}
                                    lightColor='#EFEFEF'
                                    darkColor='#1D3D47'
                                    >
                                    <ThemedText style={[styles.closeButtonText]} lightColor='#000' darkColor='#fff'>Close</ThemedText>
                                </ThemedTouchableOpacity>
                            </>
                        )}
                    </ThemedView>
                </ThemedView>
            </Modal>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 80,
        textAlign: 'center',
    },
    filterRow: {
        flexDirection: 'row',
        marginVertical: 16,
        gap: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        overflowX: 'auto',
        overscrollBehaviorX: 'contain',
    },
    filterButton: {
        backgroundColor: '#E3F2FD',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 20,
        marginHorizontal: 4,
    },
    filterButtonActive: {
        backgroundColor: '#1D3D47',
    },
    filterButtonText: {
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 16,
        paddingBottom: 32,
    },
    card: {
        width: 320,
        borderRadius: 16,
        margin: 8,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    frontEndCard: {
        borderLeftWidth: 8,
        borderLeftColor: '#42A5F5',
    },
    backEndCard: {
        borderLeftWidth: 8,
        borderLeftColor: '#66BB6A',
    },
    techSupportCard: {
        borderLeftWidth: 8,
        borderLeftColor: '#FFA726',
    },
    thumbnail: {
        width: 260,
        height: 120,
        borderRadius: 10,
        marginBottom: 12,
        resizeMode: 'cover',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    cardDesc: {
        fontSize: 15,
        marginBottom: 8,
        textAlign: 'center',
    },
    techStackRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 6,
        justifyContent: 'center',
    },
    techIconWrap: {
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginHorizontal: 2,
        marginVertical: 2,
    },
    techIconText: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto'
    },
    modalContent: {
        borderRadius: 20,
        padding: 24,
        width: 340,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    modalImage: {
        width: 280,
        height: 140,
        borderRadius: 12,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalDesc: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    testimonialBox: {
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
    },
    testimonialText: {
        fontStyle: 'italic',
        fontSize: 15,
        textAlign: 'center',
    },
    closeButton: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 32,
        marginTop: 16,
        width: 200,
        alignContent: 'center'
    },
    closeButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});
