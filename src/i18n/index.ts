import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations

// Configure i18next
i18n
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if translation is not found
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    resources: {
      en: {
        translation: {
          dashboard: {
            creditedinthisWeek: "Credited in this Week",
            debited: "Debited &",
            lastTransaction: "Last Transaction",
            debitCreditOverview: "Debit & Credit Overview",
          },
          transactions: {},
          common: {
            userName: "User Name",
            dashboard: "Dashboard",
            transactions: "Transactions",
            allTransactions: "All Transactions",
            profile: "Profile",
            credit: "Credit",
            debit: "Debit",
            cancel: "Cancel",
            email: "Email",
            password: "Password",
            login: "Login",
            noTransactionsFound: "No Transactions Found",
          },
          transactionInputs: {
            transactionName: "Transaction Name",
            category: "Category",
            date: "Date",
            amount: "Amount",
            transactionType: "Transaction Type",
            max30Characters: "Max 30 Characters",
            shopping: "Shopping",
            service: "Service",
            loremipsumdolorsitametconsectetur:
              "Lorem ipsum dolor sit amet, consectetur",
            youcanupdateyourtransactionhere:
              "You can update your transaction here",
            invalidFieldResponses: "Invalid Field Responses",
            addTransaction: "Add Transaction",
            updateTransaction: "Update Transaction",
            transfer: "Transfer",
          },
          errorMessage: {
            somethingwentwrongpleasetrygainlater:
              "Something went wrong please try again later",
            failureTitleText: "Oops! Something Went Wrong",
            failureParagraph:
              "We are having some trouble to complete your request.",
            retry: "Retry",
            pleaseTryAgainLater: "Please try again",
            backToHomePage: "Back To HomePage",
            pageNotFound: "Page Not Found",
            pageNotFoundText:
              "we're sorry, the page you requested could not be found",
          },

          deleteTransactions: {
            deletePopupText: "Are you sure you want to Delete?",
            deletePopupTextMessage:
              "This transaction will be deleted immediately. You can’t undo this action.",
            yesDelete: "Yes, Delete",
          },

          profile: {
            yourName: "Your Name",
            dateOfBirth: "Date of Birth",
            presentAddress: "Present Address",
            permanentAddress: "Permanent Address",
            city: "City",
            postalCode: "Postal Code",
            country: "Country",
          },

          logoutValues: {
            yesLogout: "Yes, Logout",
            logOutWarningTitle: "Are you sure you want to Logout?",
            logOutWarningParagraph:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
          },
        },
      },
      te: {
        translation: {
          dashboard: {
            creditedinthisWeek: "ఈ వారంలో క్రెడిట్ చేయబడింది",
            debited: "డెబిట్ చేయబడింది",
            lastTransaction: "చివరి లావాదేవీ",
            debitCreditOverview: "డెబిట్ & క్రెడిట్ అవలోకనం",
          },
          common: {
            userName: "వినియోగదారు పేరు",
            dashboard: "డాష్బోర్డ్",
            transactions: "లావాదేవీలు",
            allTransactions: "అన్ని లావాదేవీలు",
            profile: "ప్రొఫైల్",
            credit: "క్రెడిట్",
            debit: "డెబిట్",
            cancel: "రద్దు చేయండి",
            email: "ఇమెయిల్",
            password: "పాస్వర్డ్",
            login: "ప్రవేశించండి",
            noTransactionsFound: "లావాదేవీలు ఏవీ కనుగొనబడలేదు",
          },
          transactionInputs: {
            transactionName: "లావాదేవీ పేరు",
            category: "వర్గం",
            date: "తేదీ",
            amount: "మొత్తం",
            transactionType: "లావాదేవీ రకం",
            max30Characters: "గరిష్టంగా 30 అక్షరాలు",
            shopping: "షాపింగ్",
            service: "సేవ",
            loremipsumdolorsitametconsectetur:
              "లోరెమ్ ఇప్సమ్ డోలర్ సిట్ అమెట్, కన్సెక్టెచర్",
            youcanupdateyourtransactionhere:
              "మీరు మీ లావాదేవీని ఇక్కడ అప్‌డేట్ చేయవచ్చు",
            invalidFieldResponses: "చెల్లని ఫీల్డ్ ప్రతిస్పందనలు",
            addTransaction: "లావాదేవీని జోడించండి",
            updateTransaction: "లావాదేవీని నవీకరించండి",
            transfer: "బదిలీ చేయండి",
          },
          errorMessage: {
            somethingwentwrongpleasetrygainlater:
              "ఏదో తప్పు జరిగినది. దయచేసి కాసేపు ఆగక ప్రయత్నించండి",
            failureTitleText: "అయ్యో! ఎక్కడో తేడ జరిగింది",
            failureParagraph:
              "మీ అభ్యర్థనను పూర్తి చేయడంలో మాకు కొంత సమస్య ఉంది.",
            retry: "మళ్లీ ప్రయత్నించండి",
            pleaseTryAgainLater: "దయచేసి మళ్లీ ప్రయత్నించండి",
            backToHomePage: "హోమ్‌పేజీకి తిరిగి వెళ్ళు",
            pageNotFound: "పేజి దొరకలేదు",
            pageNotFoundText:
              "మమ్మల్ని క్షమించండి, మీరు అభ్యర్థించిన పేజీ కనుగొనబడలేదు",
          },

          deleteTransactions: {
            deletePopupText: "మీరు తొలగించాలనుకుంటున్నారా ఖచ్చితంగా?",
            deletePopupTextMessage:
              "ఈ లావాదేవీ వెంటనే తొలగించబడుతుంది. మీరు ఈ చర్యను రద్దు చేయలేరు.",
            yesDelete: "అవును, తొలగించు",
          },

          profile: {
            yourName: "నీ పేరు",
            dateOfBirth: "పుట్టిన తేది",
            presentAddress: "ప్రస్తుత చిరునామా",
            permanentAddress: "శాశ్వత చిరునామా",
            city: "నగరం",
            postalCode: "పోస్టల్ కోడ్",
            country: "దేశం",
          },

          logoutValues: {
            yesLogout: "हाँ, लॉगआउट करें",
            logOutWarningTitle: "మీరు ఖచ్చితంగా లాగ్ అవుట్ చేయాలనుకుంటున్నారా?",
            logOutWarningParagraph:
              "లోరెమ్ ఇప్సమ్ డోలర్ సిట్ అమెట్, కాన్సెక్టెచర్ అడిపిసింగ్ ఎలిట్, సెడ్",
          },
        },
      },
      hi: {
        translation: {
          dashboard: {
            creditedinthisWeek: "इस सप्ताह में श्रेय दिया गया",
            debited: "को डेबिट किया गया",
            lastTransaction: "अंतिम लेन-देन",
            debitCreditOverview: "डेबिट और क्रेडिट अवलोकन",
          },
          transactions: {},
          common: {
            userName: "उपयोगकर्ता नाम",
            dashboard: "डैशबोर्ड",
            transactions: "लेनदेन",
            allTransactions: "सभी लेन - देन",
            profile: "प्रोफ़ाइल",
            credit: "श्रेय",
            debit: "खर्चे में लिखना",
            cancel: "रद्द करना",
            email: "ईमेल",
            password: "पासवर्ड",
            login: "लॉग इन करें",
            noTransactionsFound: "कोई परिणाम नहीं मिले",
          },
          transactionInputs: {
            transactionName: "लेन-देन का नाम",
            category: "वर्ग",
            date: "तारीख",
            amount: "मात्रा",
            transactionType: "सौदे का प्रकार",
            max30Characters: "अधिकतम 30 अक्षर",
            shopping: "खरीदारी",
            service: "सेवा",
            loremipsumdolorsitametconsectetur:
              "लोरेम इप्सम डोलर सिट अमेट, कंसेक्टेचर",
            youcanupdateyourtransactionhere:
              "आप यहां अपना लेनदेन अपडेट कर सकते हैं",
            invalidFieldResponses: "अमान्य फ़ील्ड प्रतिक्रियाएँ",
            addTransaction: "लेन-देन जोड़ें",
            updateTransaction: "लेन-देन अद्यतन करें",
            transfer: "स्थानांतरण",
          },
          errorMessage: {
            somethingwentwrongpleasetrygainlater:
              "कुछ गलत हो गया है। कृपया बाद में दोबारा प्रयास करें",
            failureTitleText: "उफ़! कुछ गलत हो गया",
            failureParagraph:
              "हमें आपका अनुरोध पूरा करने में कुछ परेशानी हो रही है।",
            retry: "पुन: प्रयास करें",
            pleaseTryAgainLater: "कृपया पुन: प्रयास करें",
            backToHomePage: "मुखपृष्ठ पर वापस",
            pageNotFound: "पृष्ठ नहीं मिला",
            pageNotFoundText:
              "हमें खेद है, आपके द्वारा अनुरोधित पृष्ठ नहीं मिल सका",
          },

          deleteTransactions: {
            deletePopupText: "क्या आप आश्वस्त है कि आपको डिलीट करना है?",
            deletePopupTextMessage:
              "यह लेन-देन तुरंत हटा दिया जाएगा. आप इस क्रिया को पूर्ववत नहीं कर सकते.",
            yesDelete: "हाँ, हटाएँ",
          },

          profile: {
            yourName: "आपका नाम",
            dateOfBirth: "जन्म की तारीख",
            presentAddress: "वर्तमान पता",
            permanentAddress: "स्थायी पता",
            city: "शहर",
            postalCode: "डाक कोड",
            country: "देश",
          },

          logoutValues: {
            yesLogout: "हाँ, लॉगआउट करें",
            logOutWarningTitle: "क्या आप लॉग आउट करना चाहते हैं?",
            logOutWarningParagraph:
              "लोरेम इप्सम डोलर सिट अमेट, कंसेक्टेचर एडिपिसिंग एलीट, सेड",
          },
        },
      },
    },
    // react: {
    //   useSuspense: false, // Use suspense for loading translations
    // },
  });

export default i18n;
