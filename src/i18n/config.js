import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation and Common
      welcome: 'Welcome to Loan Advisor',
      eligibility: 'Loan Eligibility',
      application: 'Loan Application',
      financialTips: 'Financial Tips',
      chatAssistant: 'Chat Assistant',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      openSettings: 'Open Settings',
      selectLanguage: 'Select Language',

      // Home Page
      heroTitle: 'Smart Loan Solutions for Your Future',
      heroSubtitle: 'Get personalized loan recommendations and expert financial advice',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      featuredServices: 'Featured Services',
      whyChooseUs: 'Why Choose Us',
      testimonials: 'What Our Clients Say',

      // Loan Eligibility
      checkEligibility: 'Check Your Loan Eligibility',
      monthlyIncome: 'Monthly Income',
      monthlyExpenses: 'Monthly Expenses',
      creditScore: 'Credit Score',
      loanAmount: 'Desired Loan Amount',
      loanTerm: 'Loan Term (Years)',
      calculate: 'Calculate Eligibility',
      eligibilityResult: 'Eligibility Result',
      eligible: 'Congratulations! You are eligible for a loan.',
      notEligible: 'We apologize, but you are not eligible at this time.',
      suggestions: 'Suggestions for Improvement',

      // Loan Application
      personalInfo: 'Personal Information',
      employmentInfo: 'Employment Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Residential Address',
      employer: 'Current Employer',
      occupation: 'Occupation',
      workExperience: 'Work Experience (Years)',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit Application',
      applicationSuccess: 'Application Submitted Successfully',

      // Financial Tips
      budgetingTips: 'Budgeting Tips',
      savingTips: 'Saving Strategies',
      investmentTips: 'Investment Advice',
      creditTips: 'Credit Score Tips',
      readMore: 'Read More',

      // Chat Interface
      chatTitle: 'Loan Advisor Chat',
      chatPlaceholder: 'Type your message here...',
      sendMessage: 'Send',
      chatbot: {
        welcome: 'Hello! I\'m your loan advisor. How can I help you today?',
        options: [
          'What types of loans do you offer?',
          'How can I improve my credit score?',
          'What documents do I need for a loan application?',
          'What are current interest rates?',
          'Help me check my loan eligibility',
          'I want to apply for a loan'
        ]
      },

      // Loan Types
      loanTypes: {
        personal: {
          title: 'Personal Loan',
          description: 'Flexible financing for your personal needs'
        },
        business: {
          title: 'Business Loan',
          description: 'Grow your business with our financing solutions'
        },
        home: {
          title: 'Home Loan',
          description: 'Make your dream home a reality'
        },
        education: {
          title: 'Education Loan',
          description: 'Invest in your future with education financing'
        }
      },

      // Error Messages
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      minimumIncome: 'Income must be at least {{amount}}',
      minimumLoanAmount: 'Loan amount must be at least {{amount}}',

      // Success Messages
      saveSuccess: 'Changes saved successfully',
      updateSuccess: 'Information updated successfully',
      deleteSuccess: 'Successfully deleted'
    }
  },
  hi: {
    translation: {
      // Navigation and Common
      welcome: 'लोन एडवाइजर में आपका स्वागत है',
      eligibility: 'लोन पात्रता',
      application: 'लोन आवेदन',
      financialTips: 'वित्तीय सुझाव',
      chatAssistant: 'चैट सहायक',
      login: 'लॉग इन',
      signup: 'साइन अप',
      logout: 'लॉग आउट',
      openSettings: 'सेटिंग्स खोलें',
      selectLanguage: 'भाषा चुनें',

      // Home Page
      heroTitle: 'आपके भविष्य के लिए स्मार्ट लोन समाधान',
      heroSubtitle: 'व्यक्तिगत लोन सिफारिशें और विशेषज्ञ वित्तीय सलाह प्राप्त करें',
      getStarted: 'शुरू करें',
      learnMore: 'और जानें',
      featuredServices: 'विशेष सेवाएं',
      whyChooseUs: 'हमें क्यों चुनें',
      testimonials: 'हमारे ग्राहक क्या कहते हैं',

      // Loan Eligibility
      checkEligibility: 'अपनी लोन पात्रता जांचें',
      monthlyIncome: 'मासिक आय',
      monthlyExpenses: 'मासिक खर्च',
      creditScore: 'क्रेडिट स्कोर',
      loanAmount: 'वांछित लोन राशि',
      loanTerm: 'लोन अवधि (वर्षों में)',
      calculate: 'पात्रता की गणना करें',
      eligibilityResult: 'पात्रता परिणाम',
      eligible: 'बधाई हो! आप लोन के लिए पात्र हैं।',
      notEligible: 'हमें खेद है, लेकिन आप इस समय पात्र नहीं हैं।',
      suggestions: 'सुधार के लिए सुझाव',

      // Loan Application
      personalInfo: 'व्यक्तिगत जानकारी',
      employmentInfo: 'रोजगार की जानकारी',
      firstName: 'पहला नाम',
      lastName: 'अंतिम नाम',
      email: 'ईमेल पता',
      phone: 'फोन नंबर',
      address: 'आवासीय पता',
      employer: 'वर्तमान नियोक्ता',
      occupation: 'व्यवसाय',
      workExperience: 'कार्य अनुभव (वर्षों में)',
      next: 'अगला',
      previous: 'पिछला',
      submit: 'आवेदन जमा करें',
      applicationSuccess: 'आवेदन सफलतापूर्वक जमा किया गया',

      // Financial Tips
      budgetingTips: 'बजट के सुझाव',
      savingTips: 'बचत रणनीतियां',
      investmentTips: 'निवेश सलाह',
      creditTips: 'क्रेडिट स्कोर सुझाव',
      readMore: 'और पढ़ें',

      // Chat Interface
      chatTitle: 'लोन एडवाइजर चैट',
      chatPlaceholder: 'अपना संदेश यहां टाइप करें...',
      sendMessage: 'भेजें',
      chatbot: {
        welcome: 'नमस्ते! मैं आपका लोन सलाहकार हूं। मैं आज आपकी कैसे मदद कर सकता हूं?',
        options: [
          'आप किस प्रकार के लोन प्रदान करते हैं?',
          'मैं अपना क्रेडिट स्कोर कैसे सुधार सकता हूं?',
          'लोन आवेदन के लिए किन दस्तावेजों की आवश्यकता है?',
          'वर्तमान ब्याज दरें क्या हैं?',
          'मेरी लोन पात्रता की जांच करें',
          'मैं लोन के लिए आवेदन करना चाहता हूं'
        ]
      },

      // Loan Types
      loanTypes: {
        personal: {
          title: 'व्यक्तिगत लोन',
          description: 'आपकी व्यक्तिगत जरूरतों के लिए लचीला वित्तपोषण'
        },
        business: {
          title: 'व्यावसायिक लोन',
          description: 'हमारे वित्तपोषण समाधानों के साथ अपना व्यवसाय बढ़ाएं'
        },
        home: {
          title: 'गृह लोन',
          description: 'अपने सपनों के घर को हकीकत बनाएं'
        },
        education: {
          title: 'शिक्षा लोन',
          description: 'शिक्षा वित्तपोषण के साथ अपने भविष्य में निवेश करें'
        }
      },

      // Error Messages
      required: 'यह फ़ील्ड आवश्यक है',
      invalidEmail: 'कृपया एक वैध ईमेल पता दर्ज करें',
      invalidPhone: 'कृपया एक वैध फोन नंबर दर्ज करें',
      minimumIncome: 'आय कम से कम {{amount}} होनी चाहिए',
      minimumLoanAmount: 'लोन राशि कम से कम {{amount}} होनी चाहिए',

      // Success Messages
      saveSuccess: 'परिवर्तन सफलतापूर्वक सहेजे गए',
      updateSuccess: 'जानकारी सफलतापूर्वक अपडेट की गई',
      deleteSuccess: 'सफलतापूर्वक हटा दिया गया'
    }
  }
  // ... Similar comprehensive translations for other languages (kn, ta, te, ml, es)
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('preferredLanguage') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;