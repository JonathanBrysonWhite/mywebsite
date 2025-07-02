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
        title: 'Daily Chits',
        description: 'A fun game inspired by wordle, where players guess a daily board game given a set of images. Optimized for web and mobile, this app features tracking of user scores and daily challenges.',
        screenshot: require('@/assets/images/daily-chits.png'),
        techStack: ['React', 'TypeScript', 'NextJS', 'Docker'],
        testimonials: ['"Bryson did a knock out job writing this website, from design to deployment. He helped me flesh out my ideas and made them a reality." - Daily Chits Founder'],
        link: null //todo make this link to the live site
    },
    {
        type: 'front-end',
        title: 'Calendar CMS',
        description: 'A private content management system architected for a small businesses to schedule content to be posted on their website. Secured with Auth0 and hosted on the cloud, this app allows businesses to schedule and manage their content without needing a developer.',
        screenshot: require('@/assets/images/bg-crm.png'),
        techStack: ['React Native', 'JavaScript', 'NextJS', 'Auth0'],
        testimonials: ['"I found that I was spending way too much time putting content together for my website. Bryson`s CMS allowed me to line up content when I had time, and then it would magically appear on my website right when I wanted it!" - Brandon Stangl, founder of Pip and Dagger'],
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
        techStack: ['C#', 'Postgres', '.NET 9', 'OAuth 2.0'],
        testimonials: [],
        link: null
    },
    {
        type: 'tech-support',
        title: 'Allegro Music POS Migration',
        description: 'I migrated Allegro Music`s point of sale system from on-premesis to the cloud, enabling the owner to manage the same inventory from multiple locations. Helped resolve issues with cashier workstations, advising owner on the appropriate computers for his use case. Resolved issues with internet connectivity.',
        screenshot: require('@/assets/images/allegro-music.jpg'),
        techStack: ['Windows', 'Azure', 'Point of Sale'],
        testimonials: ['"Bryson came in and saved us a lot of headache and a lot of money. Buying a new license for our POS would cost thousands, but Bryson`s cloud solution was easy and effective. His knowledge about a wide range of tech topics helped us resolve several other issues" -Jim, Manager of Allegro Music'],
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
                        style={[styles.filterButton, filter === type && styles.filterButtonActive, getCardTypeStyle(type as PortfolioType), {borderLeftWidth: 5}]}
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
                                <View key={i} style={styles.techIconWrap}>
                                    <Text style={styles.techIconText}>{tech}</Text>
                                </View>
                            ))}
                        </View>
                    </ThemedTouchableOpacity>
                ))}
            </ScrollView>
            <Modal visible={!!modalEntry} animationType="slide" transparent onRequestClose={() => setModalEntry(null)}>
                <ThemedView style={styles.modalOverlay}>
                    <ThemedView style={styles.modalContent}>
                        {modalEntry && (
                            <>
                                <Image source={modalEntry.screenshot} style={styles.modalImage} />
                                <Text style={styles.modalTitle}>{modalEntry.title}</Text>
                                <Text style={styles.modalDesc}>{modalEntry.description}</Text>
                                <View style={styles.techStackRow}>
                                    {modalEntry.techStack.map((tech: string, i: number) => (
                                        <View key={i} style={styles.techIconWrap}>
                                            <Text style={styles.techIconText}>{tech}</Text>
                                        </View>
                                    ))}
                                </View>
                                {modalEntry.testimonials.length > 0 &&
                                    <View style={styles.testimonialBox}>
                                        {modalEntry.testimonials.map((t: string, i: number) => (
                                            <Text key={i} style={styles.testimonialText}>{t}</Text>
                                        ))}
                                    </View>
                                }
                                {modalEntry.link && (
                                    <ThemedTouchableOpacity
                                        style={[styles.closeButton, {}]}
                                        onPress={() => Linking.openURL(modalEntry.link!)}
                                    >
                                        <Text style={styles.closeButtonText}>View Project</Text>
                                    </ThemedTouchableOpacity>
                                )}
                                <TouchableOpacity style={[styles.closeButton, { backgroundColor: "#EFEFEF" }]} onPress={() => setModalEntry(null)}>
                                    <Text style={[styles.closeButtonText, { color: "#000" }]}>Close</Text>
                                </TouchableOpacity>
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
        backgroundColor: '#E3F2FD',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginHorizontal: 2,
        marginVertical: 2,
    },
    techIconText: {
        color: '#1D3D47',
        fontWeight: 'bold',
        fontSize: 13,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
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
        color: '#1D3D47',
        textAlign: 'center',
    },
    modalDesc: {
        fontSize: 16,
        color: '#4F5A65',
        marginBottom: 10,
        textAlign: 'center',
    },
    testimonialBox: {
        backgroundColor: '#E3F2FD',
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
    },
    testimonialText: {
        color: '#1D3D47',
        fontStyle: 'italic',
        fontSize: 15,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#1D3D47',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 32,
        marginTop: 16,
        width: 200,
        alignContent: 'center'
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});
