import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import ResourcesScreen from './ResourcesScreen';
import Ques from './Ques';

export default function App() {
  const [activeTab, setActiveTab] = useState('Chapters');

  return (
    <View style={styles.container}>
      {/* Header with Tab Navigation */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>UnLink</Text>
        <View style={styles.rightButtons}>
          <Pressable
            style={[styles.tabButton, activeTab === 'Chapters' && styles.activeTab]}
            onPress={() => setActiveTab('Chapters')}
          >
            <Text style={[styles.tabText, activeTab === 'Chapters' && styles.activeTabText]}>
              Chapters
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tabButton, activeTab === 'Resources' && styles.activeTab]}
            onPress={() => setActiveTab('Resources')}
          >
            <Text style={[styles.tabText, activeTab === 'Resources' && styles.activeTabText]}>
              Resources
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {activeTab === 'Chapters' ? <Ques /> : <ResourcesScreen />}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 70,
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: '#6C63FF',
  },
  contentContainer: {
    flex: 1,
  },
});