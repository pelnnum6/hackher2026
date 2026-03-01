import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DeviceAccess from './device_access';
import FinanceAccess from './financial_access';

type Category = "device" | "social" | "finance";

type Question = {
  id: string;
  next_section: Category;
  text: string;
};

const QUESTIONS: Question[] = [
  {
    id: "s1",
    next_section: "social",
    text: "Have you ever shared your social media passwords with your partner? (Instagram, Snapchat, TikTok, etc.)",
  },
  {
    id: "s2",
    next_section: "social",
    text: "Are you logged into your social media accounts on a device they can access? (their phone, shared tablet, laptop)",
  },
  {
    id: "s3",
    next_section: "social",
    text: "Do they have access to your email connected to your social media? (Email access = full account recovery risk)",
  },
  {
    id: "d4",
    next_section: "device",
    text: "Do they know your phone unlock passcode or Face ID pattern?",
  },
  {
    id: "d5",
    next_section: "device",
    text: "Have they ever used your phone or laptop without you present?",
  },
  {
    id: "d6",
    next_section: "device",
    text: "Do you share location with them through apps like Find My, Snapchat, Life360, Google Maps, etc.?",
  },
  {
    id: "f7",
    next_section: "finance",
    text: "Do they have access to your banking app, credit card, or financial passwords?",
  },
  {
    id: "f8",
    next_section: "finance",
    text: "Do you share subscriptions, payment methods, or joint financial accounts?",
  },
];

const anyYes = (ids: string[], answers: Record<string, boolean>): boolean => 
  ids.some((id) => answers[id] === true);

const determineNextPage = (answers: Record<string, boolean>): Category | null => {
  if (anyYes(["d4", "d5", "d6"], answers)) return "device";
  if (anyYes(["f7", "f8"], answers)) return "finance";
  if (anyYes(["s1", "s2", "s3"], answers)) return "social";
  return null;
};

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [nextSection, setNextSection] = useState<Category | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const currentQuestion = QUESTIONS[currentIndex];
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const section = determineNextPage(newAnswers);
      if (section) {
        setNextSection(section);
      } else {
        setIsComplete(true);
      }
    }
  };

  const handleSectionComplete = (section: Category) => {
    if (section === "device") {
      if (anyYes(["f7", "f8"], answers)) {
        setNextSection("finance");
      } else if (anyYes(["s1", "s2", "s3"], answers)) {
        setNextSection("social");
      } else {
        setIsComplete(true);
      }
    } else if (section === "finance") {
      if (anyYes(["s1", "s2", "s3"], answers)) {
        setNextSection("social");
      } else {
        setIsComplete(true);
      }
    } else if (section === "social") {
      setIsComplete(true);
    }
  };

  // Show empty completion page
  if (isComplete) {
    return <View style={{ flex: 1 }} />;
  }

  // Show DeviceAccess if needed
  if (nextSection === "device") {
    return (
      <DeviceAccess 
        onComplete={() => handleSectionComplete("device")}
        onBack={() => {
          setNextSection(null);
        }}
      />
    );
  }

  // Show FinanceAccess if needed
  if (nextSection === "finance") {
    return (
      <FinanceAccess 
        onComplete={() => handleSectionComplete("finance")}
        onBack={() => {
          setNextSection(null);
        }}
      />
    );
  }

  // Show Social section placeholder
  if (nextSection === "social") {
    return <Text>Social Access Section - Coming Soon</Text>;
  }

  const currentQuestion = QUESTIONS[currentIndex];

  return (
    <View style={{ padding: 20, paddingTop: 60 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Question {currentIndex + 1} of {QUESTIONS.length}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 30 }}>
        {currentQuestion.text}
      </Text>
      <TouchableOpacity 
        style={{ padding: 15, backgroundColor: '#007AFF', borderRadius: 5, marginBottom: 10 }}
        onPress={() => handleAnswer(true)}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{ padding: 15, backgroundColor: '#ccc', borderRadius: 5 }}
        onPress={() => handleAnswer(false)}
      >
        <Text style={{ textAlign: 'center', fontSize: 16 }}>No</Text>
      </TouchableOpacity>
    </View>
  );
}