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
          lastTransaction: "Last Transaction",
          debitCreditOverview: "Debit & Credit Overview",
          dashboard: "Dashboard",
          profile: "Profile",
          allTransactions: "All Transactions",
          transactions: "Transactions",
          credit: "Credit",
          debit: "Debit",
          userName: "User Name",
          transactionName: "Transaction Name",
          category: "Category",
          date: "Date",
          amount: "Amount",
          addTransaction: "Add Transaction",
          transactionType: "Transaction Type",
          max30Characters: "Max 30 Characters",
          shopping: "Shopping",
          service: "Service",
          transfer: "Transfer",
          loremipsumdolorsitametconsectetur:
            "Lorem ipsum dolor sit amet, consectetur",
          updateTransaction: "Update Transaction",
          youcanupdateyourtransactionhere:
            "You can update your transaction here",
          invalidFieldResponses: "Invalid Field Responses",
          somethingwentwrongpleasetrygainlater:
            "Something went wrong please try again later",
          deletePopupText: "Are you sure you want to Delete?",
          deletePopupTextMessage:
            "This transaction will be deleted immediately. You can’t undo this action.",
          yesDelete: "Yes, Delete",
          cancel: "Cancel",
          failureTitleText: "Oops! Something Went Wrong",
          failureParagraph:
            "We are having some trouble to complete your request.",
          pleaseTryAgainLater: "Please try again",
          retry: "Retry",
          noTransactionsFound: "No Transactions Found",
          creditedinthisWeek: "Credited in this Week",
          debited: "Debited &",
          email: "Email",
          password: "PASSWORD",
          login: "Login",
          yesLogout: "Yes, Logout",
          pageNotFound: "Page Not Found",
          pageNotFoundText:
            "we're sorry, the page you requested could not be found",
          backToHomePage: "Back To HomePage",
          yourName: "Your Name",
          UserName: "User Name",
          dateOfBirth: "Date of Birth",
          presentAddress: "Present Address",
          permanentAddress: "Permanent Address",
          city: "City",
          postalCode: "Postal Code",
          country: "Country",
          logOutWarningTitle: "Are you sure you want to Logout?",
          logOutWarningParagraph:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
        },
      },
      de: {
        translation: {
          lastTransaction: "Letzte Transaktion",
          debitCreditOverview: "Debit- und Habenübersicht",
          dashboard: "Armaturenbrett",
          profile: "Profil",
          allTransactions: "Alle Transaktionen",
          transactions: "Transaktionen",
          credit: "Kredit",
          debit: "Lastschrift",
          userName: "Nutzername",
          transactionName: "Transaktionsname",
          category: "Kategorie",
          date: "Datum",
          amount: "Menge",
          addTransaction: "Transaktion hinzufügen",
          transactionType: "Art der Transaktion",
          max30Characters: "Maximal 30 Zeichen",
          shopping: "Einkaufen",
          service: "Service",
          transfer: "Überweisen",
          loremipsumdolorsitametconsectetur:
            "Lorem ipsum dolor sit amet, consectetur",
          updateTransaction: "Transaktion aktualisieren",
          youcanupdateyourtransactionhere:
            "Hier können Sie Ihre Transaktion aktualisieren",
          invalidFieldResponses: "Ungültige Feldantworten",
          somethingwentwrongpleasetrygainlater:
            "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal",
          deletePopupText: "Sind Sie sicher, dass Sie löschen möchten?",
          deletePopupTextMessage:
            "Diese Transaktion wird sofort gelöscht. Sie können diese Aktion nicht rückgängig machen.",
          yesDelete: "Ja, löschen",
          cancel: "Stornieren",
          failureTitleText: "Hoppla! Etwas ist schief gelaufen",
          failureParagraph:
            "Wir haben Probleme beim Vervollständigen Ihrer Anfrage.",
          pleaseTryAgainLater: "Bitte versuche es erneut",
          retry: "Wiederholen",
          noTransactionsFound: "Keine Transaktionen gefunden",
          creditedinthisWeek: "In dieser Woche gutgeschrieben",
          debited: "Abgebucht von",
          email: "Email",
          password: "PASSWORT",
          login: "Anmeldung",
          yesLogout: "Ja, Abmelden",
          pageNotFound: "Seite nicht gefunden",
          pageNotFoundText:
            "Es tut uns leid, die von Ihnen angeforderte Seite konnte nicht gefunden werden",
          backToHomePage: "Zurück zur Startseite",
          yourName: "Ihr Name",
          UserName: "Nutzername",
          dateOfBirth: "Geburtsdatum",
          presentAddress: "Aktuelle Adresse",
          permanentAddress: "fester Wohnsitz",
          city: "Stadt",
          postalCode: "Postleitzahl",
          country: "Land",
          logOutWarningTitle:
            "Sind Sie sicher, dass Sie sich abmelden möchten?",
          logOutWarningParagraph:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
        },
      },
      te: {
        translation: {
          lastTransaction: "చివరి లావాదేవీ",
          debitCreditOverview: "డెబిట్ & క్రెడిట్ అవలోకనం",
          dashboard: "డాష్బోర్డ్",
          profile: "ప్రొఫైల్",
          allTransactions: "అన్ని లావాదేవీలు",
          transactions: "లావాదేవీలు",
          credit: "క్రెడిట్",
          debit: "డెబిట్",
          userName: "వినియోగదారు పేరు",
          transactionName: "లావాదేవీ పేరు",
          category: "వర్గం",
          date: "తేదీ",
          amount: "మొత్తం",
          addTransaction: "లావాదేవీని జోడించండి",
          transactionType: "లావాదేవీ రకం",
          max30Characters: "గరిష్టంగా 30 అక్షరాలు",
          shopping: "షాపింగ్",
          service: "సేవ",
          transfer: "బదిలీ చేయండి",
          loremipsumdolorsitametconsectetur:
            "లోరెమ్ ఇప్సమ్ డోలర్ సిట్ అమెట్, కన్సెక్టెచర్",
          updateTransaction: "లావాదేవీని నవీకరించండి",
          youcanupdateyourtransactionhere:
            "మీరు మీ లావాదేవీని ఇక్కడ అప్‌డేట్ చేయవచ్చు",
          invalidFieldResponses: "చెల్లని ఫీల్డ్ ప్రతిస్పందనలు",
          somethingwentwrongpleasetrygainlater:
            "ఏదో తప్పు జరిగినది. దయచేసి కాసేపు ఆగక ప్రయత్నించండి",
          deletePopupText: "మీరు తొలగించాలనుకుంటున్నారా ఖచ్చితంగా?",
          deletePopupTextMessage:
            "ఈ లావాదేవీ వెంటనే తొలగించబడుతుంది. మీరు ఈ చర్యను రద్దు చేయలేరు.",
          yesDelete: "అవును, తొలగించు",
          cancel: "రద్దు చేయండి",
          failureTitleText: "అయ్యో! ఎక్కడో తేడ జరిగింది",
          failureParagraph:
            "మీ అభ్యర్థనను పూర్తి చేయడంలో మాకు కొంత సమస్య ఉంది.",
          pleaseTryAgainLater: "దయచేసి మళ్లీ ప్రయత్నించండి",
          retry: "మళ్లీ ప్రయత్నించండి",
          noTransactionsFound: "లావాదేవీలు ఏవీ కనుగొనబడలేదు",
          creditedinthisWeek: "ఈ వారంలో క్రెడిట్ చేయబడింది",
          debited: "డెబిట్ చేయబడింది",
          email: "ఇమెయిల్",
          password: "పాస్వర్డ్",
          login: "ప్రవేశించండి",
          yesLogout: "అవును, లాగ్అవుట్",
          pageNotFound: "పేజి దొరకలేదు",
          pageNotFoundText:
            "మమ్మల్ని క్షమించండి, మీరు అభ్యర్థించిన పేజీ కనుగొనబడలేదు",
          backToHomePage: "హోమ్‌పేజీకి తిరిగి వెళ్ళు",
          yourName: "నీ పేరు",
          UserName: "వినియోగదారు పేరు",
          dateOfBirth: "పుట్టిన తేది",
          presentAddress: "ప్రస్తుత చిరునామా",
          permanentAddress: "శాశ్వత చిరునామా",
          city: "నగరం",
          postalCode: "పోస్టల్ కోడ్",
          country: "దేశం",
          logOutWarningTitle: "మీరు ఖచ్చితంగా లాగ్ అవుట్ చేయాలనుకుంటున్నారా?",
          logOutWarningParagraph:
            "లోరెమ్ ఇప్సమ్ డోలర్ సిట్ అమెట్, కాన్సెక్టెచర్ అడిపిసింగ్ ఎలిట్, సెడ్",
        },
      },
      hi: {
        translation: {
          lastTransaction: "अंतिम लेन-देन",
          debitCreditOverview: "डेबिट और क्रेडिट अवलोकन",
          dashboard: "डैशबोर्ड",
          profile: "प्रोफ़ाइल",
          allTransactions: "सभी लेन - देन",
          transactions: "लेनदेन",
          credit: "श्रेय",
          debit: "खर्चे में लिखना",
          userName: "उपयोगकर्ता नाम",
          transactionName: "लेन-देन का नाम",
          category: "वर्ग",
          date: "तारीख",
          amount: "मात्रा",
          addTransaction: "लेन-देन जोड़ें",
          transactionType: "सौदे का प्रकार",
          max30Characters: "अधिकतम 30 अक्षर",
          shopping: "खरीदारी",
          service: "सेवा",
          transfer: "स्थानांतरण",
          loremipsumdolorsitametconsectetur:
            "लोरेम इप्सम डोलर सिट अमेट, कंसेक्टेचर",
          updateTransaction: "लेन-देन अद्यतन करें",
          youcanupdateyourtransactionhere:
            "आप यहां अपना लेनदेन अपडेट कर सकते हैं",
          invalidFieldResponses: "अमान्य फ़ील्ड प्रतिक्रियाएँ",
          somethingwentwrongpleasetrygainlater:
            "कुछ गलत हो गया है। कृपया बाद में दोबारा प्रयास करें",
          deletePopupText: "क्या आप आश्वस्त है कि आपको डिलीट करना है?",
          deletePopupTextMessage:
            "यह लेन-देन तुरंत हटा दिया जाएगा. आप इस क्रिया को पूर्ववत नहीं कर सकते.",
          yesDelete: "हाँ, हटाएँ",
          cancel: "रद्द करना",
          failureTitleText: "उफ़! कुछ गलत हो गया",
          failureParagraph:
            "हमें आपका अनुरोध पूरा करने में कुछ परेशानी हो रही है।",
          pleaseTryAgainLater: "कृपया पुन: प्रयास करें",
          retry: "पुन: प्रयास करें",
          noTransactionsFound: "कोई परिणाम नहीं मिले",
          creditedinthisWeek: "इस सप्ताह में श्रेय दिया गया",
          debited: "को डेबिट किया गया",
          email: "ईमेल",
          password: "पासवर्ड",
          login: "लॉग इन करें",
          yesLogout: "हाँ, लॉगआउट करें",
          pageNotFound: "पृष्ठ नहीं मिला",
          pageNotFoundText:
            "हमें खेद है, आपके द्वारा अनुरोधित पृष्ठ नहीं मिल सका",
          backToHomePage: "मुखपृष्ठ पर वापस",
          yourName: "आपका नाम",
          UserName: "उपयोगकर्ता नाम",
          dateOfBirth: "जन्म की तारीख",
          presentAddress: "वर्तमान पता",
          permanentAddress: "स्थायी पता",
          city: "शहर",
          postalCode: "डाक कोड",
          country: "देश",
          logOutWarningTitle: "क्या आप लॉग आउट करना चाहते हैं?",
          logOutWarningParagraph:
            "लोरेम इप्सम डोलर सिट अमेट, कंसेक्टेचर एडिपिसिंग एलीट, सेड",
        },
      },
    },
    // react: {
    //   useSuspense: false, // Use suspense for loading translations
    // },
  });

export default i18n;
