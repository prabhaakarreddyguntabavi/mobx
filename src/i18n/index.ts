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

          elementsStyles: {
            name: "Name",
            isDot: "Is Dot",
            badgeType: "Badge Type",
            neutral: "Neutral",
            success: "Success",
            warning: "Warning",
            information: "Information",
            critical: "Critical",
            badgeBorderStyles: "Badge Border Styles",
            basicRound: "Basic Round",
            largeRound: "Large Round",
            basicCircle: "Basic Circle",
            largeCircle: "Large Circle",
            buttonSize: "Button Size",
            small: "Small",
            medium: "Medium",
            large: "Large",
            disableButton: "Disable Button",
            buttonType: "Button Type",
            primary: "Primary",
            secondary: "Secondary",
            plain2: "Plain 2",
            isLoadingView: "Is Loading View",
            openPopup: "Open Popup",
            testing: "Testing",
            account: "Account",
            notifications: "Notifications",
            settings: "Settings",
            help: "Help",
            logout: "Logout",
            button: "Button",
            disableInput: "Disable Input",
            showHelpText: "Show Help Text",
            pleaseEnter: "Please Enter",
            helpTest: " Help Test",
            updateListDetails: "Update List Details",
            status: "Status",
            dueDate: "Due Date",
            updateDetails: "Update Details",
            edit: "Edit",
            delete: "Delete",
            noDetailsFound: "No Details Found",
            disable: "Disable",
            isErrorMessage: "Is Error Message",
            noResultFound: "No Result Found",
            mandatoryFields: "Mandatory fields",
            withIcon: "With Icon",
            toggleSize: "Toggle Size",
            simple: "Simple",
            short: "Short",
            max30characters: "max 30 characters",
            pleaseFillTheField: "Please Fill The Field",
            createNew: "Create New",
          },
        },
        // {t("elementsStyles.isLoadingView")}
        // import { useTranslation } from "react-i18next";
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

          elementsStyles: {
            name: "పేరు",
            isDot: "ఈజ్ డాట్",
            badgeType: "బ్యాడ్జ్ రకం",
            neutral: "తటస్థ",
            success: "విజయం",
            warning: "హెచ్చరిక",
            information: "సమాచారం",
            critical: "క్లిష్టమైన",
            badgeBorderStyles: "బ్యాడ్జ్ బోర్డర్ స్టైల్స్",
            basicRound: "ప్రాథమిక రౌండ్",
            largeRound: "పెద్ద రౌండ్",
            basicCircle: "ప్రాథమిక సర్కిల్",
            largeCircle: "పెద్ద సర్కిల్",
            buttonSize: "బటన్ పరిమాణం",
            small: "చిన్నది",
            medium: "మధ్యస్థం",
            large: "పెద్దది",
            disableButton: "డిసేబుల్ బటన్",
            buttonType: "బటన్ రకం",
            primary: "ప్రాథమిక",
            secondary: "సెకండరీ",
            plain2: "సాదా 2",
            isLoadingView: "వీక్షణ లోడ్ అవుతోంది",
            openPopup: "పాప్అప్ తెరవండి",
            testing: "పరీక్షిస్తోంది",
            account: "ఖాతా",
            notifications: "నోటిఫికేషన్‌లు",
            settings: "సెట్టింగ్‌లు",
            help: "సహాయం",
            logout: "లాగ్అవుట్",
            button: "బటన్",
            disableInput: "ఇన్‌పుట్‌ని నిలిపివేయండి",
            showHelpText: "సహాయ వచనాన్ని చూపు",
            pleaseEnter: "దయచేసి నమోదు చెయ్యండి",
            helpTest: " సహాయం పరీక్ష",
            updateListDetails: "జాబితా వివరాలను నవీకరించండి",
            status: "స్థితి",
            dueDate: "గడువు తేది",
            updateDetails: "వివరాలను నవీకరించండి",
            edit: "సవరించు",
            delete: "తొలగించు",
            noDetailsFound: "వివరాలు ఏవీ దొరకలేదు",
            disable: "డిసేబుల్",
            isErrorMessage: "ఎర్రర్ మెసేజ్",
            noResultFound: "ఫలితం కనుగొనబడలేదు",
            mandatoryFields: "తప్పనిసరిగా పూరించవల్సిన విషయాలు",
            withIcon: "చిహ్నంతో",
            toggleSize: "పరిమాణాన్ని టోగుల్ చేయండి",
            simple: "సరళమైనది",
            short: "పొట్టి",
            max30characters: "గరిష్టంగా 30 అక్షరాలు",
            pleaseFillTheField: "దయచేసి ఫీల్డ్‌ని పూరించండి",
            createNew: "క్రొత్తదాన్ని సృష్టించండి",
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

          elementsStyles: {
            name: "नाम",
            isDot: "डॉट है",
            badgeType: "बैज प्रकार",
            neutral: "तटस्थ",
            success: "सफलता",
            warning: "चेतावनी",
            information: "जानकारी",
            critical: "गंभीर",
            badgeBorderStyles: "बैज बॉर्डर शैलियाँ",
            basicRound: "मूल दौर",
            largeRound: "बड़ा गोल",
            basicCircle: "मूल वृत्त",
            largeCircle: "बड़ा वृत्त",
            buttonSize: "बटन के आकार",
            small: "छोटा",
            medium: "मध्यम",
            large: "बड़ा",
            disableButton: "अक्षम करें बटन",
            buttonType: "बटन प्रकार",
            primary: "प्राथमिक",
            secondary: "माध्यमिक",
            plain2: "सादा 2",
            isLoadingView: "दृश्य लोड हो रहा है",
            openPopup: "पॉपअप खोलें",
            testing: "परिक्षण",
            account: "खाता",
            notifications: "सूचनाएं",
            settings: "समायोजन",
            help: "मदद",
            logout: "लॉग आउट",
            button: "बटन",
            disableInput: "इनपुट अक्षम करें",
            showHelpText: "सहायता पाठ दिखाएँ",
            pleaseEnter: "कृपया दर्ज करें",
            helpTest: "सहायता परीक्षण",
            updateListDetails: "अद्यतन सूची विवरण",
            status: "स्थिति",
            dueDate: "नियत तारीख",
            updateDetails: "अद्यतन विवरण",
            edit: "संपादन करना",
            delete: "मिटाना",
            noDetailsFound: "कोई विवरण नहीं मिला",
            disable: "अक्षम करना",
            isErrorMessage: "त्रुटि संदेश है",
            noResultFound: "कोई परिणाम नहीं मिला",
            mandatoryFields: "अनिवार्य क्षेत्र",
            withIcon: "चिह्न के साथ",
            toggleSize: "आकार टॉगल करें",
            simple: "सरल",
            short: "छोटा",
            max30characters: "अधिकतम 30 अक्षर",
            pleaseFillTheField: "कृपया फ़ील्ड भरें",
            createNew: "नया निर्माण",
          },
        },
      },
    },
    // react: {
    //   useSuspense: false, // Use suspense for loading translations
    // },
  });

export default i18n;
